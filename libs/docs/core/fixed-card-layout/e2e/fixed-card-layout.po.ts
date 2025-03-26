import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class FixedCardLayoutPo extends CoreBaseComponentPo {
    root = '#page-content';
    pageHeader = 'fd-fixed-card-layout-docs-header h1';

    hideCardBtnArr = 'fd-fixed-card-layout-examples button';
    cardDivArr = '.fd-fixed-card-layout__card';
    cardHeaderArr = 'fd-card fd-card-header';
    cardContentArr = 'fd-card fd-card-content';
    cardColumnArr = 'div.cdk-drop-list';
    disableDragBtn = 'fd-fixed-card-layout-disabled-drag .disable-dnd';
    placeholderCard = 'div.fd-fixed-card-layout__card-placeholder';
    navigationMenuBtn = 'button[aria-label*="Switch Navigation"]';
    pageSidebar = 'sections-toolbar .sidebar';
    disabledCardContent = 'fd-fixed-card-layout-disabled-drag fd-card fd-card-content';
    disabledCardDiv = 'fd-fixed-card-layout-disabled-drag .fd-fixed-card-layout__card';

    private url = '/fixed-card-layout';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'fixed-card-layout'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'fixed-card-layout'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
