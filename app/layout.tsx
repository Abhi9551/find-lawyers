import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { StateProvider } from "@/providers/state-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LegalConnect - Find the Right Lawyer for Your Case",
  description: "Connect with experienced attorneys in your area specialized in your legal needs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </head>
      <body className={inter.className}>
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  )
}


import './globals.css'