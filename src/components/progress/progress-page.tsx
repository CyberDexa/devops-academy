"use client"

import { 
  Calendar,
  Clock,
  TrendingUp,
  BookOpen,
  Terminal,
  Target,
  Award
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Generate last 30 days of activity
const generateActivityData = () => {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      lessons: Math.floor(Math.random() * 4),
      minutes: Math.floor(Math.random() * 90)
    })
  }
  // Ensure recent days have activity
  data[data.length - 1].lessons = 2
  data[data.length - 1].minutes = 45
  data[data.length - 2].lessons = 1
  data[data.length - 2].minutes = 30
  data[data.length - 3].lessons = 3
  data[data.length - 3].minutes = 75
  return data
}

const activityData = generateActivityData()

const weeklyStats = [
  { week: "Week 1", lessons: 8, hours: 6.5 },
  { week: "Week 2", lessons: 12, hours: 9.2 },
  { week: "Week 3", lessons: 10, hours: 8.1 },
  { week: "Current", lessons: 6, hours: 4.5 }
]

const skillProgress = [
  { name: "Linux & CLI", level: 75, xp: 450 },
  { name: "Git & Version Control", level: 65, xp: 380 },
  { name: "Docker", level: 35, xp: 210 },
  { name: "CI/CD", level: 10, xp: 60 },
  { name: "Kubernetes", level: 0, xp: 0 },
  { name: "Cloud (AWS)", level: 5, xp: 30 }
]

export function ProgressPage() {
  const totalLessons = activityData.reduce((acc, d) => acc + d.lessons, 0)
  const totalMinutes = activityData.reduce((acc, d) => acc + d.minutes, 0)
  const avgDaily = (totalMinutes / 30).toFixed(1)
  const activeDays = activityData.filter(d => d.lessons > 0).length

  return (
    <div className="p-6 space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <BookOpen className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalLessons}</p>
                <p className="text-sm text-slate-400">Lessons (30 days)</p>
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
                <p className="text-2xl font-bold text-white">{(totalMinutes / 60).toFixed(1)}h</p>
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
                  className={`h-8 w-full rounded ${
                    day.lessons === 0
                      ? "bg-slate-800"
                      : day.lessons === 1
                      ? "bg-emerald-900"
                      : day.lessons === 2
                      ? "bg-emerald-700"
                      : "bg-emerald-500"
                  }`}
                  title={`${day.date}: ${day.lessons} lessons, ${day.minutes} min`}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-3">
              <span className="text-xs text-slate-500">Less</span>
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded bg-slate-800" />
                <div className="h-3 w-3 rounded bg-emerald-900" />
                <div className="h-3 w-3 rounded bg-emerald-700" />
                <div className="h-3 w-3 rounded bg-emerald-500" />
              </div>
              <span className="text-xs text-slate-500">More</span>
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
                      value={(week.lessons / 15) * 100} 
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
            {skillProgress.map((skill) => (
              <div key={skill.name} className="space-y-2">
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

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Current Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
              <h4 className="font-medium text-white">Weekly Lessons</h4>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={60} className="flex-1" />
                <span className="text-sm text-slate-400">3/5</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
              <h4 className="font-medium text-white">Weekly Study Time</h4>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={45} className="flex-1" />
                <span className="text-sm text-slate-400">4.5/10h</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
              <h4 className="font-medium text-white">Complete Docker Module</h4>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={25} className="flex-1" />
                <span className="text-sm text-slate-400">2/8</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
