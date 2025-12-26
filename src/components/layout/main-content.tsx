"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useLayout } from "@/contexts/layout-context"

interface MainContentProps {
  children: ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  const { sidebarCollapsed } = useLayout()

  return (
    <main 
      className={cn(
        "flex-1 transition-all duration-300",
        sidebarCollapsed ? "ml-16 max-lg:ml-0" : "ml-64 max-lg:ml-0",
        className
      )}
    >
      {children}
    </main>
  )
}
