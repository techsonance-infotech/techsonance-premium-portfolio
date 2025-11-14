"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIcon } from "@/lib/icon-map";
import servicesData from "@/data/services.json";

export default function ServicesPage() {
  // Map service categories with icons and headers
  const services = {
    web: servicesData.categories.web.items.map((item, i) => ({
      ...item,
      header: (
        <div className={`flex h-full min-h-[6rem] w-full items-center justify-center bg-gradient-to-br ${
          i % 4 === 0 ? 'from-[#00C2FF] to-[#0A1A2F]' :
          i % 4 === 1 ? 'from-[#0A1A2F] to-[#00C2FF]' :
          i % 4 === 2 ? 'from-[#00C2FF] via-[#0A1A2F] to-[#00C2FF]' :
          'from-[#0A1A2F] via-[#00C2FF] to-[#0A1A2F]'
        } animate-gradient`}>
          {getIcon(item.icon, "h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]")}
        </div>
      ),
      icon: getIcon(item.icon, "h-4 w-4 text-[#00C2FF]"),
    })),
    cloud: servicesData.categories.cloud.items.map((item, i) => ({
      ...item,
      header: (
        <div className={`flex h-full min-h-[6rem] w-full items-center justify-center bg-gradient-to-br ${
          i % 4 === 0 ? 'from-[#00C2FF] to-[#0A1A2F]' :
          i % 4 === 1 ? 'from-[#0A1A2F] to-[#00C2FF]' :
          i % 4 === 2 ? 'from-[#00C2FF] via-[#0A1A2F] to-[#00C2FF]' :
          'from-[#0A1A2F] via-[#00C2FF] to-[#0A1A2F]'
        } animate-gradient`}>
          {getIcon(item.icon, "h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]")}
        </div>
      ),
      icon: getIcon(item.icon, "h-4 w-4 text-[#00C2FF]"),
    })),
    ai: servicesData.categories.ai.items.map((item, i) => ({
      ...item,
      header: (
        <div className={`flex h-full min-h-[6rem] w-full items-center justify-center bg-gradient-to-br ${
          i % 4 === 0 ? 'from-[#00C2FF] to-[#0A1A2F]' :
          i % 4 === 1 ? 'from-[#0A1A2F] to-[#00C2FF]' :
          i % 4 === 2 ? 'from-[#00C2FF] via-[#0A1A2F] to-[#00C2FF]' :
          'from-[#0A1A2F] via-[#00C2FF] to-[#0A1A2F]'
        } animate-gradient`}>
          {getIcon(item.icon, "h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]")}
        </div>
      ),
      icon: getIcon(item.icon, "h-4 w-4 text-[#00C2FF]"),
    })),
    security: servicesData.categories.security.items.map((item, i) => ({
      ...item,
      header: (
        <div className={`flex h-full min-h-[6rem] w-full items-center justify-center bg-gradient-to-br ${
          i % 4 === 0 ? 'from-[#00C2FF] to-[#0A1A2F]' :
          i % 4 === 1 ? 'from-[#0A1A2F] to-[#00C2FF]' :
          i % 4 === 2 ? 'from-[#00C2FF] via-[#0A1A2F] to-[#00C2FF]' :
          'from-[#0A1A2F] via-[#00C2FF] to-[#0A1A2F]'
        } animate-gradient`}>
          {getIcon(item.icon, "h-12 w-12 text-white drop-shadow-[0_0_10px_rgba(0,194,255,0.7)]")}
        </div>
      ),
      icon: getIcon(item.icon, "h-4 w-4 text-[#00C2FF]"),
    })),
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A1A2F] antialiased bg-grid-white/[0.02] relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-1/3 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-96 h-96 bg-[#00C2FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
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
              {servicesData.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 md:text-xl">
              {servicesData.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="web" className="w-full">
            <TabsList className="mb-12 grid w-full grid-cols-2 gap-4 bg-transparent md:grid-cols-4">
              <TabsTrigger 
                value="web" 
                className="rounded-lg border-2 border-[#00C2FF]/20 bg-white/[0.03] px-6 py-3 text-white backdrop-blur-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0A1A2F] data-[state=active]:border-[#00C2FF] hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
              >
                {getIcon(servicesData.categories.web.icon, "mr-2 h-4 w-4")}
                {servicesData.categories.web.title}
              </TabsTrigger>
              <TabsTrigger 
                value="cloud"
                className="rounded-lg border-2 border-[#00C2FF]/20 bg-white/[0.03] px-6 py-3 text-white backdrop-blur-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0A1A2F] data-[state=active]:border-[#00C2FF] hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
              >
                {getIcon(servicesData.categories.cloud.icon, "mr-2 h-4 w-4")}
                {servicesData.categories.cloud.title}
              </TabsTrigger>
              <TabsTrigger 
                value="ai"
                className="rounded-lg border-2 border-[#00C2FF]/20 bg-white/[0.03] px-6 py-3 text-white backdrop-blur-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0A1A2F] data-[state=active]:border-[#00C2FF] hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
              >
                {getIcon(servicesData.categories.ai.icon, "mr-2 h-4 w-4")}
                {servicesData.categories.ai.title}
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="rounded-lg border-2 border-[#00C2FF]/20 bg-white/[0.03] px-6 py-3 text-white backdrop-blur-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00C2FF] data-[state=active]:to-[#0A1A2F] data-[state=active]:border-[#00C2FF] hover:border-[#00C2FF]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]"
              >
                {getIcon(servicesData.categories.security.icon, "mr-2 h-4 w-4")}
                {servicesData.categories.security.title}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="web">
              <BentoGrid className="mx-auto max-w-6xl">
                {services.web.map((service, i) => (
                  <BentoGridItem
                    key={i}
                    title={service.title}
                    description={service.description}
                    header={service.header}
                    icon={service.icon}
                  />
                ))}
              </BentoGrid>
            </TabsContent>

            <TabsContent value="cloud">
              <BentoGrid className="mx-auto max-w-6xl">
                {services.cloud.map((service, i) => (
                  <BentoGridItem
                    key={i}
                    title={service.title}
                    description={service.description}
                    header={service.header}
                    icon={service.icon}
                  />
                ))}
              </BentoGrid>
            </TabsContent>

            <TabsContent value="ai">
              <BentoGrid className="mx-auto max-w-6xl">
                {services.ai.map((service, i) => (
                  <BentoGridItem
                    key={i}
                    title={service.title}
                    description={service.description}
                    header={service.header}
                    icon={service.icon}
                  />
                ))}
              </BentoGrid>
            </TabsContent>

            <TabsContent value="security">
              <BentoGrid className="mx-auto max-w-6xl">
                {services.security.map((service, i) => (
                  <BentoGridItem
                    key={i}
                    title={service.title}
                    description={service.description}
                    header={service.header}
                    icon={service.icon}
                  />
                ))}
              </BentoGrid>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl bg-gradient-to-r from-[#00C2FF] to-white bg-clip-text text-transparent">
              {servicesData.process.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-300">
              {servicesData.process.subtitle}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {servicesData.process.steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                className="rounded-3xl border-2 border-[#00C2FF]/30 bg-white/[0.03] p-6 backdrop-blur-lg hover:border-[#00C2FF]/60 hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-4 text-4xl font-bold text-[#00C2FF] drop-shadow-[0_0_15px_rgba(0,194,255,0.5)] relative z-10">{item.step}</div>
                <h3 className="mb-2 text-xl font-bold text-white relative z-10">{item.title}</h3>
                <p className="text-neutral-300 relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}