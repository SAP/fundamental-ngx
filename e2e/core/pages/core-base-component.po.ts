import { $, browser } from 'protractor';

export class CoreBaseComponentPo {

    title = $('header .header');
    async open (url: string): Promise<void> {
        await browser.get(browser.baseUrl + '/core' + url);
    };

}
