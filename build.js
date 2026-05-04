// Conditional build: inject noindex meta + Disallow robots on non-prod (preview/dev).
// Vercel sets VERCEL_ENV to 'production' | 'preview' | 'development'.
const fs = require('node:fs');
const path = require('node:path');

const isProd = process.env.VERCEL_ENV === 'production';
const outDir = 'public';

fs.mkdirSync(outDir, { recursive: true });

let html = fs.readFileSync('index.html', 'utf8');

if (!isProd) {
  html = html.replace(
    '<head>',
    '<head>\n<meta name="robots" content="noindex, nofollow, noarchive">'
  );
  fs.writeFileSync(path.join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
} else {
  fs.writeFileSync(path.join(outDir, 'robots.txt'), 'User-agent: *\nAllow: /\n');
}

fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`Built public/ for VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'} (prod=${isProd})`);
