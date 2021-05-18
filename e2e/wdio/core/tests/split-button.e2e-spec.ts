import { SplitButtonPo } from '../pages/split-button.po'
import {
    acceptAlert,
    click,
    getElementArrayLength,
    getText,
    isAlertOpen,
    isElementDisplayed,
    refreshPage,
    waitForPresent
} from '../../driver/wdio';

describe('Split-button test suite', () => {

    const splitButtonPage = new SplitButtonPo();
    const {
        mainbtn, splitItem, splitMenu, buttonBehaviorExample,
        iconBehaviorExample, button, buttonTypesExample, buttonPragmaticalExample,
        buttonTemplateExample, icons
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
        checkMenuOpens(iconBehaviorExample);
        checkMenuOpens(buttonTypesExample);
        checkMenuOpens(buttonTemplateExample);
        checkMenuOpens(buttonPragmaticalExample);

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
            click(buttonBehaviorExample + icons);
            expect(isElementDisplayed(splitMenu)).toBe(true);
            click(splitItem, i);
            const splitBtnValue = getText(splitItem, i);
            const mainBtnValue = getText(mainbtn);
            expect(mainBtnValue).toEqual(splitBtnValue);
            click(buttonBehaviorExample + icons);
        }
    }); 

    it('After did choose expand menu should close', () => {
        click(buttonBehaviorExample + button);
        expect(isElementDisplayed(splitMenu)).toBe(true);
        click(splitItem);
        acceptAlert();
        // after choose split button in menu - menu should be closed
        expect(isElementDisplayed(splitMenu)).toBe(false) ;
        click(mainbtn);
        // after click on mainbtn an alert appears
        expect(isAlertOpen()).toBe(true) ;
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
        const length = getElementArrayLength(section + button);
        for (let i = 0; i < length; i++) {
            click(section + button, i);
            expect(isElementDisplayed(splitMenu)).toBe(true);
        }
    }
    function checkSplitMenuQuantity(section: string): void {
        const length = getElementArrayLength(section + button);
        for (let i = 0; i < length; i++) {
            click(section + button, i);
            let splitBtnArr = getElementArrayLength(splitItem);
            expect(splitBtnArr).toBeGreaterThanOrEqual(2);
        }
    }
});
