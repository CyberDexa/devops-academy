import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get user's progress summary
export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get lesson progress
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                track: true
              }
            }
          }
        }
      }
    })

    // Get daily activity for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const dailyActivity = await prisma.dailyActivity.findMany({
      where: {
        userId: user.id,
        date: { gte: thirtyDaysAgo }
      },
      orderBy: { date: "asc" }
    })

    // Get user's skills
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: user.id },
      include: { skill: true }
    })

    // Get user's achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: user.id },
      include: { achievement: true }
    })

    // Calculate stats
    const completedLessons = lessonProgress.filter(p => p.status === "completed").length
    const inProgressLessons = lessonProgress.filter(p => p.status === "in_progress").length
    const totalTimeSpent = lessonProgress.reduce((acc, p) => acc + p.timeSpent, 0)
    const totalXpEarned = lessonProgress.reduce((acc, p) => acc + p.xpEarned, 0)

    // Get total lessons count
    const totalLessons = await prisma.lesson.count()

    // Calculate weekly stats
    const weeklyStats = calculateWeeklyStats(dailyActivity)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        totalXp: user.totalXp,
        level: user.level,
        streak: user.streak,
        longestStreak: user.longestStreak,
      },
      stats: {
        completedLessons,
        inProgressLessons,
        totalLessons,
        totalTimeSpent, // in seconds
        totalXpEarned,
        completionPercentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      },
      dailyActivity: dailyActivity.map(d => ({
        date: d.date.toISOString().split("T")[0],
        lessonsCompleted: d.lessonsCompleted,
        timeSpent: d.timeSpent, // seconds
        xpEarned: d.xpEarned
      })),
      weeklyStats,
      skills: userSkills.map(us => ({
        id: us.skill.id,
        name: us.skill.name,
        category: us.skill.category,
        level: us.level,
        xp: us.xp
      })),
      achievements: userAchievements.map(ua => ({
        id: ua.achievement.id,
        type: ua.achievement.type,
        title: ua.achievement.title,
        description: ua.achievement.description,
        icon: ua.achievement.icon,
        unlockedAt: ua.unlockedAt.toISOString()
      })),
      recentProgress: lessonProgress
        .filter(p => p.status === "completed")
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
        .slice(0, 10)
        .map(p => ({
          lessonId: p.lessonId,
          lessonTitle: p.lesson.title,
          moduleTitle: p.lesson.module.title,
          trackTitle: p.lesson.module.track.title,
          completedAt: p.completedAt?.toISOString(),
          xpEarned: p.xpEarned
        }))
    })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    )
  }
}

function calculateWeeklyStats(dailyActivity: { date: Date; lessonsCompleted: number; timeSpent: number }[]) {
  const weeks: { week: string; lessons: number; hours: number }[] = []
  const now = new Date()
  
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - (i * 7) - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)
    
    const weekActivity = dailyActivity.filter(d => {
      const date = new Date(d.date)
      return date >= weekStart && date <= weekEnd
    })
    
    const lessons = weekActivity.reduce((acc, d) => acc + d.lessonsCompleted, 0)
    const hours = weekActivity.reduce((acc, d) => acc + d.timeSpent, 0) / 3600

    weeks.push({
      week: i === 0 ? "Current" : `Week ${4 - i}`,
      lessons,
      hours: Math.round(hours * 10) / 10
    })
  }
  
  return weeks
}
