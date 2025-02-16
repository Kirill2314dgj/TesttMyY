"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { formatDuration } from "@/lib/utils"

interface VideoPlayerProps {
  video: {
    url: string
    title: string
  }
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onLoadedMetadata = () => setDuration(video.duration)

    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
  }

  return (
    <div className="relative group">
      <video ref={videoRef} src={video.url} className="w-full aspect-video" onClick={togglePlay} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
      </div>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 p-4 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
        <Slider value={[currentTime]} min={0} max={duration} step={1} onValueChange={handleSeek} className="w-full" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider value={[volume]} min={0} max={1} step={0.1} onValueChange={handleVolumeChange} className="w-24" />
          <span className="text-white text-sm ml-auto">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>
          <Button variant="ghost" size="icon" onClick={handleFullscreen}>
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

