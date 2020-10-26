// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*el.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'https://sap.github.io/fundamental-ngx/#',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

    plugins: [
    /*    {
            displayHelpUrl: true, // Displays the aXe help URL along with the error. Defaults to true.
            displayContext: true, // Displays the HTML of interest. Defaults to true.
            displayPasses: true, // Display pass results. Defaults to true.
            displayViolations: true, // Display vioaltions. Defaults to true.
            standardsToReport: ['wcag2a', 'wcag2aa'], // A list of standards to report on. If empty, reports on all standards.
            ignoreAxeFailures: false, // If true, aXe failures won't cause the whole test to fail. Defaults to false
            package: 'protractor-axe-html-report-plugin',
            globalParams: {}

  }*/],
  onPrepare() {
      browser.driver.manage().window().maximize();
      require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
