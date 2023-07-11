const semver = require('semver');
const core = require('@actions/core');
const { getInput } = require('@actions/core');
const currentVersion = require('../helpers/current-version');
const releaseType = core.getInput('isPrerelease') !== 'false' ? 'prerelease' : 'release';
const isHotfix = getInput('isHotfix') !== 'false';
const prereleaseRequested = releaseType === 'prerelease';
const isManual = getInput('isManual') !== 'false';
const bumpedRelease = require('../helpers/bumped-release');
const getReleaseTag = require('../helpers/get-release-tag');

const run = async () => {
    if (isManual) {
        const isPrerelease = !!semver.prerelease(currentVersion, undefined);
        const releaseTag = await getReleaseTag(isHotfix, isPrerelease, currentVersion);
        core.setOutput('newVersion', currentVersion);
        core.setOutput('isPrerelease', isPrerelease.toString());
        core.setOutput('releaseTag', releaseTag);
        core.info(`new version is ${currentVersion} with release tag ${releaseTag}`);
        return;
    }
    const release = await bumpedRelease({ prereleaseRequested, currentVersion });
    core.info(`${release.reason}, therefore release type should be ${release.releaseType}`);

    const newVersion =
        semver.valid(release.releaseType, undefined) ||
        semver.inc(currentVersion, release.releaseType, prereleaseRequested, 'rc');

    const isPrerelease = !!semver.prerelease(newVersion, undefined);
    const releaseTag = await getReleaseTag(isHotfix, isPrerelease, newVersion);
    core.setOutput('newVersion', newVersion);
    core.setOutput('isPrerelease', isPrerelease.toString());
    core.setOutput('releaseTag', releaseTag);
    core.info(`new version is ${newVersion} with release tag ${releaseTag}`);
};

run();
