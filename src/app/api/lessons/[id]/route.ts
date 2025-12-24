import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const lesson = await prisma.lesson.findFirst({
      where: { 
        OR: [
          { id },
          { slug: id }
        ]
      },
      include: {
        module: {
          include: {
            track: true,
            lessons: {
              orderBy: { order: 'asc' },
              select: { id: true, title: true, slug: true, order: true, type: true, estimatedTime: true }
            }
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Find previous and next lessons (use lesson.id since 'id' param could be slug)
    const currentIdx = lesson.module.lessons.findIndex(l => l.id === lesson.id)
    const prevLesson = currentIdx > 0 ? lesson.module.lessons[currentIdx - 1] : null
    const nextLesson = currentIdx < lesson.module.lessons.length - 1 ? lesson.module.lessons[currentIdx + 1] : null

    // Format duration from estimatedTime
    const formatDuration = (minutes: number) => {
      if (minutes < 60) return `${minutes} min`
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }

    return NextResponse.json({
      ...lesson,
      duration: formatDuration(lesson.estimatedTime),
      prevLesson: prevLesson ? { ...prevLesson, duration: formatDuration(prevLesson.estimatedTime) } : null,
      nextLesson: nextLesson ? { ...nextLesson, duration: formatDuration(nextLesson.estimatedTime) } : null,
      totalLessonsInModule: lesson.module.lessons.length,
      currentLessonIndex: currentIdx + 1
    })
  } catch (error) {
    console.error('Failed to fetch lesson:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    )
  }
}
