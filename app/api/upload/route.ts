import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db" // Updated import

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const isShort = formData.get("isShort") === "true"

    if (!file || !title) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Upload video to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    })

    // Create video record in database
    const video = await prisma.video.create({
      data: {
        title,
        description,
        url: blob.url,
        thumbnail: "", // We'll generate this
        duration: 0, // We'll calculate this
        isShort,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ success: true, videoId: video.id })
  } catch (error) {
    console.error("Upload error:", error)
    return new NextResponse("Error uploading video", { status: 500 })
  }
}

