"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <MainContent>
        <Header 
          title="Welcome back! 👋" 
          subtitle="Continue your DevOps journey" 
        />
        <Dashboard />
      </MainContent>
    </div>
  )
}
