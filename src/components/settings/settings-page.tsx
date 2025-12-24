"use client"

import { useState } from "react"
import { 
  User, 
  Bell, 
  Moon, 
  Monitor,
  Clock,
  Target,
  Save
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SettingsPage() {
  const [settings, setSettings] = useState({
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
              DA
            </div>
            <div>
              <h3 className="font-semibold text-white">DevOps Learner</h3>
              <p className="text-sm text-slate-400">Started: December 2024</p>
              <Badge variant="default" className="mt-1">Level 4</Badge>
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
            <div className="flex gap-2">
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
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
