import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Resume", path: "/resume" },
  { label: "Impact Stories", path: "/impact-stories" },
  { label: "Leadership", path: "/leadership" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://public.readdy.ai/ai/img_res/0a57e3ec-0a4c-4479-9919-2c7efa0c2611.png"
            alt="Kelly Peterson Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                location.pathname === link.path
                  ? "text-[#1E3A5F]"
                  : scrolled || !isHome
                  ? "text-gray-600 hover:text-[#1E3A5F]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/resume"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap cursor-pointer ${
              scrolled || !isHome
                ? "border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-[#1E3A5F]"
            }`}
          >
            Download Resume
          </a>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#1E3A5F] text-white hover:bg-[#162d4a] transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer ${
            scrolled || !isHome ? "text-gray-700" : "text-white"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium py-2 cursor-pointer ${
                location.pathname === link.path
                  ? "text-[#1E3A5F]"
                  : "text-gray-600 hover:text-[#1E3A5F]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <Link
              to="/resume"
              className="px-4 py-2 rounded-full text-sm font-medium border border-[#1E3A5F] text-[#1E3A5F] text-center whitespace-nowrap cursor-pointer"
            >
              Download Resume
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#1E3A5F] text-white text-center whitespace-nowrap cursor-pointer"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
