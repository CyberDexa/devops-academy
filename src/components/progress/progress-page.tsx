"use client"

import { useEffect, useState } from "react"
import { 
  Calendar,
  Clock,
  TrendingUp,
  BookOpen,
  Target,
  Award,
  Flame,
  Zap,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressData {
  user: {
    id: string
    name: string
    totalXp: number
    level: number
    streak: number
    longestStreak: number
  }
  stats: {
    completedLessons: number
    inProgressLessons: number
    totalLessons: number
    totalTimeSpent: number
    totalXpEarned: number
    completionPercentage: number
  }
  dailyActivity: Array<{
    date: string
    lessonsCompleted: number
    timeSpent: number
    xpEarned: number
  }>
  weeklyStats: Array<{
    week: string
    lessons: number
    hours: number
  }>
  skills: Array<{
    id: string
    name: string
    category: string
    level: number
    xp: number
  }>
  achievements: Array<{
    id: string
    type: string
    title: string
    description: string
    icon: string
    unlockedAt: string
  }>
  recentProgress: Array<{
    lessonId: string
    lessonTitle: string
    moduleTitle: string
    trackTitle: string
    completedAt: string
    xpEarned: number
  }>
}

// Generate placeholder data for 30 days if no activity
function generatePlaceholderDays(): Array<{ date: string; lessonsCompleted: number; timeSpent: number; xpEarned: number }> {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      lessonsCompleted: 0,
      timeSpent: 0,
      xpEarned: 0
    })
  }
  return data
}

// Default skills to show even without progress
const defaultSkills = [
  { id: "1", name: "Linux & CLI", category: "devops", level: 0, xp: 0 },
  { id: "2", name: "Git & Version Control", category: "devops", level: 0, xp: 0 },
  { id: "3", name: "Docker", category: "devops", level: 0, xp: 0 },
  { id: "4", name: "CI/CD", category: "devops", level: 0, xp: 0 },
  { id: "5", name: "Kubernetes", category: "devops", level: 0, xp: 0 },
  { id: "6", name: "Cloud (AWS)", category: "cloud", level: 0, xp: 0 },
]

export function ProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProgress() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/progress")
        if (!response.ok) {
          throw new Error("Failed to fetch progress")
        }
        const progressData = await response.json()
        setData(progressData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Error fetching progress:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="p-6">
            <p className="text-red-400">Error loading progress: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Merge API data with placeholders
  const activityData = data?.dailyActivity.length ? mergeActivityData(data.dailyActivity) : generatePlaceholderDays()
  const weeklyStats = data?.weeklyStats || [
    { week: "Week 1", lessons: 0, hours: 0 },
    { week: "Week 2", lessons: 0, hours: 0 },
    { week: "Week 3", lessons: 0, hours: 0 },
    { week: "Current", lessons: 0, hours: 0 }
  ]
  const skills = mergeSkillsWithDefaults(data?.skills || [])

  const totalLessonsCompleted = activityData.reduce((acc, d) => acc + d.lessonsCompleted, 0)
  const totalMinutes = activityData.reduce((acc, d) => acc + d.timeSpent, 0) / 60
  const avgDaily = (totalMinutes / 30).toFixed(1)
  const activeDays = activityData.filter(d => d.lessonsCompleted > 0).length

  return (
    <div className="p-6 space-y-6">
      {/* User Profile Header */}
      {data?.user && (
        <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-2xl font-bold">
                {data.user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{data.user.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-400">Level {data.user.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-400">{data.user.totalXp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-400">{data.user.streak} day streak</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Longest Streak</p>
                <p className="text-xl font-bold text-white">{data.user.longestStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <BookOpen className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{data?.stats.completedLessons || totalLessonsCompleted}</p>
                <p className="text-sm text-slate-400">Lessons Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                <Clock className="h-5 w-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalMinutes > 0 ? (totalMinutes / 60).toFixed(1) : "0"}h</p>
                <p className="text-sm text-slate-400">Total Study Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{avgDaily}m</p>
                <p className="text-sm text-slate-400">Avg Daily Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeDays}/30</p>
                <p className="text-sm text-slate-400">Active Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      {data?.stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-cyan-500" />
              Curriculum Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">
                  {data.stats.completedLessons} of {data.stats.totalLessons} lessons completed
                </span>
                <span className="text-emerald-400 font-bold">{data.stats.completionPercentage}%</span>
              </div>
              <Progress value={data.stats.completionPercentage} className="h-3" />
              <p className="text-sm text-slate-500">
                {data.stats.inProgressLessons} lessons in progress
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-500" />
              Activity (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {activityData.map((day, idx) => (
                <div
                  key={idx}
                  className={`h-8 w-full rounded cursor-pointer transition-colors ${
                    day.lessonsCompleted === 0
                      ? "bg-slate-800 hover:bg-slate-700"
                      : day.lessonsCompleted === 1
                      ? "bg-emerald-900 hover:bg-emerald-800"
                      : day.lessonsCompleted === 2
                      ? "bg-emerald-700 hover:bg-emerald-600"
                      : "bg-emerald-500 hover:bg-emerald-400"
                  }`}
                  title={`${day.date}: ${day.lessonsCompleted} lessons, ${Math.round(day.timeSpent / 60)} min`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-500">
                {activeDays > 0 
                  ? `${activeDays} active days this month` 
                  : "Start learning to track activity!"
                }
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Less</span>
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded bg-slate-800" />
                  <div className="h-3 w-3 rounded bg-emerald-900" />
                  <div className="h-3 w-3 rounded bg-emerald-700" />
                  <div className="h-3 w-3 rounded bg-emerald-500" />
                </div>
                <span className="text-xs text-slate-500">More</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.map((week, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{week.week}</span>
                    <span className="text-sm text-slate-400">
                      {week.lessons} lessons • {week.hours}h
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Progress 
                      value={Math.min((week.lessons / 15) * 100, 100)} 
                      className="flex-1 h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Skill Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{skill.name}</span>
                  <span className="text-sm text-emerald-400">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
                <p className="text-xs text-slate-500">{skill.xp} XP earned</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Progress */}
      {data?.recentProgress && data.recentProgress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              Recently Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentProgress.map((item) => (
                <div 
                  key={item.lessonId}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                >
                  <div>
                    <p className="font-medium text-white">{item.lessonTitle}</p>
                    <p className="text-sm text-slate-400">{item.trackTitle} • {item.moduleTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-medium">+{item.xpEarned} XP</p>
                    <p className="text-xs text-slate-500">
                      {new Date(item.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      {data?.achievements && data.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Achievements ({data.achievements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors text-center"
                >
                  <span className="text-3xl mb-2">{achievement.icon}</span>
                  <p className="font-medium text-white text-sm">{achievement.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {(!data?.stats?.completedLessons || data.stats.completedLessons === 0) && (
        <Card className="border-dashed border-slate-700">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Start Your Learning Journey</h3>
            <p className="text-slate-400 mb-4">
              Complete lessons to track your progress, earn XP, and unlock achievements.
            </p>
            <a 
              href="/tracks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white font-medium transition-colors"
            >
              Explore Tracks
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper function to merge API activity data with placeholder days
function mergeActivityData(apiData: Array<{ date: string; lessonsCompleted: number; timeSpent: number; xpEarned: number }>) {
  const placeholder = generatePlaceholderDays()
  const apiDataMap = new Map(apiData.map(d => [d.date, d]))
  
  return placeholder.map(day => apiDataMap.get(day.date) || day)
}

// Helper function to merge skills with defaults
function mergeSkillsWithDefaults(apiSkills: Array<{ id: string; name: string; category: string; level: number; xp: number }>) {
  const skillMap = new Map(apiSkills.map(s => [s.name, s]))
  
  return defaultSkills.map(defaultSkill => skillMap.get(defaultSkill.name) || defaultSkill)
}
