"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import projectsData from "@/data/projects.json";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all" 
    ? projectsData.projects 
    : projectsData.projects.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
            <h1 className="bg-gradient-to-r from-[#00C2FF] via-white to-[#00C2FF] bg-clip-text text-4xl font-bold text-transparent md:text-7xl animate-gradient">
              {projectsData.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl">
              {projectsData.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {projectsData.filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedCategory(filter.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all border-2 ${
                  selectedCategory === filter.id
                    ? "bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] text-white border-[#00C2FF] shadow-[0_0_20px_rgba(0,194,255,0.5)]"
                    : "border-[#00C2FF]/30 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.05] hover:border-[#00C2FF]/50 hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                      className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-[#00C2FF]/20 bg-white/[0.03] backdrop-blur-lg transition-all hover:border-[#00C2FF]/60 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(0,194,255,0.3)] relative"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                      
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/60 to-transparent" />
                      </div>
                      <div className="p-6 relative z-20">
                        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-[#00C2FF] transition-colors">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm text-neutral-300">
                          {project.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30 hover:bg-[#00C2FF]/30 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto border-2 border-[#00C2FF]/30 bg-[#0A1A2F]/95 text-white sm:max-w-[700px] backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">{project.title}</DialogTitle>
                      <DialogDescription className="text-neutral-300">
                        {project.client} • {project.duration}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-[#00C2FF]/20">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-[#00C2FF]">Overview</h4>
                        <p className="text-neutral-300">{project.fullDescription}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-[#00C2FF]">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-[#00C2FF]/20 text-[#00C2FF] border border-[#00C2FF]/30"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-[#00C2FF]">Results</h4>
                        <ul className="space-y-1">
                          {project.results.map((result, i) => (
                            <li key={i} className="text-neutral-300">• {result}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-4">
                        <motion.button 
                          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(0,194,255,0.5)]"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Live
                        </motion.button>
                        <motion.button 
                          className="flex items-center gap-2 rounded-lg border-2 border-[#00C2FF]/30 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/[0.1] hover:border-[#00C2FF]/50 hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="h-4 w-4" />
                          Source Code
                        </motion.button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-12 backdrop-blur-lg hover:border-[#00C2FF]/50 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)] transition-all duration-500 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 relative z-10">
              {projectsData.stats.items.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  className="text-center group/stat"
                >
                  <div className="text-4xl font-bold text-[#00C2FF] md:text-6xl drop-shadow-[0_0_20px_rgba(0,194,255,0.5)] group-hover/stat:drop-shadow-[0_0_30px_rgba(0,194,255,0.8)] transition-all">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-neutral-300 md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}