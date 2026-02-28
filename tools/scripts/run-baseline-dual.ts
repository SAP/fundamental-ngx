#!/usr/bin/env ts-node

/**
 * i18n Baseline - Dual Measurement (Cold + Warm)
 *
 * Measures both scenarios:
 * 1. COLD: No cache (clean build from scratch)
 * 2. WARM: With cache (incremental developer workflow)
 *
 * This provides complete picture:
 * - Cold = reliable comparison (low variance)
 * - Warm = developer experience (real workflow)
 *
 * Usage:
 *   npx ts-node tools/scripts/run-baseline-dual.ts [cold-runs] [warm-runs]
 *   npx ts-node tools/scripts/run-baseline-dual.ts 5 5  (default)
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

interface Stats {
    median: number;
    mean: number;
    stdDev: number;
    min: number;
    max: number;
    cv: number; // Coefficient of Variation
}

interface ColdMetrics {
    bundleSize: {
        uncompressed: number;
        gzipped: number;
    };
    coldBuildTime: number;
    testExecutionTime: number;
    typecheckTime: number;
    linesOfCode: number;
    numberOfFiles: number;
}

interface WarmMetrics {
    incrementalBuildTime: number;
    testRerunTime: number;
}

interface DualBaseline {
    date: string;
    version: string;
    cold: {
        runs: number;
        bundleSize: {
            uncompressed: Stats;
            gzipped: Stats;
        };
        coldBuildTime: Stats;
        testExecutionTime: Stats;
        typecheckTime: Stats;
        code: {
            linesOfCode: number;
            numberOfFiles: number;
        };
        rawData: ColdMetrics[];
    };
    warm: {
        runs: number;
        incrementalBuildTime: Stats;
        testRerunTime: Stats;
        rawData: WarmMetrics[];
    };
}

function calculateStats(values: number[]): Stats {
    const sorted = [...values].sort((a, b) => a - b);
    const median =
        sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const cv = mean === 0 ? 0 : (stdDev / mean) * 100;

    return {
        median,
        mean,
        stdDev,
        min: Math.min(...values),
        max: Math.max(...values),
        cv
    };
}

function formatBytes(bytes: number): string {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function formatTime(seconds: number): string {
    return `${seconds.toFixed(2)}s`;
}

function formatCV(cv: number): string {
    if (cv < 5) {
        return `${cv.toFixed(2)}% ✅ Very Stable`;
    }
    if (cv < 10) {
        return `${cv.toFixed(2)}% ✓ Stable`;
    }
    return `${cv.toFixed(2)}% ⚠️  Variable`;
}

function execCommand(command: string, silent = false): string {
    try {
        return execSync(command, {
            encoding: 'utf-8',
            stdio: silent ? 'pipe' : 'inherit'
        });
    } catch {
        if (!silent) {
            console.error(`❌ Command failed: ${command}`);
        }
        return '';
    }
}

function cleanCache(): void {
    console.log('  → Cleaning cache (dist, .nx/cache, node_modules/.cache)...');
    execCommand('rm -rf dist/libs/i18n', true);
    execCommand('rm -rf .nx/cache', true);
    execCommand('rm -rf node_modules/.cache', true);
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

function countFiles(dir: string, ext: string): number {
    if (!fs.existsSync(dir)) {
        return 0;
    }
    let count = 0;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = `${dir}/${item}`;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            count += countFiles(fullPath, ext);
        } else if (fullPath.endsWith(ext)) {
            count++;
        }
    }
    return count;
}

function countLines(dir: string): number {
    if (!fs.existsSync(dir)) {
        return 0;
    }
    let lines = 0;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = `${dir}/${item}`;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            lines += countLines(fullPath);
        } else if (fullPath.endsWith('.ts') && !fullPath.endsWith('.spec.ts')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            lines += content.split('\n').length;
        }
    }
    return lines;
}

async function measureCold(runs: number): Promise<{ stats: any; raw: ColdMetrics[] }> {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  ❄️  COLD MEASUREMENTS (No Cache)                            ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('Measuring clean builds from scratch (most reliable for comparison)\n');

    const rawData: ColdMetrics[] = [];

    for (let i = 1; i <= runs; i++) {
        console.log(`\n${'═'.repeat(64)}`);
        console.log(`  COLD RUN ${i} of ${runs}`);
        console.log(`${'═'.repeat(64)}\n`);

        // Clean everything
        cleanCache();

        // 1. Measure cold build
        console.log('  [1/5] Cold build (from scratch)...');
        const coldStart = Date.now();
        execCommand('nx build i18n');
        const coldBuildTime = (Date.now() - coldStart) / 1000;
        console.log(`  → ${formatTime(coldBuildTime)}`);

        // 2. Measure bundle size
        console.log('  [2/5] Bundle size...');
        const mainBundle = 'dist/libs/i18n/fesm2022/fundamental-ngx-i18n.mjs';
        const uncompressed = fs.existsSync(mainBundle) ? fs.statSync(mainBundle).size : 0;
        const gzipped = fs.existsSync(mainBundle) ? getGzipSize(mainBundle) : 0;
        console.log(`  → Uncompressed: ${formatBytes(uncompressed)}`);
        console.log(`  → Gzipped: ${formatBytes(gzipped)}`);

        // 3. Measure test execution
        console.log('  [3/5] Test execution (fresh Jest cache)...');
        const testStart = Date.now();
        execCommand('nx test i18n --run --skip-nx-cache');
        const testExecutionTime = (Date.now() - testStart) / 1000;
        console.log(`  → ${formatTime(testExecutionTime)}`);

        // 4. Measure type-check
        console.log('  [4/5] Type-check (lint)...');
        const typecheckStart = Date.now();
        execCommand('nx run i18n:lint --skip-nx-cache');
        const typecheckTime = (Date.now() - typecheckStart) / 1000;
        console.log(`  → ${formatTime(typecheckTime)}`);

        // 5. Code metrics (same for all runs)
        console.log('  [5/5] Code metrics...');
        const linesOfCode = countLines('libs/i18n/src');
        const numberOfFiles = countFiles('libs/i18n/src', '.ts');
        console.log(`  → ${linesOfCode.toLocaleString()} LOC, ${numberOfFiles} files`);

        rawData.push({
            bundleSize: { uncompressed, gzipped },
            coldBuildTime,
            testExecutionTime,
            typecheckTime,
            linesOfCode,
            numberOfFiles
        });

        console.log(`\n✓ Cold run ${i} complete\n`);

        if (i < runs) {
            console.log('Waiting 3 seconds before next run...');
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    // Calculate statistics
    const stats = {
        bundleSize: {
            uncompressed: calculateStats(rawData.map((d) => d.bundleSize.uncompressed)),
            gzipped: calculateStats(rawData.map((d) => d.bundleSize.gzipped))
        },
        coldBuildTime: calculateStats(rawData.map((d) => d.coldBuildTime)),
        testExecutionTime: calculateStats(rawData.map((d) => d.testExecutionTime)),
        typecheckTime: calculateStats(rawData.map((d) => d.typecheckTime)),
        code: {
            linesOfCode: rawData[0].linesOfCode,
            numberOfFiles: rawData[0].numberOfFiles
        }
    };

    return { stats, raw: rawData };
}

async function measureWarm(runs: number): Promise<{ stats: any; raw: WarmMetrics[] }> {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  🔥 WARM MEASUREMENTS (With Cache)                            ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('Measuring incremental builds (developer workflow experience)\n');

    // Initial build to warm cache
    console.log('Initial build to warm cache...');
    execCommand('nx build i18n');
    execCommand('nx test i18n --run');
    console.log('✓ Cache warmed\n');

    const rawData: WarmMetrics[] = [];

    for (let i = 1; i <= runs; i++) {
        console.log(`\n${'═'.repeat(64)}`);
        console.log(`  WARM RUN ${i} of ${runs}`);
        console.log(`${'═'.repeat(64)}\n`);

        // Touch a file to trigger rebuild
        console.log('  [1/2] Incremental build (touch 1 file)...');
        execCommand('touch libs/i18n/src/lib/pipes/fd-translate.pipe.ts', true);

        const incrementalStart = Date.now();
        execCommand('nx build i18n');
        const incrementalBuildTime = (Date.now() - incrementalStart) / 1000;
        console.log(`  → ${formatTime(incrementalBuildTime)}`);

        // Re-run tests (with warm Jest cache)
        console.log('  [2/2] Test re-run (warm Jest cache)...');
        const testRerunStart = Date.now();
        execCommand('nx test i18n --run');
        const testRerunTime = (Date.now() - testRerunStart) / 1000;
        console.log(`  → ${formatTime(testRerunTime)}`);

        rawData.push({
            incrementalBuildTime,
            testRerunTime
        });

        console.log(`\n✓ Warm run ${i} complete\n`);

        if (i < runs) {
            console.log('Waiting 3 seconds before next run...');
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    // Calculate statistics
    const stats = {
        incrementalBuildTime: calculateStats(rawData.map((d) => d.incrementalBuildTime)),
        testRerunTime: calculateStats(rawData.map((d) => d.testRerunTime))
    };

    return { stats, raw: rawData };
}

async function main(): Promise<void> {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 i18n Baseline - Dual Measurement (Cold + Warm)           ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const coldRuns = parseInt(process.argv[2] || '5', 10);
    const warmRuns = parseInt(process.argv[3] || '5', 10);

    console.log(`Configuration:`);
    console.log(`  • Cold runs: ${coldRuns} (no cache)`);
    console.log(`  • Warm runs: ${warmRuns} (with cache)`);
    console.log(`  • Est. time: ${Math.ceil(coldRuns * 2 + warmRuns * 0.5)} minutes\n`);

    // Measure cold (no cache)
    const cold = await measureCold(coldRuns);

    // Measure warm (with cache)
    const warm = await measureWarm(warmRuns);

    // Aggregate results
    const baseline: DualBaseline = {
        date: new Date().toISOString(),
        version: 'pre-migration-dual',
        cold: {
            runs: coldRuns,
            bundleSize: cold.stats.bundleSize,
            coldBuildTime: cold.stats.coldBuildTime,
            testExecutionTime: cold.stats.testExecutionTime,
            typecheckTime: cold.stats.typecheckTime,
            code: cold.stats.code,
            rawData: cold.raw
        },
        warm: {
            runs: warmRuns,
            incrementalBuildTime: warm.stats.incrementalBuildTime,
            testRerunTime: warm.stats.testRerunTime,
            rawData: warm.raw
        }
    };

    // Save results
    const outputPath = 'i18n-baseline-dual.json';
    fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2));
    console.log(`\n✓ Saved dual baseline to: ${outputPath}\n`);

    // Print summary
    printSummary(baseline);

    // Create simplified baseline for comparison script
    createSimplifiedBaseline(baseline);
}

function printSummary(baseline: DualBaseline): void {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 DUAL BASELINE SUMMARY                                     ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('Legend: median (μ=mean, σ=std.dev) [min, max]\n');

    console.log('❄️  COLD MEASUREMENTS (No Cache - Most Reliable)');
    console.log('─────────────────────────────────────────────────────────────────');
    const cold = baseline.cold;
    console.log(
        `Bundle (gzipped):  ${formatBytes(cold.bundleSize.gzipped.median)} (μ=${formatBytes(cold.bundleSize.gzipped.mean)}, σ=${formatBytes(cold.bundleSize.gzipped.stdDev)}) [${formatBytes(cold.bundleSize.gzipped.min)}, ${formatBytes(cold.bundleSize.gzipped.max)}]`
    );
    console.log(`                   CV = ${formatCV(cold.bundleSize.gzipped.cv)}`);
    console.log('');
    console.log(
        `Cold Build:        ${formatTime(cold.coldBuildTime.median)} (μ=${formatTime(cold.coldBuildTime.mean)}, σ=${formatTime(cold.coldBuildTime.stdDev)}) [${formatTime(cold.coldBuildTime.min)}, ${formatTime(cold.coldBuildTime.max)}]`
    );
    console.log(`                   CV = ${formatCV(cold.coldBuildTime.cv)}`);
    console.log('');
    console.log(
        `Test Execution:    ${formatTime(cold.testExecutionTime.median)} (μ=${formatTime(cold.testExecutionTime.mean)}, σ=${formatTime(cold.testExecutionTime.stdDev)}) [${formatTime(cold.testExecutionTime.min)}, ${formatTime(cold.testExecutionTime.max)}]`
    );
    console.log(`                   CV = ${formatCV(cold.testExecutionTime.cv)}`);
    console.log('');
    console.log(
        `Type-check:        ${formatTime(cold.typecheckTime.median)} (μ=${formatTime(cold.typecheckTime.mean)}, σ=${formatTime(cold.typecheckTime.stdDev)}) [${formatTime(cold.typecheckTime.min)}, ${formatTime(cold.typecheckTime.max)}]`
    );
    console.log(`                   CV = ${formatCV(cold.typecheckTime.cv)}`);
    console.log('');
    console.log(`Lines of Code:     ${cold.code.linesOfCode.toLocaleString()}`);
    console.log(`TypeScript Files:  ${cold.code.numberOfFiles}`);
    console.log('');

    console.log('🔥 WARM MEASUREMENTS (With Cache - Developer Experience)');
    console.log('─────────────────────────────────────────────────────────────────');
    const warm = baseline.warm;
    console.log(
        `Incremental Build: ${formatTime(warm.incrementalBuildTime.median)} (μ=${formatTime(warm.incrementalBuildTime.mean)}, σ=${formatTime(warm.incrementalBuildTime.stdDev)}) [${formatTime(warm.incrementalBuildTime.min)}, ${formatTime(warm.incrementalBuildTime.max)}]`
    );
    console.log(`                   CV = ${formatCV(warm.incrementalBuildTime.cv)}`);
    console.log('');
    console.log(
        `Test Re-run:       ${formatTime(warm.testRerunTime.median)} (μ=${formatTime(warm.testRerunTime.mean)}, σ=${formatTime(warm.testRerunTime.stdDev)}) [${formatTime(warm.testRerunTime.min)}, ${formatTime(warm.testRerunTime.max)}]`
    );
    console.log(`                   CV = ${formatCV(warm.testRerunTime.cv)}`);
    console.log('');

    console.log('📈 VARIANCE COMPARISON');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log(`Bundle Size:       ${formatCV(cold.bundleSize.gzipped.cv)}`);
    console.log(`Cold Build:        ${formatCV(cold.coldBuildTime.cv)}`);
    console.log(`Incremental Build: ${formatCV(warm.incrementalBuildTime.cv)}`);
    console.log(`Cold Tests:        ${formatCV(cold.testExecutionTime.cv)}`);
    console.log(`Warm Tests:        ${formatCV(warm.testRerunTime.cv)}`);
    console.log('');

    console.log('💡 KEY INSIGHTS');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log('• Cold measurements have lower CV → More reliable for comparison');
    console.log('• Warm measurements show real developer experience');
    console.log('• Use COLD metrics as primary success criteria');
    console.log('• Use WARM metrics to validate developer workflow');
    console.log('');
}

function createSimplifiedBaseline(baseline: DualBaseline): void {
    // Create a simplified version using cold medians (most reliable)
    const simplified = {
        date: baseline.date,
        version: 'pre-migration-cold-median',
        bundleSize: {
            library: {
                uncompressed: baseline.cold.bundleSize.uncompressed.median,
                gzipped: baseline.cold.bundleSize.gzipped.median,
                mainBundle: 'fundamental-ngx-i18n.mjs'
            },
            docsApp: {
                total: 0,
                mainBundleSize: 0
            }
        },
        performance: {
            resolutionTime: {
                measured: false,
                note: 'Run performance tests manually'
            }
        },
        build: {
            coldBuildTime: baseline.cold.coldBuildTime.median,
            incrementalBuildTime: baseline.warm.incrementalBuildTime.median,
            testExecutionTime: baseline.cold.testExecutionTime.median,
            typecheckTime: baseline.cold.typecheckTime.median
        },
        code: {
            linesOfCode: baseline.cold.code.linesOfCode,
            numberOfFiles: baseline.cold.code.numberOfFiles,
            testCoverage: 0
        }
    };

    fs.writeFileSync('i18n-baseline-metrics.json', JSON.stringify(simplified, null, 2));
    console.log('✓ Created simplified baseline: i18n-baseline-metrics.json');
    console.log('  (Uses cold medians - most reliable for comparison)\n');
}

// Run
main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
