import { BtpBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class SplitterPo extends BtpBaseComponentPo {
    basicExample = 'fdb-splitter-default-example ';
    requiredWidthExample = 'fdb-splitter-required-parent-width-example ';
    splitterApiExample = 'fdb-splitter-api-example ';

    splitterSection = 'section.fd-splitter__split-pane';
    resizer = '.fd-splitter__resizer';
    button = '.fd-button';
    paginationItem = this.splitterApiExample + '.fd-splitter__pagination-item';

    private url = '/splitter';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
