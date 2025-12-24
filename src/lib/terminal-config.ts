// Terminal Configuration Store
// Supports: Local, Docker, and Remote VM (SSH) connections

export type TerminalMode = 'local' | 'docker' | 'ssh'

export interface SSHConfig {
  host: string
  port: number
  username: string
  // Password or private key path (stored securely in env)
  authMethod: 'password' | 'privateKey'
  privateKeyPath?: string
}

export interface DockerConfig {
  containerName: string
  image: string
  // Auto-start container if not running
  autoStart: boolean
}

export interface TerminalConfig {
  mode: TerminalMode
  ssh?: SSHConfig
  docker?: DockerConfig
}

const DEFAULT_CONFIG: TerminalConfig = {
  mode: 'local',
  ssh: {
    host: '',
    port: 22,
    username: '',
    authMethod: 'privateKey',
    privateKeyPath: '~/.ssh/id_rsa'
  },
  docker: {
    containerName: 'devops-lab',
    image: 'devops-academy-lab:latest',
    autoStart: true
  }
}

const CONFIG_KEY = 'devops-academy-terminal-config'

// Get current terminal configuration
export function getTerminalConfig(): TerminalConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_CONFIG
  }
  
  try {
    const stored = localStorage.getItem(CONFIG_KEY)
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.error('Failed to load terminal config:', e)
  }
  
  return DEFAULT_CONFIG
}

// Save terminal configuration
export function saveTerminalConfig(config: Partial<TerminalConfig>): TerminalConfig {
  const current = getTerminalConfig()
  const updated = { ...current, ...config }
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save terminal config:', e)
    }
  }
  
  return updated
}

// Get mode display name
export function getModeDisplayName(mode: TerminalMode): string {
  switch (mode) {
    case 'local': return 'Local Terminal'
    case 'docker': return 'Docker Container'
    case 'ssh': return 'Remote VM (SSH)'
    default: return 'Unknown'
  }
}

// Get mode description
export function getModeDescription(mode: TerminalMode): string {
  switch (mode) {
    case 'local': 
      return 'Connect to your local shell. Uses tools installed on your Mac.'
    case 'docker': 
      return 'Connect to a Docker container with pre-installed DevOps tools.'
    case 'ssh': 
      return 'Connect to a remote VM via SSH. Great for cloud-based labs.'
    default: 
      return ''
  }
}

// Check if Docker is available (client-side check via API)
export async function checkDockerAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/terminal/docker-status')
    const data = await res.json()
    return data.available === true
  } catch {
    return false
  }
}

// Validate SSH config
export function validateSSHConfig(config: SSHConfig): string[] {
  const errors: string[] = []
  
  if (!config.host) errors.push('Host is required')
  if (!config.username) errors.push('Username is required')
  if (config.port < 1 || config.port > 65535) errors.push('Invalid port number')
  if (config.authMethod === 'privateKey' && !config.privateKeyPath) {
    errors.push('Private key path is required')
  }
  
  return errors
}
