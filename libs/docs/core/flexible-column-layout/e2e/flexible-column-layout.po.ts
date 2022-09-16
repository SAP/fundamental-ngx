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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'flexible-column-layout'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'flexible-column-layout'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
