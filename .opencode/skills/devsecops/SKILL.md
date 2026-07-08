---
name: devsecops
description: Use when addressing security concerns — dependency scanning, secrets management, environment variable protection, SQL injection prevention, XSS/CSRF in Inertia, API authentication, rate limiting, CORS, CSP headers, container image scanning, or Laravel security hardening. Do NOT use for feature development or cluster orchestration.
---

# DevSecOps

## Laravel security defaults

- Laravel already applies: bcrypt hashing, prepared statements (Eloquent), CSRF protection, XSS escaping in Blade (not used here since it's Inertia), signed routes, and throttle middleware.
- All sensitive keys (`APP_KEY`, `DB_PASSWORD`, etc.) are in `.env` — never committed.
- Use `{env:VAR}` syntax in opencode MCP configs, never hardcoded secrets.

## Inertia-specific

- Inertia escapes all data by default — but never pass unsanitized user input directly to `Inertia::render`.
- Validate all server-sent props on the frontend TypeScript side.
- Use CSP headers in the Laravel middleware stack to restrict script sources.

## Container security

- Don't run containers as root — use `USER` in Dockerfile.
- Scan images with `trivy` or `docker scout` before deployment.
- Pin base image versions (e.g. `php:8.3-fpm-bookworm`), never `latest`.

## Dependency management

- Run `composer audit` regularly to check for known vulnerabilities.
- Use `npm audit` for frontend dependencies.
- Keep `composer.lock` and `package-lock.json` in version control.

## CI/CD security

- GitHub Secrets for all credentials — never plaintext in workflow files.
- Use `actions/checkout` with `persist-credentials: false` to prevent token leakage.
- Run `composer install --no-dev` for production builds to strip dev-only packages.
