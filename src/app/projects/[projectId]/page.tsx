import { getProjectGuide } from "@/data/project-guides"
import { ProjectGuideViewer } from "@/components/projects/project-guide-viewer"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: Promise<{
    projectId: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params
  const guide = getProjectGuide(projectId)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/tracks"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tracks
        </Link>

        <ProjectGuideViewer guide={guide} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [
    { projectId: "project-1" },
  ]
}
