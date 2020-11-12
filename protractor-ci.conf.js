// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require('dotenv').config();
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,
    sauceRegion: 'eu',
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    multiCapabilities: [
        {
            browserName: 'internet explorer',
            version: 'latest',
            platform: 'Windows 10',
            name: 'e2e-win-internet-explorer',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'MicrosoftEdge',
            version: 'latest',
            platform: 'Windows 10',
            name: 'e2e-win-edge',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'chrome',
            version: 'latest',
            platform: 'Windows 10',
            name: 'e2e-win-chrome',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'firefox',
            version: 'latest',
            platform: 'Windows 10',
            name: 'e2e-win-firefox',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'chrome',
            platform: 'macOS 10.15',
            version: 'latest',
            name: 'e2e-MAC-chrome',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'firefox',
            platform: 'macOS 10.15',
            version: 'latest',
            name: 'e2e-MAC-firefox',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'MicrosoftEdge',
            platform: 'macOS 10.15',
            version: 'latest',
            name: 'e2e-MAC-Edge',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
        {
            browserName: 'safari',
            platform: 'macOS 10.15',
            version: '13.1',
            name: 'e2e-MAC-safari',
            acceptInsecureCerts: true,
            tags: [ process.env.TRAVIS_BUILD_ID],
        },
    ],
    // baseUrl: 'http://localhost:4200/fundamental-ngx#',
    baseUrl: 'https://sap.dev:4200/fundamental-ngx#',
    // baseUrl: 'http://anton.local:4200/fundamental-ngx#',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },

    onPrepare: async () => {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'true' } }));
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        // Set some config data
        const processedConfig = await browser.getProcessedConfig();

        // Resize the screens if it is a VM
        if (!('platformName' in processedConfig.capabilities)) {
            await browser.driver.manage().window().setSize(1366, 768);
        }

        if (processedConfig.sauceUser && processedConfig.sauceKey) {
            jasmine.getEnv().addReporter({
                suiteStarted: async (result) => {
                    await browser.executeScript('sauce:job-name=' + result.fullName);
                },
                specStarted: async (result) => {
                    await browser.executeScript('sauce:context=' + result.fullName);
                },
                specDone: async (result) => {
                    // If there are errors please update the error to Sauce Labs
                    if (result.failedExpectations.length > 0) {
                        const promisses = result.failedExpectations.map(async error => {
                            const errorUpdate = await browser.executeScript('sauce:context=' + error.stack);

                            return errorUpdate;
                        });

                        await Promise.all(promisses);
                    }
                },
            });
        }
    }
};
