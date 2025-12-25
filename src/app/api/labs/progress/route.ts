import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Types inferred from Prisma schema
type LabExerciseProgressRecord = {
  id: string
  labId: string
  exerciseId: string
  status: string
  currentStep: number
  completedSteps: string
  xpEarned: number
  startedAt: Date | null
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

type LabSessionRecord = {
  id: string
  labId: string
  startedAt: Date
  endedAt: Date | null
  duration: number
  commandsRun: number
  createdAt: Date
  updatedAt: Date
}

// GET /api/labs/progress - Get all lab exercise progress
export async function GET() {
  try {
    const progress = await prisma.labExerciseProgress.findMany({
      orderBy: { updatedAt: "desc" },
    })

    // Parse completedSteps JSON for each progress record
    const progressWithParsedSteps = progress.map((p: LabExerciseProgressRecord) => ({
      ...p,
      completedSteps: JSON.parse(p.completedSteps),
    }))

    // Get lab session stats
    const sessions = await prisma.labSession.findMany({
      orderBy: { startedAt: "desc" },
      take: 10,
    })

    // Calculate total stats
    const totalXpEarned = progress.reduce((sum: number, p: LabExerciseProgressRecord) => sum + p.xpEarned, 0)
    const completedCount = progress.filter((p: LabExerciseProgressRecord) => p.status === "completed").length
    const totalTimeSpent = sessions.reduce((sum: number, s: LabSessionRecord) => sum + s.duration, 0)

    return NextResponse.json({
      progress: progressWithParsedSteps,
      sessions,
      stats: {
        totalXpEarned,
        completedCount,
        totalTimeSpent,
        totalCommandsRun: sessions.reduce((sum: number, s: LabSessionRecord) => sum + s.commandsRun, 0),
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
        labId_exerciseId: { labId, exerciseId },
      },
      update: {
        status: status || "in_progress",
        currentStep: currentStep ?? 0,
        completedSteps: JSON.stringify(completedSteps || []),
        xpEarned: xpEarned ?? 0,
        completedAt: status === "completed" ? new Date() : null,
      },
      create: {
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
    const { searchParams } = new URL(request.url)
    const labId = searchParams.get("labId")
    const exerciseId = searchParams.get("exerciseId")

    if (labId && exerciseId) {
      // Delete specific exercise progress
      await prisma.labExerciseProgress.delete({
        where: {
          labId_exerciseId: { labId, exerciseId },
        },
      })
    } else if (labId) {
      // Delete all progress for a lab
      await prisma.labExerciseProgress.deleteMany({
        where: { labId },
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
