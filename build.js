// Build: always inject noindex meta + Disallow robots.
// Client report sites are not for public discovery — same rule applies on production.
import fs from 'node:fs';
import path from 'node:path';

const outDir = 'public';
fs.mkdirSync(outDir, { recursive: true });

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  '<head>',
  '<head>\n<meta name="robots" content="noindex, nofollow, noarchive">'
);

fs.writeFileSync(path.join(outDir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`Built public/ — noindex applied for VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'}`);
