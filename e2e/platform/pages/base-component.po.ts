import { $, browser } from 'protractor';

export class BaseComponentPo {

    title = $('header .header');
    async open (url: string): Promise<void> {
        await browser.get(browser.baseUrl + '/platform' + url);
    };

}
