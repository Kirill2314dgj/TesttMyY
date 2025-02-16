import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const sort = searchParams.get("sort") || "recent"
  const isShorts = searchParams.get("shorts") === "true"

  try {
    const videos = await prisma.video.findMany({
      where: {
        isShort: isShorts,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
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
      orderBy: {
        createdAt: sort === "recent" ? "desc" : undefined,
        views: sort === "popular" ? "desc" : undefined,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching videos:", error)
    return new NextResponse("Error fetching videos", { status: 500 })
  }
}

