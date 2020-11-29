import { webDriver } from '../../driver/wdio';
import { baseUrl } from '../../../../wdio.conf.js'

export class CoreBaseComponentPo {

    title = 'header .header';

     open (url: string): void {
         webDriver.open('fundamental-ngx#/core' + url);
    };

}
