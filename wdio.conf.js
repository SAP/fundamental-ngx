/*require('ts-node').register({ transpileOnly: true });
module.exports = require('./wdio.conf.ts');*/
const {join} = require('path');
require('ts-node').register({ transpileOnly: true });
exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    // runner: 'local',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'eu',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './e2e/wdio/**/*.e2e-spec.ts'
    ],
    // Patterns to exclude.
    exclude: [
        './e2e/wdio/**/checkbox-group.e2e-spec.ts',
    ],
    suites: {
        platformA: [
            './e2e/wdio/platform/**/action-bar.e2e-spec.ts',
            './e2e/wdio/platform/**/action-list-item.e2e-spec.ts',
            './e2e/wdio/platform/**/checkbox.e2e-spec.ts',
            './e2e/wdio/platform/**/checkbox-group.e2e-spec.ts',
            './e2e/wdio/platform/**/combobox.e2e-spec.ts',
            './e2e/wdio/platform/**/date-picker.e2e-spec.ts',
            './e2e/wdio/platform/**/date-time-picker.e2e-spec.ts',
            './e2e/wdio/platform/**/display-list-item.e2e-spec.ts',
            './e2e/wdio/platform/**/dynamic-page-layout.e2e-spec.ts',
            './e2e/wdio/platform/**/feed-input.e2e-spec.ts',
            './e2e/wdio/platform/**/file-uploader.e2e-spec.ts',
            './e2e/wdio/platform/**/info-label.e2e-spec.ts',
            './e2e/wdio/platform/**/input.e2e-spec.ts',
            './e2e/wdio/platform/**/input-group.e2e-spec.ts',
            './e2e/wdio/platform/**/link.e2e-spec.ts',
            './e2e/wdio/platform/**/list.e2e-spec.ts',
        ],
        platformB: [
            './e2e/wdio/platform/**/menu.e2e-spec.ts',
            './e2e/wdio/platform/**/menu-button.e2e-spec.ts',
            './e2e/wdio/platform/**/multi-input.e2e-spec.ts',
            './e2e/wdio/platform/**/object-list-item.e2e-spec.ts',
            './e2e/wdio/platform/**/object-marker.e2e-spec.ts',
            './e2e/wdio/platform/**/object-status.e2e-spec.ts',
            './e2e/wdio/platform/**/object-attribute.e2e-spec.ts',
            './e2e/wdio/platform/**/panel.e2e-spec.ts',
            './e2e/wdio/platform/**/radio-button-group.e2e-spec.ts',
            './e2e/wdio/platform/**/search.e2e-spec.ts',
            './e2e/wdio/platform/**/split-menu-button.e2e-spec.ts',
            './e2e/wdio/platform/**/standard-list-item.e2e-spec.ts',
            './e2e/wdio/platform/**/step-input.e2e-spec.ts',
            './e2e/wdio/platform/**/switch.e2e-spec.ts',
            './e2e/wdio/platform/**/textarea.e2e-spec.ts',
         //   './e2e/wdio/platform/**/thumbnail.e2e-spec.ts',
            './e2e/wdio/platform/**/value-help-dialog.e2e-spec.ts',
        ]
    },
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 20,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [
        // {
        //     browserName: 'internet explorer',
        //     browserVersion: 'latest',
        //     platformName: 'Windows 10',
        //     'sauce:options': {
        //         screenResolution: '1920x1080',
        //         name: 'e2e-win-internet-explorer ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
        //         requireWindowFocus: true,
        //     }
        // },
        {
            browserName: 'MicrosoftEdge',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            acceptInsecureCerts: true,
            'sauce:options': {
                screenResolution: '1920x1080',
                name: 'e2e-win-edge ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
            }
        },
        {
            browserName: 'firefox',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            acceptInsecureCerts: true,
            'sauce:options': {
                name: 'e2e-win-firefox ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
                screenResolution: '1920x1080',
            }
        },
        {
            browserName: 'chrome',
            browserVersion: 'latest',
            platformName: 'Windows 10',
            acceptInsecureCerts: true,
            'sauce:options': {
                screenResolution: '1920x1080',
                name: 'e2e-win-chrome ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
            }
        },
        {
            browserName: 'chrome',
            platformName: 'macOS 10.15',
            browserVersion: 'latest',
            acceptInsecureCerts: true,
            'sauce:options': {
                name: 'e2e-MAC-chrome ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
                screenResolution: '1920x1440',
            }
        },
        {
            browserName: 'firefox',
            platformName: 'macOS 10.15',
            browserVersion: 'latest',
            acceptInsecureCerts: true,
            'sauce:options': {
                screenResolution: '1920x1440',
                name: 'e2e-MAC-firefox ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
            }
        },
        {
            browserName: 'MicrosoftEdge',
            platformName: 'macOS 10.15',
            browserVersion: 'latest',
            acceptInsecureCerts: true,
            'sauce:options': {
                screenResolution: '1920x1440',
                name: 'e2e-MAC-Edge ' + process.env.TRAVIS_BUILD_ID + ' ' + process.env.TRAVIS_PULL_REQUEST_BRANCH,
            }
        },
        // {
        //     browserName: 'safari',
        //     browserVersion: '13.1',
        //     platformName: 'macOS 10.15',
        //     'sauce:options': {
        //         screenResolution: '1920x1440',
        //         name: 'e2e-MAC-safari ' + process.env.TRAVIS_BUILD_ID,
        //     }
        // }
    ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://sap.dev:4200/',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 30000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 200000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: ['chromedriver'],
    services: [
        ['sauce', {
            sauceConnect: true,
            connectRetries: 2,
        }],
        ['image-comparison',
            // The options
            {
                // Some options, see the docs for more
                baselineFolder: join(process.cwd(), './e2e/wdio/baselineScreenshot/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
                savePerInstance: true,
                autoSaveBaseline: true,
            }],
    ],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'jasmine',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 2,
    //
    // Delay in seconds between the spec file retry attempts
    specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    specFileRetriesDeferred: true,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    // reporters: ['spec' , []],

    reporters: [['spec', {
        symbols: { passed: '[PASS]', failed: '[FAIL]' }
    }], ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true
    }]],

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 1200000,
        grep: null,
        invertGrep: null
    },

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    // mochaOpts: {
    //     // TypeScript setup
    //     require: ['ts-node/register'],
    //     ui: 'bdd',
    //     timeout: 60000
    // },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function() {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.json'
        });

        browser.addCommand('focus', function() {
            browser.execute(function(domElement) {
                domElement.focus();
            }, this);
        }, true);

        browser.addCommand('addIsActiveClass', function() {
            browser.execute(function(domElement) {
                domElement.classList.add('is-active');
            }, this);
        }, true);

        browser.resetUrl = 'about:blank';
        browser.maximizeWindow();
    }


//     const processedConfig = await browser.getProcessedConfig();
//
// // Resize the screens if it is a VM
// if (!('platformName' in processedConfig.capabilities)) {
//     await browser.driver.manage().window().setSize(1366, 768);
// }
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    // afterTest: function(test, context, { error, result, duration, passed, retries }) {
    // },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    //onReload: function(oldSessionId, newSessionId) {
    //}
};
