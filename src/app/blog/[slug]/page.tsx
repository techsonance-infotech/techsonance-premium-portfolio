"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import blogsData from "@/data/blogs.json";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  category: string;
  tags: string[];
  readTime: string;
  featuredImage: string;
  status: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const foundBlog = blogsData.blogs.find(
        (b) => b.slug === slug && b.status.toLowerCase() === "published"
      );
      setBlog(foundBlog || null);
    } catch (error) {
      console.error("Failed to load blog:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-[#0A1A2F] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen w-full bg-[#0A1A2F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <Button className="bg-[#00C2FF] text-[#0A1A2F]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back Button */}
      <section className="relative pt-32 pb-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-[#00C2FF]/20 bg-transparent text-white hover:bg-white/[0.05] hover:border-[#00C2FF]/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative pb-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-3xl overflow-hidden border-2 border-[#00C2FF]/20"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-lg border border-[#00C2FF]/20 rounded-3xl p-8 md:p-12"
          >
            {/* Category Badge */}
            <Badge className="bg-[#00C2FF] text-[#0A1A2F] border-none mb-6">
              {blog.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400 mb-8 pb-8 border-b border-[#00C2FF]/20">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#00C2FF]" />
                <div>
                  <p className="text-white font-medium">{blog.author}</p>
                  <p className="text-neutral-400 text-xs">{blog.authorRole}</p>
                </div>
              </div>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00C2FF]" />
                {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00C2FF]" />
                {blog.readTime}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 ml-auto hover:text-[#00C2FF] transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-neutral-300 mb-6 leading-relaxed whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#00C2FF]/20">
              <h3 className="text-white font-semibold mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#00C2FF]/30 bg-white/[0.03] text-neutral-300 hover:bg-[#00C2FF]/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
