import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export const WithThemes = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {children}
      <div className="bottom-0 flex justify-center px-4 pb-4 md:justify-end md:fixed md:right-0">
        <button
          className="p-2 mt-4 text-xl border border-gray-400 rounded-full dark:border-white lil-block-shadow dark:lil-block-shadow-dark"
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          aria-label={currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
        >
          {currentTheme === "dark" ? (
            <FiSun aria-label="Sun" />
          ) : (
            <FiMoon aria-label="Moon" />
          )}
        </button>
      </div>
    </>
  );
};
