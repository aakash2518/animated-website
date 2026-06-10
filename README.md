 Royalfinity — Animated 3D Corporate Website
A high-performance, animated corporate website built with Next.js 15, Three.js, GSAP, and Framer Motion. Features immersive 3D visuals, smooth scroll animations, and a Lighthouse score of 97/100.
🔗 Live Demo: animated-website-f9f7.vercel.app

✨ Features

🎯 3D Visuals — Interactive Three.js scenes via @react-three/fiber and @react-three/drei
🎬 Smooth Animations — GSAP timelines + Framer Motion for fluid UI transitions
🖱️ Smooth Scroll — Lenis scroll engine for buttery-smooth page experience
⚡ Performance Optimized — 97/100 Lighthouse score, image optimization, tree-shaking, SSR
🎨 Modern UI — Tailwind CSS v4 + shadcn/ui component library (Radix UI primitives)
📱 Fully Responsive — Mobile-first design across all screen sizes
🔒 Type Safe — 100% TypeScript codebase


🛠️ Tech Stack
CategoryTechFrameworkNext.js 15 (App Router)LanguageTypeScript 5.83D EngineThree.js + React Three Fiber + DreiAnimationGSAP 3, Framer Motion 12, LenisUITailwind CSS v4, shadcn/ui, Radix UIFormsReact Hook Form + ZodChartsRechartsLintingESLint + PrettierDeploymentVercel

📁 Project Structure
animated-website/
├── app/                  # Next.js App Router (pages, layouts)
├── src/                  # Components, hooks, utils
│   ├── components/       # Reusable UI components
│   └── ...
├── public/assets/        # Static assets (images, models)
├── next.config.ts        # Next.js config (image optimization, tree-shaking)
├── components.json       # shadcn/ui config
└── package.json

🚀 Getting Started
Prerequisites

Node.js >= 18
npm or pnpm

Installation
bash# Clone the repo
git clone https://github.com/aakash2518/animated-website.git
cd animated-website

# Install dependencies
npm install
Development
bashnpm run dev        # Start dev server (Turbopack)
Open http://localhost:3000 in your browser.
Build & Deploy
bashnpm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format with Prettier

⚡ Performance
MetricScoreLighthouse Performance97 / 100Image FormatAVIF / WebPCache TTL30 daysBundleTree-shaken, SSR
Optimizations applied: optimizePackageImports for Radix UI, Lucide, and Framer Motion — ensures only used modules are bundled.

📦 Key Dependencies
json"next": "^15.1.0"
"three": "^0.184.0"
"gsap": "^3.15.0"
"framer-motion": "^12.38.0"
"lenis": "^1.3.23"
"tailwindcss": "^4.2.1"

👤 Author
Aakash Bhatt
Full Stack Engineer | TypeScript · Next.js · React · Three.js

GitHub: @aakash2518
LinkedIn: aakash-bhatt-776689309
Email: aakashbhatt076@gmail.com


📄 License
