"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import TaskList from "@/components/task-list"
import FolderList from "@/components/folder-list"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <div className="mb-4">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
        <FolderList />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button className="ml-4">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
        <TaskList />
      </div>
    </div>
  )
}

