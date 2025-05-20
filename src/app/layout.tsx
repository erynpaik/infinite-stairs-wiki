// layout.tsx (Server Component)
import type { Metadata } from "next"
import { Geist, Geist_Mono, VT323 } from "next/font/google"
import { SessionWrapper } from "src/components/SessionWrapper"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel" })

export const metadata: Metadata = {
  title: "Infinite Stairs Wiki",
  description: "A pixelated wiki for Infinite Stairs",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased`}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
