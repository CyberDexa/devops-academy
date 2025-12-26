"use client"

import { useEffect, useState } from "react"
import { 
  Terminal, 
  Clock, 
  BookOpen, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Play,
  FileText,
  Code2,
  Layers,
  Cloud,
  Brain,
  Cpu,
  Rocket,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const phaseIcons: Record<string, React.ElementType> = {
  "phase-1-foundation": Terminal,
  "phase-2-core-devops": Layers,
  "phase-3-advanced-devops": Cloud,
  "phase-4-mlops-introduction": Brain,
  "phase-5-production-mlops": Cpu,
  "phase-6-expert-capstone": Rocket,
}

const phaseColors: Record<string, string> = {
  "phase-1-foundation": "from-emerald-500 to-cyan-500",
  "phase-2-core-devops": "from-blue-500 to-indigo-500",
  "phase-3-advanced-devops": "from-purple-500 to-pink-500",
  "phase-4-mlops-introduction": "from-orange-500 to-red-500",
  "phase-5-production-mlops": "from-cyan-500 to-blue-500",
  "phase-6-expert-capstone": "from-yellow-500 to-orange-500",
}

interface Lesson {
  id: string
  slug: string
  title: string
  type: string
  duration: string
  xpReward: number
  order: number
}

interface Track {
  id: string
  slug: string
  title: string
}

interface ModuleNav {
  id: string
  slug: string
  title: string
  order: number
}

interface Module {
  id: string
  slug: string
  title: string
  description: string | null
  duration: string | null
  order: number
  lessons: Lesson[]
  track: Track
  allModules: ModuleNav[]
}

export function ModuleDetailPage({ trackId, moduleId }: { trackId: string; moduleId: string }) {
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModule() {
      try {
        const response = await fetch(`/api/tracks/${trackId}/${moduleId}`)
        if (!response.ok) throw new Error('Failed to fetch module')
        const data = await response.json()
        setModule(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchModule()
  }, [trackId, moduleId])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-slate-400">Loading module...</p>
        </div>
      </div>
    )
  }

  if (error || !module) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">Failed to load module: {error}</p>
            <Link href="/tracks">
              <Button variant="outline" className="mt-4">
                Back to Tracks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const Icon = phaseIcons[trackId] || Terminal
  const color = phaseColors[trackId] || "from-slate-500 to-slate-600"
  const totalXP = module.lessons.reduce((acc, lesson) => acc + lesson.xpReward, 0)
  
  // Find previous and next modules
  const currentIdx = module.allModules.findIndex(m => m.id === moduleId)
  const prevModule = currentIdx > 0 ? module.allModules[currentIdx - 1] : null
  const nextModule = currentIdx < module.allModules.length - 1 ? module.allModules[currentIdx + 1] : null

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/tracks" className="text-slate-400 hover:text-white transition-colors">
          Learning Path
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-600" />
        <Link href={`/tracks/${trackId}`} className="text-slate-400 hover:text-white transition-colors">
          {module.track.title}
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-600" />
        <span className="text-white">{module.title}</span>
      </div>

      {/* Module Header */}
      <Card className="overflow-hidden border-0 bg-slate-900/50 shadow-lg">
        <div className={`h-2 bg-gradient-to-r ${color}`} />
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white font-bold text-xl`}>
                {module.order}
              </div>
              <div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                {module.description && (
                  <CardDescription className="mt-1 max-w-2xl">{module.description}</CardDescription>
                )}
                <div className="flex items-center gap-4 mt-3">
                  {module.duration && (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </Badge>
                  )}
                  <Badge variant="outline" className="gap-1">
                    <BookOpen className="h-3 w-3" />
                    {module.lessons.length} lessons
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    ⚡ {totalXP.toLocaleString()} XP
                  </Badge>
                </div>
              </div>
            </div>
            <Link href={`/lesson/${module.lessons[0]?.slug}`}>
              <Button className={`bg-gradient-to-r ${color} hover:opacity-90`}>
                <Play className="h-4 w-4 mr-2" />
                Start Module
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* Lessons List */}
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-white">Lessons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, idx) => (
            <Link 
              key={lesson.id}
              href={`/lesson/${lesson.slug}`}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white font-medium`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {lesson.type === 'video' && <Play className="h-4 w-4 text-blue-400" />}
                    {lesson.type === 'reading' && <FileText className="h-4 w-4 text-green-400" />}
                    {lesson.type === 'lab' && <Terminal className="h-4 w-4 text-orange-400" />}
                    {lesson.type === 'project' && <Code2 className="h-4 w-4 text-purple-400" />}
                    {lesson.type === 'quiz' && <BookOpen className="h-4 w-4 text-cyan-400" />}
                    <span className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 capitalize">{lesson.type}</span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-500">{lesson.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-xs">
                  +{lesson.xpReward} XP
                </Badge>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        {prevModule ? (
          <Link href={`/tracks/${trackId}/${prevModule.slug}`}>
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              {prevModule.title}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextModule ? (
          <Link href={`/tracks/${trackId}/${nextModule.slug}`}>
            <Button variant="outline" className="gap-2">
              {nextModule.title}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href="/tracks">
            <Button className={`gap-2 bg-gradient-to-r ${color} hover:opacity-90`}>
              Complete Phase
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
