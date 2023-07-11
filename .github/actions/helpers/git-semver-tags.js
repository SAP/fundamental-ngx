const semver = require('semver');
const { exec, execSync } = require('child_process');

/**
 * Get all semver tags. Sorted in descending order
 * @param maxVersion
 * @param skipUnstable
 * @returns {Promise<string[]>}
 */
module.exports = (maxVersion = null, skipUnstable = false) => {
    return execSync('git tag -l', { maxBuffer: Infinity })
        .toString()
        .split('\n')
        .filter((tag) => {
            const valid = semver.valid(tag);
            if (!valid) {
                return false;
            }
            if (skipUnstable && semver.prerelease(tag)) {
                return false;
            }
            return !(maxVersion && semver.gt(tag, maxVersion));
        })
        .sort(semver.rcompare);
    // return new Promise((resolve, reject) => {
    //
    //     exec('git tag -l', { maxBuffer: Infinity }, (err, data) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             debugger;
    //             resolve(
    //                 data
    //                     .split('\n')
    //                     .filter((tag) => {
    //                         const valid = semver.valid(tag);
    //                         if (!valid) {
    //                             return false;
    //                         }
    //                         if (skipUnstable && semver.prerelease(tag)) {
    //                             return false;
    //                         }
    //                         return !(maxVersion && semver.gt(tag, maxVersion));
    //                     })
    //                     .sort(semver.rcompare)
    //             );
    //         }
    //     });
    // });
};
