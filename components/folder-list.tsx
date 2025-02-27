"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Folder, MoreVertical } from "lucide-react"

interface FolderItem {
  id: string
  name: string
}

export default function FolderList() {
  const [folders, setFolders] = useState<FolderItem[]>([
    { id: "1", name: "Personal" },
    { id: "2", name: "Work" },
    { id: "3", name: "Shopping" },
  ])

  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <Button key={folder.id} variant="ghost" className="w-full justify-between">
          <div className="flex items-center">
            <Folder className="mr-2 h-4 w-4" />
            {folder.name}
          </div>
          <MoreVertical className="h-4 w-4" />
        </Button>
      ))}
    </div>
  )
}

