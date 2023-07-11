const { execSync } = require('child_process');

const resolveFileContent = (filePath, data) => {
    if (filePath.endsWith('.json')) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return data;
};

/**
 * Get file contents from git or locally.
 * if branch is `null` it will use the local file lookup.
 * path is relative to the root of the project.
 * @param filePath
 * @param branch {string|null}
 * @returns {string | object}
 */
module.exports = (filePath, branch = 'origin/main') => {
    if (branch === null) {
        return resolveFileContent(filePath, require('fs').readFileSync(`${process.cwd()}/${filePath}`), 'utf8');
    }
    const data = execSync(`git show ${branch}:${filePath}`, { maxBuffer: Infinity, encoding: 'utf8' });
    return resolveFileContent(filePath, data);
};
