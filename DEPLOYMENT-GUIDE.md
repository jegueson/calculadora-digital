# Deployment guide

Calculadora Digital is a static Next.js site. Production hosting is Cloudflare Workers static assets. HostGator, FTP, cPanel, and GitHub Pages deploys are retired.

DNS for `calculadora-digital.com.br` already uses Cloudflare nameservers. Email still uses HostGator. Do not change MX, SPF, or any other mail record when you point the website at Workers.

## Build

From this repository:

```bash
npm install
npm run build
```

- Build command: `npm run build`
- Output directory: `build` (`output: 'export'` and `distDir: 'build'` in `next.config.js`)
- URLs use a trailing slash (`trailingSlash: true`)

`npm run build` writes the static site into `build/`, including `404.html`, `public/_redirects`, and `public/_headers`.

## Cloudflare Workers

Configuration lives in `wrangler.jsonc`:

- `assets.directory`: `./build`
- `assets.not_found_handling`: `404-page`
- `assets.html_handling`: `auto-trailing-slash` (matches the Next.js trailing slash)

Connect the GitHub repository in the Cloudflare dashboard (Workers & Pages → Create → Workers → connect Git). Workers Builds uses two commands:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (the Cloudflare default)

`npx wrangler deploy` reads `wrangler.jsonc` and uploads `./build`. Do not set a second output directory that points somewhere else. Preview builds use `npx wrangler versions upload` (the Cloudflare preview default) and should not be promoted until the checks below pass.

Production deploys happen when the connected branch (usually `main`) is updated. Preview deploys can be enabled for pull requests in the same Cloudflare project.

There is no Worker script. The site is files only.

## Redirects and headers

`public/_redirects` and `public/_headers` are copied into `build/` and applied by Workers. They contain only rules that exist in the root `.htaccess`:

| Apache rule | Workers equivalent |
| --- | --- |
| 301 from `/*.html` to the same path without `.html` | `public/_redirects` |
| `Access-Control-Allow-Origin: *` | `public/_headers` |
| Serve `path.html` when that file exists | Workers HTML handling (not a redirect) |
| Send unknown URLs to `/index.html` | Not copied. `not_found_handling` is `404-page`, so unknown URLs return `404.html` |

`.htaccess` has no www-to-apex redirect, no cache rules, and no extra security headers. None were added.

## What was removed

These HostGator and GitHub Pages deploy paths are gone:

- `.cpanel.yml`
- `.github/workflows/deploy.yml` (FTP to `/public_html` and GitHub Pages)
- `.github/workflows/nextjs.yml` (GitHub Pages)

Do not upload `build/` by FTP. `cpanel-build.zip` is gitignored and must stay untracked.

## Check after a deploy

- `https://calculadora-digital.com.br/sitemap.xml` lists the calculator URLs with trailing slashes
- A canonical tag points at `https://calculadora-digital.com.br/.../`
- `https://calculadora-digital.com.br/robots.txt` is served
- `https://calculadora-digital.com.br/ads.txt` is served once that file exists in `public/` (it is not in the repo today)
- An unknown path returns 404, not the homepage
- `/alguma-pagina.html` redirects to `/alguma-pagina`
- MX still points at HostGator and SPF still includes `websitewelcome.com`

## Local preview

```bash
npm run dev
npm run build
```

`npm run dev` is the Next.js dev server. The production check is `npm run build`, then the contents of `build/`.
