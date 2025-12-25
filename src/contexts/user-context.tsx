"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  totalXp: number
  level: number
  streak: number
  longestStreak: number
  lastActiveAt: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  refreshUser: () => Promise<void>
  updateXp: (amount: number) => Promise<void>
  updateStreak: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch("/api/user")
      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }
      
      const data = await response.json()
      setUser(data.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("Error fetching user:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  const updateXp = async (amount: number) => {
    if (!user) return
    
    try {
      const response = await fetch("/api/user/xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(prev => prev ? { ...prev, totalXp: data.totalXp, level: data.level } : null)
      }
    } catch (err) {
      console.error("Error updating XP:", err)
    }
  }

  const updateStreak = async () => {
    if (!user) return
    
    try {
      const response = await fetch("/api/user/streak", {
        method: "POST",
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(prev => prev ? { 
          ...prev, 
          streak: data.streak, 
          longestStreak: data.longestStreak,
          lastActiveAt: data.lastActiveAt 
        } : null)
      }
    } catch (err) {
      console.error("Error updating streak:", err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser, updateXp, updateStreak }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
