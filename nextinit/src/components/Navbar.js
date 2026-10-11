"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav className={`nav ${navScrolled ? "nav--scrolled" : ""}`} id="main-nav">
      <div className="nav__inner">
        <Link href="/" className="nav__brand" id="nav-brand">
          <span className="nav__brand-icon">✦</span>
          Cosmart
        </Link>

        {/* Desktop & Mobile Links */}
        <ul className={`nav__links ${mobileMenuOpen ? "mobile-open" : ""}`} id="nav-links">
          <li>
            <Link href="/" className="nav__link" onClick={closeMobile}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/#products" className="nav__link" onClick={closeMobile}>
              Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav__link" onClick={closeMobile}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav__link" onClick={closeMobile}>
              Contact
            </Link>
          </li>
        </ul>

        <Link href="/#products" className="nav__cta" id="nav-cta">
          Shop Now
        </Link>

        {/* Hamburger */}
        <button
          className={`nav__hamburger ${mobileMenuOpen ? "active" : ""}`}
          id="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
