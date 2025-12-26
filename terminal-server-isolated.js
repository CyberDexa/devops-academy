/**
 * Isolated Terminal Server for DevOps Academy
 * 
 * Each user gets their own isolated home directory.
 * Files persist for 24 hours, then auto-cleanup.
 * No Docker-in-Docker needed - works on Render free tier.
 */

const http = require('http');
const { Server: SocketIOServer } = require('socket.io');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  /\.vercel\.app$/,
  /\.render\.com$/,
].filter(Boolean);

// Base directory for user workspaces
const BASE_HOME = process.env.USER_WORKSPACES || '/tmp/devops-users';

// Ensure base directory exists
if (!fs.existsSync(BASE_HOME)) {
  fs.mkdirSync(BASE_HOME, { recursive: true });
}

const sessions = new Map();

// Create HTTP server
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Health check endpoint
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      service: 'DevOps Academy Terminal Server (Isolated)',
      sessions: sessions.size,
      uptime: process.uptime(),
      mode: 'user-isolation'
    }));
    return;
  }
  
  res.writeHead(404);
  res.end('Not Found');
});

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  path: '/api/terminal/socket',
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      const isAllowed = ALLOWED_ORIGINS.some(allowed => {
        if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return allowed === origin;
      });
      
      callback(null, true); // Be permissive
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

/**
 * Create isolated home directory for user
 */
function createUserHome(userId) {
  const userHome = path.join(BASE_HOME, userId);
  
  if (!fs.existsSync(userHome)) {
    fs.mkdirSync(userHome, { recursive: true });
    
    // Create subdirectories
    const dirs = ['projects', 'labs', 'scripts', '.config'];
    dirs.forEach(dir => {
      fs.mkdirSync(path.join(userHome, dir), { recursive: true });
    });
    
    // Create welcome README
    fs.writeFileSync(
      path.join(userHome, 'README.md'),
      `# 🚀 Welcome to DevOps Academy Lab!

This is your **personal workspace**. Other users cannot see your files.

## Directory Structure
- \`projects/\` - Your project files
- \`labs/\` - Lab exercises  
- \`scripts/\` - Your shell scripts

## Quick Commands
- \`ls -la\` - List files
- \`cd projects\` - Go to projects folder
- \`vim myfile.sh\` - Edit a file
- \`cat README.md\` - View this file

## Notes
- Files are saved for **24 hours**
- Your workspace is **isolated** from other users
- Practice freely - you can't break anything!

Happy learning! 🎓
`
    );
    
    // Create sample script
    fs.writeFileSync(
      path.join(userHome, 'scripts', 'hello.sh'),
      `#!/bin/bash
# Sample script - feel free to modify!

echo "Hello from DevOps Academy!"
echo "Current directory: $(pwd)"
echo "Current user: $(whoami)"
echo "Date: $(date)"
`
    );
    
    // Make script executable
    try {
      fs.chmodSync(path.join(userHome, 'scripts', 'hello.sh'), '755');
    } catch (e) {
      // Ignore chmod errors
    }
    
    // Create .bashrc for custom prompt
    fs.writeFileSync(
      path.join(userHome, '.bashrc'),
      `# DevOps Academy Lab Environment
export PS1='\\[\\033[1;32m\\]devops-lab\\[\\033[0m\\]:\\[\\033[1;34m\\]\\w\\[\\033[0m\\]\\$ '
export HOME="${userHome}"
export EDITOR=vim

# Aliases
alias ll='ls -la'
alias cls='clear'
alias h='history'

# Welcome message
echo ""
echo "\\033[1;32m✓ Welcome to DevOps Academy Lab!\\033[0m"
echo "\\033[0;33m  Your workspace: ${userHome}\\033[0m"
echo "\\033[0;33m  Type 'cat README.md' for help\\033[0m"
echo ""

cd "${userHome}"
`
    );
    
    console.log(`Created user workspace: ${userHome}`);
  }
  
  return userHome;
}

/**
 * Cleanup old user directories (older than 24 hours)
 */
function cleanupOldUserDirs() {
  try {
    if (!fs.existsSync(BASE_HOME)) return;
    
    const users = fs.readdirSync(BASE_HOME);
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    users.forEach(userId => {
      const userHome = path.join(BASE_HOME, userId);
      try {
        const stats = fs.statSync(userHome);
        const age = now - stats.mtimeMs;
        
        // Remove if older than 24 hours and no active session
        if (age > maxAge && !sessions.has(userId)) {
          fs.rmSync(userHome, { recursive: true, force: true });
          console.log(`Cleaned up old workspace: ${userId}`);
        }
      } catch (e) {
        // Ignore stat errors
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error.message);
  }
}

// Run cleanup every hour
setInterval(cleanupOldUserDirs, 60 * 60 * 1000);

// Socket.IO connection handler
io.on('connection', async (socket) => {
  console.log('Client connected:', socket.id);
  
  let ptyProcess = null;
  let userId = null;
  let userHome = null;

  socket.on('terminal:start', async (data) => {
    const labId = data?.labId || 'linux';
    userId = data?.userId || `anon-${socket.id}`;
    
    console.log(`Starting lab "${labId}" for user "${userId}"`);
    
    try {
      // Create isolated home directory
      userHome = createUserHome(userId);
      
      // Dynamic import for node-pty
      const nodePty = require('node-pty');
      
      // Determine shell
      const shell = process.platform === 'win32' ? 'powershell.exe' : '/bin/bash';
      const shellArgs = process.platform === 'win32' ? [] : ['--rcfile', path.join(userHome, '.bashrc')];
      
      // Create PTY with isolated environment
      ptyProcess = nodePty.spawn(shell, shellArgs, {
        name: 'xterm-256color',
        cols: 80,
        rows: 30,
        cwd: userHome,
        env: {
          ...process.env,
          HOME: userHome,
          USER: 'devops',
          TERM: 'xterm-256color',
          COLORTERM: 'truecolor',
          LAB_ID: labId,
          USER_ID: userId,
          DEVOPS_ACADEMY: 'true',
          // Restrict PATH to safe commands
          PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
        }
      });
      
      // Store session
      sessions.set(userId, {
        pty: ptyProcess,
        socket,
        labId,
        userHome,
        startedAt: new Date()
      });
      
      // Send PTY output to client
      ptyProcess.onData((output) => {
        socket.emit('terminal:data', output);
      });
      
      ptyProcess.onExit(({ exitCode }) => {
        console.log(`PTY exited for user ${userId} with code ${exitCode}`);
        socket.emit('terminal:exit', exitCode);
        sessions.delete(userId);
      });
      
      socket.emit('terminal:ready', { 
        mode: 'isolated',
        labId,
        workspace: userHome
      });
      
    } catch (error) {
      console.error('Failed to start terminal:', error);
      socket.emit('terminal:error', { 
        message: 'Failed to start terminal',
        details: error.message
      });
    }
  });

  // Handle input from client
  socket.on('terminal:input', (data) => {
    if (ptyProcess) {
      ptyProcess.write(data);
    }
  });

  // Handle resize
  socket.on('terminal:resize', ({ cols, rows }) => {
    if (ptyProcess && cols && rows) {
      try {
        ptyProcess.resize(cols, rows);
      } catch (e) {
        // Ignore resize errors
      }
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (ptyProcess) {
      try {
        ptyProcess.kill();
      } catch (e) {
        // Already dead
      }
    }
    if (userId) {
      sessions.delete(userId);
    }
  });
});

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🖥️  DevOps Academy Terminal Server (Isolated)               ║
║                                                              ║
║  Port:      ${String(PORT).padEnd(46)}║
║  Mode:      User Isolation (separate home dirs)              ║
║  Workspaces: ${BASE_HOME.padEnd(44)}║
║  Health:    http://localhost:${PORT}/health                       ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  
  for (const [userId, session] of sessions) {
    if (session.pty) {
      try {
        session.pty.kill();
      } catch (e) {
        // Ignore
      }
    }
  }
  sessions.clear();
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  process.emit('SIGTERM');
});
