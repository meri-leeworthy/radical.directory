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
