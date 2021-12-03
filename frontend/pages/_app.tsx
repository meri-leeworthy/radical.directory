import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import client from "lib/apollo/client";
import { WithThemes } from "components/WithThemes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider attribute="class" enableSystem={true}>
        <WithThemes>
          <Component {...pageProps} />
        </WithThemes>
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default MyApp;
