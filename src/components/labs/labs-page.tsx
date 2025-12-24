"use client"

import { useState } from "react"
import { 
  Terminal as TerminalIcon, 
  Container, 
  Cloud, 
  GitBranch,
  Database,
  Server,
  Play,
  Clock,
  Settings
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RealTerminal } from "@/components/terminal/real-terminal"
import { TerminalSettings } from "@/components/terminal/terminal-settings"

const labEnvironments = [
  {
    id: "linux",
    name: "Linux Fundamentals",
    description: "Practice shell commands, file operations, and system administration",
    icon: TerminalIcon,
    difficulty: "beginner",
    duration: "30-60 min",
    tools: ["Bash", "Vim", "SSH"],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "docker",
    name: "Docker Lab",
    description: "Build, run, and manage containerized applications",
    icon: Container,
    difficulty: "intermediate",
    duration: "45-90 min",
    tools: ["Docker", "Docker Compose", "Container Registry"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "kubernetes",
    name: "Kubernetes Cluster",
    description: "Deploy and orchestrate containers at scale",
    icon: Cloud,
    difficulty: "advanced",
    duration: "60-120 min",
    tools: ["kubectl", "Helm", "Minikube"],
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "git",
    name: "Git & CI/CD",
    description: "Version control and continuous integration pipelines",
    icon: GitBranch,
    difficulty: "beginner",
    duration: "30-45 min",
    tools: ["Git", "GitHub Actions", "GitLab CI"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "terraform",
    name: "Infrastructure as Code",
    description: "Provision cloud infrastructure with Terraform",
    icon: Server,
    difficulty: "intermediate",
    duration: "60-90 min",
    tools: ["Terraform", "AWS CLI", "Azure CLI"],
    color: "from-purple-600 to-violet-600"
  },
  {
    id: "mlops",
    name: "MLOps Pipeline",
    description: "Deploy and monitor ML models in production",
    icon: Database,
    difficulty: "advanced",
    duration: "90-120 min",
    tools: ["MLflow", "Docker", "Python"],
    color: "from-emerald-500 to-teal-500"
  }
]

export function LabsPage() {
  const [activeTerminal, setActiveTerminal] = useState<string | null>(null)

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

      {/* Active Terminal */}
      {activeTerminal && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Active Lab: {labEnvironments.find(l => l.id === activeTerminal)?.name}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setActiveTerminal(null)}
            >
              Close Lab
            </Button>
          </div>
          <RealTerminal />
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
            <li>• Your progress is automatically saved as you complete lab challenges</li>
            <li>• Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-xs">Ctrl+L</kbd> to clear the terminal screen</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
