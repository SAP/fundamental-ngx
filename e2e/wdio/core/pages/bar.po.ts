import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class BarPo extends CoreBaseComponentPo {
    private url = '/bar';
    root = '#page-content';
    componentExample = '.docs-tile-content-example';
    arrowButtons = '.fd-bar__left button';
    leftSections = '.fd-bar__left fd-bar-element';
    middleSections = '.fd-bar__middle fd-bar-element';
    subMiddleSection = 'fd-bar-header-subheader-example .fd-bar--subheader .fd-bar__middle';
    rightSections = '.fd-bar__right fd-bar-element:nth-child(1)';
    pictures = '.fd-bar__right fd-avatar';
    saveCancelButtons = '.fd-bar__right button';

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'bar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'bar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.arrowButtons);
    }
}
