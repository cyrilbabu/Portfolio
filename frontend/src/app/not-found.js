// app/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-950 text-white px-4">
      <div className="border-2 bg-white/20 border-white/20 rounded-lg p-8 text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="bg-white text-blue-950 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
