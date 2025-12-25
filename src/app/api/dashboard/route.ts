import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get dashboard data
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

    // Get user settings for weekly goals
    const settings = await prisma.userSettings.findUnique({
      where: { userId: user.id }
    })

    // Get lesson progress
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          include: {
            module: {
              include: { track: true }
            }
          }
        }
      },
      orderBy: { updatedAt: "desc" }
    })

    // Get total lessons
    const totalLessons = await prisma.lesson.count()
    const completedLessons = lessonProgress.filter(p => p.status === "completed").length

    // Get lab hours
    const labSessions = await prisma.labSession.findMany({
      where: { userId: user.id }
    })
    const totalLabHours = labSessions.reduce((acc, s) => acc + s.duration, 0) / 3600

    // Get weekly stats (last 7 days)
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - 7)
    weekStart.setHours(0, 0, 0, 0)

    const weeklyActivity = await prisma.dailyActivity.findMany({
      where: {
        userId: user.id,
        date: { gte: weekStart }
      }
    })

    const weeklyLessons = weeklyActivity.reduce((acc, d) => acc + d.lessonsCompleted, 0)
    const weeklyHours = weeklyActivity.reduce((acc, d) => acc + d.timeSpent, 0) / 3600

    // Get tracks with progress
    const tracks = await prisma.track.findMany({
      include: {
        modules: {
          include: {
            lessons: true
          },
          orderBy: { order: "asc" }
        }
      },
      orderBy: { order: "asc" }
    })

    // Calculate track progress
    const tracksWithProgress = tracks.slice(0, 3).map(track => {
      const totalTrackLessons = track.modules.reduce((acc, m) => acc + m.lessons.length, 0)
      const completedTrackLessons = track.modules.reduce((acc, m) => {
        return acc + m.lessons.filter(l => 
          lessonProgress.some(p => p.lessonId === l.id && p.status === "completed")
        ).length
      }, 0)
      
      return {
        id: track.slug,
        title: track.title,
        description: track.subtitle || track.description.slice(0, 100),
        icon: track.icon === "terminal" ? "🔧" : track.icon === "cloud" ? "☁️" : track.icon === "brain" ? "🧠" : "📚",
        modules: track.modules.length,
        progress: totalTrackLessons > 0 ? Math.round((completedTrackLessons / totalTrackLessons) * 100) : 0,
        color: track.color === "emerald" ? "from-emerald-500 to-cyan-500" 
             : track.color === "blue" ? "from-blue-500 to-indigo-500"
             : track.color === "purple" ? "from-purple-500 to-pink-500"
             : "from-gray-500 to-gray-600"
      }
    })

    // Get current lesson (most recent in progress, or first not started)
    const inProgressLesson = lessonProgress.find(p => p.status === "in_progress")
    let currentLesson = null

    if (inProgressLesson) {
      currentLesson = {
        id: inProgressLesson.lesson.slug,
        title: inProgressLesson.lesson.title,
        module: inProgressLesson.lesson.module.title,
        duration: inProgressLesson.lesson.estimatedTime,
        type: inProgressLesson.lesson.type
      }
    } else {
      // Find first incomplete lesson
      for (const track of tracks) {
        for (const module of track.modules) {
          for (const lesson of module.lessons) {
            const progress = lessonProgress.find(p => p.lessonId === lesson.id)
            if (!progress || progress.status !== "completed") {
              currentLesson = {
                id: lesson.slug,
                title: lesson.title,
                module: module.title,
                duration: lesson.estimatedTime,
                type: lesson.type
              }
              break
            }
          }
          if (currentLesson) break
        }
        if (currentLesson) break
      }
    }

    // Get recent lessons (last 4)
    const recentLessons = lessonProgress
      .slice(0, 4)
      .map(p => ({
        id: p.lessonId,
        title: p.lesson.title,
        completed: p.status === "completed",
        duration: p.lesson.estimatedTime
      }))

    // If not enough recent lessons, add some from curriculum
    if (recentLessons.length < 4) {
      const existingIds = new Set(recentLessons.map(l => l.id))
      for (const track of tracks) {
        for (const module of track.modules) {
          for (const lesson of module.lessons) {
            if (!existingIds.has(lesson.id) && recentLessons.length < 4) {
              recentLessons.push({
                id: lesson.id,
                title: lesson.title,
                completed: false,
                duration: lesson.estimatedTime
              })
              existingIds.add(lesson.id)
            }
          }
        }
      }
    }

    // Get current track (the one with the most recent progress)
    const mostRecentProgress = lessonProgress[0]
    const currentTrack = mostRecentProgress 
      ? {
          title: mostRecentProgress.lesson.module.track.title,
          progress: Math.round((completedLessons / totalLessons) * 100)
        }
      : tracks[0] 
        ? { title: tracks[0].title, progress: 0 }
        : { title: "DevOps Fundamentals", progress: 0 }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        streak: user.streak,
        totalXp: user.totalXp,
        level: user.level
      },
      stats: {
        streak: user.streak,
        totalXp: user.totalXp,
        completedLessons,
        labHours: Math.round(totalLabHours * 10) / 10,
        weeklyLessons,
        weeklyHours: Math.round(weeklyHours * 10) / 10
      },
      weeklyGoal: {
        target: settings?.weeklyLessonGoal || 5,
        completed: weeklyLessons,
        hoursSpent: Math.round(weeklyHours * 10) / 10,
        hoursGoal: Math.round((settings?.dailyGoal || 30) * 7 / 60 * 10) / 10
      },
      currentTrack: {
        ...currentTrack,
        currentLesson
      },
      learningTracks: tracksWithProgress,
      recentLessons
    })
  } catch (error) {
    console.error("Error fetching dashboard:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard" },
      { status: 500 }
    )
  }
}
