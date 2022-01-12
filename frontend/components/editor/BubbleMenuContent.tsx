import { BubbleMenu, Editor } from "@tiptap/react";
import { FiBold, FiItalic } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";

type Props = {
  editor: Editor;
};

const StyledBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenu editor={editor} className="bubble-menu">
      {/* Toggle Bold */}
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            id="toggle-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <FiBold />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content asChild sideOffset={5} side="top">
          <div className="tooltip">
            <label htmlFor="toggle-bold">
              {editor.isActive("bold") && "Unmark "}Bold
            </label>
          </div>
        </Tooltip.Content>
      </Tooltip.Root>

      {/* Toggle Italic */}
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            id="toggle-italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <FiItalic />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content asChild sideOffset={5} side="top">
          <div className="tooltip">
            <label htmlFor="toggle-italic">
              {editor.isActive("italic") && "Unmark "}Italic
            </label>
          </div>
        </Tooltip.Content>
      </Tooltip.Root>
    </BubbleMenu>
  );
};

export default StyledBubbleMenu;
