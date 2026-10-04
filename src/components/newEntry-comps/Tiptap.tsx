import { EditorContent, Editor } from "@tiptap/react";

interface TiptapProps {
  editor: Editor | null;
}

export default function Tiptap({ editor }: TiptapProps) {
  return (
    <div className="w-full min-h-[6lh]">
      <EditorContent editor={editor} className="min-h-[6lh]" />
    </div>
  );
}
