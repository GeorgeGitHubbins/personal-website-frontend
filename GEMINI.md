# Personal Website Frontend

## Project Overview
A React-based personal website for George Gittins, designed for continuous, autonomous evolution via Gemini CLI.

## Tech Stack
- **Framework:** React (Vite/TypeScript)
- **Deployment Target:** `ai.georgegittins.com` (S3 Bucket)
- **Styling:** Vanilla CSS (preferred for clean, LLM-friendly modification)

## Content & Structure Guidelines
- **Selected Work:** All PDFs are hosted on Google Drive and embedded via iframes. Do NOT attempt to host PDFs locally or link to non-existent local files.
- **Categorization:** 
    - **Experience:** Focuses on professional roles (Sia Partners, Flink, Just Eat Takeaway, etc.).
    - **Education:** Focuses on degrees and academic focus areas (TU Delft MSc, Uni Porto Erasmus, Uni Groningen BSc).
    - **Volunteering:** Focuses on community leadership (Global Shapers, NGO Link).
- **SPA Routing:** Ensure all links use React Router `Link` components. Do NOT break the S3/CloudFront error document redirection which handles direct route access.

## Project Structure & Map
- **Pages (`src/pages/`):**
  - `About.tsx`: Introduction, personal background, and Contact Me (footer-based).
  - `Experience.tsx`: Professional work history.
  - `Education.tsx`: Academic degrees and minor focus.
  - `Projects.tsx`: "Selected Work" and "Technical Projects" (iFrame-based Google Drive links).
- **Global Components (`src/components/`):**
  - `Header.tsx`: Navigation menu.
  - `Footer.tsx`: Contact form, links, and "Last Updated" timestamp.
  - `ScrollToTop.tsx`: Hook to reset scroll position on route changes.
- **Styling:**
  - `index.css`: Global styles, CSS variables, and basic layout.
  - `App.css`: Component-specific utilities and animations.

## Verification & Quality
- **MANDATORY:** After any code change, run:
  1. `npm run lint`: To ensure code style and consistency.
  2. `npm run build`: To verify the production bundle.
- **Plan Mode:** If you enter Plan Mode, save your plan to `./.gemini/plans/session-plan.md`. This path is always available and safe.
- **Atomic Commits:** Focus on one logical improvement at a time. The repo name is `personal-website-frontend`.
- **System Instructions:** Your primary goal is to improve the site at `ai.georgegittins.com`.

- **External Assets:** Most PDFs (CV, Thesis) are hosted on Google Drive. If a link is missing from `TODO.md` or the code, look for it in `personal-website-project/scraped_content/` or assume it needs to be provided by the user (George). Do NOT generate placeholder files.
- **Roadmap Maintenance:** ALWAYS update `TODO.md` after completing a task. Use `[x]` for completed tasks and feel free to add new ideas under "Future Improvements". Always update the TODO list at the end of each session, moving and marking off items, delete old and stale items. Feel free to add good ideas there that meet the requirements mentioned in this projects documentation.  

## Gemini CLI: Autonomous Mode Instructions
This repo is designed to be modified by an autonomous agent periodically (every 3 days). 
- **STRICT RESTRICTION:** NEVER touch or edit 'georgegittins.com' or 'www.georgegittins.com'. These host my Google Sites design and must not be modified or replaced.
- **COST MANDATE:** ONLY implement "Forever Free" solutions. Do NOT introduce recurring API costs, paid SaaS dependencies, or premium AWS services (e.g., avoid Lambda/Bedrock unless within the Free Tier).
- **SECURITY & PRIVACY:** Prioritize static, client-side implementations. Do NOT leak API keys into the frontend. If an AI feature is needed, prefer pre-generating content at build-time (static indexing) or using browser-native capabilities.
- **Deployment Awareness:** Your changes are currently deployed to **ai.georgegittins.com** for iterative improvement. Do NOT attempt to deploy to the production `georgegittins.com` bucket until explicitly instructed in a new task.
- **No Inquiries:** During automated runs, assume all decisions are your own. 
- **Task Selection:** Start by reading `TODO.md` and `GEMINI.md`. Choose a high-priority task from `TODO.md` or identify a clear UI/UX/Performance/SEO improvement.
- **Code Style:** Keep components small and functional. Use clear, descriptive names. Adhere to the existing Vanilla CSS styling.
- **Verification:** Always run `npm run lint` and `npm run build` before considering your task complete.
- **Safety:** Do not modify the deployment pipeline unless explicitly asked.

## Deployment
Managed via the parent `personal-website-project` repository.
