"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function UploadVideo() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isShort, setIsShort] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsUploading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      router.push(`/watch?v=${data.videoId}`)
      setIsOpen(false)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Upload className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Video File</Label>
            <Input id="file" name="file" type="file" accept="video/*" required />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required placeholder="Video title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Video description" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isShort" name="isShort" checked={isShort} onCheckedChange={setIsShort} />
            <Label htmlFor="isShort">Upload as Short</Label>
          </div>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

