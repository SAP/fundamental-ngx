const semver = require('semver');
const getVersion = require('./get-version');
const getAngularVersion = require('./angular-version');
/**
 * Get the release tag for the current release
 * @param isHotfix {boolean}
 * @param isPrerelease {boolean}
 * @param currentVersion {string}
 * @returns {Promise<'latest' | 'hotfix' | 'prerelease' | `ng${number}`>}
 */
module.exports = async (isHotfix, isPrerelease, currentVersion) => {
    const currentAngularVersion = getAngularVersion();
    const mainAngularVersion = getAngularVersion('origin/main');
    if (isHotfix && isPrerelease) {
        throw new Error('Cannot be both hotfix and a prerelease');
    }
    if (isHotfix) {
        if (currentAngularVersion !== mainAngularVersion) {
            return `ng${currentAngularVersion}`;
        }
        const latestVersion = getVersion('origin/main');
        if (semver.lt(latestVersion, currentVersion)) {
            return 'latest';
        }
        return 'hotfix';
    }
    if (isPrerelease) {
        return 'prerelease';
    }
    return 'latest';
};
