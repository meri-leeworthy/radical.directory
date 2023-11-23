"use client"

import { useState } from "react"
import { useClient } from "lib/useClient"
import { redirect } from "next/navigation"
import { directoryRadicalPostUnstable } from "lib/types"
import { Room } from "simple-matrix-sdk"

const NewPostPage = ({ params }: { params: { slug: string } }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const client = useClient()
  if (!client) return "loading..."
  const room = new Room(`!${params.slug}:radical.directory`, client)

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
    <div>
      <h1>New Post</h1>
      <form onSubmit={handlePostSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewPostPage
