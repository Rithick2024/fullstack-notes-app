import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import styles

// Dynamically import react-quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const Modal = ({ isOpen, onClose, onSave, note }: any) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && note) {
      setTitle(note.note_title);
      setContent(note.note_content); // Set the content from the note (without HTML)
    }
  }, [isOpen, note]);

  const handleSave = async () => {
    if (!note) return;
    setLoading(true);
    try {
      // Get plain text content from ReactQuill (without HTML tags)
      const plainTextContent = content.replace(/<[^>]*>/g, ""); // Remove all HTML tags
      await onSave(title, plainTextContent); // Pass plain text content to save
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error("Failed to save note:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold">Edit Note</h2>
        <div className="mt-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium mb-4 bg-white dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="min-h-[150px]">
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
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="dark:border-gray-600">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="dark:bg-black-600 dark:hover:bg-black-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
