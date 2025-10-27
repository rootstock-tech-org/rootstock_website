export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Let's Connect</h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to revolutionize human-robot collaboration? Get in touch with us today.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="heading-section text-2xl text-[#7AE582] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-[#7AE582]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  RootStockcmn@gmail.com
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-[#7AE582]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Rende, 78 IT
                </p>
                <div className="pt-4">
                  <h4 className="heading-section text-base text-[#16BAC5] mb-2">Hours of Operation</h4>
                  <p className="text-gray-600">Mon - Fri: 9:00am - 10:00pm</p>
                  <p className="text-gray-600">Saturday: 9:00am - 6:00pm</p>
                  <p className="text-gray-600">Sunday: 9:00am - 12:00pm</p>
                </div>
              </div>
            </div>
            {/* Enhanced Form */}
            <form className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7AE582] focus:border-[#7AE582] transition-all duration-300 group-hover:border-[#7AE582]/50"
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7AE582] focus:border-[#7AE582] transition-all duration-300 group-hover:border-[#7AE582]/50"
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Your Message" 
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7AE582] focus:border-[#7AE582] transition-all duration-300 group-hover:border-[#7AE582]/50 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary group w-full text-lg">
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
