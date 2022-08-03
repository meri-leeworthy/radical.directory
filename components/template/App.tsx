import Head from "next/head";
import { Header } from "components/Header";
import { useQuery } from "@apollo/client";
import { AUTHENTICATED_USER, GET_USER_NAME } from "lib/apollo/queries";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export const App = ({ children, title }: Props) => {
  const { data } = useQuery(AUTHENTICATED_USER);
  const { data: nameData } = useQuery(GET_USER_NAME, {
    variables: {
      id: data?.authenticatedUser?.id,
    },
  });

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header
        name={nameData?.user?.name || "stranger"}
        isLoggedIn={!!data?.authenticatedUser?.id}
      />
      {children}
    </div>
  );
};
