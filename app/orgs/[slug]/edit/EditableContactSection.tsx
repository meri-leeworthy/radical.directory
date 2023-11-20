"use client"
import { useState } from "react"
import {
  Contact,
  ContactItem,
  ContactType,
  getIcon,
  getLabel,
} from "../Contact"
import { DeleteButton, DoneButton, EditButton } from "./CircleIconButton"
import { SectionType, sections } from "./SectionType"

export function EditableContactSection({
  editSection,
  setEditSection,
  contactKVs,
  setContactKVs,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  contactKVs: Record<string, string | undefined>
  setContactKVs: (contactKVs: Record<string, string | undefined>) => void
}) {
  function setContactKV(contactType: ContactType, contactValue?: string) {
    console.log("setting contact kv", contactType, contactValue)
    setContactKVs({ ...contactKVs, [contactType]: contactValue })
  }

  if (editSection === sections.contact)
    return (
      <div className="flex justify-between py-4">
        <EditableContact {...{ contactKVs, setContactKV }} />
        <DoneButton onClick={() => setEditSection(null)} />
      </div>
    )
  else
    return (
      <div className="flex justify-between py-4">
        <Contact contactKVs={contactKVs} />
        <EditButton
          alt="Edit links"
          onClick={() => setEditSection("contact")}
        />
      </div>
    )
}

function EditableContact({
  contactKVs,
  setContactKV,
}: {
  contactKVs: Record<string, string | undefined>
  setContactKV: (contactType: ContactType, contactValue?: string) => void
}) {
  const [editingContactType, setEditingContactType] =
    useState<ContactType | null>(null)
  return (
    <ul className="flex flex-col gap-1">
      {Object.entries(contactKVs).map(([contactType, contactValue]) => (
        <EditableContactItem
          key={contactType}
          contactType={contactType as ContactType}
          {...{
            contactValue,
            editingContactType,
            setEditingContactType,
            setContactKV,
          }}
        />
      ))}
    </ul>
  )
}

//add buttons and clickability for editing different fields

function EditableContactItem({
  editingContactType,
  setEditingContactType,
  contactType,
  contactValue,
  setContactKV,
}: {
  editingContactType: ContactType | null
  setEditingContactType: (contactType: ContactType | null) => void
  contactType: ContactType
  contactValue?: string
  setContactKV: (contactType: ContactType, contactValue?: string) => void
}) {
  const [currentContactValue, setCurrentContactValue] = useState(contactValue)
  if (contactType === editingContactType)
    return (
      <li className="flex items-center gap-1">
        {getIcon(contactType)} <label>{contactType}</label>
        <input
          value={currentContactValue}
          onChange={e => {
            setCurrentContactValue(e.target.value)
            setContactKV(contactType, e.target.value)
          }}
        />
        <DoneButton onClick={() => setEditingContactType(null)} />
      </li>
    )
  else
    return (
      <li className="flex">
        <ContactItem {...{ contactType, contactValue }} />
        <EditButton
          alt="Edit links"
          onClick={() => setEditingContactType(contactType)}
        />
        <DeleteButton onClick={() => setEditingContactType(null)} />
      </li>
    )
}
