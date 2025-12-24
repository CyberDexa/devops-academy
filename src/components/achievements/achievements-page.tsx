"use client"

import { 
  Flame, 
  Award, 
  Target, 
  Zap, 
  BookOpen, 
  Terminal,
  Trophy,
  Star,
  Lock,
  CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const achievements = [
  // Streak Achievements
  {
    id: "streak-3",
    title: "Getting Started",
    description: "Complete a 3-day learning streak",
    icon: Flame,
    category: "streak",
    unlocked: true,
    unlockedAt: "Dec 20, 2024",
    xp: 50
  },
  {
    id: "streak-7",
    title: "Week Warrior",
    description: "Complete a 7-day learning streak",
    icon: Flame,
    category: "streak",
    unlocked: false,
    progress: 5,
    target: 7,
    xp: 100
  },
  {
    id: "streak-30",
    title: "Monthly Master",
    description: "Complete a 30-day learning streak",
    icon: Flame,
    category: "streak",
    unlocked: false,
    progress: 5,
    target: 30,
    xp: 500
  },
  // Lesson Achievements
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: BookOpen,
    category: "lessons",
    unlocked: true,
    unlockedAt: "Dec 15, 2024",
    xp: 25
  },
  {
    id: "lessons-10",
    title: "Dedicated Learner",
    description: "Complete 10 lessons",
    icon: BookOpen,
    category: "lessons",
    unlocked: true,
    unlockedAt: "Dec 22, 2024",
    xp: 100
  },
  {
    id: "lessons-50",
    title: "Knowledge Seeker",
    description: "Complete 50 lessons",
    icon: BookOpen,
    category: "lessons",
    unlocked: false,
    progress: 12,
    target: 50,
    xp: 300
  },
  // Lab Achievements
  {
    id: "first-lab",
    title: "Hands-On Hero",
    description: "Complete your first hands-on lab",
    icon: Terminal,
    category: "labs",
    unlocked: true,
    unlockedAt: "Dec 18, 2024",
    xp: 50
  },
  {
    id: "labs-10",
    title: "Lab Rat",
    description: "Complete 10 hands-on labs",
    icon: Terminal,
    category: "labs",
    unlocked: false,
    progress: 4,
    target: 10,
    xp: 200
  },
  // Skill Achievements
  {
    id: "docker-basics",
    title: "Container Apprentice",
    description: "Complete the Docker basics module",
    icon: Award,
    category: "skills",
    unlocked: false,
    progress: 2,
    target: 8,
    xp: 150
  },
  {
    id: "kubernetes-basics",
    title: "Orchestration Initiate",
    description: "Complete the Kubernetes basics module",
    icon: Award,
    category: "skills",
    unlocked: false,
    progress: 0,
    target: 10,
    xp: 200
  },
  // Special Achievements
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete all weekly goals",
    icon: Star,
    category: "special",
    unlocked: false,
    xp: 250
  },
  {
    id: "speed-learner",
    title: "Speed Learner",
    description: "Complete 5 lessons in one day",
    icon: Zap,
    category: "special",
    unlocked: false,
    xp: 150
  }
]

const stats = {
  totalXp: 1250,
  level: 4,
  nextLevelXp: 750,
  achievementsUnlocked: 4,
  totalAchievements: achievements.length
}

export function AchievementsPage() {
  const categories = [
    { id: "all", label: "All" },
    { id: "streak", label: "Streaks" },
    { id: "lessons", label: "Lessons" },
    { id: "labs", label: "Labs" },
    { id: "skills", label: "Skills" },
    { id: "special", label: "Special" }
  ]

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
                <p className="text-3xl font-bold text-white">5 days</p>
                <p className="text-sm text-orange-400">Keep it going! 🔥</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">All Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
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
                      <achievement.icon className="h-6 w-6 text-white" />
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
                    ) : achievement.progress !== undefined ? (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">Progress</span>
                          <span className="text-slate-400">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target!) * 100} className="h-1.5" />
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
          ))}
        </div>
      </div>
    </div>
  )
}
