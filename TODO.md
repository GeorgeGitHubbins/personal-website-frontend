# Project Roadmap & Tasks
## Completed
- [x] Initial React scaffolding (Vite + TypeScript).
- [x] S3 Bucket creation and Static Website Hosting configuration.
- [x] GitHub Action for daily automation (04:00 UTC).
- [x] Initial UI migration from Google Sites content.
- [x] Implement a "Contact Me" section/form with Google Forms iframe.
- [x] Add a custom favicon ( George's profile ).
- [x] Fix SPA routing (S3/CloudFront error document redirection).
- [x] Remove ".pdf" suffixes from Selected Work headers in `Projects.tsx`.
- [x] Remove redundant "View full screen" links in `Projects.tsx`.
- [x] Add a "Last Updated" timestamp to the footer.
- [x] Correctly categorize Data Wise as a minor (Education) and InstantFlows as professional experience.
- [x] Optimize SEO (meta tags, title, Open Graph).
- [x] Add a "Technical Projects" section to the UI with real data and placeholders.
- [x] Improve mobile responsiveness for the contact form and general layout.
- [x] Improve UI/UX for the "Work Experience" and "Selected Work" section descriptions.

## Current Goal: Refine & Improve
- [x] Audit links in the footer and ensure they all work.
- [x] Enhance GithubStats with last commit message and repository link.

## Future Improvements (Autonomous Selection)
- [ ] **UI/UX & Core Features**
    - [x] Implement Dark Mode toggle (respecting system/user preferences).
    - [ ] dont use the bulletpoints on the education cards, they dont look good with current formatting
    - [x] Add smooth scroll animations for section transitions (e.g., Framer Motion).
    - [x] Create an interactive Skills Radar chart or categorized badge system.
    - [x] Implement a "Scroll to Top" button for improved navigation.
    - [x] homepage FAQ has an incorrect bachelor's study. it should be industrial engineering and management. must be corrected
    - [x] Implement a vertical timeline for the Experience page.
    - [ ] Optimize image assets with WebP conversion and responsive source sets.
    - [x] Add unit tests for core components (Header, Skills) using Vitest.
    - [ ] Add E2E tests for core navigation and form components.
- [ ] **Content & Blog Ideas**
    - [ ] [Blog] "From Google Sites to React: Why I migrated my personal brand."
    - [ ] [Blog] "Automating a Personal Website with Gemini CLI and GitHub Actions."
    - [ ] [Blog] "Building a Serverless Portfolio on AWS: S3, CloudFront, and Route 53."
    - [ ] [Blog] "Data-Driven Decisions in Systems Engineering: A Case Study."
    - [ ] [Blog] "The Future of AI-Powered Development: My experience with Gemini CLI."
- [ ] **Innovative & Experimental Features**
    - [x] "AI Career Assistant (Static)": A client-side, searchable "Knowledge Base" (using Fuse.js or pre-indexed FAQ) trained on your CV/projects to answer common recruiter questions without API costs.
    - [ ] "Interactive Career Timeline": A visual, draggable journey through your professional history (SVG or Canvas-based).
    - [x] "Live Site Stats": A dashboard showing GitHub activity (via free public API).
    - [ ] The github dashboard is not clear to the uninformed visitor. I suggest an explainer and maybe a 1-2 sentence description of the last changes (that would have to be updated at the end of every run), also put it below the skills section, doesn't look nice next to it
    - [ ] "Project Playground": A dedicated area for hosting small, interactive web experiments or prototypes.
- [ ] Secure the frontend (CSP headers via CloudFront).

