"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { lawyersData } from "@/data/lawyers-data"
import { StarIcon } from "@radix-ui/react-icons"

export default function PracticeAreaPage({ params }: { params: { area: string } }) {
  // Format practice area name for display (e.g., "criminal-defense" -> "Criminal Defense")
  const areaName = params.area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Get lawyers for this practice area
  const [practiceAreaLawyers, setPracticeAreaLawyers] = useState<any[]>([])

  useEffect(() => {
    // Filter lawyers by practice area
    const filtered = lawyersData.filter((lawyer) =>
      lawyer.practiceAreas.toLowerCase().includes(params.area.replace(/-/g, " ").toLowerCase()),
    )
    setPracticeAreaLawyers(filtered)
  }, [params.area])

  // Get unique states and cities from the filtered lawyers
  const states = Array.from(
    new Set(
      practiceAreaLawyers.map((lawyer) => {
        const state = lawyer.location.split(", ")[1]
        return state
      }),
    ),
  )
    .filter(Boolean)
    .sort()

  const cities = Array.from(
    new Set(
      practiceAreaLawyers.map((lawyer) => {
        const city = lawyer.location.split(", ")[0]
        return city + ", " + lawyer.location.split(", ")[1]
      }),
    ),
  )
    .filter(Boolean)
    .sort()

  // In a real app, you would fetch this data from an API
  const allStates = [
    "Alaska",
    "Alabama",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
  ]

  const allCities = [
    "Atlanta, GA",
    "Austin, TX",
    "Baltimore, MD",
    "Boston, MA",
    "Brooklyn, NY",
    "Buffalo, NY",
    "Charlotte, NC",
    "Chicago, IL",
    "Cincinnati, OH",
    "Cleveland, OH",
    "Columbus, OH",
    "Dallas, TX",
    "Denver, CO",
    "Detroit, MI",
    "El Paso, TX",
    "Fort Worth, TX",
    "Houston, TX",
    "Indianapolis, IN",
    "Jacksonville, FL",
    "Kansas City, MO",
  ]

  // Content specific to practice area
  const practiceAreaContent = {
    appeals: {
      description:
        "If you file a lawsuit and lose the case, you can appeal the decision to the next highest court, which is called the appellate court.",
      whatTheyDo:
        "Experienced appellate attorneys will assume the various aspects of an appeal, including preparation for trial, consultations at the trial court level, and editing briefs and preparing oral arguments.",
    },
    "criminal-defense": {
      description:
        "A criminal defense lawyer represents someone who has been accused of a crime. They ensure the defendant's rights are protected throughout the criminal process.",
      whatTheyDo:
        "Criminal defense attorneys investigate the case, negotiate plea deals, formulate a defense strategy, and represent defendants in court trials.",
    },
    family: {
      description:
        "Family law focuses on legal matters involving family relationships, such as divorce, child custody, and adoption.",
      whatTheyDo:
        "Family lawyers handle divorce proceedings, child custody arrangements, child support, adoption, and other domestic relations matters.",
    },
  }

  // Default content if specific practice area content is not available
  const defaultContent = {
    description: `${areaName} lawyers specialize in legal matters related to ${areaName.toLowerCase()}. They provide expert guidance and representation for clients facing issues in this area of law.`,
    whatTheyDo: `${areaName} attorneys help clients navigate the complexities of ${areaName.toLowerCase()} law, represent them in court proceedings, and work to achieve the best possible outcomes for their specific situations.`,
  }

  // Get content for the current practice area or use default
  const content = (practiceAreaContent as any)[params.area] || defaultContent

  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (location) {
      window.location.href = `/search?area=${params.area}&location=${encodeURIComponent(location)}`
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8" data-aos="fade-up">
            <h1 className="mb-2 text-3xl font-bold">Find a {areaName} Lawyer</h1>
            <p className="text-lg text-slate-600">Get help from experienced {areaName.toLowerCase()} attorneys</p>
          </div>

          <Card className="mb-8" data-aos="fade-up">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Search for {areaName} Lawyers</h2>
              <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label htmlFor="location" className="mb-2 block text-sm font-medium">
                    City and state
                  </label>
                  <Input
                    id="location"
                    placeholder="Enter city or zip code"
                    className="w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 md:w-auto"
                  >
                    Find Lawyers
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">View {areaName} attorneys by state</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {states.length > 0
                    ? states.map((state) => (
                        <Link
                          key={state}
                          href={`/location/state/${state.toLowerCase().replace(/\s+/g, "-")}/practice-area/${params.area}`}
                          className="text-blue-600 hover:underline"
                        >
                          {state}
                        </Link>
                      ))
                    : allStates.slice(0, 15).map((state) => (
                        <Link
                          key={state}
                          href={`/location/state/${state.toLowerCase().replace(/\s+/g, "-")}/practice-area/${params.area}`}
                          className="text-blue-600 hover:underline"
                        >
                          {state}
                        </Link>
                      ))}
                </div>
              </CardContent>
            </Card>

            <Card data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">View {areaName} attorneys by city</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {cities.length > 0
                    ? cities.map((city) => (
                        <Link
                          key={city}
                          href={`/location/city/${city.split(",")[0].toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-blue-600 hover:underline"
                        >
                          {city}
                        </Link>
                      ))
                    : allCities.slice(0, 10).map((city) => (
                        <Link
                          key={city}
                          href={`/location/city/${city.split(",")[0].toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-blue-600 hover:underline"
                        >
                          {city}
                        </Link>
                      ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8 mt-8" data-aos="fade-up" data-aos-delay="300">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">What a {areaName} lawyer can do for you</h2>
              <p className="mb-4 text-slate-600">{content.whatTheyDo}</p>

              <h2 className="mb-4 text-xl font-semibold">Why hire a {areaName} attorney</h2>
              <p className="text-slate-600">{content.description}</p>
            </CardContent>
          </Card>

          {practiceAreaLawyers.length > 0 && (
            <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
              <h2 className="mb-6 text-2xl font-semibold">Top {areaName} Lawyers</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {practiceAreaLawyers.slice(0, 3).map((lawyer, index) => (
                  <Card
                    key={index}
                    className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                    onClick={() => (window.location.href = `/lawyer/${lawyer.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={lawyer.image || "/placeholder.svg"}
                          alt={lawyer.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="text-xl font-semibold">{lawyer.firstName}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="mb-1 text-xl font-semibold">{lawyer.name}</h3>
                        <p className="mb-1 text-sm font-medium text-blue-600">{lawyer.title}</p>
                        <p className="mb-2 text-xs text-muted-foreground">Licensed for {lawyer.yearsLicensed} years</p>
                        <div className="mb-3 flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${i < lawyer.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          <span className="ml-2 text-sm">({lawyer.reviewCount} reviews)</span>
                        </div>
                        <p className="mb-4 text-sm italic text-slate-600">{lawyer.tagline}</p>
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                  View All {areaName} Lawyers
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="500">
            <h2 className="mb-4 text-2xl font-semibold">Ready to find a {areaName} lawyer?</h2>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
