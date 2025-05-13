"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: true,
        easing: "ease-out-cubic",
      })
    })

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="mb-4 animate-pulse">
          <Image
            src="/logo.png" // Replace with your actual logo file name
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <h1 className="mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
          Attorneys info
        </h1>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full animate-progress bg-gradient-to-r from-blue-500 to-blue-700"></div>
        </div>
        <p className="mt-4 text-sm text-slate-500">Finding the right lawyer for you...</p>
      </div>
    </div>
  )
}
