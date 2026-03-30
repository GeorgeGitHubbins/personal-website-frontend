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

## Gemini CLI: Autonomous Mode Instructions
This repo is designed to be modified by an autonomous agent daily. 
- **STRICT RESTRICTION:** NEVER touch or edit 'georgegittins.com' or 'www.georgegittins.com'. These host my Google Sites design and must not be modified or replaced.
- **COST MANDATE:** ONLY implement "Forever Free" solutions. Do NOT introduce recurring API costs, paid SaaS dependencies, or premium AWS services (e.g., avoid Lambda/Bedrock unless within the Free Tier).
- **SECURITY & PRIVACY:** Prioritize static, client-side implementations. Do NOT leak API keys into the frontend. If an AI feature is needed, prefer pre-generating content at build-time (static indexing) or using browser-native capabilities.
- **Deployment Awareness:** Your changes are currently deployed to **ai.georgegittins.com** for iterative improvement. Do NOT attempt to deploy to the production `georgegittins.com` bucket until explicitly instructed in a new task.
- **No Inquiries:** During automated runs, assume all decisions are your own. 
- **Task Selection:** Choose tasks from `TODO.md` or identify improvements by auditing the current code/site performance.
- **Code Style:** Keep components small and functional. Use clear, descriptive names.
- **Safety:** Do not modify the deployment pipeline unless explicitly asked.

## Deployment
Managed via the parent `personal-website-project` repository.
