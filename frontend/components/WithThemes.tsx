import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export const WithThemes = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const renderThemeButton = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <button
          className="p-2 mt-4 text-xl border border-gray-400 rounded-full dark:border-white"
          onClick={() => setTheme("light")}
        >
          <FiSun />
        </button>
      );
    } else {
      return (
        <button
          className="p-2 mt-4 text-xl border border-gray-400 rounded-full dark:border-white"
          onClick={() => setTheme("dark")}
        >
          <FiMoon />
        </button>
      );
    }
  };

  return (
    <>
      {children}
      <div className="bottom-0 flex justify-center w-full px-4 pb-4 md:justify-end md:fixed">
        {renderThemeButton()}
      </div>
    </>
  );
};
