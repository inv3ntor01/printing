# Printing

A print-shop web application for requesting quotes, submitting artwork, and
managing print orders. Built on Laravel 13 with an Inertia + React frontend,
orchestrated locally and in production with LaraKube on k3s.

## Tech Stack

- **Backend:** Laravel 13, PHP 8.5, Postgres (pgvector)
- **Frontend:** Inertia.js 3, React 19, TypeScript, Tailwind CSS 4, Vite
- **Auth:** Laravel Fortify (registration, login, email verification, password
  reset, two-factor authentication, passkeys), Socialite (OAuth providers)
- **Authorization:** spatie/laravel-permission
- **Services:** Redis (cache / session / queue), MinIO (S3 object storage),
  Mailpit (dev mail)
- **Infrastructure:** LaraKube CLI, k3s cluster, Traefik ingress

## Features

### Printing Services

| Service | Details |
| --- | --- |
| Document Printing | Letter, legal, folio, A4, and A3 on premium stocks |
| Sticker Paper Printing | Custom labels and stickers, glossy / matte / custom shapes |
| Photo Printing | ID photos, passports, presentations — 2x2, 1x1, A6, A4 |
| Document Delivery | Same-day, secure, city-wide delivery |
| Typing Services | Encoding, transcription, formatting |
| Business Cards & Calling Cards | Glossy, matte, textured, express |

### Customer Experience

- **Home** — services, production stats, advantages, CTA
- **Services** — full service catalog with capabilities
- **Print** — dedicated print ordering page
- **Request Quote** — multi-field quote form with artwork/spec upload
  (PDF, DOC, DOCX, PNG, JPG, AI, PSD, EPS; up to 50MB), dimensions in mm,
  paper stock, quantity, and finishing requirements
- **Order Tracking** — customers can view their orders and leave comments
- **Contact Us** — contact form with direct production line details
- **Legal** — privacy, terms, compliance, and IP infringement pages
- **Resume Customization** — resume services page

### Orders & Quotes

- Quote lifecycle with statuses: `pending → quoted → approved →
  in_production → shipping → delivered`, or `cancelled`
- Payment status tracking: `unpaid`, `partial`, `paid`
- Admin quote amounts, admin notes, and timestamps (`quoted_at`)
- Per-order comment threads between customers and staff
- Uploaded artwork stored via object storage (MinIO) with original filename

### Admin Panel

- **Dashboard** — order counts, revenue, status breakdown, recent orders
- **Orders** — list, view details, update status / quote / payment, read comments
- **Services** — full CRUD for the service catalog, permission-gated via
  `service.view`, `service.create`, `service.edit`, `service.delete`

### Roles & Permissions

- `admin` — full access (seeded with `admin@printing.test`)
- Registered users are implicit customers; the dashboard renders an admin or
  customer view based on role

### User Settings

- **Profile** — update name / email, delete account
- **Security** — change password, manage two-factor authentication and passkeys
- **Appearance** — light / dark mode (with system detection)

## Development

All artisan, composer, and npm commands run inside the LaraKube cluster via the
CLI proxy, never directly on the host:

```bash
larakube up                # bring up the local cluster
larakube-cli artisan about # run artisan in the web pod
larakube shell web         # open a shell in the web pod
```

### Local URLs

| Service | URL |
| --- | --- |
| Primary application | https://printing.kube |
| Vite asset server | https://vite.printing.kube |
| Meilisearch console | https://meilisearch.printing.kube |
| MinIO S3 API | https://s3.printing.kube |
| MinIO console | https://s3-console.printing.kube |

Map the cluster IP to these hosts in `/etc/hosts` and accept the self-signed
Traefik certificate.

## Running Tests

**Always run the test suite before committing or pushing to GitHub.** Tests are
seeded and must pass on the current branch before any commit is made.

```bash
larakube-cli artisan test
```

or, equivalently:

```bash
larakube-cli php vendor/bin/phpunit
```

A failed suite must be resolved (and the fix covered by the existing tests)
before committing.

## Contribution Checklist

Before committing or pushing:

1. Run the full test suite — `larakube-cli artisan test` — and confirm it is green.
2. Run static analysis and linting — `larakube-cli artisan pint` (or `php
   vendor/bin/pint`), `phpstan`, and the frontend build/typecheck.
3. Verify the app boots in the cluster — `larakube-cli artisan about` and
   `larakube-cli artisan route:list`.
4. Commit with a clear message describing the change.
