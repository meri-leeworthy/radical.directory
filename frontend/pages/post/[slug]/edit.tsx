import { App } from "components/template/App";
import { useRouter } from "next/router";
import { GET_POST, UPDATE_POST } from "lib/apollo/queries";
import { useMutation, useQuery } from "@apollo/client";
import Editor from "components/editor/Editor";
import { useDebounce } from "lib/utils";
import { useEffect, useRef } from "react";
import { AutosaveIndicator } from "components/AutosaveIndicator";
import AutoTextArea from "components/AutoTextArea";
import * as Tooltip from "@radix-ui/react-tooltip";

export type Post = { type?: string; content?: {}[] };

const EditPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: initialData } = useQuery(GET_POST, {
    variables: {
      slug,
    },
  });

  const [debouncedMeta, meta, setMeta] = useDebounce(
    { title: "", slug: "" },
    500
  );
  const [debouncedDoc, doc, setDoc] = useDebounce<Post>(
    { type: "doc", content: [] },
    500
  );

  useEffect(() => {
    if (initialData && meta.slug === "") {
      setDoc(initialData.post.document);
      setMeta({ title: initialData.post.title, slug: initialData.post.slug });
    }
  }, [initialData]);

  let [updateDoc, { data, loading, error }] = useMutation(UPDATE_POST);

  //whenever debouncedForm changes (i.e. 500ms after user stops typing) send update mutation
  useEffect(() => {
    if (
      debouncedMeta.slug &&
      meta.title &&
      debouncedMeta.title === meta.title
    ) {
      updateDoc({
        variables: {
          title: debouncedMeta.title,
          document: debouncedDoc,
          slug,
        },
      });
    }
  }, [debouncedDoc, debouncedMeta]);

  const editorBox = useRef<HTMLDivElement>(null);

  const isSaved =
    data?.updatePost?.title == meta.title &&
    doc.content?.length === data?.updatePost.document.content.length;

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
