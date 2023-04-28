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
        sl_safari_macOS: {
            base: 'SauceLabs',
            browserName: 'Safari',
            platform: 'macOS 10.15',
            version: 'latest'
        },
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
        sl_edge_macOS: {
            base: 'SauceLabs',
            platform: 'macOS 10.15',
            browserName: 'MicrosoftEdge',
            version: 'latest'
        },
        /*        sl_ipad_macOS: {
                    base: 'SauceLabs',
                    platformVersion: '13.2',
                    platformName: 'iOS',
                    browserName: 'Safari',
                    deviceName: 'iPad Pro (11 inch) Simulator',
                    deviceOrientation: 'portrait',
                    version: 'latest'
        },*/
        sl_firefox_win: {
            base: 'SauceLabs',
            platform: 'windows 10',
            browserName: 'firefox',
            version: 'latest'
        },
        sl_chrome_win: {
            base: 'SauceLabs',
            platform: 'windows 10',
            browserName: 'chrome',
            version: 'latest'
        },
        sl_edge_win: {
            base: 'SauceLabs',
            platform: 'windows 10',
            browserName: 'MicrosoftEdge',
            version: 'latest'
        }
        // sl_ie_win: {
        //     base: 'SauceLabs',
        //     platform: 'windows 10',
        //     browserName: 'internet explorer',
        //     version: 'latest'
        // },
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-sauce-launcher'),
            require('karma-spec-reporter')
        ],
        client: {
            // leave Jasmine Spec Runner output visible in browser
            clearContext: false,
            jasmine: {
                timeoutInterval: 120000
            }
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../coverage'),
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        reporters: ['spec', 'dots', 'saucelabs', 'kjhtml'],
        port: 9876,
        colors: true,
        sauceLabs: {
            build,
            region: 'eu',
            startConnect: true,
            maxDuration: 10800,
            testName: 'fundamental-ngx' + process.env.BUILD_ID + process.env.TRAVIS_PULL_REQUEST_BRANCH,
            recordScreenshots: false,
            connectOptions: {
                user: process.env.SAUCE_USERNAME,
                'api-key': process.env.SAUCE_ACCESS_KEY,
                logfile: 'sauce_connect.log',
                scVersion: '4.6.2'
            },
            public: 'public',
            idleTimeout: 20000,
            screenResolution: '1920x1080',
            customData: {
                branch,
                jobUrl
            }
        },
        logLevel: config.LOG_DISABLE,
        autoWatch: false,
        browserDisconnectTimeout: 60000, // default 2000
        browserDisconnectTolerance: 2, // default 0
        browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
        captureTimeout: 4 * 60 * 1000, //default 60000
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true,
        retryLimit: 3 // default 2
    });
};
