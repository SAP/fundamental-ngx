import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';
import SMBData from '../fixtures/appData/split-menu-button-page-contents';

export class SplitMenuButtonPo extends BaseComponentPo {
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

    checkBtnSelectionChange(array, btnArray, expectation): void {
        for (let i = 0; i < array.length; i++) {
            array[i].click();
            const menuItemsArr = browser.$$(this.menuItemArr);
            menuItemsArr[1].click();
            expect(webDriver.getText(btnArray, i)).toContain(expectation[i]);
        }
    }

    checkSelectionOutput(outputSelector, expectation): void {
        expect(webDriver.getText(outputSelector)).toEqual(SMBData.outputLabel + expectation);
    }

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }
}
