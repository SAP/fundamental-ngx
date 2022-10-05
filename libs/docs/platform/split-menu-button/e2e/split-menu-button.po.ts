import { getText, PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';
import { outputLabel } from './split-menu-button-page-contents';

export class SplitMenuButtonPo extends PlatformBaseComponentPo {
    private url = '/split-menu-button';
    root = '#page-content';

    arrowBtnArr = 'component-example button:nth-of-type(2)';
    mainBtnArr = 'component-example button:first-of-type';
    menuOverlay = '.cdk-overlay-container';
    menuItemArr = '.fd-menu__list fdp-menu-item';
    behaviorsExSelectionBtnArr = 'fdp-platform-split-button-behaviors-example button:first-of-type';
    behaviorsExArrowBtnArr = 'fdp-platform-split-button-behaviors-example button:last-of-type';
    typesExSelectionBtnArr = 'fdp-platform-split-button-types-example button:first-of-type';
    typesExArrowBtnArr = 'fdp-platform-split-button-types-example button:nth-of-type(2)';
    typesOutput = 'fdp-platform-split-button-types-example p';
    iconExSelectionBtnArr = 'fdp-platform-split-button-icons-example button:first-of-type';
    iconExArrowBtnArr = 'fdp-platform-split-button-icons-example button:nth-of-type(2)';
    iconBtnAttrArr = 'fdp-platform-split-button-icons-example fdp-split-menu-button';

    async checkBtnSelectionChange(array, btnArray, expectation): Promise<void> {
        for (let i = 0; i < array.length; i++) {
            await array[i].click();
            const menuItemsArr = await browser.$$(this.menuItemArr);
            await menuItemsArr[1].click();
            await expect(await getText(btnArray, i)).toContain(expectation[i]);
        }
    }

    async checkSelectionOutput(outputSelector, expectation): Promise<void> {
        await expect(await getText(outputSelector)).toEqual(outputLabel + expectation);
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'split-menu-button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'split-menu-button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
