"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { GridBackground } from "@/components/ui/grid-background";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icon-map";
import homeData from "@/data/home.json";
import Image from "next/image";

export default function Home() {
  // Map services data with icons
  const services = homeData.services.items.map((service) => ({
    ...service,
    icon: getIcon(service.icon, "h-8 w-8"),
  }));

  // Map features data with icons and headers
  const features = homeData.features.items.map((feature) => ({
    ...feature,
    header: (
      <div className="flex h-full min-h-[6rem] w-full items-center justify-center bg-gradient-to-br from-[#00C2FF] to-[#0A1A2F] animate-gradient">
        {getIcon(feature.icon, "h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]")}
      </div>
    ),
  }));

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#00C2FF" />
        <GridBackground className="absolute inset-0">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0A1A2F] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </GridBackground>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1 
            className="bg-gradient-to-r from-[#00C2FF] via-white to-[#00C2FF] bg-clip-text text-4xl font-bold text-transparent md:text-7xl animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {homeData.hero.title}
          </motion.h1>
          <TextGenerateEffect 
            words={homeData.hero.subtitle}
            className="mt-4 text-xl md:text-2xl"
          />
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-base text-neutral-300 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {homeData.hero.description}
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href={homeData.hero.primaryCTA.link}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] text-white font-semibold hover:shadow-[0_0_30px_rgba(0,194,255,0.5)] transition-shadow"
                >
                  {homeData.hero.primaryCTA.text}
                </MovingBorderButton>
              </motion.div>
            </Link>
            <Link href={homeData.hero.secondaryCTA.link}>
              <motion.button 
                className="relative inline-flex h-16 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-[#00C2FF]/50 bg-[#0A1A2F] px-6 font-medium text-white backdrop-blur-lg transition-all hover:border-[#00C2FF] hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {homeData.hero.secondaryCTA.text}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {homeData.services.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {homeData.services.subtitle}
            </p>
          </motion.div>
          <HoverEffect items={services} />
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {homeData.clientLogos.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {homeData.clientLogos.subtitle}
            </p>
          </motion.div>
          
          <div className="relative overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A1A2F] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A1A2F] to-transparent z-10" />
            
            <motion.div 
              className="flex gap-12 items-center"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...homeData.clientLogos.logos, ...homeData.clientLogos.logos].map((logo, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-48 h-24 relative grayscale hover:grayscale-0 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-full h-full rounded-lg border border-[#00C2FF]/20 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center p-4 hover:border-[#00C2FF]/60 transition-all">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={200}
                      height={100}
                      className="object-contain w-full h-full opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {homeData.features.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {homeData.features.subtitle}
            </p>
          </motion.div>
          <BentoGrid className="mx-auto max-w-6xl">
            {features.map((feature, i) => (
              <BentoGridItem
                key={i}
                title={feature.title}
                description={feature.description}
                header={feature.header}
                icon={getIcon(feature.icon, "h-4 w-4 text-[#00C2FF]")}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {homeData.testimonials.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {homeData.testimonials.subtitle}
            </p>
          </motion.div>
          <AnimatedTestimonials testimonials={homeData.testimonials.items} autoplay={true} />
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

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-12 text-center backdrop-blur-lg hover:border-[#00C2FF]/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,194,255,0.3)] relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 via-transparent to-[#0A1A2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent relative z-10">
              {homeData.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300 relative z-10">
              {homeData.cta.description}
            </p>
            <div className="mt-8 relative z-10">
              <Link href={homeData.cta.buttonLink}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <MovingBorderButton
                    borderRadius="1.75rem"
                    className="bg-gradient-to-r from-[#00C2FF] to-[#0A1A2F] text-white font-semibold hover:shadow-[0_0_30px_rgba(0,194,255,0.6)] transition-shadow"
                  >
                    {homeData.cta.buttonText}
                  </MovingBorderButton>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}