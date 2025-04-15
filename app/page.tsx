"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Preloader />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 py-20 text-white">
          <div className="container mx-auto px-4 text-center" data-aos="fade-up">
            <h1 className="mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              Find the Right Lawyer for Your Case
            </h1>
            <p className="mb-8 text-lg md:text-xl">
              Connect with experienced attorneys in your area specialized in your legal needs
            </p>
            <div className="mx-auto max-w-3xl rounded-lg bg-white/10 backdrop-blur-md p-6 shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row">
                <Select defaultValue="">
                  <SelectTrigger className="w-full border-white/20 bg-white/10 text-white">
                    <SelectValue placeholder="Select Practice Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appeals">Appeals</SelectItem>
                    <SelectItem value="bankruptcy">Bankruptcy & Debt</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="car-accidents">Car Accidents</SelectItem>
                    <SelectItem value="criminal">Criminal Defense</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="">
                  <SelectTrigger className="w-full border-white/20 bg-white/10 text-white">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="houston">Houston</SelectItem>
                    <SelectItem value="miami">Miami</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 md:w-auto">
                  Find a Lawyer
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Attorneys Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold" data-aos="fade-up">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Featured Attorneys
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredAttorneys.map((attorney, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  onClick={() => (window.location.href = `/lawyer/${attorney.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={attorney.image || "/placeholder.svg"}
                        alt={attorney.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-semibold">{attorney.firstName}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 text-xl font-semibold">{attorney.name}</h3>
                      <p className="mb-1 text-sm font-medium text-blue-600">{attorney.title}</p>
                      <p className="mb-2 text-xs text-muted-foreground">Licensed for {attorney.yearsLicensed} years</p>

                      <div className="mb-3 flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i < attorney.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        <span className="ml-2 text-sm">({attorney.reviewCount} reviews)</span>
                      </div>

                      <p className="mb-2 flex items-center text-sm text-slate-600">
                        <MapPin className="mr-1 h-4 w-4" /> {attorney.location}
                      </p>

                      <p className="mb-3 text-sm text-slate-600">
                        <span className="font-medium">Practice Areas:</span> {attorney.practiceAreas}
                      </p>

                      <p className="mb-4 text-sm italic text-slate-600">{attorney.tagline}</p>

                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          className="group-hover:bg-blue-50 group-hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `/lawyer/${attorney.id}`
                          }}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `tel:${attorney.phone}`
                          }}
                        >
                          <Phone className="mr-1 h-4 w-4" />
                          <span>{attorney.phone}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center" data-aos="fade-up">
              <Button
                variant="outline"
                className="border-blue-200 bg-gradient-to-r from-blue-50 to-white hover:bg-blue-100"
              >
                View All Attorneys
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gradient-to-r from-slate-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold" data-aos="fade-up">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Why Choose Our Platform
              </span>
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div
                className="rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Easy to Find</h3>
                <p className="text-muted-foreground">
                  Search and filter through thousands of qualified attorneys based on your specific needs.
                </p>
              </div>
              <div
                className="rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Verified Reviews</h3>
                <p className="text-muted-foreground">
                  All reviews are from verified clients who have worked with the attorneys.
                </p>
              </div>
              <div
                className="rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quick Consultation</h3>
                <p className="text-muted-foreground">
                  Book consultations directly through our platform with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold" data-aos="fade-up">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Latest Legal Insights
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg?height=300&width=500"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <p className="text-sm">{post.date}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold">{post.title}</h3>
                    <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                    <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center" data-aos="fade-up">
            <h2 className="mb-6 text-3xl font-bold">Ready to Find Your Legal Representative?</h2>
            <p className="mb-8 mx-auto max-w-2xl text-lg">
              Our platform connects you with experienced attorneys who can help with your specific legal needs. Start
              your search today and get the legal help you deserve.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              Find a Lawyer Now
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const featuredAttorneys = [
  {
    id: "sarah-johnson",
    firstName: "Sarah",
    name: "Sarah Johnson",
    title: "Family Law Attorney",
    yearsLicensed: 15,
    specialty: "Family Law",
    rating: 5,
    reviewCount: 48,
    location: "New York, NY",
    practiceAreas: "Family Law, Divorce, Child Custody",
    tagline: "Compassionate Advocacy. Personal Attention.",
    phone: "(212) 555-1234",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "michael-rodriguez",
    firstName: "Michael",
    name: "Michael Rodriguez",
    title: "Criminal Defense Attorney",
    yearsLicensed: 12,
    specialty: "Criminal Defense",
    rating: 4,
    reviewCount: 36,
    location: "Los Angeles, CA",
    practiceAreas: "Criminal Defense, DUI, Federal Crime",
    tagline: "Aggressive Defense. Proven Results.",
    phone: "(310) 555-5678",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "david-chen",
    firstName: "David",
    name: "David Chen",
    title: "Business Law Attorney",
    yearsLicensed: 18,
    specialty: "Business Law",
    rating: 5,
    reviewCount: 52,
    location: "Chicago, IL",
    practiceAreas: "Business, Contracts, Corporate Law",
    tagline: "Strategic Counsel. Business Solutions.",
    phone: "(312) 555-9012",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const blogPosts = [
  {
    title: "Understanding Child Custody Laws in 2023",
    excerpt: "Learn about the latest changes to child custody laws and how they might affect your case.",
    date: "June 15, 2023",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "5 Things to Know Before Starting a Business",
    excerpt: "Essential legal considerations for entrepreneurs and small business owners.",
    date: "June 10, 2023",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "What to Do After a Car Accident: Legal Steps",
    excerpt: "A step-by-step guide to protecting your rights and interests after a vehicle collision.",
    date: "June 5, 2023",
    image: "/placeholder.svg?height=300&width=500",
  },
]
