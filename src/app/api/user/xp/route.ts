import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Calculate level from XP
function calculateLevel(xp: number): number {
  // Level formula: Level = floor(sqrt(XP / 100)) + 1
  // Level 1: 0-99 XP, Level 2: 100-399 XP, Level 3: 400-899 XP, etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

// Add XP to user
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount } = body

    if (typeof amount !== "number" || amount < 0) {
      return NextResponse.json(
        { error: "Invalid XP amount" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const newTotalXp = user.totalXp + amount
    const newLevel = calculateLevel(newTotalXp)

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        totalXp: newTotalXp,
        level: newLevel,
        lastActiveAt: new Date(),
      }
    })

    // Check for level up achievements
    if (newLevel > user.level) {
      // Award level milestone achievements
      const levelAchievements = await prisma.achievement.findMany({
        where: {
          type: "milestone",
          requirement: { contains: `"level":${newLevel}` }
        }
      })

      for (const achievement of levelAchievements) {
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

    return NextResponse.json({
      totalXp: updatedUser.totalXp,
      level: updatedUser.level,
      xpAdded: amount,
      leveledUp: newLevel > user.level
    })
  } catch (error) {
    console.error("Error updating XP:", error)
    return NextResponse.json(
      { error: "Failed to update XP" },
      { status: 500 }
    )
  }
}
