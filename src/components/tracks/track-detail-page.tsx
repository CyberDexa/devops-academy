"use client"

import { useEffect, useState } from "react"
import { 
  Terminal, 
  Clock, 
  BookOpen, 
  ArrowLeft,
  ChevronRight,
  Play,
  FileText,
  Code2,
  Layers,
  Cloud,
  Brain,
  Cpu,
  Rocket
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

interface Module {
  id: string
  slug: string
  title: string
  description: string | null
  duration: string | null
  order: number
  lessons: Lesson[]
}

interface Track {
  id: string
  slug: string
  title: string
  subtitle: string | null
  description: string
  color: string | null
  level: string | null
  duration: string | null
  order: number
  modules: Module[]
}

export function TrackDetailPage({ trackId }: { trackId: string }) {
  const [track, setTrack] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrack() {
      try {
        const response = await fetch(`/api/tracks/${trackId}`)
        if (!response.ok) throw new Error('Failed to fetch track')
        const data = await response.json()
        setTrack(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchTrack()
  }, [trackId])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-slate-400">Loading track...</p>
        </div>
      </div>
    )
  }

  if (error || !track) {
    return (
      <div className="p-6">
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">Failed to load track: {error}</p>
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

  const Icon = phaseIcons[track.id] || Terminal
  const color = track.color || phaseColors[track.id] || "from-slate-500 to-slate-600"
  const totalLessons = track.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
  const totalXP = track.modules.reduce((acc, mod) => 
    acc + mod.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.xpReward, 0), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link href="/tracks" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Learning Path
      </Link>

      {/* Track Header */}
      <div className={`rounded-xl bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{track.title}</h1>
            {track.subtitle && (
              <p className="text-white/80 font-medium">{track.subtitle}</p>
            )}
            <p className="text-white/70 mt-1">{track.description}</p>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {track.duration && (
                <Badge className="bg-white/20 text-white border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  {track.duration}
                </Badge>
              )}
              <Badge className="bg-white/20 text-white border-0">
                <BookOpen className="h-3 w-3 mr-1" />
                {totalLessons} lessons
              </Badge>
              <Badge className="bg-white/20 text-white border-0">
                <Layers className="h-3 w-3 mr-1" />
                {track.modules.length} modules
              </Badge>
              <Badge className="bg-white/20 text-white border-0">
                ⚡ {totalXP.toLocaleString()} XP
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Modules</h2>
        {track.modules.map((module, idx) => (
          <Card key={module.id} className="overflow-hidden hover:border-slate-700 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-white font-bold`}>
                    {idx + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    {module.description && (
                      <CardDescription className="mt-1">{module.description}</CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {module.duration && (
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </Badge>
                  )}
                  <Badge variant="outline">
                    {module.lessons.length} lessons
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIdx) => (
                  <Link 
                    key={lesson.id}
                    href={`/lesson/${lesson.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-800 text-slate-400 text-sm">
                        {lessonIdx + 1}
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.type === 'video' && <Play className="h-4 w-4 text-blue-400" />}
                        {lesson.type === 'reading' && <FileText className="h-4 w-4 text-green-400" />}
                        {lesson.type === 'lab' && <Terminal className="h-4 w-4 text-orange-400" />}
                        {lesson.type === 'project' && <Code2 className="h-4 w-4 text-purple-400" />}
                        {lesson.type === 'quiz' && <BookOpen className="h-4 w-4 text-cyan-400" />}
                        <span className="text-white group-hover:text-emerald-400 transition-colors">
                          {lesson.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{lesson.duration}</span>
                      <Badge variant="secondary" className="text-xs">
                        +{lesson.xpReward} XP
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
