"use client"

import { useState } from "react"
import { useClient } from "lib/useClient"
import { directoryRadicalPostUnstable } from "lib/types"
import { Room } from "simple-matrix-sdk"
import { IconNorthStar } from "@tabler/icons-react"

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
    <div className="my-4  rounded p-1 bg-[#fff6] flex flex-col">
      <h3 className="opacity-80 text-base flex justify-start items-center gap-1 self-start px-1 pr-2 bg-[#fff9] rounded">
        <IconNorthStar size={16} /> New Post
      </h3>
      <form onSubmit={handlePostSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="title" className="opacity-60 text-sm">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-1 bg-transparent border border-[#1D170C33] rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="opacity-60 text-sm">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-1 text-base bg-transparent border border-[#1D170C33] rounded"></textarea>
        </div>
        <button
          type="submit"
          className="self-end border border-[#1D170C33] rounded px-2">
          Post
        </button>
      </form>
    </div>
  )
}
