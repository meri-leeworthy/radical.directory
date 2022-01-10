import { App } from "components/template/App";
import { useRouter } from "next/router";
import { GET_POST, UPDATE_POST } from "lib/apollo/queries";
import { useMutation, useQuery } from "@apollo/client";
import Editor from "components/editor/Editor";
import { useDebounce } from "lib/utils";
import { useEffect, useRef } from "react";
import { AutosaveIndicator } from "components/AutosaveIndicator";
import AutoTextArea from "components/AutoTextArea";

export type Post = {
  title: string;
  slug: string;
  document: { type?: string; content?: {}[] };
};

const EditPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: initialData } = useQuery(GET_POST, {
    variables: {
      slug,
    },
  });

  const [debouncedDoc, doc, setDoc] = useDebounce<Post>(
    {
      title: "",
      document: { type: "doc", content: [] },
      slug: "",
    },
    500
  );

  useEffect(() => {
    if (initialData && doc.slug === "") {
      setDoc(initialData.post);
    }
  }, [initialData]);

  let [updateDoc, { data, loading, error }] = useMutation(UPDATE_POST);

  //whenever debouncedForm changes (i.e. 500ms after user stops typing) send update mutation
  useEffect(() => {
    if (debouncedDoc.slug) {
      updateDoc({
        variables: {
          title: debouncedDoc.title,
          document: debouncedDoc.document,
          slug,
        },
      });
    }
  }, [debouncedDoc]);

  // console.log("init error?", initialError);
  // console.log("init data?", initialData);
  // console.log("init Loading?", initialLoading);
  // console.log("doc.document.content?", doc.document.content);

  const editorBox = useRef<HTMLDivElement>(null);

  console.log(data);

  return (
    <App title="Edit Post">
      <div className="w-full max-w-xl p-4 mt-12 editor-box" ref={editorBox}>
        {doc.document.content?.length && (
          <>
            <div className="flex items-center justify-between">
              {/* <h1>{initialData?.post?.title}</h1> */}

              <AutoTextArea
                id="title"
                rows={1}
                value={doc.title}
                onChange={(e) => setDoc({ ...doc, title: e.target.value })}
                className="w-full pl-1 mr-2 -ml-1 text-4xl border border-transparent dark:bg-black focus:outline-none focus:border-gray-300 dark:focus:border-gray-700"
              />

              <AutosaveIndicator
                editing={doc !== debouncedDoc}
                loading={!!loading}
                saved={!!data}
              />
            </div>
            <hr className="mt-2 text-transparent border-t border-gray-300 border-dashed dark:border-gray-700 " />
            <Editor setDoc={setDoc} doc={doc} editorBox={editorBox} />
            {/* <h1 className="mt-4">Debounced Document</h1>
            <div>{JSON.stringify(debouncedDoc.document)}</div>
            <h1 className="mt-4">Slate Document</h1>
            <div>
              {initialData
                ? JSON.stringify(initialData?.post.content.document)
                : null}
            </div> */}
          </>
        )}
      </div>
    </App>
  );
};

export default EditPost;
