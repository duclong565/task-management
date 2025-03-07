"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, MoreVertical, Pencil, Plus, Trash, Heart } from "lucide-react";
import FolderItem from "@/lib/folder-api/folder-interface";
import {
  getFolders,
  updateFolder,
  deleteFolder,
  createFolder,
} from "@/lib/folder-api/folder-api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import HeartRain from "./heart-rain";

interface FolderListProps {
  onFolderSelect?: (folderId: string) => void;
}

export default function FolderList({ onFolderSelect }: FolderListProps) {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [editingFolder, setEditingFolder] = useState<FolderItem | null>(null);
  const [showHeartRain, setShowHeartRain] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("Error loading folders: ", error);
      toast.error("Failed to load folders");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderTitle.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    try {
      const newFolder = await createFolder(folderTitle);
      setFolders([...folders, newFolder]);
      toast.success("Folder created successfully");
      setIsCreateDialogOpen(false);
      setFolderTitle("");
    } catch (error) {
      console.error("Error creating folder: ", error);
      toast.error("Failed to create folder");
    }
  };

  const handleEditFolder = async () => {
    if (!editingFolder || !folderTitle.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }

    try {
      await updateFolder(editingFolder.id, folderTitle);
      setFolders(
        folders.map((folder) =>
          folder.id === editingFolder.id
            ? { ...folder, title: folderTitle }
            : folder
        )
      );
      toast.success("Folder updated successfully");
      setIsEditDialogOpen(false);
      setEditingFolder(null);
      setFolderTitle("");
    } catch (error) {
      console.error("Error updating folder: ", error);
      toast.error("Failed to update folder");
    }
  };

  const handleDelete = async (folderId: string) => {
    try {
      await deleteFolder(folderId);
      setFolders(folders.filter((folder) => folder.id !== folderId));
      toast.success("Folder deleted successfully");
      if (selectedFolder === folderId) {
        setSelectedFolder(null);
      }
    } catch (error) {
      console.error("Error deleting folder: ", error);
      toast.error("Failed to delete folder");
    }
  };

  const openEditDialog = (folder: FolderItem) => {
    setEditingFolder(folder);
    setFolderTitle(folder.title);
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Loading Folders...
      </div>
    );
  }

  const handleFolderClick = (folderId: string, title: string) => {
    setSelectedFolder(folderId);
    if (onFolderSelect) {
      onFolderSelect(folderId);
    }
    
    // Trigger heart rain for "Ngân" folder
    if (title === "Ngân") {
      setShowHeartRain(true);
      // Start fade out after 3 seconds
      setTimeout(() => setShowHeartRain(false), 5000);
    } else {
      setShowHeartRain(false);
    }
  };

  return (
    <div className="relative">
      <HeartRain isActive={showHeartRain} />
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Folders</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus />
          New Folder
        </Button>
      </div>

      <div className="space-y-1">
        {folders.length > 0 ? (
          folders.map((folder) => (
            <div key={folder.id} className="group flex items-center">
              <Button
                variant={selectedFolder === folder.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  folder.title === "Ngân" ? "text-pink-500 hover:text-pink-600" : ""
                }`}
                size="sm"
                onClick={() => handleFolderClick(folder.id, folder.title)}
              >
                {folder.title === "Ngân" ? (
                  <Heart className="mr-2 h-4 w-4 fill-pink-500" />
                ) : (
                  <Folder className="mr-2 h-4 w-4" />
                )}
                {folder.title}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`h-8 w-8 p-0 opacity-0 group-hover:opacity-100 ${
                      folder.title === "Ngân" ? "text-pink-500 hover:text-pink-600" : ""
                    }`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditDialog(folder)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(folder.id)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            No Folders Yet
          </div>
        )}
      </div>

      {/* Create Folder Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <Input
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            placeholder="Enter folder name"
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Folder Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Folder</DialogTitle>
          </DialogHeader>
          <Input
            value={folderTitle}
            onChange={(e) => setFolderTitle(e.target.value)}
            placeholder="Enter folder name"
            className="mt-4"
          />
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditFolder}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
