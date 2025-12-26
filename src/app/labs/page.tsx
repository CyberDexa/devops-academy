"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"
import { LabsPage } from "@/components/labs/labs-page"

export default function Labs() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <MainContent>
        <Header 
          title="Interactive Labs 🧪" 
          subtitle="Practice with real DevOps tools" 
        />
        <LabsPage />
      </MainContent>
    </div>
  )
}
