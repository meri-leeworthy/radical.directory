export const metadata = {
  title: "Open Letter from Healthcare Workers",
  description: "Against Israel's genocide in Palestine",
}

export default function OpenLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="max-w-xl p-4">{children}</main>
}
