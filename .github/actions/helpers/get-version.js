const getFileContents = require('./get-file-contents');
const npmPublishedVersion = require('./npm-published-version');
const { execSync } = require('child_process');
const semver = require('semver');

/**
 * Resolve the current version, aligning with NX Release's "git-tag" resolver.
 *
 * Current branch: highest of git tag (reachable from HEAD), libs/core/package.json,
 * and the npm-published version. npm acts as a floor because git tags aren't the
 * authority on "already published" — an orphaned release commit hides its tag from
 * `git tag --merged HEAD`, so the resolver would otherwise recompute an already-
 * published version and 403 on publish. See npm-published-version.js.
 *
 * @param branch - Optional branch to read the version from
 * @returns {string} - The current version
 */
module.exports = (branch = null) => {
    // If checking a specific branch, use libs/core/package.json (has actual version).
    // The npm floor is intentionally NOT applied here: this path is used for hotfix
    // main-sync comparisons and must stay pure and synchronous.
    if (branch) {
        try {
            return getFileContents('libs/core/package.json', branch).version;
        } catch (e) {
            // Fallback to root package.json
            return getFileContents('package.json', branch).version;
        }
    }

    // For current branch, prefer git tags (NX Release standard)
    try {
        // Use --merged HEAD to only consider tags reachable from current HEAD
        // This ensures hotfix branches on older versions work correctly
        // Get ALL version tags (including prereleases) and use semver to find the latest
        const validVersions = execSync('git tag --merged HEAD | grep "^v[0-9]"', {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        })
            .trim()
            .split('\n')
            .map((tag) => tag.trim().replace(/^v/, ''))
            .filter((v) => semver.valid(v));

        if (validVersions.length > 0) {
            // Sort by semver (including prereleases) and get the highest version
            // semver.rsort handles prerelease comparison correctly:
            // e.g., 0.59.0-rc.0 > 0.58.1 (because 0.59.0 > 0.58.1)
            let resolved = semver.rsort(validVersions)[0];

            // Floor 1: package.json version.
            // Handles cases where a release commit bumped package.json but tag creation failed.
            try {
                const packageVersion = getFileContents('libs/core/package.json', null).version;
                resolved = higherOf(resolved, packageVersion);
            } catch (e) {
                // Ignore errors reading package.json
            }

            // Floor 2: npm-published version.
            // Handles the orphaned-release-commit race where the pushed tag is not
            // reachable from HEAD but the version is already live on npm. Best-effort:
            // returns null (no-op) if npm cannot be reached.
            resolved = higherOf(resolved, npmPublishedVersion());

            return resolved;
        }
    } catch (e) {
        // Git command failed or no tags found, fall through to package.json
    }

    // Fall back to libs/core/package.json, then root package.json
    try {
        return getFileContents('libs/core/package.json').version;
    } catch (e) {
        try {
            return getFileContents('package.json').version;
        } catch (e2) {
            throw new Error('Could not determine current version from git tags or package.json');
        }
    }
};

/**
 * Return the higher valid semver of `current` / `candidate`.
 * A null/invalid candidate never lowers `current`.
 *
 * @param {string} current - Assumed valid semver
 * @param {string | null | undefined} candidate
 * @returns {string}
 */
function higherOf(current, candidate) {
    if (semver.valid(candidate) && semver.gt(candidate, current)) {
        return candidate;
    }
    return current;
}
