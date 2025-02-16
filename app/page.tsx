import { VideoCard } from "@/components/video-card"

export default function Home() {
  // This would normally fetch from your database
  const videos = [
    {
      id: "1",
      title: "Building a YouTube Clone with Next.js",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: {
        name: "Code with Me",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      views: "10K",
      createdAt: "2 days ago",
    },
    // Add more video objects...
  ]

  return (
    <div className="md:ml-64">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}

