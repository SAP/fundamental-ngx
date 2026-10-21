const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const yaml = require('yaml');

const workflowPath = path.join(__dirname, '../create-release.yml');
const validatorPath = path.join(__dirname, '../../../scripts/validate-docs-pages-artifact.mjs');
const packageJsonPath = path.join(__dirname, '../../../package.json');
const workflowTestRunnerPath = path.join(__dirname, 'run-workflow-tests.mjs');
const workflowText = fs.readFileSync(workflowPath, 'utf8');
const workflow = yaml.parse(workflowText);
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const failures = [];

function expectContract(condition, message) {
    if (!condition) {
        failures.push(message);
    }
}

function findStep(steps, predicate) {
    return steps.findIndex(predicate);
}

function expectStepOrder(steps, descriptions) {
    let previousIndex = -1;

    for (const { description, matches } of descriptions) {
        const index = findStep(steps, matches);
        expectContract(index !== -1, `pages_build is missing the ${description} step`);
        expectContract(index > previousIndex, `pages_build must run ${description} after the preceding required step`);
        previousIndex = index;
    }
}

function createArtifactDirectory() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'create-release-pages-'));
}

function writeArtifactFile(directory, fileName, content) {
    fs.writeFileSync(path.join(directory, fileName), content);
}

function expectValidatorToReject(validateDocsPagesArtifact, prepareFixture, expectedFile) {
    const directory = createArtifactDirectory();

    try {
        prepareFixture(directory);
        assert.throws(
            () => validateDocsPagesArtifact(directory),
            new RegExp(expectedFile.replace('.', '\\.'), 'i'),
            `validator must reject an invalid ${expectedFile} artifact`
        );
    } finally {
        fs.rmSync(directory, { recursive: true, force: true });
    }
}

function writeValidRequiredFiles(directory) {
    writeArtifactFile(directory, 'index.html', '<!doctype html><title>Docs</title>');
    writeArtifactFile(directory, 'llms.txt', '# Fundamental NGX');
}

async function validateArtifactFixtures() {
    if (!fs.existsSync(validatorPath)) {
        failures.push('artifact validator script is missing: scripts/validate-docs-pages-artifact.mjs');
        return;
    }

    const validatorModule = await import(pathToFileURL(validatorPath).href);
    const validateDocsPagesArtifact = validatorModule.validateDocsPagesArtifact;

    expectContract(
        typeof validateDocsPagesArtifact === 'function',
        'artifact validator must export validateDocsPagesArtifact(directory)'
    );

    if (typeof validateDocsPagesArtifact !== 'function') {
        return;
    }

    expectValidatorToReject(validateDocsPagesArtifact, () => undefined, 'index.html');
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => writeArtifactFile(directory, 'index.html', ''),
        'index.html'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => writeArtifactFile(directory, 'index.html', '<!doctype html>'),
        'llms.txt'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => {
            writeArtifactFile(directory, 'index.html', '<!doctype html>');
            writeArtifactFile(directory, 'llms.txt', '');
        },
        'llms.txt'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => {
            writeArtifactFile(directory, 'index.html', '<!doctype html>');
            writeArtifactFile(directory, 'llms.txt', 'catalog');
        },
        'components.json'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => {
            writeValidRequiredFiles(directory);
            writeArtifactFile(directory, 'components.json', '{');
        },
        'components.json'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => {
            writeValidRequiredFiles(directory);
            writeArtifactFile(directory, 'components.json', '[]');
        },
        'components.json'
    );
    expectValidatorToReject(
        validateDocsPagesArtifact,
        (directory) => {
            writeValidRequiredFiles(directory);
            writeArtifactFile(directory, 'components.json', '{"components": []}');
        },
        'components.json'
    );

    const validDirectory = createArtifactDirectory();
    try {
        writeValidRequiredFiles(validDirectory);
        writeArtifactFile(validDirectory, 'components.json', '{"components": [{"name": "Button"}]}');
        assert.doesNotThrow(
            () => validateDocsPagesArtifact(validDirectory),
            'validator must accept a non-empty components array'
        );
    } finally {
        fs.rmSync(validDirectory, { recursive: true, force: true });
    }
}

function validateWorkflowContract() {
    const pagesBuild = workflow.jobs.pages_build;
    const pagesDeploy = workflow.jobs.pages_deploy;

    expectContract(Boolean(pagesBuild), 'workflow must define pages_build');
    expectContract(Boolean(pagesDeploy), 'workflow must define pages_deploy');

    if (pagesBuild) {
        expectContract(pagesBuild.needs === 'create_release', 'pages_build must need create_release');
        expectContract(
            pagesBuild.if === "${{ needs.create_release.outputs.npmTag == 'latest' }}",
            'pages_build must preserve the exact latest-release gate'
        );
        expectContract(
            JSON.stringify(pagesBuild.permissions) === JSON.stringify({ contents: 'read', pages: 'read' }),
            'pages_build permissions must be limited to contents: read and pages: read'
        );

        const buildSteps = pagesBuild.steps ?? [];
        expectStepOrder(buildSteps, [
            { description: 'checkout', matches: (step) => step.uses?.startsWith('actions/checkout@') },
            { description: 'Node setup', matches: (step) => step.uses === './.github/actions/nodejs' },
            {
                description: 'unconditional metadata generation',
                matches: (step) =>
                    step.run?.includes('npx nx run mcp-server:extract-metadata --skip-nx-cache') &&
                    step.if === undefined
            },
            {
                description: 'production docs build',
                matches: (step) => step.run?.includes('npx nx run docs:compile:production')
            },
            {
                description: 'artifact validation',
                matches: (step) => step.run?.includes('node scripts/validate-docs-pages-artifact.mjs dist/apps/docs')
            },
            {
                description: 'Pages configuration',
                matches: (step) => step.uses === 'actions/configure-pages@v6'
            },
            {
                description: 'Pages artifact upload',
                matches: (step) => step.uses === 'actions/upload-pages-artifact@v5'
            }
        ]);

        const uploadStep = buildSteps.find((step) => step.uses === 'actions/upload-pages-artifact@v5');
        expectContract(
            uploadStep?.with?.path === 'dist/apps/docs',
            'Pages artifact upload path must be dist/apps/docs'
        );

        const configurePagesStep = buildSteps.find((step) => step.uses === 'actions/configure-pages@v6');
        expectContract(
            configurePagesStep?.with?.enablement === false,
            'actions/configure-pages@v6 must set enablement: false explicitly'
        );
    }

    if (pagesDeploy) {
        expectContract(pagesDeploy.needs === 'pages_build', 'pages_deploy must need pages_build');
        expectContract(
            pagesDeploy.environment?.name === 'github-pages' &&
                pagesDeploy.environment?.url === '${{ steps.deployment.outputs.page_url }}',
            'pages_deploy must use the github-pages environment with the deployment output URL'
        );
        expectContract(
            JSON.stringify(pagesDeploy.permissions) === JSON.stringify({ pages: 'write', 'id-token': 'write' }),
            'pages_deploy permissions must be limited to pages: write and id-token: write'
        );

        const deploymentStep = (pagesDeploy.steps ?? []).find((step) => step.uses === 'actions/deploy-pages@v5');
        expectContract(
            deploymentStep?.id === 'deployment',
            'pages_deploy must give the official deploy action an id for its page_url output'
        );
    }

    expectContract(
        !workflowText.includes('JamesIves/github-pages-deploy-action'),
        'workflow must not reference JamesIves/github-pages-deploy-action'
    );

    const pagesJobsText = JSON.stringify({ pages_build: pagesBuild, pages_deploy: pagesDeploy });
    expectContract(!pagesJobsText.includes('GHACTIONS'), 'Pages jobs must not use the GHACTIONS secret');
    expectContract(!/git\s+push|branch:/i.test(pagesJobsText), 'Pages jobs must not write a branch');
}

function validateWorkflowTestRunnerContract() {
    expectContract(
        packageJson.scripts?.['test:workflows'] === 'node .github/workflows/__tests__/run-workflow-tests.mjs',
        'package.json test:workflows must invoke the portable Node workflow-test runner'
    );
    expectContract(
        fs.existsSync(workflowTestRunnerPath),
        'workflow-test runner is missing: .github/workflows/__tests__/run-workflow-tests.mjs'
    );

    if (!fs.existsSync(workflowTestRunnerPath)) {
        return;
    }

    const runnerText = fs.readFileSync(workflowTestRunnerPath, 'utf8');
    expectContract(
        /readdir(?:Sync)?/.test(runnerText) && /\.test\.js/.test(runnerText),
        'workflow-test runner must discover *.test.js files'
    );
    expectContract(/TEMPLATE/.test(runnerText), 'workflow-test runner must exclude template test files');
    expectContract(
        /spawn(?:Sync)?|execFile(?:Sync)?/.test(runnerText),
        'workflow-test runner must execute each test in a separate Node process'
    );
    expectContract(/status|exitCode/.test(runnerText), 'workflow-test runner must propagate a child test failure');
}

async function main() {
    validateWorkflowContract();
    validateWorkflowTestRunnerContract();
    await validateArtifactFixtures();

    if (failures.length > 0) {
        console.error('Create Release Pages contract failures:');
        failures.forEach((failure) => console.error(`- ${failure}`));
        process.exitCode = 1;
        return;
    }

    console.log('Create Release Pages contract passed');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
