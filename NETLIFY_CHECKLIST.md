# Netlify Deployment Checklist

## Before Deploying

- [ ] All environment variables collected from Firebase console
- [ ] `.env.local` file has all `NEXT_PUBLIC_FIREBASE_*` variables (for local testing)
- [ ] `npm run build` completes successfully
- [ ] `npm run typecheck` shows 0 errors
- [ ] `npm run lint` shows acceptable warnings (mostly unused vars)

## During Netlify Setup

- [ ] GitHub repo is connected to Netlify
- [ ] `netlify.toml` is recognized (auto-detected)
- [ ] Site Settings → Build & deploy → Build command: `npm run build` ✓
- [ ] Site Settings → Build & deploy → Publish directory: `.next/public` ✓
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTO_INIT` = `"false"` (or leave unset)

## Post-Deploy Verification

- [ ] Site is live at Netlify URL (or custom domain)
- [ ] Home page loads without errors
- [ ] Login flow works (Firebase Auth connected)
- [ ] Can create/read data (Firestore connected)
- [ ] AI features respond (budget coach, habit suggestions, etc.)
- [ ] Progressive Web App can install (PWA works)

## Monitoring

- [ ] Netlify Deploy logs show build success
- [ ] Netlify Functions logs (if AI endpoints timeout)
- [ ] Firebase Console shows auth/firestore activity

## Quick Command Reference

**Local development:**
```bash
npm run dev         # Start dev server (localhost:9002)
npm run build       # Test production build locally
npm run typecheck   # Validate TypeScript
npm run lint        # Check code quality
```

**After pushing to GitHub:**
- Netlify auto-builds and deploys
- Monitor Deploys tab for status
- Latest deploy is live automatically

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Build fails: "Firebase not initialized" | Check `NEXT_PUBLIC_FIREBASE_*` env vars in Netlify |
| Login page shows but can't sign in | Verify Firebase Auth domain in console settings |
| No data loads (blank pages) | Check Firestore security rules allow your auth users |
| AI requests timeout | Use Netlify Pro (26s timeout) or simplify requests |
| PWA won't install | Ensure manifest.json is in public folder |
