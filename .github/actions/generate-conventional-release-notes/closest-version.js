const semver = require('semver');
const semverTags = require('../helpers/git-semver-tags');

const currentVersion = require('../helpers/current-version');

const previousVersionPredicateForPrerelease = (v) => semver.gt(currentVersion, v) && v !== `v${currentVersion}`;
const previousVersionPredicateForRelease = (v) => !semver.prerelease(v) && previousVersionPredicateForPrerelease(v);

module.exports = async () => {
    const isPrerelease = !!semver.prerelease(currentVersion);
    const availableVersions = await semverTags(currentVersion);
    const closestIndex = availableVersions.findIndex(
        isPrerelease ? previousVersionPredicateForPrerelease : previousVersionPredicateForRelease
    );
    return {
        closest: availableVersions[closestIndex],
        tagsTillClosest: availableVersions.slice(0, closestIndex)
    };
};
