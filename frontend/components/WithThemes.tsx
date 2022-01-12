import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";

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
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="p-2 mt-4 text-xl rounded-full sm-bshadow sm-bshadow-hover-pink"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              aria-label={currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {currentTheme === "dark" ? (
                <FiSun aria-label="Sun" />
              ) : (
                <FiMoon aria-label="Moon" />
              )}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content asChild sideOffset={10}>
            <div className="tooltip">
              {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
    </>
  );
};
