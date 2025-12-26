"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MainContent } from "@/components/layout/main-content"
import { TracksPage } from "@/components/tracks/tracks-page"

export default function Tracks() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <MainContent>
        <Header 
          title="Learning Paths 📚" 
          subtitle="Choose your journey from beginner to expert" 
        />
        <TracksPage />
      </MainContent>
    </div>
  )
}
