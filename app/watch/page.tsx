import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { VideoPlayer } from "@/components/video-player"
import { VideoComments } from "@/components/video-comments"
import { RecommendedVideos } from "@/components/recommended-videos"

interface WatchPageProps {
  searchParams: { v?: string }
}

export default async function WatchPage({ searchParams }: WatchPageProps) {
  const videoId = searchParams.v

  if (!videoId) {
    notFound()
  }

  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: {
      user: true,
      _count: {
        select: {
          likes: {
            where: {
              isLike: true,
            },
          },
          comments: true,
        },
      },
    },
  })

  if (!video) {
    notFound()
  }

  // Increment view count
  await prisma.video.update({
    where: { id: videoId },
    data: { views: { increment: 1 } },
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2 space-y-4">
        <VideoPlayer video={video} />
        <VideoComments videoId={video.id} />
      </div>
      <div>
        <RecommendedVideos currentVideoId={video.id} />
      </div>
    </div>
  )
}

