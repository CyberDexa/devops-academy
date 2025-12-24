import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })

    // Calculate stats
    const totalLessons = tracks.reduce((acc, track) => 
      acc + track.modules.reduce((modAcc, mod) => modAcc + mod.lessons.length, 0), 0)
    
    const totalLabs = tracks.reduce((acc, track) => 
      acc + track.modules.reduce((modAcc, mod) => 
        modAcc + mod.lessons.filter(l => l.type === 'project' || l.type === 'lab').length, 0), 0)

    return NextResponse.json({
      tracks,
      stats: {
        totalLessons,
        totalLabs,
        totalTracks: tracks.length,
        totalHours: "250+"
      }
    })
  } catch (error) {
    console.error('Failed to fetch tracks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    )
  }
}
