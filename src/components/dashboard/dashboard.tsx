"use client"

import { 
  PlayCircle, 
  Clock, 
  Target,
  TrendingUp,
  BookOpen,
  Terminal,
  Award,
  ChevronRight,
  Flame,
  CheckCircle2,
  Circle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample data - will be replaced with real data from database
const currentTrack = {
  title: "DevOps Fundamentals",
  progress: 35,
  currentLesson: {
    id: "docker-basics",
    title: "Docker Fundamentals",
    module: "Containerization",
    duration: 45,
    type: "lab"
  }
}

const recentLessons = [
  { id: 1, title: "Introduction to Linux", completed: true, duration: 30 },
  { id: 2, title: "Shell Scripting Basics", completed: true, duration: 45 },
  { id: 3, title: "Git & Version Control", completed: true, duration: 40 },
  { id: 4, title: "Docker Fundamentals", completed: false, duration: 45 },
]

const learningTracks = [
  {
    id: "phase-1-foundation",
    title: "Phase 1: Foundation",
    description: "Linux, Git, Docker, CI/CD fundamentals and cloud basics",
    icon: "🌱",
    modules: 5,
    progress: 35,
    color: "from-emerald-500 to-cyan-500"
  },
  {
    id: "phase-2-core-devops",
    title: "Phase 2: Core DevOps",
    description: "Kubernetes, Terraform, GitOps, and microservices",
    icon: "🔧",
    modules: 4,
    progress: 0,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "phase-4-mlops-introduction",
    title: "Phase 4: MLOps Introduction",
    description: "ML fundamentals, experiment tracking, and model serving",
    icon: "🧠",
    modules: 3,
    progress: 0,
    color: "from-purple-500 to-pink-500"
  }
]

const weeklyGoal = {
  target: 5,
  completed: 3,
  hoursSpent: 4.5,
  hoursGoal: 10
}

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Streak"
          value="5 days"
          icon={Flame}
          iconColor="text-orange-500"
          bgColor="bg-orange-500/10"
          trend="+2 from last week"
        />
        <StatCard
          title="Total XP"
          value="1,250"
          icon={Award}
          iconColor="text-purple-500"
          bgColor="bg-purple-500/10"
          trend="Level 4"
        />
        <StatCard
          title="Lessons Completed"
          value="12"
          icon={BookOpen}
          iconColor="text-emerald-500"
          bgColor="bg-emerald-500/10"
          trend="3 this week"
        />
        <StatCard
          title="Lab Hours"
          value="18h"
          icon={Terminal}
          iconColor="text-cyan-500"
          bgColor="bg-cyan-500/10"
          trend="4.5h this week"
        />
      </div>

      {/* Continue Learning */}
      <Card className="border-emerald-500/30 glow-emerald">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                <Terminal className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Continue Learning</p>
                <h3 className="text-xl font-bold text-white">{currentTrack.currentLesson.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="default">{currentTrack.currentLesson.type}</Badge>
                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {currentTrack.currentLesson.duration} min
                  </span>
                </div>
              </div>
            </div>
            <Link href={`/lesson/${currentTrack.currentLesson.id}`}>
              <Button size="lg" className="gap-2">
                <PlayCircle className="h-5 w-5" />
                Continue
              </Button>
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">{currentTrack.title}</span>
              <span className="text-emerald-400">{currentTrack.progress}% complete</span>
            </div>
            <Progress value={currentTrack.progress} />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Tracks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Learning Tracks</h2>
            <Link href="/tracks">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {learningTracks.map((track) => (
              <Card key={track.id} className="hover:border-slate-700 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${track.color}`}>
                      <span className="text-2xl">{track.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{track.title}</h3>
                        <span className="text-sm text-slate-400">{track.modules} modules</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-0.5">{track.description}</p>
                      <div className="mt-2">
                        <Progress value={track.progress} className="h-1.5" />
                      </div>
                    </div>
                    <Link href={`/tracks/${track.id}`}>
                      <Button variant="outline" size="sm">
                        {track.progress > 0 ? "Continue" : "Start"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-5 w-5 text-emerald-500" />
                Weekly Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Lessons</span>
                  <span className="text-white font-medium">{weeklyGoal.completed}/{weeklyGoal.target}</span>
                </div>
                <Progress value={(weeklyGoal.completed / weeklyGoal.target) * 100} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Study Time</span>
                  <span className="text-white font-medium">{weeklyGoal.hoursSpent}h/{weeklyGoal.hoursGoal}h</span>
                </div>
                <Progress value={(weeklyGoal.hoursSpent / weeklyGoal.hoursGoal) * 100} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-cyan-500" />
                Recent Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-600" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${lesson.completed ? "text-slate-400" : "text-white"}`}>
                        {lesson.title}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">{lesson.duration}m</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/labs" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Terminal className="h-4 w-4" />
                  Open Lab Terminal
                </Button>
              </Link>
              <Link href="/tracks" className="block">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse All Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  iconColor: string
  bgColor: string
  trend?: string
}

function StatCard({ title, value, icon: Icon, iconColor, bgColor, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
            {trend && (
              <p className="text-xs text-slate-500">{trend}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
