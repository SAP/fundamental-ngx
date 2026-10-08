// vitest runs with `globals: true` (see vitest.config.mjs), which injects
// `describe` / `it` / `expect` etc. as runtime globals. This reference pulls in
// their ambient type declarations so the TypeScript language server (and `tsc`)
// recognise them in *.spec.ts files. It's additive — unlike a `types: [...]`
// array in tsconfig, it doesn't disable auto-loading of node/Next ambient types.
/// <reference types="vitest/globals" />
