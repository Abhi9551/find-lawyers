import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-data"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Legal Insights Blog</h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Stay informed with the latest legal news, tips, and insights from our expert attorneys.
            </p>
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-sm text-slate-500">{blogPosts[0].date}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{blogPosts[0].title}</h3>
                  <p className="mb-4 text-slate-600">{blogPosts[0].excerpt}</p>
                  <Link href={`/blog/${blogPosts[0].slug}`}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={blogPosts[1].image || "/placeholder.svg"}
                    alt={blogPosts[1].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {blogPosts[1].category}
                    </span>
                    <span className="text-sm text-slate-500">{blogPosts[1].date}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{blogPosts[1].title}</h3>
                  <p className="mb-4 text-slate-600">{blogPosts[1].excerpt}</p>
                  <Link href={`/blog/${blogPosts[1].slug}`}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">All Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(2).map((post, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {post.category}
                      </span>
                      <span className="text-sm text-slate-500">{post.date}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                    <p className="mb-4 text-slate-600 line-clamp-3">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="link" className="p-0 text-blue-600">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="mt-16 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
              <p className="mb-6">
                Stay updated with the latest legal news, tips, and insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-lg border border-blue-400 bg-blue-700/50 px-4 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-blue-700 hover:bg-blue-50">Subscribe</Button>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  )
}
