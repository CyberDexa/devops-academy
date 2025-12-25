import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Update user streak
export async function POST() {
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

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const lastActive = new Date(user.lastActiveAt)
    lastActive.setHours(0, 0, 0, 0)
    
    const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))

    let newStreak = user.streak
    let newLongestStreak = user.longestStreak

    if (daysDiff === 0) {
      // Same day - no change to streak
    } else if (daysDiff === 1) {
      // Consecutive day - increment streak
      newStreak = user.streak + 1
      if (newStreak > newLongestStreak) {
        newLongestStreak = newStreak
      }
    } else {
      // Streak broken - reset to 1
      newStreak = 1
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveAt: new Date(),
      }
    })

    // Check for streak achievements
    const streakMilestones = [3, 7, 14, 30, 60, 100, 365]
    for (const milestone of streakMilestones) {
      if (newStreak >= milestone && user.streak < milestone) {
        const achievement = await prisma.achievement.findFirst({
          where: {
            type: "streak",
            requirement: { contains: `"days":${milestone}` }
          }
        })

        if (achievement) {
          await prisma.userAchievement.upsert({
            where: {
              userId_achievementId: {
                userId: user.id,
                achievementId: achievement.id
              }
            },
            create: {
              userId: user.id,
              achievementId: achievement.id,
            },
            update: {}
          })
        }
      }
    }

    return NextResponse.json({
      streak: updatedUser.streak,
      longestStreak: updatedUser.longestStreak,
      lastActiveAt: updatedUser.lastActiveAt.toISOString(),
    })
  } catch (error) {
    console.error("Error updating streak:", error)
    return NextResponse.json(
      { error: "Failed to update streak" },
      { status: 500 }
    )
  }
}
