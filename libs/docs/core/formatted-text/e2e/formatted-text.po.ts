import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FormattedTextPo extends CoreBaseComponentPo {
    private url = '/formatted-text';
    convertedLinks = 'fd-formatted-text a';
    redListItem = 'fd-formatted-text ol li';

    inputHtmlText = 'fd-formatted-text-example div';
    secondInputHtmlText = 'fd-formatted-text-links-example div';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'formatted-text'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'formatted-text'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
