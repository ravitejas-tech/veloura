# Deployment

`npm run build` produces a **static website** in `out/`: plain HTML, CSS, JS, fonts, `sitemap.xml` and `robots.txt`. Any static host can serve it; no Node.js server is required.

Before deploying, set **`NEXT_PUBLIC_SITE_URL`** to your real domain, either in `.env.local` or in the host's environment variables. It's baked into the canonical URL, the social-share tags, the sitemap and robots.txt at build time.

---

## Vercel (recommended)

1. Push the project to GitHub, GitLab or Bitbucket.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repo. The Next.js preset is detected automatically.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL`.
4. Deploy, then add your domain under **Settings → Domains**.

## Netlify

1. **Add new site → Import an existing project** and pick the repo.
2. Build command: `npm run build`. Publish directory: `out`.
3. Add `NEXT_PUBLIC_SITE_URL` under **Site configuration → Environment variables**.

Or, without Git: run `npm run build` locally and drag the `out/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git.**
2. Framework preset: *Next.js (Static HTML Export)*. Build command: `npm run build`. Output: `out`.
3. Add `NEXT_PUBLIC_SITE_URL` (and `NODE_VERSION = 20` if the build uses an older Node).

## GitHub Pages

The simplest option is a **custom domain** (e.g. `www.your-domain.com`), which lets the site run from the root.

1. In the repo, go to **Settings → Pages → Source: GitHub Actions** and use the official *Next.js* workflow that GitHub suggests.
2. Add a `public/CNAME` file containing your domain.

If you deploy to `https://<user>.github.io/<repo>/` instead, add `basePath: "/<repo>"` to `next.config.ts`, and include the `/<repo>` path in `NEXT_PUBLIC_SITE_URL`.

## cPanel / Apache shared hosting

1. Run `npm run build` locally.
2. Upload the **contents** of `out/` into `public_html/` (with the File Manager or FTP).
3. Recommended: add this `.htaccess` next to `index.html` for compression and caching:

```apache
# Compress text files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>

# Cache hashed build assets for a year
<IfModule mod_headers.c>
  <FilesMatch "\.(js|css|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

ErrorDocument 404 /404.html
```

## Nginx

```nginx
server {
  server_name your-domain.com;
  root /var/www/veloura/out;

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml text/plain application/xml;

  location /_next/static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  location / {
    try_files $uri $uri.html $uri/ =404;
  }

  error_page 404 /404.html;
}
```

## After going live

- Open `https://your-domain.com/robots.txt` and `/sitemap.xml` and check that they show your domain.
- Submit the sitemap in Google Search Console. The full checklist is in [SEO.md](SEO.md).

## Need a server?

Static export (`output: "export"` in `next.config.ts`) covers everything this template does. If you later add server features, such as API routes, server actions or image optimisation, remove that line, change the `start` script in `package.json` to `next start`, and deploy to a Node host such as Vercel.
