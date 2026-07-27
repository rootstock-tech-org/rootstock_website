"use client";

import Link from "next/link";

interface PulsatingButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function PulsatingButton({ href, children, className = "", ...props }: PulsatingButtonProps) {
  return (
    <Link
      href={href}
      {...props}
      className={[
        "btn inline-flex items-center justify-center",
        "rounded-full",
        "shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60",
        "animate-pulse-glow",
        className || "bg-white text-[#415b3e] border border-[#415b3e]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
