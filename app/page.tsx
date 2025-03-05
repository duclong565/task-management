import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex gap-96 h-14 mx-16 items-center justify-between">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="space-x-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="mx-auto px-14 grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Organize your tasks efficiently
            </h1>
            <p className="text-lg text-muted-foreground">
              A minimal task management solution to help you stay organized and productive.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="https://github.com/duclong565" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

