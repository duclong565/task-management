"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  folderId?: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create project proposal", completed: false },
    { id: "2", title: "Review documentation", completed: true },
  ])

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-2">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <span className={task.completed ? "text-muted-foreground line-through" : ""}>{task.title}</span>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

