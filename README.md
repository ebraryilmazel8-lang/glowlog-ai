# Glow Log — AI Skincare Companion

AI-powered skincare analysis and routine tracking app built with Next.js, Tailwind CSS, NextAuth, and Google Gemini API.

## Features

- **AI Skin Analysis**: Upload a selfie and get detailed skin analysis powered by Gemini AI
- **Routine Tracking**: Log your morning and evening skincare routines daily
- **Personalized Recommendations**: Get AI-generated skincare recommendations based on your skin type
- **Google/GitHub Auth**: Secure login with NextAuth

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Google Gemini API
- Vercel

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your keys
3. Run `npm install`
4. Run `npm run dev`

## Environment Variables

- `GEMINI_API_KEY` — Google Gemini API key
- `NEXTAUTH_SECRET` — NextAuth secret (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` — Your app URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth credentials
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth credentials
