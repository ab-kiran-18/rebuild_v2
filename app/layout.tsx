import "./globals.css"
import { Inter, Tilt_Prism } from "next/font/google"
import { Toaster } from "@/components/ui-atoms/toaster"
import { Providers } from "@/components/ui-organisms/Providers"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ATS-Friendly Resume Builder",
  description: "Create a 90% ATS-friendly resume easily",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
