# 🏥 RNT Memorial Clinic — Website

A modern, responsive, single-page clinic website built with **React + Vite + Tailwind CSS**.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## ✨ Features

- 🌓 **Dark / Light Mode** — smooth toggle with full theme support
- 🌐 **Hindi / English Toggle** — complete bilingual content switching
- 📱 **Mobile-first Responsive** — works on all screen sizes
- 💬 **WhatsApp Integration** — floating button + direct chat links
- 📞 **Click-to-Call** — all phone numbers are tappable
- 🗺️ **Google Maps** — embedded location map
- ⭐ **Patient Testimonials** — carousel on mobile, grid on desktop
- 🎨 **Scroll Animations** — smooth reveal effects on scroll
- 📋 **Contact Form** — enquiry form with styled inputs
- 🏷️ **IVF Premium Badge** — highlighted as featured service
- 🚑 **Emergency Contact** — always visible call option

---

## 📦 Quick Start

### Prerequisites
- **Node.js** 18+ installed ([download here](https://nodejs.org))
- **npm** (comes with Node.js)

### 1. Install Dependencies

```bash
cd rnt-clinic
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This opens the site at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### 4. Preview Production Build

```bash
npm run preview
```

---

## 🚀 Deployment Options

### Option A: Vercel (Recommended — Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Framework: **Vite** (auto-detected)
4. Click **Deploy** ✅
5. Get your free URL: `rnt-memorial-clinic.vercel.app`

### Option B: Netlify (Free)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy** ✅

### Option C: Manual Hosting (Any Server)

1. Run `npm run build`
2. Upload the `dist/` folder to any web hosting (GoDaddy, Hostinger, etc.)
3. Point your domain to the folder

### Option D: GitHub Pages (Free)

1. Install: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Add to `vite.config.js`: `base: '/rnt-memorial-clinic/'`
4. Run: `npm run build && npm run deploy`

---

## 📁 Project Structure

```
rnt-clinic/
├── index.html              # Entry HTML (with SEO meta tags)
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── public/
│   └── favicon.svg         # Clinic favicon (RNT logo)
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Tailwind directives + animations
    └── App.jsx             # Main app (all sections, data, logic)
```

---

## 🎨 Customization

### Change Colors
Edit the color variables in `App.jsx` — search for `#0D7377` (teal), `#E8751A` (orange), `#D4A853` (gold).

### Update Contact Info
All clinic data is in the `CLINIC` object at the top of `App.jsx`.

### Add/Edit Testimonials
Edit the `TESTIMONIALS` array in `App.jsx` — each entry has English and Hindi text.

### Update Doctor Info
Edit the `DOCTORS` array in `App.jsx`.

### Change Google Maps Location
Replace the `iframe src` URL in the Location section with your actual Google Maps embed URL:
1. Go to Google Maps → Search your clinic
2. Click "Share" → "Embed a map"
3. Copy the iframe `src` URL

---

## 🔧 Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3.4 | Utility-first styling |
| Lucide React | Icon library |
| Google Fonts | Playfair Display, Poppins, Noto Sans Devanagari |

---

## 📄 License

© 2026 RNT Memorial Clinic. All Rights Reserved.
