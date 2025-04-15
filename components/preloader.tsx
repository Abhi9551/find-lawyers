"use client"

import { useEffect, useState } from "react"
import { Scale } from "lucide-react"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize AOS after component mounts
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 800,
        once: true,
        easing: "ease-out-cubic",
      })
    })

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Disable scrolling when preloader is active
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
          <Scale className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="mb-2 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
          LegalConnect
        </h1>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full animate-progress bg-gradient-to-r from-blue-500 to-blue-700"></div>
        </div>
        <p className="mt-4 text-sm text-slate-500">Finding the right lawyer for you...</p>
      </div>
    </div>
  )
}
