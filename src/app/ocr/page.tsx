export default function OCRPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#16BAC5]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#7AE582]/20 blur-3xl" />
        {/* Back button */}
        <a href="/" className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 px-3 py-1.5 text-gray-800 hover:bg-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L9.56 9.5H16a.75.75 0 010 1.5H9.56l3.21 3.21a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06.02z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </a>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              OCR to Text
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              Parse documents, invoices and scans accurately. Built for noisy, low‑quality inputs — exports clean, structured text for downstream workflows.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="https://z23pvle7xmnqur-1008.proxy.runpod.net" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Get Started</a>
              <a href="#features" className="btn btn-outline">See Features</a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section id="features" className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'High precision parsing',
                desc: 'Iterative agent ensures complete coverage; great for legal, finance and research PDFs.',
              },
              {
                title: 'Best-in-class table extraction',
                desc: 'Accurately extract complex tables — export CSV or JSON for analytics pipelines.',
              },
              {
                title: 'Accessible output',
                desc: 'Clean text plus structured XML/JSON suitable for RAG and automation.',
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">
                <div className="text-[#16BAC5] font-bold text-sm mb-2">Feature</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo / CTA */}
      <section id="get-started" className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl bg-white p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Turn images and PDFs into clean text</h3>
              <p className="text-gray-700 mt-2">Try the API or request a guided demo. Free credits available.</p>
            </div>
            <div className="flex items-center gap-3">
              <a className="btn btn-primary" href="#">Request Demo</a>
              <a className="btn btn-secondary" href="#">View Docs</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


