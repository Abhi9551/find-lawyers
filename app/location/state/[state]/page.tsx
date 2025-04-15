import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function StatePage({ params }: { params: { state: string } }) {
  // Format state name for display (e.g., "alabama" -> "Alabama")
  const stateName = params.state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // In a real app, you would fetch this data from an API
  const stateData = {
    name: stateName,
    lawyerCount: 14630,
    practiceAreas: [
      "Bankruptcy and debt",
      "Brain injury",
      "Business",
      "Car accident",
      "Child custody",
      "Child support",
      "Criminal defense",
      "Divorce and separation",
      "DUI and DWI",
      "Employment and labor",
      "Estate planning",
      "Family",
      "Foreclosure",
      "Immigration",
      "Litigation",
      "Medical malpractice",
      "Mesothelioma and asbestos",
      "Motorcycle accident",
      "Personal injury",
      "Probate",
      "Real estate",
      "Social Security & Disability",
      "Speeding and traffic ticket",
      "Tax",
    ],
    topCities: [
      "Anniston",
      "Athens",
      "Auburn",
      "Bessemer",
      "Birmingham",
      "Bluff Park",
      "Decatur",
      "Dothan",
      "Enterprise",
      "Florence",
      "Gadsden",
      "Huntsville",
      "Mobile",
      "Montgomery",
      "Tuscaloosa",
    ],
    allCities: [
      "Abbeville",
      "Abernant",
      "Adamsville",
      "Addison",
      "Adger",
      "Alabaster",
      "Albertville",
      "Alexander City",
      "Alexandria",
      "Allgood",
      "Alma",
      "Alpine",
      "Altoona",
      "Andalusia",
      "Anderson",
      "Anniston",
      "Arab",
      "Ardmore",
      "Ariton",
      "Arley",
      "Arlington",
      "Athens",
      "Atmore",
      "Attalla",
      "Auburn",
      "Autaugaville",
    ],
    counties: [
      "Autauga County",
      "Baldwin County",
      "Barbour County",
      "Bibb County",
      "Blount County",
      "Bullock County",
      "Butler County",
      "Calhoun County",
      "Chambers County",
      "Cherokee County",
      "Chilton County",
      "Choctaw County",
      "Clarke County",
      "Clay County",
      "Cleburne County",
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8" data-aos="fade-up">
            <h1 className="mb-2 text-3xl font-bold">{stateName} Lawyers</h1>
            <p className="text-lg text-slate-600">See {stateName} lawyers by practice area</p>
            <p className="text-slate-600">
              {stateName} currently has more than {stateData.lawyerCount.toLocaleString()} attorneys active on
              LegalConnect. Read real reviews, ask questions to real legal experts, and get a jumpstart on your legal
              challenge.
            </p>
          </div>

          <p className="mb-8 text-slate-600" data-aos="fade-up" data-aos-delay="100">
            Find the best lawyers in {stateName} near you using the navigation below. Narrow your search by legal
            specialty, top city, or county. A list of all cities has also been provided.
          </p>

          <Tabs defaultValue="practice-areas" className="mb-8">
            <TabsList className="mb-6 w-full grid grid-cols-4 bg-white">
              <TabsTrigger
                value="practice-areas"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Practice Areas
              </TabsTrigger>
              <TabsTrigger
                value="top-cities"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Top Cities
              </TabsTrigger>
              <TabsTrigger
                value="all-cities"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                All Cities
              </TabsTrigger>
              <TabsTrigger
                value="counties"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                Counties
              </TabsTrigger>
            </TabsList>

            <TabsContent value="practice-areas">
              <Card data-aos="fade-up">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Practice Areas in {stateName}</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {stateData.practiceAreas.map((area) => (
                      <Link
                        key={area}
                        href={`/location/state/${params.state}/practice-area/${area.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {area}
                      </Link>
                    ))}
                    <Link href="#" className="font-medium text-blue-600 hover:underline">
                      See all practice areas
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="top-cities">
              <Card data-aos="fade-up">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Top cities in {stateName}</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {stateData.topCities.map((city) => (
                      <Link
                        key={city}
                        href={`/location/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all-cities">
              <Card data-aos="fade-up">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">All Cities in {stateName}</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {stateData.allCities.map((city) => (
                      <Link
                        key={city}
                        href={`/location/city/${city.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {city}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="counties">
              <Card data-aos="fade-up">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Counties in {stateName}</h2>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {stateData.counties.map((county) => (
                      <Link
                        key={county}
                        href={`/location/county/${county.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-blue-600 hover:underline"
                      >
                        {county}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mb-8" data-aos="fade-up">
            <h2 className="mb-4 text-2xl font-semibold">Find a Lawyer in {stateName}</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="col-span-2">
                    <h3 className="mb-2 text-lg font-medium">What type of legal help do you need?</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {stateData.practiceAreas.slice(0, 6).map((area) => (
                        <Link
                          key={area}
                          href={`/location/state/${params.state}/practice-area/${area.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center rounded-lg border p-3 transition-colors hover:bg-blue-50 hover:text-blue-600"
                        >
                          {area}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Button className="mb-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                      Find Lawyers Now
                    </Button>
                    <p className="text-center text-sm text-slate-500">Free consultation with many attorneys</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
