"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.user_id) {
        setUserId(user.user_id);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "User ID missing",
        description: "Please log in again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const plainTextContent = content.replace(/<[^>]*>/g, "");

      const res = await fetch(`http://127.0.0.1:8000/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          note_title: title,
          note_content: plainTextContent,
          user_id: Number(userId),
        }),
      });

      if (!res.ok) throw new Error();

      toast({
        title: "Note created",
        description: "Your note has been successfully created.",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Failed to create note",
        description: "There was an error creating your note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">New Note</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium h-12"
            disabled={isSubmitting}
          />
          <div className="min-h-[300px]">
            <ReactQuill
              value={content}
              onChange={setContent}
              className="border rounded-md"
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["blockquote"],
                  ["align", { align: "" }, { align: "center" }, { align: "right" }],
                  [{ color: [] }, { background: [] }],
                  ["image"],
                ],
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Note
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
