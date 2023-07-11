const getFileContents = require('./get-file-contents');
const major = require('semver/functions/major');

/**
 * Get the major version of Angular from the provided branch. If nothing is provided, then it will use the current file system
 * @param branch
 * @returns {number}
 */
module.exports = (branch = null) => {
    const packageJson = getFileContents('package.json', branch);
    const angularVersion =
        (packageJson.dependencies['@angular/core'] || packageJson.devDependencies['@angular/core'] || '').match(
            /\d+\.\d+\.\d+/
        )?.[0] || '';
    return major(angularVersion);
};
