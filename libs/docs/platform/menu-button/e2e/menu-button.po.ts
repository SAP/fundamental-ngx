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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'menu-button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'menu-button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
