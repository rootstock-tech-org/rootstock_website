"use client";

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("Hi! I'd like to learn more about RootStock.");
  // Using the direct API with the correct phone number format (with country code)
  const href = `https://api.whatsapp.com/send?phone=918368373125&text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="group inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 hover:scale-105 animate-pulse-glow"
        title="Chat on WhatsApp"
      >
        {/* WhatsApp SVG icon (no external deps) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 drop-shadow-sm"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.46.03.18 5.29.21 11.89c0 2.09.55 4.12 1.59 5.92L0 24l6.33-1.74a11.84 11.84 0 0 0 5.73 1.49h.05c6.6-.03 11.88-5.29 11.91-11.89a11.9 11.9 0 0 0-3.5-8.38ZM12.1 21.35h-.04c-1.9 0-3.76-.51-5.38-1.47l-.39-.23-3.76 1.03 1.01-3.67-.25-.38a9.57 9.57 0 0 1-1.5-5.2C1.77 6.5 6.46 1.83 12.06 1.8c2.55 0 4.95.99 6.76 2.79a9.52 9.52 0 0 1 2.8 6.78c-.03 5.6-4.72 10.27-9.52 10.27Zm5.51-7.33c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.95-.95 1.15-.17.2-.35.23-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.77-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.46-.52.16-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.53.08-.8.38-.27.3-1.04 1.02-1.04 2.48 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.08-.12-.27-.2-.57-.36Z" />
        </svg>
      </a>
    </div>
  );
}
