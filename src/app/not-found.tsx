export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen grid place-items-center bg-white text-gray-900 p-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
          <a
            href="/"
            className="inline-block px-5 py-2 rounded-full bg-[#16BAC5] text-white hover:bg-[#16BAC5]/90 transition"
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
