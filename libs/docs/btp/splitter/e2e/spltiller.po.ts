import { BtpBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class SplitterPo extends BtpBaseComponentPo {
    private url = '/splitter';

    basicExample = 'fd-splitter-default-example ';
    requiredWidthExample = 'fd-splitter-required-parent-width-example ';
    splitterApiExample = 'fd-splitter-api-example ';

    splitterSection = 'section.fd-splitter__split-pane';
    resizer = '.fd-splitter__resizer';
    button = '.fd-button';
    paginationItem = this.splitterApiExample + '.fd-splitter__pagination-item';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
