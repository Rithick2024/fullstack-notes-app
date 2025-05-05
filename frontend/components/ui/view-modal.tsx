"use client";

import { Button } from "@/components/ui/button";

export const ViewModal = ({ isOpen, onClose, note }: any) => {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{note.note_title}</h2>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: note.note_content }}
        />
      </div>
    </div>
  );
};
