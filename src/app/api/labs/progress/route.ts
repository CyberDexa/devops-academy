import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Helper to get current user
async function getCurrentUser() {
  return prisma.user.findFirst({
    orderBy: { createdAt: "asc" }
  })
}

// GET /api/labs/progress - Get all lab exercise progress
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const progress = await prisma.labExerciseProgress.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    })

    // Parse completedSteps JSON for each progress record
    const progressWithParsedSteps = progress.map((p) => ({
      ...p,
      completedSteps: JSON.parse(p.completedSteps),
    }))

    // Get lab session stats
    const sessions = await prisma.labSession.findMany({
      where: { userId: user.id },
      orderBy: { startedAt: "desc" },
      take: 10,
    })

    // Calculate total stats
    const totalXpEarned = progress.reduce((sum, p) => sum + p.xpEarned, 0)
    const completedCount = progress.filter((p) => p.status === "completed").length
    const totalTimeSpent = sessions.reduce((sum, s) => sum + s.duration, 0)

    return NextResponse.json({
      progress: progressWithParsedSteps,
      sessions,
      stats: {
        totalXpEarned,
        completedCount,
        totalTimeSpent,
        totalCommandsRun: sessions.reduce((sum, s) => sum + s.commandsRun, 0),
      },
    })
  } catch (error) {
    console.error("Error fetching lab progress:", error)
    return NextResponse.json(
      { error: "Failed to fetch lab progress" },
      { status: 500 }
    )
  }
}

// POST /api/labs/progress - Update exercise progress
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { labId, exerciseId, status, currentStep, completedSteps, xpEarned } = body

    if (!labId || !exerciseId) {
      return NextResponse.json(
        { error: "labId and exerciseId are required" },
        { status: 400 }
      )
    }

    const progress = await prisma.labExerciseProgress.upsert({
      where: {
        userId_labId_exerciseId: { userId: user.id, labId, exerciseId },
      },
      update: {
        status: status || "in_progress",
        currentStep: currentStep ?? 0,
        completedSteps: JSON.stringify(completedSteps || []),
        xpEarned: xpEarned ?? 0,
        completedAt: status === "completed" ? new Date() : null,
      },
      create: {
        userId: user.id,
        labId,
        exerciseId,
        status: status || "in_progress",
        currentStep: currentStep ?? 0,
        completedSteps: JSON.stringify(completedSteps || []),
        xpEarned: xpEarned ?? 0,
        startedAt: new Date(),
        completedAt: status === "completed" ? new Date() : null,
      },
    })

    // If completed, update user XP
    if (status === "completed" && xpEarned > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          totalXp: { increment: xpEarned },
          lastActiveAt: new Date(),
        }
      })
    }

    return NextResponse.json({
      success: true,
      progress: {
        ...progress,
        completedSteps: JSON.parse(progress.completedSteps),
      },
    })
  } catch (error) {
    console.error("Error updating lab progress:", error)
    return NextResponse.json(
      { error: "Failed to update lab progress" },
      { status: 500 }
    )
  }
}

// DELETE /api/labs/progress - Reset exercise progress
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const labId = searchParams.get("labId")
    const exerciseId = searchParams.get("exerciseId")

    if (labId && exerciseId) {
      // Delete specific exercise progress
      await prisma.labExerciseProgress.delete({
        where: {
          userId_labId_exerciseId: { userId: user.id, labId, exerciseId },
        },
      })
    } else if (labId) {
      // Delete all progress for a lab
      await prisma.labExerciseProgress.deleteMany({
        where: { userId: user.id, labId },
      })
    } else {
      return NextResponse.json(
        { error: "labId is required" },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error resetting lab progress:", error)
    return NextResponse.json(
      { error: "Failed to reset lab progress" },
      { status: 500 }
    )
  }
}
