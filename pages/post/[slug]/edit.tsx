import { App } from "components/template/App";
import { useRouter } from "next/router";
// import { GET_POST, UPDATE_POST } from "lib/apollo/queries";
// import { useMutation, useQuery } from "@apollo/client";
import Editor from "components/editor/Editor";
import { useDebounce } from "lib/utils";
import { useEffect, useRef, useState } from "react";
import { AutosaveIndicator } from "components/AutosaveIndicator";
import AutoTextArea from "components/AutoTextArea";
import * as Tooltip from "@radix-ui/react-tooltip";
import { stringify } from "gray-matter";

export type Post = { type?: string; content?: {}[] };

const EditPost = () => {
  //placeholder code to make the page render
  const loading = false;
  const isSaved = true;

  const router = useRouter();
  const { slug } = router.query;

  // const { data: initialData } = useQuery(GET_POST, {
  //   variables: {
  //     slug,
  //   },
  // });

  const [debouncedMeta, meta, setMeta] = useDebounce(
    { title: "", slug: "" },
    500
  );
  const [debouncedDoc, doc, setDoc] = useDebounce<Post>(
    { type: "doc", content: [] },
    500
  );

  useEffect(() => {
    const initialData = {
      post: {
        document: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "It's built using a 'Headless WYSIWYG Rich Text Editor Framework' called TipTap, which itself builds on top of the ProseMirror library. On top of the core JSON document model provided by ProseMirror, TipTap provides a modular range of functions for common document manipulations such as adding marks (bold, italics) and changing block types (headings, bullet lists), but the components are unstyled - this is what makes it 'headless'.",
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "My editor is inspired by the document editor on Medium.com: uber-minimal (so you can focus on writing) but with all the options you need in the context you need them. Well, maybe not all the options. In this case I only implemented ",
                },
                { type: "text", marks: [{ type: "bold" }], text: "bold" },
                { type: "text", text: ", " },
                { type: "text", marks: [{ type: "italic" }], text: "italics" },
                { type: "text", text: ", " },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "bullet lists, " }],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: "and " }],
                    },
                  ],
                },
              ],
            },
            {
              type: "heading",
              attrs: { level: 2 },
              content: [{ type: "text", text: "Headings." }],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "The headings in this document editor show off a novel feature I designed and implemented myself. The goal was to avoid presenting the user with a choice between 'heading 1', heading 2' etc, and to loosely enforce document heading hierarchy. Headings are an important way in which people using screen readers navigate pages, as long as they are used correctly. My design for 'contextual heading options' attempts to make the most intuitive option the most correct one as much as possible. ",
                },
              ],
            },
            {
              type: "heading",
              attrs: { level: 3 },
              content: [{ type: "text", text: "How it works" }],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "It does that by giving users only the option to increment or decrement the heading, with the meaning of that button changing based on the context of that text block within the document tree. It's a little buggy, but the core of the idea is there.",
                },
              ],
            },
            {
              type: "heading",
              attrs: { level: 2 },
              content: [
                { type: "text", text: "Bubble menus and floating menus" },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "There are two types of contextual menus in my editor. ",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "One appears above the text when you make a selection: this is called a bubble menu. ",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "The other appears somewhere to the right of the cursor whenever the editor is in focus: this is called a floating menu. ",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "A small feature I worked on is for the floating menu to change position and appearance based on whether the paragraph is empty. Writers often intend to change the block type when they create a new paragraph, so this jump reminds the user that the options are available.",
                },
              ],
            },
          ],
        },
        title: "This is a rich text editor.",
        slug,
      },
    };
    if (initialData && meta.slug === "") {
      setDoc(initialData.post.document);
      setMeta({
        title: initialData.post.title,
        slug: initialData.post.slug as string,
      });
    }
  }, [slug, meta.slug, setMeta, setDoc]);

  // let [updateDoc, { data, loading, error }] = useMutation(UPDATE_POST);

  //whenever debouncedForm changes (i.e. 500ms after user stops typing) send update mutation
  // useEffect(() => {
  //   if (
  //     debouncedMeta.slug &&
  //     meta.title &&
  //     debouncedMeta.title === meta.title
  //   ) {
  //     updateDoc({
  //       variables: {
  //         title: debouncedMeta.title,
  //         document: debouncedDoc,
  //         slug,
  //       },
  //     });
  //   }
  // }, [debouncedDoc, debouncedMeta]);

  const editorBox = useRef<HTMLDivElement>(null);

  // const isSaved =
  //   data?.updatePost?.title == meta.title &&
  //   doc.content?.length === data?.updatePost.document.content.length;

  let [showJSON, setShowJSON] = useState(false);

  return (
    <App title="Edit Post">
      <div
        className="flex flex-col w-full max-w-xl min-h-full pt-40"
        ref={editorBox}
      >
        {doc.content?.length && (
          <>
            <div className="z-0 grow">
              <div className="flex items-center justify-between">
                <h1 className="dark:text-white">
                  <AutoTextArea
                    id="title"
                    rows={1}
                    value={meta.title}
                    onChange={(e) =>
                      setMeta({ ...meta, title: e.target.value })
                    }
                    placeholder="My cool article"
                    className="editor-title"
                    aria-label="Title"
                  />
                </h1>

                <AutosaveIndicator
                  editing={
                    doc !== debouncedDoc || meta.title !== debouncedMeta.title
                  }
                  loading={!!loading}
                  saved={isSaved}
                />
              </div>
              <hr className="mt-2 text-transparent border-t border-gray-300 border-dashed dark:border-gray-700 " />
              <Editor setDoc={setDoc} doc={doc} editorBox={editorBox} />
              <button onClick={(e) => setShowJSON(!showJSON)}>
                {showJSON ? "Hide" : "Show"} JSON
              </button>
              {showJSON ? <div>{JSON.stringify(doc)}</div> : ""}
            </div>
            <form className="relative bottom-0 p-2 mt-16 border border-b-0 shrink-0 bshadow">
              {/* On reflection, I feel like people should actually never have to think 
              about slugs - this is something for computers to figure out. Maybe better to 
              keep this here though in case it can be a special control just for admins */}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div className="flex items-center">
                    <label
                      htmlFor="slug"
                      className="block w-10 text-sm text-slate-800 dark:text-slate-200"
                    >
                      Slug:
                    </label>
                    <input
                      type="text"
                      aria-describedby="slug-explainer"
                      id="slug"
                      className="px-1 bg-white border border-slate-500 dark:bg-black text-slate-600 dark:text-slate-400 focus:text-black focus:dark:text-white focus:border-black focus:dark:border-white focus:outline-none"
                      value={meta.slug}
                      onChange={(e) =>
                        setMeta({ ...meta, slug: e.target.value })
                      }
                    ></input>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content asChild sideOffset={10} side="top">
                  <div className="tooltip" id="slug-explainer">
                    <p>
                      A slug is the part of the URL that is specific to this
                      page. Sometimes called &apos;permalink&apos;.
                    </p>
                  </div>
                </Tooltip.Content>
              </Tooltip.Root>
            </form>
          </>
        )}
      </div>
    </App>
  );
};

export default EditPost;
