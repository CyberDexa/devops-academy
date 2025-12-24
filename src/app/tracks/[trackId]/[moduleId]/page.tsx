import { ModuleDetailPage } from "@/components/tracks/module-detail-page"

interface PageProps {
  params: Promise<{ trackId: string; moduleId: string }>
}

export default async function ModulePage({ params }: PageProps) {
  const { trackId, moduleId } = await params
  return <ModuleDetailPage trackId={trackId} moduleId={moduleId} />
}
