const semver = require('semver');
const fs = require('fs');
const core = require('@actions/core');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const currentVersion = packageJson.version;

const run = async () => {
    const prerelease = !!semver.prerelease(currentVersion, undefined);

    if (prerelease) {
        core.info(`Current version is a prerelease, skipping...`);
    } else {
        core.info(`Current version is a stable release, continuing...`);
    }

    core.setOutput('pre-release', prerelease);
    core.setOutput('version', currentVersion);
};

run();
