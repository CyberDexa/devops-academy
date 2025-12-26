"use client"

import { useEffect, useState } from "react"
import { 
  Terminal, 
  Cloud, 
  BarChart,
  Clock,
  BookOpen,
  Rocket,
  Brain,
  Cpu,
  Layers
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Icon mapping for phases
const phaseIcons: Record<string, React.ElementType> = {
  "phase-1-foundation": Terminal,
  "phase-2-core-devops": Layers,
  "phase-3-advanced-devops": Cloud,
  "phase-4-mlops-introduction": Brain,
  "phase-5-production-mlops": Cpu,
  "phase-6-expert-capstone": Rocket,
}

// Color mapping for phases
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
  title: string
  type: string
  duration: string
  xpReward: number
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

interface TracksData {
  tracks: Track[]
  stats: {
    totalLessons: number
    totalLabs: number
    totalTracks: number
    totalHours: string
  }
}

export function TracksPage() {
  const [data, setData] = useState<TracksData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch('/api/tracks')
        if (!response.ok) throw new Error('Failed to fetch tracks')
        const tracksData = await response.json()
        setData(tracksData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-slate-400">Loading curriculum...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">Failed to load curriculum: {error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { tracks, stats } = data

  return (
    <div className="p-6 lg:p-8 space-y-10">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border-0 bg-slate-800/50 shadow-lg">
          <CardContent className="p-4 lg:p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <BookOpen className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalLessons}</p>
              <p className="text-sm text-slate-400">Total Lessons</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-slate-800/50 shadow-lg">
          <CardContent className="p-4 lg:p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <Terminal className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalLabs}</p>
              <p className="text-sm text-slate-400">Hands-on Labs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-slate-800/50 shadow-lg">
          <CardContent className="p-4 lg:p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <BarChart className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalTracks}</p>
              <p className="text-sm text-slate-400">Learning Phases</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-slate-800/50 shadow-lg">
          <CardContent className="p-4 lg:p-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalHours}</p>
              <p className="text-sm text-slate-400">Hours of Content</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">DevOps to MLOps Learning Path</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Complete curriculum from zero to hero. Master DevOps fundamentals, cloud engineering, 
          and production-ready MLOps with hands-on labs and real-world projects.
        </p>
      </div>

      {/* All Tracks */}
      <div className="space-y-8">
        {tracks.map((track, trackIdx) => {
          const Icon = phaseIcons[track.slug] || Terminal
          const color = track.color || phaseColors[track.slug] || "from-slate-500 to-slate-600"
          const totalLessons = track.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
          const totalLabs = track.modules.reduce((acc, mod) => 
            acc + mod.lessons.filter(l => l.type === 'project' || l.type === 'lab').length, 0)
          
          return (
            <Card key={track.id} className="overflow-hidden border-0 bg-slate-900/50 shadow-xl">
              <div className={`h-1.5 bg-gradient-to-r ${color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-white">
                        {trackIdx + 1}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{track.title}</CardTitle>
                      {track.subtitle && (
                        <p className="text-sm text-emerald-400 font-medium">{track.subtitle}</p>
                      )}
                      <CardDescription className="mt-1">{track.description}</CardDescription>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {track.duration && (
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {track.duration}
                          </Badge>
                        )}
                        <Badge variant="outline" className="gap-1">
                          <BookOpen className="h-3 w-3" />
                          {totalLessons} lessons
                        </Badge>
                        {totalLabs > 0 && (
                          <Badge variant="outline" className="gap-1">
                            <Terminal className="h-3 w-3" />
                            {totalLabs} labs
                          </Badge>
                        )}
                        {track.level && (
                          <Badge variant="secondary" className="gap-1">
                            {track.level}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Link href={`/tracks/${track.slug}`}>
                      <Button className={`bg-gradient-to-r ${color} hover:opacity-90`}>
                        Start Phase {trackIdx + 1}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-semibold text-slate-400 mb-4">MODULES ({track.modules.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {track.modules.map((module, idx) => {
                    return (
                      <Link 
                        key={module.id} 
                        href={`/tracks/${track.slug}/${module.slug}`}
                        className="group"
                      >
                        <div className="p-4 rounded-xl border-0 bg-slate-800/50 hover:bg-slate-700/50 transition-all h-full shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-500">Module {idx + 1}</span>
                            <span className="text-xs text-slate-400">{module.lessons.length} lessons</span>
                          </div>
                          <h5 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                            {module.title}
                          </h5>
                          {module.description && (
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {module.description}
                            </p>
                          )}
                          {module.duration && (
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </p>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
