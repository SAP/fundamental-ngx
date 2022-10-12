import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
