import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Update lesson progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lessonId, status, timeSpent } = body

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
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

    // Get lesson details for XP
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: { track: true }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      )
    }

    // Get existing progress
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId
        }
      }
    })

    const isNewCompletion = status === "completed" && existingProgress?.status !== "completed"
    const xpToAward = isNewCompletion ? lesson.xpReward : 0

    // Update or create progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId
        }
      },
      create: {
        userId: user.id,
        lessonId,
        status: status || "in_progress",
        timeSpent: timeSpent || 0,
        xpEarned: xpToAward,
        completedAt: status === "completed" ? new Date() : null,
      },
      update: {
        status: status || existingProgress?.status || "in_progress",
        timeSpent: timeSpent ? (existingProgress?.timeSpent || 0) + timeSpent : existingProgress?.timeSpent || 0,
        xpEarned: existingProgress?.xpEarned || 0 + xpToAward,
        completedAt: status === "completed" ? new Date() : existingProgress?.completedAt,
      }
    })

    // If completed, update user XP and daily activity
    if (isNewCompletion) {
      // Update user XP
      await prisma.user.update({
        where: { id: user.id },
        data: {
          totalXp: { increment: xpToAward },
          lastActiveAt: new Date(),
        }
      })

      // Update daily activity
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      await prisma.dailyActivity.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: today
          }
        },
        create: {
          userId: user.id,
          date: today,
          lessonsCompleted: 1,
          timeSpent: timeSpent || lesson.estimatedTime * 60,
          xpEarned: xpToAward,
        },
        update: {
          lessonsCompleted: { increment: 1 },
          timeSpent: { increment: timeSpent || lesson.estimatedTime * 60 },
          xpEarned: { increment: xpToAward },
        }
      })

      // Update user skill progress
      await updateSkillProgress(user.id, lesson)

      // Update user streak
      await updateUserStreak(user.id)
    }

    return NextResponse.json({
      progress,
      xpAwarded: xpToAward,
      isNewCompletion
    })
  } catch (error) {
    console.error("Error updating lesson progress:", error)
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    )
  }
}

async function updateSkillProgress(userId: string, lesson: {
  module: {
    track: {
      title: string
      slug: string
    }
  }
  xpReward: number
}) {
  // Map track to skill category
  const trackSlug = lesson.module.track.slug
  const skillMapping: Record<string, string> = {
    "linux-foundations": "Linux & CLI",
    "git-version-control": "Git & Version Control",
    "docker-containerization": "Docker",
    "ci-cd-fundamentals": "CI/CD",
    "kubernetes-orchestration": "Kubernetes",
    "cloud-aws": "Cloud (AWS)",
    "infrastructure-as-code": "Infrastructure as Code",
    "monitoring-logging": "Monitoring & Observability",
    "security-devops": "Security",
  }

  const skillName = skillMapping[trackSlug]
  if (!skillName) return

  // Find or create skill
  let skill = await prisma.skill.findUnique({
    where: { name: skillName }
  })

  if (!skill) {
    skill = await prisma.skill.create({
      data: {
        name: skillName,
        category: "devops"
      }
    })
  }

  // Update user skill
  const xpToAdd = lesson.xpReward
  const userSkill = await prisma.userSkill.findUnique({
    where: {
      userId_skillId: {
        userId,
        skillId: skill.id
      }
    }
  })

  const newXp = (userSkill?.xp || 0) + xpToAdd
  const newLevel = Math.min(100, Math.floor(newXp / 50)) // 50 XP per level, max 100

  await prisma.userSkill.upsert({
    where: {
      userId_skillId: {
        userId,
        skillId: skill.id
      }
    },
    create: {
      userId,
      skillId: skill.id,
      xp: xpToAdd,
      level: newLevel
    },
    update: {
      xp: newXp,
      level: newLevel
    }
  })
}

async function updateUserStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) return

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActive = new Date(user.lastActiveAt)
  lastActive.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))

  let newStreak = user.streak
  let newLongestStreak = user.longestStreak

  if (daysDiff === 0) {
    // Same day - no change
  } else if (daysDiff === 1) {
    // Consecutive day
    newStreak = user.streak + 1
    if (newStreak > newLongestStreak) {
      newLongestStreak = newStreak
    }
  } else if (daysDiff > 1) {
    // Streak broken
    newStreak = 1
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streak: newStreak,
      longestStreak: newLongestStreak,
      lastActiveAt: new Date()
    }
  })
}

// Get progress for a specific lesson
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get("lessonId")

    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (lessonId) {
      // Get specific lesson progress
      const progress = await prisma.lessonProgress.findUnique({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId
          }
        }
      })

      return NextResponse.json({ progress })
    }

    // Get all lesson progress
    const progress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            xpReward: true
          }
        }
      }
    })

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error fetching lesson progress:", error)
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    )
  }
}
