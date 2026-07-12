# 🚀 Premium Developer Portfolio

A cutting-edge, highly interactive, and visually stunning developer portfolio website built using **React 19** and **Vite**. This portfolio incorporates modern design trends like glassmorphism, dynamic theme switches, interactive 3D tilt effects, an AI-powered chat assistant, a developer terminal, and a live stats dashboard.

## 🌐 Live Site

*   **Portfolio Website:** [https://piyush-jain-portfolio.vercel.app](https://piyush-jain-portfolio.vercel.app)

---

## ✨ Features

*   **🎨 Dynamic Design System**: Glassmorphic, modern UI with smooth transitions and theme switching across multiple curated palettes:
    *   `Dark` (Default Sleek Space Dark)
    *   `Light` (Clean Slate Blue)
    *   `Cyberpunk` (Neon Yellow, Red & Turquoise)
    *   `Forest` (Serene Emerald Green)
*   **🤖 AI Chat Assistant**: Integrated conversational chatbot powered by **Google Gemini API** (`@google/generative-ai`) to answer questions about me, my experience, and skills in real-time.
*   **💻 Interactive Terminal**: A functional, draggable UNIX-like terminal shell widget permitting users to run command-line actions (`help`, `about`, `skills`, `projects`, `contact`, `clear`) to explore the portfolio.
*   **📊 Live API Dashboard**:
    *   **GitHub Integration**: Live-fetches stats, total stars, forks, contributions, language distribution donut charts, and recent repositories.
    *   **LeetCode Integration**: Displays ranking, solved questions (categorized by Easy/Medium/Hard with SVG progress rings), and recent submission statistics.
*   **✨ Immersive Micro-interactions**:
    *   **3D Hover Cards**: Native React hook-based hover tilt mechanics (`useTilt`) with specular glare tracking on project/skill components.
    *   **Smooth Scroll**: Powered by **Lenis Scroll** for momentum-based natural scrolling.
    *   **Scroll Reveal**: Performance-focused intersection-observer reveal triggers.
    *   **Mouse Spotlight**: Spotlight gradient overlay following cursor movements.

---

## 🛠️ Technology Stack

### Frontend & Utilities
*   **Core**: React 19, JavaScript (ES6+), HTML5, Vanilla CSS3 (Single entry-point architecture)
*   **Build System**: Vite (Lightning-fast dev server and bundle compilation)
*   **Icons**: `react-feather`, `react-icons`
*   **Smooth Scroll**: `lenis`

### AI & APIs
*   **LLM Integration**: Google Gemini API SDK (`@google/generative-ai`)
*   **Data APIs**: GitHub REST API & LeetCode API

---

## 📁 Clean Directory Structure

```text
Piyush_jain_Portfolio/
├── public/
│   └── assets/             # Project screenshots & images (e.g. travel_app, clubonix_app)
├── src/
│   ├── assets/             # App icons & profile media
│   ├── components/         # Reusable React components (Navbar, Hero, About, Projects, etc.)
│   ├── hooks/              # Custom hooks (useTilt, useMagnetic)
│   ├── App.css             # Unified project stylesheet (merged & optimized)
│   ├── App.jsx             # Main application orchestrator
│   └── main.jsx            # React root entry point
├── vite.config.js          # Vite config
├── package.json            # Project dependencies & build script definitions
└── README.md               # Documentation
```

---

## 🚀 Installation & Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/Piyushjain1857/Piyush_jain_Portfolio.git
cd Piyush_jain_Portfolio
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build and preview for production
```bash
npm run build
npm run preview
```

---

## 👨‍💻 Selected Projects Featured

*   **Curio** (AI / Full-Stack): Unified AI playground connecting multiple model endpoints.
<!-- *   **Travel App** (React / Vite): Full-scale travel planner featuring daily itineraries, spending charts, and smooth Framer Motion-like routing animations.
*   **CLUBONIX™** (HTML / CSS / JS): Bespoke landing experience with particle physics canvases and custom preloader routines. -->
*   **Agro AI** (Machine Learning): Crops predictive analytics pipeline with FastAPI backend.
<!-- *   **Cyber Guardian** (Security): Real-time network anomaly logs analyzer using ELK.
*   **MediCare+** (Healthcare / Full-Stack): Appointments booking system. -->
*   **Hostel Leave Management System** A full-stack hostel leave management system enabling students to apply for leaves, track approval status, and allowing wardens to manage requests via an admin dashboard.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are always welcome. Feel free to fork the repository, open issues, or create pull requests.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author
**Piyush Jain**  
Full Stack Developer | AI & Data Science Specialist
