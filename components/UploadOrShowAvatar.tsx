"use client"

import { useClient } from "lib/useClient"
import { useState } from "react"
import { IconPhotoFilled } from "@tabler/icons-react"
import { useRoom } from "lib/useRoom"
import Image from "next/image"

export function UploadOrShowAvatar({
  slug,
  imageUri,
}: {
  slug: string
  imageUri: string | null
}) {
  console.log("imageUri", imageUri)
  if (imageUri) {
    const serverName = imageUri.split("://")[1].split("/")[0]
    const mediaId = imageUri.split("://")[1].split("/")[1]

    const avatarUrl = `https://matrix.radical.directory/_matrix/media/r0/download/${serverName}/${mediaId}`

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={avatarUrl} alt="avatar" width="120" />
  }

  return <UploadAvatar {...{ slug }} />
}

function UploadAvatar({ slug }: { slug: string }) {
  const client = useClient()
  const room = useRoom(slug)
  if (!client || !room) return <div>loading...</div>

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const result = file && (await client?.uploadFile(file))
      await room.sendEvent("m.room.avatar", { url: result.content_uri })
      console.log("result", result)
      location.reload()
    }
  }

  return (
    <form className="flex">
      <label
        htmlFor="file"
        className="flex gap-1 items-center bg-[#fff6] rounded-full px-2 self-start">
        <IconPhotoFilled size={16} />
        Add Profile Image
      </label>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        aria-label="Upload Avatar"
        className="opacity-0 file:opacity-0"
      />
    </form>
  )
}
