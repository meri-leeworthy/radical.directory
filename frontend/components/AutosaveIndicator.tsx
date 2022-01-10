import { FiCheck, FiEdit3, FiMoreHorizontal } from "react-icons/fi";

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
    <FiEdit3 />
  ) : loading ? (
    <FiMoreHorizontal />
  ) : saved ? (
    <FiCheck />
  ) : null;
