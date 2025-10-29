```markdown
# free-zero-app

A small Next.js app built to use only free APIs (Hugging Face Inference optional, Open-Meteo, OpenStreetMap). This repo is ready to deploy to Vercel (free tier).

Features
- Weather lookup using Open-Meteo (no key required)
- Geocoding using OpenStreetMap / Nominatim (no key required)
- Optional text generation using Hugging Face Inference API (free tier — requires HF_API_KEY to enable)
- Minimal UI built with Next.js

Local setup
1. Clone or copy the repo.
2. Install dependencies:
   npm install

3. Run the dev server:
   npm run dev
   Open http://localhost:3000

Environment variables
- HF_API_KEY (optional) — your Hugging Face API token for text generation. If not set, the app returns a placeholder message and still runs.

Deploy to Vercel (free)
1. Create a Vercel account (free) and connect your GitHub.
2. Import this repository.
3. In your Vercel project settings, add the Environment Variable:
   HF_API_KEY = <your_huggingface_api_token> (optional)
4. Deploy.

Notes about free APIs
- Open-Meteo and OpenStreetMap/Nominatim are free and do not require keys, but may have usage/rate limits.
- Hugging Face offers free community usage/quotas for many models. If you need higher throughput or better models later, consider upgrading.

If you want me to produce a ZIP of these files, or to walk you step-by-step while you run the git commands, say "Please produce ZIP" or "Walk me through push" and I will guide you interactively.

License: MIT
```
