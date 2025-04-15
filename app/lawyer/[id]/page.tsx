"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  StarIcon,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Briefcase,
  ThumbsUp,
  Calendar,
  FileText,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { lawyersData } from "@/data/lawyers-data"

export default function LawyerProfile({ params }: { params: { id: string } }) {
  const [lawyer, setLawyer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the lawyer by ID from our data
    const foundLawyer = lawyersData.find((l) => l.id === params.id)

    if (foundLawyer) {
      // Enhance the lawyer data with additional profile information
      const enhancedLawyer = {
        ...foundLawyer,
        address: "123 Legal Street, Suite 500, " + foundLawyer.location,
        email:
          foundLawyer.firstName.toLowerCase() +
          "." +
          foundLawyer.name.split(" ")[1].toLowerCase() +
          "@legalconnect.com",
        description: `${foundLawyer.name} is a highly experienced ${foundLawyer.specialty.toLowerCase()} attorney with over ${foundLawyer.yearsLicensed} years of practice. ${foundLawyer.firstName} specializes in ${foundLawyer.practiceAreas}. ${foundLawyer.firstName} is known for ${foundLawyer.tagline.toLowerCase()}`,
        education: [
          {
            degree: "J.D.",
            institution: "Harvard Law School",
            year: (new Date().getFullYear() - foundLawyer.yearsLicensed - 3).toString(),
          },
          {
            degree: "B.A. in Political Science",
            institution: "Yale University",
            year: (new Date().getFullYear() - foundLawyer.yearsLicensed - 7).toString(),
          },
        ],
        experience: [
          {
            position: "Partner",
            company: foundLawyer.name.split(" ")[1] + " & Associates",
            period: new Date().getFullYear() - Math.floor(foundLawyer.yearsLicensed / 2) + " - Present",
          },
          {
            position: "Associate Attorney",
            company: "Smith & Partners",
            period:
              new Date().getFullYear() -
              foundLawyer.yearsLicensed +
              " - " +
              (new Date().getFullYear() - Math.floor(foundLawyer.yearsLicensed / 2) - 1),
          },
        ],
        languages: ["English", foundLawyer.rating > 4 ? "Spanish" : "French"],
        practiceAreas: foundLawyer.practiceAreas.split(", "),
        barAdmissions: [
          foundLawyer.location.split(", ")[1] + " State Bar",
          "U.S. District Court for the " +
            (foundLawyer.location.includes("New York")
              ? "Southern District of New York"
              : "District of " + foundLawyer.location.split(", ")[1]),
        ],
        awards: [
          "Super Lawyers Rising Star " + (new Date().getFullYear() - 5) + "-" + new Date().getFullYear(),
          "Top 100 " +
            foundLawyer.specialty +
            " Lawyers in " +
            foundLawyer.location.split(", ")[1] +
            " " +
            new Date().getFullYear(),
        ],
        availability: ["Monday to Friday, 9:00 AM - 5:00 PM"],
        reviews: [
          {
            author: "John D.",
            rating: 5,
            date: "March 15, 2023",
            content: `${foundLawyer.firstName} helped me navigate a complex case with professionalism and empathy. ${foundLawyer.firstName} was always available to answer my questions and fought hard for my interests. I couldn't have asked for better representation.`,
          },
          {
            author: "Maria G.",
            rating: foundLawyer.rating,
            date: "February 2, 2023",
            content: `I hired ${foundLawyer.firstName} for my ${foundLawyer.specialty.toLowerCase()} case, and ${foundLawyer.firstName.toLowerCase()} was exceptional. ${foundLawyer.firstName} explained everything clearly and helped me understand my options. Thanks to ${foundLawyer.firstName.toLowerCase()}'s expertise, we reached a favorable agreement.`,
          },
          {
            author: "Robert T.",
            rating: Math.max(foundLawyer.rating - 1, 3),
            date: "December 10, 2022",
            content: `${foundLawyer.firstName} provided excellent guidance during my proceedings. ${foundLawyer.firstName} was knowledgeable, responsive, and helped me achieve a fair settlement. I highly recommend ${foundLawyer.firstName.toLowerCase()}'s services.`,
          },
        ],
      }

      setLawyer(enhancedLawyer)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading lawyer profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!lawyer) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Lawyer Not Found</h1>
            <p className="mt-2">The lawyer profile you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-blue-800 p-4 text-white">
              <div className="container mx-auto">
                <h1 className="text-2xl font-bold">{lawyer.title}</h1>
                <p>Licensed for {lawyer.yearsLicensed} years</p>
              </div>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="relative h-64 w-full max-w-[250px] overflow-hidden rounded-lg">
                  <Image src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold">{lawyer.name}</h2>
                    <p className="text-lg text-blue-600">{lawyer.tagline}</p>
                  </div>

                  <div className="mb-4 flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${i < lawyer.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    <span className="ml-2">({lawyer.reviewCount} reviews)</span>
                  </div>

                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{lawyer.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <a href={`tel:${lawyer.phone}`} className="hover:text-blue-600">
                        {lawyer.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <a href={`mailto:${lawyer.email}`} className="hover:text-blue-600">
                        {lawyer.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lawyer.practiceAreas.map((area: string, index: number) => (
                      <span key={index} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:w-64">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold text-blue-700">Availability</h3>
                      <div className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 text-blue-600" />
                        <p className="text-sm">{lawyer.availability}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                    <Calendar className="mr-2 h-4 w-4" /> Book a Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => (window.location.href = `tel:${lawyer.phone}`)}
                  >
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                  <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="about">
            <TabsList className="mb-6 grid w-full grid-cols-4 bg-white">
              <TabsTrigger value="about" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                About
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-semibold">About {lawyer.name}</h2>
                  <p className="mb-6 whitespace-pre-line">{lawyer.description}</p>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-blue-700">
                        <Briefcase className="h-5 w-5" /> Practice Areas
                      </h3>
                      <ul className="list-inside list-disc space-y-1 text-slate-700">
                        {lawyer.practiceAreas.map((area: string, index: number) => (
                          <li key={index}>{area}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 mt-6 flex items-center gap-2 text-lg font-semibold text-blue-700">
                        <Award className="h-5 w-5" /> Bar Admissions
                      </h3>
                      <ul className="list-inside list-disc space-y-1 text-slate-700">
                        {lawyer.barAdmissions.map((admission: string, index: number) => (
                          <li key={index}>{admission}</li>
                        ))}
                      </ul>

                      <h3 className="mb-3 mt-6 flex items-center gap-2 text-lg font-semibold text-blue-700">
                        <ThumbsUp className="h-5 w-5" /> Languages
                      </h3>
                      <ul className="list-inside list-disc space-y-1 text-slate-700">
                        {lawyer.languages.map((language: string, index: number) => (
                          <li key={index}>{language}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-semibold">Experience & Education</h2>

                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-blue-700">Work Experience</h3>
                    <div className="space-y-4">
                      {lawyer.experience.map((exp: any, index: number) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h4 className="font-medium">{exp.position}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-semibold text-blue-700">Education</h3>
                    <div className="space-y-4">
                      {lawyer.education.map((edu: any, index: number) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-blue-700">Awards & Recognition</h3>
                    <ul className="list-inside list-disc space-y-2 text-slate-700">
                      {lawyer.awards.map((award: string, index: number) => (
                        <li key={index}>{award}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Client Reviews</h2>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                      <FileText className="mr-2 h-4 w-4" /> Write a Review
                    </Button>
                  </div>

                  <div className="mb-8 flex flex-col items-center justify-center rounded-lg bg-blue-50 p-6 text-center md:flex-row md:justify-between md:text-left">
                    <div>
                      <div className="mb-2 text-4xl font-bold text-blue-700">{lawyer.rating}.0</div>
                      <div className="mb-2 flex justify-center md:justify-start">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-5 w-5 ${i < lawyer.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on {lawyer.reviewCount} reviews</p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                          </div>
                          <div className="h-2 w-32 rounded-full bg-slate-200">
                            <div className="h-2 w-[90%] rounded-full bg-yellow-400"></div>
                          </div>
                          <span className="text-sm">90%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(4)
                              .fill(0)
                              .map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            <StarIcon className="h-4 w-4 text-gray-300" />
                          </div>
                          <div className="h-2 w-32 rounded-full bg-slate-200">
                            <div className="h-2 w-[8%] rounded-full bg-yellow-400"></div>
                          </div>
                          <span className="text-sm">8%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(3)
                              .fill(0)
                              .map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            {Array(2)
                              .fill(0)
                              .map((_, i) => (
                                <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                              ))}
                          </div>
                          <div className="h-2 w-32 rounded-full bg-slate-200">
                            <div className="h-2 w-[2%] rounded-full bg-yellow-400"></div>
                          </div>
                          <span className="text-sm">2%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {lawyer.reviews.map((review: any, index: number) => (
                      <div key={index} className="border-b border-slate-200 pb-6 last:border-0">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{review.author}</h3>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="mb-2 flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                        <p>{review.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      Load More Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-semibold">Frequently Asked Questions</h2>

                  <div className="space-y-6">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 text-lg font-medium text-blue-700">
                        What is your approach to {lawyer.specialty.toLowerCase()} cases?
                      </h3>
                      <p>
                        I believe in a client-centered approach that focuses on achieving the best possible outcome
                        while minimizing conflict. I work closely with each client to understand their unique situation
                        and goals, then develop a strategy tailored to their specific needs.
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 text-lg font-medium text-blue-700">
                        How long does a typical {lawyer.specialty.toLowerCase()} case take?
                      </h3>
                      <p>
                        The duration of a {lawyer.specialty.toLowerCase()} case varies widely depending on the
                        complexity of the issues involved and the level of cooperation between parties. Simple cases can
                        be resolved in as little as 3-6 months, while complex cases may take 1-2 years or longer.
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 text-lg font-medium text-blue-700">
                        What should I bring to our initial consultation?
                      </h3>
                      <p>
                        For our first meeting, it's helpful to bring any relevant documents related to your case, such
                        as contracts, correspondence, or court documents. Also, prepare a list of questions or concerns
                        you'd like to discuss.
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 text-lg font-medium text-blue-700">Do you offer payment plans?</h3>
                      <p>
                        Yes, I understand that legal representation can be a significant expense. I offer flexible
                        payment plans tailored to your financial situation. We can discuss the options during our
                        initial consultation.
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-2 text-lg font-medium text-blue-700">What is your communication policy?</h3>
                      <p>
                        I prioritize clear and prompt communication with my clients. I typically respond to emails and
                        phone calls within 24 business hours. For urgent matters, my office is available during business
                        hours, and I provide emergency contact information to all clients.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
