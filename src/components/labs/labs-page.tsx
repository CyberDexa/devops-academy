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
  Clock,
  BookOpen
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RealTerminal } from "@/components/terminal/real-terminal"
import { TerminalSettings } from "@/components/terminal/terminal-settings"
import { GuidedExercise } from "@/components/labs/guided-exercise"
import { getExercisesForLab } from "@/data/lab-exercises"

const labEnvironments = [
  {
    id: "linux",
    name: "Linux Fundamentals",
    description: "Practice shell commands, file operations, and system administration",
    icon: TerminalIcon,
    difficulty: "beginner",
    duration: "30-60 min",
    tools: ["Bash", "Vim", "SSH"],
    color: "from-orange-500 to-red-500",
    quickStart: {
      goals: [
        "Navigate the filesystem and manage files",
        "Inspect processes and system resources",
        "Practice safe command-line workflows",
      ],
      commands: [
        "pwd",
        "ls -la",
        "mkdir -p lab && cd lab",
        "echo 'hello' > hello.txt && cat hello.txt",
        "ps aux | head",
        "df -h",
      ],
    },
  },
  {
    id: "docker",
    name: "Docker Lab",
    description: "Build, run, and manage containerized applications",
    icon: Container,
    difficulty: "intermediate",
    duration: "45-90 min",
    tools: ["Docker", "Docker Compose", "Container Registry"],
    color: "from-blue-500 to-cyan-500",
    quickStart: {
      goals: [
        "Run containers and inspect their state",
        "Build an image from a Dockerfile",
        "Use volumes and port mappings",
      ],
      commands: [
        "docker version",
        "docker ps -a",
        "docker run --rm hello-world",
        "docker run --rm -p 8080:80 nginx",
      ],
    },
  },
  {
    id: "kubernetes",
    name: "Kubernetes Cluster",
    description: "Deploy and orchestrate containers at scale",
    icon: Cloud,
    difficulty: "advanced",
    duration: "60-120 min",
    tools: ["kubectl", "Helm", "Minikube"],
    color: "from-blue-600 to-indigo-600",
    quickStart: {
      goals: [
        "Explore cluster resources",
        "Deploy a workload and expose it",
        "Inspect logs and rollouts",
      ],
      commands: [
        "kubectl version --client",
        "kubectl get ns",
        "kubectl get nodes",
        "kubectl create deployment web --image=nginx",
        "kubectl get deploy,po",
      ],
    },
  },
  {
    id: "git",
    name: "Git & CI/CD",
    description: "Version control and continuous integration pipelines",
    icon: GitBranch,
    difficulty: "beginner",
    duration: "30-45 min",
    tools: ["Git", "GitHub Actions", "GitLab CI"],
    color: "from-purple-500 to-pink-500",
    quickStart: {
      goals: [
        "Practice core git workflows",
        "Understand branching and merge conflicts",
        "Write a minimal CI pipeline mindset",
      ],
      commands: [
        "git --version",
        "mkdir repo && cd repo && git init",
        "echo 'demo' > README.md && git add . && git commit -m 'init'",
        "git checkout -b feature/demo",
      ],
    },
  },
  {
    id: "terraform",
    name: "Infrastructure as Code",
    description: "Provision cloud infrastructure with Terraform",
    icon: Server,
    difficulty: "intermediate",
    duration: "60-90 min",
    tools: ["Terraform", "AWS CLI", "Azure CLI"],
    color: "from-purple-600 to-violet-600",
    quickStart: {
      goals: [
        "Initialize a Terraform workspace",
        "Validate and format configuration",
        "Plan changes safely",
      ],
      commands: [
        "terraform -v",
        "mkdir tf && cd tf",
        "cat > main.tf <<'EOF'\nterraform { required_version = \">= 1.6.0\" }\n\noutput \"hello\" { value = \"world\" }\nEOF",
        "terraform fmt",
        "terraform init",
        "terraform validate",
        "terraform plan",
      ],
    },
  },
  {
    id: "mlops",
    name: "MLOps Pipeline",
    description: "Deploy and monitor ML models in production",
    icon: Database,
    difficulty: "advanced",
    duration: "90-120 min",
    tools: ["MLflow", "Docker", "Python"],
    color: "from-emerald-500 to-teal-500",
    quickStart: {
      goals: [
        "Create a minimal training script",
        "Package it into a container",
        "Think in terms of metrics, artifacts, and deployment",
      ],
      commands: [
        "python3 --version",
        "python3 -c \"print('hello mlops')\"",
        "docker ps -a",
      ],
    },
  }
]

type DockerStatus =
  | { state: "loading" }
  | { state: "available"; containersCount: number }
  | { state: "unavailable"; error?: string }

export function LabsPage() {
  const [activeTerminal, setActiveTerminal] = useState<string | null>(null)
  const [dockerStatus, setDockerStatus] = useState<DockerStatus>({ state: "loading" })
  const [showExercises, setShowExercises] = useState(true)
  const [lastCommand, setLastCommand] = useState<string>("")

  const activeLab = useMemo(
    () => labEnvironments.find((l) => l.id === activeTerminal),
    [activeTerminal]
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

  useEffect(() => {
    let cancelled = false

    const loadDockerStatus = async () => {
      try {
        setDockerStatus({ state: "loading" })
        const response = await fetch("/api/terminal/docker-status", { cache: "no-store" })
        const data = await response.json()

        if (cancelled) return

        if (data?.available) {
          const containersCount = Array.isArray(data.containers) ? data.containers.length : 0
          setDockerStatus({ state: "available", containersCount })
          return
        }

        setDockerStatus({ state: "unavailable", error: data?.error })
      } catch (error) {
        if (cancelled) return
        setDockerStatus({
          state: "unavailable",
          error: error instanceof Error ? error.message : "Unable to check Docker status",
        })
      }
    }

    loadDockerStatus()
    const intervalId = window.setInterval(loadDockerStatus, 10_000)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header with Terminal Settings */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Practice Labs</h1>
          <p className="text-slate-400 mt-1">Hands-on environments to practice DevOps skills</p>
        </div>
        <TerminalSettings />
      </div>

      {/* Environment Status */}
      <Card className="border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white">Environment Status</h3>
              <p className="text-sm text-slate-400 mt-1">
                Docker is required for container-based labs. The real terminal backend runs via <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">npm run dev:terminal</code>.
              </p>
            </div>
            {dockerStatus.state === "loading" ? (
              <Badge variant="outline">Checking Docker…</Badge>
            ) : dockerStatus.state === "available" ? (
              <Badge variant="success">Docker running ({dockerStatus.containersCount} containers)</Badge>
            ) : (
              <Badge variant="destructive">Docker unavailable</Badge>
            )}
          </div>
          {dockerStatus.state === "unavailable" && (
            <div className="mt-4 text-sm text-slate-400 space-y-1">
              <p>
                Start Docker Desktop (or install Docker) and retry.
                {dockerStatus.error ? <span className="text-slate-500"> ({dockerStatus.error})</span> : null}
              </p>
              <p className="text-slate-500">
                Tip: if you’re running the lab in Docker, make sure the Docker daemon is available to this host.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Terminal */}
      {activeTerminal && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Active Lab: {activeLab?.name}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setActiveTerminal(null)}
            >
              Close Lab
            </Button>
          </div>

          {/* Tab toggle for Quick Start vs Exercises */}
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
              {labExerciseCounts[activeTerminal] > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {labExerciseCounts[activeTerminal]}
                </Badge>
              )}
            </Button>
          </div>

          {/* Quick Start Panel */}
          {!showExercises && activeLab?.quickStart && (
            <Card className="border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Quick start</CardTitle>
                <CardDescription className="text-slate-400">
                  Goals + commands to get moving fast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-white">Goals</div>
                  <ul className="mt-2 space-y-1 text-sm text-slate-400">
                    {activeLab.quickStart.goals.map((goal) => (
                      <li key={goal}>• {goal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Suggested commands</div>
                  <div className="mt-2 grid grid-cols-1 gap-2">
                    {activeLab.quickStart.commands.map((command) => (
                      <code key={command} className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-xs overflow-x-auto">
                        {command}
                      </code>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guided Exercises Panel */}
          {showExercises && (
            <GuidedExercise 
              labId={activeTerminal} 
              lastCommand={lastCommand}
            />
          )}

          <RealTerminal onCommand={handleTerminalCommand} />
        </div>
      )}

      {/* Lab Environments */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Available Lab Environments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labEnvironments.map((lab) => (
            <Card key={lab.id} className="hover:border-slate-600 transition-all hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${lab.color}`}>
                    <lab.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{lab.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={
                          lab.difficulty === "beginner" ? "success" :
                          lab.difficulty === "intermediate" ? "warning" : "destructive"
                        }
                      >
                        {lab.difficulty}
                      </Badge>
                      {labExerciseCounts[lab.id] > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {labExerciseCounts[lab.id]} exercises
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-slate-400">
                  {lab.description}
                </CardDescription>
                
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {lab.duration}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {lab.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>

                <Button 
                  className="w-full gap-2"
                  onClick={() => setActiveTerminal(lab.id)}
                >
                  <Play className="h-4 w-4" />
                  Launch Lab
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="border-cyan-500/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-3">💡 Lab Tips</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Type <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">help</code> in any terminal to see available commands</li>
            <li>• Labs run in isolated Docker containers - feel free to experiment!</li>
            <li>• Keep notes of key commands/output if you want to track progress</li>
            <li>• Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-xs">Ctrl+L</kbd> to clear the terminal screen</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
