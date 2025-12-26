/**
 * Standalone Terminal Server for Render.com
 * 
 * This is a lightweight Express + Socket.IO server that provides
 * real terminal access via WebSockets. Deploy this to Render.com
 * while the main Next.js app runs on Vercel.
 */

const http = require('http')
const { Server: SocketIOServer } = require('socket.io')
const { spawn, execSync } = require('child_process')

const PORT = process.env.PORT || 3001
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL, // Your Vercel URL
  /\.vercel\.app$/,
  /\.render\.com$/,
].filter(Boolean)

const sessions = new Map()

// CORS headers helper
const setCorsHeaders = (res, origin) => {
  res.setHeader('Access-Control-Allow-Origin', origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const origin = req.headers.origin
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res, origin)
    res.writeHead(204)
    res.end()
    return
  }
  
  // Health check endpoint
  if (req.url === '/health' || req.url === '/') {
    setCorsHeaders(res, origin)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 
      status: 'ok', 
      service: 'DevOps Academy Terminal Server',
      sessions: sessions.size,
      uptime: process.uptime()
    }))
    return
  }
  
  res.writeHead(404)
  res.end('Not Found')
})

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  path: '/api/terminal/socket',
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true)
      
      // Check against allowed origins
      const isAllowed = ALLOWED_ORIGINS.some(allowed => {
        if (allowed instanceof RegExp) {
          return allowed.test(origin)
        }
        return allowed === origin
      })
      
      if (isAllowed) {
        callback(null, true)
      } else {
        console.warn(`Blocked origin: ${origin}`)
        callback(null, true) // Be permissive for now
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', async (socket) => {
  console.log('Terminal client connected:', socket.id)

  socket.on('terminal:start', async (data) => {
    const mode = data?.mode || 'local'
    console.log(`Starting terminal in ${mode} mode for ${socket.id}`)

    try {
      await startLocalTerminal(socket, data)
    } catch (error) {
      console.error('Failed to start terminal:', error)
      socket.emit('terminal:error', { 
        message: 'Failed to start terminal',
        details: error.message
      })
    }
  })

  // Receive data from client (keystrokes)
  socket.on('terminal:input', (data) => {
    const session = sessions.get(socket.id)
    if (session?.pty) {
      session.pty.write(data)
    }
  })

  // Handle terminal resize
  socket.on('terminal:resize', ({ cols, rows }) => {
    const session = sessions.get(socket.id)
    if (session?.pty) {
      try {
        session.pty.resize(cols, rows)
      } catch (e) {
        // Ignore resize errors
      }
    }
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Terminal client disconnected:', socket.id)
    const session = sessions.get(socket.id)
    if (session?.pty) {
      try {
        session.pty.kill()
      } catch (e) {
        // Already dead
      }
    }
    sessions.delete(socket.id)
  })
})

/**
 * Start a local PTY terminal
 */
async function startLocalTerminal(socket, data) {
  const nodePty = require('node-pty')
  
  // Determine shell based on platform
  let shell, shellArgs
  if (process.platform === 'win32') {
    shell = 'powershell.exe'
    shellArgs = []
  } else {
    shell = '/bin/bash'
    shellArgs = ['-l']
  }

  console.log(`[Local] Spawning shell: ${shell} for ${socket.id}`)

  const pty = nodePty.spawn(shell, shellArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME || '/tmp',
    env: {
      ...process.env,
      TERM: 'xterm-256color',
      COLORTERM: 'truecolor',
      DEVOPS_ACADEMY_LAB: 'true',
      LESSON_ID: data?.lessonId || 'sandbox',
      // Welcome message
      PS1: '\\[\\033[1;32m\\]devops-lab\\[\\033[0m\\]:\\[\\033[1;34m\\]\\w\\[\\033[0m\\]$ ',
    },
  })

  sessions.set(socket.id, {
    pty,
    mode: 'local',
    lessonId: data?.lessonId,
    createdAt: new Date(),
  })

  pty.onData((output) => {
    socket.emit('terminal:data', output)
  })

  pty.onExit(({ exitCode }) => {
    console.log(`Terminal ${socket.id} exited with code ${exitCode}`)
    socket.emit('terminal:exit', exitCode)
    sessions.delete(socket.id)
  })

  socket.emit('terminal:ready', { mode: 'local' })
  
  // Send welcome message
  setTimeout(() => {
    pty.write('echo "🚀 Welcome to DevOps Academy Lab!"\r')
  }, 500)
}

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🖥️  DevOps Academy Terminal Server                          ║
║                                                              ║
║  Port:    ${PORT}                                               ║
║  Status:  Ready                                              ║
║  Health:  http://localhost:${PORT}/health                        ║
╚══════════════════════════════════════════════════════════════╝
  `)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down terminal server...')
  
  // Kill all active sessions
  for (const [id, session] of sessions) {
    if (session.pty) {
      try {
        session.pty.kill()
      } catch (e) {
        // Ignore
      }
    }
  }
  sessions.clear()
  
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
