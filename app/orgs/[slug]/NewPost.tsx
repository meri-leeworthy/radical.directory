"use client"

import { useState } from "react"
import { useClient } from "lib/useClient"
import { directoryRadicalPostUnstable } from "lib/types"
import { Room } from "simple-matrix-sdk"
import { IconNorthStar } from "@tabler/icons-react"
import { SelectAuthor } from "components/SelectAuthor"

export const NewPost = ({ slug }: { slug: string }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const client = useClient()
  if (!client) return "loading..."
  const room = new Room(`!${slug}:radical.directory`, client)

  async function handlePostSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const messageEvent = {
      msgtype: directoryRadicalPostUnstable,
      title,
      body: content,
      tags: [],
    }
    await room.sendMessage(messageEvent)
    // redirect(`/orgs/${params.slug}`)
  }

  return (
    <div className="my-4 border border-[#1D170C22] rounded p-1 bg-[#fff3] flex flex-col">
      <form onSubmit={handlePostSubmit} className="flex flex-col gap-2">
        <div className="flex gap-1">
          <h3 className="opacity-80 w-36 text-base flex justify-center items-center gap-1 px-1 pr-2 bg-[#fff9] rounded">
            <IconNorthStar size={16} /> New Post
          </h3>
          <input
            type="text"
            id="title"
            placeholder="Title"
            aria-label="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-1 bg-transparent placeholder:text-black placeholder:opacity-30 border border-[#1D170C1a] rounded"
          />
        </div>
        <div className="flex flex-col">
          <textarea
            id="content"
            aria-label="content"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-1 text-base placeholder:text-black placeholder:opacity-30 bg-transparent border border-[#1D170C1a] rounded"></textarea>
        </div>
        <div className="flex justify-between">
          <SelectAuthor slug={slug} />
          <button type="submit" className="self-end rounded bg-[#ddd2ff] px-2">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
