/* eslint-disable no-undef */
const { join } = require('path');

module.exports = ({ runner, specs, projectName }) => {
    require('ts-node').register({ transpileOnly: true });
    const AllureReporter = require('@wdio/allure-reporter').default;
    runner = runner || 'local';
    projectName = projectName.split(':').join('/');
    return {
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

        logLevel: 'error',
        bail: 0,
        waitforTimeout: 30000,
        connectionRetryTimeout: 200000,
        connectionRetryCount: 3,
        services: [
            [
                'image-comparison',
                // The options
                {
                    // Some options, see the docs for more
                    baselineFolder: join(process.cwd(), './e2e/wdio/baselineScreenshot/'),
                    formatImageName: '{tag}-{logName}-{width}x{height}',
                    screenshotPath: join(process.cwd(), '.tmp/'),
                    savePerInstance: true,
                    autoSaveBaseline: true
                }
            ]
        ],
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
        before: function () {
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

        afterTest: function (test, context, { error, result, duration, passed, retries }) {
            if (error !== undefined) {
                browser.takeScreenshot();
                const html = browser.getPageSource();
                AllureReporter.addAttachment('page.html', html, 'text/html');
            }
        }
    };
};
