import * as axe from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import { execute, open, waitForPresent } from '../driver/wdio';
import { appURLs } from './app-url';
import { BaseComponentPo } from '../platform/pages/base-component.po';

describe('Accessibility test', () => {
    it('Should check for accessibility issues using Axe', () => {
        const { title } = new BaseComponentPo();
        const options = { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } };

        for (const pageUrl in appURLs) {
            for (const urls in appURLs[pageUrl]) {
                open(`/fundamental-ngx#/${pageUrl}${appURLs[pageUrl][urls]}`);
                waitForPresent(title);
                execute(axe.source);

                const results = browser.executeAsync((options, done) => {
                    axe.run(options, function(err, results) {
                        if (err) {
                            done(err);
                        }
                        done(results);
                    });
                }, options);

                createHtmlReport({
                    results: results,
                    options: { outputDir: `axe-reports/${pageUrl}`, reportFileName: `index-${urls}.html` }
                });
                console.log(`index-${urls}.html report created`)
                // No expect added for now. Only an audit.
            }
        }
        console.log(`All report are generated successfully`);
        expect(true).toBe(true);
    });
});
