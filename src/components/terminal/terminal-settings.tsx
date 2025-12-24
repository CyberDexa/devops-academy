"use client"

import { useState, useEffect } from "react"
import { 
  Monitor, 
  Container, 
  Cloud, 
  Settings, 
  Check, 
  AlertCircle,
  Loader2,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { 
  TerminalMode, 
  TerminalConfig,
  getTerminalConfig, 
  saveTerminalConfig,
  getModeDisplayName,
  getModeDescription,
  checkDockerAvailable,
  validateSSHConfig
} from "@/lib/terminal-config"

interface TerminalSettingsProps {
  onConfigChange?: (config: TerminalConfig) => void
  compact?: boolean
}

export function TerminalSettings({ onConfigChange, compact = false }: TerminalSettingsProps) {
  const [config, setConfig] = useState<TerminalConfig>(getTerminalConfig())
  const [dockerAvailable, setDockerAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)
  const [sshErrors, setSSHErrors] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Check Docker availability on mount
    checkDocker()
  }, [])

  const checkDocker = async () => {
    setChecking(true)
    const available = await checkDockerAvailable()
    setDockerAvailable(available)
    setChecking(false)
  }

  const handleModeChange = (mode: TerminalMode) => {
    const newConfig = saveTerminalConfig({ mode })
    setConfig(newConfig)
    onConfigChange?.(newConfig)
  }

  const handleSSHChange = (field: string, value: string | number) => {
    const newSSH = { ...config.ssh!, [field]: value }
    const errors = validateSSHConfig(newSSH)
    setSSHErrors(errors)
    
    const newConfig = saveTerminalConfig({ ssh: newSSH })
    setConfig(newConfig)
    onConfigChange?.(newConfig)
  }

  const handleDockerChange = (field: string, value: string | boolean) => {
    const newDocker = { ...config.docker!, [field]: value }
    const newConfig = saveTerminalConfig({ docker: newDocker })
    setConfig(newConfig)
    onConfigChange?.(newConfig)
  }

  const getModeIcon = (mode: TerminalMode) => {
    switch (mode) {
      case 'local': return <Monitor className="h-4 w-4" />
      case 'docker': return <Container className="h-4 w-4" />
      case 'ssh': return <Cloud className="h-4 w-4" />
    }
  }

  const getModeStatus = (mode: TerminalMode) => {
    switch (mode) {
      case 'local': 
        return <Badge variant="success" className="text-xs">Available</Badge>
      case 'docker': 
        if (checking) return <Loader2 className="h-3 w-3 animate-spin" />
        return dockerAvailable 
          ? <Badge variant="success" className="text-xs">Available</Badge>
          : <Badge variant="outline" className="text-xs">Not Running</Badge>
      case 'ssh':
        if (!config.ssh?.host) return <Badge variant="outline" className="text-xs">Not Configured</Badge>
        if (sshErrors.length > 0) return <Badge variant="destructive" className="text-xs">Invalid</Badge>
        return <Badge variant="warning" className="text-xs">Ready to Test</Badge>
    }
  }

  // Compact mode - just a dropdown
  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            {getModeIcon(config.mode)}
            <span className="hidden sm:inline">{getModeDisplayName(config.mode)}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleModeChange('local')}>
            <Monitor className="h-4 w-4 mr-2" />
            Local Terminal
            {config.mode === 'local' && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleModeChange('docker')}>
            <Container className="h-4 w-4 mr-2" />
            Docker Container
            {config.mode === 'docker' && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleModeChange('ssh')}>
            <Cloud className="h-4 w-4 mr-2" />
            Remote VM (SSH)
            {config.mode === 'ssh' && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Full settings dialog
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Terminal Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terminal Configuration</DialogTitle>
          <DialogDescription>
            Choose how you want to connect to your lab environment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mode Selection */}
          <RadioGroup value={config.mode} onValueChange={(v: string) => handleModeChange(v as TerminalMode)}>
            <div className="grid gap-4">
              {/* Local Terminal */}
              <label htmlFor="local" className="cursor-pointer">
                <Card className={`transition-all ${config.mode === 'local' ? 'border-cyan-500 bg-cyan-500/5' : 'hover:border-slate-600'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="local" id="local" />
                        <Monitor className="h-5 w-5 text-orange-400" />
                        <CardTitle className="text-base">Local Terminal</CardTitle>
                      </div>
                      {getModeStatus('local')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{getModeDescription('local')}</CardDescription>
                  </CardContent>
                </Card>
              </label>

              {/* Docker Container */}
              <label htmlFor="docker" className="cursor-pointer">
                <Card className={`transition-all ${config.mode === 'docker' ? 'border-cyan-500 bg-cyan-500/5' : 'hover:border-slate-600'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="docker" id="docker" />
                        <Container className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-base">Docker Container</CardTitle>
                      </div>
                      {getModeStatus('docker')}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{getModeDescription('docker')}</CardDescription>
                    
                    {config.mode === 'docker' && (
                      <div className="grid gap-3 pt-2 border-t border-slate-800">
                        <div className="space-y-2">
                          <Label htmlFor="container-name">Container Name</Label>
                          <Input 
                            id="container-name"
                            value={config.docker?.containerName || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDockerChange('containerName', e.target.value)}
                            placeholder="devops-lab"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docker-image">Image</Label>
                          <Input 
                            id="docker-image"
                            value={config.docker?.image || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDockerChange('image', e.target.value)}
                            placeholder="devops-academy-lab:latest"
                          />
                        </div>
                        {!dockerAvailable && (
                          <div className="flex items-center gap-2 text-amber-400 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            Docker is not running. Start Docker Desktop to use this mode.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </label>

              {/* Remote VM (SSH) */}
              <label htmlFor="ssh" className="cursor-pointer">
                <Card className={`transition-all ${config.mode === 'ssh' ? 'border-cyan-500 bg-cyan-500/5' : 'hover:border-slate-600'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="ssh" id="ssh" />
                        <Cloud className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-base">Remote VM (SSH)</CardTitle>
                      </div>
                      {getModeStatus('ssh')}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{getModeDescription('ssh')}</CardDescription>
                    
                    {config.mode === 'ssh' && (
                      <div className="grid gap-3 pt-2 border-t border-slate-800">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="ssh-host">Host</Label>
                            <Input 
                              id="ssh-host"
                              value={config.ssh?.host || ''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSSHChange('host', e.target.value)}
                              placeholder="your-vm.cloud.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ssh-port">Port</Label>
                            <Input 
                              id="ssh-port"
                              type="number"
                              value={config.ssh?.port || 22}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSSHChange('port', parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ssh-username">Username</Label>
                          <Input 
                            id="ssh-username"
                            value={config.ssh?.username || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSSHChange('username', e.target.value)}
                            placeholder="ubuntu"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ssh-key">Private Key Path</Label>
                          <Input 
                            id="ssh-key"
                            value={config.ssh?.privateKeyPath || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSSHChange('privateKeyPath', e.target.value)}
                            placeholder="~/.ssh/id_rsa"
                          />
                        </div>
                        
                        {sshErrors.length > 0 && (
                          <div className="space-y-1">
                            {sshErrors.map((error, i) => (
                              <div key={i} className="flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-400">
                          <p className="font-medium text-white mb-1">💡 Free VM Options:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• <strong>Oracle Cloud</strong> - Always free ARM VMs (24GB RAM)</li>
                            <li>• <strong>Google Cloud</strong> - e2-micro always free</li>
                            <li>• <strong>GitHub Codespaces</strong> - 60 hrs/month free</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </label>
            </div>
          </RadioGroup>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
