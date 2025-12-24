import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ProgressPage } from "@/components/progress/progress-page"

export default function Progress() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <main className="ml-64 flex-1">
        <Header 
          title="Your Progress 📊" 
          subtitle="Track your learning journey" 
        />
        <ProgressPage />
      </main>
    </div>
  )
}
