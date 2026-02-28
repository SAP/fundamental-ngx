# i18n Migration - Baseline Measurements & KPIs

**Date:** February 28, 2026
**Purpose:** Establish quantitative baseline before i18n signal migration to validate improvements
**Related:** [I18N_MIGRATION_PLAN.md](./I18N_MIGRATION_PLAN.md)

---

## Table of Contents

1. [Bundle Size Metrics](#bundle-size-metrics)
2. [Runtime Performance Metrics](#runtime-performance-metrics)
3. [Change Detection Performance](#change-detection-performance)
4. [Memory Usage Metrics](#memory-usage-metrics)
5. [Developer Experience Metrics](#developer-experience-metrics)
6. [Measurement Tools & Scripts](#measurement-tools--scripts)
7. [Baseline Results](#baseline-results)
8. [Target Improvements](#target-improvements)

---

## Bundle Size Metrics

### What to Measure

#### 1. i18n Library Bundle Size

**Why:** Validate that signal migration doesn't bloat the library

**Measurement:**

```bash
# Build the i18n library in production mode
nx build i18n --configuration=production

# Measure output size
cd dist/libs/i18n
du -sh .                           # Total size
du -sh fesm2022/*.js               # ES modules
ls -lh fesm2022/*.js | awk '{print $5, $9}'  # Individual files

# Gzipped size (what users actually download)
gzip -c fesm2022/fundamental-ngx-i18n.mjs | wc -c
```

**Baseline capture:**

- Total uncompressed size (KB)
- Total gzipped size (KB)
- Size per module (fesm2022/\*.js)
- Translation data size (languages/\*.json)

---

#### 2. Consumer App Bundle Size (Documentation App)

**Why:** Measure real-world impact on consuming applications

**Measurement:**

```bash
# Build docs app (large consumer with many i18n usages)
nx build fundamental-ngx-docs --configuration=production

# Analyze bundle
cd dist/apps/fundamental-ngx-docs/browser
du -sh .                           # Total app size
ls -lh *.js | awk '{print $5, $9}'  # Main bundles

# Use webpack-bundle-analyzer for detailed breakdown
npx webpack-bundle-analyzer stats.json
```

**Baseline capture:**

- Total app bundle size (MB)
- Main bundle size (main.\*.js)
- i18n-related chunks size
- Third-party dependencies size (node_modules)
- Translation data included in bundle

---

#### 3. Tree-Shaking Effectiveness

**Why:** Ensure unused translations/languages can be removed

**Measurement:**

```bash
# Build a minimal test app that uses only 1 translation key
# Check if unused languages are tree-shaken out

# Create test app
nx g @nx/angular:app i18n-tree-shake-test --minimal

# Add single translation usage
# libs/i18n-tree-shake-test/src/app/app.component.ts
# {{ 'coreButton.save' | fdTranslate }}

# Build and analyze
nx build i18n-tree-shake-test --configuration=production
cd dist/apps/i18n-tree-shake-test/browser
grep -r "coreButton.cancel" . # Should NOT find unused keys
```

**Baseline capture:**

- Are all 38 languages bundled even if not used? (Expected: YES for v1)
- Can individual translation keys be tree-shaken? (Expected: NO for v1)

---

## Runtime Performance Metrics

### What to Measure

#### 1. Translation Resolution Time

**Why:** Measure how fast translations are resolved

**Measurement script:**

```typescript
// libs/i18n/src/lib/__benchmarks__/resolution-performance.spec.ts

import { performance } from 'perf_hooks';
import { FD_LANGUAGE_ENGLISH } from '../models';
import { TranslationResolver } from '../utils/translation-resolver';

describe('Translation Resolution Performance', () => {
    it('should measure resolution time for simple keys', () => {
        const resolver = new TranslationResolver();
        const iterations = 10000;

        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            resolver.resolve(FD_LANGUAGE_ENGLISH, 'coreButton.save');
        }
        const end = performance.now();

        const avgTime = (end - start) / iterations;
        console.log(`Average resolution time: ${avgTime.toFixed(4)}ms`);

        // Store baseline
        expect(avgTime).toBeLessThan(0.1); // 0.1ms threshold
    });

    it('should measure resolution time for parameterized keys', () => {
        const resolver = new TranslationResolver();
        const iterations = 10000;

        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            resolver.resolve(FD_LANGUAGE_ENGLISH, 'coreList.itemCount', { count: 5 });
        }
        const end = performance.now();

        const avgTime = (end - start) / iterations;
        console.log(`Average parameterized resolution time: ${avgTime.toFixed(4)}ms`);

        expect(avgTime).toBeLessThan(0.5); // 0.5ms threshold
    });

    it('should measure resolution time with locale formatting', () => {
        const resolver = new TranslationResolver();
        const iterations = 1000;

        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            resolver.resolve(
                FD_LANGUAGE_ENGLISH,
                'coreList.itemCount',
                { count: 1000 },
                'de-DE' // German locale formatting
            );
        }
        const end = performance.now();

        const avgTime = (end - start) / iterations;
        console.log(`Average resolution with locale time: ${avgTime.toFixed(4)}ms`);

        expect(avgTime).toBeLessThan(1); // 1ms threshold
    });
});
```

**How to run:**

```bash
nx test i18n --test-file=resolution-performance.spec.ts
```

**Baseline capture:**

- Simple key resolution time (ms)
- Parameterized key resolution time (ms)
- Locale-formatted resolution time (ms)

---

#### 2. Pipe Transform Performance

**Why:** Impure pipes are called on every CD cycle - measure impact

**Measurement script:**

```typescript
// libs/i18n/src/lib/pipes/__benchmarks__/pipe-performance.spec.ts

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { performance } from 'perf_hooks';
import { FdTranslatePipe } from '../fd-translate.pipe';

@Component({
    template: `
        <div *ngFor="let item of items">
            {{ 'coreButton.save' | fdTranslate }}
            {{ 'coreList.itemCount' | fdTranslate: { count: item } }}
        </div>
    `,
    imports: [FdTranslatePipe]
})
class TestComponent {
    items = Array.from({ length: 100 }, (_, i) => i); // 100 items
}

describe('FdTranslatePipe Performance', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
    });

    it('should measure pipe transform calls during change detection', () => {
        let transformCallCount = 0;

        // Spy on pipe transform
        const pipe = fixture.debugElement.injector.get(FdTranslatePipe);
        const originalTransform = pipe.transform.bind(pipe);
        spyOn(pipe, 'transform').and.callFake((...args) => {
            transformCallCount++;
            return originalTransform(...args);
        });

        // Initial render
        fixture.detectChanges();
        const initialCalls = transformCallCount;
        console.log(`Initial render: ${initialCalls} transform calls`);

        // Trigger CD without any changes
        transformCallCount = 0;
        const start = performance.now();
        for (let i = 0; i < 100; i++) {
            fixture.detectChanges();
        }
        const end = performance.now();

        const totalCalls = transformCallCount;
        const avgTime = (end - start) / 100;

        console.log(`Subsequent CD cycles: ${totalCalls} calls per cycle`);
        console.log(`Average CD time: ${avgTime.toFixed(4)}ms`);

        // Store baseline
        expect(totalCalls).toBeGreaterThan(0); // Impure pipe called every time
    });
});
```

**Baseline capture:**

- Transform calls per CD cycle (expected: high for impure pipe)
- Average CD time with many pipe usages (ms)

---

#### 3. Component Initialization Time

**Why:** Measure overhead of i18n setup in components

**Measurement:**

```typescript
// Create benchmark component with heavy i18n usage
@Component({
    template: `
        <fd-button>{{ 'coreButton.save' | fdTranslate }}</fd-button>
        <fd-button>{{ 'coreButton.cancel' | fdTranslate }}</fd-button>
        <fd-button>{{ 'coreButton.delete' | fdTranslate }}</fd-button>
        <!-- Repeat 50 times -->
    `
})
class HeavyI18nComponent {}

describe('Component Initialization Performance', () => {
    it('should measure initialization time', () => {
        const iterations = 100;
        const times: number[] = [];

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            const fixture = TestBed.createComponent(HeavyI18nComponent);
            fixture.detectChanges();
            const end = performance.now();
            times.push(end - start);
            fixture.destroy();
        }

        const avgTime = times.reduce((a, b) => a + b) / iterations;
        console.log(`Average initialization time: ${avgTime.toFixed(4)}ms`);
    });
});
```

**Baseline capture:**

- Component initialization time (ms)
- First render time (ms)

---

## Change Detection Performance

### What to Measure

#### 1. Change Detection Cycles per Second

**Why:** Core metric for Angular performance

**Measurement tool:** Chrome DevTools Performance Profiler

**Steps:**

```bash
# 1. Start docs app in dev mode
nx serve fundamental-ngx-docs

# 2. Open Chrome DevTools → Performance tab
# 3. Navigate to a page with heavy i18n usage (e.g., /core/button)
# 4. Start recording
# 5. Interact with the page (click buttons, scroll)
# 6. Stop recording after 10 seconds

# 7. Analyze flame chart:
#    - Look for "Angular Change Detection" entries
#    - Count how many CD cycles occurred
#    - Measure total time spent in CD
```

**Baseline capture:**

- CD cycles per second (idle state)
- CD cycles per second (active interaction)
- Time spent in CD per cycle (ms)
- Total CD time per second (ms)

---

#### 2. FdTranslatePipe Call Frequency

**Why:** Impure pipes are called on EVERY CD cycle

**Measurement:**

```typescript
// Add console counter in pipe
@Pipe({
    name: 'fdTranslate',
    pure: false
})
export class FdTranslatePipe implements PipeTransform {
    private static callCount = 0;

    transform(key: string, args?: unknown): string {
        FdTranslatePipe.callCount++;
        if (FdTranslatePipe.callCount % 1000 === 0) {
            console.log(`FdTranslatePipe called ${FdTranslatePipe.callCount} times`);
        }
        // ... rest of implementation
    }
}
```

**Baseline capture:**

- Pipe calls per CD cycle
- Pipe calls per second (during interaction)

---

#### 3. Profiling Script

**Automated measurement:**

```typescript
// tools/scripts/profile-change-detection.ts

import { chromium } from 'playwright';
import * as fs from 'fs';

async function profileChangeDetection() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to test page
    await page.goto('http://localhost:4200/#/core/button');
    await page.waitForLoadState('networkidle');

    // Start performance tracing
    await page.evaluate(() => {
        (window as any).cdMetrics = {
            cycles: 0,
            totalTime: 0
        };

        // Monkey-patch Angular CD
        const originalTick = (window as any).ng?.getComponent?.(document.body)?.applicationRef?.tick;
        if (originalTick) {
            (window as any).ng.getComponent(document.body).applicationRef.tick = function () {
                const start = performance.now();
                originalTick.call(this);
                const end = performance.now();
                (window as any).cdMetrics.cycles++;
                (window as any).cdMetrics.totalTime += end - start;
            };
        }
    });

    // Simulate user interaction
    for (let i = 0; i < 100; i++) {
        await page.click('button:has-text("Save")');
        await page.waitForTimeout(50);
    }

    // Collect metrics
    const metrics = await page.evaluate(() => (window as any).cdMetrics);

    console.log('Change Detection Metrics:');
    console.log(`  Total cycles: ${metrics.cycles}`);
    console.log(`  Total time: ${metrics.totalTime.toFixed(2)}ms`);
    console.log(`  Avg time per cycle: ${(metrics.totalTime / metrics.cycles).toFixed(4)}ms`);

    // Save baseline
    fs.writeFileSync('i18n-baseline-cd-metrics.json', JSON.stringify(metrics, null, 2));

    await browser.close();
}

profileChangeDetection();
```

**Run:**

```bash
nx serve fundamental-ngx-docs &
npx ts-node tools/scripts/profile-change-detection.ts
```

---

## Memory Usage Metrics

### What to Measure

#### 1. Heap Size with i18n Usage

**Why:** Measure memory overhead of BehaviorSubjects, subscriptions, etc.

**Measurement:**

```typescript
// tools/scripts/measure-memory.ts

import { chromium } from 'playwright';

async function measureMemory() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate and wait for load
    await page.goto('http://localhost:4200/#/core/button');
    await page.waitForLoadState('networkidle');

    // Wait for garbage collection
    await page.waitForTimeout(5000);

    // Force GC (requires --js-flags=--expose-gc)
    await page.evaluate(() => {
        if ((window as any).gc) {
            (window as any).gc();
        }
    });

    await page.waitForTimeout(1000);

    // Measure heap size
    const metrics = await page.evaluate(() => {
        return {
            usedJSHeapSize: (performance as any).memory?.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory?.totalJSHeapSize,
            jsHeapSizeLimit: (performance as any).memory?.jsHeapSizeLimit
        };
    });

    console.log('Memory Metrics:');
    console.log(`  Used heap: ${(metrics.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Total heap: ${(metrics.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap limit: ${(metrics.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);

    await browser.close();
}

measureMemory();
```

**Run:**

```bash
node --expose-gc --js-flags=--expose-gc tools/scripts/measure-memory.ts
```

**Baseline capture:**

- Used heap size (MB)
- Component instance count
- Subscription count

---

#### 2. Memory Leaks Detection

**Why:** Ensure BehaviorSubjects are properly cleaned up

**Measurement:**

```typescript
describe('i18n Memory Leaks', () => {
    it('should not leak memory on component creation/destruction', () => {
        const iterations = 1000;
        const memoryBefore = (performance as any).memory?.usedJSHeapSize;

        for (let i = 0; i < iterations; i++) {
            const fixture = TestBed.createComponent(HeavyI18nComponent);
            fixture.detectChanges();
            fixture.destroy();
        }

        // Force GC
        if ((global as any).gc) {
            (global as any).gc();
        }

        const memoryAfter = (performance as any).memory?.usedJSHeapSize;
        const leak = memoryAfter - memoryBefore;

        console.log(`Memory leak: ${(leak / 1024).toFixed(2)} KB after ${iterations} cycles`);

        // Should be minimal (< 1MB leak acceptable)
        expect(leak).toBeLessThan(1024 * 1024);
    });
});
```

---

## Developer Experience Metrics

### What to Measure

#### 1. TypeScript Compilation Time

**Why:** Measure impact of signal types on build performance

**Measurement:**

```bash
# Clean build
rm -rf dist/libs/i18n
rm -rf node_modules/.cache

# Measure cold build
time nx build i18n

# Measure incremental build (change one file)
touch libs/i18n/src/lib/pipes/fd-translate.pipe.ts
time nx build i18n

# Measure type-check only
time nx run i18n:typecheck
```

**Baseline capture:**

- Cold build time (seconds)
- Incremental build time (seconds)
- Type-check time (seconds)

---

#### 2. Test Execution Time

**Why:** Ensure signal migration doesn't slow down tests

**Measurement:**

```bash
# Run all i18n tests
time nx test i18n

# Run specific test suites
time nx test i18n --test-file=fd-translate.pipe.spec.ts
time nx test i18n --test-file=translation-resolver.spec.ts
```

**Baseline capture:**

- Total test suite time (seconds)
- Average test execution time (ms per test)

---

#### 3. Code Metrics

**Why:** Track code complexity and maintainability

**Measurement:**

```bash
# Lines of code
cloc libs/i18n/src --json > i18n-baseline-loc.json

# Cyclomatic complexity
npx complexity-report libs/i18n/src/**/*.ts --format json > i18n-baseline-complexity.json

# Bundle analyzer
nx build i18n --configuration=production --stats-json
npx webpack-bundle-analyzer dist/libs/i18n/stats.json --mode static -r i18n-baseline-bundle.html
```

**Baseline capture:**

- Total lines of code
- Number of files
- Average cyclomatic complexity
- Test coverage percentage

---

## Measurement Tools & Scripts

### Setup Scripts

**1. Install dependencies:**

```bash
npm install --save-dev playwright complexity-report cloc webpack-bundle-analyzer
```

**2. Create baseline measurement script:**

```typescript
// tools/scripts/capture-i18n-baseline.ts

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface BaselineMetrics {
    date: string;
    bundleSize: {
        library: {
            uncompressed: number;
            gzipped: number;
        };
        docsApp: {
            total: number;
            main: number;
        };
    };
    performance: {
        resolutionTime: {
            simple: number;
            parameterized: number;
            withLocale: number;
        };
        changeDetection: {
            cyclesPerSecond: number;
            avgCycleTime: number;
        };
    };
    memory: {
        heapSize: number;
    };
    build: {
        coldBuildTime: number;
        incrementalBuildTime: number;
        testExecutionTime: number;
    };
    code: {
        linesOfCode: number;
        numberOfFiles: number;
        cyclomaticComplexity: number;
        testCoverage: number;
    };
}

async function captureBaseline(): Promise<BaselineMetrics> {
    console.log('📊 Capturing i18n migration baseline metrics...\n');

    const baseline: BaselineMetrics = {
        date: new Date().toISOString(),
        bundleSize: {
            library: {
                uncompressed: 0,
                gzipped: 0
            },
            docsApp: {
                total: 0,
                main: 0
            }
        },
        performance: {
            resolutionTime: {
                simple: 0,
                parameterized: 0,
                withLocale: 0
            },
            changeDetection: {
                cyclesPerSecond: 0,
                avgCycleTime: 0
            }
        },
        memory: {
            heapSize: 0
        },
        build: {
            coldBuildTime: 0,
            incrementalBuildTime: 0,
            testExecutionTime: 0
        },
        code: {
            linesOfCode: 0,
            numberOfFiles: 0,
            cyclomaticComplexity: 0,
            testCoverage: 0
        }
    };

    // 1. Bundle Size Metrics
    console.log('📦 Measuring bundle size...');
    execSync('nx build i18n --configuration=production', { stdio: 'inherit' });

    const libPath = 'dist/libs/i18n';
    const mainBundle = path.join(libPath, 'fesm2022/fundamental-ngx-i18n.mjs');

    if (fs.existsSync(mainBundle)) {
        const stats = fs.statSync(mainBundle);
        baseline.bundleSize.library.uncompressed = stats.size;

        // Gzipped size
        execSync(`gzip -c ${mainBundle} > ${mainBundle}.gz`);
        const gzipStats = fs.statSync(`${mainBundle}.gz`);
        baseline.bundleSize.library.gzipped = gzipStats.size;
        fs.unlinkSync(`${mainBundle}.gz`);
    }

    // 2. Build Performance
    console.log('\n⏱️  Measuring build performance...');

    // Clean build
    execSync('rm -rf dist/libs/i18n', { stdio: 'inherit' });
    const coldStart = Date.now();
    execSync('nx build i18n', { stdio: 'inherit' });
    baseline.build.coldBuildTime = (Date.now() - coldStart) / 1000;

    // Incremental build
    execSync('touch libs/i18n/src/lib/pipes/fd-translate.pipe.ts');
    const incrementalStart = Date.now();
    execSync('nx build i18n', { stdio: 'inherit' });
    baseline.build.incrementalBuildTime = (Date.now() - incrementalStart) / 1000;

    // 3. Test Performance
    console.log('\n🧪 Measuring test performance...');
    const testStart = Date.now();
    execSync('nx test i18n --run', { stdio: 'inherit' });
    baseline.build.testExecutionTime = (Date.now() - testStart) / 1000;

    // 4. Code Metrics
    console.log('\n📝 Measuring code metrics...');
    const clocOutput = execSync('cloc libs/i18n/src --json').toString();
    const clocData = JSON.parse(clocOutput);
    baseline.code.linesOfCode = clocData.TypeScript?.code || 0;
    baseline.code.numberOfFiles = clocData.TypeScript?.nFiles || 0;

    // Coverage
    const coverageFile = 'coverage/libs/i18n/coverage-summary.json';
    if (fs.existsSync(coverageFile)) {
        const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf-8'));
        baseline.code.testCoverage = coverage.total.lines.pct || 0;
    }

    // 5. Save baseline
    const outputPath = 'i18n-baseline-metrics.json';
    fs.writeFileSync(outputPath, JSON.stringify(baseline, null, 2));

    console.log('\n✅ Baseline captured successfully!');
    console.log(`📄 Results saved to: ${outputPath}`);

    // Print summary
    console.log('\n📊 Baseline Summary:');
    console.log('════════════════════════════════════════');
    console.log(`Bundle Size (gzipped):    ${(baseline.bundleSize.library.gzipped / 1024).toFixed(2)} KB`);
    console.log(`Cold Build Time:          ${baseline.build.coldBuildTime.toFixed(2)}s`);
    console.log(`Incremental Build Time:   ${baseline.build.incrementalBuildTime.toFixed(2)}s`);
    console.log(`Test Execution Time:      ${baseline.build.testExecutionTime.toFixed(2)}s`);
    console.log(`Lines of Code:            ${baseline.code.linesOfCode}`);
    console.log(`Test Coverage:            ${baseline.code.testCoverage.toFixed(2)}%`);
    console.log('════════════════════════════════════════\n');

    return baseline;
}

// Run
captureBaseline().catch(console.error);
```

**Run baseline capture:**

```bash
npx ts-node tools/scripts/capture-i18n-baseline.ts
```

---

### Comparison Script

**After migration, compare metrics:**

```typescript
// tools/scripts/compare-i18n-metrics.ts

import * as fs from 'fs';

interface MetricsComparison {
    metric: string;
    before: number | string;
    after: number | string;
    change: string;
    improvement: boolean;
}

function compareMetrics(
    baselinePath: string = 'i18n-baseline-metrics.json',
    afterPath: string = 'i18n-after-metrics.json'
): void {
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));
    const after = JSON.parse(fs.readFileSync(afterPath, 'utf-8'));

    const comparisons: MetricsComparison[] = [];

    // Bundle size
    comparisons.push({
        metric: 'Bundle Size (gzipped)',
        before: `${(baseline.bundleSize.library.gzipped / 1024).toFixed(2)} KB`,
        after: `${(after.bundleSize.library.gzipped / 1024).toFixed(2)} KB`,
        change: calculateChange(baseline.bundleSize.library.gzipped, after.bundleSize.library.gzipped),
        improvement: after.bundleSize.library.gzipped <= baseline.bundleSize.library.gzipped
    });

    // Build times
    comparisons.push({
        metric: 'Cold Build Time',
        before: `${baseline.build.coldBuildTime.toFixed(2)}s`,
        after: `${after.build.coldBuildTime.toFixed(2)}s`,
        change: calculateChange(baseline.build.coldBuildTime, after.build.coldBuildTime),
        improvement: after.build.coldBuildTime <= baseline.build.coldBuildTime
    });

    // ... more comparisons

    // Print table
    console.log('\n📊 i18n Migration - Metrics Comparison');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('Metric                    | Before      | After       | Change');
    console.log('────────────────────────────────────────────────────────────────');

    comparisons.forEach((c) => {
        const icon = c.improvement ? '✅' : '⚠️';
        console.log(
            `${icon} ${c.metric.padEnd(22)} | ${String(c.before).padEnd(11)} | ${String(c.after).padEnd(11)} | ${c.change}`
        );
    });

    console.log('════════════════════════════════════════════════════════════════\n');
}

function calculateChange(before: number, after: number): string {
    const diff = after - before;
    const percent = ((diff / before) * 100).toFixed(2);
    if (diff > 0) {
        return `+${percent}%`;
    } else if (diff < 0) {
        return `${percent}%`;
    }
    return '0%';
}

compareMetrics();
```

---

## Baseline Results

**📋 To be filled after running baseline script**

```json
{
    "date": "2026-02-28T00:00:00.000Z",
    "bundleSize": {
        "library": {
            "uncompressed": 0,
            "gzipped": 0
        },
        "docsApp": {
            "total": 0,
            "main": 0
        }
    },
    "performance": {
        "resolutionTime": {
            "simple": 0,
            "parameterized": 0,
            "withLocale": 0
        },
        "changeDetection": {
            "cyclesPerSecond": 0,
            "avgCycleTime": 0
        }
    },
    "memory": {
        "heapSize": 0
    },
    "build": {
        "coldBuildTime": 0,
        "incrementalBuildTime": 0,
        "testExecutionTime": 0
    },
    "code": {
        "linesOfCode": 0,
        "numberOfFiles": 0,
        "cyclomaticComplexity": 0,
        "testCoverage": 0
    }
}
```

---

## Target Improvements

### Expected Gains After Migration

| Metric              | Current (Estimated) | Target  | Improvement            |
| ------------------- | ------------------- | ------- | ---------------------- |
| **Bundle Size**     | ~100 KB (gzipped)   | ~100 KB | 0% (no increase)       |
| **CD Cycles**       | High (impure pipe)  | -50%    | Pure pipe optimization |
| **Memory Usage**    | Baseline            | -20%    | Fewer subscriptions    |
| **Cold Build Time** | Baseline            | ±5%     | Minimal impact         |
| **Test Time**       | Baseline            | ±5%     | Minimal impact         |
| **Resolution Time** | 0.05ms              | 0.05ms  | No change (same logic) |

### Success Criteria

✅ **Must achieve:**

- Bundle size: No increase (< 5% acceptable)
- CD performance: At least 30% reduction in pipe transform calls
- Memory: No leaks detected
- Build time: No degradation (< 10% acceptable)
- Test coverage: Maintain or improve (≥ 90%)

⚠️ **Nice to have:**

- CD performance: 50%+ reduction with pure pipe
- Memory: 20% reduction with signal-based state
- Type safety: Improved developer experience

---

## Measurement Schedule

### Phase 1: Before Migration (Now)

- ✅ Capture baseline metrics
- ✅ Document current performance
- ✅ Set up measurement scripts

### Phase 2: During Migration

- 🔄 Monitor build times don't regress
- 🔄 Run performance tests after each phase

### Phase 3: After Migration

- 📊 Capture final metrics
- 📊 Generate comparison report
- 📊 Validate success criteria met

### Phase 4: Continuous Monitoring

- 📈 Add performance tests to CI/CD
- 📈 Track metrics over time
- 📈 Alert on regressions

---

## CI/CD Integration

**Add to GitHub Actions / CI pipeline:**

```yaml
# .github/workflows/i18n-performance.yml
name: i18n Performance Monitoring

on:
    push:
        branches: [main, feat/i18n-signals-migration]
    pull_request:
        paths:
            - 'libs/i18n/**'

jobs:
    performance:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: 20

            - name: Install dependencies
              run: npm ci

            - name: Run performance benchmarks
              run: |
                  npx ts-node tools/scripts/capture-i18n-baseline.ts

            - name: Upload metrics
              uses: actions/upload-artifact@v3
              with:
                  name: performance-metrics
                  path: i18n-*-metrics.json

            - name: Comment PR with results
              if: github.event_name == 'pull_request'
              uses: actions/github-script@v6
              with:
                  script: |
                      const fs = require('fs');
                      const metrics = JSON.parse(fs.readFileSync('i18n-baseline-metrics.json'));

                      const comment = `
                      ## 📊 i18n Performance Report

                      - **Bundle Size:** ${(metrics.bundleSize.library.gzipped / 1024).toFixed(2)} KB
                      - **Build Time:** ${metrics.build.coldBuildTime.toFixed(2)}s
                      - **Test Time:** ${metrics.build.testExecutionTime.toFixed(2)}s
                      `;

                      github.rest.issues.createComment({
                        issue_number: context.issue.number,
                        owner: context.repo.owner,
                        repo: context.repo.repo,
                        body: comment
                      });
```

---

## Next Steps

1. **Run baseline script:**

    ```bash
    npx ts-node tools/scripts/capture-i18n-baseline.ts
    ```

2. **Review baseline results**

    - Verify all metrics captured successfully
    - Document any anomalies

3. **Commit baseline data:**

    ```bash
    git add i18n-baseline-metrics.json I18N_MIGRATION_BASELINE.md
    git commit -m "chore(i18n): capture baseline metrics before signal migration"
    ```

4. **Begin migration** with confidence that we can validate improvements

---

**Document Status:** Ready for Execution
**Last Updated:** February 28, 2026
**Related Documents:**

- [I18N_MIGRATION_PLAN.md](./I18N_MIGRATION_PLAN.md)
- [AGENTS.md](./AGENTS.md)
