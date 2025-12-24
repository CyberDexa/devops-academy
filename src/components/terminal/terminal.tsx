"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Maximize2, Minimize2, Copy, RotateCcw, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TerminalProps {
  className?: string
  title?: string
  initialCommand?: string
  onClose?: () => void
}

export function Terminal({ 
  className, 
  title = "Terminal",
  initialCommand,
  onClose 
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<any>(null)
  const fitAddonRef = useRef<any>(null)
  const currentLineRef = useRef<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [terminalInstance, setTerminalInstance] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'simulated' | 'connected' | 'error'>('connecting')

  // Command handler (memoized to avoid recreation)
  const handleCommand = useCallback((term: any, command: string) => {
    const commands: Record<string, string[]> = {
      "help": [
        "\x1b[1;33mAvailable Commands:\x1b[0m",
        "  help          - Show this help message",
        "  clear         - Clear the terminal",
        "  docker --version  - Check Docker version",
        "  kubectl version   - Check Kubernetes version",
        "  terraform -v      - Check Terraform version",
        "  python3 --version - Check Python version",
        "  ls, pwd, cd      - Basic file operations",
        "",
        "\x1b[1;36mNote: This is a simulated terminal for demos.\x1b[0m",
        "\x1b[1;36mFull lab access requires Docker backend to be running.\x1b[0m"
      ],
      "docker --version": ["Docker version 24.0.7, build afdd53b"],
      "kubectl version --client": ["Client Version: v1.28.4"],
      "terraform -v": ["Terraform v1.6.5", "on darwin_arm64"],
      "python3 --version": ["Python 3.11.6"],
      "ls": ["Documents  Downloads  projects  .bashrc  .profile"],
      "pwd": ["/home/learner"],
      "whoami": ["learner"],
      "date": [new Date().toString()],
      "echo $SHELL": ["/bin/bash"],
      "uname -a": ["Linux devops-lab 5.15.0-1 #1 SMP x86_64 GNU/Linux"],
    }

    if (command === "clear") {
      term.clear()
      return
    }

    const output = commands[command]
    if (output) {
      output.forEach((line: string) => term.writeln(line))
    } else if (command.startsWith("echo ")) {
      term.writeln(command.slice(5))
    } else if (command.startsWith("cd ")) {
      // Simulate cd - silent
    } else {
      term.writeln(`\x1b[31mCommand not found: ${command}\x1b[0m`)
      term.writeln("Type 'help' for available commands.")
    }
  }, [])

  useEffect(() => {
    let mounted = true
    let resizeObserver: ResizeObserver | null = null
    let resizeTimeout: NodeJS.Timeout | null = null

    const initTerminal = async () => {
      try {
        // Dynamic import for client-side only
        const [{ Terminal: XTerm }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
          import("@xterm/xterm"),
          import("@xterm/addon-fit"),
          import("@xterm/addon-web-links")
        ])

        // Import CSS - using require for CSS files
        // @ts-expect-error CSS import
        await import("@xterm/xterm/css/xterm.css")

        if (!mounted || !terminalRef.current) return

        const term = new XTerm({
          theme: {
            background: "#0d1117",
            foreground: "#c9d1d9",
            cursor: "#58a6ff",
            cursorAccent: "#0d1117",
            selectionBackground: "#264f78",
            black: "#0d1117",
            red: "#ff7b72",
            green: "#3fb950",
            yellow: "#d29922",
            blue: "#58a6ff",
            magenta: "#bc8cff",
            cyan: "#39c5cf",
            white: "#b1bac4",
            brightBlack: "#6e7681",
            brightRed: "#ffa198",
            brightGreen: "#56d364",
            brightYellow: "#e3b341",
            brightBlue: "#79c0ff",
            brightMagenta: "#d2a8ff",
            brightCyan: "#56d4dd",
            brightWhite: "#f0f6fc",
          },
          fontFamily: "JetBrains Mono, Menlo, Monaco, Consolas, monospace",
          fontSize: 14,
          lineHeight: 1.4,
          cursorBlink: true,
          cursorStyle: "bar",
          allowProposedApi: true,
          scrollback: 1000,
          convertEol: true,
        })

        const fitAddon = new FitAddon()
        const webLinksAddon = new WebLinksAddon()

        term.loadAddon(fitAddon)
        term.loadAddon(webLinksAddon)
        
        // Store refs before opening
        termRef.current = term
        fitAddonRef.current = fitAddon

        term.open(terminalRef.current)
        
        // Delay fit to ensure container is ready
        setTimeout(() => {
          if (mounted && fitAddon) {
            try {
              fitAddon.fit()
            } catch (e) {
              console.warn('Fit addon error:', e)
            }
          }
        }, 100)

        // Welcome message
        term.writeln("\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m")
        term.writeln("\x1b[1;36m║\x1b[0m  \x1b[1;32m🚀 DevOps Academy - Interactive Lab Environment\x1b[0m            \x1b[1;36m║\x1b[0m")
        term.writeln("\x1b[1;36m║\x1b[0m                                                              \x1b[1;36m║\x1b[0m")
        term.writeln("\x1b[1;36m║\x1b[0m  \x1b[33mType 'help' to see available commands\x1b[0m                      \x1b[1;36m║\x1b[0m")
        term.writeln("\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m")
        term.writeln("")
        term.writeln("\x1b[90m[Simulated Mode - Docker backend not connected]\x1b[0m")
        term.writeln("")
        
        const prompt = () => {
          term.write("\x1b[1;32mlearner@devops-lab\x1b[0m:\x1b[1;34m~\x1b[0m$ ")
        }
        
        term.onData((data: string) => {
          if (!mounted) return
          
          // Handle special keys
          if (data === "\r") {
            // Enter key
            term.writeln("")
            const cmd = currentLineRef.current.trim()
            if (cmd) {
              handleCommand(term, cmd)
            }
            currentLineRef.current = ""
            prompt()
          } else if (data === "\x7f" || data === "\b") {
            // Backspace
            if (currentLineRef.current.length > 0) {
              currentLineRef.current = currentLineRef.current.slice(0, -1)
              term.write("\b \b")
            }
          } else if (data === "\x03") {
            // Ctrl+C
            term.writeln("^C")
            currentLineRef.current = ""
            prompt()
          } else if (data === "\x0c") {
            // Ctrl+L - clear
            term.clear()
            prompt()
          } else if (data >= " " && data <= "~") {
            // Printable characters only
            currentLineRef.current += data
            term.write(data)
          }
        })

        prompt()

        if (initialCommand) {
          currentLineRef.current = initialCommand
          term.write(initialCommand)
        }

        setTerminalInstance(term)
        setIsLoaded(true)
        setConnectionStatus('simulated')

        // Handle resize with debounce to prevent freezing
        resizeObserver = new ResizeObserver(() => {
          if (resizeTimeout) clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            if (mounted && fitAddonRef.current) {
              try {
                fitAddonRef.current.fit()
              } catch (e) {
                // Ignore fit errors
              }
            }
          }, 100)
        })
        
        resizeObserver.observe(terminalRef.current)

      } catch (error) {
        console.error('Failed to initialize terminal:', error)
        setConnectionStatus('error')
      }
    }

    initTerminal()

    return () => {
      mounted = false
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (resizeObserver) resizeObserver.disconnect()
      if (termRef.current) {
        termRef.current.dispose()
        termRef.current = null
      }
    }
  }, [initialCommand, handleCommand])

  const handleCopy = useCallback(() => {
    if (terminalInstance) {
      const selection = terminalInstance.getSelection()
      if (selection) {
        navigator.clipboard.writeText(selection)
      }
    }
  }, [terminalInstance])

  const handleReset = useCallback(() => {
    if (terminalInstance) {
      terminalInstance.clear()
      currentLineRef.current = ""
      terminalInstance.writeln("\x1b[1;33mTerminal reset.\x1b[0m")
      terminalInstance.writeln("")
      terminalInstance.write("\x1b[1;32mlearner@devops-lab\x1b[0m:\x1b[1;34m~\x1b[0m$ ")
    }
  }, [terminalInstance])

  const statusColors = {
    connecting: 'text-yellow-400',
    simulated: 'text-orange-400', 
    connected: 'text-green-400',
    error: 'text-red-400'
  }

  const statusLabels = {
    connecting: 'Connecting...',
    simulated: 'Simulated',
    connected: 'Connected',
    error: 'Error'
  }

  return (
    <div
      className={cn(
        "terminal-container flex flex-col",
        isFullscreen && "fixed inset-4 z-50",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="flex gap-2">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="ml-4 flex-1 text-sm text-slate-400">{title}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${statusColors[connectionStatus]}`}>
            {statusLabels[connectionStatus]}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef} 
        className={cn(
          "flex-1 overflow-hidden",
          !isLoaded && "flex items-center justify-center"
        )}
        style={{ minHeight: isFullscreen ? "calc(100% - 48px)" : "400px" }}
      >
        {!isLoaded && (
          <div className="text-slate-400">Loading terminal...</div>
        )}
      </div>
    </div>
  )
}
