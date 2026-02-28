#!/usr/bin/env ts-node

/**
 * i18n Baseline - Multiple Run Aggregator
 *
 * Runs baseline capture multiple times and calculates statistics
 * (median, mean, std dev) to get more accurate baseline.
 *
 * Usage:
 *   npx ts-node tools/scripts/run-baseline-multiple.ts [iterations]
 */

import { execSync } from 'child_process';
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

interface AggregatedMetrics {
    runs: number;
    bundleSize: {
        library: {
            uncompressed: Stats;
            gzipped: Stats;
        };
    };
    build: {
        coldBuildTime: Stats;
        incrementalBuildTime: Stats;
        testExecutionTime: Stats;
        typecheckTime: Stats;
    };
    code: {
        linesOfCode: Stats;
        numberOfFiles: Stats;
    };
    rawData: BaselineMetrics[];
}

interface Stats {
    median: number;
    mean: number;
    stdDev: number;
    min: number;
    max: number;
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

    return {
        median,
        mean,
        stdDev,
        min: Math.min(...values),
        max: Math.max(...values)
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

function formatStats(stats: Stats, formatter: (n: number) => string): string {
    return `${formatter(stats.median)} (μ=${formatter(stats.mean)}, σ=${formatter(stats.stdDev)}, min=${formatter(stats.min)}, max=${formatter(stats.max)})`;
}

async function runMultipleBaselines(iterations: number = 5): Promise<void> {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 i18n Baseline - Multiple Run Aggregation                  ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log(`Running baseline capture ${iterations} times to calculate statistics...\n`);

    const allMetrics: BaselineMetrics[] = [];

    for (let i = 1; i <= iterations; i++) {
        console.log(`\n${'═'.repeat(64)}`);
        console.log(`  RUN ${i} of ${iterations}`);
        console.log(`${'═'.repeat(64)}\n`);

        try {
            // Run baseline capture
            execSync('npx ts-node tools/scripts/capture-i18n-baseline.ts', {
                stdio: 'inherit'
            });

            // Read the generated metrics
            const metricsPath = 'i18n-baseline-metrics.json';
            if (fs.existsSync(metricsPath)) {
                const metrics: BaselineMetrics = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
                allMetrics.push(metrics);

                // Rename to preserve
                const preservePath = `i18n-baseline-run${i}.json`;
                fs.renameSync(metricsPath, preservePath);
                console.log(`\n✓ Run ${i} complete. Saved to: ${preservePath}\n`);
            }

            // Small delay between runs
            if (i < iterations) {
                console.log('Waiting 3 seconds before next run...');
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error(`\n❌ Error during run ${i}:`, error);
            console.log('Continuing with next run...\n');
        }
    }

    if (allMetrics.length === 0) {
        console.error('\n❌ No successful runs. Cannot calculate statistics.');
        process.exit(1);
    }

    console.log('\n' + '═'.repeat(64));
    console.log(`  AGGREGATING ${allMetrics.length} SUCCESSFUL RUNS`);
    console.log('═'.repeat(64) + '\n');

    // Extract values for statistics
    const bundleUncompressed = allMetrics.map((m) => m.bundleSize.library.uncompressed);
    const bundleGzipped = allMetrics.map((m) => m.bundleSize.library.gzipped);
    const coldBuildTimes = allMetrics.map((m) => m.build.coldBuildTime);
    const incrementalBuildTimes = allMetrics.map((m) => m.build.incrementalBuildTime);
    const testTimes = allMetrics.map((m) => m.build.testExecutionTime);
    const typecheckTimes = allMetrics.map((m) => m.build.typecheckTime);
    const linesOfCode = allMetrics.map((m) => m.code.linesOfCode);
    const numberOfFiles = allMetrics.map((m) => m.code.numberOfFiles);

    const aggregated: AggregatedMetrics = {
        runs: allMetrics.length,
        bundleSize: {
            library: {
                uncompressed: calculateStats(bundleUncompressed),
                gzipped: calculateStats(bundleGzipped)
            }
        },
        build: {
            coldBuildTime: calculateStats(coldBuildTimes),
            incrementalBuildTime: calculateStats(incrementalBuildTimes),
            testExecutionTime: calculateStats(testTimes),
            typecheckTime: calculateStats(typecheckTimes)
        },
        code: {
            linesOfCode: calculateStats(linesOfCode),
            numberOfFiles: calculateStats(numberOfFiles)
        },
        rawData: allMetrics
    };

    // Save aggregated results
    const outputPath = 'i18n-baseline-aggregated.json';
    fs.writeFileSync(outputPath, JSON.stringify(aggregated, null, 2));
    console.log(`✓ Aggregated results saved to: ${outputPath}\n`);

    // Print summary
    printSummary(aggregated);

    // Create median baseline file (for comparison script)
    const medianBaseline: BaselineMetrics = {
        date: new Date().toISOString(),
        version: `pre-migration-median-of-${allMetrics.length}`,
        bundleSize: {
            library: {
                uncompressed: aggregated.bundleSize.library.uncompressed.median,
                gzipped: aggregated.bundleSize.library.gzipped.median,
                mainBundle: allMetrics[0].bundleSize.library.mainBundle
            },
            docsApp: {
                total: 0,
                mainBundleSize: 0
            }
        },
        performance: allMetrics[0].performance,
        build: {
            coldBuildTime: aggregated.build.coldBuildTime.median,
            incrementalBuildTime: aggregated.build.incrementalBuildTime.median,
            testExecutionTime: aggregated.build.testExecutionTime.median,
            typecheckTime: aggregated.build.typecheckTime.median
        },
        code: {
            linesOfCode: Math.round(aggregated.code.linesOfCode.median),
            numberOfFiles: Math.round(aggregated.code.numberOfFiles.median),
            testCoverage: 0
        }
    };

    const medianPath = 'i18n-baseline-metrics.json';
    fs.writeFileSync(medianPath, JSON.stringify(medianBaseline, null, 2));
    console.log(`\n✓ Median baseline saved to: ${medianPath} (use this for comparison)\n`);

    // Cleanup individual run files
    console.log('Cleaning up individual run files...');
    for (let i = 1; i <= iterations; i++) {
        const runFile = `i18n-baseline-run${i}.json`;
        if (fs.existsSync(runFile)) {
            fs.unlinkSync(runFile);
        }
    }
    console.log('✓ Cleanup complete\n');

    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  ✅ Multiple Run Baseline Complete                            ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('📁 OUTPUT FILES:');
    console.log('  • i18n-baseline-metrics.json       (median values - use for comparison)');
    console.log('  • i18n-baseline-aggregated.json    (all statistics)');
    console.log('  • i18n-baseline-metrics.txt        (human-readable)\n');
}

function printSummary(aggregated: AggregatedMetrics): void {
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('║  📊 AGGREGATED BASELINE STATISTICS                            ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log(`Based on ${aggregated.runs} successful runs\n`);
    console.log('Legend: median (μ=mean, σ=std.dev, min, max)\n');

    console.log('📦 BUNDLE SIZE');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log(`Uncompressed: ${formatStats(aggregated.bundleSize.library.uncompressed, formatBytes)}`);
    console.log(`Gzipped:      ${formatStats(aggregated.bundleSize.library.gzipped, formatBytes)}`);
    console.log('');

    console.log('⏱️  BUILD PERFORMANCE');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log(`Cold Build:   ${formatStats(aggregated.build.coldBuildTime, formatTime)}`);
    console.log(`Incremental:  ${formatStats(aggregated.build.incrementalBuildTime, formatTime)}`);
    console.log(`Type-check:   ${formatStats(aggregated.build.typecheckTime, formatTime)}`);
    console.log(`Test Suite:   ${formatStats(aggregated.build.testExecutionTime, formatTime)}`);
    console.log('');

    console.log('📝 CODE METRICS');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log(
        `Lines of Code: ${aggregated.code.linesOfCode.median.toFixed(0)} (μ=${aggregated.code.linesOfCode.mean.toFixed(0)})`
    );
    console.log(
        `TS Files:      ${aggregated.code.numberOfFiles.median.toFixed(0)} (μ=${aggregated.code.numberOfFiles.mean.toFixed(0)})`
    );
    console.log('');

    console.log('📈 VARIANCE ANALYSIS');
    console.log('─────────────────────────────────────────────────────────────────');

    // Calculate coefficient of variation (CV) = σ/μ × 100%
    const cvs = [
        {
            name: 'Bundle (gzipped)',
            cv: (aggregated.bundleSize.library.gzipped.stdDev / aggregated.bundleSize.library.gzipped.mean) * 100
        },
        { name: 'Cold Build', cv: (aggregated.build.coldBuildTime.stdDev / aggregated.build.coldBuildTime.mean) * 100 },
        {
            name: 'Incremental Build',
            cv: (aggregated.build.incrementalBuildTime.stdDev / aggregated.build.incrementalBuildTime.mean) * 100
        },
        {
            name: 'Test Time',
            cv: (aggregated.build.testExecutionTime.stdDev / aggregated.build.testExecutionTime.mean) * 100
        }
    ];

    cvs.forEach(({ name, cv }) => {
        const stability = cv < 5 ? '✅ Very Stable' : cv < 10 ? '✓ Stable' : '⚠️  Variable';
        console.log(`${name.padEnd(20)}: CV = ${cv.toFixed(2)}% ${stability}`);
    });

    console.log('');
    console.log('Note: CV (Coefficient of Variation) measures consistency across runs.');
    console.log('      Lower is better. < 5% = very stable, < 10% = acceptable.\n');
}

// Main
const iterationCount = parseInt(process.argv[2] || '5', 10);
runMultipleBaselines(iterationCount).catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
