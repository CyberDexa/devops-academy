import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get user settings (or create defaults)
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

    // Get or create settings
    let settings = await prisma.userSettings.findUnique({
      where: { userId: user.id }
    })

    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId: user.id,
          dailyGoal: 30,
          weeklyLessonGoal: 5,
          streakReminder: true,
          weeklyReport: true,
          newContent: false,
          theme: "dark",
          terminalFont: "JetBrains Mono"
        }
      })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        level: user.level,
        createdAt: user.createdAt.toISOString()
      },
      settings: {
        dailyGoal: settings.dailyGoal,
        weeklyLessonGoal: settings.weeklyLessonGoal,
        notifications: {
          streakReminder: settings.streakReminder,
          weeklyReport: settings.weeklyReport,
          newContent: settings.newContent
        },
        theme: settings.theme,
        terminalFont: settings.terminalFont
      }
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

// Update user settings
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Update user profile if provided
    if (body.name || body.email || body.avatar) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(body.name && { name: body.name }),
          ...(body.email && { email: body.email }),
          ...(body.avatar && { avatar: body.avatar })
        }
      })
    }

    // Update settings
    const settings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        dailyGoal: body.dailyGoal ?? 30,
        weeklyLessonGoal: body.weeklyLessonGoal ?? 5,
        streakReminder: body.notifications?.streakReminder ?? true,
        weeklyReport: body.notifications?.weeklyReport ?? true,
        newContent: body.notifications?.newContent ?? false,
        theme: body.theme ?? "dark",
        terminalFont: body.terminalFont ?? "JetBrains Mono"
      },
      update: {
        ...(body.dailyGoal !== undefined && { dailyGoal: body.dailyGoal }),
        ...(body.weeklyLessonGoal !== undefined && { weeklyLessonGoal: body.weeklyLessonGoal }),
        ...(body.notifications?.streakReminder !== undefined && { streakReminder: body.notifications.streakReminder }),
        ...(body.notifications?.weeklyReport !== undefined && { weeklyReport: body.notifications.weeklyReport }),
        ...(body.notifications?.newContent !== undefined && { newContent: body.notifications.newContent }),
        ...(body.theme && { theme: body.theme }),
        ...(body.terminalFont && { terminalFont: body.terminalFont })
      }
    })

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    return NextResponse.json({
      user: {
        id: updatedUser!.id,
        name: updatedUser!.name,
        email: updatedUser!.email,
        avatar: updatedUser!.avatar,
        level: updatedUser!.level,
        createdAt: updatedUser!.createdAt.toISOString()
      },
      settings: {
        dailyGoal: settings.dailyGoal,
        weeklyLessonGoal: settings.weeklyLessonGoal,
        notifications: {
          streakReminder: settings.streakReminder,
          weeklyReport: settings.weeklyReport,
          newContent: settings.newContent
        },
        theme: settings.theme,
        terminalFont: settings.terminalFont
      }
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}
