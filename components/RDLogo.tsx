import Link from "next/link";

export const RDLogo = () => {
  return (
    <header className="flex flex-col justify-center flex-grow w-full max-w-screen-md px-4 my-20 sm:w-2/3 xl:max-w-xl xl:h-screen">
      <Link href="/">
        <a className="self-start p-4 border border-black dark:border-gray-300 dark:bg-gray-300 dark:text-black xl:self-center xl:fixed bshadow">
          <h1 className="text-5xl text-center no-underline md:text-6xl font-title">
            <abbr title="Radical Directory" className="logo-abbr">
              R.D
            </abbr>
          </h1>
        </a>
      </Link>
    </header>
  );
};
