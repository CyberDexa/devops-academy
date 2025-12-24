import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AchievementsPage } from "@/components/achievements/achievements-page"

export default function Achievements() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <main className="ml-64 flex-1">
        <Header 
          title="Achievements 🏆" 
          subtitle="Track your milestones and earn badges" 
        />
        <AchievementsPage />
      </main>
    </div>
  )
}
