const { info, error } = require('@actions/core');
const { npmPublish } = require('@jsdevtools/npm-publish');
const { resolve } = require('path');

const publishPackage = async ({ packageJsonPath, tag, token, access }) => {
    return await npmPublish({
        package: packageJsonPath,
        token,
        tag,
        strategy: 'upgrade',
        access
    });
};

const handleError = async (exception, retryData) => {
    const { currentTryNumber, retryCount, ...rest } = retryData;
    if (currentTryNumber < retryCount) {
        await publishWithRetry({
            ...rest,
            currentTryNumber: currentTryNumber + 1
        });
    } else {
        error(`Failed to publish package after ${retryCount} attempts`);
        error(exception);
        throw exception;
    }
};

const publishWithRetry = async (publishData) => {
    try {
        const result = await publishPackage(publishData);
        info(`Published ${result.name}@${result.version} with tag ${result.tag}`);
    } catch (error) {
        await handleError(error, publishData);
    }
};

const publishAllProjects = async () => {
    const projectNames = require('fs').readdirSync('dist/libs');
    const projects = projectNames
        .map((projectName) => resolve(`dist/libs/${projectName}/package.json`))
        .filter((path) => require('fs').existsSync(path));
    const tag = 'prerelease';
    const npmToken = '---------npm-token-------';
    const retryCount = 3;
    for (const packageJsonPath of projects) {
        await publishWithRetry({
            packageJsonPath,
            tag,
            token: npmToken,
            access: 'public',
            retryCount,
            currentTryNumber: 1
        });
    }
};

publishAllProjects();
