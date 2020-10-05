// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
require('dotenv').config();

module.exports = function (config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    const branch = `${process.env.REPO}/${process.env.BRANCH}` || 'Local run';
    const jobUrl = process.env.JOB_URL || 'locally';
    const build = process.env.BUILD_ID || '';

    const customLaunchers = {
        sl_chrome_macOS: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'macOS 10.15',
            version: 'latest'
        },
        sl_firefox_macOS: {
             base: 'SauceLabs',
             platform: 'macOS 10.15',
             browserName: 'firefox',
             version: 'latest'
        },
        sl_chrome_win_10: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        },
        sl_firefox_win_10: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        }
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-sauce-launcher'),
            require('karma-spec-reporter')
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                timeoutInterval: 20000
            }
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        reporters: ['spec', 'progress', 'saucelabs'],
        port: 9876,
        colors: true,
        sauceLabs: {
            build,
            region: 'eu',
            startConnect: true,
            maxDuration: 10800,
            testName: 'fundamental-ngx',
            recordScreenshots: false,
            connectOptions: {
                user: process.env.SAUCE_USERNAME,
                'api-key': process.env.SAUCE_ACCESS_KEY,
                logfile: 'sauce_connect.log'
            },
            public: 'public',
            screenResolution: '1920x1080',
            customData: {
                branch,
                jobUrl
            }
        },
        logLevel: config.LOG_WARN,
        autoWatch: false,
        browserDisconnectTimeout : 20000, // default 2000
        browserDisconnectTolerance : 1, // default 0
        browserNoActivityTimeout : 4*60*1000, //default 10000
        captureTimeout : 4*60*1000, //default 60000
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
};
