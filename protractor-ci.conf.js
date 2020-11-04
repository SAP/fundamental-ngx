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
            'browserName': 'internet explorer',
            'version': 'latest',
            'platform': 'Windows 10',
            'name': 'e2e-win-internet-explorer',
        },
        {
            'browserName': 'MicrosoftEdge',
            'version': 'latest',
            'platform': 'Windows 10',
            'name': 'e2e-win-edge',
        },
        {
            'browserName': 'chrome',
            'version': 'latest',
            'platform': 'Windows 10',
            'name': 'e2e-win-chrome',
        },
        {
            'browserName': 'firefox',
            'version': 'latest',
            'platform': 'Windows 10',
            'name': 'e2e-win-firefox',
        },
        {
            'browserName': 'chrome',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'e2e-MAC-chrome',
        },
        {
            'browserName': 'firefox',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'e2e-MAC-firefox',
        },
        {
            'browserName': 'MicrosoftEdge',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'e2e-MAC-Edge',
        },
        {
            'browserName': 'safari',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'e2e-MAC-safari',
        },
    ],
     baseUrl: 'http://sap.dev:4200/fundamental-ngx#',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },

    onPrepare: async () => {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'none' } }));
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
