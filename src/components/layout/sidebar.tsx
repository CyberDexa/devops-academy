"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  BookOpen, 
  Terminal, 
  Trophy, 
  BarChart3, 
  Settings,
  Flame,
  Zap,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLayout } from "@/contexts/layout-context"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Learning Paths", href: "/tracks", icon: BookOpen },
  { name: "Projects", href: "/projects", icon: Rocket },
  { name: "Labs", href: "/labs", icon: Terminal },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Progress", href: "/progress", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  streak?: number
  xp?: number
}

export function Sidebar({ streak = 0, xp = 0 }: SidebarProps) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useLayout()

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-slate-900/95 backdrop-blur-sm transition-all duration-300",
          sidebarCollapsed 
            ? "w-16 border-r border-slate-800/50" 
            : "w-64 border-r border-slate-800",
          // Mobile: hidden when collapsed
          "max-lg:translate-x-0",
          sidebarCollapsed && "max-lg:-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={cn(
            "flex h-16 items-center gap-3 px-4 transition-all",
            sidebarCollapsed ? "justify-center" : "px-6"
          )}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex-shrink-0">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-white whitespace-nowrap">DevOps Academy</h1>
                <p className="text-xs text-slate-400">Zero to Hero</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className={cn(
            "flex gap-2 p-4 transition-all",
            sidebarCollapsed ? "flex-col items-center gap-3" : "gap-4"
          )}>
            <div className={cn(
              "flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2",
              sidebarCollapsed && "px-2"
            )}>
              <Flame className={cn("h-5 w-5 text-orange-500 flex-shrink-0", streak > 0 && "streak-fire")} />
              {!sidebarCollapsed && (
                <span className="font-semibold text-orange-500">{streak}</span>
              )}
            </div>
            <div className={cn(
              "flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2",
              sidebarCollapsed && "px-2"
            )}>
              <Zap className="h-5 w-5 text-purple-500 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-semibold text-purple-500">{xp.toLocaleString()} XP</span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={sidebarCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    sidebarCollapsed && "justify-center px-2",
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Collapse Button */}
          <div className="p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={cn(
                "w-full text-slate-400 hover:text-white hover:bg-slate-800",
                sidebarCollapsed && "px-2"
              )}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          </div>

          {/* Footer - Pro Tip (only when expanded) */}
          {!sidebarCollapsed && (
            <div className="p-4">
              <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4">
                <p className="text-sm font-medium text-white">Pro Tip 💡</p>
                <p className="mt-1 text-xs text-slate-400">
                  Complete one lesson daily to maintain your streak!
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 left-4 z-50 lg:hidden bg-slate-800 hover:bg-slate-700",
          !sidebarCollapsed && "hidden"
        )}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}
