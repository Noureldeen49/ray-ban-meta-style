# 🕶️ Rayworks® — Ray-Ban Meta Smart Glasses Website

> A premium multi-page web experience for **Rayworks Studio** — showcasing Ray-Ban Meta smart glasses with an editorial landing page, animated About page, AR virtual try-on powered by hand tracking, and a full checkout flow backed by PHP + MySQL.

---

## ✨ Features

- **🏠 Landing Page (Rejouice-style)** — cinematic full-screen video hero, locomotive scroll animations, letter-by-letter heading, Swiper carousel, and a custom animated cursor
- **📖 About Page** — editorial glassmorphism layout with scroll-reveal sections, parallax headline, animated marquee ticker, founder profiles with 3D tilt on hover, and live stats
- **🕶️ AR Try-On** — real-time virtual glasses try-on using webcam + MediaPipe hand tracking + Three.js 3D rendering; pinch-to-resize and tap-to-recolor
- **🛒 Checkout Page** — product detail view, order form with country selector (SQLite DB), and PHP backend to save orders into MySQL
- **🗄️ Backend** — PHP + MySQL (XAMPP) for order management, PDO prepared statements, and a REST-style countries endpoint

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Landing) | Vanilla HTML · CSS · JavaScript |
| Animations | [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) · [GSAP](https://gsap.com/) · [Swiper](https://swiperjs.com/) |
| AR / 3D | [MediaPipe Hands](https://developers.google.com/mediapipe) · [Three.js r128](https://threejs.org/) |
| React Layer | React 19 · [TanStack Start](https://tanstack.com/start) · [TanStack Router](https://tanstack.com/router) |
| Styling | Tailwind CSS v4 · shadcn/ui · Radix UI |
| Backend | PHP 8 · PDO · MySQL (XAMPP) |
| Database | MySQL (`rayban_meta` DB) · SQLite (delivery countries) |
| Build Tool | Vite 7 · Bun |
| Deployment | Cloudflare Workers |
| Fonts | Inter · PP Neue Montreal |

---


## 📄 Pages

| Page | Path | Description |
|---|---|---|
| Landing | `Rejouice-main/index.html` | Cinematic hero, scroll animations |
| About | `public/about.html` | Studio story, founders, stats |
| Try On | `public/try.html` | AR webcam glasses try-on |
| Shop | `public/checkout.html` | Product detail + order form |

---

## 🕶️ AR Try-On — How It Works

The try-on page uses your **webcam** + **MediaPipe Hands** to detect hand landmarks in real time. A **Three.js** 3D glasses model is then rendered on a canvas overlay:

- ✋ **Pinch** (thumb + index) to resize the glasses
- 👆 **Tap** to cycle through colors
- Works entirely in-browser — no installation needed

---



## 📄 License

Academic / educational project. All rights reserved by Rayworks Studio © 2026.
