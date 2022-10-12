// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class BusyIndicatorPo extends CoreBaseComponentPo {
    private url = '/busy-indicator';
    componentExample = '.docs-tile-content-example';
    root = '#page-content';
    enableDisableButton = 'fd-busy-indicator ~ button';
    busyIndicatorLabelExample = 'fd-busy-indicator-label-example ';
    busyIndicatorExtendedExample = 'fd-busy-indicator-extended-example ';
    openBusyIndicatorButton = this.busyIndicatorExtendedExample + '.fd-button--standard';
    hideBusyIndicatorButton = this.busyIndicatorExtendedExample + '.fd-button--emphasized';
    formName = 'input[id="name"]';
    formSurname = 'input[id="surname"]';
    formPassword = 'input[id="password"]';
    hideAllButton = '.fd-button[aria-label*="Hide All"]';
    saveButton = 'fd-busy-indicator button';
    busyIndicator = '.fd-busy-indicator';
    busyIndicatorLabel = '.fd-busy-indicator-extended__label';
    saveIndicator = 'button + .fd-busy-indicator';
    formIndicator = 'form ~ .fd-busy-indicator';
    smallIndicator = '.fd-busy-indicator--s';
    middleIndicator = '.fd-busy-indicator.fd-busy-indicator--m';
    largeIndicator = '.fd-busy-indicator.fd-busy-indicator--l';
    indicatorBlockWrapper = 'fd-busy-indicator-wrapper-example  fd-busy-indicator:nth-child(2)';
    messageToast = '.fd-message-toast-container ';

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'busy-indicator'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'busy-indicator'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
