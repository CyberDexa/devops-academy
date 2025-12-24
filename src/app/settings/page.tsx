import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { SettingsPage } from "@/components/settings/settings-page"

export default function Settings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar streak={5} xp={1250} />
      <main className="ml-64 flex-1">
        <Header 
          title="Settings ⚙️" 
          subtitle="Customize your learning experience" 
        />
        <SettingsPage />
      </main>
    </div>
  )
}
