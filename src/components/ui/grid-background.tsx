"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const GridBackground = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-background",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      {children}
    </div>
  );
};
