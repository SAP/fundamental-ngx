import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FlexibleColumnLayoutPo extends CoreBaseComponentPo {
    private url = '/flexible-column-layout';

    defaultExample = 'fd-flexible-column-layout-example ';
    dynamicExample = 'fd-flexible-column-layout-dynamic-page-example ';
    separator = '.fd-flexible-column-layout__separator ';

    button = '.fd-button';
    screen = '.docs-fcl-example-overlay-content ';
    screenHeader = this.screen + '.docs-fcl-example-button ';
    exitExampleBtn = this.screenHeader + this.button;
    column = '.fd-flexible-column-layout__column ';
    columnButton = this.column + this.button;
    separateButton = '.fd-flexible-column-layout__button';
    collapsButton = '.fd-dynamic-page__collapse-button';
    collapsibleHeader = '.fd-dynamic-page__collapsible-header';
    pinButton = '.fd-dynamic-page__pin-button';
    columnButton2 = this.column + ' .fd-button:not(.fd-button--standard, .fd-button--transparent)';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'flexible-column-layout'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'flexible-column-layout'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
