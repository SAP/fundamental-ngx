// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome',

        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
        }

    },
    directConnect: true,
    // baseUrl: 'https://sap.github.io/fundamental-ngx/#',
    // baseUrl: 'https://fundamental-ngx.netlify.app/#/',
    baseUrl: 'http://localhost:4200/#',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },

    plugins:[],

    onPrepare() {
        browser.driver.manage().window().maximize();
        require('ts-node').register({
            project: 'e2e/tsconfig.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
