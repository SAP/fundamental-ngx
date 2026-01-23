const getFileContents = require('./get-file-contents');
const { execSync } = require('child_process');

/**
 * Get the version from git tags (NX Release compatible) or fall back to package.json.
 * This aligns with NX Release's currentVersionResolver: "git-tag" configuration.
 *
 * Priority:
 * 1. Git tags (latest semver tag from current HEAD)
 *    - Compares latest stable vs latest prerelease, picks whichever is newer
 *    - Uses --merged HEAD to respect branch history (critical for hotfix branches)
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

        // Get latest stable version (no "-" in tag)
        let latestStable = '';
        try {
            latestStable = execSync(
                'git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | grep -v -- "-" | head -1',
                {
                    encoding: 'utf8',
                    stdio: ['pipe', 'pipe', 'pipe']
                }
            ).trim();
        } catch (e) {
            // No stable version found
        }

        // Get latest prerelease version
        let latestPrerelease = '';
        try {
            latestPrerelease = execSync('git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | head -1', {
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            }).trim();
        } catch (e) {
            // No tags found
        }

        // Compare and pick the newer version
        // If we have v0.58.0 (stable) and v0.59.0-rc.0 (prerelease), pick v0.59.0-rc.0
        let latestTag = '';
        if (latestStable && latestPrerelease) {
            const semver = require('semver');
            const stableVersion = latestStable.replace(/^v/, '');
            const prereleaseVersion = latestPrerelease.replace(/^v/, '');

            // Pick whichever is newer
            latestTag = semver.gt(prereleaseVersion, stableVersion) ? latestPrerelease : latestStable;
        } else {
            // Use whichever exists
            latestTag = latestStable || latestPrerelease;
        }

        if (latestTag) {
            // Remove 'v' prefix (e.g., "v0.58.0" -> "0.58.0" or "v0.59.0-rc.0" -> "0.59.0-rc.0")
            return latestTag.replace(/^v/, '');
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
