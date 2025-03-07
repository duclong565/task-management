"use client";

import FolderList from "@/components/folder-list";

interface SidebarProps {
  selectedFolderId?: string;
  onFolderSelect: (folderId: string) => void;
}

export default function Sidebar({
  selectedFolderId,
  onFolderSelect,
}: SidebarProps) {
  return (
    <div className="w-64 border-r p-4">
      <FolderList
        selectedFolderId={selectedFolderId}
        onFolderSelect={onFolderSelect}
      />
    </div>
  );
}
