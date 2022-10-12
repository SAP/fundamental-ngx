import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SplitterPo extends CoreBaseComponentPo {
    private url = '/splitter';

    basicExample = 'fd-slider-default-example ';
    requiredWidthExample = 'fd-slider-required-parent-width-example ';
    sliderApiExample = 'fd-slider-api-example ';

    splitterSection = 'section.fd-splitter__split-pane';
    resizer = '.fd-splitter__resizer';
    button = '.fd-button';
    paginationItem = this.sliderApiExample + '.fd-splitter__pagination-item';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
