import Link from "next/link"
import {
  Home,
  Flame,
  PlaySquare,
  Clock,
  ListVideo,
  History,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  GraduationCapIcon as Graduation,
  Shirt,
  Podcast,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const mainLinks = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Trending", icon: Flame, href: "/trending" },
  { name: "Subscriptions", icon: PlaySquare, href: "/subscriptions" },
]

const libraryLinks = [
  { name: "History", icon: History, href: "/history" },
  { name: "Your videos", icon: PlaySquare, href: "/your-videos" },
  { name: "Watch later", icon: Clock, href: "/playlist?list=WL" },
  { name: "Your clips", icon: ListVideo, href: "/clips" },
]

const exploreLinks = [
  { name: "Shopping", icon: ShoppingBag, href: "/shopping" },
  { name: "Music", icon: Music2, href: "/music" },
  { name: "Movies & TV", icon: Film, href: "/movies-tv" },
  { name: "Live", icon: Radio, href: "/live" },
  { name: "Gaming", icon: Gamepad2, href: "/gaming" },
  { name: "News", icon: Newspaper, href: "/news" },
  { name: "Sports", icon: Trophy, href: "/sports" },
  { name: "Learning", icon: Graduation, href: "/learning" },
  { name: "Fashion & Beauty", icon: Shirt, href: "/fashion-beauty" },
  { name: "Podcasts", icon: Podcast, href: "/podcasts" },
]

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-14 h-[calc(100vh-3.5rem)] border-r overflow-y-auto pb-10 hidden md:block">
      <div className="px-2 py-2">
        <div className="space-y-1">
          {mainLinks.map((link) => (
            <Button key={link.href} variant="ghost" className={cn("w-full justify-start gap-2 hover:bg-muted")} asChild>
              <Link href={link.href}>
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <h2 className="px-4 text-sm font-semibold mb-2">Library</h2>
          <div className="space-y-1">
            {libraryLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={cn("w-full justify-start gap-2 hover:bg-muted")}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <h2 className="px-4 text-sm font-semibold mb-2">Explore</h2>
          <div className="space-y-1">
            {exploreLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={cn("w-full justify-start gap-2 hover:bg-muted")}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

