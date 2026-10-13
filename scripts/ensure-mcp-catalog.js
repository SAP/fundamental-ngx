#!/usr/bin/env node
'use strict';

/**
 * Pre-start check for the integrated Netlify dev assistant (started by
 * `yarn start` / `yarn start:netlify`). The `/api/mcp` Netlify Function imports
 * the generated MCP catalog, so this script makes sure that catalog exists.
 *
 * Behavior:
 *   - If `libs/mcp-server/src/data/components.json` exists → no-op (idempotent).
 *   - If it is missing → run `npx nx run mcp-server:extract-metadata` to build it.
 *
 * It NEVER deletes or overwrites an existing catalog. It does NOT check
 * `.env.local` or the standalone Next.js dependencies — BYOK via the UI works
 * without a local key, and Next is irrelevant to the integrated path.
 */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const catalog = path.join(root, 'libs/mcp-server/src/data/components.json');

if (fs.existsSync(catalog)) {
    console.log('✓ MCP catalog present (libs/mcp-server/src/data/components.json); skipping generation.');
    process.exit(0);
}

console.log('• MCP catalog missing — generating it with `nx run mcp-server:extract-metadata`...');

const result = spawnSync('npx', ['nx', 'run', 'mcp-server:extract-metadata'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
});

if (result.error) {
    console.error('\n✖ Failed to run the catalog generation command:', result.error.message);
    process.exit(1);
}

if (typeof result.status === 'number' && result.status !== 0) {
    console.error(`\n✖ Catalog generation exited with code ${result.status}.`);
    process.exit(result.status);
}

if (!fs.existsSync(catalog)) {
    console.error('\n✖ Catalog generation completed but components.json was not produced.');
    process.exit(1);
}

console.log('✓ MCP catalog generated.');
