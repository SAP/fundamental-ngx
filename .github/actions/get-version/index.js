const semver = require('semver');
const { info, setOutput } = require('@actions/core');

const currentVersion = require('../helpers/current-version');

const run = async () => {
    const prerelease = !!semver.prerelease(currentVersion, undefined);

    if (prerelease) {
        info(`Current version is a prerelease, skipping...`);
    } else {
        info(`Current version is a stable release, continuing...`);
    }

    setOutput('pre-release', prerelease);
    setOutput('version', currentVersion);
};

run();
