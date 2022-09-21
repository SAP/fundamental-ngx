const { getInput, info } = require('@actions/core');
const { npmPublish } = require('@jsdevtools/npm-publish');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const run = async () => {
    const projectsMap = JSON.parse(readFileSync('./angular.json', { encoding: 'utf-8' })).projects;
    const projectNames = JSON.parse(getInput('projects'));
    const projects = projectNames.map((projectName) => {
        const ngPackage = JSON.parse(
            readFileSync(`${projectsMap[projectName]}/ng-package.json`, { encoding: 'utf-8' })
        );
        return resolve(projectsMap[projectName], ngPackage.dest, 'package.json');
    });
    const tag = getInput('releaseTag');
    const npmToken = getInput('token');

    for (const packageJsonPath of projects) {
        const result = await npmPublish({
            package: packageJsonPath,
            token: npmToken,
            tag
        });
        info(`Published ${result.package}@${result.version}`);
    }
};

run().catch((e) => console.log(e));
