import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FAFAF8] px-6 text-center font-['Inter']">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/80 mb-4">404</p>
      <h1 className="font-['Crimson_Pro'] text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">Page not found</h1>
      <p className="max-w-md text-sm text-gray-500 leading-relaxed mb-2">
        Nothing lives at <span className="font-mono text-gray-600 break-all">{location.pathname}</span>.
      </p>
      <p className="max-w-md text-sm text-gray-500 leading-relaxed mb-8">
        If you followed a link from somewhere else, it may be out of date.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1E3A5F] px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#162d4a] cursor-pointer"
      >
        Back to home
      </Link>
    </div>
  );
}
