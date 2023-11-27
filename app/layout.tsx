import Link from "next/link"
import "styles/globals.css"
import Username from "components/Username"

export const metadata = {
  title: "Radical Directory",
  description: "Grassroots organising in Naarm",
}

// bg-[#edd0b366] bg-[#ebcdb066]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-screen flex justify-center min-h-screen">
        <div className="max-w-xl lg:max-w-3xl w-full p-4">
          <header className="pb-4 mb-4 border-b border-[#1D170C] flex justify-between">
            <h1 className="text-lg font-medium">
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
