const tsConfig = require('../tsconfig.base.json');
const tsNode = require('ts-node');
const dns = require('node:dns');
const tsConfigPaths = require('tsconfig-paths');
const allureReporter = require('@wdio/allure-reporter').default;

module.exports = ({ runner, specs, projectName }) => {
    tsNode.register({ transpileOnly: true, files: true, project: './e2e/tsconfig.json' });
    tsConfigPaths.register({ baseUrl: './', paths: tsConfig.compilerOptions.paths });

    runner = runner || 'local';
    projectName = projectName.split(':').join('/');

    return {
        beforeSession: () => {
            dns.setDefaultResultOrder('ipv4first');
        },
        runner,
        specs,
        exclude: [],
        maxInstances: 8,
        capabilities: [
            {
                browserName: 'chrome',
                'goog:chromeOptions': {
                    args: ['--window-size=1920,1080', '--headless']
                }
            }
        ],
        autoCompileOpts: {
            autoCompile: false
        },
        logLevel: 'error',
        bail: 0,
        waitforTimeout: 30000,
        connectionRetryTimeout: 200000,
        connectionRetryCount: 3,
        framework: 'jasmine',
        specFileRetries: 2,
        specFileRetriesDelay: 0,
        specFileRetriesDeferred: true,
        reporters: [
            [
                'spec',
                {
                    symbols: { passed: '[PASS]', failed: '[FAIL]' }
                }
            ],
            [
                'allure',
                {
                    outputDir: `allure-results/${projectName}`,
                    disableWebdriverStepsReporting: true,
                    disableWebdriverScreenshotsReporting: false
                }
            ]
        ],
        jasmineNodeOpts: {
            isVerbose: true,
            showColors: true,
            defaultTimeoutInterval: 90000,
            grep: null,
            invertGrep: null
        },
        before() {
            browser.addCommand(
                'focus',
                function () {
                    browser.execute(function (domElement) {
                        domElement.focus();
                    }, this);
                },
                true
            );

            browser.addCommand(
                'addIsActiveClass',
                function () {
                    browser.execute(function (domElement) {
                        domElement.classList.add('is-active');
                    }, this);
                },
                true
            );

            browser.resetUrl = 'about:blank';
            browser.setWindowSize(1920, 1080);
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async afterTest(test, context, { error, result, duration, passed, retries }) {
            if (error !== undefined) {
                const html = await browser.getPageSource();
                allureReporter.addAttachment('page.html', html, 'text/html');
            }
        }
    };
};
