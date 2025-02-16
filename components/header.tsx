import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg className="h-6 w-6 fill-red-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
          </svg>
          YouTube
        </Link>
        <div className="flex flex-1 items-center gap-2 md:gap-4 px-6">
          <form className="flex-1 max-w-2xl">
            <div className="flex gap-2">
              <Input type="search" placeholder="Search" className="w-full max-w-[600px]" />
              <Button type="submit" variant="secondary" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default">Sign in</Button>
        </div>
      </div>
    </header>
  )
}

