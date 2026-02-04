const getFileContents = require('./get-file-contents');
const { execSync } = require('child_process');
const semver = require('semver');

/**
 * Get the version from git tags (NX Release compatible) or fall back to package.json.
 * This aligns with NX Release's currentVersionResolver: "git-tag" configuration.
 *
 * Priority:
 * 1. Git tags (latest semver tag by semver comparison, including prereleases)
 * 2. libs/core/package.json (contains actual version)
 * 3. package.json (workspace root - fallback)
 *
 * @param branch - Optional branch to get version from
 * @returns {string} - The current version
 */
module.exports = (branch = null) => {
    // If checking a specific branch, use libs/core/package.json (has actual version)
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
            const sortedVersions = semver.rsort(validVersions);
            const tagVersion = sortedVersions[0];

            // Also check package.json version - use whichever is higher
            // This handles cases where a release commit bumped package.json but tag creation failed
            try {
                const packageVersion = getFileContents('libs/core/package.json', null).version;
                if (semver.valid(packageVersion) && semver.gt(packageVersion, tagVersion)) {
                    return packageVersion;
                }
            } catch (e) {
                // Ignore errors reading package.json
            }

            return tagVersion;
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
