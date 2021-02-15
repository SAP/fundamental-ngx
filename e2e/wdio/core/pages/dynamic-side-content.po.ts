import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class DynamicSideContentPo extends CoreBaseComponentPo {
    private url = '/dynamic-side-content';
    root = '#page-content';
    pageHeader = 'app-dynamic-side-content-header h1';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.pageHeader);
    }
}
