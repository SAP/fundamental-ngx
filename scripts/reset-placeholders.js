#!/usr/bin/env node

/**
 * Reset dependency placeholders in library package.json files after nx release version.
 *
 * NX Release updates both version numbers AND inter-package dependencies with actual versions.
 * However, in our source files we want to keep placeholders like:
 * - "VERSION_PLACEHOLDER" for @fundamental-ngx/* dependencies
 * - "ANGULAR_VER_PLACEHOLDER" for @angular/* dependencies
 *
 * These placeholders get replaced during the build process by sync-versions generator.
 * This script restores the placeholders after nx release version runs.
 */

const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');

const workspaceRoot = join(__dirname, '..');

// Get list of release projects from nx.json
const nxJson = JSON.parse(readFileSync(join(workspaceRoot, 'nx.json'), 'utf-8'));
const projects = nxJson.release?.projects || [];

/**
 * Reset dependency versions to placeholders in a dependency object
 * @param {Object} dependencies - The dependencies object to process
 * @returns {boolean} - Whether any modifications were made
 */
function resetDependencyPlaceholders(dependencies) {
    let modified = false;

    if (!dependencies) {
        return modified;
    }

    Object.keys(dependencies).forEach((dep) => {
        if (dep.startsWith('@angular/')) {
            if (dependencies[dep] !== 'ANGULAR_VER_PLACEHOLDER') {
                dependencies[dep] = 'ANGULAR_VER_PLACEHOLDER';
                modified = true;
            }
        } else if (dep.startsWith('@fundamental-ngx/')) {
            if (dependencies[dep] !== 'VERSION_PLACEHOLDER') {
                dependencies[dep] = 'VERSION_PLACEHOLDER';
                modified = true;
            }
        } else if (dep.startsWith('@ui5/webcomponents')) {
            if (dependencies[dep] !== 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER') {
                dependencies[dep] = 'UI5_WEBCOMPONENTS_VER_PLACEHOLDER';
                modified = true;
            }
        } else if (dep === 'fundamental-styles') {
            if (dependencies[dep] !== 'FDSTYLES_VER_PLACEHOLDER') {
                dependencies[dep] = 'FDSTYLES_VER_PLACEHOLDER';
                modified = true;
            }
        } else if (dep === '@fundamental-styles/cx') {
            if (dependencies[dep] !== 'FDCXSTYLES_VER_PLACEHOLDER') {
                dependencies[dep] = 'FDCXSTYLES_VER_PLACEHOLDER';
                modified = true;
            }
        } else if (dep === '@sap-theming/theming-base-content') {
            if (dependencies[dep] !== 'THEMING_VER_PLACEHOLDER') {
                dependencies[dep] = 'THEMING_VER_PLACEHOLDER';
                modified = true;
            }
        }
    });

    return modified;
}

console.log('Resetting dependency placeholders in library package.json files...');

let filesUpdated = 0;

projects.forEach((projectName) => {
    const packageJsonPath = join(workspaceRoot, 'libs', projectName, 'package.json');

    if (!existsSync(packageJsonPath)) {
        console.log(`  ⚠️  Skipping ${projectName} - package.json not found`);
        return;
    }

    const content = readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(content);

    let modified = false;

    // Reset peerDependencies placeholders
    modified = resetDependencyPlaceholders(packageJson.peerDependencies) || modified;

    // Reset dependencies placeholders
    modified = resetDependencyPlaceholders(packageJson.dependencies) || modified;

    if (modified) {
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n');
        console.log(`  ✓ ${projectName}`);
        filesUpdated++;
    } else {
        console.log(`  - ${projectName} (no changes needed)`);
    }
});

console.log(`\nReset placeholders in ${filesUpdated} package.json file(s)`);
