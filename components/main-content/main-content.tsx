"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import TaskList from "@/components/task-list";
import Sidebar from "@/components/sidebar/side-bar";

export default function MainContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
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
  );
}
