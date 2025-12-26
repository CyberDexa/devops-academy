"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"
import { SettingsPage } from "@/components/settings/settings-page"

export default function Settings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <MainContent>
        <Header 
          title="Settings ⚙️" 
          subtitle="Customize your learning experience" 
        />
        <SettingsPage />
      </MainContent>
    </div>
  )
}
