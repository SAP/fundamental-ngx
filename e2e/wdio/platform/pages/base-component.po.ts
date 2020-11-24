import { webDriver } from '../../driver/wdio';

export class BaseComponentPo {

    title = 'header .header';

    open(url: string): void {
        webDriver.open('platform' + url);
    };
}
