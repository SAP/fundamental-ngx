const currentVersion = require('../.github/actions/helpers/current-version');
const { execSync } = require('child_process');
const semver = require('semver');
const hotfixBranchName = 'tmp_hotfix_branch';

const execAndLog = (command) => {
    console.log(execSync(command, { maxBuffer: Infinity, encoding: 'utf8' }));
};

const releaseHotfix = async () => {
    if (semver.prerelease(currentVersion, undefined)) {
        throw new Error('Cannot release a hotfix from a prerelease version');
    }
    const gitDirty = execSync('git status --porcelain', { maxBuffer: Infinity, encoding: 'utf8' });
    if (gitDirty !== '') {
        throw new Error(
            'Cannot release a hotfix from a dirty git tree, please commit your changes first:' + '\n' + gitDirty
        );
    }

    execAndLog(`git checkout -b ${hotfixBranchName}`);

    const nextVersion = semver.inc(currentVersion, 'patch');
    return execAndLog(`npx lerna version ${nextVersion} --force-publish --yes --no-push`);
};

releaseHotfix().then(() => {
    execAndLog(`git push --set-upstream origin ${hotfixBranchName} --follow-tags`);
    console.log('Hotfix release complete, rest of the process will be handled by the CI');
    execAndLog('git checkout main');
    execAndLog(`git branch -D ${hotfixBranchName}`);
});
