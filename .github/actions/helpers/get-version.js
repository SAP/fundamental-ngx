const getFileContents = require('./get-file-contents');
const { execSync } = require('child_process');

/**
 * Get the version from git tags (NX Release compatible) or fall back to package.json.
 * This aligns with NX Release's currentVersionResolver: "git-tag" configuration.
 *
 * Priority:
 * 1. Git tags (latest semver tag, e.g., v0.58.0-rc.19)
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
        // First, try to get the latest stable (non-prerelease) version
        // Exclude tags with "-" which indicates prerelease (rc, alpha, beta, etc.)
        let latestTag = execSync(
            'git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | grep -v -- "-" | head -1',
            {
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            }
        ).trim();

        // If no stable version exists, fall back to latest prerelease
        if (!latestTag) {
            latestTag = execSync('git tag --merged HEAD --sort=-v:refname | grep "^v[0-9]" | head -1', {
                encoding: 'utf8',
                stdio: ['pipe', 'pipe', 'pipe']
            }).trim();
        }

        if (latestTag) {
            // Remove 'v' prefix (e.g., "v0.58.0-rc.19" -> "0.58.0-rc.19")
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
