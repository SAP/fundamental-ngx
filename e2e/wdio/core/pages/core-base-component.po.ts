import { webDriver } from '../../driver/wdio';

export class CoreBaseComponentPo {

    title = 'header .header';

    open(url: string): void {
        webDriver.open('fundamental-ngx#/core' + url);
    };

}
