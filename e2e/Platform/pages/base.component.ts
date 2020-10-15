import { browser } from 'protractor';

export class BaseComponent {
    url = 'fundamental-ngx#/';

    async open(additionalPath: string = ''): Promise<void> {
        await browser.get(this.url + additionalPath);
    }

}
