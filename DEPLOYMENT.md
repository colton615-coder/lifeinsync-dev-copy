# Deployment Guide

## Netlify Deployment

This Next.js app is configured for Netlify deployment via `netlify.toml`.

### Prerequisites

1. **Firebase Project** — Ensure you have a Firebase project with Auth and Firestore enabled
2. **Environment Variables** — Set these in Netlify Site Settings:
   - `NEXT_PUBLIC_FIREBASE_API_KEY` — From Firebase console
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_AUTO_INIT` — Set to `"false"` for Netlify (uses explicit config)

### Deploy Steps

1. **Connect GitHub**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Select your GitHub repo
   - Netlify auto-detects Next.js and uses `netlify.toml`

2. **Configure Environment**
   - In Site Settings → Build & deploy → Environment, add all `NEXT_PUBLIC_FIREBASE_*` variables
   - Copy values from your Firebase project settings

3. **Deploy**
   - Push to your main branch
   - Netlify automatically builds and deploys
   - Build time typically 2-3 minutes

### Known Limitations on Netlify

⚠️ **AI Features Timeout Risk**
- Server actions (AI flows) have a 26-second timeout on paid plans, 10 seconds on free
- Long AI requests may timeout; consider adding client-side fallbacks or reducing request complexity
- Current flows (budget coaching, habit suggestions) should work within these limits

✅ **Fully Supported**
- Next.js App Router
- Server Actions (getDailyPrompt, getAiKnoxResponse, etc.)
- Firebase Auth & Firestore
- Static Generation (ISG)
- Incremental Static Regeneration

### Environment-Specific Notes

**For Netlify:**
- `NEXT_PUBLIC_FIREBASE_AUTO_INIT` should be `"false"` or unset
- Explicit Firebase config (via env vars) is used automatically

**For Firebase Hosting (if you switch back):**
- Set `NEXT_PUBLIC_FIREBASE_AUTO_INIT=true`
- Firebase Hosting can auto-initialize via special environment files

### Build & Test Locally

```bash
npm run build       # Build production bundle
npm run start       # Start production server locally
npm run lint        # Check code quality
npm run typecheck   # TypeScript validation
```

### Troubleshooting

**Firebase connection errors:**
- Verify all `NEXT_PUBLIC_FIREBASE_*` env vars are set in Netlify
- Check Firebase Security Rules allow read/write for your auth users

**AI endpoint timeouts:**
- Keep AI requests under 5 seconds of processing
- Consider breaking large prompts into smaller calls
- Use Netlify's Pro/Business plan for longer timeouts (26s)

**Build failures:**
- Check Netlify build logs (Deploy section)
- Run `npm run build` locally to debug TypeScript/linting errors
- Ensure `package.json` build script is: `NODE_ENV=production next build`

### Rollback

To revert to a previous deployment:
- Go to Netlify Deploys → Click a previous deploy → "Publish deploy"

### Custom Domain

1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Update DNS records (Netlify provides instructions)
4. HTTPS is automatic via Let's Encrypt
