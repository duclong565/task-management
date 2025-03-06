"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import TaskList from "@/components/task-list"
import Sidebar from "@/components/sidebar/side-bar"
import MainContent from "@/components/main-content/main-content"

export default function DashboardPage() {

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <MainContent />    
    </div>
  )
}

