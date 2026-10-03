import { useState, useEffect, useRef } from "react";
import { useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Tiptap from "./Tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { ResizableImage } from "./ResizableImage";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { SmallText } from "./SmallText";
import Tags from "./Tags";
import dayjs from "dayjs";
import {
  Clock,
  Calendar,
  Dot,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Smile,
} from "lucide-react";

const textSizes = [
  { label: "Heading 1", className: "text-lg font-bold" },
  { label: "Heading 2", className: "text-base font-semibold" },
  { label: "Normal Text", className: "text-xs sm:text-sm" },
  { label: "Small Text", className: "text-xs" },
];

export default function TextBox() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [entry, setEntry] = useState("");
  const [now, setNow] = useState(dayjs().format("hh:mm A"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const linkPopoverRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;

      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
        })
        .run();
    };

    reader.readAsDataURL(file);

    // Allows selecting the same image again later
    e.target.value = "";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        linkPopoverRef.current &&
        !linkPopoverRef.current.contains(event.target as Node)
      ) {
        setIsLinkPopoverOpen(false);
      }
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs().format("hh:mm A"));
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  const today: string = dayjs().format("DD-MM-YYYY, dddd");
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension.configure({
        openOnClick: false,
      }),
      SmallText,
      ResizableImage,
      Placeholder.configure({
        placeholder: "Start writing your thoughts here..."
      })
    ],

    content: "",

    onUpdate: ({ editor }) => {
      setEntry(editor.getHTML());
    },
  });
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      const text = editor?.getText().trim() || "";
      return {
        isBold: editor?.isActive("bold"),
        isItalic: editor?.isActive("italic"),
        isUnderline: editor?.isActive("underline"),
        isStrike: editor?.isActive("strike"),
        isBulletList: editor?.isActive("bulletList"),
        isOrderedList: editor?.isActive("orderedList"),
        isBlockquote: editor?.isActive("blockquote"),
        isH1: editor?.isActive("heading", { level: 1 }),
        isH2: editor?.isActive("heading", { level: 2 }),
        isSmallText: editor?.isActive("smallText"),
        isLink: editor?.isActive("link"),
        wordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
      };
    },
  });

  const getCurrentSizeLabel = () => {
    if (editorState?.isSmallText) return "Small Text";
    if (editorState?.isH1) return "Heading 1";
    if (editorState?.isH2) return "Heading 2";
    return "Normal Text";
  };

  const handleSelectSize = (label: string) => {
    if (!editor) return;

    const chain = editor.chain().focus();

    if (label === "Heading 1") {
      chain.unsetMark("smallText").setHeading({ level: 1 });
    } else if (label === "Heading 2") {
      chain.unsetMark("smallText").setHeading({ level: 2 });
    } else if (label === "Small Text") {
      chain.setParagraph().setMark("smallText");
    } else if (label === "Normal Text") {
      chain.setParagraph().unsetMark("smallText");
    }

    chain.run();
    setIsDropdownOpen(false);
  };

  const handleOpenLinkPopover = () => {
    const currentHref = editor?.getAttributes("link").href || "";
    setLinkUrl(currentHref);
    setIsLinkPopoverOpen((prev) => !prev);
  };

  const handleSetLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editor) return;

    const trimmedUrl = linkUrl.trim();
    if (trimmedUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const validUrl = /^https?:\/\//i.test(trimmedUrl)
        ? trimmedUrl
        : `https://${trimmedUrl}`;
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: validUrl })
        .run();
    }
    setIsLinkPopoverOpen(false);
  };

  const handleUnlink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkUrl("");
    setIsLinkPopoverOpen(false);
  };

  const isOptionActive = (label: string) => {
    if (label === "Small Text") return Boolean(editorState?.isSmallText);
    if (label === "Heading 1") {
      return Boolean(editorState?.isH1 && !editorState?.isSmallText);
    }
    if (label === "Heading 2") {
      return Boolean(editorState?.isH2 && !editorState?.isSmallText);
    }
    if (label === "Normal Text") {
      return (
        !editorState?.isH1 && !editorState?.isH2 && !editorState?.isSmallText
      );
    }
    return false;
  };

  return (
    <section className="w-full mt-4 bg-[#FDF3E6] rounded-lg border-2 border-[#CEA174] p-3 sm:p-4 text-black text-base sm:text-lg font-[Artifika] flex flex-col gap-3 sm:gap-4 shadow-sm">
      {/* Stats */}
      <div className="flex flex-col flex-wrap sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 sm:px-4 py-1 flex justify-center items-center gap-1.5 sm:gap-2 rounded-lg border-[#ddac75] border shrink-0">
            <Clock size={16} className="sm:w-4.5 sm:h-4.5" /> {now}
          </div>
          <div className="px-3 sm:px-4 py-1 flex justify-center items-center gap-1.5 sm:gap-2 rounded-lg border-[#ddac75] border shrink-0">
            <Calendar size={16} className="sm:w-4.5 sm:h-4.5" />
            {today}
          </div>
        </div>
        <div className="px-2.5 sm:px-3 py-1 flex justify-center bg-green-500/15 items-center rounded-lg border-[#ddac75] border text-green-800 font-medium shrink-0">
          <Dot className="scale-150 sm:scale-200" color={"green"} /> Saved
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 rounded-xl sm:rounded-2xl text-[#4E2811] text-xs sm:text-sm bg-[#F5E7D6] max-w-full relative z-20">
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            className="px-2.5 sm:px-4 py-1 flex justify-center items-center gap-1.5 sm:gap-2 rounded-lg border-[#ddac75] border shrink-0 hover:bg-[#edd8c0] transition-colors"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <span>{getCurrentSizeLabel()}</span>
            <ChevronDown
              size={16}
              className={`sm:w-4.5 sm:h-4.5 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-36 sm:w-40 bg-[#FDF3E6] border border-[#ddac75] rounded-lg shadow-lg py-1 z-50 flex flex-col">
              {textSizes.map((size) => (
                <button
                  key={size.label}
                  type="button"
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#edd8c0] transition-colors ${
                    size.className
                  } ${
                    isOptionActive(size.label)
                      ? "bg-[#ddac75]/30 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleSelectSize(size.label)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-xl text-[#C9B298] shrink-0">|</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isBold ? "bg-[#ddac75]" : "hover:text-amber-800"
            }`}
            aria-label="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold
              size={16}
              strokeWidth={3}
              className="sm:w-4.5 sm:h-4.5"
            />
          </button>
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isItalic ? "bg-[#ddac75]" : "hover:text-amber-800"
            }`}
            aria-label="Italic"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isUnderline ? "bg-[#ddac75]" : "hover:text-amber-800"
            }`}
            aria-label="Underline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <Underline size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isStrike ? "bg-[#ddac75]" : "hover:text-amber-800"
            }`}
            aria-label="Strikethrough"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
        <span className="text-xl text-[#C9B298] shrink-0">|</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isBulletList
                ? "bg-[#ddac75]"
                : "hover:text-amber-800"
            }`}
            aria-label="Bullet List"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isOrderedList
                ? "bg-[#ddac75]"
                : "hover:text-amber-800"
            }`}
            aria-label="Numbered List"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
        <span className="text-xl text-[#C9B298] shrink-0">|</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            className={`p-1 rounded transition-colors ${
              editorState?.isBlockquote
                ? "bg-[#ddac75]"
                : "hover:text-amber-800"
            }`}
            aria-label="Quote"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote
              size={16}
              fill="currentColor"
              className="sm:w-4.5 sm:h-4.5"
            />
          </button>
          <div className="relative shrink-0" ref={linkPopoverRef}>
            <button
              type="button"
              className={`p-1 rounded transition-colors ${
                editorState?.isLink ? "bg-[#ddac75]" : "hover:text-amber-800"
              }`}
              aria-label="Link"
              onClick={handleOpenLinkPopover}
            >
              <Link size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>

            {isLinkPopoverOpen && (
              <div className="absolute top-full right-0 sm:left-0 mt-1.5 p-2 bg-[#FDF3E6] border border-[#ddac75] rounded-lg shadow-lg z-50 flex items-center gap-1.5 w-64 sm:w-72">
                <input
                  type="url"
                  placeholder="Enter URL (e.g. google.com)..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSetLink();
                    } else if (e.key === "Escape") {
                      setIsLinkPopoverOpen(false);
                    }
                  }}
                  className="w-full bg-[#F5E7D6] text-black text-xs sm:text-sm font-[Artifika] px-2.5 py-1 rounded border focus:outline-none focus:border-amber-700"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSetLink}
                  className="px-2.5 py-1 bg-[#ddac75] hover:bg-[#c99a64] text-[#4E2811] text-xs font-semibold rounded transition-colors shrink-0"
                >
                  Apply
                </button>
                {editorState?.isLink && (
                  <button
                    type="button"
                    onClick={handleUnlink}
                    className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded transition-colors shrink-0"
                    title="Remove Link"
                  >
                    Unlink
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <span className="text-xl text-[#C9B298] shrink-0">|</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            className="p-1 hover:text-amber-800 transition-colors"
            aria-label="Image"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>
          <div className="relative shrink-0" ref={emojiPickerRef}>
            <button
              type="button"
              className={`p-1 rounded transition-colors ${
                showEmojiPicker ? "bg-[#ddac75]" : "hover:text-amber-800"
              }`}
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              aria-label="Emoji"
            >
              <Smile size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>
            {showEmojiPicker && (
              <div className="absolute right-0 top-full mt-1.5 z-50">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    editor?.chain().focus().insertContent(emojiData.emoji).run();

                    setShowEmojiPicker(false);
                  }}
                  width={320}
                  height={400}
                  emojiStyle={EmojiStyle.NATIVE}
                  previewConfig={{
                    showPreview: false,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TipTap Editor */}
      <div className="card flex flex-col">
        <Tiptap editor={editor} />
        <div className="flex justify-end pt-1">
          <span className="text-xs text-[#8C6D53] font-medium tracking-wide select-none">
            {editorState?.wordCount ?? 0} {editorState?.wordCount === 1 ? "word" : "words"}
          </span>
        </div>
      </div>

      {/* Tags */}
      <Tags />
    </section>
  );
}
