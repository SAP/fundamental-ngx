import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class QuickViewPo extends CoreBaseComponentPo {
    private url = '/quick-view';
    root = '#page-content';
    pageHeader = 'app-quick-view-docs-header h1';

    popoverContent = '.fd-popover__popper .fd-quick-view__content';
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
    subTitle = '[class="fd-quick-view__subtitle"]';
    title = '[bardesign="header-with-subheader"] .fd-title';
    popoverSubTitle = '.fd-popover__popper div.fd-quick-view__subtitle';
    popoverTitle = '.fd-popover__popper h5';
    avatar = '.fd-quick-view fd-avatar';
    popoverAvatar = '(//*[contains(@class, "fd-quick-view__content")]//child::fd-avatar)[2]';
    popoverHeader = '.fd-bar--header fd-bar-element';
    popoverWithoutHeaderButton = '.fd-docs-flex-display-helper :nth-child(2) button';
    popoverWithHeaderButton = '.fd-popover-custom:nth-child(1) button';
    popoverSendReminderButton = '.fd-bar__right :nth-child(1) button';
    popoverCancelButton = '.fd-bar__right :nth-child(2) button';
    openDialogButton = '#in-dialog + component-example button';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.pageHeader);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'quick-view'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'quick-view'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
