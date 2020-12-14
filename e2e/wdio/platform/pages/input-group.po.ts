import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';

export class InputGroupPo extends BaseComponentPo {
    readonly url = '/input-group';
    readonly root = '#page-content';

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }

}
