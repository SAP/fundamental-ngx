import { SplitButtonPo } from '../pages/split-button.po'
import {
    acceptAlert,
    click,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForPresent
} from '../../driver/wdio';

describe('Split-button test suite', () => {

    const splitButtonPage = new SplitButtonPo();
    const {
        mainbtn, splitItem, splitMenu, buttonBehaviorExample,
        iconBehaviorExample, buttonTypesExample, buttonPragmaticalExample,
        buttonTemplateExample, arrowDownBtn
    } = splitButtonPage;

    beforeAll(() => {
        splitButtonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(mainbtn);
    }, 1);

    it('should expand the menu and button shall invoke drop down menu', () => {
        checkMenuOpens(buttonBehaviorExample);
        checkMenuOpens(buttonTypesExample);
        checkMenuOpens(buttonTemplateExample);
        checkMenuOpens(buttonPragmaticalExample);
        checkMenuOpens(iconBehaviorExample)

    });

    it('Verify split button does not have less than 2 buuttons', () => {
        checkSplitMenuQuantity(buttonBehaviorExample);
        checkSplitMenuQuantity(iconBehaviorExample);
        checkSplitMenuQuantity(buttonTypesExample);
        checkSplitMenuQuantity(buttonTemplateExample);
        checkSplitMenuQuantity(buttonPragmaticalExample);

    });
    it('Verify user can choose only one option at a time', () => {
        for (let i = 0; i < 2; i++) {
            click(buttonBehaviorExample + arrowDownBtn);
            expect(isElementDisplayed(splitMenu)).toBe(true);
            click(splitItem, i);
            acceptAlert();
            const menuItemValue = getText(splitItem, i);
            const mainButtonValue = getText(mainbtn);
            expect(mainButtonValue).toEqual(menuItemValue);
            click(buttonBehaviorExample + arrowDownBtn);
        }
    });

    it('After did choose expand menu should close', () => {
        click(buttonBehaviorExample + arrowDownBtn);
        expect(isElementDisplayed(splitMenu)).toBe(true);
        click(splitItem);
        acceptAlert();
        // after choose split button in menu - menu should be closed
        expect(isElementDisplayed(splitMenu)).toBe(false);
        click(mainbtn);
        // after click on mainbtn an alert appears
        acceptAlert();
    });

    it('should check RTL and LTR orientation', () => {
        splitButtonPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        splitButtonPage.saveExampleBaselineScreenshot();
        expect(splitButtonPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkMenuOpens(section: string): void {
        const itemsLength = getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            click(section + arrowDownBtn, i);
            expect(isElementDisplayed(splitMenu)).toBe(true);
            click(section + arrowDownBtn, i);
        }
    }
    function checkSplitMenuQuantity(section: string): void {
        const itemsLength = getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            click(section + arrowDownBtn, i);
            const splitBtnArr = getElementArrayLength(splitItem);
            expect(splitBtnArr).toBeGreaterThanOrEqual(2);
            click(section + arrowDownBtn, i);
        }
    }
});