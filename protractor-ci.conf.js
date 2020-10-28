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
        './e2e/**/test.e2e-spec.js'
    ],

    multiCapabilities: [
        {
            'browserName': 'internet explorer',
            'version': 'latest',
            'name': 'tests-Protractor-internet-explorer',
        },
        {
            'browserName': 'chrome',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'tests-Protractor-MAC-chrome',
        },
        {
            'browserName': 'firefox',
            'platform': 'MAC',
            'version': 'latest',
            'name': 'tests-Protractor-MAC-firefox',
        }
    ],
    directConnect: false,
    baseUrl: 'http://localhost:4200/#',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
