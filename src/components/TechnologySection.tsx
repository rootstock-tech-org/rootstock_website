"use client";
import { useState } from 'react';

export default function TechnologySection() {
  const [activeTab, setActiveTab] = useState<'finsight' | 'ocr'>('finsight');

  const useCases = [
    {
      title: "Financial",
      description: "Portfolio analysis with emotional context, risk assessment, and behavioral insights for smarter investments.",
      image: "/Tech/finance.png",
      color: "text-[#16BAC5]"
    },
    {
      title: "Corporate",
      description: "Decision support systems that understand organizational context and stakeholder emotions for better outcomes.",
      image: "/Tech/cooperate.png",
      color: "text-[#16BAC5]"
    },
    {
      title: "Educational",
      description: "Learning assessment tools that adapt to student emotional states and learning patterns for personalized education.",
      image: "/Tech/eduction.png",
      color: "text-[#16BAC5]"
    }
  ];

  return (
    <section id="technology" className="section section--divider divider-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Products</h2>
          {/* <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            The stack behind emotion-aware, context-first decisions
          </p> */}
        </div>

        {/* Use Case Examples */}
        <div className="relative mb-24">
          {/* soft background accents */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[52rem] h-40 bg-gradient-to-r from-[#16BAC5]/10 via-transparent to-[#7AE582]/10 blur-3xl rounded-full" aria-hidden="true"></div>
          <div className="text-center mb-12 relative">
            {/* <h3 className="heading-section text-3xl text-[#16BAC5] mb-4">How Our AI + EI Works in the Real World</h3> */}
            {/* <p className="lead text-gray-700 max-w-2xl mx-auto mb-8">Choose an industry to see our domain intelligence in action</p> */}
          </div>

          {/* Product Tabs */}
          <div className="flex justify-center mb-10 relative">
            <div
              role="tablist"
              aria-label="Product examples"
              className="relative bg-gray-100 rounded-full p-1 border border-gray-200 shadow-lg flex overflow-x-auto whitespace-nowrap no-scrollbar"
            >
              <button
                role="tab"
                id="tab-finsight"
                aria-controls="panel-finsight"
                onClick={() => setActiveTab('finsight')}
                className={`flex-none px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 ${
                  activeTab === 'finsight'
                    ? 'bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-selected={activeTab === 'finsight'}
              >
                FinSight
              </button>
              <button
                role="tab"
                id="tab-ocr"
                aria-controls="panel-ocr"
                onClick={() => setActiveTab('ocr')}
                className={`flex-none px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 ${
                  activeTab === 'ocr'
                    ? 'bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-selected={activeTab === 'ocr'}
              >
                OCR to Text
              </button>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="max-w-5xl mx-auto relative">
            {activeTab === 'finsight' && (
              <div id="panel-finsight" role="tabpanel" aria-labelledby="tab-finsight" className="relative group">
                {/* gradient border frame */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 via-gray-100 to-transparent blur-sm"></div>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-4 ring-2 ring-gray-200">
                          <span className="text-xl">₹</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">FinSight</h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Portfolio analysis with context, risk cues, and behavioural nudges — for smarter stock picks.
                      </p>
                      <div className="text-sm text-gray-600 mb-5">
                        Beyond FinSight, RootStock's core tech also powers solutions across industries.
                      </div>
                      <a href="#demo" className="btn btn-secondary">
                        See How It Works
                      </a>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-xs text-gray-500 mb-2">Live Example</div>
                      <div className="bg-gradient-to-r from-[#16BAC5]/20 to-[#7AE582]/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#16BAC5] rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-gray-900 font-medium">FinSight AI</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "NIFTY −1.8% today. For your HDFC Bank SIP and 12-month goal, hold. Your plan already accounts for falls like this."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'ocr' && (
              <div id="panel-ocr" role="tabpanel" aria-labelledby="tab-ocr" className="relative group">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 via-gray-100 to-transparent blur-sm"></div>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-4 ring-2 ring-gray-200">
                          <span className="text-xl">📄</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">OCR to Text</h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Extract clean, searchable text from images and scanned PDFs with high accuracy. Supports tables, receipts, and multi‑language documents.
                      </p>
                      <div className="text-sm text-gray-600 mb-5">
                        Seamless API and dashboard; export to CSV, JSON, and DOCX.
                      </div>
                      <a href="#demo" className="btn btn-secondary">
                        Try OCR Demo
                      </a>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-xs text-gray-500 mb-2">Live Example</div>
                      <div className="bg-gradient-to-r from-[#16BAC5]/20 to-[#7AE582]/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#16BAC5] rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-gray-900 font-medium">OCR Engine</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "Detected 'Invoice #45231' and 18 line items from the uploaded image. Exported as CSV in 1.2s."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LLM section removed */}
      </div>
    </section>
  );
}