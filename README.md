# 🏛️ Virtual Museum

> A curated, multi-page digital gallery showcasing historic masterpieces of painting and sculpture. Built with vanilla HTML5, modern CSS3, and JavaScript — emphasizing museum-grade editorial design, accessibility, and client-side interactivity.

---

## 📌 Project Overview

**Virtual Museum** is a fully static, five-page web application developed for the **Web Technologies** course (BS CS F24). It allows art enthusiasts to explore historical exhibitions, search and filter high-resolution artworks, experience a randomized guided curator's tour, curate personal collections with persistent favorites, and plan an in-person museum visit.

The site is built strictly with vanilla web standards — no external frontend frameworks, libraries, or server-side backends. All state management (such as saved collections) is persisted client-side via `localStorage`.

---

## 🌟 Key Features

### 1. 🖼️ Multi-Page Architecture
* **Home (`index.html`)**: Features an asymmetric hero layout spotlighting masterworks, mission highlights, and direct access to interactive features.
* **About (`about.html`)**: Details the museum's provenance, curatorial philosophy, and preservation values with an editorial pull-quote design.
* **Exhibitions (`exhibitions.html`)**: Curated permanent collections across four distinct eras (Renaissance, Impressionism, Modern Art, and Sculpture), each with tailored atmospheric color accents.
* **Gallery (`gallery.html`)**: The complete artwork catalogue with real-time multi-criteria filtering, live search, an artwork lightbox, and a saved favorites view.
* **Visit & Contact (`visit.html`)**: Visitor planning guide featuring a live "Open Today" indicator, accessible weekly schedule table, admission details, and an interactive contact inquiry form.

### 2. ⚡ Dynamic JavaScript Functionality
* **Curator’s Random Tour (`js/tour.js`)**:
  * Shuffles the artwork dataset to generate a 5-stop guided walkthrough without duplicates.
  * Features step-by-step previous/next navigation, progress counters, and seamless card reveals.
* **Personal Collection / Favorites (`js/favorites.js`)**:
  * Bookmark any artwork by toggling the heart icon (`♡` / `♥`).
  * Persisted across browser sessions using the Web Storage API (`localStorage`).
  * Dynamic favorites counter synced across the global header navigation.
* **Instant Live Search & Era Filtering (`js/gallery.js`)**:
  * Real-time search query matching across artwork titles and artists.
  * Category chips for filtering by historical movement (Renaissance, Impressionism, Modern, Sculpture) or viewing saved items only.
  * Fully debounced, combining search text and category filters simultaneously with custom "no results" empty states.
* **Artwork Lightbox / Modal Viewer (`js/gallery.js`)**:
  * Deep-dive modal inspecting full-resolution imagery, medium, dimensions, and curatorial commentary.
  * Keyboard navigation support (`Escape` to dismiss, arrow keys) and backdrop click dismissal with background scroll locking.
* **Accessible Form Validation (`js/form.js`)**:
  * Pure client-side validation on the Visit page inquiry form.
  * Validates required fields, character thresholds, and email formatting with regular expressions (`regex`).
  * Live error removal on input and ARIA-compliant alert feedback on successful dispatch.
* **Responsive Mobile Navigation (`js/nav.js`)**:
  * Accessible hamburger navigation drawer with backdrop overlay for tablet and mobile devices.

---

## 🎨 Design System & Aesthetics

The aesthetic avoids generic templates and AI clichés, opting instead for restraint and the visual identity of prestigious cultural institutions:

* **Typography**:
  * **Headings & Display**: `Fraunces` — a characterful, high-contrast serif font providing warm editorial elegance.
  * **Body & UI**: `Work Sans` — a clean, geometric, neutral sans-serif designed for legibility at all scales.
* **Color Palette (CSS Tokens)**:
  * Primary Brand: Maroon (`--color-maroon: #4a1620`, `--color-maroon-deep: #2f0e15`)
  * Accent: Warm Ochre / Antique Gold (`--color-gold: #b8923f`)
  * Canvas / Surfaces: Antique Cream (`--color-cream: #f3ede1`) and Warm Ivory (`--color-ivory: #fbf8f2`)
  * Typography: Soft Charcoal & Ink (`--color-ink: #241d1a`, `--color-ink-soft: #5c5147`)
* **Responsive Layouts**:
  * Fluid CSS Grid for artwork catalogues and exhibition showcases.
  * Flexible Flexbox alignment for headers, navigation, badges, and form controls.
  * Responsive breakpoints tailored for desktop, tablet (`768px`), and mobile (`480px`).
  * Motion safeguards respecting `prefers-reduced-motion`.

---

## 📂 Project Structure

```text
Virtual-Museum/
├── index.html               # Homepage & featured showcase
├── about.html               # Institutional story & curatorial mission
├── exhibitions.html         # Thematic wings & collection previews
├── gallery.html             # Master catalogue with filter, search & lightbox
├── visit.html               # Schedule, visit logistics & contact form
├── README.md                # Project documentation
├── css/
│   ├── style.css            # Core design system tokens, typography, layouts
│   └── responsive.css       # Mobile & tablet media queries and layout adaptations
├── js/
│   ├── data.js              # Artworks dataset (titles, artists, years, mediums, descriptions)
│   ├── nav.js               # Responsive mobile drawer toggle & backdrop handler
│   ├── tour.js              # Curator's random tour algorithm & walkthrough controller
│   ├── favorites.js         # LocalStorage persistence & favorites counter
│   ├── gallery.js           # Live search, era filter chips, and lightbox modal
│   └── form.js              # Contact form client-side regex validation & feedback
├── images/
│   ├── artworks/            # Public-domain artwork assets
│   └── ui/                  # Interface icons and graphic elements
└── docs/
    └── implementation-plan.md # Architectural specifications and design notes
```

---

## 🚀 Getting Started

Because this project is built entirely on native web standards, **no build step, compilers, or package installations are required**.

### Option 1: Direct Browser Access
Double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Running through a local web server ensures seamless asset loading and accurate performance:

* **Using VS Code Live Server**:
  Right-click `index.html` and select **"Open with Live Server"**.

* **Using Python 3**:
  ```bash
  # In the project root directory:
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your web browser.

* **Using Node / npx**:
  ```bash
  npx serve .
  ```

---

## 🛠️ Technical Specifications & Evaluation Highlights

| Requirement | Implementation Detail |
|---|---|
| **Semantic HTML5** | Consistent use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<table>`, and `<form>`. |
| **CSS Variables** | Standardized spacing scale (`--space-xs` through `--space-xl`), type scale, and palette defined in `:root`. |
| **Layout Mechanics** | CSS Grid for multi-column galleries; Flexbox for navigation, headers, card footers, and modal toolbars. |
| **Data Persistence** | `localStorage` serialization (`JSON.parse` / `JSON.stringify`) to save and recall favorite artworks. |
| **Search & Filtering** | Multi-condition array filtering combining textual query search and categorical data attributes. |
| **Accessibility** | ARIA attributes (`aria-expanded`, `aria-controls`, `aria-live`, `aria-describedby`), semantic form labels, and visible `:focus-visible` rings. |
| **Git Workflow** | Feature-branching structure (`feature-navbar`, `feature-gallery`, `feature-contact-form`, `button-responsiveness`). |

---

## 📜 License & Acknowledgments

* **Artworks**: All showcased paintings and sculptures are in the public domain, sourced from open-access museum archives.
* **Fonts**: Fraunces and Work Sans provided via [Google Fonts](https://fonts.google.com).
* **Course**: Web Technologies, BS Computer Science.
* **Designer**: Huzayfa Siddique
