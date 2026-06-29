# Skill: Deployment

## Purpose
Prepare and deploy the app to production — build optimization, environment config, and deployment to the right platform.

## When to trigger
- User says: "use the deployment skill", "deploy the app", "prepare for release"

## Prerequisites
- All features reviewed and tested
- Documentation updated

## Step 1: Pre-deployment Checklist

Before deploying, verify:
- [ ] All tests pass: `bun run test:run`
- [ ] No TypeScript errors: `bun run build` (no errors)
- [ ] No lint errors: `bun run lint`
- [ ] `.env.example` is up to date with all required variables
- [ ] No `console.log` statements in code
- [ ] No hardcoded dev URLs (all use env variables)
- [ ] Error boundaries in place for critical components

## React Web Deployment

### Option A: Vercel (recommended — zero config)
```bash
bun install -g vercel
vercel login
vercel --prod
```
Set env variables in Vercel dashboard → Settings → Environment Variables.

### Option B: Netlify
```bash
bun run build
# Upload dist/ folder to Netlify, or:
bun install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option C: Self-hosted (VPS / Docker)
Generate `Dockerfile`:
```dockerfile
FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;  # Required for React Router
  }
}
```

```bash
docker build -t [app-name] .
docker run -p 80:80 [app-name]
```

## React Native Deployment

### Expo Go (testing / internal)
```bash
bunx expo publish
# Share the QR code or link
```

### Android — Google Play
```bash
eas build --platform android --profile production
eas submit --platform android
```

### iOS — App Store
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

Requires `eas.json` config:
```json
{
  "build": {
    "production": {
      "android": { "buildType": "apk" },
      "ios": { "simulator": false }
    }
  }
}
```

## Output Format

```
### 🚀 Deployment Ready: [App Name]

**Platform:** [Web/iOS/Android]
**Build status:** ✅ Passing
**Deployment target:** [Vercel/Netlify/Play Store/App Store]

**Steps completed:**
- [ ] Pre-deployment checklist passed
- [ ] Build successful
- [ ] Environment variables configured
- [ ] Deployed to [URL or store]

**Live URL / Build link:** [link]

**Monitoring:**
- Check errors at: [Sentry/LogRocket/Vercel Analytics]
- Check performance at: [Lighthouse/Web Vitals]
```

## Rules
- Never commit `.env` files — only `.env.example`
- Production build must be tested locally before deploying: `bun run build && bun run preview`
- Always use environment variables for API URLs, keys, and secrets
- Set up error monitoring before going live (Sentry free tier is sufficient)
- Always use `bun` commands, never `npm`
