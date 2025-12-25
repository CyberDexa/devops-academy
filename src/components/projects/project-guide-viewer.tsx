"use client"

import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  Code,
  Copy,
  Check,
  Lightbulb,
  ExternalLink,
  Trophy,
  Target,
  BookOpen,
  Layers,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProjectGuide, ProjectPhase, ProjectTask } from "@/data/project-guides"
import { cn } from "@/lib/utils"

interface ProjectGuideViewerProps {
  guide: ProjectGuide
}

export function ProjectGuideViewer({ guide }: ProjectGuideViewerProps) {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set([guide.phases[0]?.id]))
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    // Load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`project-progress-${guide.projectId}`)
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showArchitecture, setShowArchitecture] = useState(false)

  const togglePhase = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases)
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId)
    } else {
      newExpanded.add(phaseId)
    }
    setExpandedPhases(newExpanded)
  }

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const toggleTaskComplete = (taskId: string) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)
    localStorage.setItem(`project-progress-${guide.projectId}`, JSON.stringify([...newCompleted]))
  }

  const copyCode = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const totalTasks = guide.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)
  const completedCount = completedTasks.size
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  const getPhaseProgress = (phase: ProjectPhase) => {
    const phaseTasks = phase.tasks.map((t) => t.id)
    const completed = phaseTasks.filter((id) => completedTasks.has(id)).length
    return { completed, total: phaseTasks.length }
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="border-b border-slate-700 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{guide.title}</h1>
            <p className="text-slate-400 mt-2 max-w-3xl">{guide.overview}</p>
          </div>
          <Badge
            variant={
              guide.difficulty === "beginner"
                ? "success"
                : guide.difficulty === "intermediate"
                ? "warning"
                : "destructive"
            }
            className="shrink-0"
          >
            {guide.difficulty}
          </Badge>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{guide.totalTime}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Layers className="h-4 w-4" />
            <span>{guide.phases.length} phases</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Target className="h-4 w-4" />
            <span>{totalTasks} tasks</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-white font-medium">{progressPercent}% complete</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      {/* Prerequisites & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              Prerequisites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-slate-400">
              {guide.prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-slate-600">•</span>
                  {prereq}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="h-4 w-4 text-purple-400" />
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {guide.techStack.map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Diagram */}
      <Card className="border-slate-700">
        <CardHeader className="pb-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowArchitecture(!showArchitecture)}
          >
            <CardTitle className="text-sm flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              Architecture Diagram
            </CardTitle>
            {showArchitecture ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
          </div>
        </CardHeader>
        {showArchitecture && (
          <CardContent>
            <pre className="text-xs text-slate-300 bg-slate-900 p-4 rounded-lg overflow-x-auto font-mono">
              {guide.architecture}
            </pre>
          </CardContent>
        )}
      </Card>

      {/* Phases */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Project Phases</h2>

        {guide.phases.map((phase, phaseIndex) => {
          const isExpanded = expandedPhases.has(phase.id)
          const phaseProgress = getPhaseProgress(phase)
          const isPhaseComplete = phaseProgress.completed === phaseProgress.total

          return (
            <Card
              key={phase.id}
              className={cn(
                "border-slate-700 transition-all",
                isPhaseComplete && "border-green-500/30"
              )}
            >
              <CardHeader className="pb-3">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                        isPhaseComplete
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-800 text-slate-400"
                      )}
                    >
                      {isPhaseComplete ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        phaseIndex + 1
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{phase.title}</CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {phase.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {phase.estimatedTime}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {phaseProgress.completed}/{phaseProgress.total}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-3">
                  {phase.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isExpanded={expandedTasks.has(task.id)}
                      isComplete={completedTasks.has(task.id)}
                      onToggleExpand={() => toggleTask(task.id)}
                      onToggleComplete={() => toggleTaskComplete(task.id)}
                      onCopyCode={copyCode}
                      copiedCode={copiedCode}
                    />
                  ))}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Bonus Challenges */}
      {guide.bonusChallenges && guide.bonusChallenges.length > 0 && (
        <Card className="border-purple-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-purple-400" />
              Bonus Challenges
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Extra challenges to level up your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.bonusChallenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-purple-400">🏆</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Submission Checklist */}
      <Card className="border-cyan-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-cyan-400" />
            Submission Checklist
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Make sure you complete all items before submitting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guide.submissionChecklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-cyan-400">☐</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Task Card Component
interface TaskCardProps {
  task: ProjectTask
  isExpanded: boolean
  isComplete: boolean
  onToggleExpand: () => void
  onToggleComplete: () => void
  onCopyCode: (code: string, id: string) => void
  copiedCode: string | null
}

function TaskCard({
  task,
  isExpanded,
  isComplete,
  onToggleExpand,
  onToggleComplete,
  onCopyCode,
  copiedCode,
}: TaskCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-all",
        isComplete
          ? "border-green-500/30 bg-green-500/5"
          : "border-slate-700 bg-slate-800/50"
      )}
    >
      {/* Task Header */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleComplete()
            }}
            className="shrink-0"
          >
            {isComplete ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-slate-600 hover:text-slate-400" />
            )}
          </button>
          <div>
            <h4
              className={cn(
                "font-medium text-sm",
                isComplete ? "text-green-400" : "text-white"
              )}
            >
              {task.title}
            </h4>
            <p className="text-xs text-slate-500">{task.description}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
        )}
      </div>

      {/* Task Content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-4 border-t border-slate-700/50 pt-3">
          {/* Instructions */}
          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase mb-2">
              Instructions
            </h5>
            <ol className="space-y-1 text-sm text-slate-300">
              {task.instructions.map((instruction, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono text-xs">{i + 1}.</span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {/* Code Snippets */}
          {task.codeSnippets && task.codeSnippets.length > 0 && (
            <div className="space-y-3">
              {task.codeSnippets.map((snippet, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <Code className="h-3 w-3 text-slate-500" />
                      <span className="text-xs text-slate-400">
                        {snippet.filename || snippet.language}
                      </span>
                      <Badge variant="outline" className="text-[10px] py-0">
                        {snippet.language}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                      onClick={() => onCopyCode(snippet.code, `${task.id}-${i}`)}
                    >
                      {copiedCode === `${task.id}-${i}` ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  <pre className="text-xs bg-slate-950 p-3 overflow-x-auto max-h-[400px]">
                    <code className="text-slate-300">{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Hints */}
          {task.hints && task.hints.length > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <h5 className="text-xs font-semibold text-yellow-400 flex items-center gap-1 mb-2">
                <Lightbulb className="h-3 w-3" />
                Hints
              </h5>
              <ul className="space-y-1 text-xs text-yellow-200/80">
                {task.hints.map((hint, i) => (
                  <li key={i}>💡 {hint}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Validation */}
          {task.validation && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
              <h5 className="text-xs font-semibold text-cyan-400 mb-1">
                ✓ Validation
              </h5>
              <p className="text-xs text-cyan-200/80">{task.validation.description}</p>
              {task.validation.command && (
                <code className="block mt-2 text-xs bg-slate-900 px-2 py-1 rounded text-cyan-300">
                  $ {task.validation.command}
                </code>
              )}
            </div>
          )}

          {/* Resources */}
          {task.resources && task.resources.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-slate-400 mb-2">Resources</h5>
              <div className="flex flex-wrap gap-2">
                {task.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {resource.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
