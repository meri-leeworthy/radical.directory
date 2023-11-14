import Link from "next/link"
import "../styles/globals.css"

export const metadata = {
  title: "Radical Directory",
  description: "Grassroots organising in Naarm",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <main className="max-w-xl p-4 pb-8">
          <h1 className="pb-4 mb-4 text-lg border-b border-[#1D170C]">
            <Link href="/">Radical Directory</Link>
          </h1>
          {children}
        </main>
      </body>
    </html>
  )
}
