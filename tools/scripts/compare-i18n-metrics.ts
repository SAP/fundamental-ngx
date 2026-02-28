#!/usr/bin/env ts-node

/**
 * i18n Migration Metrics Comparison Script
 *
 * Compares baseline metrics (before migration) with after-migration metrics.
 * Shows improvements and regressions with visual indicators.
 *
 * Usage:
 *   npx ts-node tools/scripts/compare-i18n-metrics.ts
 */

import * as fs from 'fs';

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

interface MetricComparison {
    metric: string;
    before: string;
    after: string;
    change: string;
    changePercent: number;
    improved: boolean | null; // null = neutral
    category: 'bundle' | 'build' | 'code';
}

function formatBytes(bytes: number): string {
    if (bytes === 0) {
        return '0 B';
    }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
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

function calculateChange(before: number, after: number): { absolute: string; percent: number; improved: boolean } {
    const diff = after - before;
    const percent = before === 0 ? 0 : (diff / before) * 100;

    let absolute: string;
    if (diff > 0) {
        absolute = `+${formatBytes(Math.abs(diff))}`;
    } else if (diff < 0) {
        absolute = `-${formatBytes(Math.abs(diff))}`;
    } else {
        absolute = 'no change';
    }

    // For size/time metrics, smaller is better
    const improved = diff < 0;

    return { absolute, percent, improved };
}

function calculateTimeChange(before: number, after: number): { absolute: string; percent: number; improved: boolean } {
    const diff = after - before;
    const percent = before === 0 ? 0 : (diff / before) * 100;

    let absolute: string;
    if (diff > 0) {
        absolute = `+${formatTime(Math.abs(diff))}`;
    } else if (diff < 0) {
        absolute = `-${formatTime(Math.abs(diff))}`;
    } else {
        absolute = 'no change';
    }

    const improved = diff < 0;

    return { absolute, percent, improved };
}

function compareMetrics(
    baselinePath: string = 'i18n-baseline-metrics.json',
    afterPath: string = 'i18n-after-metrics.json'
): void {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 i18n Migration - Metrics Comparison                       ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    // Load data
    if (!fs.existsSync(baselinePath)) {
        console.error(`❌ Baseline file not found: ${baselinePath}`);
        console.error('   Run: npx ts-node tools/scripts/capture-i18n-baseline.ts\n');
        process.exit(1);
    }

    if (!fs.existsSync(afterPath)) {
        console.error(`❌ After-migration file not found: ${afterPath}`);
        console.error('   Run: npx ts-node tools/scripts/capture-i18n-baseline.ts');
        console.error('   Save output as: i18n-after-metrics.json\n');
        process.exit(1);
    }

    const baseline: BaselineMetrics = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
    const after: BaselineMetrics = JSON.parse(fs.readFileSync(afterPath, 'utf-8'));

    console.log(`📅 Baseline Date: ${new Date(baseline.date).toLocaleString()}`);
    console.log(`📅 After Date:    ${new Date(after.date).toLocaleString()}`);
    console.log('');

    const comparisons: MetricComparison[] = [];

    // Bundle size comparisons
    const libGzipChange = calculateChange(baseline.bundleSize.library.gzipped, after.bundleSize.library.gzipped);
    comparisons.push({
        metric: 'Library Bundle (gzipped)',
        before: formatBytes(baseline.bundleSize.library.gzipped),
        after: formatBytes(after.bundleSize.library.gzipped),
        change: `${libGzipChange.absolute} (${libGzipChange.percent >= 0 ? '+' : ''}${libGzipChange.percent.toFixed(2)}%)`,
        changePercent: libGzipChange.percent,
        improved: libGzipChange.improved,
        category: 'bundle'
    });

    const libUncompressedChange = calculateChange(
        baseline.bundleSize.library.uncompressed,
        after.bundleSize.library.uncompressed
    );
    comparisons.push({
        metric: 'Library Bundle (raw)',
        before: formatBytes(baseline.bundleSize.library.uncompressed),
        after: formatBytes(after.bundleSize.library.uncompressed),
        change: `${libUncompressedChange.absolute} (${libUncompressedChange.percent >= 0 ? '+' : ''}${libUncompressedChange.percent.toFixed(2)}%)`,
        changePercent: libUncompressedChange.percent,
        improved: libUncompressedChange.improved,
        category: 'bundle'
    });

    if (baseline.bundleSize.docsApp.total > 0 && after.bundleSize.docsApp.total > 0) {
        const docsChange = calculateChange(baseline.bundleSize.docsApp.total, after.bundleSize.docsApp.total);
        comparisons.push({
            metric: 'Docs App Total',
            before: formatBytes(baseline.bundleSize.docsApp.total),
            after: formatBytes(after.bundleSize.docsApp.total),
            change: `${docsChange.absolute} (${docsChange.percent >= 0 ? '+' : ''}${docsChange.percent.toFixed(2)}%)`,
            changePercent: docsChange.percent,
            improved: docsChange.improved,
            category: 'bundle'
        });
    }

    // Build performance comparisons
    const coldBuildChange = calculateTimeChange(baseline.build.coldBuildTime, after.build.coldBuildTime);
    comparisons.push({
        metric: 'Cold Build Time',
        before: formatTime(baseline.build.coldBuildTime),
        after: formatTime(after.build.coldBuildTime),
        change: `${coldBuildChange.absolute} (${coldBuildChange.percent >= 0 ? '+' : ''}${coldBuildChange.percent.toFixed(2)}%)`,
        changePercent: coldBuildChange.percent,
        improved: coldBuildChange.improved,
        category: 'build'
    });

    const incrementalBuildChange = calculateTimeChange(
        baseline.build.incrementalBuildTime,
        after.build.incrementalBuildTime
    );
    comparisons.push({
        metric: 'Incremental Build Time',
        before: formatTime(baseline.build.incrementalBuildTime),
        after: formatTime(after.build.incrementalBuildTime),
        change: `${incrementalBuildChange.absolute} (${incrementalBuildChange.percent >= 0 ? '+' : ''}${incrementalBuildChange.percent.toFixed(2)}%)`,
        changePercent: incrementalBuildChange.percent,
        improved: incrementalBuildChange.improved,
        category: 'build'
    });

    const testTimeChange = calculateTimeChange(baseline.build.testExecutionTime, after.build.testExecutionTime);
    comparisons.push({
        metric: 'Test Execution Time',
        before: formatTime(baseline.build.testExecutionTime),
        after: formatTime(after.build.testExecutionTime),
        change: `${testTimeChange.absolute} (${testTimeChange.percent >= 0 ? '+' : ''}${testTimeChange.percent.toFixed(2)}%)`,
        changePercent: testTimeChange.percent,
        improved: testTimeChange.improved,
        category: 'build'
    });

    const typecheckChange = calculateTimeChange(baseline.build.typecheckTime, after.build.typecheckTime);
    comparisons.push({
        metric: 'Type-check Time',
        before: formatTime(baseline.build.typecheckTime),
        after: formatTime(after.build.typecheckTime),
        change: `${typecheckChange.absolute} (${typecheckChange.percent >= 0 ? '+' : ''}${typecheckChange.percent.toFixed(2)}%)`,
        changePercent: typecheckChange.percent,
        improved: typecheckChange.improved,
        category: 'build'
    });

    // Code metrics comparisons
    const locDiff = after.code.linesOfCode - baseline.code.linesOfCode;
    comparisons.push({
        metric: 'Lines of Code',
        before: baseline.code.linesOfCode.toLocaleString(),
        after: after.code.linesOfCode.toLocaleString(),
        change: `${locDiff >= 0 ? '+' : ''}${locDiff.toLocaleString()}`,
        changePercent: (locDiff / baseline.code.linesOfCode) * 100,
        improved: null, // Neutral - not necessarily good or bad
        category: 'code'
    });

    const filesDiff = after.code.numberOfFiles - baseline.code.numberOfFiles;
    comparisons.push({
        metric: 'TypeScript Files',
        before: baseline.code.numberOfFiles.toString(),
        after: after.code.numberOfFiles.toString(),
        change: `${filesDiff >= 0 ? '+' : ''}${filesDiff}`,
        changePercent: (filesDiff / baseline.code.numberOfFiles) * 100,
        improved: null,
        category: 'code'
    });

    const coverageDiff = after.code.testCoverage - baseline.code.testCoverage;
    comparisons.push({
        metric: 'Test Coverage',
        before: `${baseline.code.testCoverage.toFixed(2)}%`,
        after: `${after.code.testCoverage.toFixed(2)}%`,
        change: `${coverageDiff >= 0 ? '+' : ''}${coverageDiff.toFixed(2)}%`,
        changePercent: coverageDiff,
        improved: coverageDiff > 0,
        category: 'code'
    });

    // Print tables by category
    printCategoryTable(
        '📦 BUNDLE SIZE',
        comparisons.filter((c) => c.category === 'bundle')
    );
    printCategoryTable(
        '⏱️  BUILD PERFORMANCE',
        comparisons.filter((c) => c.category === 'build')
    );
    printCategoryTable(
        '📝 CODE METRICS',
        comparisons.filter((c) => c.category === 'code')
    );

    // Summary
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📈 SUMMARY                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    const improvements = comparisons.filter((c) => c.improved === true).length;
    const regressions = comparisons.filter((c) => c.improved === false).length;
    const neutral = comparisons.filter((c) => c.improved === null).length;

    console.log(`✅ Improvements:  ${improvements}`);
    console.log(`⚠️  Regressions:   ${regressions}`);
    console.log(`➖ Neutral:       ${neutral}`);
    console.log('');

    // Success criteria check
    console.log('SUCCESS CRITERIA:');
    console.log('─────────────────────────────────────────────────────────────────');

    const bundleIncrease =
        ((after.bundleSize.library.gzipped - baseline.bundleSize.library.gzipped) /
            baseline.bundleSize.library.gzipped) *
        100;
    const bundleOk = bundleIncrease < 5;
    console.log(`${bundleOk ? '✅' : '❌'} Bundle size increase < 5%:        ${bundleIncrease.toFixed(2)}%`);

    const buildIncrease =
        ((after.build.coldBuildTime - baseline.build.coldBuildTime) / baseline.build.coldBuildTime) * 100;
    const buildOk = buildIncrease < 10;
    console.log(`${buildOk ? '✅' : '❌'} Build time increase < 10%:         ${buildIncrease.toFixed(2)}%`);

    const coverageOk = after.code.testCoverage >= baseline.code.testCoverage;
    console.log(
        `${coverageOk ? '✅' : '❌'} Test coverage maintained:         ${after.code.testCoverage.toFixed(2)}% (was ${baseline.code.testCoverage.toFixed(2)}%)`
    );

    const allOk = bundleOk && buildOk && coverageOk;
    console.log('─────────────────────────────────────────────────────────────────');
    console.log(`${allOk ? '✅ ALL CRITERIA MET' : '⚠️  SOME CRITERIA NOT MET'}`);
    console.log('');
}

function printCategoryTable(title: string, comparisons: MetricComparison[]): void {
    console.log(`\n${title}`);
    console.log('════════════════════════════════════════════════════════════════');
    console.log('Metric                      │ Before        │ After         │ Change');
    console.log('────────────────────────────────────────────────────────────────');

    comparisons.forEach((c) => {
        const icon = c.improved === true ? '✅' : c.improved === false ? '⚠️' : '➖';
        const metric = c.metric.padEnd(25);
        const before = c.before.padEnd(13);
        const after = c.after.padEnd(13);

        console.log(`${icon} ${metric} │ ${before} │ ${after} │ ${c.change}`);
    });

    console.log('════════════════════════════════════════════════════════════════');
}

// Main execution
compareMetrics();
