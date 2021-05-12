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

    xit('should expand the menu and button shall invoke drop down menu', () => {
        checkMenuOpens(buttonBehaviorExample)
        checkMenuOpens(iconBehaviorExample)
        checkMenuOpens(buttonTypesExample)
        checkMenuOpens(buttonTemplateExample)
        checkMenuOpens(buttonPragmaticalExample)

    }); // done

    xit('Verify split button does not have less than 2 buuttons', () => {
        checkSplitMenuQuantity(buttonBehaviorExample)
        checkSplitMenuQuantity(iconBehaviorExample)
        checkSplitMenuQuantity(buttonTypesExample)
        checkSplitMenuQuantity(buttonTemplateExample)
        checkSplitMenuQuantity(buttonPragmaticalExample)

    }); // donek
    xit('Verify user can choose only one option at a time', () => {
        for (let i = 0; i < 2; i++) {
            click(buttonBehaviorExample + icons)
            expect(isElementDisplayed(splitMenu)).toBe(true)
            click(splitItem, i)
            const splitBtnValue = getText(splitItem, i)
            const mainBtnValue = getText(mainbtn)
            expect(mainBtnValue).toEqual(splitBtnValue)
            click(buttonBehaviorExample + icons)
        }
    }); //Done

    it('After did choose expand menu should close', () => {
        click(buttonBehaviorExample + button)
        expect(isElementDisplayed(splitMenu)).toBe(true)
        click(splitItem)
        browser.acceptAlert()
        expect(isElementDisplayed(splitMenu)).toBe(false) // after choose split button in menu - menu should be closed
        click(mainbtn)
        expect(isAlertOpen()).toBe(true) // after click on mainbtn an alert appears
        acceptAlert()
        expect(isAlertOpen()).toBe(false) 
        
    }); // done but there are a bug and test fails

    xit('should check RTL and LTR orientation', () => {
        splitButtonPage.checkRtlSwitch();
    });


    xit('should check examples visual regression', () => {
        splitButtonPage.saveExampleBaselineScreenshot();
        expect(splitButtonPage.compareWithBaseline()).toBeLessThan(3);
    });

    function checkMenuOpens(section: string): void {
        const length = getElementArrayLength(section + button)
        for (let i = 0; i < length; i++) {
            click(buttonTemplateExample + button)
            expect(isElementDisplayed(splitMenu)).toBe(true)
        }
    }
    function checkSplitMenuQuantity(section: string): void {
        const length = getElementArrayLength(section + button)
        for (let i = 0; i < length; i++) {
            click(section + button)
            let splitBtnArr = getElementArrayLength(splitItem);
            expect(splitBtnArr).toBeGreaterThanOrEqual(2)
        }
    }
});
