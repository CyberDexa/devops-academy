import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export function calculateStreak(activities: { date: Date }[]): number {
  if (activities.length === 0) return 0
  
  const sortedDates = activities
    .map(a => new Date(a.date).toDateString())
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  
  let streak = 0
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  
  // Check if there's activity today or yesterday
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0
  }
  
  let currentDate = new Date(sortedDates[0])
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr)
    const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / 86400000)
    
    if (diffDays <= 1) {
      streak++
      currentDate = date
    } else {
      break
    }
  }
  
  return streak
}

export function calculateLevel(xp: number): { level: number; progress: number; nextLevelXp: number } {
  // XP required for each level increases exponentially
  const baseXp = 100
  const multiplier = 1.5
  
  let totalXpRequired = 0
  let level = 0
  
  while (totalXpRequired <= xp) {
    level++
    totalXpRequired += Math.floor(baseXp * Math.pow(multiplier, level - 1))
  }
  
  const previousLevelXp = totalXpRequired - Math.floor(baseXp * Math.pow(multiplier, level - 1))
  const currentLevelXp = totalXpRequired - previousLevelXp
  const progressXp = xp - previousLevelXp
  
  return {
    level: level - 1,
    progress: Math.floor((progressXp / currentLevelXp) * 100),
    nextLevelXp: currentLevelXp - progressXp
  }
}
