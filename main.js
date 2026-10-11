/* ═══════════════════════════════════════════════════════════════
   COSMART — Parallax Hero Engine
   ═══════════════════════════════════════════════════════════════
   Uses GSAP + ScrollTrigger for scroll-driven animations
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── WAIT FOR ALL LIBS TO LOAD ────────────────────── */
  window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initScrollAnimations();
  });

  /* ═══════════════════════════════════════════════════════
     1. CSS FLOATING PARTICLES
     ═══════════════════════════════════════════════════════ */
  function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const PARTICLE_COUNT = 45;
    const types = ['gold', 'pink', 'white'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 4 + 1.5; // 1.5px — 5.5px

      particle.classList.add('particle', `particle--${type}`);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random drift direction for the float animation
      const driftX = (Math.random() - 0.5) * 200;
      const driftY = (Math.random() - 0.5) * 200 - 100; // Bias upward
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.setProperty('--drift-y', `${driftY}px`);

      // Random animation timing
      const duration = Math.random() * 12 + 8; // 8s — 20s
      const delay = Math.random() * 10;
      particle.style.animation = `float-particle ${duration}s ${delay}s linear infinite`;

      container.appendChild(particle);
    }
  }

  /* ═══════════════════════════════════════════════════════
     2. NAVIGATION
     ═══════════════════════════════════════════════════════ */
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    // Scrolled state
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });

    // Mobile hamburger
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
      });

      // Close on link click
      navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('mobile-open');
        });
      });
    }
  }

  /* ═══════════════════════════════════════════════════════
     3. GSAP + SCROLLTRIGGER ANIMATIONS
     ═══════════════════════════════════════════════════════
     - Hero text fades out on scroll
     - Featured product parallax animation
     - Products section cards animate in on reveal
     - About section slides in
     ═══════════════════════════════════════════════════════ */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[Cosmart] GSAP/ScrollTrigger not loaded — skipping scroll animations.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero Content Fade-Out on Scroll ─────────────────
    const heroContent = document.getElementById('hero-content');
    const scrollHint = document.getElementById('hero-scroll-hint');

    if (heroContent) {
      gsap.to(heroContent, {
        y: -120,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '40% top',
          scrub: 1.5,
        }
      });
    }

    // ── Scroll hint fades quickly ───────────────────────
    if (scrollHint) {
      gsap.to(scrollHint, {
        opacity: 0,
        y: -20,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '10% top',
          scrub: 1,
        }
      });
    }

    // ── Products Section — Staggered Card Reveal ────────
    const productCards = gsap.utils.toArray('.product-card');

    if (productCards.length) {
      gsap.set(productCards, {
        y: 100,
        opacity: 0,
        scale: 0.88,
        rotationX: 15,
      });

      ScrollTrigger.batch(productCards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.15,
          });
        },
        start: 'top 85%',
        once: true,
      });

      // Enhanced hover animations for cards
      productCards.forEach(card => {
        const image = card.querySelector('.product-card__image');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.15,
            rotation: -5,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });
    }

    // ── Products Section Title ──────────────────────────
    const productsTitle = document.getElementById('products-title');
    const productsDesc = document.getElementById('products-desc');

    if (productsTitle) {
      gsap.from(productsTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: productsTitle,
          start: 'top 85%',
          once: true,
        }
      });
    }

    if (productsDesc) {
      gsap.from(productsDesc, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: productsDesc,
          start: 'top 85%',
          once: true,
        }
      });
    }

    // ── About Section — Slide In ────────────────────────
    const aboutTitle = document.getElementById('about-title');
    const aboutDesc = document.getElementById('about-desc');
    const aboutVisual = document.getElementById('about-visual');

    if (aboutTitle) {
      gsap.from(aboutTitle, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
          once: true,
        }
      });
    }

    if (aboutDesc) {
      gsap.from(aboutDesc, {
        x: -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
          once: true,
        }
      });
    }

    if (aboutVisual) {
      gsap.from(aboutVisual, {
        x: 60,
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about',
          start: 'top 75%',
          once: true,
        }
      });
    }

    // ── Parallax Background Glow on Hero ────────────────
    const heroVideoBg = document.getElementById('hero-video-bg');
    if (heroVideoBg) {
      gsap.to(heroVideoBg, {
        scale: 1.15,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // ── Enhanced Button Animations ───────────────────────
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // ── Navigation Link Animations ───────────────────────
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          y: -2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // ── Footer Links Stagger Animation ────────────────────
    const footerLinks = document.querySelectorAll('.footer__col a');
    if (footerLinks.length) {
      gsap.from(footerLinks, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          once: true,
        }
      });
    }
  }

})();
