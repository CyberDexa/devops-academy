import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get all achievements with user's unlock status
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

    // Get all achievements
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "asc" }
    })

    // Get user's unlocked achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: user.id }
    })

    const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId))

    // Get progress data for calculating achievement progress
    const lessonProgress = await prisma.lessonProgress.count({
      where: { userId: user.id, status: "completed" }
    })

    const labProgress = await prisma.labExerciseProgress.count({
      where: { userId: user.id, status: "completed" }
    })

    // Map achievements with unlock status and progress
    const achievementsWithStatus = achievements.map(a => {
      const unlocked = unlockedIds.has(a.id)
      const userAchievement = userAchievements.find(ua => ua.achievementId === a.id)
      
      // Calculate progress for locked achievements
      let progress: number | undefined
      let target: number | undefined
      
      if (!unlocked && a.requirement) {
        try {
          const req = JSON.parse(a.requirement)
          if (req.type === "streak") {
            target = req.days
            progress = user.streak
          } else if (req.type === "lessons") {
            target = req.count
            progress = lessonProgress
          } else if (req.type === "labs") {
            target = req.count
            progress = labProgress
          } else if (req.type === "level") {
            target = req.level
            progress = user.level
          } else if (req.type === "xp") {
            target = req.amount
            progress = user.totalXp
          }
        } catch {
          // Invalid JSON, skip progress calculation
        }
      }

      return {
        id: a.id,
        type: a.type,
        title: a.title,
        description: a.description,
        icon: a.icon,
        xp: a.xpReward,
        unlocked,
        unlockedAt: userAchievement?.unlockedAt?.toISOString().split("T")[0].replace(/-/g, " ").replace(/(\d{4}) (\d{2}) (\d{2})/, (_, y, m, d) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`
        }),
        progress,
        target
      }
    })

    // Calculate stats
    const totalXp = user.totalXp
    const level = user.level
    const currentLevelXp = (level - 1) * (level - 1) * 100
    const nextLevelXp = level * level * 100
    const xpToNextLevel = nextLevelXp - totalXp

    return NextResponse.json({
      stats: {
        totalXp,
        level,
        nextLevelXp: xpToNextLevel,
        achievementsUnlocked: userAchievements.length,
        totalAchievements: achievements.length,
        currentStreak: user.streak
      },
      achievements: achievementsWithStatus
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json(
      { error: "Failed to fetch achievements" },
      { status: 500 }
    )
  }
}
