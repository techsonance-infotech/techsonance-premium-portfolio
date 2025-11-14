"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getIcon } from "@/lib/icon-map";
import aboutData from "@/data/about.json";

export default function AboutPage() {
  // Timeline images mapping - unique images for each year
  const timelineImages = {
    "2018": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/professional-corporate-office-space-with-e7332080-20251114121540.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/team-of-software-engineers-celebrating-c-cfb213c2-20251114121542.jpg"
    ],
    "2019": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/enterprise-client-meeting-in-modern-conf-f9b7755e-20251114121541.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/cloud-computing-infrastructure-visualiza-5a6e6b78-20251114121541.jpg"
    ],
    "2020": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/growing-diverse-team-of-20-software-deve-562d7088-20251114121542.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/team-collaboration-meeting-with-multiple-6ac6f4c3-20251114121542.jpg"
    ],
    "2021": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/beautiful-cityscape-of-surat-gujarat-ind-dc743502-20251114121541.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/world-map-with-glowing-network-connectio-2d50cfaa-20251114121540.jpg"
    ],
    "2022": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/ai-and-machine-learning-research-lab-wit-d3bbc787-20251114121542.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/artificial-intelligence-concept-visualiz-86f4e0e7-20251114121537.jpg"
    ],
    "2023": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/portfolio-of-50-successful-tech-projects-fdf66f54-20251114121541.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/happy-satisfied-clients-and-tech-team-ce-cbe19d2e-20251114121541.jpg"
    ],
    "2024": [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/technology-innovation-awards-ceremony-te-493b3e46-20251114121543.jpg",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/6fe9c1ba-28ba-4bb7-a142-5f478ae47dfd/generated_images/multiple-award-trophies-and-certificates-c53f6f0f-20251114121541.jpg"
    ]
  };

  const timelineData = aboutData.timeline.map((item) => ({
    title: item.year,
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
          {item.description}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={timelineImages[item.year as keyof typeof timelineImages][0]}
            alt={`${item.title} - Image 1`}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
          <img
            src={timelineImages[item.year as keyof typeof timelineImages][1]}
            alt={`${item.title} - Image 2`}
            className="h-20 w-full rounded-lg object-cover shadow-lg md:h-44 lg:h-60"
          />
        </div>
      </div>
    ),
  }));

  const values = aboutData.values.map((value) => ({
    ...value,
    icon: getIcon(value.icon, "h-8 w-8"),
  }));

  const team = aboutData.team.departments.map((dept) => ({
    ...dept,
    icon: getIcon(dept.icon, "h-8 w-8"),
  }));

  const leadership = aboutData.team.leadership.members.map((member) => ({
    ...member,
    icon: getIcon(member.icon, "h-8 w-8"),
  }));

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
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
              {aboutData.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl">
              {aboutData.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-8 backdrop-blur-lg hover:border-[#00C2FF]/60 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                {getIcon("Target", "mb-4 h-12 w-12 text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.5)] relative z-10")}
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold text-white relative z-10">{aboutData.mission.title}</h2>
              <p className="text-lg text-neutral-300 relative z-10">
                {aboutData.mission.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-8 backdrop-blur-lg hover:border-[#00C2FF]/60 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                {getIcon("Eye", "mb-4 h-12 w-12 text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.5)] relative z-10")}
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold text-white relative z-10">{aboutData.vision.title}</h2>
              <p className="text-lg text-neutral-300 relative z-10">
                {aboutData.vision.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              The principles that guide everything we do
            </p>
          </motion.div>
          <HoverEffect items={values} />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Milestones that shaped our success
            </p>
          </motion.div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              Talented professionals committed to your success
            </p>
          </motion.div>
          <HoverEffect items={team} />
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {aboutData.team.leadership.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {aboutData.team.leadership.subtitle}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-8 backdrop-blur-lg hover:border-[#00C2FF]/60 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#00C2FF] to-[#0A1A2F]"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#00C2FF] font-medium">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {aboutData.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="text-center group"
              >
                <div className="text-4xl font-bold text-[#00C2FF] md:text-6xl drop-shadow-[0_0_20px_rgba(0,194,255,0.5)] group-hover:drop-shadow-[0_0_30px_rgba(0,194,255,0.8)] transition-all">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-neutral-300 md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick WhatsApp Contact Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="rounded-3xl border-2 border-[#25D366]/30 bg-white/[0.03] p-8 backdrop-blur-lg hover:border-[#25D366]/60 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4 text-center md:text-left">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <MessageCircle className="h-12 w-12 text-[#25D366] drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick WhatsApp Contact</h3>
                  <p className="text-neutral-300">
                    Need immediate assistance? Chat with us directly on WhatsApp for instant responses.
                  </p>
                </div>
              </div>
              
              <motion.a
                href="https://wa.me/919173101711"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}