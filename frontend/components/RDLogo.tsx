import Link from "next/link";

export const RDLogo = () => {
  return (
    <header className="flex-grow w-full flex flex-col px-4 my-20 sm:w-2/3 max-w-screen-md xl:max-w-xl xl:h-screen justify-center">
      <Link href="/">
        <a className="p-4 border-4 border-black self-start dark:border-gray-300 dark:bg-gray-300 dark:text-black xl:self-center xl:fixed">
          <h1 className="text-5xl md:text-6xl font-title text-center no-underline">
            <abbr title="Radical Directory" className="logo-abbr">
              R.D
            </abbr>
          </h1>
        </a>
      </Link>
    </header>
  );
};
