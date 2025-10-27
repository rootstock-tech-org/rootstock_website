export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black py-6">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-6">
          <div>
            <h4 className="heading-section text-black text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="transition-colors hover:text-[#0B3762]">Home</a></li>
              <li><a href="#about" className="transition-colors hover:text-[#0B3762]">About Us</a></li>
              <li><a href="#technology" className="transition-colors hover:text-[#0B3762]">Technology</a></li>
              <li><a href="#FinSight" className="transition-colors hover:text-[#0B3762]">FinSight</a></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-section text-black text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#ethics" className="transition-colors hover:text-[#0B3762]">Ethics & Trust</a></li>
              <li><a href="#insights" className="transition-colors hover:text-[#0B3762]">Insights</a></li>
              <li><a href="#contact" className="transition-colors hover:text-[#0B3762]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-section text-black text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="transition-colors hover:text-[#0B3762]">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-[#0B3762]">Terms of Use</a></li>
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
                className="flex-1 rounded-xl px-3 py-2 bg-white/90 border border-black/10 placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-[#0B3762]/30"
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 bg-[#0B3762] text-white font-medium hover:bg-[#0a2f53] focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Subscribe"
                title="Subscribe"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-2 text-xs text-black/70">
              Or WhatsApp us via the green button.
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 pt-4 text-center">
          <p className="mb-1 text-black/70">&copy; 2025 RootStock Technology. All Rights Reserved.</p>
          <p className="text-xs text-black/60">Built by RootStock Technology</p>
        </div>
      </div>
    </footer>
  );
}
