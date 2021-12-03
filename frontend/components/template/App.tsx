import Head from "next/head";
import { LOGOUT } from "lib/apollo/queries";
import { useMutation } from "@apollo/client";
import client from "lib/apollo/client";
import { useRouter } from "next/router";
import { authenticatedUser } from "lib/apollo/cache";
import Link from "next/link";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const App = ({ children, title }: Props) => {
  const router = useRouter();
  let [logout] = useMutation(LOGOUT);
  const logoutHandler = async () => {
    await logout();
    await client.resetStore();
    authenticatedUser({ name: "", id: "" });
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex justify-between w-full border-b-2">
        <h1>Radical Directory</h1>
        <nav className="">
          <div>
            Hello{" "}
            {authenticatedUser().name ? authenticatedUser().name : "stranger!"}
          </div>
          {authenticatedUser().id ? (
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
};
