const semver = require('semver');
const recommendedVersion = require('conventional-recommended-bump');

function isInPrerelease(version) {
    return Array.isArray(semver.prerelease(version));
}

function shouldContinuePrerelease(version, expectType) {
    return getCurrentActiveType(version) === expectType;
}

const typelist = ['major', 'minor', 'patch'].reverse();

/**
 * extract the in-pre-release type in target version
 *
 * @param version
 * @return {string}
 */
function getCurrentActiveType(version) {
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
    return typelist.indexOf(type);
}

module.exports = ({ prereleaseRequested, currentVersion }) => {
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
