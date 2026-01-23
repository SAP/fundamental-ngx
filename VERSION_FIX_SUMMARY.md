# Version Calculation Fixes - Summary

## Problems Identified and Fixed

### 1. Original Bug: Stable Releases Ignored After NX Migration

**Problem:** After releasing v0.58.0, next versions were 0.58.0-rc.113/114/115 instead of 0.58.1-rc.0 or 0.59.0-rc.0

**Root Cause:**

- NX Release migration (commit 2b2f5471e1) introduced git tag-based version detection
- Git's version sort (`--sort=-v:refname`) incorrectly sorted v0.58.0-rc.115 as newer than v0.58.0

**Solution Implemented in `.github/actions/helpers/get-version.js`:**

1. Use `--merged HEAD` flag to only consider tags reachable from current branch (enables hotfix support)
2. Query both stable tags (filter out `-`) and all tags separately
3. Compare stable vs prerelease using `semver.gt()` and pick whichever is newer

### 2. Second Bug: New Prerelease After Stable Release

**Problem:** After releasing v0.59.0-rc.0, next version was 0.58.2-rc.0 instead of 0.59.0-rc.1

**Root Cause:**

- Initial fix only prioritized stable versions when prerelease tags existed
- Didn't handle case where newest prerelease is newer than newest stable

**Solution:**

- Enhanced comparison logic to use `semver.gt()` on both stable and prerelease
- Always pick whichever version is semantically newer

### 3. Manual Release Bug: RC to Stable Conversion

**Problem:** When `IS_MANUAL=true`, converting RC version to stable (e.g., 0.34.5-rc.5 → 0.34.5) would fail

**Root Cause:**

- In manual release workflow, package.json is updated before workflow runs
- But `bump-version/index.js` used `currentVersion` from get-version.js
- get-version.js reads git tags first, which still had the RC version
- Result: Wrong version used for git tag creation

**Solution Implemented in `.github/actions/bump-version/index.js`:**

- When `isManual=true`, read version directly from local package.json
- Use `getFileContents('libs/core/package.json', null)` to read local file (not origin/main)
- This ensures manually updated version is used, not the git tag version

## Files Modified

### `.github/actions/helpers/get-version.js`

```javascript
// Added --merged HEAD for hotfix branch support
const allTags = execSync('git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]"');

// Separate queries for stable and prerelease tags
const stableTags = execSync('git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | grep -v -- "-"');

// Compare and pick newest
if (stableVersion && prereleaseVersion) {
    return semver.gt(stableVersion, prereleaseVersion) ? stableVersion : prereleaseVersion;
}
```

### `.github/actions/bump-version/index.js`

```javascript
if (isManual) {
    // Read from local package.json, not git tags
    const getFileContents = require('../helpers/get-file-contents');
    const manualVersion = getFileContents('libs/core/package.json', null).version;
    // ... use manualVersion for outputs
}
```

### `.github/actions/helpers/get-version.spec.js`

- Created comprehensive test suite with 16+ scenarios
- Tests cover stable vs prerelease priority, hotfix branches, edge cases
- All tests passing ✅

### `.github/TESTING.md`

- Updated with information about new test coverage

## Validation Results

### ✅ All Test Scenarios Passing

**Case 1: After Stable Release**

- Current: v0.58.0 (stable)
- Breaking change → v0.59.0-rc.0 ✓
- Non-breaking change → v0.58.1-rc.0 ✓

**Case 2: Breaking Changes on RC Version**

- Current: v0.59.0-rc.0 (minor RC)
    - More minor commits → v0.59.0-rc.1 ✓
    - Patch commits → v0.59.0-rc.1 (absorbed) ✓
    - More breaking commits → v0.59.0-rc.1 ✓
- Current: v0.58.2-rc.0 (patch RC)
    - Breaking change → v0.59.0-rc.0 (new series) ✓

**Case 3: Non-Breaking Changes on RC Version**

- Current: v0.59.0-rc.0 (minor RC)
    - Patch commits → v0.59.0-rc.1 (absorbed) ✓
- Current: v0.58.2-rc.0 (patch RC)
    - Patch commits → v0.58.2-rc.1 ✓
    - Minor change → v0.59.0-rc.0 (new series) ✓

**Manual Release (isManual=true)**

- Current tag: v0.34.5-rc.5
- Manual update to: 0.34.5
- Result: Git tag created with v0.34.5 ✓

**Hotfix Branch Support**

- Branch: docs/0.57
- Latest tag on branch: v0.57.5
- Latest tag on main: v0.58.0
- Result: Detects v0.57.5 correctly ✓

## How It Works Now

### Normal Releases (isManual=false)

1. Workflow merges PR to main
2. `get-version.js` queries git tags with `--merged HEAD`
3. Compares stable vs prerelease versions, picks newest
4. `bumped-release.js` analyzes commits for release type
5. Calculates next version and creates git tag

### Manual Releases (isManual=true)

1. Developer manually updates package.json files to target version
2. Developer commits with `chore(release): publish X.Y.Z`
3. Workflow detects IS_MANUAL=true
4. `bump-version.js` reads version from local package.json (not git tags)
5. Workflow creates git tag with manually specified version

### Hotfix Releases

1. Create hotfix branch from older stable tag (e.g., `git checkout -b hotfix/0.57 v0.57.5`)
2. Make fixes and commit
3. Workflow uses `--merged HEAD` to only see tags reachable from hotfix branch
4. Version calculated from v0.57.5, not from main branch's v0.58.0

## Testing

### Unit Tests

```bash
cd .github/actions/helpers && node test-helpers.js
```

8/8 tests passing, including new Jest test suite for get-version.js

### Manual Validation

All test scripts created during investigation validated the fixes work correctly.

## Documentation

- Test coverage documented in `.github/TESTING.md`
- Inline code comments explain the rationale for each fix
- This summary document provides complete context

## Recommendations

1. ✅ **Deploy these changes** - All fixes are validated and tested
2. ✅ **No breaking changes** - Existing workflows will continue to work
3. ✅ **Backward compatible** - Works with existing git tags and versioning scheme
4. 📝 **Consider adding E2E test** - Could add workflow test in `.github/workflows` that validates version calculation
5. 📝 **Document manual release process** - Add docs explaining how to perform manual releases

## Commands for Future Reference

```bash
# Test helper functions
cd .github/actions/helpers && node test-helpers.js

# Check what version would be detected
node -e "console.log(require('./.github/actions/helpers/get-version.js'))"

# See git tags as workflow sees them
git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | head -5
```
