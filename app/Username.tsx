"use client"

import { useClient } from "lib/useClient"
import React, { useState, useEffect } from "react"
import { Client } from "simple-matrix-sdk"

const BASE_URL = "https://matrix.radical.directory"
const ACCESSTOKEN_STORAGE_KEY = "accessToken"
const USERID_STORAGE_KEY = "userId"

const Username: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null)
  const client = useClient()

  if (client) {
    client.getProfile(client.useUserId()).then(profile => {
      console.log(profile)
      setUsername(profile.displayname)
    })
  }

  return <div>{username}</div>
}

export default Username
