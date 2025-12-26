"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"
import { AchievementsPage } from "@/components/achievements/achievements-page"

export default function Achievements() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <MainContent>
        <Header 
          title="Achievements 🏆" 
          subtitle="Track your milestones and earn badges" 
        />
        <AchievementsPage />
      </MainContent>
    </div>
  )
}
