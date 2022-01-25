import { FiCheck, FiEdit3, FiMoreHorizontal } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";

export const AutosaveIndicator = ({
  editing,
  loading,
  saved,
}: {
  editing: boolean;
  loading: boolean;
  saved: boolean;
}) =>
  editing ? (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div>
          <FiEdit3 id="editing" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content asChild sideOffset={10} side="right">
        <div className="tooltip">
          <label htmlFor="editing">Editing</label>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  ) : loading ? (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div>
          <FiMoreHorizontal id="saving" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content asChild sideOffset={10} side="right">
        <div className="tooltip">
          <label htmlFor="saving">Saving...</label>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  ) : saved ? (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div>
          <FiCheck id="saved" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content asChild sideOffset={10} side="right">
        <div className="tooltip">
          <label htmlFor="saved">Saved</label>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  ) : null;
