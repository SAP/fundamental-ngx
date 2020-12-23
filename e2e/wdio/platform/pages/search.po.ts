import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';

export class PanelPo extends BaseComponentPo {

    url = '/search-field';
    root = '#page-content';


    cozySearch = '';
    compactSearch = '';

    cozyWithCategoriesSearch = '';
    compactWithCategoriesSearch = '';

    cozyWithDataSourceSearch = '';

    open(): void {
        super.open(this.url);
        webDriver.waitForElDisplayed(this.root);
    }
}
