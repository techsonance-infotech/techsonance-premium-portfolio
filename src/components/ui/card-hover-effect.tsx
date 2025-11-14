"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link || idx}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-gradient-to-br from-[#00C2FF]/30 to-[#0A1A2F]/30 animate-gradient"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <motion.div 
                className="mb-4 flex items-center justify-center text-[#00C2FF] drop-shadow-[0_0_10px_rgba(0,194,255,0.5)]"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {item.icon}
              </motion.div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border-2 border-[#00C2FF]/20 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F] to-[#00C2FF]/20 p-4 backdrop-blur-lg transition-all duration-300 hover:border-[#00C2FF]/60 hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] group-hover:scale-[1.02]",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 via-transparent to-[#00C2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 text-xl md:text-2xl font-bold tracking-wide text-white", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide text-neutral-300",
        className
      )}
    >
      {children}
    </p>
  );
};