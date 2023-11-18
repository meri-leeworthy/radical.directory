"use client"
import { useState } from "react"
import {
  Contact,
  ContactItem,
  ContactType,
  getIcon,
  getLabel,
} from "../Contact"
import { DoneButton, EditButton } from "./EditButton"
import { SectionType, sections } from "./SectionType"

function EditableContactSection({
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
  if (editSection === sections.contact)
    return (
      <div className="flex justify-between py-4">
        <EditableContact {...{ contactKVs, setContactKVs }} />
        <DoneButton onClick={() => setEditSection(null)} />
      </div>
    )
  else
    return (
      <div className="flex justify-between py-4">
        <Contact contactKVs={contactKVs} />
        <EditButton alt="Edit links" />
      </div>
    )
}

function EditableContact({
  contactKVs,
  setContactKVs,
}: {
  contactKVs: Record<string, string | undefined>
  setContactKVs: (contactKVs: Record<string, string | undefined>) => void
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
}: {
  editingContactType: ContactType | null
  setEditingContactType: (contactType: ContactType | null) => void
  contactType: ContactType
  contactValue?: string
}) {
  if (contactType === editingContactType)
    return (
      <li className="flex items-center gap-1">
        {getIcon(contactType)}{" "}
        <label>{getLabel(contactType, contactValue)}</label>
        <input value={getLabel(contactType, contactValue)} />
      </li>
    )
  else return <ContactItem {...{ contactType, contactValue }} />
}
