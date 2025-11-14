"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import blogsData from "@/data/blogs.json";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  category: string;
  tags: string[];
  readTime: string;
  featuredImage: string;
  status: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setLoading(true);
    try {
      const publishedBlogs = blogsData.blogs.filter(
        (blog) => blog.status.toLowerCase() === "published"
      );
      setBlogs(publishedBlogs);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter((blog) => blog.category === selectedCategory);

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
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="bg-gradient-to-r from-[#00C2FF] via-white to-[#00C2FF] bg-clip-text text-4xl font-bold text-transparent md:text-7xl"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Our Blog
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Insights, trends, and expert perspectives on technology, business, and innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#00C2FF] text-[#0A1A2F] shadow-[0_0_20px_rgba(0,194,255,0.5)]"
                    : "bg-white/[0.05] text-white border border-[#00C2FF]/20 hover:border-[#00C2FF]/50"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-[#00C2FF] animate-spin" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg">
              <CardContent className="py-20 text-center">
                <p className="text-neutral-300 text-lg">
                  No blog posts available. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="border-[#00C2FF]/20 bg-white/[0.03] text-white backdrop-blur-lg hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] group h-full flex flex-col overflow-hidden">
                    {/* Featured Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] to-transparent opacity-60" />
                      <Badge className="absolute top-4 left-4 bg-[#00C2FF] text-[#0A1A2F] border-none">
                        {blog.category}
                      </Badge>
                    </div>

                    <CardHeader className="flex-1">
                      <CardTitle className="text-xl text-white group-hover:text-[#00C2FF] transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-neutral-400 line-clamp-3 mt-2">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {blog.readTime}
                        </span>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-[#00C2FF]" />
                        <div>
                          <p className="text-white font-medium">{blog.author}</p>
                          <p className="text-neutral-400 text-xs">{blog.authorRole}</p>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Link href={`/blog/${blog.slug}`}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-[#00C2FF] to-[#0066FF] text-[#0A1A2F] hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-all duration-300 font-semibold">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
