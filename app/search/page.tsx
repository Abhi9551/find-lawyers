"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon, Phone, MapPin, Filter } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { lawyersData } from "@/data/lawyers-data"

export default function SearchPage() {
  const searchParams = useSearchParams()

  const initialPracticeArea = searchParams.get("practiceArea") || ""
  const initialLocation = searchParams.get("location") || ""
  const initialKeyword = searchParams.get("keyword") || ""

  const [filters, setFilters] = useState({
    practiceArea: initialPracticeArea,
    location: initialLocation,
    rating: [0],
    availability: false,
    freeConsultation: false,
    keyword: initialKeyword,
    sortBy: "relevance",
  })

  const [filteredResults, setFilteredResults] = useState(lawyersData)
  const [isSearching, setIsSearching] = useState(false)

  // Apply filters when they change
  useEffect(() => {
    setIsSearching(true)

    // Simulate a search delay
    const timer = setTimeout(() => {
      let results = [...lawyersData]

      // Filter by practice area
      if (filters.practiceArea) {
        results = results.filter((lawyer) =>
          lawyer.practiceAreas.toLowerCase().includes(filters.practiceArea.toLowerCase()),
        )
      }

      // Filter by location
      if (filters.location) {
        results = results.filter((lawyer) => lawyer.location.toLowerCase().includes(filters.location.toLowerCase()))
      }

      // Filter by rating
      if (filters.rating[0] > 0) {
        results = results.filter((lawyer) => lawyer.rating >= filters.rating[0])
      }

      // Filter by keyword
      if (filters.keyword) {
        results = results.filter(
          (lawyer) =>
            lawyer.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            lawyer.practiceAreas.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            lawyer.location.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            lawyer.title.toLowerCase().includes(filters.keyword.toLowerCase()),
        )
      }

      // Sort results
      switch (filters.sortBy) {
        case "rating-high":
          results.sort((a, b) => b.rating - a.rating)
          break
        case "reviews":
          results.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        case "newest":
          results.sort((a, b) => b.yearsLicensed - a.yearsLicensed)
          break
        // Default is relevance, no sorting needed
      }

      setFilteredResults(results)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [filters])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filters are already applied via useEffect
  }

  const resetFilters = () => {
    setFilters({
      practiceArea: "",
      location: "",
      rating: [0],
      availability: false,
      freeConsultation: false,
      keyword: "",
      sortBy: "relevance",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Find a Lawyer</h1>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="rounded-lg bg-white p-6 shadow lg:col-span-1">
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
                      <SelectItem value="personal-injury">Personal Injury</SelectItem>
                      <SelectItem value="estate">Estate Planning</SelectItem>
                      <SelectItem value="immigration">Immigration</SelectItem>
                      <SelectItem value="employment">Employment Law</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="tax">Tax Law</SelectItem>
                      <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Location</label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Location</SelectItem>
                      <SelectItem value="new-york">New York, NY</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="miami">Miami, FL</SelectItem>
                      <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                      <SelectItem value="boston">Boston, MA</SelectItem>
                      <SelectItem value="washington">Washington, DC</SelectItem>
                      <SelectItem value="atlanta">Atlanta, GA</SelectItem>
                      <SelectItem value="dallas">Dallas, TX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Minimum Rating</label>
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={1}
                    value={filters.rating}
                    onValueChange={(value) => handleFilterChange("rating", value)}
                  />
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Any</span>
                    <span>{filters.rating[0]}+ Stars</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="availability"
                      checked={filters.availability}
                      onCheckedChange={(checked) => handleFilterChange("availability", checked === true)}
                    />
                    <label htmlFor="availability" className="text-sm font-medium">
                      Available this week
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free-consultation"
                      checked={filters.freeConsultation}
                      onCheckedChange={(checked) => handleFilterChange("freeConsultation", checked === true)}
                    />
                    <label htmlFor="free-consultation" className="text-sm font-medium">
                      Free consultation
                    </label>
                  </div>
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
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="newest">Most Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-6 shadow sm:flex-row sm:items-center">
                <form onSubmit={handleSearch} className="flex flex-1 flex-col gap-4 sm:flex-row">
                  <Input
                    placeholder="Search by name or keyword"
                    className="flex-1"
                    value={filters.keyword}
                    onChange={(e) => handleFilterChange("keyword", e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                  >
                    <Filter className="mr-2 h-4 w-4" /> Search
                  </Button>
                </form>
              </div>

              {isSearching ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 mx-auto"></div>
                    <p>Searching for lawyers...</p>
                  </div>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((lawyer, index) => (
                    <Card key={index}>
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
                            <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                            <div className="flex items-center">
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
                          <p className="mb-2 text-sm text-muted-foreground">{lawyer.specialty}</p>
                          <p className="mb-2 flex items-center text-sm">
                            <MapPin className="mr-1 h-4 w-4 text-blue-600" /> {lawyer.location}
                          </p>
                          <p className="mb-4 text-sm">{lawyer.tagline}</p>
                          <div className="mt-auto flex flex-wrap gap-2">
                            {lawyer.practiceAreas.split(", ").map((tag, i) => (
                              <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button onClick={() => (window.location.href = `/lawyer/${lawyer.id}`)}>
                              View Profile
                            </Button>
                            <Button variant="outline" onClick={() => (window.location.href = `tel:${lawyer.phone}`)}>
                              <Phone className="mr-2 h-4 w-4" /> Call Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-white p-8 text-center shadow">
                  <h3 className="mb-2 text-xl font-semibold">No lawyers found</h3>
                  <p className="mb-4 text-muted-foreground">
                    We couldn't find any lawyers matching your search criteria. Try adjusting your filters or search
                    terms.
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}

              {filteredResults.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="mx-1">
                    Previous
                  </Button>
                  <Button variant="outline" className="mx-1">
                    1
                  </Button>
                  <Button className="mx-1">2</Button>
                  <Button variant="outline" className="mx-1">
                    3
                  </Button>
                  <Button variant="outline" className="mx-1">
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
