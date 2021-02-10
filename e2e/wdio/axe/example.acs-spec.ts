// load the axe-core script
import { source } from 'axe-core';

import { createHtmlReport } from 'axe-html-reporter';
import { pause, open, execute } from '../driver/wdio';
import * as axe from 'axe-core';
import { appURLs } from './routs';

describe('My accesssibility test', () => {
    it('Should check for accessibility issues using Axe', () => {

        for (const pageUrl in appURLs)


        open('/fundamental-ngx#/platform/list');
        pause(2000);


        // inject the script
        execute(source);

        console.log('==============================================================', axe.getRules(['wcag2a']));
        console.log('==============================================================================');
        console.log('==============================================================', axe.getRules(['wcag2aa']));
        console.log('==============================================================================');
        const options = { runOnly: { type: 'rule', values: ['', '', ''] } };
        // run inside browser and get results
        const results = browser.executeAsync((options, done) => {
            axe.run(options, function(err, results) {
                if (err) done(err);
                done(results);
            });
        }, options);

        const test = 'list';

        createHtmlReport({
            results: results,
            options: { outputDir: 'axe-reports', reportFileName: `index-${test}.html` }
        });
        // assert there are no violations
        console.log(results.violations);
        console.log(results.violations);
        expect(results.violations.length).toBe(0, 'this site does not pass accesibility test');
    });
});
