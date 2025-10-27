"use client";

import * as React from "react";

interface PulsatingButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function PulsatingButton({ href, children, className = "", ...props }: PulsatingButtonProps) {
  return (
    <a
      href={href}
      {...props}
      className={[
        "btn inline-flex items-center justify-center",
        "rounded-full bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black",
        "shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60",
        "animate-pulse-glow",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
