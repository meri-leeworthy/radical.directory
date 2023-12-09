import "styles/globals.css"

// bg-[#edd0b366] bg-[#ebcdb066]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=" scroll-smooth">
      <body className="w-screen flex justify-center min-h-screen bg-pink-200">
        <div className="max-w-xl lg:max-w-3xl w-full p-4 my-16">{children}</div>
      </body>
    </html>
  )
}
