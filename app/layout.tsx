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
      <body>{children}</body>
    </html>
  )
}
