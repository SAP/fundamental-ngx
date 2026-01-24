#!/usr/bin/env node
/**
 * Release Scenario Playground
 *
 * This script allows you to simulate different release scenarios by configuring:
 * - isPrerelease: Whether this is a prerelease (push to main)
 * - isHotfix: Whether this is a hotfix (push to tmp_hotfix_branch)
 * - isManual: Whether this was triggered by a "chore(release)" commit
 * - availableTags: Git tags that would be visible (merged to HEAD)
 * - packageJsonVersion: Version in package.json (fallback)
 *
 * Usage:
 *   node release-scenario.playground.js
 *
 * Or modify the SCENARIO object below and run to test different cases.
 */

const semver = require('semver');

// ============================================================================
// PREDEFINED SCENARIOS - Change ACTIVE_SCENARIO to test different cases
// ============================================================================

const ACTIVE_SCENARIO = 'STABLE_NO_RC'; // <-- CHANGE THIS TO TEST DIFFERENT SCENARIOS

const SCENARIOS = {
    // The bug we fixed: prerelease RC should continue, not restart from stable
    PR_13773_BUG: {
        name: 'PR #13773 Bug',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.59.0-rc.0', 'v0.58.1', 'v0.58.0-rc.114', 'v0.58.0', 'v0.57.0'],
        packageJsonVersion: '0.58.1',
        conventionalBumpType: 'patch',
        expected: '0.59.0-rc.1'
    },

    // Continue RC when already in prerelease
    CONTINUE_RC: {
        name: 'Continue RC releases on main',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.59.0-rc.5', 'v0.59.0-rc.4', 'v0.58.1', 'v0.58.0'],
        packageJsonVersion: '0.59.0-rc.5', // matches latest tag
        conventionalBumpType: 'patch',
        expected: '0.59.0-rc.6'
    },

    // First RC after a stable release
    FIRST_RC_AFTER_STABLE: {
        name: 'First RC after stable release',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.58.1', 'v0.58.0', 'v0.57.0'],
        packageJsonVersion: '0.58.1',
        conventionalBumpType: 'patch',
        expected: '0.58.2-rc.0'
    },

    // Stable release from RC (graduating RC to stable)
    STABLE_FROM_RC: {
        name: 'Graduate RC to stable release',
        isPrerelease: false,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.59.0-rc.5', 'v0.58.1', 'v0.58.0'],
        packageJsonVersion: '0.59.0-rc.5', // matches latest tag
        conventionalBumpType: 'patch',
        expected: '0.59.0'
    },

    // Stable release from RC (graduating RC to stable)
    STABLE_FROM_RC2: {
        name: 'Graduate RC to stable release',
        isPrerelease: false,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.58.2-rc.5', 'v0.58.2-rc.4', 'v0.58.1', 'v0.58.0'],
        packageJsonVersion: '0.58.2-rc.5', // matches latest tag
        conventionalBumpType: 'patch',
        expected: '0.58.2'
    },

    // Hotfix on older version branch
    HOTFIX_OLD_VERSION: {
        name: 'Hotfix on older version (v0.54.x branch)',
        isPrerelease: false,
        isHotfix: true,
        isManual: false,
        availableTags: ['v0.54.1', 'v0.54.0', 'v0.53.0'],
        packageJsonVersion: '0.54.1',
        conventionalBumpType: 'patch',
        expected: '0.54.2'
    },

    // Hotfix with minor bump
    // ⚠️ ANTI-PATTERN: Features shouldn't be on hotfix branches
    // This documents behavior if it accidentally happens
    HOTFIX_MINOR: {
        name: 'Hotfix with minor version bump',
        isPrerelease: false,
        isHotfix: true,
        isManual: false,
        availableTags: ['v0.54.1', 'v0.54.0', 'v0.53.0'],
        packageJsonVersion: '0.54.1',
        conventionalBumpType: 'minor',
        expected: '0.55.0'
    },

    // Re-entrancy guard: Skip bump when workflow detects its own release commit
    // This prevents infinite loop: push → release → commit → push → release → ...
    RELEASE_COMMIT_GUARD: {
        name: 'Skip bump on release commit (re-entrancy guard)',
        isPrerelease: true,
        isHotfix: false,
        isManual: true, // triggered by detecting "chore(release)" in commit message
        availableTags: ['v0.59.0-rc.0', 'v0.58.1'],
        packageJsonVersion: '0.59.0-rc.0',
        conventionalBumpType: 'patch',
        expected: '0.59.0-rc.0 (no bump, uses current version)'
    },

    // Feature causes minor bump during RC
    FEATURE_DURING_RC: {
        name: 'Feature (minor) during RC cycle',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.59.0-rc.3', 'v0.58.1'],
        packageJsonVersion: '0.59.0-rc.3', // matches latest tag
        conventionalBumpType: 'minor',
        expected: '0.59.0-rc.4 (minor <= current minor, so just increment RC)'
    },

    // Breaking change during patch RC - bumps to minor RC
    BREAKING_DURING_PATCH_RC: {
        name: 'Breaking change during patch RC cycle',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        // Latest stable: 0.34.0, currently on patch RC 0.34.1-rc.1
        // Breaking change should bump to 0.35.0-rc.0
        availableTags: ['v0.34.1-rc.1', 'v0.34.1-rc.0', 'v0.34.0', 'v0.33.0'],
        packageJsonVersion: '0.34.1-rc.1', // matches latest tag
        conventionalBumpType: 'minor', // breaking change = minor bump in this project
        expected: '0.35.0-rc.0'
    },

    // Breaking change when already on minor RC - just continue
    BREAKING_DURING_MINOR_RC: {
        name: 'Breaking change during minor RC (already bumped)',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        // Latest stable: 0.34.0, already on minor RC 0.35.0-rc.1
        // Breaking change should just continue: 0.35.0-rc.2
        availableTags: ['v0.35.0-rc.1', 'v0.35.0-rc.0', 'v0.34.1-rc.0', 'v0.34.0'],
        packageJsonVersion: '0.35.0-rc.1', // matches latest tag
        conventionalBumpType: 'minor', // breaking change = minor bump
        expected: '0.35.0-rc.2'
    },

    // Breaking change from stable - starts minor RC
    BREAKING_FROM_STABLE: {
        name: 'Breaking change from stable (first minor RC)',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        // Latest stable: 0.34.0, no RC yet
        // Breaking change should start 0.35.0-rc.0
        availableTags: ['v0.34.0', 'v0.33.0', 'v0.32.0'],
        packageJsonVersion: '0.34.0',
        conventionalBumpType: 'minor', // breaking change = minor bump
        expected: '0.35.0-rc.0'
    },

    // Breaking change - stable release (graduating minor RC)
    BREAKING_STABLE_RELEASE: {
        name: 'Graduate breaking change RC to stable',
        isPrerelease: false,
        isHotfix: false,
        isManual: false,
        // On minor RC 0.35.0-rc.5, releasing stable
        availableTags: ['v0.35.0-rc.5', 'v0.34.0'],
        packageJsonVersion: '0.35.0-rc.5', // matches latest tag
        conventionalBumpType: 'minor',
        expected: '0.35.0'
    },

    // Stable release with no prereleases
    STABLE_NO_RC: {
        name: 'Stable release (no prior RC)',
        isPrerelease: false,
        isHotfix: false,
        isManual: false,
        availableTags: ['v0.58.1', 'v0.58.0', 'v0.57.0'],
        packageJsonVersion: '0.58.1',
        conventionalBumpType: 'patch',
        expected: '0.58.2'
    },

    // Empty tags - fallback to package.json
    NO_TAGS: {
        name: 'No git tags (new repo or shallow clone)',
        isPrerelease: true,
        isHotfix: false,
        isManual: false,
        availableTags: [],
        packageJsonVersion: '0.1.0',
        conventionalBumpType: 'minor',
        expected: '0.2.0-rc.0 (uses package.json fallback)'
    }
};

// ============================================================================
// GET ACTIVE SCENARIO
// ============================================================================

if (!SCENARIOS[ACTIVE_SCENARIO]) {
    console.error(`\n❌ Unknown scenario: "${ACTIVE_SCENARIO}"`);
    console.error(`\nAvailable scenarios:`);
    Object.keys(SCENARIOS).forEach((key) => {
        console.error(`   - ${key}: ${SCENARIOS[key].name}`);
    });
    process.exit(1);
}

const SCENARIO = SCENARIOS[ACTIVE_SCENARIO];

// ============================================================================
// SIMULATION LOGIC (mirrors the actual implementation)
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('RELEASE SCENARIO PLAYGROUND');
console.log('='.repeat(70));

console.log('\n📋 SCENARIO CONFIGURATION:');
console.log(`   isPrerelease: ${SCENARIO.isPrerelease}`);
console.log(`   isHotfix: ${SCENARIO.isHotfix}`);
console.log(`   isManual: ${SCENARIO.isManual}`);
console.log(
    `   availableTags: [${SCENARIO.availableTags.slice(0, 3).join(', ')}${SCENARIO.availableTags.length > 3 ? ', ...' : ''}]`
);
console.log(`   packageJsonVersion: ${SCENARIO.packageJsonVersion}`);
console.log(`   conventionalBumpType: ${SCENARIO.conventionalBumpType}`);

// Step 1: Determine current version (mirrors get-version.js)
console.log('\n' + '-'.repeat(70));
console.log('STEP 1: Determine Current Version (get-version.js)');
console.log('-'.repeat(70));

function getCurrentVersion(tags, fallbackVersion) {
    if (tags.length === 0) {
        console.log('   ⚠️  No tags found, using package.json fallback');
        return fallbackVersion;
    }

    // Remove 'v' prefix and filter valid semver
    const versions = tags.map((tag) => tag.replace(/^v/, '').trim()).filter((v) => semver.valid(v));

    console.log(`   📌 Valid versions found: ${versions.length}`);

    // Sort by semver (descending) - this is the FIX we implemented
    const sorted = semver.rsort(versions);
    console.log(`   📌 Sorted versions (top 5): ${sorted.slice(0, 5).join(', ')}`);

    const highest = sorted[0];
    console.log(`   ✅ Current version: ${highest}`);

    return highest;
}

const currentVersion = getCurrentVersion(SCENARIO.availableTags, SCENARIO.packageJsonVersion);

// Step 2: If manual release, skip version calculation
if (SCENARIO.isManual) {
    console.log('\n' + '-'.repeat(70));
    console.log('STEP 2: Manual Release Detected');
    console.log('-'.repeat(70));
    console.log(`   ⏭️  Skipping version bump - using current version: ${currentVersion}`);
    console.log(`   📦 This happens when commit message contains "chore(release)"`);

    const isPrerelease = !!semver.prerelease(currentVersion);
    console.log(`\n🎯 FINAL RESULT:`);
    console.log(`   New Version: ${currentVersion}`);
    console.log(`   Is Prerelease: ${isPrerelease}`);
    process.exit(0);
}

// Step 3: Calculate bumped release type (mirrors bumped-release.js)
console.log('\n' + '-'.repeat(70));
console.log('STEP 2: Calculate Release Type (bumped-release.js)');
console.log('-'.repeat(70));

function getBumpedReleaseType(currentVersion, conventionalBumpType, prereleaseRequested) {
    const typelist = ['major', 'minor', 'patch'].reverse();

    function isInPrerelease(version) {
        return Array.isArray(semver.prerelease(version));
    }

    function getCurrentActiveType(version) {
        for (let i = 0; i < typelist.length; i++) {
            if (semver[typelist[i]](version)) {
                return typelist[i];
            }
        }
    }

    function getTypePriority(type) {
        return typelist.indexOf(type);
    }

    function shouldContinuePrerelease(version, expectType) {
        return getCurrentActiveType(version) === expectType;
    }

    console.log(`   📌 Current version: ${currentVersion}`);
    console.log(`   📌 Is in prerelease: ${isInPrerelease(currentVersion)}`);
    console.log(`   📌 Conventional bump suggests: ${conventionalBumpType}`);
    console.log(`   📌 Prerelease requested: ${prereleaseRequested}`);

    let releaseType = conventionalBumpType;
    let reason = '';

    if (prereleaseRequested) {
        if (isInPrerelease(currentVersion)) {
            const currentActiveType = getCurrentActiveType(currentVersion);
            const currentPriority = getTypePriority(currentActiveType);
            const suggestedPriority = getTypePriority(conventionalBumpType);

            console.log(`   📌 Current active type: ${currentActiveType} (priority: ${currentPriority})`);
            console.log(`   📌 Suggested type: ${conventionalBumpType} (priority: ${suggestedPriority})`);

            if (shouldContinuePrerelease(currentVersion, conventionalBumpType) || currentPriority > suggestedPriority) {
                releaseType = 'prerelease';
                reason = `Continue prerelease (current: ${currentActiveType}, suggested: ${conventionalBumpType})`;
            } else {
                releaseType = 'pre' + conventionalBumpType;
                reason = `New prerelease cycle (${conventionalBumpType} > ${currentActiveType})`;
            }
        } else {
            releaseType = 'pre' + conventionalBumpType;
            reason = `Starting new prerelease from stable version`;
        }
    } else {
        reason = `Stable release with ${conventionalBumpType} bump`;
    }

    console.log(`   ✅ Release type: ${releaseType}`);
    console.log(`   📝 Reason: ${reason}`);

    return { releaseType, reason };
}

const prereleaseRequested = SCENARIO.isPrerelease;
const { releaseType, reason } = getBumpedReleaseType(
    currentVersion,
    SCENARIO.conventionalBumpType,
    prereleaseRequested
);

// Step 4: Calculate new version (mirrors bump-version/index.js)
console.log('\n' + '-'.repeat(70));
console.log('STEP 3: Calculate New Version (bump-version/index.js)');
console.log('-'.repeat(70));

function calculateNewVersion(currentVersion, releaseType, prereleaseRequested) {
    // Check if releaseType is already a valid semver (edge case)
    if (semver.valid(releaseType)) {
        console.log(`   📌 Release type is a valid version: ${releaseType}`);
        return releaseType;
    }

    const newVersion = semver.inc(currentVersion, releaseType, prereleaseRequested, 'rc');
    console.log(`   📌 semver.inc("${currentVersion}", "${releaseType}", ${prereleaseRequested}, "rc")`);
    console.log(`   ✅ New version: ${newVersion}`);

    return newVersion;
}

const newVersion = calculateNewVersion(currentVersion, releaseType, prereleaseRequested);

// Step 5: Determine release tags (mirrors release-tags action)
console.log('\n' + '-'.repeat(70));
console.log('STEP 4: Determine Release Tags (release-tags action)');
console.log('-'.repeat(70));

function getReleaseTag(isHotfix, isPrerelease, version) {
    if (isPrerelease) {
        return 'prerelease';
    }

    if (isHotfix) {
        // Would need to compare with latest version on main
        // Simplified here - in reality checks if version < latest
        return 'hotfix'; // or 'latest' if version > latest
    }

    return 'latest';
}

const isNewVersionPrerelease = !!semver.prerelease(newVersion);
const npmTag = getReleaseTag(SCENARIO.isHotfix, isNewVersionPrerelease, newVersion);

console.log(`   📌 Is new version a prerelease: ${isNewVersionPrerelease}`);
console.log(`   ✅ NPM tag: ${npmTag}`);

// Final summary
console.log('\n' + '='.repeat(70));
console.log('🎯 FINAL RESULT');
console.log('='.repeat(70));
console.log(`
   Current Version:  ${currentVersion}
   Release Type:     ${releaseType}
   New Version:      ${newVersion}
   Is Prerelease:    ${isNewVersionPrerelease}
   NPM Tag:          ${npmTag}
   
   Reason: ${reason}
`);

// Validate against expected version
console.log('\n' + '='.repeat(70));
console.log('✅ VALIDATION');
console.log('='.repeat(70));

// Extract just the version number from expected (may contain explanatory text)
const expectedVersion = SCENARIO.expected.split(' ')[0];
const passed = newVersion === expectedVersion;

console.log(`\n   Expected: ${expectedVersion}`);
console.log(`   Actual:   ${newVersion}`);
console.log('');

if (passed) {
    console.log(`   ✅ PASS - Version matches expected!`);
} else {
    console.log(`   ❌ FAIL - Version does NOT match expected!`);
    console.log(`   `);
    console.log(`   This could mean:`);
    console.log(`   - The expected value in the scenario is wrong`);
    console.log(`   - There's a bug in the version calculation logic`);
}

console.log('\n' + '='.repeat(70));
console.log('📚 AVAILABLE SCENARIOS:');
console.log('='.repeat(70));
console.log(`\nChange ACTIVE_SCENARIO at top of file to test different cases:\n`);
Object.entries(SCENARIOS).forEach(([key, scenario]) => {
    const marker = key === ACTIVE_SCENARIO ? '➡️ ' : '   ';
    console.log(`${marker}${key}`);
    console.log(`      ${scenario.name}`);
    console.log(`      Expected: ${scenario.expected}\n`);
});
