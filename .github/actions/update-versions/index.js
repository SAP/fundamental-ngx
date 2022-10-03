const fs = require('fs');
const core = require('@actions/core');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const versionsJson = JSON.parse(fs.readFileSync('./versions.json', 'utf8'));
const deploymentUrl = core.getInput('url');
const currentVersion = packageJson.version;

const run = async () => {
    const newDeploymentUrl = {
        id: currentVersion,
        url: deploymentUrl
    };

    versionsJson.unshift(newDeploymentUrl);

    fs.writeFileSync('./versions.json', JSON.stringify(versionsJson, null, 2));

    core.info(`Deployment for ${currentVersion} have been added to versions.json`);
    core.info(JSON.stringify(newDeploymentUrl));
};

run();
