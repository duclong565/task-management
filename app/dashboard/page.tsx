"use client";

import Sidebar from "@/components/sidebar/side-bar";
import MainContent from "@/components/main-content/main-content";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedFolderId, setSelectedFolderId] = useState<string>();

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        selectedFolderId={selectedFolderId}
        onFolderSelect={handleFolderSelect}
      />
      {/* Main content */}
      <MainContent selectedFolderId={selectedFolderId} />
    </div>
  );
}
