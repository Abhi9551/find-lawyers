"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { blogPosts } from "@/data/blog-data"
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the blog post by slug
    const foundPost = blogPosts.find((p) => p.slug === params.slug)

    if (foundPost) {
      setPost(foundPost)

      // Find related posts in the same category
      const related = blogPosts
        .filter((p) => p.category === foundPost.category && p.slug !== foundPost.slug)
        .slice(0, 3)

      setRelatedPosts(related)
    }

    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Article Not Found</h1>
            <p className="mt-2">The article you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" onClick={() => (window.location.href = "/blog")}>
              Return to Blog
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/blog" className="flex items-center text-blue-600 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <span className="flex items-center text-sm text-slate-600">
                <Calendar className="mr-1 h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center text-sm text-slate-600">
                <User className="mr-1 h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center text-sm text-slate-600">
                <Tag className="mr-1 h-4 w-4" /> {post.category}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{post.title}</h1>
          </div>

          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <div className="relative h-[400px] w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>

          {/* Article Content */}
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 border-t border-b border-slate-200 py-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Share this article:</span>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Twitter className="h-5 w-5 text-blue-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5 text-slate-700" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 rounded-lg bg-slate-100 p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=100&width=100" alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{post.author}</h3>
                  <p className="text-slate-600">
                    Legal expert with over 10 years of experience in {post.category.toLowerCase()} law. Passionate about
                    helping clients understand their legal rights and options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                          {relatedPost.category}
                        </span>
                        <span className="text-sm text-slate-500">{relatedPost.date}</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{relatedPost.title}</h3>
                      <p className="mb-4 text-slate-600 line-clamp-3">{relatedPost.excerpt}</p>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="link" className="p-0 text-blue-600">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
