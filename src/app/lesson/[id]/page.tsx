"use client"

import { useMemo, useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { 
  ArrowLeft,
  ArrowRight,
  BookOpen, 
  Clock, 
  CheckCircle2,
  Terminal as TerminalIcon,
  Play,
  FileText,
  Code2,
  ChevronRight,
  Rocket
} from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useLayout } from "@/contexts/layout-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RealTerminal } from "@/components/terminal/real-terminal"
import { getProjectGuide } from "@/data/project-guides"
import Link from "next/link"

interface LessonNav {
  id: string
  slug: string
  title: string
  order: number
  type: string
  duration: string
}

interface Track {
  id: string
  slug: string
  title: string
}

interface Module {
  id: string
  slug: string
  title: string
  track: Track
  lessons: LessonNav[]
}

interface Lesson {
  id: string
  title: string
  content: string
  type: string
  duration: string
  xpReward: number
  order: number
  codeExamples: string | null
  module: Module
  prevLesson: LessonNav | null
  nextLesson: LessonNav | null
  totalLessonsInModule: number
  currentLessonIndex: number
}

type CodeExample = {
  language: string
  title: string
  code: string
}

// Type icons
const typeIcons: Record<string, React.ElementType> = {
  video: Play,
  reading: FileText,
  lab: TerminalIcon,
  project: Code2,
  quiz: BookOpen,
}

const typeColors: Record<string, string> = {
  video: "text-blue-400",
  reading: "text-green-400",
  lab: "text-orange-400",
  project: "text-purple-400",
  quiz: "text-cyan-400",
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.id as string
  const { sidebarCollapsed } = useLayout()
  
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showTerminal, setShowTerminal] = useState(false)
  const [completed, setCompleted] = useState(false)

  const parsedCodeExamples = useMemo<CodeExample[] | null>(() => {
    if (!lesson?.codeExamples) return null
    try {
      const parsed: unknown = JSON.parse(lesson.codeExamples)
      if (!Array.isArray(parsed)) return null

      const results: CodeExample[] = []
      for (const item of parsed) {
        if (!item || typeof item !== "object") continue
        const record = item as Record<string, unknown>
        const language = record.language
        const title = record.title
        const code = record.code
        if (typeof language === "string" && typeof title === "string" && typeof code === "string") {
          results.push({ language, title, code })
        }
      }
      return results
    } catch {
      return null
    }
  }, [lesson?.codeExamples])

  useEffect(() => {
    async function fetchLesson() {
      try {
        setLoading(true)
        const response = await fetch(`/api/lessons/${lessonId}`)
        if (!response.ok) throw new Error('Failed to fetch lesson')
        const data = await response.json()
        setLesson(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId])

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar streak={5} xp={1250} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="text-center space-y-4">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-slate-400">Loading lesson...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-screen">
        <Sidebar streak={5} xp={1250} />
        <main className={`flex-1 flex items-center justify-center transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Card className="border-red-500/50 bg-red-500/10 max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-red-400">Failed to load lesson: {error}</p>
              <Link href="/tracks">
                <Button variant="outline" className="mt-4">
                  Back to Tracks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  const TypeIcon = typeIcons[lesson.type] || BookOpen
  const typeColor = typeColors[lesson.type] || "text-slate-400"
  const progress = (lesson.currentLessonIndex / lesson.totalLessonsInModule) * 100

  const markComplete = () => {
    setCompleted(true)
    // TODO: Save progress to database
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Lesson Header */}
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href={`/tracks/${lesson.module.track.slug}/${lesson.module.slug}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                  <Link href="/tracks" className="hover:text-white transition-colors">
                    Tracks
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link href={`/tracks/${lesson.module.track.slug}`} className="hover:text-white transition-colors">
                    {lesson.module.track.title}
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link href={`/tracks/${lesson.module.track.slug}/${lesson.module.slug}`} className="hover:text-white transition-colors">
                    {lesson.module.title}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`gap-1 ${typeColor}`}>
                    <TypeIcon className="h-3 w-3" />
                    {lesson.type}
                  </Badge>
                  <Badge variant="outline">
                    +{lesson.xpReward} XP
                  </Badge>
                </div>
                <h1 className="text-xl font-bold text-white mt-1">{lesson.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="h-4 w-4" />
                {lesson.duration}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">
                  {lesson.currentLessonIndex} / {lesson.totalLessonsInModule}
                </span>
                <Progress value={progress} className="w-32" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Lesson Content */}
          <div className={`flex-1 overflow-y-auto ${showTerminal ? "w-1/2" : "w-full"}`}>
            <div className="max-w-3xl mx-auto p-6">
              {/* Lesson Info Card */}
              <Card className="mb-6 border-emerald-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 ${typeColor}`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)} Lesson</h3>
                        <p className="text-sm text-slate-400">{lesson.duration} • {lesson.xpReward} XP</p>
                      </div>
                    </div>
                    {(lesson.type === 'lab' || lesson.type === 'project') && (
                      <Button 
                        onClick={() => setShowTerminal(!showTerminal)}
                        className="gap-2"
                        variant={showTerminal ? "secondary" : "default"}
                      >
                        <TerminalIcon className="h-4 w-4" />
                        {showTerminal ? "Hide Terminal" : "Open Terminal"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Project Guide Card - for project lessons */}
              {lesson.type === 'project' && (() => {
                // Try to find a matching project guide
                const projectId = lesson.title.toLowerCase().includes('project 1') ? 'project-1' :
                                  lesson.title.toLowerCase().includes('project 2') ? 'project-2' :
                                  lesson.title.toLowerCase().includes('project 3') ? 'project-3' : null
                const guide = projectId ? getProjectGuide(projectId) : null
                
                if (guide) {
                  return (
                    <Card className="mb-6 border-purple-500/30 bg-purple-500/5">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                              <Rocket className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">Step-by-Step Project Guide</h3>
                              <p className="text-sm text-slate-400">
                                {guide.phases.length} phases • {guide.phases.reduce((sum, p) => sum + p.tasks.length, 0)} tasks • {guide.totalTime}
                              </p>
                            </div>
                          </div>
                          <Link href={`/projects/${projectId}`}>
                            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                              <BookOpen className="h-4 w-4" />
                              Open Project Guide
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              })()}

              {/* Main Content */}
              <article className="prose prose-invert prose-emerald max-w-none">
                <div className="text-slate-300 leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      pre: ({ children, ...props }) => (
                        <pre
                          className="bg-slate-800 rounded-lg p-4 overflow-x-auto my-4"
                          {...props}
                        >
                          {children}
                        </pre>
                      ),
                      code: ({ className, children, ...props }) => {
                        const isBlock = Boolean(className && className.includes("language-"))
                        if (isBlock) {
                          return (
                            <code className={className ?? ""} {...props}>
                              {children}
                            </code>
                          )
                        }

                        return (
                          <code
                            className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400"
                            {...props}
                          >
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {lesson.content || `
## ${lesson.title}

This lesson is part of the **${lesson.module.title}** module in the ${lesson.module.track.title} track.

### Learning Objectives

- Understand the core concepts of ${lesson.title.toLowerCase()}
- Apply practical skills through hands-on exercises
- Build foundational knowledge for advanced topics

### Overview

This ${lesson.type} lesson will guide you through the essential concepts and provide hands-on practice opportunities.

${lesson.type === 'lab' || lesson.type === 'project' ? `
### Hands-On Practice

Click the "Open Terminal" button above to start practicing with real commands and tools.
` : ''}

### Next Steps

After completing this lesson, you'll be ready to move on to more advanced topics in the curriculum.
                    `}
                  </ReactMarkdown>
                </div>
              </article>

              {/* Code Examples */}
              {parsedCodeExamples && parsedCodeExamples.length > 0 && (
                <Card className="mt-6 border-slate-700">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-purple-400" />
                      Code Examples
                    </h4>
                    <div className="space-y-4">
                      {parsedCodeExamples.map((example, index) => (
                        <div key={`${example.title}-${index}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-semibold text-white">
                              {example.title}
                            </h5>
                            <Badge variant="outline" className="text-xs">
                              {example.language}
                            </Badge>
                          </div>
                          <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
                            <code className="text-slate-300 whitespace-pre">{example.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Completion Card */}
              <Card className={`mt-6 ${completed ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-slate-700'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">
                        {completed ? 'Lesson Completed!' : 'Mark as Complete'}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {completed 
                          ? `You earned ${lesson.xpReward} XP!` 
                          : 'Complete this lesson to earn XP and track your progress'}
                      </p>
                    </div>
                    {!completed && (
                      <Button onClick={markComplete} className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Complete (+{lesson.xpReward} XP)
                      </Button>
                    )}
                    {completed && (
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                <div>
                  {lesson.prevLesson ? (
                    <Link href={`/lesson/${lesson.prevLesson.slug}`}>
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        {lesson.prevLesson.title}
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/tracks/${lesson.module.track.slug}/${lesson.module.slug}`}>
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Module
                      </Button>
                    </Link>
                  )}
                </div>
                <div>
                  {lesson.nextLesson ? (
                    <Link href={`/lesson/${lesson.nextLesson.slug}`}>
                      <Button className="gap-2">
                        {lesson.nextLesson.title}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/tracks/${lesson.module.track.slug}`}>
                      <Button className="gap-2">
                        Complete Module
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Panel */}
          {showTerminal && (
            <div className="w-1/2 border-l border-slate-800">
              <RealTerminal 
                title="Lab Environment"
                lessonId={lessonId}
                onClose={() => setShowTerminal(false)}
                className="h-full rounded-none"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
