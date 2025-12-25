"use client"

import { useState, useEffect } from "react"
import { 
  Flame, 
  Award, 
  Zap, 
  BookOpen, 
  Terminal,
  Trophy,
  Star,
  Lock,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Achievement {
  id: string
  type: string
  title: string
  description: string
  icon: string
  xp: number
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  target?: number
}

interface AchievementsData {
  stats: {
    totalXp: number
    level: number
    nextLevelXp: number
    achievementsUnlocked: number
    totalAchievements: number
    currentStreak: number
  }
  achievements: Achievement[]
}

const iconMap: Record<string, React.ElementType> = {
  flame: Flame,
  book: BookOpen,
  terminal: Terminal,
  award: Award,
  star: Star,
  zap: Zap,
  trophy: Trophy
}

export function AchievementsPage() {
  const [data, setData] = useState<AchievementsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/achievements")
      if (!res.ok) throw new Error("Failed to fetch achievements")
      const achievementsData = await res.json()
      setData(achievementsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <Card className="border-red-500/30">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">{error || "Failed to load achievements"}</p>
            <Button variant="outline" className="mt-4" onClick={fetchAchievements}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { stats, achievements } = data

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total XP</p>
                <p className="text-3xl font-bold text-white">{stats.totalXp.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-purple-400">Level {stats.level}</span>
                  <span className="text-xs text-slate-500">• {stats.nextLevelXp} XP to next level</span>
                </div>
              </div>
            </div>
            <Progress value={((1000 - stats.nextLevelXp) / 1000) * 100} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Achievements</p>
                <p className="text-3xl font-bold text-white">
                  {stats.achievementsUnlocked}/{stats.totalAchievements}
                </p>
                <p className="text-sm text-yellow-400">
                  {Math.round((stats.achievementsUnlocked / stats.totalAchievements) * 100)}% unlocked
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Current Streak</p>
                <p className="text-3xl font-bold text-white">{stats.currentStreak} day{stats.currentStreak !== 1 ? 's' : ''}</p>
                <p className="text-sm text-orange-400">
                  {stats.currentStreak > 0 ? "Keep it going! 🔥" : "Start your streak today!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon] || Award
            return (
              <Card 
                key={achievement.id}
                className={`transition-all ${
                  achievement.unlocked 
                    ? "border-emerald-500/30 bg-emerald-500/5" 
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      achievement.unlocked 
                        ? "bg-gradient-to-br from-emerald-500 to-cyan-500" 
                        : "bg-slate-800"
                    }`}>
                      {achievement.unlocked ? (
                        <IconComponent className="h-6 w-6 text-white" />
                      ) : (
                        <Lock className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-0.5">{achievement.description}</p>
                      
                      {achievement.unlocked ? (
                        <p className="text-xs text-emerald-400 mt-2">
                          Unlocked {achievement.unlockedAt}
                        </p>
                      ) : achievement.progress !== undefined && achievement.target !== undefined ? (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-500">Progress</span>
                            <span className="text-slate-400">{achievement.progress}/{achievement.target}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.target) * 100} className="h-1.5" />
                        </div>
                      ) : null}

                      <div className="flex items-center gap-1 mt-2">
                        <Zap className="h-3 w-3 text-purple-400" />
                        <span className="text-xs text-purple-400">{achievement.xp} XP</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
