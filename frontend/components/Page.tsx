import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import Head from "next/head";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const Page = ({ title, children }: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const renderThemeButton = () => {
    // if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <button
          className="mt-4 border p-2 border-gray-400 dark:border-white rounded-full text-xl"
          onClick={() => setTheme("light")}
        >
          <FiSun />
        </button>
      );
    } else {
      return (
        <button
          className="mt-4 border p-2 border-gray-400 dark:border-white rounded-full text-xl"
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
        <meta
          name="description"
          content="A platform for social justice media"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-start xl:flex-row xl:max-h-screen">
        {children}
      </div>
      <div className="flex justify-center md:justify-end pb-4 px-4 md:fixed w-full bottom-0">
        {renderThemeButton()}
      </div>
    </>
  );
};
