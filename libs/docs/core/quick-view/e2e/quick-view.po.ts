import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class QuickViewPo extends CoreBaseComponentPo {
    root = '#page-content';

    mobileLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "tel")])[1]';
    phoneLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "tel")])[2]';
    mobilePopoverLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "tel")])[3]';
    phonePopoverLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "tel")])[4]';
    emailLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "mail")])[1]';
    emailPopoverLabel = '(//fd-quick-view-group-item-content//child::a[contains(@href, "mail")])[2]';
    companyNameLabel = '(//fd-quick-view-group-item-content//child::div)[1]';
    companyAddressLabel = '(//fd-quick-view-group-item-content//child::div)[2]';
    companyPopoverNameLabel = '(//fd-quick-view-group-item-content//child::div)[3]';
    companyPopoverAddressLabel = '(//fd-quick-view-group-item-content//child::div)[4]';
    title = '[bardesign="header-with-subheader"] .fd-title';
    avatar = '.fd-quick-view fd-avatar';
    popoverAvatar = '(//*[contains(@class, "fd-quick-view__content")]//child::fd-avatar)[2]';
    popoverHeader = '.fd-bar--header fd-bar-element';
    popoverWithoutHeaderButton = '.fd-docs-flex-display-helper :nth-child(2) button';
    popoverWithHeaderButton = 'fd-quick-view-popover-example button:nth-child(1)';
    popoverSendReminderButton = '.fd-bar__right :nth-child(1) button';
    popoverCancelButton = '.fd-bar__right :nth-child(2) button';
    openDialogButton = '#in-dialog + component-example button';

    private url = '/quick-view';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'quick-view'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'quick-view'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
