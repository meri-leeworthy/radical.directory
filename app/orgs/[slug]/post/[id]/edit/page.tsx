"use client"

import { use, useEffect, useState } from "react"
import { useClient } from "lib/useClient"
import { directoryRadicalPostUnstable } from "lib/types"
import { Room } from "simple-matrix-sdk"
import { IconNorthStar } from "@tabler/icons-react"
import { set } from "lodash"

export default function EditPostPage({
  params,
}: {
  params: { slug: string; id: string }
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const client = useClient()

  const room = client
    ? new Room(`!${params.slug}:radical.directory`, client)
    : undefined

  useEffect(() => {
    room?.getEvent(params.id).then(post => {
      setTitle(post.content?.title || "")
      setContent(post.content?.body || "")
    })
  }, [client])

  if (!client) return "loading..."

  async function handlePostSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("id", params.id)
    event.preventDefault()
    setIsLoading(true)
    const messageEvent = {
      msgtype: directoryRadicalPostUnstable,
      title,
      body: content,
      tags: [],
      "m.new_content": {
        body: content,
        msgtype: directoryRadicalPostUnstable,
        title,
        tags: [],
      },
      "m.relates_to": {
        rel_type: "m.replace",
        event_id: `$${params.id}`,
      },
    }
    //this should EDIT the post, not create a new one
    await room?.sendMessage(messageEvent)
    setIsLoading(false)
    // redirect(`/orgs/${params.slug}`)
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  return (
    <div className="mt-3 border border-[#1D170C22] rounded p-1 bg-[#fff3] flex flex-col">
      <form onSubmit={handlePostSubmit} className="flex flex-col gap-2">
        <div className="flex gap-1">
          <h3 className="opacity-80 w-36 text-base flex justify-center items-center gap-1 px-1 pr-2 bg-[#fff9] rounded">
            <IconNorthStar size={16} /> Edit
          </h3>
          <input
            type="text"
            id="title"
            placeholder="Title"
            aria-label="title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-1 bg-transparent placeholder:text-black placeholder:opacity-30 border border-[#1D170C1a] rounded"
          />
        </div>
        <div className="flex flex-col">
          <textarea
            id="content"
            aria-label="content"
            placeholder="Content"
            value={content}
            // rows={content.split("\n").length + 1}
            onChange={handleContentChange}
            className={`w-full px-1 text-base placeholder:text-black placeholder:opacity-30 bg-transparent border border-[#1D170C1a] rounded h-[78vh] ${
              isLoading && "opacity-50"
            }`}
          />
        </div>
        <button
          type="submit"
          className={`self-end rounded bg-[#ddd2ff] px-2 ${
            isLoading && "opacity-50"
          }`}>
          Done
        </button>
      </form>
    </div>
  )
}
