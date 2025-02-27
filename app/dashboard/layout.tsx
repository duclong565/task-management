import type React from "react"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <UserNav />
        </div>
      </header>
      {children}
    </div>
  )
}

