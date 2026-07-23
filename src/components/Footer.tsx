import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-secondary to-primary text-black py-6 pixel-font text-sm leading-relaxed font-normal">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 mb-6">
          <div>
            <h4 className="heading-section text-black text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#home" className="transition-colors hover:text-dark">Home</Link></li>
              <li><Link href="/#about" className="transition-colors hover:text-dark">About Us</Link></li>
              <li><Link href="/#technology" className="transition-colors hover:text-dark">Technology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-section text-black text-lg mb-4">Connect</h4>
            <p className="mb-3">Get product updates and insights</p>
            <form
              action={process.env.NEXT_PUBLIC_FORMSPREE_ACTION || "https://formspree.io/f/your-id"}
              method="POST"
              className="flex flex-col sm:flex-row gap-2 items-stretch"
              aria-label="Subscribe for updates"
              target="_blank"
              rel="noopener noreferrer"
            >
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                inputMode="email"
                placeholder="Your email"
                className="flex-1 rounded-xl px-3 py-2 bg-white/90 border border-black/10 placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-dark/30"
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 bg-white text-dark font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
                aria-label="Subscribe"
                title="Subscribe"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-2 text-xs text-black/70">
              Or WhatsApp us via the green button.
            </div>
            <div className="mt-4">
              <p className="mb-2 text-black/70">Follow us</p>
              <a
                href="https://www.linkedin.com/company/rootstock-tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RootStock Technology on LinkedIn"
                title="Follow us on LinkedIn"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white text-dark font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 pt-4 text-center">
          <p className="mb-1 text-black/70">&copy; 2026 RootStock Technology. All Rights Reserved.</p>
          <p className="text-xs text-black/60">Built by RootStock Technology</p>
        </div>
      </div>
    </footer>
  );
}
