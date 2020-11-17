const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        browserName: 'safari',
        chromeOptions: {
            // 'args': ['--headless', '--window-size=1920,1080']
            args: ['--headless', '--window-size=1920,1080']
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
            project: 'e2e/tsconfig.e2e.json'
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
