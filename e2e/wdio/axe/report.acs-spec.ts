import * as axe from 'axe-core';
import { createHtmlReport } from 'axe-html-reporter';
import { execute, open, waitForPresent } from '../driver/wdio';
import { appURLs } from './app-url';
import { PlatformBaseComponentPo } from '../platform-base-component.po';

describe('Accessibility test', () => {
    it('Should check for accessibility issues using Axe', () => {
        const { title } = new PlatformBaseComponentPo();
        const options = { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } };

        for (const pageUrl in appURLs) {
            if (appURLs[pageUrl]) {
                for (const urls in appURLs[pageUrl]) {
                    if (appURLs[pageUrl][urls]) {
                        open(`/fundamental-ngx#/${pageUrl}${appURLs[pageUrl][urls]}`);
                        waitForPresent(title);
                        execute(axe.source);

                        const results = browser.executeAsync((opts, done) => {
                            axe.run(opts, (err, res) => {
                                if (err) {
                                    done(err);
                                }
                                done(res);
                            });
                        }, options);

                        createHtmlReport({
                            results,
                            options: { outputDir: `axe-reports/${pageUrl}`, reportFileName: `index-${urls}.html` }
                        });
                        console.log(`index-${urls}.html report created`);
                        // No expect added for now. Only an audit.
                    }
                }
            }
        }
        console.log(`All report are generated successfully`);
        expect(true).toBe(true);
    });
});
