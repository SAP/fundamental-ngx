const { getInput, info, error } = require('@actions/core');
const { npmPublish } = require('@jsdevtools/npm-publish');
const { resolve } = require('path');

const publishPackage = async ({ packageJsonPath, tag, token, access }) =>
    await npmPublish({
        package: packageJsonPath,
        token,
        tag,
        access
    });

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
    const projectNames = JSON.parse(getInput('projects'));
    const projects = projectNames.map((projectName) => resolve(`dist/libs/${projectName}/package.json`));
    const tag = getInput('releaseTag');
    const npmToken = getInput('token');
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
