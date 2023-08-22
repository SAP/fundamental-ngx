import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ListBylinePo extends CoreBaseComponentPo {
    url = '/list-byline';

    selectionExample = 'fd-list-byline-selection-example';
    buttonExample = 'fd-list-byline-button-example';

    button = ' button';
    checkbox = ' fd-checkbox';
    radioButtonLabel = '.fd-radio__label';
    radioButtonInput = '.fd-radio';
    listItem = ' .fd-list__item';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'list-byline'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'list-byline'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
