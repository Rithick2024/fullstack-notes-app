"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash, Pencil, Eye } from "lucide-react";
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { ViewModal } from "@/components/ui/view-modal";

// Type definition for a note
type Note = {
  note_id: string;
  note_title: string;
  note_content: string;
};

// Helper function to truncate content based on word count
function getPreviewWords(html: string, maxWords: number): string {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const text = tempElement.textContent || "";
  const words = text.trim().split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
}

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [overflowingNotes, setOverflowingNotes] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.user_id) {
        setUserId(user.user_id);
      } else {
        console.warn("User ID not found in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/notes?user_id=${userId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        toast({
          title: "Failed to load notes",
          description: "Unable to fetch notes from the server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNotes();
    }
  }, [userId, toast]);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    notes.forEach((note) => {
      const el = document.getElementById(`note-preview-${note.note_id}`);
      if (el) {
        map[note.note_id] = el.scrollHeight > el.clientHeight;
      }
    });
    setOverflowingNotes(map);
  }, [notes]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      toast({ title: "Note deleted" });
      setNotes((prev) => prev.filter((note) => note.note_id !== id));
    } catch {
      toast({
        title: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
  };

  const handleViewClick = (note: Note) => {
    setViewingNote(note);
  };

  const handleSave = async (title: string, content: string) => {
    if (!editingNote) return;

    try {
      const res = await fetch(`${apiUrl}/notes/${editingNote.note_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ note_title: title, note_content: content }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Note updated" });
      setNotes((prev) =>
        prev.map((note) =>
          note.note_id === editingNote.note_id
            ? { ...note, note_title: title, note_content: content }
            : note
        )
      );
      setEditingNote(null);
    } catch {
      toast({
        title: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <Button asChild>
          <Link href="/dashboard/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note.note_id}
              className="group border p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">{note.note_title}</h2>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ms-2">
                  <button
                    onClick={() => handleEditClick(note)}
                    className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.note_id)}
                    className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleViewClick(note)}
                    className="p-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative mt-3 max-h-48 overflow-hidden">
                <div
                  id={`note-preview-${note.note_id}`}
                  className="prose prose-sm dark:prose-invert text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: getPreviewWords(note.note_content, 40),
                  }}
                />

                {overflowingNotes[note.note_id] && (
                  <>
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-gray-900 pointer-events-none" />
                    <div className="absolute bottom-1 right-3 z-10">
                      <button
                        className="text-sm text-blue-600 hover:underline font-medium bg-white dark:bg-gray-900 px-2"
                        onClick={() => handleViewClick(note)}
                      >
                        Read more
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingNote && (
        <Modal
          isOpen={Boolean(editingNote)}
          onClose={() => setEditingNote(null)}
          onSave={handleSave}
          note={editingNote}
        />
      )}

      {viewingNote && (
        <ViewModal
          isOpen={Boolean(viewingNote)}
          onClose={() => setViewingNote(null)}
          note={viewingNote}
        />
      )}
    </div>
  );
}
