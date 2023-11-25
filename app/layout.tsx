import Link from "next/link"
import "../styles/globals.css"
import Username from "./Username"

export const metadata = {
  title: "Radical Directory",
  description: "Grassroots organising in Naarm",
}

// bg-[#edd0b366]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center bg-[#ebcdb066]">
        <div className="max-w-xl w-full p-4">
          <header className="pb-4 mb-4 border-b border-[#1D170C] flex justify-between">
            <h1 className="text-lg">
              <Link href="/">Radical Directory</Link>
            </h1>
            <Username />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
