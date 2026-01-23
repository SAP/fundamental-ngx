const semver = require('semver');
const core = require('@actions/core');
const { getInput } = require('@actions/core');
const currentVersion = require('../helpers/current-version');
const releaseType = core.getInput('isPrerelease') !== 'false' ? 'prerelease' : 'release';
const isHotfix = getInput('isHotfix') !== 'false';
// Hotfixes should always create stable releases (patch bumps), not prereleases
const prereleaseRequested = isHotfix ? false : releaseType === 'prerelease';
const isManual = getInput('isManual') !== 'false';
const bumpedRelease = require('../helpers/bumped-release');
const getReleaseTag = require('../helpers/get-release-tag');

const run = async () => {
    if (isManual) {
        // When IS_MANUAL=true, package.json has been manually updated to the target version
        // but get-version.js reads git tags first. We need to read the manually updated version.
        // Use branch=null to read local file instead of origin/main
        const getFileContents = require('../helpers/get-file-contents');
        const manualVersion = getFileContents('libs/core/package.json', null).version;
        const isPrerelease = !!semver.prerelease(manualVersion, undefined);
        const releaseTag = await getReleaseTag(isHotfix, isPrerelease, manualVersion);
        core.setOutput('newVersion', manualVersion);
        core.setOutput('isPrerelease', isPrerelease.toString());
        core.setOutput('releaseTag', releaseTag);
        core.info(`new version is ${manualVersion} with release tag ${releaseTag}`);
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
