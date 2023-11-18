export const sections = {
  title: "title",
  description: "description",
  contact: "contact",
  faq: "faq",
} as const

export type SectionType = keyof typeof sections | null
