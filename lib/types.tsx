export const contactTypes = {
  email: "email",
  website: "website",
  twitter: "twitter",
  instagram: "instagram",
  facebook: "facebook",
  newsletter: "newsletter",
  linktree: "linktree",
} as const
export type ContactType = keyof typeof contactTypes

export type DirectoryRadicalEventUnstable = {}

export type DirectoryRadicalContactMetaUnstable = {
  type: ContactType
  value: string
}

export const directoryRadicalMetaContactUnstable =
  "directory.radical.meta.contact.unstable"

export const directoryRadicalPostUnstable = "directory.radical.post.unstable"

export type DirectoryRadicalPostUnstable = {
  title: string
  body: string
  tags: string[]
  msgtype: typeof directoryRadicalPostUnstable
  author: string
}

export type Chunk = {
  type: string
  event_id: string
  content: { body: string; msgtype?: string; "m.relates_to"?: any }
}[] &
  Event[]
