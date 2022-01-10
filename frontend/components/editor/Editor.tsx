import { RefObject } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { Dispatch } from "react";
import { Post } from "pages/post/[slug]/edit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import History from "@tiptap/extension-history";
import BubbleMenu from "components/editor/BubbleMenuContent";
import FloatingMenu from "components/editor/FloatingMenuContent";

type Props = {
  setDoc: Dispatch<Post>;
  doc: Post;
  editorBox: RefObject<HTMLDivElement>;
};

const Editor: React.FC<Props> = ({ setDoc, doc, editorBox }: Props) => {
  const editor = useEditor({
    extensions: [
      Document,
      History,

      //nodes
      Paragraph,
      Heading,
      BulletList,
      ListItem,
      Text,

      //marks
      Bold,
      Italic,
    ],
    content: doc.document,
    onUpdate: ({ editor }) => {
      const newDoc = {
        ...doc,
        document: editor.getJSON(),
      };
      setDoc(newDoc);
    },
  });
  if (!editor) return null;
  return (
    <>
      <BubbleMenu editor={editor} />
      <FloatingMenu editor={editor} editorBox={editorBox} />
      <EditorContent
        editor={editor}
        className="w-full prose tiptap-editor dark:prose-invert"
      />
    </>
  );
};

export default Editor;
