/**
 * Custom Next.js Server with WebSocket Support
 * 
 * This server enables real terminal functionality by adding WebSocket support
 * for node-pty connections. Run with: node server.js
 * 
 * For development, use the simulated terminal (npm run dev)
 * For production labs, use this server (node server.js)
 */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  // Initialize terminal WebSocket server
  try {
    const { initTerminalServer } = require('./src/lib/terminal-server.cjs')
    initTerminalServer(server)
    console.log('✓ Terminal WebSocket server enabled (real PTY)')
  } catch (error) {
    console.warn('⚠ Terminal server not available:', error.message)
    console.warn('  Install node-pty: npm install node-pty')
  }

  server.listen(port, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🚀 DevOps Academy Server                                    ║
║                                                              ║
║  Local:   http://${hostname}:${port}                              ║
║  Mode:    ${dev ? 'Development' : 'Production'}                                        ║
║  Terminal: WebSocket enabled                                 ║
╚══════════════════════════════════════════════════════════════╝
    `)
  })
})
