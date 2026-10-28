const semver = require('semver');

const resolveVersion = ({ isManual, isHotfix, currentVersion, branchVersion }) =>
    isManual && isHotfix
        ? semver.valid(branchVersion)
            ? branchVersion
            : (() => {
                  throw new Error('Manual hotfix release requires a valid version in libs/core/package.json');
              })()
        : currentVersion;

module.exports = resolveVersion;
