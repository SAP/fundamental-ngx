import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FixedCardLayoutPo extends CoreBaseComponentPo {
    private url = '/fixed-card-layout';
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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'fixed-card-layout'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'fixed-card-layout'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
