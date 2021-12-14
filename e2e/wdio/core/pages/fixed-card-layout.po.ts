import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FixedCardLayoutPo extends CoreBaseComponentPo {
    private url = '/fixed-card-layout';
    root = '#page-content';
    pageHeader = 'fd-fixed-card-layout-docs-header h1';

    hideCardBtnArr = 'fd-fixed-card-layout-examples button';
    cardDivArr = 'div.cdk-drag.fd-fixed-card-layout__card.ng-star-inserted';
    cardHeaderArr = 'fd-card fd-card-header';
    cardContentArr = 'fd-card fd-card-content';
    cardColumnArr = 'div.cdk-drop-list';
    disableDragBtn = 'fd-fixed-card-layout-disabled-drag button';
    placeholderCard = 'div.fd-fixed-card-layout__card-placeholder';
    navigationMenuBtn = 'button[aria-label*="Switch Navigation"]';
    pageSidebar = 'sections-toolbar .sidebar';
    disabledCardContent = 'fd-fixed-card-layout-disabled-drag fd-card fd-card-content';
    disabledCardDiv = 'fd-fixed-card-layout-disabled-drag div.cdk-drag.fd-fixed-card-layout__card.ng-star-inserted';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.pageHeader);
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
