import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    smallText: {
      toggleSmallText: () => ReturnType;
    };
  }
}

export const SmallText = Mark.create({
  name: "smallText",

  parseHTML() {
    return [
      {
        tag: "small",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["small", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleSmallText:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});