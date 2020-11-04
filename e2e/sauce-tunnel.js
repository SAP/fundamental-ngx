const sauceConnectLauncher = require('sauce-connect-launcher');


sauceConnectLauncher({
    username: 'tonyolkh6',
    accessKey: 'a2a89026-78b9-4ce4-8438-346bedd934cf',
    x: 'https://eu-central-1.saucelabs.com/rest/v1'

}, function (err, sauceConnectProcess) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Sauce Connect ready');
});
