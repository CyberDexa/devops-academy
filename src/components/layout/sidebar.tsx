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
  Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"

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

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-900/95 backdrop-blur-sm">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">DevOps Academy</h1>
            <p className="text-xs text-slate-400">Zero to Hero</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 border-b border-slate-800 p-4">
          <div className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2">
            <Flame className={cn("h-5 w-5 text-orange-500", streak > 0 && "streak-fire")} />
            <span className="font-semibold text-orange-500">{streak}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span className="font-semibold text-purple-500">{xp.toLocaleString()} XP</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4">
          <div className="rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-4">
            <p className="text-sm font-medium text-white">Pro Tip 💡</p>
            <p className="mt-1 text-xs text-slate-400">
              Complete one lesson daily to maintain your streak!
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
