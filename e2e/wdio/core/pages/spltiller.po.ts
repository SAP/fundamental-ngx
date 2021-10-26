import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class SplitterPo extends CoreBaseComponentPo {
    private url = '/splitter';

    basicExample = 'fd-slider-default-example ';
    requiredWidthExample = 'fd-slider-required-parent-width-example ';
    sliderApiExample = 'fd-slider-api-example ';

    splitterSection = 'section.fd-splitter__split-pane';
    resizer = '.fd-splitter__resizer';
    button = '.fd-button';
    paginationItem = this.sliderApiExample + '.fd-splitter__pagination-item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
