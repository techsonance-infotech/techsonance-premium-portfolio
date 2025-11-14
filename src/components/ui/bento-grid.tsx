"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border-2 border-[#00C2FF]/20 bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F] to-[#00C2FF]/20 p-4 shadow-input backdrop-blur-lg transition-all duration-300 hover:border-[#00C2FF]/60 hover:shadow-[0_0_30px_rgba(0,194,255,0.4)] relative overflow-hidden",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 via-transparent to-[#00C2FF]/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2 relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {icon}
        </motion.div>
        <div className="mb-2 mt-2 font-sans font-bold text-white">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-300">
          {description}
        </div>
      </div>
    </motion.div>
  );
};