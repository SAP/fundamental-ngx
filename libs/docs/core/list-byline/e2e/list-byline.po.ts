import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ListBylinePo extends CoreBaseComponentPo {
    url = '/list-byline';

    selectionExample = 'fd-list-byline-selection-example';
    buttonExample = 'fd-list-byline-button-example';

    button = ' button';
    checkbox = ' fd-checkbox';
    radioButton = ' .fd-radio__label';
    radioButtonInput = '.fd-radio';
    listItem = ' .fd-list__item';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'list-byline'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'list-byline'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
