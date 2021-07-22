import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class BusyIndicatorPo extends CoreBaseComponentPo {
    private url = '/busy-indicator';
    componentExample = '.docs-tile-content-example';
    root = '#page-content';
    enableDisableButton = 'fd-busy-indicator ~ button';
    formName = 'input[id="name"]';
    formSurname = 'input[id="surname"]';
    formPassword = 'input[id="password"]';
    saveButton = 'fd-busy-indicator button';
    saveIndicator = 'button + .fd-busy-indicator';
    formIndicator = 'form ~ .fd-busy-indicator';
    smallIndicator = '.fd-busy-indicator--s';
    middleIndicator = '.fd-busy-indicator.fd-busy-indicator--m';
    largeIndicator = '.fd-busy-indicator.fd-busy-indicator--l';
    indicatorBlockWrapper = 'fd-busy-indicator-wrapper-example  fd-busy-indicator:nth-child(2)';

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'busy-indicator'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'busy-indicator'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.enableDisableButton);
    }
}
