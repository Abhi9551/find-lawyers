"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarIcon, Phone, MapPin, Filter } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { lawyersData } from "@/data/lawyers-data"

export default function CityPage({ params }: { params: { city: string } }) {
  // Format city name for display (e.g., "new-york" -> "New York")
  const cityName = params.city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const [lawyers, setLawyers] = useState(lawyersData)
  const [filteredLawyers, setFilteredLawyers] = useState(lawyersData)
  const [filters, setFilters] = useState({
    practiceArea: "",
    rating: "",
    sortBy: "relevance",
    keyword: "",
  })

  // Filter lawyers based on city
  useEffect(() => {
    // In a real app, this would be an API call with the city as a parameter
    const cityLawyers = lawyersData.filter((lawyer) => lawyer.location.toLowerCase().includes(cityName.toLowerCase()))
    setLawyers(cityLawyers)
    setFilteredLawyers(cityLawyers)
  }, [cityName])

  // Apply filters when they change
  useEffect(() => {
    let results = [...lawyers]

    // Filter by practice area
    if (filters.practiceArea) {
      results = results.filter((lawyer) =>
        lawyer.practiceAreas.toLowerCase().includes(filters.practiceArea.toLowerCase()),
      )
    }

    // Filter by rating
    if (filters.rating) {
      const minRating = Number.parseInt(filters.rating)
      results = results.filter((lawyer) => lawyer.rating >= minRating)
    }

    // Filter by keyword
    if (filters.keyword) {
      results = results.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          lawyer.practiceAreas.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          lawyer.title.toLowerCase().includes(filters.keyword.toLowerCase()),
      )
    }

    // Sort results
    switch (filters.sortBy) {
      case "rating-high":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "rating-low":
        results.sort((a, b) => a.rating - b.rating)
        break
      case "reviews":
        results.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "experience":
        results.sort((a, b) => b.yearsLicensed - a.yearsLicensed)
        break
      default:
        // Default sorting (relevance) - no change
        break
    }

    setFilteredLawyers(results)
  }, [filters, lawyers])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled by the useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8" data-aos="fade-up">
            <h1 className="mb-2 text-3xl font-bold">Lawyers in {cityName}</h1>
            <p className="text-lg text-slate-600">Find the best attorneys in {cityName} for your legal needs</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="rounded-lg bg-white p-6 shadow lg:col-span-1" data-aos="fade-right">
              <h2 className="mb-4 text-xl font-semibold">Filters</h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">Practice Area</label>
                  <Select
                    value={filters.practiceArea}
                    onValueChange={(value) => handleFilterChange("practiceArea", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Practice Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Practice Areas</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="criminal">Criminal Defense</SelectItem>
                      <SelectItem value="business">Business Law</SelectItem>
                      <SelectItem value="personal injury">Personal Injury</SelectItem>
                      <SelectItem value="estate">Estate Planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Minimum Rating</label>
                  <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Rating</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating-high">Highest Rating</SelectItem>
                      <SelectItem value="rating-low">Lowest Rating</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="experience">Most Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                  onClick={() =>
                    setFilters({
                      practiceArea: "",
                      rating: "",
                      sortBy: "relevance",
                      keyword: "",
                    })
                  }
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              <div
                className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-6 shadow sm:flex-row sm:items-center"
                data-aos="fade-up"
              >
                <form onSubmit={handleSearch} className="flex flex-1 flex-col gap-4 sm:flex-row">
                  <Input
                    placeholder="Search by name, practice area, or keyword"
                    className="flex-1"
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                  >
                    <Filter className="mr-2 h-4 w-4" /> Filter Results
                  </Button>
                </form>
              </div>

              {filteredLawyers.length > 0 ? (
                <div className="space-y-4">
                  {filteredLawyers.map((lawyer, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      onClick={() => (window.location.href = `/lawyer/${lawyer.id}`)}
                    >
                      <CardContent className="flex flex-col p-0 sm:flex-row">
                        <div className="relative h-48 w-full sm:h-auto sm:w-48">
                          <Image
                            src={lawyer.image || "/placeholder.svg"}
                            alt={lawyer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                              <p className="text-sm font-medium text-blue-600">{lawyer.title}</p>
                              <p className="text-xs text-muted-foreground">Licensed for {lawyer.yearsLicensed} years</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
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
                          </div>
                          <p className="mb-2 flex items-center text-sm text-slate-600">
                            <MapPin className="mr-1 h-4 w-4" /> {lawyer.location}
                          </p>
                          <p className="mb-3 text-sm text-slate-600">
                            <span className="font-medium">Practice Areas:</span> {lawyer.practiceAreas}
                          </p>
                          <p className="mb-4 text-sm italic text-slate-600">{lawyer.tagline}</p>
                          <div className="mt-auto flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `/lawyer/${lawyer.id}`
                              }}
                            >
                              View Profile
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex items-center text-blue-600 hover:text-blue-800"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.location.href = `tel:${lawyer.phone}`
                              }}
                            >
                              <Phone className="mr-1 h-4 w-4" /> {lawyer.phone}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-white p-8 text-center shadow" data-aos="fade-up">
                  <h3 className="mb-2 text-xl font-semibold">No lawyers found</h3>
                  <p className="text-muted-foreground">
                    No lawyers match your current filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}

              {filteredLawyers.length > 0 && (
                <div className="mt-8 flex justify-center" data-aos="fade-up">
                  <Button variant="outline" className="mx-1 border-blue-200 hover:bg-blue-50">
                    Previous
                  </Button>
                  <Button className="mx-1 bg-blue-600 hover:bg-blue-700">1</Button>
                  <Button variant="outline" className="mx-1 border-blue-200 hover:bg-blue-50">
                    2
                  </Button>
                  <Button variant="outline" className="mx-1 border-blue-200 hover:bg-blue-50">
                    3
                  </Button>
                  <Button variant="outline" className="mx-1 border-blue-200 hover:bg-blue-50">
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
