"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { 
  Terminal as TerminalIcon, 
  Container, 
  Cloud, 
  GitBranch,
  Database,
  Server,
  Play,
  BookOpen,
  ExternalLink,
  CheckCircle,
  Info,
  Zap,
  Code,
  GraduationCap,
  FileCode,
  ChevronRight,
  Sparkles,
  Brain,
  Network,
  Blocks,
  ArrowLeft,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RealTerminal } from "@/components/terminal/real-terminal"
import { TerminalSettings } from "@/components/terminal/terminal-settings"
import { GuidedExercise } from "@/components/labs/guided-exercise"
import { getExercisesForLab } from "@/data/lab-exercises"
import { 
  labEnvironments, 
  getInternalLabs, 
  getExternalLabs, 
  type LabEnvironment 
} from "@/data/lab-environments"

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Terminal: TerminalIcon,
  Container,
  Network,
  GitBranch,
  Blocks,
  Brain,
  Code,
  GraduationCap,
  FileCode,
  Server,
  Cloud,
  Database
}

export function LabsPage() {
  const [activeLab, setActiveLab] = useState<string | null>(null)
  const [showExercises, setShowExercises] = useState(true)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [terminalServerStatus, setTerminalServerStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal')

  const internalLabs = getInternalLabs()
  const externalLabs = getExternalLabs()

  const activeLabData = useMemo(
    () => labEnvironments.find((l) => l.id === activeLab),
    [activeLab]
  )

  // Get exercise count for each lab
  const labExerciseCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    labEnvironments.forEach(lab => {
      counts[lab.id] = getExercisesForLab(lab.id).length
    })
    return counts
  }, [])

  // Handle command from terminal for validation
  const handleTerminalCommand = useCallback((command: string) => {
    setLastCommand(command)
  }, [])

  // Check terminal server status
  useEffect(() => {
    const checkServer = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_TERMINAL_SERVER_URL || ''
        if (!serverUrl) {
          // No external server configured, check local
          const response = await fetch('/api/terminal/docker-status', { 
            cache: 'no-store',
            signal: AbortSignal.timeout(5000)
          })
          if (response.ok) {
            setTerminalServerStatus('online')
          } else {
            setTerminalServerStatus('offline')
          }
        } else {
          const response = await fetch(`${serverUrl}/health`, { 
            mode: 'cors',
            signal: AbortSignal.timeout(5000)
          })
          if (response.ok) {
            setTerminalServerStatus('online')
          } else {
            setTerminalServerStatus('offline')
          }
        }
      } catch {
        setTerminalServerStatus('offline')
      }
    }
    
    checkServer()
    const interval = setInterval(checkServer, 30000)
    return () => clearInterval(interval)
  }, [])

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || TerminalIcon
  }

  const handleLaunchLab = (lab: LabEnvironment) => {
    if (lab.type === 'external' && lab.externalConfig) {
      window.open(lab.externalConfig.url, '_blank', 'noopener,noreferrer')
    } else {
      setActiveLab(lab.id)
      setShowExercises(true)
    }
  }

  const handleCloseLab = () => {
    setActiveLab(null)
    setShowExercises(true)
  }

  // Active internal lab view
  if (activeLab && activeLabData?.type === 'internal') {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={handleCloseLab}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Labs
            </Button>
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = getIcon(activeLabData.icon)
                return <Icon className="w-6 h-6 text-emerald-400" />
              })()}
              <div>
                <h1 className="text-xl font-bold text-white">{activeLabData.name}</h1>
                <p className="text-sm text-slate-400">{activeLabData.description}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              <Zap className="w-3 h-3 mr-1" />
              Isolated Workspace
            </Badge>
            <TerminalSettings compact />
          </div>
        </div>

        {/* Tab toggle */}
        <div className="flex gap-2">
          <Button 
            variant={!showExercises ? "default" : "outline"}
            size="sm"
            onClick={() => setShowExercises(false)}
          >
            Quick Start
          </Button>
          <Button 
            variant={showExercises ? "default" : "outline"}
            size="sm"
            onClick={() => setShowExercises(true)}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Guided Exercises
            {labExerciseCounts[activeLab] > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {labExerciseCounts[activeLab]}
              </Badge>
            )}
          </Button>
        </div>

        {/* Quick Start Panel */}
        {!showExercises && activeLabData.internalConfig && (
          <Card className="border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Start</CardTitle>
              <CardDescription>
                Available tools and getting started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-semibold text-white mb-2">Available Tools</div>
                <div className="flex flex-wrap gap-2">
                  {activeLabData.internalConfig.tools.map((tool) => (
                    <Badge key={tool} variant="outline">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <p className="font-medium text-white mb-1">Your Isolated Workspace</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>Files are saved in your personal directory for 24 hours</li>
                      <li>Other users cannot see your work</li>
                      <li>Type <code className="px-1 py-0.5 bg-slate-700 rounded text-cyan-400">cat README.md</code> for help</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guided Exercises Panel */}
        {showExercises && (
          <GuidedExercise 
            labId={activeLab} 
            lastCommand={lastCommand}
          />
        )}

        {/* Terminal */}
        <RealTerminal 
          lessonId={activeLab}
          onCommand={handleTerminalCommand} 
        />
      </div>
    )
  }

  // Lab selection view
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Practice Labs</h1>
          <p className="text-slate-400 mt-1">
            Hands-on environments to practice DevOps skills
          </p>
        </div>
        <TerminalSettings />
      </div>

      {/* Server Status */}
      <Card className="border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                terminalServerStatus === 'online' ? 'bg-emerald-500' : 
                terminalServerStatus === 'offline' ? 'bg-yellow-500' : 
                'bg-slate-500'
              } animate-pulse`} />
              <span className="text-slate-300">
                {terminalServerStatus === 'online' 
                  ? 'Terminal server online - Internal labs ready!' 
                  : terminalServerStatus === 'offline' 
                    ? 'Terminal server offline - Use external labs below'
                    : 'Checking server status...'}
              </span>
            </div>
            {terminalServerStatus === 'offline' && (
              <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                External labs always available
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'internal' ? 'default' : 'outline'}
          onClick={() => setActiveTab('internal')}
          className={activeTab === 'internal' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
        >
          <TerminalIcon className="w-4 h-4 mr-2" />
          Internal Labs ({internalLabs.length})
        </Button>
        <Button
          variant={activeTab === 'external' ? 'default' : 'outline'}
          onClick={() => setActiveTab('external')}
          className={activeTab === 'external' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          External Labs ({externalLabs.length})
        </Button>
      </div>

      {/* Internal Labs Tab */}
      {activeTab === 'internal' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <Card className="bg-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-medium">Interactive Terminal Labs</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Practice with real Linux terminals directly in your browser. 
                    Follow guided exercises to master essential DevOps skills!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internalLabs.map((lab) => {
              const Icon = getIcon(lab.icon)
              return (
                <Card 
                  key={lab.id}
                  className="hover:border-emerald-500/50 transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                        Internal
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{lab.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {lab.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {lab.internalConfig?.features?.slice(0, 3).map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className="text-xs border-slate-700 text-slate-400"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-emerald-400" />
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Instructions */}
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-300 mb-2">Quick Start:</p>
                      <ol className="text-xs text-slate-400 space-y-1">
                        {lab.internalConfig?.instructions?.slice(0, 3).map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-medium">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tools */}
                    <div>
                      <p className="text-xs font-medium text-slate-300 mb-2">Available Tools:</p>
                      <div className="flex flex-wrap gap-1">
                        {lab.internalConfig?.tools.slice(0, 6).map((tool) => (
                          <Badge 
                            key={tool} 
                            variant="outline" 
                            className="text-xs border-slate-700 text-slate-400"
                          >
                            {tool}
                          </Badge>
                        ))}
                        {(lab.internalConfig?.tools.length || 0) > 6 && (
                          <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                            +{(lab.internalConfig?.tools.length || 0) - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {labExerciseCounts[lab.id] > 0 && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <BookOpen className="w-4 h-4" />
                        {labExerciseCounts[lab.id]} guided exercises
                      </div>
                    )}

                    <Button 
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={terminalServerStatus !== 'online'}
                      onClick={() => terminalServerStatus === 'online' && handleLaunchLab(lab)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {terminalServerStatus === 'online' ? 'Launch Lab' : 'Server Offline'}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {terminalServerStatus === 'offline' && (
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-medium">Terminal Server Offline</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Internal labs require the terminal server. Check the &quot;External Labs&quot; tab for 
                      free alternatives like Play with Docker and Killercoda.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Internal Labs Comparison Table */}
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Lab Comparison</CardTitle>
              <CardDescription>Choose the right lab for your learning goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Lab</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Best For</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Key Skills</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Exercises</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Linux Fundamentals</td>
                      <td className="py-3 px-4">Beginners, CLI basics</td>
                      <td className="py-3 px-4">File ops, navigation, permissions</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                          {labExerciseCounts['linux'] || 0}
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Git & Version Control</td>
                      <td className="py-3 px-4">Developers, collaboration</td>
                      <td className="py-3 px-4">Branching, merging, workflows</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                          {labExerciseCounts['git'] || 0}
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Terraform & IaC</td>
                      <td className="py-3 px-4">Infrastructure engineers</td>
                      <td className="py-3 px-4">HCL, modules, state</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                          {labExerciseCounts['terraform'] || 0}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Shell Scripting</td>
                      <td className="py-3 px-4">Automation, DevOps</td>
                      <td className="py-3 px-4">Bash, awk, sed, automation</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                          {labExerciseCounts['scripting'] || 0}
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* External Labs Tab */}
      {activeTab === 'external' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">Free External Platforms</p>
                  <p className="text-slate-400 text-sm mt-1">
                    These platforms provide free Docker and Kubernetes environments with more resources. 
                    Perfect for container and orchestration practice!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Lab Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalLabs.map((lab) => {
              const Icon = getIcon(lab.icon)
              return (
                <Card 
                  key={lab.id}
                  className="hover:border-blue-500/50 transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-0">
                        {lab.externalConfig?.platform}
                      </Badge>
                    </div>
                    <CardTitle className="text-white mt-4">{lab.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {lab.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {lab.externalConfig?.features.slice(0, 3).map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="outline" 
                          className="text-xs border-slate-700 text-slate-400"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 text-emerald-400" />
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Instructions */}
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-300 mb-2">Quick Start:</p>
                      <ol className="text-xs text-slate-400 space-y-1">
                        {lab.externalConfig?.instructions.slice(0, 3).map((step, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 font-medium">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleLaunchLab(lab)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open {lab.externalConfig?.platform}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Comparison Table */}
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Comparison</CardTitle>
              <CardDescription>Choose the right platform for your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Platform</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Best For</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Session Time</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Account Needed</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Play with Docker</td>
                      <td className="py-3 px-4">Docker basics, Compose</td>
                      <td className="py-3 px-4">4 hours</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">No</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Play with K8s</td>
                      <td className="py-3 px-4">Kubernetes clusters</td>
                      <td className="py-3 px-4">4 hours</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">Docker Hub</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Killercoda</td>
                      <td className="py-3 px-4">K8s scenarios, CKA prep</td>
                      <td className="py-3 px-4">60 minutes</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-400">Optional</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4 font-medium">Gitpod</td>
                      <td className="py-3 px-4">Extended Docker work</td>
                      <td className="py-3 px-4">50 hrs/month</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">GitHub</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Google Colab</td>
                      <td className="py-3 px-4">MLOps, Python ML</td>
                      <td className="py-3 px-4">12 hours</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-yellow-500 text-yellow-400">Google</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips Section */}
      <Card className="border-cyan-500/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-3">💡 Lab Tips</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• <strong className="text-white">Internal labs</strong> give you an isolated workspace that persists for 24 hours</li>
            <li>• <strong className="text-white">External labs</strong> provide full Docker/Kubernetes access with more resources</li>
            <li>• No account needed for most labs - just start practicing!</li>
            <li>• Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-xs">Ctrl+L</kbd> to clear the terminal screen</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
