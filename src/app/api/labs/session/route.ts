import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Type inferred from Prisma schema
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

// POST /api/labs/session - Start or update a lab session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, sessionId, labId, commandsRun } = body

    if (action === "start") {
      // Start a new session
      if (!labId) {
        return NextResponse.json(
          { error: "labId is required to start a session" },
          { status: 400 }
        )
      }

      const session = await prisma.labSession.create({
        data: {
          labId,
          startedAt: new Date(),
        },
      })

      return NextResponse.json({ success: true, session })
    }

    if (action === "end" || action === "update") {
      // End or update an existing session
      if (!sessionId) {
        return NextResponse.json(
          { error: "sessionId is required" },
          { status: 400 }
        )
      }

      const existingSession = await prisma.labSession.findUnique({
        where: { id: sessionId },
      })

      if (!existingSession) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        )
      }

      const now = new Date()
      const duration = Math.floor(
        (now.getTime() - existingSession.startedAt.getTime()) / 1000
      )

      const session = await prisma.labSession.update({
        where: { id: sessionId },
        data: {
          endedAt: action === "end" ? now : undefined,
          duration,
          commandsRun: commandsRun ?? existingSession.commandsRun,
        },
      })

      return NextResponse.json({ success: true, session })
    }

    if (action === "increment-commands") {
      // Increment command count for a session
      if (!sessionId) {
        return NextResponse.json(
          { error: "sessionId is required" },
          { status: 400 }
        )
      }

      const session = await prisma.labSession.update({
        where: { id: sessionId },
        data: {
          commandsRun: { increment: 1 },
        },
      })

      return NextResponse.json({ success: true, session })
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'start', 'end', 'update', or 'increment-commands'" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Error managing lab session:", error)
    return NextResponse.json(
      { error: "Failed to manage lab session" },
      { status: 500 }
    )
  }
}

// GET /api/labs/session - Get session stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const labId = searchParams.get("labId")

    const where = labId ? { labId } : {}

    const sessions = await prisma.labSession.findMany({
      where,
      orderBy: { startedAt: "desc" },
      take: 50,
    })

    // Aggregate stats
    const totalDuration = sessions.reduce((sum: number, s: LabSessionRecord) => sum + s.duration, 0)
    const totalCommands = sessions.reduce((sum: number, s: LabSessionRecord) => sum + s.commandsRun, 0)

    // Group by lab
    const labStats: Record<string, { sessions: number; duration: number; commands: number }> = {}
    sessions.forEach((s: LabSessionRecord) => {
      if (!labStats[s.labId]) {
        labStats[s.labId] = { sessions: 0, duration: 0, commands: 0 }
      }
      labStats[s.labId].sessions++
      labStats[s.labId].duration += s.duration
      labStats[s.labId].commands += s.commandsRun
    })

    return NextResponse.json({
      sessions,
      stats: {
        totalSessions: sessions.length,
        totalDuration,
        totalCommands,
        labStats,
      },
    })
  } catch (error) {
    console.error("Error fetching lab sessions:", error)
    return NextResponse.json(
      { error: "Failed to fetch lab sessions" },
      { status: 500 }
    )
  }
}
