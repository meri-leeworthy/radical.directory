import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import { WithThemes } from "components/WithThemes"
import * as Tooltip from "@radix-ui/react-tooltip"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider attribute="class" enableSystem={true}>
    <Tooltip.TooltipProvider>
      <WithThemes>
        <Component {...pageProps} />
      </WithThemes>
    </Tooltip.TooltipProvider>
    // </ThemeProvider>
  )
}
export default MyApp
