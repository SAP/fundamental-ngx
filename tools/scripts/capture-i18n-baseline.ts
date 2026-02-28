#!/usr/bin/env ts-node

/**
 * i18n Migration Baseline Measurement Script
 *
 * Captures comprehensive performance and size metrics before signal migration.
 * Run this script to establish baseline, then run again after migration to compare.
 *
 * Usage:
 *   npx ts-node tools/scripts/capture-i18n-baseline.ts
 *   # or
 *   npm run i18n:baseline
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface BaselineMetrics {
    date: string;
    version: string;
    bundleSize: {
        library: {
            uncompressed: number;
            gzipped: number;
            mainBundle: string;
        };
        docsApp: {
            total: number;
            mainBundleSize: number;
        };
    };
    performance: {
        resolutionTime: {
            measured: boolean;
            note: string;
        };
    };
    build: {
        coldBuildTime: number;
        incrementalBuildTime: number;
        testExecutionTime: number;
        typecheckTime: number;
    };
    code: {
        linesOfCode: number;
        numberOfFiles: number;
        testCoverage: number;
    };
}

function execCommand(command: string, silent = false): string {
    try {
        return execSync(command, {
            encoding: 'utf-8',
            stdio: silent ? 'pipe' : 'inherit'
        });
    } catch {
        console.error(`❌ Command failed: ${command}`);
        return '';
    }
}

function getDirectorySize(dirPath: string): number {
    if (!fs.existsSync(dirPath)) {
        return 0;
    }

    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            totalSize += getDirectorySize(filePath);
        } else {
            totalSize += stats.size;
        }
    }

    return totalSize;
}

function getGzipSize(filePath: string): number {
    if (!fs.existsSync(filePath)) {
        return 0;
    }

    const gzipPath = `${filePath}.gz`;
    execCommand(`gzip -c "${filePath}" > "${gzipPath}"`, true);

    if (!fs.existsSync(gzipPath)) {
        return 0;
    }

    const stats = fs.statSync(gzipPath);
    fs.unlinkSync(gzipPath);
    return stats.size;
}

function formatBytes(bytes: number): string {
    if (bytes === 0) {
        return '0 B';
    }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function formatTime(seconds: number): string {
    if (seconds < 60) {
        return `${seconds.toFixed(2)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
}

async function captureBaseline(): Promise<BaselineMetrics> {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 i18n Migration - Baseline Measurement                     ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const baseline: BaselineMetrics = {
        date: new Date().toISOString(),
        version: 'pre-migration',
        bundleSize: {
            library: {
                uncompressed: 0,
                gzipped: 0,
                mainBundle: ''
            },
            docsApp: {
                total: 0,
                mainBundleSize: 0
            }
        },
        performance: {
            resolutionTime: {
                measured: false,
                note: 'Run performance tests manually: nx test i18n --test-file=*performance*.spec.ts'
            }
        },
        build: {
            coldBuildTime: 0,
            incrementalBuildTime: 0,
            testExecutionTime: 0,
            typecheckTime: 0
        },
        code: {
            linesOfCode: 0,
            numberOfFiles: 0,
            testCoverage: 0
        }
    };

    // ═══════════════════════════════════════════════════════════════════
    // 1. BUNDLE SIZE METRICS
    // ═══════════════════════════════════════════════════════════════════
    console.log('📦 [1/5] Measuring Bundle Size');
    console.log('─────────────────────────────────────────────────────────────────');

    console.log('  → Building i18n library in production mode...');
    execCommand('nx build i18n --configuration=production');

    const libDistPath = 'dist/libs/i18n';
    const fesmPath = path.join(libDistPath, 'fesm2022');

    if (fs.existsSync(fesmPath)) {
        const files = fs.readdirSync(fesmPath).filter((f) => f.endsWith('.mjs'));
        console.log(`  → Found ${files.length} bundle file(s) in ${fesmPath}`);

        if (files.length > 0) {
            const mainBundle = path.join(fesmPath, files[0]);
            baseline.bundleSize.library.mainBundle = files[0];

            const stats = fs.statSync(mainBundle);
            baseline.bundleSize.library.uncompressed = stats.size;
            console.log(`  → Main bundle: ${files[0]} (${formatBytes(stats.size)})`);

            console.log('  → Calculating gzip size...');
            baseline.bundleSize.library.gzipped = getGzipSize(mainBundle);
            console.log(`  → Gzipped: ${formatBytes(baseline.bundleSize.library.gzipped)}`);
        }
    } else {
        console.log(`  ⚠️  Bundle path not found: ${fesmPath}`);
    }

    console.log('  ✓ Library bundle size measured\n');

    // Measure docs app size (optional, may take time)
    console.log('  → Building docs app (this may take a while)...');
    const docsDistPath = 'dist/apps/fundamental-ngx-docs';

    try {
        execCommand('nx build fundamental-ngx-docs --configuration=production');

        if (fs.existsSync(docsDistPath)) {
            baseline.bundleSize.docsApp.total = getDirectorySize(docsDistPath);
            console.log(`  → Docs app total size: ${formatBytes(baseline.bundleSize.docsApp.total)}`);

            // Find main bundle
            const browserPath = path.join(docsDistPath, 'browser');
            if (fs.existsSync(browserPath)) {
                const mainFiles = fs.readdirSync(browserPath).filter((f) => f.startsWith('main.') && f.endsWith('.js'));
                if (mainFiles.length > 0) {
                    const mainPath = path.join(browserPath, mainFiles[0]);
                    baseline.bundleSize.docsApp.mainBundleSize = fs.statSync(mainPath).size;
                    console.log(`  → Main bundle: ${formatBytes(baseline.bundleSize.docsApp.mainBundleSize)}`);
                }
            }
        }
    } catch (error) {
        console.log('  ⚠️  Docs app build skipped (error occurred)');
    }

    console.log('  ✓ Bundle size measurement complete\n');

    // ═══════════════════════════════════════════════════════════════════
    // 2. BUILD PERFORMANCE METRICS
    // ═══════════════════════════════════════════════════════════════════
    console.log('⏱️  [2/5] Measuring Build Performance');
    console.log('─────────────────────────────────────────────────────────────────');

    // Cold build (clean first)
    console.log('  → Performing cold build (clean + build)...');
    execCommand('rm -rf dist/libs/i18n', true);
    execCommand('rm -rf node_modules/.cache/nx', true);

    const coldStart = Date.now();
    execCommand('nx build i18n');
    baseline.build.coldBuildTime = (Date.now() - coldStart) / 1000;
    console.log(`  → Cold build time: ${formatTime(baseline.build.coldBuildTime)}`);

    // Incremental build (touch one file)
    console.log('  → Performing incremental build (touch file + rebuild)...');
    execCommand('touch libs/i18n/src/lib/pipes/fd-translate.pipe.ts', true);

    const incrementalStart = Date.now();
    execCommand('nx build i18n');
    baseline.build.incrementalBuildTime = (Date.now() - incrementalStart) / 1000;
    console.log(`  → Incremental build time: ${formatTime(baseline.build.incrementalBuildTime)}`);

    // Type-check only
    console.log('  → Measuring type-check time...');
    const typecheckStart = Date.now();
    execCommand('nx run i18n:lint --skip-nx-cache');
    baseline.build.typecheckTime = (Date.now() - typecheckStart) / 1000;
    console.log(`  → Type-check time: ${formatTime(baseline.build.typecheckTime)}`);

    console.log('  ✓ Build performance measured\n');

    // ═══════════════════════════════════════════════════════════════════
    // 3. TEST PERFORMANCE METRICS
    // ═══════════════════════════════════════════════════════════════════
    console.log('🧪 [3/5] Measuring Test Performance');
    console.log('─────────────────────────────────────────────────────────────────');

    console.log('  → Running i18n test suite...');
    const testStart = Date.now();
    execCommand('nx test i18n --run --skip-nx-cache');
    baseline.build.testExecutionTime = (Date.now() - testStart) / 1000;
    console.log(`  → Test execution time: ${formatTime(baseline.build.testExecutionTime)}`);

    console.log('  ✓ Test performance measured\n');

    // ═══════════════════════════════════════════════════════════════════
    // 4. CODE METRICS
    // ═══════════════════════════════════════════════════════════════════
    console.log('📝 [4/5] Measuring Code Metrics');
    console.log('─────────────────────────────────────────────────────────────────');

    const i18nSrcPath = 'libs/i18n/src';

    // Count files
    const countFiles = (dir: string, ext: string): number => {
        let count = 0;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                count += countFiles(fullPath, ext);
            } else if (fullPath.endsWith(ext)) {
                count++;
            }
        }
        return count;
    };

    baseline.code.numberOfFiles = countFiles(i18nSrcPath, '.ts');
    console.log(`  → TypeScript files: ${baseline.code.numberOfFiles}`);

    // Count lines of code
    const countLines = (dir: string): number => {
        let lines = 0;
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                lines += countLines(fullPath);
            } else if (fullPath.endsWith('.ts') && !fullPath.endsWith('.spec.ts')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                lines += content.split('\n').length;
            }
        }
        return lines;
    };

    baseline.code.linesOfCode = countLines(i18nSrcPath);
    console.log(`  → Lines of code (non-test): ${baseline.code.linesOfCode.toLocaleString()}`);

    // Test coverage (if available)
    const coverageFile = 'coverage/libs/i18n/coverage-summary.json';
    if (fs.existsSync(coverageFile)) {
        try {
            const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf-8'));
            baseline.code.testCoverage = coverage.total?.lines?.pct || 0;
            console.log(`  → Test coverage: ${baseline.code.testCoverage.toFixed(2)}%`);
        } catch (error) {
            console.log('  ⚠️  Could not parse coverage file');
        }
    } else {
        console.log('  ⚠️  Coverage file not found (run tests with coverage first)');
    }

    console.log('  ✓ Code metrics measured\n');

    // ═══════════════════════════════════════════════════════════════════
    // 5. SAVE BASELINE
    // ═══════════════════════════════════════════════════════════════════
    console.log('💾 [5/5] Saving Baseline Data');
    console.log('─────────────────────────────────────────────────────────────────');

    const outputPath = 'i18n-baseline-metrics.json';
    fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2));
    console.log(`  → Saved to: ${outputPath}`);

    // Also save human-readable version
    const readablePath = 'i18n-baseline-metrics.txt';
    const readableContent = `
i18n Migration - Baseline Metrics
═══════════════════════════════════════════════════════════════════

Captured: ${new Date(baseline.date).toLocaleString()}
Version: ${baseline.version}

BUNDLE SIZE
───────────────────────────────────────────────────────────────────
Library (i18n package):
  • Uncompressed:    ${formatBytes(baseline.bundleSize.library.uncompressed)}
  • Gzipped:         ${formatBytes(baseline.bundleSize.library.gzipped)}
  • Main bundle:     ${baseline.bundleSize.library.mainBundle}

Documentation App:
  • Total size:      ${formatBytes(baseline.bundleSize.docsApp.total)}
  • Main bundle:     ${formatBytes(baseline.bundleSize.docsApp.mainBundleSize)}

BUILD PERFORMANCE
───────────────────────────────────────────────────────────────────
  • Cold build:      ${formatTime(baseline.build.coldBuildTime)}
  • Incremental:     ${formatTime(baseline.build.incrementalBuildTime)}
  • Type-check:      ${formatTime(baseline.build.typecheckTime)}
  • Test suite:      ${formatTime(baseline.build.testExecutionTime)}

CODE METRICS
───────────────────────────────────────────────────────────────────
  • TypeScript files: ${baseline.code.numberOfFiles}
  • Lines of code:    ${baseline.code.linesOfCode.toLocaleString()}
  • Test coverage:    ${baseline.code.testCoverage.toFixed(2)}%

PERFORMANCE TESTS
───────────────────────────────────────────────────────────────────
  ⚠️  Performance benchmarks not included in automated run
  → Run manually: nx test i18n --test-file=*performance*.spec.ts

═══════════════════════════════════════════════════════════════════
`.trim();

    fs.writeFileSync(readablePath, readableContent);
    console.log(`  → Saved readable version to: ${readablePath}`);
    console.log('  ✓ Baseline data saved\n');

    return baseline;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════

async function main(): Promise<void> {
    try {
        const baseline = await captureBaseline();

        // Print summary
        console.log('╔════════════════════════════════════════════════════════════════╗');
        console.log('║  ✅ Baseline Capture Complete                                 ║');
        console.log('╚════════════════════════════════════════════════════════════════╝\n');

        console.log('📊 BASELINE SUMMARY');
        console.log('════════════════════════════════════════════════════════════════');
        console.log(`Bundle Size (gzipped):     ${formatBytes(baseline.bundleSize.library.gzipped)}`);
        console.log(`Cold Build Time:           ${formatTime(baseline.build.coldBuildTime)}`);
        console.log(`Incremental Build:         ${formatTime(baseline.build.incrementalBuildTime)}`);
        console.log(`Test Execution:            ${formatTime(baseline.build.testExecutionTime)}`);
        console.log(`Lines of Code:             ${baseline.code.linesOfCode.toLocaleString()}`);
        console.log(`TypeScript Files:          ${baseline.code.numberOfFiles}`);
        console.log(`Test Coverage:             ${baseline.code.testCoverage.toFixed(2)}%`);
        console.log('════════════════════════════════════════════════════════════════\n');

        console.log('📁 OUTPUT FILES:');
        console.log('  • i18n-baseline-metrics.json  (machine-readable)');
        console.log('  • i18n-baseline-metrics.txt   (human-readable)');
        console.log('\n💡 NEXT STEPS:');
        console.log('  1. Review the baseline metrics above');
        console.log('  2. Commit the baseline files to git');
        console.log('  3. Begin the i18n signal migration');
        console.log('  4. After migration, run this script again with output to i18n-after-metrics.json');
        console.log('  5. Compare results with: npx ts-node tools/scripts/compare-i18n-metrics.ts\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error capturing baseline:', error);
        process.exit(1);
    }
}

main();
