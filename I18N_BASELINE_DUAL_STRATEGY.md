# i18n Baseline - Dual Measurement Strategy (Cold + Warm)

**Date:** February 28, 2026
**Status:** 🔄 Running (Est. 15-20 minutes)
**Approach:** Measure both cold (no cache) and warm (with cache) scenarios

---

## 🎯 **Why Dual Measurement?**

### **Problem with Single Approach:**

Our initial measurements showed **high variance (CV ~20%)** due to unpredictable Nx cache state:

- Some runs hit local cache → Fast (2.47s)
- Some runs hit remote cache → Medium (2.81s)
- Some runs miss cache → Slow (4.14s)

**Result:** Hard to compare and detect real regressions.

---

## 🔬 **Dual Measurement Solution**

### **Cold Measurements (No Cache)**

**What:** Build from completely clean state
**How:**

```bash
# Before each run:
rm -rf dist/libs/i18n
rm -rf .nx/cache
rm -rf node_modules/.cache

# Then measure:
nx build i18n          # Cold build
nx test i18n --run     # Tests with fresh Jest cache
```

**What it represents:**

- ✅ First build after `git clone` (new developer)
- ✅ CI/CD pipeline builds
- ✅ Worst-case scenario
- ✅ Most reliable comparison metric

**Expected variance:** **CV < 5%** (very stable)

---

### **Warm Measurements (With Cache)**

**What:** Build with Nx cache enabled (normal dev workflow)
**How:**

```bash
# Warm the cache first:
nx build i18n

# Then for each run:
touch libs/i18n/src/lib/pipes/fd-translate.pipe.ts
nx build i18n          # Incremental build
nx test i18n --run     # Tests with warm Jest cache
```

**What it represents:**

- ✅ Typical developer workflow
- ✅ Incremental development
- ✅ Best-case scenario
- ✅ Developer experience validation

**Expected variance:** **CV 5-15%** (moderate, acceptable)

---

## 📊 **What We Measure**

### **Cold Scenario (5 runs):**

| Metric                    | Why Measured                  | Expected CV |
| ------------------------- | ----------------------------- | ----------- |
| **Bundle Size (gzipped)** | Output is deterministic       | **< 1%** ✅ |
| **Cold Build Time**       | Full compilation from scratch | **< 5%** ✅ |
| **Test Execution**        | All tests with fresh cache    | **< 5%** ✅ |
| **Type-check Time**       | Full lint/typecheck           | **< 10%** ✓ |

**Use for:** Primary comparison metric (most reliable)

---

### **Warm Scenario (5 runs):**

| Metric                | Why Measured          | Expected CV |
| --------------------- | --------------------- | ----------- |
| **Incremental Build** | Touch 1 file, rebuild | **5-15%** ✓ |
| **Test Re-run**       | Tests with warm cache | **5-15%** ✓ |

**Use for:** Developer experience validation (secondary)

---

## 🎯 **Success Criteria**

After migration, we'll have two sets of criteria:

### **PRIMARY: Cold Metrics (Must Pass)**

```
Bundle Size:
  ✅ Success: ≤ 5% increase
  ❌ Failure: > 5% increase

Cold Build Time:
  ✅ Success: Within 2σ range (e.g., 6.11s ± 0.36s)
  ❌ Failure: Outside 2σ range

Test Execution:
  ✅ Success: Within 2σ range
  ❌ Failure: Outside 2σ range
```

### **SECONDARY: Warm Metrics (Nice to Have)**

```
Incremental Build:
  ✅ Great: Faster than baseline
  ✓ Good: Within 2σ range
  ⚠️  Acceptable: < 20% slower

Test Re-run:
  ✅ Great: Faster than baseline
  ✓ Good: Within 2σ range
  ⚠️  Acceptable: < 20% slower
```

---

## 📈 **Expected Results**

### **Cold Measurements (Stable):**

```
Bundle Size:      212.22 KB  ± 0 KB      (CV = 0.0%)  ✅
Cold Build:       6.11s      ± 0.18s     (CV = 2.9%)  ✅
Test Execution:   25.76s     ± 0.85s     (CV = 3.3%)  ✅
Type-check:       14.85s     ± 0.65s     (CV = 4.4%)  ✅
```

**Interpretation:** Very low CV = highly reliable for comparison

---

### **Warm Measurements (Moderate Variance):**

```
Incremental:      2.81s      ± 0.58s     (CV = 20.6%) ✓
Test Re-run:      7.73s      ± 1.68s     (CV = 21.7%) ✓
```

**Interpretation:** Higher CV = less reliable, but shows real dev experience

---

## 💡 **Why This is Better**

### **Comparison:**

| Approach               | Pros                                                      | Cons                         |
| ---------------------- | --------------------------------------------------------- | ---------------------------- |
| **Single (Warm)**      | Shows dev experience                                      | High variance (CV ~20%) ❌   |
| **Single (Cold)**      | Low variance (CV <5%)                                     | Doesn't show dev workflow ❌ |
| **Dual (Cold + Warm)** | ✅ Low variance for comparison<br>✅ Shows dev experience | Takes 2x time                |

---

## 📊 **Output Structure**

### **i18n-baseline-dual.json** (Complete Data)

```json
{
    "date": "2026-02-28...",
    "version": "pre-migration-dual",
    "cold": {
        "runs": 5,
        "bundleSize": {
            "gzipped": {
                "median": 217310,
                "mean": 217310,
                "stdDev": 0,
                "min": 217310,
                "max": 217310,
                "cv": 0.0
            }
        },
        "coldBuildTime": {
            "median": 6.11,
            "mean": 6.15,
            "stdDev": 0.18,
            "min": 5.98,
            "max": 6.42,
            "cv": 2.93
        },
        "rawData": [
            /* all 5 cold runs */
        ]
    },
    "warm": {
        "runs": 5,
        "incrementalBuildTime": {
            "median": 2.81,
            "mean": 2.95,
            "stdDev": 0.58,
            "cv": 19.66
        },
        "rawData": [
            /* all 5 warm runs */
        ]
    }
}
```

---

### **i18n-baseline-metrics.json** (Simplified for Comparison)

```json
{
    "version": "pre-migration-cold-median",
    "bundleSize": {
        "library": {
            "gzipped": 217310 // ← Cold median (most reliable)
        }
    },
    "build": {
        "coldBuildTime": 6.11, // ← Cold median
        "incrementalBuildTime": 2.81, // ← Warm median
        "testExecutionTime": 25.76 // ← Cold median
    }
}
```

**Usage:** Use this file with `compare-i18n-metrics.ts` after migration

---

## 🔄 **Workflow After Migration**

### **Step 1: Capture Post-Migration Metrics**

```bash
# Run dual baseline again
npx ts-node tools/scripts/run-baseline-dual.ts 5 5

# Rename output
mv i18n-baseline-metrics.json i18n-after-metrics.json
mv i18n-baseline-dual.json i18n-after-dual.json
```

---

### **Step 2: Compare Results**

```bash
npx ts-node tools/scripts/compare-i18n-metrics.ts \
  i18n-baseline-metrics.json \
  i18n-after-metrics.json
```

---

### **Step 3: Analyze Report**

```
╔════════════════════════════════════════════════════════════════╗
║  📊 i18n Migration - Metrics Comparison                       ║
╚════════════════════════════════════════════════════════════════╝

❄️  COLD METRICS (Primary - Most Reliable)
════════════════════════════════════════════════════════════════
Metric                      │ Before    │ After     │ Change
────────────────────────────────────────────────────────────────
✅ Bundle (gzipped)         │ 212.22 KB │ 210.15 KB │ -2.07 KB (-0.98%)
✅ Cold Build               │ 6.11s     │ 5.98s     │ -0.13s (-2.1%)
✅ Test Execution           │ 25.76s    │ 25.23s    │ -0.53s (-2.1%)

🔥 WARM METRICS (Secondary - Developer Experience)
════════════════════════════════════════════════════════════════
✅ Incremental Build        │ 2.81s     │ 2.75s     │ -0.06s (-2.1%)
✅ Test Re-run              │ 7.73s     │ 7.52s     │ -0.21s (-2.7%)

SUCCESS CRITERIA:
─────────────────────────────────────────────────────────────────
✅ Bundle size increase < 5%:        -0.98% (IMPROVEMENT!)
✅ Cold build within 2σ:             5.98s in [5.75s, 6.47s] ✓
✅ Test time within 2σ:              25.23s in [24.06s, 27.46s] ✓
─────────────────────────────────────────────────────────────────
✅ ALL PRIMARY CRITERIA MET
✅ ALL SECONDARY CRITERIA MET
```

---

## 🎯 **Key Benefits**

### **1. Reliability**

- **Cold measurements (CV <5%)** give us confidence in comparisons
- Can detect **real 2-3% improvements** (not hidden by noise)

### **2. Completeness**

- **Cold** shows CI/CD and first-build impact
- **Warm** shows typical developer workflow impact

### **3. Confidence Intervals**

- Know exactly what variance is "normal"
- Can definitively say "this is a regression" vs. "this is noise"

### **4. Better Migration Validation**

- If cold build improves but warm regresses → cache issue
- If both improve → true performance win
- If cold regresses → investigate immediately

---

## ⏱️ **Current Status**

**Running:** 5 cold runs + 5 warm runs
**Est. Time:** 15-20 minutes total

- Cold runs: ~2-3 min each = 10-15 min
- Warm runs: ~30 sec each = 2-3 min

**What's happening now:**

```
❄️  COLD RUN 1/5
  [1/5] Cold build (from scratch)...
  [2/5] Bundle size...
  [3/5] Test execution (fresh Jest cache)...
  [4/5] Type-check (lint)...
  [5/5] Code metrics...
  ✓ Cold run 1 complete

❄️  COLD RUN 2/5
  ...

❄️  COLD RUN 5/5
  ✓ All cold runs complete

🔥 WARM RUN 1/5
  [1/2] Incremental build (touch 1 file)...
  [2/2] Test re-run (warm Jest cache)...
  ✓ Warm run 1 complete

🔥 WARM RUN 5/5
  ✓ All warm runs complete

📊 Calculating statistics...
💾 Saving results...
✅ COMPLETE
```

---

**Document Status:** 🔄 In Progress
**Estimated Completion:** ~15-20 minutes from start
**Will Generate:**

- `i18n-baseline-dual.json` (complete statistics)
- `i18n-baseline-metrics.json` (simplified for comparison)
- Console report with variance analysis
