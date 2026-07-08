---
name: larakube-cli
description: Use when running any PHP, artisan, composer, or npm commands — always proxy them through larakube-cli rather than running locally. Also use for orchestrating the k3s cluster (up/down/heal/doctor), patching the .larakube.json blueprint, or inspecting LaraKube project health. Do NOT use for application-level coding tasks.
---

# LaraKube CLI

This project runs on a local **k3s** cluster managed by LaraKube. The LaraKube MCP server provides tools to manage it.

## Running commands — ALWAYS use the proxy

Never run `php`, `artisan`, `composer`, `npm`, `node`, or `bun` directly on the host. Always use `larakube-cli_run-proxy` to execute them **inside the cluster**.

- `artisan migrate` → `larakube-cli_run-proxy` with `tool: "artisan"`, `command: "migrate --force"`
- `composer install` → same tool with `tool: "composer"`, `command: "install"`
- `npm run build` → same tool with `tool: "npm"`, `command: "run build"`

## Common operations

- **Orchestrate**: `larakube-cli_orchestrate-verb` with verbs: `up` (start cluster and services), `down` (stop), `heal` (fix broken state), `doctor` (diagnose issues), `trust` (install CA), `about` (version info).
- **Blueprint patches**: Use `larakube-cli_patch-blueprint` to surgically add/remove/set `databases` (e.g. `mysql`, `redis`), `features`, `serverVariation`, or `phpVersion` in `.larakube.json`.
- **Proxy commands**: Use `larakube-cli_run-proxy` to run `artisan`, `composer`, `php`, `npm`, `node`, `bun` commands **inside the cluster** (not on the host). Always prefer this over running them locally.
- **Health**: `larakube-cli_local-health-check` to verify Docker, k3s, and networking.
- **Inspect**: `larakube-cli_inspect-local-code` to detect the project's tech stack and LaraKube status.

## Domain routing

- App: `printing.kube`
- Vite dev server: `vite.printing.kube`
- Mailpit: `mail.printing.kube`
- Traefik dashboard: `traefik.printing.kube`
