import {open } from '../../driver/wdio';
export class CoreBaseComponentPo {

    title = 'header .header';

    open(url: string): void {
        open('fundamental-ngx#/core' + url);
    };
}
