import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class PanelPo extends BaseComponentPo {

    url = '/search-field';
    root = '#page-content';



    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
