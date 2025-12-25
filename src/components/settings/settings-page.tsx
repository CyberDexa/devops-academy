"use client"

import { useState, useEffect } from "react"
import { 
  User, 
  Bell, 
  Moon, 
  Monitor,
  Target,
  Save,
  Loader2,
  Check
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface UserData {
  id: string
  name: string
  email: string | null
  avatar: string | null
  level: number
  createdAt: string
}

interface Settings {
  dailyGoal: number
  weeklyLessonGoal: number
  notifications: {
    streakReminder: boolean
    weeklyReport: boolean
    newContent: boolean
  }
  theme: string
  terminalFont: string
}

export function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [settings, setSettings] = useState<Settings>({
    dailyGoal: 30,
    weeklyLessonGoal: 5,
    notifications: {
      streakReminder: true,
      weeklyReport: true,
      newContent: false
    },
    theme: "dark",
    terminalFont: "JetBrains Mono"
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/settings")
      if (!res.ok) throw new Error("Failed to fetch settings")
      const data = await res.json()
      setUser(data.user)
      setSettings(data.settings)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings")
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      setSaved(false)
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      })
      if (!res.ok) throw new Error("Failed to save settings")
      const data = await res.json()
      setUser(data.user)
      setSettings(data.settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="border-red-500/30">
          <CardContent className="p-6 text-center">
            <p className="text-red-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={fetchSettings}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const startDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "December 2024"

  const initials = user?.name 
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "DL"

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-500" />
            Profile
          </CardTitle>
          <CardDescription>Manage your learning profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl font-bold text-white">
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-white">{user?.name || "DevOps Learner"}</h3>
              <p className="text-sm text-slate-400">Started: {startDate}</p>
              <Badge variant="default" className="mt-1">Level {user?.level || 1}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Learning Goals
          </CardTitle>
          <CardDescription>Set your daily and weekly targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Daily Study Goal (minutes)
            </label>
            <div className="flex gap-2">
              {[15, 30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSettings({ ...settings, dailyGoal: mins })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.dailyGoal === mins
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Weekly Lesson Goal
            </label>
            <div className="flex gap-2">
              {[3, 5, 7, 10, 14].map((lessons) => (
                <button
                  key={lessons}
                  onClick={() => setSettings({ ...settings, weeklyLessonGoal: lessons })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.weeklyLessonGoal === lessons
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {lessons}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            Notifications
          </CardTitle>
          <CardDescription>Configure reminder settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "streakReminder", label: "Streak Reminder", desc: "Get reminded to maintain your streak" },
            { key: "weeklyReport", label: "Weekly Progress Report", desc: "Receive weekly learning summary" },
            { key: "newContent", label: "New Content Alerts", desc: "Be notified when new lessons are added" }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications]
                  }
                })}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.notifications[item.key as keyof typeof settings.notifications]
                    ? "bg-emerald-500"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? "left-[22px]"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-cyan-500" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Theme
            </label>
            <div className="flex gap-2">
              {[
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor }
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setSettings({ ...settings, theme: theme.value })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.theme === theme.value
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <theme.icon className="h-4 w-4" />
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Terminal Font
            </label>
            <div className="flex gap-2 flex-wrap">
              {["JetBrains Mono", "Fira Code", "Monaco", "Consolas"].map((font) => (
                <button
                  key={font}
                  onClick={() => setSettings({ ...settings, terminalFont: font })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    settings.terminalFont === font
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          className="gap-2" 
          onClick={saveSettings}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
