#!/usr/bin/env node
'use strict';

/**
 * Pre-start check for the chatbot server (started alongside the docs app by
 * `yarn start`). Verifies the three things the chatbot needs before it can run,
 * and fails with an actionable message listing everything that's missing.
 *
 * Note: the `.env.local` check only tests for the file's existence (a stat) —
 * its contents are never read or printed, so no secrets are exposed.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const problems = [];

// 1. Chatbot dependencies installed (the app has its own isolated node_modules).
if (!fs.existsSync(path.join(root, 'apps/chatbot/node_modules/next'))) {
    problems.push('Chatbot dependencies are not installed.\n' + '      Fix:  cd apps/chatbot && yarn install');
}

// 2. MCP catalog generated — the MCP server imports this at build/request time.
if (!fs.existsSync(path.join(root, 'libs/mcp-server/src/data/components.json'))) {
    problems.push(
        'MCP catalog is missing (libs/mcp-server/src/data/components.json);\n' +
            '      the MCP server has no components to answer with.\n' +
            '      Fix:  nx run mcp-server:extract-metadata'
    );
}

// 3. Env file present — the chatbot needs ONE model-provider key to start.
if (!fs.existsSync(path.join(root, 'apps/chatbot/.env.local'))) {
    problems.push(
        'apps/chatbot/.env.local is missing — the chatbot has no provider key.\n' +
            '      Fix:  create apps/chatbot/.env.local and set ONE provider key, e.g.\n' +
            '            GOOGLE_GENERATIVE_AI_API_KEY=...   (see apps/chatbot/README.md or apps/chatbot/.env.local.example for details)'
    );
}

if (problems.length > 0) {
    console.error('\n✖ Cannot start: the chatbot server prerequisites are not met.\n');
    problems.forEach((problem, i) => console.error(`  ${i + 1}. ${problem}\n`));
    console.error('Resolve the above, or run `yarn start:docs` to start only the docs app.\n');
    process.exit(1);
}

console.log('✓ Chatbot prerequisites OK (dependencies, components.json, .env.local).');
