# Findings: dynamic-component.service.ts

## 1. `createDynamicModule` uses deprecated NgModule APIs

**File:** `libs/cdk/utils/dynamic-component/dynamic-component.service.ts`

**Problem:** `createDynamicModule` relies on three deprecated Angular APIs:

- `Compiler` (injected service, deprecated)
- `NgModuleFactory` (parameter type, deprecated)
- `compileModuleAsync` (method on `Compiler`, deprecated)

These are NgModule-era lazy loading primitives that have no place in a standalone/Ivy-first codebase.

**Fix:** Replace `createDynamicModule` with a standalone-compatible approach:

- Accept a dynamic `import()` promise (or a pre-loaded `NgModuleRef`) instead of `Type<M> | NgModuleFactory<M>`
- Use `createComponent` with `environmentInjector` from a `createEnvironmentInjector` call, or simply pass the module's providers via `importProvidersFrom` when bootstrapping
- Remove `Compiler` from the injected dependencies entirely

**References:**

- https://angular.dev/guide/ngmodules/lazy-loading (migration to standalone lazy loading)
- `@angular/core` — `createEnvironmentInjector`, `importProvidersFrom`

---

## 2. `baseUrl` in tsconfig.base.json is deprecated in TypeScript 6+

**File:** `tsconfig.base.json`

**Problem:** `"baseUrl": "."` is deprecated as of TypeScript 6.0 and will stop working in TypeScript 7.0. It is currently silenced via `"ignoreDeprecations": "6.0"`.

**Fix:** Remove `baseUrl` and migrate path resolution to use `"rootDir"` (or rely solely on `"paths"` without `baseUrl`). Requires verifying that NX's module resolution layer continues to resolve `@fundamental-ngx/*` aliases correctly after the change. Consider switching `"moduleResolution"` from `"node"` to `"bundler"` as part of the same migration.

**References:**

- https://aka.ms/ts6 (TypeScript 6 migration guide)

---

## 3. TypeScript project references not configured (Option B for rootDir errors)

**Files:** All `libs/*/tsconfig.json` and `libs/*/tsconfig.lib.json`

**Problem:** The monorepo uses `moduleResolution: bundler` which resolves `paths` aliases to source files rather than declarations. Without TypeScript project references, TypeScript pulls in all cross-lib source files into each lib's compilation, causing `rootDir` violations (TS6059). Currently fixed with `rootDir: "../../"` in each `tsconfig.lib.json` (Option A).

The proper long-term fix is TypeScript project references (Option B): each lib declares `composite: true` and lists its dependencies in `references`, so TypeScript resolves them as pre-built declarations rather than source.

**What's needed:**

- Add `"composite": true` to all 15 `tsconfig.lib.json` files
- Add inter-lib `references` entries to each lib's `tsconfig.json` (e.g. `core` → `cdk`, `i18n`; `platform` → `cdk`, `core`, `i18n`)
- Enable `@nx/js` plugin in `nx.json` to keep references in sync via `typescript-sync` generator

**Dependency map:**

- `cdk` — no internal deps
- `i18n` → `cdk`
- `core` → `cdk`, `i18n`
- `platform` → `cdk`, `core`, `i18n`
- `btp` → `cdk`, `core`, `i18n`
- `cx` → `cdk`, `core`, `i18n`
- `datetime-adapter`, `moment-adapter` → `cdk`, `core`

**References:**

- https://www.typescriptlang.org/docs/handbook/project-references.html
- NX `@nx/js:typescript-sync` generator (can automate the reference entries)
