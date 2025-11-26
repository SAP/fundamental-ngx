const getFileContents = require('./get-file-contents');
const { execSync } = require('child_process');

/**
 * Get the version from git tags (NX Release compatible) or fall back to package.json.
 * This aligns with NX Release's currentVersionResolver: "git-tag" configuration.
 *
 * Priority:
 * 1. Git tags (latest semver tag, e.g., v0.58.0-rc.19)
 * 2. package.json (workspace root - maintained by NX Release)
 *
 * @param branch - Optional branch to get version from
 * @returns {string} - The current version
 */
module.exports = (branch = null) => {
    // If checking a specific branch, use package.json
    if (branch) {
        return getFileContents('package.json', branch).version;
    }

    // For current branch, prefer git tags (NX Release standard)
    try {
        const latestTag = execSync('git tag --sort=-v:refname | grep "^v[0-9]" | head -1', {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        }).trim();

        if (latestTag) {
            // Remove 'v' prefix (e.g., "v0.58.0-rc.19" -> "0.58.0-rc.19")
            return latestTag.replace(/^v/, '');
        }
    } catch (e) {
        // Git command failed or no tags found, fall through to package.json
    }

    // Fall back to package.json (NX Release maintains this)
    try {
        return getFileContents('package.json').version;
    } catch (e) {
        throw new Error('Could not determine current version from git tags or package.json');
    }
};
