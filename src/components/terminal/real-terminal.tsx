"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Maximize2, Minimize2, Copy, RotateCcw, X, Settings, Terminal, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { io, Socket } from "socket.io-client"
import { getTerminalConfig, TerminalMode } from "@/lib/terminal-config"
import { TerminalSettings } from "./terminal-settings"

// Check if we're running on Vercel/production without terminal server
const isServerlessProduction = typeof window !== 'undefined' && 
  (window.location.hostname.includes('vercel.app') || 
   process.env.NEXT_PUBLIC_VERCEL === '1' ||
   process.env.NODE_ENV === 'production')

interface TerminalProps {
  className?: string
  title?: string
  lessonId?: string
  onClose?: () => void
  showSettings?: boolean
  onCommand?: (command: string) => void
}

export function RealTerminal({ 
  className, 
  title = "Terminal",
  lessonId,
  onClose,
  showSettings = true,
  onCommand
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<any>(null)
  const fitAddonRef = useRef<any>(null)
  const socketRef = useRef<Socket | null>(null)
  const commandBufferRef = useRef<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting')
  const [currentMode, setCurrentMode] = useState<TerminalMode>('local')
  const [configKey, setConfigKey] = useState(0) // Used to force reconnect on config change
  const [showProductionMessage, setShowProductionMessage] = useState(false)

  // Handle config changes - force reconnect
  const handleConfigChange = useCallback(() => {
    const config = getTerminalConfig()
    setCurrentMode(config.mode)
    setConfigKey(k => k + 1)
  }, [])

  useEffect(() => {
    // Load initial config
    const config = getTerminalConfig()
    setCurrentMode(config.mode)
  }, [])

  useEffect(() => {
    let mounted = true
    let resizeObserver: ResizeObserver | null = null
    let resizeTimeout: NodeJS.Timeout | null = null

    const initTerminal = async () => {
      try {
        // Get current config
        const config = getTerminalConfig()
        
        // Dynamic import for client-side only
        const [{ Terminal: XTerm }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
          import("@xterm/xterm"),
          import("@xterm/addon-fit"),
          import("@xterm/addon-web-links")
        ])

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
          scrollback: 5000,
          convertEol: true,
        })

        const fitAddon = new FitAddon()
        const webLinksAddon = new WebLinksAddon()

        term.loadAddon(fitAddon)
        term.loadAddon(webLinksAddon)
        
        termRef.current = term
        fitAddonRef.current = fitAddon

        term.open(terminalRef.current)
        
        setTimeout(() => {
          if (mounted && fitAddon) {
            try {
              fitAddon.fit()
            } catch (e) {
              console.warn('Fit addon error:', e)
            }
          }
        }, 100)

        // Connect to WebSocket server
        // Use NEXT_PUBLIC_TERMINAL_SERVER_URL for Render deployment, fallback to local
        const terminalServerUrl = process.env.NEXT_PUBLIC_TERMINAL_SERVER_URL || ''
        
        const socket = io(terminalServerUrl, {
          path: '/api/terminal/socket',
          transports: ['websocket', 'polling'],
        })

        socketRef.current = socket

        socket.on('connect', () => {
          console.log('Socket connected, starting terminal with mode:', config.mode)
          // Send connection mode and config to server
          socket.emit('terminal:start', { 
            lessonId,
            mode: config.mode,
            ssh: config.mode === 'ssh' ? config.ssh : undefined,
            docker: config.mode === 'docker' ? config.docker : undefined
          })
        })

        socket.on('terminal:ready', (data) => {
          console.log('Terminal ready:', data)
          setConnectionStatus('connected')
          const modeLabels = {
            local: 'local terminal',
            docker: 'Docker container',
            ssh: `SSH (${config.ssh?.host || 'remote'})`
          }
          term.writeln(`\x1b[1;32m✓ Connected to ${modeLabels[config.mode]}\x1b[0m`)
          term.writeln('')
        })

        socket.on('terminal:data', (data: string) => {
          term.write(data)
        })

        socket.on('terminal:exit', (exitCode: number) => {
          term.writeln(`\r\n\x1b[1;33mProcess exited with code ${exitCode}\x1b[0m`)
          setConnectionStatus('disconnected')
        })

        socket.on('terminal:error', (error: { message: string }) => {
          term.writeln(`\x1b[1;31mError: ${error.message}\x1b[0m`)
          setConnectionStatus('error')
        })

        socket.on('disconnect', () => {
          term.writeln('\r\n\x1b[1;31mDisconnected from server\x1b[0m')
          setConnectionStatus('disconnected')
        })

        socket.on('connect_error', (error) => {
          console.error('Connection error:', error)
          term.writeln('\x1b[1;31mFailed to connect to terminal server\x1b[0m')
          term.writeln('\x1b[33mMake sure you are running: npm run dev:terminal\x1b[0m')
          setConnectionStatus('error')
        })

        // Send keystrokes to server and track commands
        term.onData((data: string) => {
          if (socket.connected) {
            socket.emit('terminal:input', data)
            
            // Track command input for validation
            if (onCommand) {
              // Enter key (carriage return)
              if (data === '\r' || data === '\n') {
                const command = commandBufferRef.current.trim()
                if (command) {
                  onCommand(command)
                }
                commandBufferRef.current = ""
              }
              // Backspace
              else if (data === '\x7f' || data === '\b') {
                commandBufferRef.current = commandBufferRef.current.slice(0, -1)
              }
              // Ctrl+C or Ctrl+U - clear buffer
              else if (data === '\x03' || data === '\x15') {
                commandBufferRef.current = ""
              }
              // Regular character
              else if (data.length === 1 && data.charCodeAt(0) >= 32) {
                commandBufferRef.current += data
              }
            }
          }
        })

        // Handle resize
        const sendResize = () => {
          if (socket.connected && fitAddon) {
            const dims = fitAddon.proposeDimensions()
            if (dims) {
              socket.emit('terminal:resize', { cols: dims.cols, rows: dims.rows })
            }
          }
        }

        term.onResize(({ cols, rows }) => {
          if (socket.connected) {
            socket.emit('terminal:resize', { cols, rows })
          }
        })

        setIsLoaded(true)

        // Handle container resize with debounce
        resizeObserver = new ResizeObserver(() => {
          if (resizeTimeout) clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            if (mounted && fitAddonRef.current) {
              try {
                fitAddonRef.current.fit()
                sendResize()
              } catch (e) {
                // Ignore
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
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
      if (termRef.current) {
        termRef.current.dispose()
        termRef.current = null
      }
    }
  }, [lessonId, configKey]) // configKey forces reconnect when config changes

  const handleCopy = useCallback(() => {
    if (termRef.current) {
      const selection = termRef.current.getSelection()
      if (selection) {
        navigator.clipboard.writeText(selection)
      }
    }
  }, [])

  const handleReset = useCallback(() => {
    if (termRef.current) {
      termRef.current.clear()
    }
  }, [])

  const statusColors = {
    connecting: 'text-yellow-400',
    connected: 'text-green-400',
    error: 'text-red-400',
    disconnected: 'text-slate-400'
  }

  const statusLabels = {
    connecting: 'Connecting...',
    connected: 'Connected',
    error: 'Connection Error',
    disconnected: 'Disconnected'
  }

  // Production fallback - show local setup instructions
  if (showProductionMessage || (connectionStatus === 'error' && isServerlessProduction)) {
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
          <span className="ml-4 flex-1 text-sm text-slate-400">
            {title}
          </span>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Local Setup Instructions */}
        <div 
          className="flex-1 bg-[#0d1117] p-6 flex flex-col items-center justify-center text-center"
          style={{ minHeight: "400px" }}
        >
          <div className="max-w-md space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Terminal className="w-8 h-8 text-emerald-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Interactive Terminal Labs</h3>
              <p className="text-slate-400 text-sm">
                Terminal labs require running the app locally for real shell access. 
                Follow these steps to get hands-on practice:
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 text-left space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  <p className="text-sm text-white font-medium">Clone the repository</p>
                  <code className="text-xs text-slate-400 font-mono">git clone https://github.com/CyberDexa/devops-academy.git</code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  <p className="text-sm text-white font-medium">Install dependencies</p>
                  <code className="text-xs text-slate-400 font-mono">cd devops-academy && npm install</code>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  <p className="text-sm text-white font-medium">Run with terminal server</p>
                  <code className="text-xs text-slate-400 font-mono">npm run dev:terminal</code>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <a 
                href="https://github.com/CyberDexa/devops-academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on GitHub
              </a>
            </div>

            <p className="text-xs text-slate-500">
              💡 Tip: You can still read through the lesson content and theory above!
            </p>
          </div>
        </div>
      </div>
    )
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
        <span className="ml-4 flex-1 text-sm text-slate-400">
          {title} 
          <span className="ml-2 text-xs text-slate-500">
            ({currentMode === 'local' ? 'Local' : currentMode === 'docker' ? 'Docker' : 'SSH'})
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${statusColors[connectionStatus]}`}>
            {statusLabels[connectionStatus]}
          </span>
          {showSettings && (
            <TerminalSettings compact onConfigChange={handleConfigChange} />
          )}
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
