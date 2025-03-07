"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Task from "@/lib/task-api/task-interface";
import { getTasksByFolder } from "@/lib/task-api/task-api";
import { toast } from "sonner";

interface TaskListProps {
  selectedFolderId?: string;
}

export default function TaskList({ selectedFolderId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedFolderId) {
        setTasks([]);
        return;
      }

      try {
        setLoading(true);
        const response = await getTasksByFolder(selectedFolderId);
        if (response) {
          setTasks(response);
          toast.success("Tasks loaded successfully");
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedFolderId]);

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "DONE" ? "OPEN" : "DONE" }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  if (loading) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Loading Tasks...
      </div>
    );
  }

  if (!selectedFolderId) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Please select a folder
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No Tasks Yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={task.status === "DONE"}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <span
              className={
                task.status === "DONE"
                  ? "text-muted-foreground line-through"
                  : ""
              }
            >
              {task.title}
            </span>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
