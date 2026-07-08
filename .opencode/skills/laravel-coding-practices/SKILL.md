---
name: laravel-coding-practices
description: Use when writing or reviewing Laravel + Inertia React code — covering controller patterns, Eloquent conventions, validation, routing, queue jobs, mailables, notifications, testing, and Inertia response shapes. Do NOT use for general cluster or infrastructure tasks.
---

# Laravel Coding Practices

## Running commands

Always run `php`, `artisan`, `composer`, `npm`, `node`, and `bun` commands through `larakube-cli_run-proxy` — never directly on the host.

## General

- Controllers are skinny — delegate to services, actions, or form requests.
- Use **Form Requests** for validation (`php artisan make:request StoreOrderRequest`), not inline `$request->validate()`.
- Use **Route Model Binding** wherever possible.
- Prefer `CursorPaginator` over `LengthAwarePaginator` for large datasets.
- Use `Str::uuid()` (not `uniqid()` or Ramsey UUID directly).

## Eloquent

- Use `$casts` on models for type coercion (e.g. `'payment_status' => 'string'`).
- Use local/global scopes for reusable query constraints.
- Use `<?php` strict types at the file level.
- Accessors for computed fields (e.g. `getNameAttribute`), **not** appended attributes that run queries.

## Inertia + React

- Return data via `Inertia::render('Page', [...])` — pass only what the view needs.
- Use **Wayfinder** (`route()` JS helper) for named routes, not `axios` URL strings.
- TypeScript types mirror the PHP-side shape — keep them in sync.
- Use Tailwind CSS v4 — no Blade templates for frontend.
- Vite dev server runs on a separate subdomain (`vite.printing.kube`).

## Testing

- Feature tests for controllers, Unit tests for services/actions.
- Use `RefreshDatabase` trait for integration tests.
- Factory states for different scenarios (e.g. `Order::factory()->paid()->create()`).
