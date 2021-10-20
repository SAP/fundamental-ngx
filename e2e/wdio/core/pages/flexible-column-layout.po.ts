import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'flexible-column-layout'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'flexible-column-layout'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
