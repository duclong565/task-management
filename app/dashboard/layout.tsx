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
        <div className="mx-auto flex h-14 items-center justify-between">
          <h1 className="text-xl font-bold pd-0 ml-8">Task Manager</h1>
          <div className="flex items-center pr-1 mr-12">
            <UserNav />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

