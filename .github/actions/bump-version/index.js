const semver = require('semver');
const core = require('@actions/core');
const { getInput } = require('@actions/core');
const currentVersion = require('../helpers/current-version');
const getFileContents = require('../helpers/get-file-contents');
const releaseType = core.getInput('isPrerelease') !== 'false' ? 'prerelease' : 'release';
const isHotfix = getInput('isHotfix') !== 'false';
const prereleaseRequested = releaseType === 'prerelease';
const isManual = getInput('isManual') !== 'false';
const bumpedRelease = require('../helpers/bumped-release');
const getReleaseTag = require('../helpers/get-release-tag');

const run = async () => {
    if (isManual) {
        const versionForRelease = isHotfix ? getFileContents('libs/core/package.json', null).version : currentVersion;
        const isPrerelease = !!semver.prerelease(versionForRelease, undefined);
        const releaseTag = await getReleaseTag(isHotfix, isPrerelease, versionForRelease);
        core.setOutput('newVersion', versionForRelease);
        core.setOutput('isPrerelease', isPrerelease.toString());
        core.setOutput('releaseTag', releaseTag);
        core.info('new version is ' + versionForRelease + ' with release tag ' + releaseTag);
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
