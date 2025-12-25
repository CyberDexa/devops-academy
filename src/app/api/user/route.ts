import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Get or create the current user
// For simplicity, we use a single default user (can be extended for auth later)
export async function GET() {
  try {
    // Try to find existing user or create default one
    let user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      // Create default user
      user = await prisma.user.create({
        data: {
          name: "DevOps Learner",
          email: "learner@devops.academy",
          totalXp: 0,
          level: 1,
          streak: 0,
          longestStreak: 0,
        }
      })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    )
  }
}

// Update user profile
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { name, email, avatar } = body

    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "asc" }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(avatar && { avatar }),
      }
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
}
