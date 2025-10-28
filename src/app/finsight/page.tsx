export default function FinSightPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#7AE582]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#16BAC5]/20 blur-3xl" />
        {/* Back button */}
        <a href="/" className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 px-3 py-1.5 text-gray-800 hover:bg-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L9.56 9.5H16a.75.75 0 010 1.5H9.56l3.21 3.21a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06.02z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </a>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              FinSight
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              Emotion‑aware insights for portfolios. Context across holdings, goals and risk preferences — explained with clarity.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#use-cases" className="btn btn-primary">See Use Cases</a>
              <a href="#cta" className="btn btn-outline">Request a Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section id="use-cases" className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Guided SIPs',
                desc: 'Emotion‑aware nudges reduce panic selling and improve plan adherence.',
              },
              {
                title: 'Risk cues',
                desc: 'Reads market and portfolio signals to surface next‑best actions.',
              },
              {
                title: 'Explainable advice',
                desc: 'Every recommendation includes sources and confidence — trust built‑in.',
              },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition">
                <div className="text-[#7AE582] font-bold text-sm mb-2">Capability</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl bg-white p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Bring FinSight to your customers</h3>
              <p className="text-gray-700 mt-2">Embed as an assistant or deploy as a portal. On‑prem and VPC options available.</p>
            </div>
            <div className="flex items-center gap-3">
              <a className="btn btn-primary" href="#">Request Demo</a>
              <a className="btn btn-secondary" href="#">Talk to Sales</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


