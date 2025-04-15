"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const [filters, setFilters] = useState({
    practiceArea: "",
    location: "",
    rating: [0],
    availability: false,
    freeConsultation: false,
  })

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
                    onValueChange={(value) => setFilters({ ...filters, practiceArea: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Practice Area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="criminal">Criminal Defense</SelectItem>
                      <SelectItem value="business">Business Law</SelectItem>
                      <SelectItem value="personal-injury">Personal Injury</SelectItem>
                      <SelectItem value="estate">Estate Planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Location</label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) => setFilters({ ...filters, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York, NY</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="miami">Miami, FL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Minimum Rating</label>
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={1}
                    onValueChange={(value) => setFilters({ ...filters, rating: value })}
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
                      onCheckedChange={(checked) => setFilters({ ...filters, availability: checked === true })}
                    />
                    <label htmlFor="availability" className="text-sm font-medium">
                      Available this week
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free-consultation"
                      checked={filters.freeConsultation}
                      onCheckedChange={(checked) => setFilters({ ...filters, freeConsultation: checked === true })}
                    />
                    <label htmlFor="free-consultation" className="text-sm font-medium">
                      Free consultation
                    </label>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-6 shadow sm:flex-row sm:items-center">
                <Input placeholder="Search by name or keyword" className="flex-1" />
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating-high">Highest Rating</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Search</Button>
              </div>

              <div className="space-y-4">
                {searchResults.map((lawyer, index) => (
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
                        <p className="mb-2 text-sm">{lawyer.location}</p>
                        <p className="mb-4 text-sm">{lawyer.description}</p>
                        <div className="mt-auto flex flex-wrap gap-2">
                          {lawyer.tags.map((tag, i) => (
                            <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button>View Profile</Button>
                          <Button variant="outline">Book Consultation</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

const searchResults = [
  {
    name: "Sarah Johnson",
    specialty: "Family Law",
    rating: 5,
    reviewCount: 48,
    location: "New York, NY",
    description: "Specializing in divorce, child custody, and family mediation with over 15 years of experience.",
    tags: ["Divorce", "Child Custody", "Family Mediation"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Michael Rodriguez",
    specialty: "Criminal Defense",
    rating: 4,
    reviewCount: 36,
    location: "Los Angeles, CA",
    description:
      "Former prosecutor with extensive experience in criminal defense cases, including DUI and felony charges.",
    tags: ["DUI Defense", "Felony Cases", "Misdemeanors"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "David Chen",
    specialty: "Business Law",
    rating: 5,
    reviewCount: 52,
    location: "Chicago, IL",
    description: "Helping businesses with formation, contracts, intellectual property, and dispute resolution.",
    tags: ["Business Formation", "Contracts", "IP Law"],
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Jennifer Williams",
    specialty: "Personal Injury",
    rating: 5,
    reviewCount: 67,
    location: "Houston, TX",
    description:
      "Dedicated to helping injury victims recover compensation for accidents, medical malpractice, and more.",
    tags: ["Car Accidents", "Medical Malpractice", "Workplace Injuries"],
    image: "/placeholder.svg?height=300&width=400",
  },
]
