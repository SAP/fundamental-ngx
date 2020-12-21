// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require('dotenv').config();
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*accessibility.e2e-spec.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },

    directConnect: true,
    baseUrl: 'http://www.google.com',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },

    plugins: [{
        //    displayHelpUrl: true|false, // Displays the aXe help URL along with the error. Defaults to true.
        //    displayContext: true|false, // Displays the HTML of interest. Defaults to true.
        //    displayPasses: true|false, // Display pass results. Defaults to true.
        //    displayViolations: true|false, // Display vioaltions. Defaults to true.
        standardsToReport: ['wcag2a', 'wcag2aa'], // A list of standards to report on. If empty, reports on all standards.
        ignoreAxeFailures: true, // If true, aXe failures won't cause the whole test to fail. Defaults to false
        package: 'protractor-axe-html-report-plugin',
        globalParams: {}
    }],
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: 'raw' } }));
    }
};
