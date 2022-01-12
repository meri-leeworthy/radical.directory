import { Logout } from "./Logout";
import Link from "next/link";

type Props = {
  name: string;
  isLoggedIn: boolean;
};

export const Header: React.FC<Props> = ({ name, isLoggedIn }: Props) => {
  return (
    <header className="fixed z-50 flex justify-around w-full bg-white dark:bg-black">
      <Link href="/">
        <a
          className="p-2 -mt-2 border border-black dark:border-gray-300 bshadow hover:underline decoration-2 underline-offset-[6px]"
          tabIndex={0}
        >
          <h1 className="text-3xl text-center md:text-4xl font-title">
            <abbr title="Radical Directory" className="logo-abbr">
              R.D
            </abbr>
          </h1>
        </a>
      </Link>

      <nav className="flex items-center space-x-4 flex-nowrap">
        <div>
          Hello{" "}
          <Link href="/user/edit">
            <a className="hover:underline decoration-2">{name}</a>
          </Link>
        </div>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Link href="/login">
            <a className="button">Login</a>
          </Link>
        )}
      </nav>
    </header>
  );
};
