# Personal Website Frontend

## Project Overview
A React-based personal website for George Gittins, designed for continuous, autonomous evolution via Gemini CLI.

## Tech Stack
- **Framework:** React (Vite/TypeScript)
- **Deployment Target:** `dev.georgegittins.com` (S3 Bucket)
- **Styling:** Vanilla CSS (preferred for clean, LLM-friendly modification)

## Gemini CLI: Autonomous Mode Instructions
This repo is designed to be modified by an autonomous agent daily. 
- **Deployment Awareness:** Your changes are currently deployed to **dev.georgegittins.com** for iterative improvement. Do NOT attempt to deploy to the production `georgegittins.com` bucket until explicitly instructed in a new task.
- **No Inquiries:** During automated runs, assume all decisions are your own. 
- **Task Selection:** Choose tasks from `TODO.md` or identify improvements by auditing the current code/site performance.
- **Code Style:** Keep components small and functional. Use clear, descriptive names.
- **Safety:** Do not modify the deployment pipeline unless explicitly asked.

## Deployment
Managed via the parent `personal-website-project` repository.
