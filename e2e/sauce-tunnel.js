const sauceConnectLauncher = require('sauce-connect-launcher');


sauceConnectLauncher({
    username: process.env.SAUCE_USERNAME,
    accessKey: process.env.SAUCE_ACCESS_KEY,
    x: 'https://eu-central-1.saucelabs.com/rest/v1',
    // noSslBumpDomains: 'sap.dev',
    // logfile: 'sauce_connect_e2e.log',
    //doctor: true

}, function (err, sauceConnectProcess) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Sauce Connect ready');
});
