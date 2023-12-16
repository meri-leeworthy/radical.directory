import { EditButton, DoneButton } from "../../../../../components/IconButton"
import { SectionType, sections } from "./SectionType"

export function EditableTitle({
  editSection,
  setEditSection,
  name,
  setName,
  updateTitle,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  name?: string
  setName: (name: string) => void
  updateTitle: (name: string) => void
}) {
  if (editSection === sections.title)
    return (
      <div className="flex justify-between">
        <input
          autoFocus
          className="self-start w-full text-lg font-bold font-body bg-transparent border border-[#1D170C33] px-2 rounded-md"
          value={name}
          id="title"
          aria-label="group-name"
          onChange={e => setName(e.target.value)}
        />
        <DoneButton
          onClick={() => {
            setEditSection(null)
            if (!name) throw new Error("name is empty")
            updateTitle(name)
          }}
        />
      </div>
    )
  else
    return (
      <h2 className="flex justify-between font-body">
        {name ?? "loading..."}
        <EditButton alt="Edit name" onClick={() => setEditSection("title")} />
      </h2>
    )
}
