"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, Menu, Search, X } from "lucide-react"

const practiceAreas = [
  "Appeals",
  "Bankruptcy & Debt",
  "Business",
  "Car Accidents",
  "Child Custody",
  "Child Support",
  "Civil Rights",
  "Consumer Protection",
  "Contracts and Agreements",
  "Criminal Defense",
  "Debt Collection",
  "Divorce and Separation",
  "Domestic Violence",
  "DUI and DWI",
  "Elder Law",
  "Employment and Labor",
  "Estate Planning",
  "Education",
  "Family",
  "Federal Crime",
]

const states = [
  "Alabama",
  "Alaska",
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

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington DC",
]

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="mr-6 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-2xl font-bold text-transparent transition-all duration-300 hover:from-blue-600 hover:to-slate-800"
          >
            LegalConnect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex items-center gap-1 transition-all duration-300 hover:bg-slate-100"
                >
                  Find a Lawyer by Location
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[500px] p-0" align="start">
                <div className="grid grid-cols-1 gap-3 p-4">
                  <h3 className="font-medium text-blue-600">Browse by State</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {states.slice(0, 15).map((state) => (
                      <DropdownMenuItem
                        key={state}
                        asChild
                        className="transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Link href={`/location/state/${state.toLowerCase().replace(/\s+/g, "-")}`}>{state}</Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <h3 className="font-medium text-blue-600">Browse by City</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {cities.slice(0, 15).map((city) => (
                      <DropdownMenuItem
                        key={city}
                        asChild
                        className="transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Link href={`/location/city/${city.toLowerCase().replace(/\s+/g, "-")}`}>{city}</Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group flex items-center gap-1 transition-all duration-300 hover:bg-slate-100"
                >
                  Lawyers by Practice Area
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[500px] p-0" align="start">
                <div className="p-4">
                  <h3 className="mb-2 font-medium text-blue-600">Choose an area of law that your issue relates to:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {practiceAreas.map((area) => (
                      <DropdownMenuItem
                        key={area}
                        asChild
                        className="transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Link href={`/practice-area/${area.toLowerCase().replace(/\s+/g, "-")}`}>{area}</Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/blog" className="flex items-center text-sm font-medium transition-colors hover:text-blue-600">
              Blogs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search for lawyers"
            className="transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-blue-600">Find a Lawyer by Location</h3>
                <div className="pl-4">
                  <h4 className="mb-2 text-sm font-medium">Browse by State</h4>
                  <ul className="space-y-2">
                    {states.slice(0, 5).map((state) => (
                      <li key={state}>
                        <Link
                          href={`/location/state/${state.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm transition-colors hover:text-blue-600"
                        >
                          {state}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <h4 className="mb-2 mt-4 text-sm font-medium">Browse by City</h4>
                  <ul className="space-y-2">
                    {cities.slice(0, 5).map((city) => (
                      <li key={city}>
                        <Link
                          href={`/location/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm transition-colors hover:text-blue-600"
                        >
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-blue-600">Lawyers by Practice Area</h3>
                <div className="pl-4">
                  <ul className="space-y-2">
                    {practiceAreas.slice(0, 10).map((area) => (
                      <li key={area}>
                        <Link
                          href={`/practice-area/${area.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm transition-colors hover:text-blue-600"
                        >
                          {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/blog" className="text-lg font-semibold text-blue-600">
                  Blogs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute left-0 top-16 z-50 w-full bg-white p-4 shadow-md">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search for Lawyers</h2>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-4 md:flex-row">
              <Input placeholder="Lawyer name, practice area, or location" className="flex-1" />
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
