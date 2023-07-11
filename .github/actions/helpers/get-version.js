const getFileContents = require('./get-file-contents');

/**
 * Get the version from the provided branch. If nothing is provided, then it will use the current file system
 * @param branch
 * @returns {string}
 */
module.exports = (branch = null) => {
    try {
        return getFileContents('lerna.json', branch).version;
    } catch (e) {
        return getFileContents('package.json', branch).version;
    }
};
