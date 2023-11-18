import { EditButton, DoneButton } from "./EditButton"
import { SectionType, sections } from "./SectionType"

export function EditableDescription({
  editSection,
  setEditSection,
  description,
  setDescription,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  description?: string
  setDescription: (name: string) => void
}) {
  if (editSection === sections.description)
    return (
      <div className="flex justify-between py-4">
        <textarea
          autoFocus
          className="self-start w-full text-base h-80 font-body bg-transparent border border-[#1D170C33] px-2 rounded-md"
          value={description}
          id="description"
          aria-label="group-description"
          onChange={e => setDescription(e.target.value)}
        />
        <DoneButton onClick={() => setEditSection(null)} />
      </div>
    )
  else
    return (
      <div className="flex py-4">
        <p className="font-body">{description ?? "loading..."}</p>
        <EditButton
          alt="Edit description"
          onClick={() => setEditSection("description")}
        />
      </div>
    )
}
