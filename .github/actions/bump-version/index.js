const recommendedVersion = require('conventional-recommended-bump');
const semver = require('semver');
const fs = require('fs');
const core = require('@actions/core');
const { getInput } = require('@actions/core');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const releaseType = core.getInput('isPrerelease') !== 'false' ? 'prerelease' : 'release';
const writeFile = core.getInput('writeFile') !== 'false';
const isHotfix = getInput('isHotfix') !== 'false';
const currentVersion = packageJson.version;
const prereleaseRequested = releaseType === 'prerelease';

function isInPrerelease(version) {
    return Array.isArray(semver.prerelease(version));
}

function shouldContinuePrerelease(version, expectType) {
    return getCurrentActiveType(version) === expectType;
}

const TypeList = ['major', 'minor', 'patch'].reverse();

/**
 * extract the in-pre-release type in target version
 *
 * @param version
 * @return {string}
 */
function getCurrentActiveType(version) {
    const typelist = TypeList;
    for (let i = 0; i < typelist.length; i++) {
        if (semver[typelist[i]](version)) {
            return typelist[i];
        }
    }
}

/**
 * calculate the priority of release type,
 * major - 2, minor - 1, patch - 0
 *
 * @param type
 * @return {number}
 */
function getTypePriority(type) {
    return TypeList.indexOf(type);
}

const bumpedVersionType = () => {
    return new Promise((resolve, reject) => {
        recommendedVersion(
            {
                preset: {
                    name: require.resolve('conventional-changelog-conventionalcommits'),
                    preMajor: semver.lt(currentVersion, '1.0.0')
                },
                tagPrefix: 'v'
            },
            (err, release) => {
                if (err) {
                    return reject(err);
                }
                if (prereleaseRequested) {
                    if (isInPrerelease(currentVersion)) {
                        if (
                            shouldContinuePrerelease(currentVersion, release.releaseType) ||
                            getTypePriority(getCurrentActiveType(currentVersion)) > getTypePriority(release.releaseType)
                        ) {
                            release.releaseType = 'prerelease';
                            return resolve(release);
                        }
                    }
                    release.releaseType = 'pre' + release.releaseType;
                    return resolve(release);
                }
                return resolve(release);
            }
        );
    });
};

const getReleaseTag = (hotfix, preRelease) => {
    if (hotfix) {
        return 'archive';
    }
    if (preRelease) {
        return 'prerelease';
    }
    return 'latest';
};

const run = async () => {
    const release = await bumpedVersionType();
    core.info(`${release.reason}, therefore release type should be ${release.releaseType}`);

    const newVersion =
        semver.valid(release.releaseType, undefined) ||
        semver.inc(currentVersion, release.releaseType, prereleaseRequested, 'rc');
    core.info(`new version is ${newVersion}`);
    if (writeFile) {
        packageJson.version = newVersion;
        fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    }
    const isPrerelease = !!semver.prerelease(newVersion, undefined);
    core.setOutput('newVersion', newVersion);
    core.setOutput('isPrerelease', isPrerelease.toString());
    core.setOutput('releaseTag', getReleaseTag(isHotfix, isPrerelease));
};

run();
