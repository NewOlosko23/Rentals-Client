import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  Home,
  Building2,
  KeyRound,
  Phone,
  Plus,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ brand = "HouseConnect" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { to: "/", label: "Home", icon: Home },
    { to: "/listings", label: "Listings", icon: Building2 },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const isActive = (to) =>
    typeof window !== "undefined" && window.location?.pathname === to;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 shadow-sm"
          : "bg-white/70 backdrop-blur-md border-b border-transparent"
      }`}
      role="banner"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-white text-gray-900 px-3 py-2 rounded-md shadow"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 border border-gray-200">
              <Home className="h-5 w-5 text-gray-700" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              {brand}
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive(item.to)
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              onClick={() => (window.location.href = "/search")}
            >
              <Search className="h-4 w-4" />
              <span>Search homes</span>
            </button>

            <Link
              to="/post"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-medium shadow hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            >
              <Plus className="h-4 w-4" />
              Post Property
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Sign in</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <aside
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-label="Navigation"
            className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm bg-white shadow-xl border-l border-gray-200 transform transition-transform data-[state=open]:translate-x-0"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <Link to="/" className="text-lg font-semibold text-gray-900">
                {brand}
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-4 py-4">
              <button
                className="w-full inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/search";
                }}
              >
                <Search className="h-4 w-4" />
                Search homes
              </button>

              <nav className="mt-4 space-y-1" aria-label="Mobile Primary">
                {nav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                    >
                      <Icon className="h-5 w-5 text-gray-600" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  to="/post"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-3 text-sm font-medium shadow hover:bg-black"
                >
                  <Plus className="h-4 w-4" />
                  Post
                </Link>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  Sign in
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
