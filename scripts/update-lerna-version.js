#!/usr/bin/env node

/**
 * Update lerna.json version for backward compatibility with hotfix releases.
 *
 * After migrating to NX Release, lerna.json is no longer automatically updated.
 * However, hotfix releases on older versions still use lerna.json to determine
 * the current version. This script ensures lerna.json stays in sync with the
 * actual version after each release.
 *
 * Usage:
 *   node scripts/update-lerna-version.js <version>
 *   Example: node scripts/update-lerna-version.js 0.58.0-rc.50
 */

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const workspaceRoot = join(__dirname, '..');
const lernaJsonPath = join(workspaceRoot, 'lerna.json');

function updateLernaVersion(newVersion) {
    if (!newVersion) {
        console.error('Error: Version argument is required');
        console.error('Usage: node scripts/update-lerna-version.js <version>');
        process.exit(1);
    }

    try {
        // Read current lerna.json
        const lernaContent = readFileSync(lernaJsonPath, 'utf-8');
        const lernaJson = JSON.parse(lernaContent);
        const oldVersion = lernaJson.version;

        // Update version
        lernaJson.version = newVersion;

        // Write back to file with consistent formatting
        writeFileSync(lernaJsonPath, JSON.stringify(lernaJson, null, 4) + '\n');

        console.log(`✓ Updated lerna.json version: ${oldVersion} → ${newVersion}`);
    } catch (error) {
        console.error('Error updating lerna.json:', error.message);
        process.exit(1);
    }
}

// Get version from command line argument
const version = process.argv[2];
updateLernaVersion(version);
