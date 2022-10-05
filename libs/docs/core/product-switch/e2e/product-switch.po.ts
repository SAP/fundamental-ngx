import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ProductSwitchPo extends CoreBaseComponentPo {
    url = '/product-switch';

    shellbarButton = 'app-product-switch .fd-product-switch fd-popover-control button.fd-shellbar__button';
    shellbarSwitchItems = 'fd-popover-body .fd-product-switch__item';
    switchItems = 'fd-product-switch-body .fd-product-switch__item';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'product-switch'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'product-switch'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
