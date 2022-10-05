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

    beforeAll(async () => {
        await splitButtonPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(splitButtonPage.root);
        await waitForElDisplayed(splitButtonPage.title);
    }, 1);

    it('should expand the menu and button shall invoke drop down menu', async () => {
        await checkMenuOpens(buttonBehaviorExample);
        await checkMenuOpens(buttonTypesExample);
        await checkMenuOpens(buttonTemplateExample);
        await checkMenuOpens(buttonPragmaticalExample);
        await checkMenuOpens(iconBehaviorExample);
    });

    it('Verify split button does not have less than 2 buttons', async () => {
        await checkSplitMenuQuantity(buttonBehaviorExample);
        await checkSplitMenuQuantity(iconBehaviorExample);
        await checkSplitMenuQuantity(buttonTypesExample);
        await checkSplitMenuQuantity(buttonTemplateExample);
        await checkSplitMenuQuantity(buttonPragmaticalExample);
    });

    it('Verify user can choose only one option at a time', async () => {
        for (let i = 0; i < 2; i++) {
            await click(buttonBehaviorExample + arrowDownBtn);
            await expect(await isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not visible');
            const menuItemValue = await getText(splitMenuItem, i);
            await click(splitMenuItem, i);
            await acceptAlert();
            const mainButtonValue = (await getText(mainBtn)).trim();
            await expect(mainButtonValue).toEqual(menuItemValue, 'value on main button is not equal chosen value');
        }
    });

    it('After did choose expand menu should close', async () => {
        await click(buttonBehaviorExample + arrowDownBtn);
        await expect(await isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not visible');
        await click(splitMenuItem);
        await acceptAlert();
        await expect(await doesItExist(splitMenu)).toBe(false, 'drop-down is not closed');
    });

    it('should check RTL and LTR orientation', async () => {
        await splitButtonPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await splitButtonPage.saveExampleBaselineScreenshot();
        await expect(await splitButtonPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkMenuOpens(section: string): Promise<void> {
        await scrollIntoView(section);
        const itemsLength = await getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            await scrollIntoView(section + arrowDownBtn, i);
            await click(section + arrowDownBtn, i);
            await expect(await isElementDisplayed(splitMenu)).toBe(true, 'drop-down is not closed');
            await click(section + arrowDownBtn, i);
        }
    }

    async function checkSplitMenuQuantity(section: string): Promise<void> {
        const itemsLength = await getElementArrayLength(section + arrowDownBtn);
        for (let i = 0; i < itemsLength; i++) {
            await click(section + arrowDownBtn, i);
            const splitBtnArr = await getElementArrayLength(splitMenuItem);
            await expect(splitBtnArr).toBeGreaterThanOrEqual(2, 'quantity of elements less than two');
            await click(section + arrowDownBtn, i);
        }
    }
});
