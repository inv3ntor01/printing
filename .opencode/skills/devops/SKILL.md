---
name: devops
description: Use when managing Docker, k3s, Traefik reverse proxy, CI/CD pipelines, deployment workflows, infrastructure-as-code, containerization, or monitoring for this LaraKube-managed project. Always use larakube-cli proxy for php/artisan/composer/npm commands. Do NOT use for Laravel application code.
---

# DevOps

## Local cluster

- This project runs on **k3s** managed by LaraKube.
- Use `larakube-cli_orchestrate-verb` to control the cluster lifecycle.
- Use `larakube-cli_local-health-check` to diagnose issues.

## Running commands

Never run `php`, `artisan`, `composer`, `npm`, `node`, or `bun` locally. Always proxy through `larakube-cli_run-proxy` to execute inside the cluster.

## Domains & reverse proxy

- **Traefik** is the ingress controller — all `.kube` domains route through it.
- Application: `printing.kube`
- Vite dev: `vite.printing.kube`
- Mailpit: `mail.printing.kube`
- Traefik dashboard: `traefik.printing.kube`

## Docker

- All services run inside k3s, not standalone Docker Compose.
- For custom Docker images, use `Dockerfile` in the project root and tag with the project prefix.

## CI/CD

- GitHub Actions workflows live in `.github/workflows/`.
- Run `composer install --no-dev --optimize-autoloader` for production builds.
- Run `php artisan optimize` on deploy.
- Run `php artisan migrate --force` as part of deployment, not build.
