import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import Head from "next/head";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Landing = ({ title, children }: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeButton = () => {
    // if (!mounted) return null;
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
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col items-center justify-start min-h-screen xl:flex-row xl:max-h-screen">
        {children}
      </div>
    </>
  );
};

//this was the last child of the fragment - now moved to WithThemes
// <div className="bottom-0 flex justify-center w-full px-4 pb-4 md:justify-end md:fixed">
// {renderThemeButton()}
// </div>
