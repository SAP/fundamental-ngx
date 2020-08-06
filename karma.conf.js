// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');

module.exports = () => {
  // Defining custom browser configuration for karma. Mainly using for all the custom Sauce Labs (SL_) remote flavors
  const customLaunchers = {
    ChromeHeadlessNoSandbox: {
      base: "ChromeHeadless",
      flags: [
        "--no-sandbox",
        // required to run without privileges in Docker
        "--disable-web-security",
        "--disable-gpu",
        "--remote-debugging-port=9222"
      ]
    },
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: 'latest'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: 'latest'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      platformName: 'macOS 10.15',
      browserName: 'safari',
      version: 'latest'
    },
    'SL_Edge': {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      version: 'latest'
    },
  }

  return {
    basePath: '',
    frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-parallel'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sauce-launcher'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: constants.LOG_INFO,
    autoWatch: true,
    // By default we run Test only locally on the ChromeHeadlessNoSandbox customLauncher
    browsers: ['ChromeHeadlessNoSandbox'],
    singleRun: true,
    customLaunchers: customLaunchers,
    parallelOptions: {
      // If the environment variable KARMA_PARALLEL_EXECUTERS is set use that
      // Otherwise use a default value
      executors: process.env.KARMA_PARALLEL_EXECUTERS || 3
    },
    // We're increasing the timeouts and tolerance quite a bit
    // This ensure that test don't time out as we need to wait for the full test suite to download in a remote browser
    // See: https://support.saucelabs.com/hc/en-us/articles/225104707-Karma-Tests-Disconnect-Particularly-When-Running-Tests-on-Safari
    browserDisconnectTimeout: 1000000, // default 2000
    browserDisconnectTolerance: 0, // default 0
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
    captureTimeout: 4 * 60 * 1000, //default 60000
    // Setting Basic Sauce Labs configuration with Sauce Connect
    sauceLabs: {
      testName: 'Karma unit testing fundamental-ngx',
      // If the SAUCE_REGION environment variable is set, we set the region attribute
      // otherwise it is omitted
      ...(process.env.SAUCE_REGION && { region: process.env.SAUCE_REGION }),
      // If we're running inside Travis we will set the TRAVIS_BUILD_NUMBER and TRAVIS_BUILD_ID as the Sauce Labs build
      // This will allow us to easily link back from Sauce Labs to Travis
      ...(process.env.TRAVIS_BUILD_NUMBER && process.env.TRAVIS_BUILD_ID && {
        build: `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`
      }),
      // we start the Sauce Connect to allow Sauce Labs VMs to access localhost
      startConnect: true,
      // maximum idleTimeout as we're not actively clicking something in the UI
      idleTimeout: 1000,
    },
  };
};
