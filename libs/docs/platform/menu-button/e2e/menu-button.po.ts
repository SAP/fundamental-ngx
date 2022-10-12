import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MenuButtonPo extends PlatformBaseComponentPo {
    private url = '/menu-button';
    root = '#page-content';

    btnArrowIconsArr = 'fdp-menu-button .sap-icon--slim-arrow-down';
    btnWorldIconArr = 'fdp-menu-button .sap-icon--world';
    cozyBtnAttrArr = 'fdp-platform-menu-button-cozy-example fdp-menu-button';
    cozyBtnArr = 'fdp-platform-menu-button-cozy-example button';
    cozySelectedItemLabel = 'fdp-platform-menu-button-cozy-example div';
    menuItemArr = '#fdp-menu-basic-menu fdp-menu-item';
    menuItemOverlay = '.cdk-overlay-container';
    compactBtnAttrArr = 'fdp-platform-menu-button-compact-example fdp-menu-button';
    compactBtnArr = 'fdp-platform-menu-button-compact-example button';
    sectionTitle = 'fd-docs-section-title h2';
    menuTypeBtnAttrArr = 'fdp-platform-menu-button-example fdp-menu-button';
    menuTypeBtnArr = 'fdp-platform-menu-button-example button';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'menu-button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'menu-button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
