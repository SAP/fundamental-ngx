import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ProductSwitchPo extends CoreBaseComponentPo {
    url = '/product-switch';

    shellbarButton = 'app-product-switch fd-popover-control button.fd-product-switch__control';
    shellbarSwitchItems = 'fd-popover-body .fd-product-switch__item';
    switchItems = 'fd-product-switch-body .fd-product-switch__item';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'product-switch'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'product-switch'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
