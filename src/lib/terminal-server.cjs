/**
 * Terminal Server for DevOps Academy
 * Supports: Local PTY, Docker Container, SSH connections
 */

const { Server: SocketIOServer } = require('socket.io')
const { spawn, execSync } = require('child_process')

const sessions = new Map()

/**
 * Initialize the terminal WebSocket server
 */
function initTerminalServer(httpServer) {
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

    socket.on('terminal:start', async (data) => {
      const mode = data?.mode || 'local'
      console.log(`Starting terminal in ${mode} mode`)

      try {
        switch (mode) {
          case 'docker':
            await startDockerTerminal(socket, data)
            break
          case 'ssh':
            await startSSHTerminal(socket, data)
            break
          case 'local':
          default:
            await startLocalTerminal(socket, data)
            break
        }
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
 * Start a local PTY terminal
 */
async function startLocalTerminal(socket, data) {
  const nodePty = require('node-pty')
  
  // Determine shell based on platform
  let shell, shellArgs
  if (process.platform === 'win32') {
    shell = 'powershell.exe'
    shellArgs = []
  } else if (process.platform === 'darwin') {
    shell = process.env.SHELL || '/bin/zsh'
    shellArgs = ['-l']
  } else {
    shell = process.env.SHELL || '/bin/bash'
    shellArgs = ['-l']
  }

  console.log(`[Local] Spawning shell: ${shell}`)

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
    },
  })

  setupPtySession(socket, pty, 'local', data?.lessonId)
}

/**
 * Start a Docker container terminal
 */
async function startDockerTerminal(socket, data) {
  const nodePty = require('node-pty')
  const dockerConfig = data?.docker || {}
  const containerName = dockerConfig.containerName || 'devops-lab'
  const image = dockerConfig.image || 'devops-academy-lab:latest'
  
  console.log(`[Docker] Connecting to container: ${containerName}`)

  // Check if container exists and is running
  let containerRunning = false
  try {
    const status = execSync(`docker inspect -f '{{.State.Running}}' ${containerName} 2>/dev/null`, { encoding: 'utf-8' }).trim()
    containerRunning = status === 'true'
  } catch (e) {
    // Container doesn't exist
  }

  if (!containerRunning) {
    // Start or create container
    if (dockerConfig.autoStart !== false) {
      socket.emit('terminal:data', `\x1b[33mStarting Docker container: ${containerName}...\x1b[0m\r\n`)
      
      try {
        // Try to start existing container
        execSync(`docker start ${containerName} 2>/dev/null`, { encoding: 'utf-8' })
      } catch (e) {
        // Container doesn't exist, create it
        try {
          socket.emit('terminal:data', `\x1b[33mCreating new container from ${image}...\x1b[0m\r\n`)
          execSync(`docker run -d --name ${containerName} ${image} tail -f /dev/null`, { encoding: 'utf-8' })
        } catch (createError) {
          throw new Error(`Failed to create container: ${createError.message}`)
        }
      }
      
      // Wait a moment for container to be ready
      await new Promise(resolve => setTimeout(resolve, 1000))
    } else {
      throw new Error(`Container ${containerName} is not running and autoStart is disabled`)
    }
  }

  // Connect to container via docker exec
  const pty = nodePty.spawn('docker', ['exec', '-it', containerName, '/bin/bash'], {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME || '/tmp',
    env: {
      ...process.env,
      TERM: 'xterm-256color',
    },
  })

  setupPtySession(socket, pty, 'docker', data?.lessonId)
}

/**
 * Start an SSH terminal connection
 */
async function startSSHTerminal(socket, data) {
  const nodePty = require('node-pty')
  const sshConfig = data?.ssh || {}
  
  if (!sshConfig.host || !sshConfig.username) {
    throw new Error('SSH host and username are required')
  }

  const port = sshConfig.port || 22
  const privateKeyPath = sshConfig.privateKeyPath?.replace('~', process.env.HOME)
  
  console.log(`[SSH] Connecting to ${sshConfig.username}@${sshConfig.host}:${port}`)
  socket.emit('terminal:data', `\x1b[33mConnecting to ${sshConfig.host}...\x1b[0m\r\n`)

  // Build SSH command
  const sshArgs = [
    '-o', 'StrictHostKeyChecking=accept-new',
    '-o', 'ServerAliveInterval=60',
    '-p', String(port),
  ]
  
  if (privateKeyPath) {
    sshArgs.push('-i', privateKeyPath)
  }
  
  sshArgs.push(`${sshConfig.username}@${sshConfig.host}`)

  const pty = nodePty.spawn('ssh', sshArgs, {
    name: 'xterm-256color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME || '/tmp',
    env: {
      ...process.env,
      TERM: 'xterm-256color',
    },
  })

  setupPtySession(socket, pty, 'ssh', data?.lessonId)
}

/**
 * Common PTY session setup
 */
function setupPtySession(socket, pty, mode, lessonId) {
  sessions.set(socket.id, {
    pty,
    mode,
    lessonId,
    createdAt: new Date(),
  })

  pty.onData((data) => {
    socket.emit('terminal:data', data)
  })

  pty.onExit(({ exitCode }) => {
    console.log(`Terminal ${socket.id} (${mode}) exited with code ${exitCode}`)
    socket.emit('terminal:exit', exitCode)
    sessions.delete(socket.id)
  })

  socket.emit('terminal:ready', { mode })
  console.log(`Terminal started for ${socket.id} in ${mode} mode`)
}

module.exports = { initTerminalServer }
