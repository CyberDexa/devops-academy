/**
 * Terminal Server for DevOps Academy
 * 
 * This module provides a WebSocket-based terminal server that connects
 * xterm.js in the browser to a real PTY (pseudo-terminal) on the server.
 * 
 * Options for running labs:
 * 
 * 1. LOCAL PTY MODE (Current Implementation)
 *    - Runs commands directly on the host machine
 *    - Best for development/testing
 *    - Uses node-pty to spawn a shell
 * 
 * 2. DOCKER CONTAINER MODE (Production)
 *    - Spawns isolated Docker containers for each user session
 *    - Pre-built images with DevOps tools installed
 *    - Safer for production - sandboxed execution
 * 
 * 3. REMOTE VM MODE (Advanced)
 *    - SSH into cloud VMs (AWS EC2, GCP, etc.)
 *    - Most isolated but requires cloud infrastructure
 *    - Best for resource-intensive labs (Kubernetes clusters, etc.)
 */

import { Server as SocketIOServer } from 'socket.io'
import type { Server as HTTPServer } from 'http'

// node-pty types - dynamically imported since it's native module
type IPty = {
  onData: (callback: (data: string) => void) => void
  onExit: (callback: (exitCode: { exitCode: number }) => void) => void
  write: (data: string) => void
  resize: (cols: number, rows: number) => void
  kill: () => void
}

interface TerminalSession {
  pty: IPty
  userId: string
  lessonId?: string
  createdAt: Date
}

const sessions = new Map<string, TerminalSession>()

/**
 * Initialize the terminal WebSocket server
 * This should be called from a custom Next.js server (not the default dev server)
 */
export function initTerminalServer(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    path: '/api/terminal/socket',
    cors: {
      origin: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', async (socket) => {
    console.log('Terminal client connected:', socket.id)

    socket.on('terminal:start', async (data: { 
      lessonId?: string
      mode?: 'local' | 'docker'
      image?: string
    }) => {
      try {
        // Dynamic import of node-pty (native module)
        const nodePty = await import('node-pty')
        
        // Determine shell based on platform
        const shell = process.platform === 'win32' ? 'powershell.exe' : 'zsh'
        const shellArgs = process.platform === 'win32' ? [] : ['-l']

        // Spawn PTY
        const pty = nodePty.spawn(shell, shellArgs, {
          name: 'xterm-256color',
          cols: 80,
          rows: 30,
          cwd: process.env.HOME || '/tmp',
          env: {
            ...process.env,
            TERM: 'xterm-256color',
            COLORTERM: 'truecolor',
            // Add custom env vars for DevOps tools
            DEVOPS_ACADEMY_LAB: 'true',
            LESSON_ID: data.lessonId || 'sandbox',
          } as Record<string, string>,
        })

        // Store session
        sessions.set(socket.id, {
          pty,
          userId: socket.id,
          lessonId: data.lessonId,
          createdAt: new Date(),
        })

        // Send data from PTY to client
        pty.onData((data: string) => {
          socket.emit('terminal:data', data)
        })

        // Handle PTY exit
        pty.onExit(({ exitCode }) => {
          console.log(`Terminal ${socket.id} exited with code ${exitCode}`)
          socket.emit('terminal:exit', exitCode)
          sessions.delete(socket.id)
        })

        socket.emit('terminal:ready', { mode: 'local' })
        console.log(`Terminal started for ${socket.id}, lesson: ${data.lessonId}`)

      } catch (error) {
        console.error('Failed to start terminal:', error)
        socket.emit('terminal:error', { 
          message: 'Failed to start terminal. node-pty may not be installed correctly.',
          details: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    })

    // Receive data from client (keystrokes)
    socket.on('terminal:input', (data: string) => {
      const session = sessions.get(socket.id)
      if (session?.pty) {
        session.pty.write(data)
      }
    })

    // Handle terminal resize
    socket.on('terminal:resize', ({ cols, rows }: { cols: number; rows: number }) => {
      const session = sessions.get(socket.id)
      if (session?.pty) {
        session.pty.resize(cols, rows)
      }
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Terminal client disconnected:', socket.id)
      const session = sessions.get(socket.id)
      if (session?.pty) {
        session.pty.kill()
      }
      sessions.delete(socket.id)
    })
  })

  console.log('Terminal WebSocket server initialized')
  return io
}

/**
 * Docker mode terminal spawner (for production)
 * Creates an isolated container for each session
 */
export async function spawnDockerTerminal(
  socket: any,
  options: {
    image?: string
    lessonId?: string
    timeout?: number
  }
) {
  const { spawn } = await import('child_process')
  
  const containerName = `devops-lab-${socket.id.substring(0, 8)}`
  const image = options.image || 'devops-academy-lab:latest'
  
  // Run docker container with attached terminal
  const docker = spawn('docker', [
    'run',
    '--rm',
    '-it',
    '--name', containerName,
    '--memory', '512m',
    '--cpus', '0.5',
    '-e', `LESSON_ID=${options.lessonId || 'sandbox'}`,
    image,
    '/bin/bash'
  ], {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  docker.stdout?.on('data', (data: Buffer) => {
    socket.emit('terminal:data', data.toString())
  })

  docker.stderr?.on('data', (data: Buffer) => {
    socket.emit('terminal:data', data.toString())
  })

  docker.on('close', (code: number) => {
    socket.emit('terminal:exit', code)
  })

  // Handle input from client
  socket.on('terminal:input', (data: string) => {
    docker.stdin?.write(data)
  })

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    spawn('docker', ['stop', containerName])
  })

  // Auto-timeout (30 minutes default)
  const timeout = options.timeout || 30 * 60 * 1000
  setTimeout(() => {
    spawn('docker', ['stop', containerName])
    socket.emit('terminal:timeout', { message: 'Session timed out after 30 minutes' })
  }, timeout)

  return docker
}
