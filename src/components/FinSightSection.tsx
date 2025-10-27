"use client";

import { PulsatingButton } from "./magicui/pulsating-button";

export default function FinSightSection() {
  const capabilities = [
    {
      icon: "📄",
      text: "Upload PDFs (broker notes, ARs, news) → instant, plain-language summary.",
      color: "from-[#0B3762] to-[#16BAC5]"
    },
    {
      icon: "💬",
      text: "Ask anything → answers tied to your holdings and goals.",
      color: "from-[#16BAC5] to-[#5FBFF9]"
    },
    {
      icon: "⚡",
      text: "Real-time nudges → stop panic-sells; avoid FOMO buys.",
      color: "from-[#5FBFF9] to-[#7AE582]"
    },
    {
      icon: "🧠",
      text: "Learns your risk style over time (without selling your data).",
      color: "from-[#7AE582] to-[#16BAC5]"
    }
  ];

  return (
    <section id="FinSight" className="section section--divider divider-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-[#0B3762] mb-4">FinSight: The Clarity Companion</h2>
          <p className="lead text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Not another data app. FinSight is your investing translator — from broker notes and news to 'kya karna hai' in plain English/Hinglish.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="heading-section text-2xl text-[#7AE582] mb-6">Key Capabilities</h3>
            <div className="space-y-6">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {capability.icon}
                  </div>
                  <p className="lead text-gray-700 text-lg pt-2">{capability.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-[#16BAC5] rounded-full mr-3 animate-pulse"></div>
              <h4 className="text-lg font-bold text-[#16BAC5]">Live Example</h4>
            </div>
            <p className="lead text-gray-700 italic text-lg">
              "NIFTY −1.8% today. For your HDFC Bank SIP and 12-month goal, hold. Your plan already accounts for falls like this. Avoid averaging down today; review after RBI policy."
            </p>
          </div>
        </div>

        {/* Enhanced Access Links */}
        <div className="text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PulsatingButton href="https://e9cwq4w7punvx7-1004.proxy.runpod.net/" target="_blank" rel="noopener noreferrer" className="text-lg px-6 py-3 rounded-full">
              <span className="relative z-10">Join Beta (Free)</span>
            </PulsatingButton>
            <PulsatingButton href="https://e9cwq4w7punvx7-1004.proxy.runpod.net/" target="_blank" rel="noopener noreferrer" className="text-lg px-6 py-3 rounded-full">
              <span className="relative z-10">Request Demo </span>
            </PulsatingButton>
            <PulsatingButton
              href="https://wa.me/918368373125?text=I%20want%20to%20get%20updates%20on%20WhatsApp"
              className="text-lg px-6 py-3 rounded-full"
              aria-label="Get updates on WhatsApp"
              target="_blank" rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/80">
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </span>
                Get Updates on WhatsApp
              </span>
            </PulsatingButton>
          </div>
        </div>
        {/* SEBI disclaimer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-black">
          FinSight is an educational assistant, not a SEBI-registered investment advisor. We never execute trades. Every suggestion should be evaluated against your risk profile.
          </p>
        </div>
      </div>
    </section>
  );
}
