import { SplitButtonPo } from './split-button.po';
import {
    acceptAlert,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Split-button test suite', () => {
    const splitButtonPage = new SplitButtonPo();
    const {
        mainBtn,
        splitMenuItem,
        splitMenu,
        buttonBehaviorExample,
        iconBehaviorExample,
        buttonTypesExample,
        buttonPragmaticalExample,
        buttonTemplateExample,
        arrowDownBtn
    } = splitButtonPage;

    beforeAll(() => {
        splitButtonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(splitButtonPage.root);
        waitForElDisplayed(splitButtonPage.title);
    }, 1);

    it('should expand the menu and button shall invoke drop down menu', () => {
        checkMenuOpens(buttonBehaviorExample);
        checkMenuOpens(buttonTypesExample);
        checkMenuOpens(buttonTemplateExample);
        checkMenuOpens(buttonPragmaticalExample);
        checkMenuOpens(iconBehaviorExample);
    });

    it('Verify split button does not have less than 2 buttons', () => {
        checkSplitMenuQuantity(buttonBehaviorExample);
        checkSplitMenuQuantity(iconBehaviorExample);
        checkSplitMenuQuantity(buttonTypesExample);
        checkSplitMenuQuantity(buttonTemplateExample);
        checkSplitMenuQuantity(buttonPragmaticalExample);
    });

    it('Verify user can choose only one option at a time', () => {
        for (let i = 0; i < 2; i++) {
            click(buttonBehaviorExample + arrowDownBtn);
            expect(isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not visible');
            const menuItemValue = getText(splitMenuItem, i);
            click(splitMenuItem, i);
            acceptAlert();
            const mainButtonValue = getText(mainBtn).trim();
            expect(mainButtonValue).toEqual(menuItemValue, 'value on main button is not equal chosen value');
        }
    });

    it('After did choose expand menu should close', () => {
        click(buttonBehaviorExample + arrowDownBtn);
        expect(isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not visible');
        click(splitMenuItem);
        acceptAlert();
        expect(doesItExist(splitMenu)).toBe(false, 'drop-down is not closed');
    });

    it('should check RTL and LTR orientation', () => {
        splitButtonPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        splitButtonPage.saveExampleBaselineScreenshot();
        expect(splitButtonPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkMenuOpens(section: string): void {
        scrollIntoView(section);
        const itemsLength = getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            scrollIntoView(section + arrowDownBtn, i);
            click(section + arrowDownBtn, i);
            expect(isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not closed');
            click(section + arrowDownBtn, i);
        }
    }

    function checkSplitMenuQuantity(section: string): void {
        const itemsLength = getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            click(section + arrowDownBtn, i);
            const splitBtnArr = getElementArrayLength(splitMenuItem);
            expect(splitBtnArr).toBeGreaterThanOrEqual(2, 'quantity of elements less than two');
            click(section + arrowDownBtn, i);
        }
    }
});
