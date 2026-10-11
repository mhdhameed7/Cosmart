"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fetchProducts } from "@/lib/contentful";

// Static fallback products if Contentful is not connected
const FALLBACK_PRODUCTS = [
  {
    id: "lipstick",
    name: "Velvet Matte Lipstick",
    price: "$42.00",
    tag: "Best Seller",
    image: "/assets/images/lipstick.png",
  },
  {
    id: "perfume",
    name: "Éclat Noir Eau de Parfum",
    price: "$128.00",
    tag: "New Arrival",
    image: "/assets/images/perfume.png",
  },
  {
    id: "face-cream",
    name: "Luxe Radiance Face Cream",
    price: "$89.00",
    tag: "Premium",
    image: "/assets/images/face-cream.png",
  },
  {
    id: "gift-box",
    name: "The Cosmart Gift Set",
    price: "$220.00",
    tag: "Limited Edition",
    image: "/assets/images/gift-box.png",
  },
  {
    id: "eyeshadow",
    name: "Rosé Shimmer Palette",
    price: "$65.00",
    tag: "Trending",
    image: "/assets/images/eyeshadow.png",
  },
  {
    id: "rose",
    name: "Bulgarian Rose Serum",
    price: "$155.00",
    tag: "Exclusive",
    image: "/assets/images/rose.png",
  },
];

export default function Home() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const particlesContainerRef = useRef(null);
  const heroContentRef = useRef(null);
  const scrollHintRef = useRef(null);
  const productsTitleRef = useRef(null);
  const productsDescRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutDescRef = useRef(null);
  const aboutVisualRef = useRef(null);
  const heroVideoBgRef = useRef(null);

  // Fetch products from Contentful on mount
  useEffect(() => {
    async function loadProducts() {
      const cmsProducts = await fetchProducts();
      if (cmsProducts && cmsProducts.length > 0) {
        setProducts(cmsProducts);
      }
    }
    loadProducts();
  }, []);

  // Scroll event listener for Navbar scrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate CSS particles on hero background
  useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = "";

    const PARTICLE_COUNT = 45;
    const types = ["gold", "pink", "white"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement("div");
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 4 + 1.5; // 1.5px — 5.5px

      particle.classList.add("particle", `particle--${type}`);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      const driftX = (Math.random() - 0.5) * 200;
      const driftY = (Math.random() - 0.5) * 200 - 100; // bias upward
      particle.style.setProperty("--drift-x", `${driftX}px`);
      particle.style.setProperty("--drift-y", `${driftY}px`);

      const duration = Math.random() * 12 + 8; // 8s — 20s
      const delay = Math.random() * 10;
      particle.style.animation = `float-particle ${duration}s ${delay}s linear infinite`;

      container.appendChild(particle);
    }
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-out Hero content on scroll
    if (heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        y: -120,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "40% top",
          scrub: 1.5,
        },
      });
    }

    // Scroll hint fades out quickly
    if (scrollHintRef.current) {
      gsap.to(scrollHintRef.current, {
        opacity: 0,
        y: -20,
        ease: "power2.in",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "10% top",
          scrub: 1,
        },
      });
    }

    // Products staggered entrance
    const cards = gsap.utils.toArray(".product-card");
    if (cards.length > 0) {
      gsap.set(cards, {
        y: 100,
        opacity: 0,
        scale: 0.88,
        rotationX: 15,
      });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.15,
            overwrite: "auto",
          });
        },
        start: "top 85%",
        once: true,
      });
    }

    // Products Title entrance
    if (productsTitleRef.current) {
      gsap.from(productsTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsTitleRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }

    if (productsDescRef.current) {
      gsap.from(productsDescRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsDescRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }

    // About Section animations
    if (aboutTitleRef.current) {
      gsap.from(aboutTitleRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          once: true,
        },
      });
    }

    if (aboutDescRef.current) {
      gsap.from(aboutDescRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          once: true,
        },
      });
    }

    if (aboutVisualRef.current) {
      gsap.from(aboutVisualRef.current, {
        x: 60,
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          once: true,
        },
      });
    }

    // Parallax background video scaling
    if (heroVideoBgRef.current) {
      gsap.to(heroVideoBgRef.current, {
        scale: 1.15,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Button mouse effects
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      const enter = () => gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      const leave = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out" });
      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      };
    });

    // Navigation links hover animations
    const navLinksElements = document.querySelectorAll(".nav__link");
    navLinksElements.forEach((link) => {
      const enter = () => gsap.to(link, { y: -2, duration: 0.3, ease: "power2.out" });
      const leave = () => gsap.to(link, { y: 0, duration: 0.3, ease: "power2.out" });
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
      return () => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      };
    });

    // Footer links entry animations
    const footerLinks = document.querySelectorAll(".footer__col a");
    if (footerLinks.length > 0) {
      gsap.from(footerLinks, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 90%",
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [products]);

  // Handle manual product card animations
  const handleCardMouseEnter = (e) => {
    const img = e.currentTarget.querySelector(".product-card__image");
    if (img) {
      gsap.to(img, {
        scale: 1.15,
        rotation: -5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleCardMouseLeave = (e) => {
    const img = e.currentTarget.querySelector(".product-card__image");
    if (img) {
      gsap.to(img, {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      {/* NAVIGATION */}
      <nav className={`nav ${navScrolled ? "nav--scrolled" : ""}`} id="main-nav">
        <div className="nav__inner">
          <a href="#" className="nav__brand" id="nav-brand">
            <span className="nav__brand-icon">✦</span>
            Cosmart
          </a>
          <ul className={`nav__links ${mobileMenuOpen ? "mobile-open" : ""}`} id="nav-links">
            <li>
              <a href="#hero" className="nav__link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#products" className="nav__link" onClick={() => setMobileMenuOpen(false)}>
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="nav__link" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="nav__link" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
          <a href="#products" className="nav__cta" id="nav-cta">
            Shop Now
          </a>
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

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero__video-bg" id="hero-video-bg" ref={heroVideoBgRef}>
          <video autoPlay muted loop playsInline id="hero-video">
            <source src="/Cosmetic_products_with_rose_petals_202606291202.mp4" type="video/mp4" />
          </video>
          <div className="hero__video-overlay"></div>
        </div>

        <div className="hero__particles" id="hero-particles" ref={particlesContainerRef} aria-hidden="true"></div>

        <div className="hero__content" id="hero-content" ref={heroContentRef}>
          <p className="hero__eyebrow" id="hero-eyebrow">
            ✦ Luxury Cosmetics Redefined ✦
          </p>
          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line">Beauty</span>
            <span className="hero__title-line">Without</span>
            <span className="hero__title-line hero__title-line--accent">Limits</span>
          </h1>
          <p className="hero__subtitle" id="hero-subtitle">
            Defy gravity. Redefine elegance. Experience the future of luxury beauty.
          </p>
          <div className="hero__actions" id="hero-actions">
            <a href="#products" className="btn btn--primary" id="hero-cta-primary">
              Explore Collection
            </a>
            <a href="#about" className="btn btn--ghost" id="hero-cta-secondary">
              Our Story
            </a>
          </div>
          <div className="hero__scroll-hint" id="hero-scroll-hint" ref={scrollHintRef}>
            <span className="hero__scroll-text">Scroll to Explore</span>
            <div className="hero__scroll-line"></div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products" id="products">
        <div className="products__inner">
          <p className="products__eyebrow">✦ Our Collection</p>
          <h2 className="products__title" id="products-title" ref={productsTitleRef}>
            Curated for <em>You</em>
          </h2>
          <p className="products__desc" id="products-desc" ref={productsDescRef}>
            Every product is a masterpiece, crafted with the finest ingredients to elevate your beauty ritual.
          </p>
          <div className="products__grid" id="products-grid">
            {products.map((product) => (
              <article
                key={product.id}
                className="product-card"
                id={`card-${product.id}`}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="product-card__image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="product-card__info">
                  <span className="product-card__tag">{product.tag}</span>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__price">{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <div className="about__inner">
          <div className="about__text">
            <p className="about__eyebrow">✦ Our Philosophy</p>
            <h2 className="about__title" id="about-title" ref={aboutTitleRef}>
              Where Science Meets <em>Art</em>
            </h2>
            <p className="about__desc" id="about-desc" ref={aboutDescRef}>
              At Cosmart, we believe beauty should be boundless — unconstrained by convention, elevated by innovation.
              Every formula is a symphony of science and artistry, designed to make you feel extraordinary.
            </p>
            <a href="#contact" className="btn btn--primary" id="about-cta">
              Get in Touch
            </a>
          </div>
          <div className="about__visual" id="about-visual" ref={aboutVisualRef}>
            <div className="about__glow"></div>
            <img src="/assets/images/perfume.png" alt="Cosmart Signature" className="about__image" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__brand-icon">✦</span>
            <span className="footer__brand-name">Cosmart</span>
            <p className="footer__tagline">Beauty Without Limits</p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <h4>Shop</h4>
              <a href="#">Skincare</a>
              <a href="#">Makeup</a>
              <a href="#">Fragrance</a>
              <a href="#">Gift Sets</a>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
              <a href="#">Sustainability</a>
            </div>
            <div className="footer__col">
              <h4>Support</h4>
              <a href="#">Contact</a>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">FAQ</a>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2026 Cosmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
