const fs = require('fs');
const semver = require('semver');
const core = require('@actions/core');
const { spawn } = require('child_process');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

function getLatestVersionFromNpm() {
    return new Promise((resolve, reject) => {
        const process = spawn('npm', ['view', 'fundamental-styles', 'versions', '--json']);
        let buffs = [];

        process.stdout.on('data', (data) => {
            buffs.push(data);
        });

        process.on('close', () => {
            let latestVersion;

            try {
                const buffer = Buffer.concat(buffs);
                const versions = JSON.parse(buffer.toString());
                latestVersion = versions[versions.length - 1];

                resolve(latestVersion);
            } catch (e) {
                reject(e);
            }
        });
    });
}

const run = async () => {
    const currentVersion = packageJson.dependencies['fundamental-styles'];

    let latestVersion;
    try {
        latestVersion = await getLatestVersionFromNpm();
    } catch (e) {
        core.setFailed(`Could not get latest version of fundamental-styles from npm`);
        return;
    }

    if (latestVersion && semver.compare(currentVersion, latestVersion) === -1) {
        core.info(
            `Current version ${currentVersion} is lower than the latest version ${latestVersion}, trying to bump...`
        );

        const diff = semver.diff(currentVersion, latestVersion);
        if (['prerelease', 'prepatch', 'patch'].includes(diff)) {
            core.info(`Bumping version from ${currentVersion} to ${latestVersion}...`);
            core.setOutput('new-styles-version', latestVersion);

            packageJson.dependencies['fundamental-styles'] = latestVersion;
            fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
        } else {
            core.setFailed(`Latest version ${latestVersion} contains breaking changes, please bump manually.`);
        }
    } else {
        core.info(`Current version ${currentVersion} is up to date.`);
        core.setOutput('new-styles-version', '');
    }
};

run();
