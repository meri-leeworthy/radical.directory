"use client"

import { useClient } from "lib/useClient"
import { useState } from "react"

export default function UploadFilePage() {
  const client = useClient()
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = file && (await client?.uploadFile(file))
    console.log("result", result)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="">Upload File</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}
