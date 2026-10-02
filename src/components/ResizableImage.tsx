import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useState, useRef } from "react";

function ResizableImageComponent({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startResize = (e: React.MouseEvent, direction: "left" | "right") => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = containerRef.current?.offsetWidth || 300;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const diffX =
        direction === "right" ? currentX - startX : startX - currentX;
      const newWidth = Math.max(120, Math.min(800, startWidth + diffX));
      updateAttributes({ width: `${newWidth}px` });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <NodeViewWrapper className="my-3 inline-block max-w-full leading-none align-middle">
      <div
        ref={containerRef}
        style={{ width: node.attrs.width || "auto" }}
        className={`relative inline-block group max-w-full rounded-lg select-none transition-all ${
          selected || isResizing
            ? "ring-2 ring-[#CEA174] shadow-lg"
            : "hover:ring-1 hover:ring-[#CEA174]/70"
        }`}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className="w-full h-auto object-contain rounded-lg block max-w-full pointer-events-none"
        />

        {/* Left Side Handle */}
        <div
          onMouseDown={(e) => startResize(e, "left")}
          className={`absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-10 bg-[#4E2811] border-2 border-[#FDF3E6] shadow-md rounded-full cursor-ew-resize transition-all z-20 flex items-center justify-center ${
            selected || isResizing
              ? "opacity-100 scale-100"
              : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          }`}
          title="Drag to resize"
        >
          <div className="w-0.5 h-4 bg-[#CEA174] rounded-full" />
        </div>

        {/* Right Side Handle */}
        <div
          onMouseDown={(e) => startResize(e, "right")}
          className={`absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-10 bg-[#4E2811] border-2 border-[#FDF3E6] shadow-md rounded-full cursor-ew-resize transition-all z-20 flex items-center justify-center ${
            selected || isResizing
              ? "opacity-100 scale-100"
              : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          }`}
          title="Drag to resize"
        >
          <div className="w-0.5 h-4 bg-[#CEA174] rounded-full" />
        </div>
      </div>
    </NodeViewWrapper>
  );
}

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "320px",
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});
