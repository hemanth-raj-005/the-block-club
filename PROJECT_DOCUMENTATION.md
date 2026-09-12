# THE BLOCK — Project Documentation, Tools & Feature Architecture

> **Competition Track**: Track 05 — "Beyond The Game: Cultural Sports Club"  
> **Theme**: *Athlete-Core // Community First*  
> **Project Name**: THE BLOCK — Athletic Club & Streetwear Collective  
> **Repository**: [`https://github.com/hemanth-raj-005/the-block-club`](https://github.com/hemanth-raj-005/the-block-club)  
> **Live Site (GitHub Pages)**: `https://hemanth-raj-005.github.io/the-block-club/`

---

## 1. Tools & Technologies Used

### A. Core Web Technologies (Frontend Architecture)
| Technology | Role & Purpose |
| :--- | :--- |
| **Semantic HTML5** | Structural foundation, accessibility (ARIA), SEO meta tags, and OpenGraph social preview tags. |
| **Vanilla CSS3** | Custom design system, CSS custom variables (`:root`), fluid typography (`clamp()`), dark-mode brutalist aesthetic, glassmorphism (`backdrop-filter`), and CSS keyframe animations (`marqueeLoop`, `pulseAnimation`, `audioBounce`). Zero external CSS bloat (no Tailwind or Bootstrap). |
| **Vanilla JavaScript (ES6+)** | Pure, lightweight client-side application logic with modular functions and zero third-party script dependencies. |
| **Web Audio API** | Native browser audio synthesis engine powering the 168 BPM runner cadence pulse (808 sub-bass kick + high-frequency stride metronome) and tactile button click sound effects. |
| **HTML5 Canvas API** | Dual-canvas implementation: <br>1. Dynamic GPS-style route telemetry map with animated runner position and waypoints.<br>2. Client-side graphics rendering engine to export customized high-res Digital Athlete Member Passes as `.PNG` images. |
| **Blob & iCalendar (`.ics`) API** | Dynamic programmatic generation and automated download of RFC-5545 `.ics` calendar invite files for Apple Calendar, Google Calendar, and Outlook. |

### B. AI & Creative Generation Tools
| Tool | Description |
| :--- | :--- |
| **Google DeepMind Imagen Vision Engine** (`generate_image`) | Generated custom editorial photographic assets: <br>1. `hero-runner.jpg`: Cinematic night runners in technical reflective 3M streetwear through rain-slicked city streets.<br>2. `capsule-drop.jpg`: Brutalist concrete atelier product showcase of the FW26 technical running shell, split shorts, and cap.<br>3. `sunday-table.jpg`: Evocative communal outdoor dinner table in a brick courtyard with runners sharing pasta and wine under warm festoon lights. |

### C. DevOps, Environment & Version Control
| Tool | Description |
| :--- | :--- |
| **Git 2.51.0** | Version control, branch management (`main`), and staging of all codebase assets. |
| **GitHub & GitHub Pages** | Remote repository hosting and automated static web app deployment with SSL certificate. |
| **Node.js v26.8.1** | Lightweight zero-dependency HTTP server used for local preview, MIME-type routing, and JS syntax verification. |
| **PowerShell 7 (Windows)** | Terminal automation, asset copying, network verification, and Git CLI configuration. |

---

## 2. Comprehensive Inventory: Everything Built in the App

### 1. Navigation & Cadence Audio Bar
- **Brand Identity**: Monolithic `THE BLOCK` typography with electric cobalt accent.
- **Cohort Status Pill**: Live telemetry indicator (`COHORT 23 // OPEN FOR ENLISTMENT`).
- **Cadence Synthesizer Toggle**: Interactive button with animated 4-bar equalizer that activates procedural 168 BPM runner cadence audio and UI click ticks.
- **Direct Navigation Links**: Manifesto, The Crew, FW26 Capsule, Run Division, Runs & Drops, Athlete Pass Studio.
- **Mobile Responsive Drawer**: Slide-out navigation menu for mobile viewports (< 820px).

### 2. Kinetic Ticker Marquee
- Continuous, hardware-accelerated infinite scrolling ticker ribbon in high-vis acid lime (`#D4FF3D`) with dark carbon typography broadcasting real-time club updates.

### 3. Hero Section (Dawn Protocol)
- **Background Watermark**: Giant brutalist outline typography (`23`).
- **Live UTC Telemetry**: Real-time ticking UTC digital clock and spot allocation counter (`48 / 50 SPOTS FILLED`).
- **High-Impact Typography**: Editorial headline (`Not a gym. Not a team. A crew.`) with glowing cobalt text shadow.
- **Telemetry Metric Grid**: 
  - `5:45 AM` — Dawn Protocol
  - `420+ MI` — Weekly Distance Logged
  - `0` — Tryouts Required (Zero gatekeeping)
  - `100%` — Homemade Table Food
- **Editorial Showcase Card**: Hero runner photography featuring HUD coordinates (`LAT: 40.7128° N // LON: 74.0060° W`), 3M technical specification callouts, and cadence monitor tag.

### 4. Manifesto: "Culture As Catalyst"
- Manifesto statement: *"Sport built the discipline. Culture built the community. We stopped pretending you had to pick one."*
- Explains the philosophy of the "Third Space" between corporate life, athletic discipline, and streetwear culture.
- **3 Core Pillars**:
  - *Zero Gatekeeping*: Equal support for sub-5:00 milers and 11:00 conversational joggers.
  - *Tactile Apparel*: Low-run technical gear crafted from Japanese ripstop and 3M Scotchlite instead of polyester billboards.
  - *The Sunday Table*: Sweat gets you in; shared meals build lifetime community.

### 5. The Crew: 3 Ways In
- **01 The Runners**: 5:45 AM dawn starts, waterfront tempo splits, coached track nights under floodlights.
- **02 The Makers**: In-house apparel design lab, custom silkscreen printing, typography experiments, and prototype testing.
- **03 The Table**: Post-run family dinners, rotating chef hosts, sourdough, pasta, and natural wine.

### 6. FW26 Capsule Drop: Atelier Showcase
- **Drop 02 Countdown Timer**: Live ticking countdown timer displaying Days, Hours, Minutes, and Seconds until release.
- **Lookbook Showcase**: High-resolution photography of the *AeroGrid 3M Reflective Shell*.
- **Technical Features Matrix**: Schoeller 3XDRY® nanotech barrier, dual bounce-free rear gel compartments, magnetic Fidlock storm cinch, and laser-cut ventilation micro-mesh.
- **4 Interactive Product Cards**:
  1. *AeroGrid 3M Shell* ($145)
  2. *Interval 5" Split Race Short* ($78)
  3. *Unsanctioned Pack Cap* ($42)
  4. *Recovery 480gsm Heavyweight Crewneck* ($95)
- **Interactive Product Modal**: Clicking any item opens a dedicated modal with technical specifications, size selector (XS, S, M, L, XL), and an instant "Reserve Member Allocation" button with toast confirmation.

### 7. Run Division: Interactive Route Map & Pace Engine
- **HTML5 Canvas GPS Circuit**:
  - Simulates 3 distinct running circuits with high-tech gridlines, route glowing halo, start/finish waypoints, and a live pulsing runner marker traversing the path.
  - Route A: *Riverside Drift (8.2 mi)* — Flat waterfront asphalt for negative splits.
  - Route B: *Midnight Crit (5.0 mi)* — Fast 90-degree cornering under neon city lights.
  - Route C: *East Bridge Repeats (6.5 mi)* — 4x suspension bridge climbs (+740 ft elevation).
- **Interactive Target Pace Slider**:
  - Adjustable range from 5:30/mi (330s) to 10:30/mi (630s).
  - Dynamically calculates estimated duration (e.g. `57m 24s`), total energy expenditure (e.g. `886 kcal`), and assigns the user to their squad heat:
    - **HEAT 1**: Sub-6:40 Speedpack
    - **HEAT 2**: 7:00–8:00 Tempo Collective
    - **HEAT 3**: 8:30+ Social Strides & Vibes

### 8. The Sunday Table Spotlight
- Dedicated cultural lifestyle section spotlighting the communal dinner experience with documentary-style photography, quote callouts, and rotating chef stories.

### 9. Schedule & Event Engine
- Category filter buttons: `ALL EVENTS (6)`, `RUN SESSIONS`, `CAPSULE DROPS`, `THE TABLE & STUDIO`.
- Dynamic event list displaying date, session title, description, time/location, and category badges.
- **Interactive RSVP Modal & Calendar Sync**:
  - Allows runners to enter their name, email, and pace group.
  - **Automated `.ics` Generation**: Downloads an authentic iCalendar file that syncs directly into Apple Calendar or Google Calendar.

### 10. Athlete Pass Studio (Personalized Member Credential)
- **Live Real-Time Form Controls**:
  - Full Name / Call-Sign input
  - Social / Strava handle input
  - Target Pace Heat selector
  - Primary Club Focus selector
- **Dynamic Digital Card Preview**:
  - Holographic gradient top bar and dark carbon card chassis.
  - Dynamically generated unique member code (e.g. `#BLK-23-ML8410`).
  - Scalable Vector Graphics (SVG) high-contrast barcode with official club seal.
- **Instant Canvas Export**:
  - Clicking **"Download Official Pass (.PNG)"** draws the customized card onto an off-screen HTML5 canvas and triggers an automatic image download to the user's computer.

### 11. Membership Invitation & Footer
- "Show up once. See if it sticks." email registration input with validation and toast feedback.
- Detailed footer with navigation links, club coordinates (`40.7128° N, 74.0060° W`), Strava club link, Instagram link, Spotify playlist link, and Track 05 credential notice.

---

## 3. Project File Tree

```
the-block-club/
│
├── index.html                   # Main semantic HTML5 webpage
├── styles.css                   # Complete Vanilla CSS design system
├── app.js                       # Audio engine, Canvas routes, pace calc, pass studio, RSVP
├── README.md                    # GitHub repository documentation
├── PROJECT_DOCUMENTATION.md     # This comprehensive architecture & tools document
├── .gitignore                   # Git ignore file for logs and temporary files
│
└── assets/                      # High-resolution generated photography
    ├── hero-runner.jpg          # Night editorial runner photography (16:9)
    ├── capsule-drop.jpg         # FW26 Streetwear product flat lay (4:3)
    └── sunday-table.jpg         # Communal dinner table lifestyle photography (4:3)
```
