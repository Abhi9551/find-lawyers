import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              <Image
                          src="/logo.png"
                          alt="Logo"
                          width={74}
                          height={74}
                          className="rounded-full"
                        />
            Attorneys info
            </h3>
            <p className="mb-4 text-slate-300">
              Connecting clients with the right legal professionals for their specific needs.
            </p>
            {/* <div className="flex space-x-4">
              <Link href="#" className="text-slate-300 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-300 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-300 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-300 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div> */}
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Practice Areas</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/practice-area/family" className="transition-colors hover:text-white hover:underline">
                  Family Law
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-area/criminal-defense"
                  className="transition-colors hover:text-white hover:underline"
                >
                  Criminal Defense
                </Link>
              </li>
              <li>
                <Link href="/practice-area/business" className="transition-colors hover:text-white hover:underline">
                  Business Law
                </Link>
              </li>
              <li>
                <Link
                  href="/practice-area/personal-injury"
                  className="transition-colors hover:text-white hover:underline"
                >
                  Personal Injury
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="transition-colors hover:text-white hover:underline">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Popular Locations</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/location/state/new-york" className="transition-colors hover:text-white hover:underline">
                  New York
                </Link>
              </li>
              <li>
                <Link href="/location/state/california" className="transition-colors hover:text-white hover:underline">
                  California
                </Link>
              </li>
              <li>
                <Link href="/location/state/texas" className="transition-colors hover:text-white hover:underline">
                  Texas
                </Link>
              </li>
              <li>
                <Link href="/location/state/florida" className="transition-colors hover:text-white hover:underline">
                  Florida
                </Link>
              </li>
              <li>
                <Link href="/locations" className="transition-colors hover:text-white hover:underline">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-slate-300">Subscribe to our newsletter for legal tips and updates.</p>
            <div className="space-y-2">
              <Input
                placeholder="Your email address"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            {/* <Link href="/terms" className="transition-colors hover:text-white hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white hover:underline">
              Privacy Policy
            </Link> */}
            {/* <Link href="/accessibility" className="transition-colors hover:text-white hover:underline">
              Accessibility
            </Link>
            <Link href="/sitemap" className="transition-colors hover:text-white hover:underline">
              Sitemap
            </Link> */}
          </div>
          <p>© {new Date().getFullYear()} Attorneys info. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
