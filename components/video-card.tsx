import Link from "next/link"
import Image from "next/image"

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: {
    name: string
    avatar: string
  }
  views: string
  createdAt: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group relative">
      <Link href={`/watch?v=${video.id}`}>
        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            width={320}
            height={180}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex gap-3 mt-3">
          <Image
            src={video.channel.avatar || "/placeholder.svg"}
            alt={video.channel.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-medium leading-tight line-clamp-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{video.channel.name}</p>
            <p className="text-sm text-muted-foreground">
              {video.views} views • {video.createdAt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

