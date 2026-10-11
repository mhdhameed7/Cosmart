# ✦ Cosmart — Beauty Without Limits

> A high-end luxury cosmetics e-commerce experience designed with captivating visuals, fluid animations, and headless CMS integration powered by Contentful.

![Cosmart Preview](assets/images/lipstick.png)

---

## 🌟 Overview

**Cosmart** is a luxury beauty and cosmetics brand platform crafted to deliver an unforgettable digital storefront. Blending editorial aesthetics with interactive animations, Cosmart highlights premium beauty products—from velvet lipsticks and artisanal fragrances to rejuvenating serums.

This repository features both a lightweight, zero-build **Vanilla Web Architecture** and an advanced **Next.js 16 App Router** implementation, both integrated with **Contentful Headless CMS** for dynamic product catalog management.

---

## ✨ Features

- **Cinematic Visual Experience**: Hero section featuring ambient video backgrounds, golden glow effects, and dynamic particle animations.
- **Headless CMS Integration**: Live product catalogs powered by Contentful Delivery API with instant fallback to static mock data if offline.
- **Fluid GSAP Animations**: Smooth reveal animations, scroll triggers, and parallax transitions powered by GreenSock (GSAP).
- **Responsive & Modern Design**: Mobile-first design, custom typography (*Playfair Display* & *Inter*), and sleek glassmorphism UI elements.
- **Dual Architecture**:
  - **Static Web Experience**: Pure HTML5, modern CSS3, and modular ES6 JavaScript.
  - **Modern Next.js Web App**: Next.js 16 (App Router), React 19, Tailwind CSS v4, and modern component architecture.
- **Interactive Product Showcase**: Product cards with dynamic badges (Best Seller, New Arrival, Limited Edition), price tags, and interactive buy actions.

---

## 📁 Repository Structure

```text
Cosmart/
├── index.html                   # Main static website landing page
├── style.css                    # Luxury styling, animations, responsive design
├── main.js                      # UI logic, mobile navigation, GSAP animations
├── contentful-config.js         # Contentful credentials configuration for static site
├── contentful-client.js         # Contentful API client setup
├── contentful-integration.js    # Dynamic product renderer from Contentful
├── CONTENTFUL_SETUP.md          # Step-by-step Contentful CMS configuration guide
├── package.json                 # Static site scripts and dependencies
├── assets/
│   └── images/                  # High-resolution product photography
│       ├── lipstick.png
│       ├── perfume.png
│       ├── face-cream.png
│       ├── gift-box.png
│       ├── eyeshadow.png
│       └── rose.png
│
├── nextinit/                    # Modern Next.js application directory
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js        # Root layout with metadata and fonts
│   │   │   ├── page.js          # Interactive Next.js homepage with GSAP & CMS
│   │   │   └── globals.css     # Global styles & Tailwind CSS v4 directives
│   │   └── lib/
│   │       └── contentful.js    # Server/Client Contentful helper utilities
│   ├── public/                  # Static assets & videos for Next.js app
│   ├── .env.example             # Template for Next.js environment variables
│   ├── package.json             # Next.js dependencies (React 19, Tailwind CSS v4)
│   └── next.config.mjs          # Next.js configuration
│
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

You can run either the lightweight static version or the Next.js modern web app.

### Option 1: Running the Static Website (Root)

No build step required! You can open `index.html` directly or serve it locally:

```bash
# Clone the repository
git clone https://github.com/mhdhameed7/Cosmart.git
cd Cosmart

# Install local server dependency
npm install

# Start local server
npm run dev
```

Visit `http://localhost:3000` (or the URL displayed in your terminal).

---

### Option 2: Running the Next.js Web App (`/nextinit`)

For the full Next.js App Router experience with React 19:

```bash
# Navigate to nextinit directory
cd nextinit

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Contentful CMS Integration

Cosmart can fetch product data dynamically from Contentful.

### 1. Product Content Model
Create a content type with ID `product` containing:

| Field Name | Field ID | Field Type | Required |
| :--- | :--- | :--- | :--- |
| **Name** | `name` | Short text | Yes |
| **Price** | `price` | Short text | Yes |
| **Tag** | `tag` | Short text | No |
| **Image** | `image` | Media (Image) | Yes |
| **Description** | `description` | Long text | No |

### 2. Connect Credentials

- **For Static Site**: Open `contentful-config.js` and enter your Space ID and Access Token.
- **For Next.js App**: In `nextinit/.env.local`, set:
  ```env
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
  ```

For a comprehensive walkthrough, see [`CONTENTFUL_SETUP.md`](./CONTENTFUL_SETUP.md).

---

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React 19, Next.js 16
- **Styling**: Vanilla CSS (Custom design system) & Tailwind CSS v4
- **Animations**: GSAP 3 (GreenSock Animation Platform) & ScrollTrigger
- **Headless CMS**: Contentful Content Delivery API
- **Typography**: Playfair Display (Headings) & Inter (Body)

---

## 📦 Deployment

### Deploying the Next.js App (Recommended: Vercel)
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `nextinit`.
4. Add the Contentful environment variables in project settings.
5. Deploy!

### Deploying the Static Site (Netlify / GitHub Pages)
- Simply point Netlify or GitHub Pages to the root directory containing `index.html`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
