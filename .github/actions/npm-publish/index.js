const { getInput, info } = require('@actions/core');
const { npmPublish } = require('@jsdevtools/npm-publish');
const { resolve } = require('path');

async function publish({ currentTryNumber = 1, packageJsonPath, tag, token, access, retryCount }) {
    try {
        const result = await npmPublish({
            package: packageJsonPath,
            token,
            tag,
            access,
            dryRun: true
        });
        info(`Published ${result.package}@${result.version}`);
    } catch (e) {
        if (currentTryNumber < retryCount) {
            await publish({
                currentTryNumber: currentTryNumber + 1,
                packageJsonPath,
                tag,
                token,
                access
            });
        } else {
            throw e;
        }
    }
}

const run = async () => {
    const projectNames = JSON.parse(getInput('projects'));
    const projects = projectNames.map((projectName) => resolve(`dist/libs/${projectName}/package.json`));
    const tag = getInput('releaseTag');
    const npmToken = getInput('token');
    const retryCount = 3;
    for (const packageJsonPath of projects) {
        await publish({
            packageJsonPath,
            tag,
            token: npmToken,
            access: 'public',
            retryCount
        });
    }
};

run();
