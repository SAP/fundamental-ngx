const core = require('@actions/core');
const axios = require('axios');

const READY_STATES = ['ready', 'current'];

function getNetlifyUrl(url) {
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`
        }
    });
}

const waitForDeployCreation = (url, commitSha, MAX_TIMEOUT) => {
    const increment = 15;

    return new Promise((resolve, reject) => {
        let elapsedTimeSeconds = 0;

        const handle = setInterval(async () => {
            elapsedTimeSeconds += increment;

            if (elapsedTimeSeconds >= MAX_TIMEOUT) {
                clearInterval(handle);
                return reject(`Timeout reached: Deployment was not created within ${MAX_TIMEOUT} seconds.`);
            }

            const { data: netlifyDeployments } = await getNetlifyUrl(url);

            if (!netlifyDeployments) {
                return reject(`Failed to get deployments for site`);
            }

            const commitDeployment = netlifyDeployments.find((d) => d.commit_ref === commitSha);

            if (commitDeployment) {
                clearInterval(handle);
                return resolve(commitDeployment);
            }

            console.log(`Not yet created, waiting ${increment} more seconds...`);
        }, increment * 1000);
    });
};

const waitForReadiness = (url, MAX_TIMEOUT) => {
    const increment = 30;

    return new Promise((resolve, reject) => {
        let elapsedTimeSeconds = 0;
        let state;

        const handle = setInterval(async () => {
            elapsedTimeSeconds += increment;

            if (elapsedTimeSeconds >= MAX_TIMEOUT) {
                clearInterval(handle);
                return reject(
                    `Timeout reached: Deployment was not ready within ${MAX_TIMEOUT} seconds. Last known deployment state: ${state}.`
                );
            }

            const { data: deploy } = await getNetlifyUrl(url);

            state = deploy.state;

            if (READY_STATES.includes(state)) {
                clearInterval(handle);
                return resolve();
            }

            console.log(`Not yet ready, waiting ${increment} more seconds...`);
        }, increment * 1000);
    });
};

const waitForUrl = async (url, MAX_TIMEOUT) => {
    const iterations = MAX_TIMEOUT / 3;
    for (let i = 0; i < iterations; i++) {
        try {
            await axios.get(url);
            return;
        } catch (e) {
            console.log(`URL ${url} unavailable, retrying...`);
            await new Promise((r) => setTimeout(r, 3000));
        }
    }
    core.setFailed(`Timeout reached: Unable to connect to ${url}`);
};

const run = async () => {
    try {
        const netlifyToken = process.env.NETLIFY_TOKEN;
        const commitSha = core.getInput('commit_sha');
        const MAX_CREATE_TIMEOUT = 60 * 5; // 5 min
        const MAX_WAIT_TIMEOUT = 60 * 15; // 15 min
        const MAX_READY_TIMEOUT = Number(core.getInput('max_timeout')) || 60;
        const siteId = core.getInput('site_id');

        if (!netlifyToken) {
            core.setFailed('Please set NETLIFY_TOKEN env variable to your Netlify Personal Access Token secret');
        }
        if (!commitSha) {
            core.setFailed('Could not determine GitHub commit');
        }
        if (!siteId) {
            core.setFailed('Required field `site_id` was not provided');
        }

        console.log(`Waiting for Netlify to create a deployment for git SHA ${commitSha}`);
        const commitDeployment = await waitForDeployCreation(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
            commitSha,
            MAX_CREATE_TIMEOUT
        );

        const url = `https://${commitDeployment.id}--${commitDeployment.name}.netlify.app`;

        core.setOutput('deploy_id', commitDeployment.id);
        core.setOutput('url', url);

        console.log(
            `Waiting for Netlify deployment ${commitDeployment.id} in site ${commitDeployment.name} to be ready`
        );
        await waitForReadiness(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys/${commitDeployment.id}`,
            MAX_WAIT_TIMEOUT
        );

        console.log(`Waiting for a 200 from: ${url}`);
        await waitForUrl(url, MAX_READY_TIMEOUT);
    } catch (error) {
        core.setFailed(typeof error === 'string' ? error : error.message);
    }
};

run();
