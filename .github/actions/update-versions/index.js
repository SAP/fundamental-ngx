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

    const [major, minor, _] = currentVersion.split('.');
    const previousMinorIndex = versionsJson.findIndex((version) => version.id.startsWith(`${major}.${minor}`));

    // We should keep only the latest patch version for each minor version
    // So if it's a new patch version, we should replace the previous patch version deployment url
    if (previousMinorIndex > -1) {
        versionsJson[previousMinorIndex] = newDeploymentUrl;
    } else {
        versionsJson.unshift(newDeploymentUrl);
    }

    fs.writeFileSync('./versions.json', JSON.stringify(versionsJson, null, 2));

    core.info(`Deployment for ${currentVersion} have been added to versions.json`);
    core.info(JSON.stringify(newDeploymentUrl));
};

run();
