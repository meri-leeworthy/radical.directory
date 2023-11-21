import {
  IconBrandFacebook,
  IconBrandLinktree,
  IconNews,
  IconBrandInstagram,
  IconBrandTwitter,
  IconMail,
  IconWorld,
} from "@tabler/icons-react"
import { ContactType } from "lib/types"

export function Contact({
  contactKVs,
}: {
  contactKVs: Record<ContactType, string | undefined>
}) {
  return (
    <ul className="text-sm font-body columns-2 opacity-60">
      {Object.entries(contactKVs).map(([contactType, contactValue]) => (
        <li key={contactType}>
          <ContactItem
            contactType={contactType as ContactType}
            contactValue={contactValue}
          />
        </li>
      ))}
    </ul>
  )
}

export function ContactItem({
  contactType,
  contactValue,
}: {
  contactType: ContactType
  contactValue: string | undefined
}) {
  return (
    <div className="flex items-center gap-1">
      {getIcon(contactType)}{" "}
      <a href={getHrefFormat(contactType, contactValue)}>
        {getLabel(contactType, contactValue)}
      </a>
    </div>
  )
}

export function getIcon(contactType: ContactType) {
  switch (contactType) {
    case "email":
      return <IconMail size={16} />
    case "website":
      return <IconWorld size={16} />
    case "twitter":
      return <IconBrandTwitter size={16} />
    case "instagram":
      return <IconBrandInstagram size={16} />
    case "facebook":
      return <IconBrandFacebook size={16} />
    case "newsletter":
      return <IconNews size={16} />
    case "linktree":
      return <IconBrandLinktree size={16} />
  }
}

export function getHrefFormat(contactType: ContactType, contactValue?: string) {
  if (!contactValue) return ""
  switch (contactType) {
    case "email":
      return `mailto:${contactValue}`
    case "website":
      return contactValue
    case "twitter":
      return `https://twitter.com/${contactValue.split("@")[1]}`
    case "instagram":
      return `https://instagram.com/${contactValue.split("@")[1]}`
    case "facebook":
      return `https://facebook.com/${contactValue.split("/")[1]}`
    case "newsletter":
      return contactValue
    case "linktree":
      return contactValue
  }
}

export function getLabel(contactType: ContactType, contactValue?: string) {
  if (!contactValue) return "loading..."
  switch (contactType) {
    case "email":
      return contactValue
    case "website":
      return contactValue
    case "twitter":
      return contactValue.split("@")[1]
    case "instagram":
      return contactValue.split("@")[1]
    case "facebook":
      return contactValue.split("/")[1]
    case "newsletter":
      return "Newsletter"
    case "linktree":
      return "Linktree"
  }
}
