import { TrackDetailPage } from "@/components/tracks/track-detail-page"

interface PageProps {
  params: Promise<{ trackId: string }>
}

export default async function TrackPage({ params }: PageProps) {
  const { trackId } = await params
  return <TrackDetailPage trackId={trackId} />
}
