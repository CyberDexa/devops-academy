import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trackId: string; moduleId: string }> }
) {
  try {
    const { trackId, moduleId } = await params
    
    // First find the track by id or slug
    const track = await prisma.track.findFirst({
      where: {
        OR: [
          { id: trackId },
          { slug: trackId }
        ]
      }
    })

    if (!track) {
      return NextResponse.json(
        { error: 'Track not found' },
        { status: 404 }
      )
    }
    
    // Find the module by id or slug within this track
    const module = await prisma.module.findFirst({
      where: {
        trackId: track.id,
        OR: [
          { id: moduleId },
          { slug: moduleId }
        ]
      },
      include: {
        lessons: {
          orderBy: { order: 'asc' }
        },
        track: true
      }
    })

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Get all modules in this track for navigation
    const allModules = await prisma.module.findMany({
      where: { trackId: track.id },
      orderBy: { order: 'asc' },
      select: { id: true, slug: true, title: true, order: true }
    })

    // Format duration from estimatedTime
    const formatDuration = (minutes: number) => {
      if (minutes < 60) return `${minutes} min`
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }

    // Add formatted duration to lessons
    const lessonsWithDuration = module.lessons.map(lesson => ({
      ...lesson,
      duration: formatDuration(lesson.estimatedTime)
    }))

    return NextResponse.json({
      ...module,
      lessons: lessonsWithDuration,
      allModules
    })
  } catch (error) {
    console.error('Failed to fetch module:', error)
    return NextResponse.json(
      { error: 'Failed to fetch module' },
      { status: 500 }
    )
  }
}
