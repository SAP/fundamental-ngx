#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all module files
const moduleFiles = execSync(
    'find libs/btp libs/cdk libs/core libs/cx libs/datetime-adapter libs/i18n libs/moment-adapter libs/platform -name "*.module.ts" -type f',
    { encoding: 'utf-8' }
)
    .trim()
    .split('\n')
    .filter(Boolean);

const deprecationComment = `/**
 * @deprecated
 * Use direct import of the component(s).
 */
`;

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

moduleFiles.forEach((file) => {
    try {
        const content = fs.readFileSync(file, 'utf-8');

        // Skip if already has @deprecated
        if (content.includes('@deprecated')) {
            console.log(`⏭️  Skipping (already has @deprecated): ${file}`);
            skippedCount++;
            return;
        }

        // Find the @NgModule decorator
        const ngModuleMatch = content.match(/@NgModule\s*\(/);
        if (!ngModuleMatch) {
            console.log(`⚠️  No @NgModule found: ${file}`);
            errorCount++;
            return;
        }

        const ngModuleIndex = ngModuleMatch.index;

        // Insert the deprecation comment right before @NgModule
        const newContent =
            content.substring(0, ngModuleIndex) + deprecationComment + '\n' + content.substring(ngModuleIndex);

        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errorCount++;
    }
});

console.log('\n=== Summary ===');
console.log(`✅ Updated: ${updatedCount}`);
console.log(`⏭️  Skipped: ${skippedCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📊 Total: ${moduleFiles.length}`);
