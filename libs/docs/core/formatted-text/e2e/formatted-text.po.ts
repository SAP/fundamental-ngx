import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FormattedTextPo extends CoreBaseComponentPo {
    private url = '/formatted-text';
    convertedLinks = 'fd-formatted-text a';
    redListItem = 'fd-formatted-text ol li';

    inputHtmlText = 'fd-formatted-text-example div';
    secondInputHtmlText = 'fd-formatted-text-links-example div';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'formatted-text'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'formatted-text'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
