"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, MoreVertical } from "lucide-react";
import FolderItem from "@/lib/folder-api/folder-interface";
import { getFolders } from "@/lib/folder-api/folder-api";

export default function FolderList() {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem>();

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        setLoading(true);
        const data = await getFolders();
        setFolders(data);
      } catch (error) {
        console.error("Co loi roiiii: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolder();
  }, []);

  return (
    <div className="space-y-1">
      {loading ? (
        <div className="text-center text-sm text-muted-foreground">
          Loading Folders...
        </div>
      ) : folders.length > 0 ? (
        folders.map((folders) => (
          <Button
            key={folders.id}
            variant={selectedFolder === folders.id ? "default" : "ghost"}
            className="w-full justify-start"
            size="sm"
            onClick={() => setSelectedFolder(folders.id)}
          >
            <Folder className="mr-2 h-4 w-4" />
            {folders.title}
          </Button>
        ))
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          No Folders Yet
        </div>
      )}
    </div>
  );
}
