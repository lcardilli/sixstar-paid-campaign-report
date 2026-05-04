# SIXSTAR — Paid Campaign Report

Static HTML report of SIXSTAR paid media performance, deployed on Vercel.

## Local preview
```bash
node build.js && open public/index.html
```

## Deploy
- Pushes to `main` deploy to production via Vercel's GitHub integration.
- All other branches and PRs deploy as previews with `noindex` + `Disallow: /` robots.

## Security
- Non-prod deployments inject `<meta name="robots" content="noindex, nofollow, noarchive">` and serve a disallow-all `robots.txt` (see `build.js`).
- No client-side API keys. No `.env` committed.
