import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <h3 className="footer__newsletter-title">
              Stay in the <em>Loop</em>
            </h3>
            <p className="footer__newsletter-desc">
              Subscribe for exclusive launches, beauty tips, and members-only offers.
            </p>
          </div>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer__newsletter-input"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="btn btn--primary footer__newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-section">
            <Link href="/" className="footer__brand-link">
              <span className="footer__brand-icon">✦</span>
              <span className="footer__brand-name">Cosmart</span>
            </Link>
            <p className="footer__tagline">Beauty Without Limits</p>
            <p className="footer__brand-desc">
              Crafting premium cosmetics with the finest ingredients since 2020. 
              Where science meets artistry for extraordinary beauty.
            </p>
            {/* Social Icons */}
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter / X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <h4>Shop</h4>
              <Link href="/#products">Skincare</Link>
              <Link href="/#products">Makeup</Link>
              <Link href="/#products">Fragrance</Link>
              <Link href="/#products">Gift Sets</Link>
            </div>
            <div className="footer__col">
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/press">Press</Link>
              <Link href="/sustainability">Sustainability</Link>
            </div>
            <div className="footer__col">
              <h4>Support</h4>
              <Link href="/contact">Contact</Link>
              <Link href="/shipping">Shipping</Link>
              <Link href="/returns">Returns</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 Cosmart. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
