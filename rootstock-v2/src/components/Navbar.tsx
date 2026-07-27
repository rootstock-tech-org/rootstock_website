"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "./ConsultationModal";
import { products } from "../data/products";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-white/30 backdrop-blur-md border-b border-white/20"
      >
        <div className="flex items-center gap-3">
          <Image src="/RootStock.jpeg" alt="RootStock Logo" width={40} height={40} className="rounded-md mix-blend-multiply" />
          <Link href="/" className="text-2xl font-display font-semibold tracking-tight text-[var(--foreground)]">
            RootStock
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="#philosophy" className="hover:text-[var(--color-brand-primary)] transition-colors">Philosophy</Link>
          
          {/* Products Dropdown */}
          <div 
            className="relative py-4"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[var(--color-brand-primary)] transition-colors">
              Products
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/40 overflow-hidden py-2"
                >
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="block px-6 py-3 text-sm text-[var(--foreground)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/5 transition-colors"
                    >
                      {product.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="#domains" className="hover:text-[var(--color-brand-primary)] transition-colors">Domains</Link>
          <Link href="#process" className="hover:text-[var(--color-brand-primary)] transition-colors">Process</Link>
          <Link href="/careers" className="hover:text-[var(--color-brand-primary)] transition-colors">Careers</Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[var(--color-brand-primary)] text-white px-5 py-2.5 rounded-full hover:bg-[var(--color-brand-secondary)] transition-colors shadow-sm"
          >
            Let's Connect
          </button>
        </nav>

        <button className="md:hidden text-[var(--foreground)]">
          <Menu className="w-6 h-6" />
        </button>
      </motion.header>
      
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
