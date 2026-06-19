# 🌌 Cyberpunk Developer Portfolio - Prashanth P

An interactive, premium, and theme-switchable **Neon Future / Cyberpunk** developer portfolio showcasing computer science projects, skills, and certifications. Designed with rich aesthetics, smooth micro-animations, and full mobile responsiveness.

🌐 **Live Link**: [View Live Portfolio on Vercel](https://prashanthportfolio-raerlo7x1-vikasprashanth04-9943s-projects.vercel.app)

---

## ✨ Features

### 🎨 1. Dynamic Cyberpunk Theme Switcher
Includes a navigation theme switcher enabling real-time shifts across three neon futures:
*   **Electric Cyan (Default)** - Classic cyberpunk grid glow
*   **Cyber Purple** - Dark purple accentuation
*   **Lime Green** - High-contrast terminal vibes

### 🖱️ 2. Custom Cursor follow Ring
A custom dual-element cursor track system (pointer core and lagging ring) that dynamically enlarges and alters border colors upon hovering over interactive components like cards, buttons, logo, and links.

### 💻 3. System Booting Preloader Monitor
An animated monitor screen that runs a booting sequence (connecting to grid, loading system protocols, syncing neural nets) before revealing the main portfolio enter page.

### 📐 4. 3D Card Hover Tilt
Content cards (Projects, Skills, Languages, About, and Contact) utilize perspective calculations on mouse movements to tilt in 3D space with subtle translations, creating a premium interface depth.

### 🎥 5. Background Video Sound-Sync & Play/Pause Controls
Features a cinematic voice-over introduction video synced exactly to play/mute upon entrance. Includes play/pause and reset controls that automatically sync with state transitions.

### 💬 6. AI Bot Assistant Interface
An interactive simulated RAG conversational chatbot window designed with custom response suggestions to guide visitors through Prashanth's skills and academic path.

### 📄 7. Print-Optimized Cyber Resume
Includes a link to a separate, matching cyberpunk styled document ([resume.html](assets/documents/resume.html)) which is fully stylesheet-optimized for standard A4 printing and PDF saving.

---

## 🛠️ Technology Stack

*   **Markup**: HTML5 (Semantic elements, icons, metadata)
*   **Styling**: Custom CSS3 (CSS Variables, Flexbox/Grid layouts, keyframe animations, responsive media overrides)
*   **Logic**: ES6+ Javascript (DOM control, custom pointer vectors, localStorage persistence, event listeners)
*   **Frameworks**: Frameworkless (Pure Vanilla stack for performance and custom control)
*   **Icons**: FontAwesome v6.4.0
*   **Fonts**: Orbitron, Rajdhani, Share Tech Mono (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
To run the project locally, you only need a modern web browser.

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/PrashanthP606/prashanth-portfolio.git
   ```
2. Navigate to the project folder:
   ```bash
   cd prashanth-portfolio
   ```
3. Open `index.html` directly in your browser or run a local server (e.g., using Python):
   ```bash
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```text
prashanth-portfolio/
│
├── index.html            # Main portfolio layout landing page
├── style.css             # Neon future stylesheets and design tokens
├── script.js             # Visual calculations, typewriter loop, and theme logics
├── package.json          # Node dependencies (e.g., Playwright testing configuration)
├── README.md             # Project documentation
│
└── assets/
    ├── documents/
    │   └── resume.html   # Web-based print-optimized portfolio resume
    ├── images/           # Avatar photo, favicon, and poster frames
    └── videos/           # Cinematic background intro video assets
```

---

## 🔒 License
This project is licensed under the **ISC License**. Created by [Prashanth P](https://github.com/PrashanthP606).
