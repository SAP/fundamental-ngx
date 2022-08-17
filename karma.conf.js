// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { constants } = require('karma');

module.exports = () => {
    return {
        basePath: __dirname,
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular', 'viewport'],
        plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-viewport'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-spec-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: 'coverage',
            type: 'html'
        },
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: constants.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessNoSandbox'],
        singleRun: true,
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    // required to run without privileges in Docker
                    '--disable-web-security',
                    '--disable-gpu',
                    '--remote-debugging-port=9222'
                ]
            }
        },
        parallelOptions: {
            executors: 3
        }
    };
};
