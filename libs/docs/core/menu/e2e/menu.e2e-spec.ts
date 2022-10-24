import { MenuPo } from './menu.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    elementDisplayed,
    getElementArrayLength,
    getText,
    getTextArr,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { emptyValuesArr } from './menu-contents';

describe('Menu test suite', () => {
    const menuPage = new MenuPo();
    const {
        menuButtonsArr,
        dialogMenuTitle,
        icons,
        submenuActivePath,
        btnMenuWithIcons,
        btnMobileMenu,
        btnWithSubmenu,
        menuItemsArr,
        menuItems,
        submenuItems,
        dialogMobileMenu,
        closeDialogMobileMenu,
        dialogMenuAddonArr,
        dialogMenuItemsArr,
        dialogBtnBack
    } = menuPage;
    let buttonsArrLength: number;

    beforeAll(async () => {
        await menuPage.open();
        buttonsArrLength = await getElementArrayLength(menuButtonsArr);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(menuPage.root);
        await waitForElDisplayed(menuPage.title);
    }, 1);

    describe('check all buttons functionality', () => {
        it('should be clickable', async () => {
            for (let i = 0; i < buttonsArrLength; i++) {
                await expect(await isElementClickable(menuButtonsArr, i)).toBe(
                    true,
                    `Button with index ${i} is not clickable`
                );
            }
        });

        it('should open menu when user clicks the button and close menu on 2nd click', async () => {
            for (let i = 0; i < buttonsArrLength - 1; i++) {
                await click(menuButtonsArr, i);
                await expect(await elementDisplayed(menuItems)).toBe(true, `Menu with index ${i} is not displayed`);
                await click(menuButtonsArr, i);
                await expect(await doesItExist(menuItems)).toBe(false, `Menu with index ${i} is displayed`);
            }
        });

        it('should check items in all drop downs', async () => {
            for (let i = 0; i < buttonsArrLength - 1; i++) {
                await click(menuButtonsArr, i);
                const menuItemsArrLength = await getElementArrayLength(menuItems);
                await expect(menuItemsArrLength).not.toBe(0, `Menu with index ${i} does not have items`);
            }
        });
    });

    it('should check icons near items in drop down', async () => {
        await click(btnMenuWithIcons);
        const menuItemsArrLength = await getElementArrayLength(menuItemsArr);
        for (let j = 0; j < menuItemsArrLength; j++) {
            await expect(await elementDisplayed(icons, j)).toBe(true, `item with index ${j} does not have icon`);
        }
    });

    // TODO: https://github.com/SAP/fundamental-ngx/issues/8792
    xit('should show active path on the "menu with submenu"', async () => {
        // skip due to hoverElemenet does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await click(btnWithSubmenu);
        let menuItemsArrLength = await getElementArrayLength(submenuItems);
        for (let i = 0; i < menuItemsArrLength; i++) {
            await mouseHoverElement(submenuItems, i);
            const textItem = await getText(submenuItems, i);
            const activePath = await getTextArr(submenuActivePath);
            const booleanExp = activePath.some((el) => el.trim() === textItem);
            menuItemsArrLength = await getElementArrayLength(submenuItems);
            await expect(booleanExp).toBe(true, `Active path mismatch with ${textItem} with index ${i}`);
        }
    });

    describe('check dialog popup Mobile Menu example', () => {
        it('should open and close dialog popup Mobile Menu', async () => {
            await click(btnMobileMenu);
            await waitForElDisplayed(dialogMobileMenu);
            await expect(await elementDisplayed(dialogMobileMenu)).toBe(true);
            await click(closeDialogMobileMenu);
            await expect(await doesItExist(dialogMobileMenu)).toBe(false);
        });

        it('should check cascading menu for all dialog popup buttons', async () => {
            await click(btnMobileMenu);
            const dialogMenuItemsArrLength = await getElementArrayLength(dialogMenuItemsArr);
            await checkDialogCascadingMenu(
                dialogMenuItemsArr,
                dialogMenuAddonArr,
                dialogBtnBack,
                dialogMenuItemsArrLength
            );
        });
    });

    xit('should check visual regression for all examples', async () => {
        await menuPage.saveExampleBaselineScreenshot();
        await expect(await menuPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check RTL and LTR orientation', async () => {
        await menuPage.checkRtlSwitch();
    });

    async function checkDialogCascadingMenu(
        selector: string,
        btnSelector: string,
        btnBackSelector: string,
        previousLength: number
    ): Promise<void> {
        for (let i = 0; i < previousLength; i++) {
            const btnTxt = await getText(selector, i);
            await click(btnSelector, i);
            const length = await getElementArrayLength(selector);
            const title = await getText(dialogMenuTitle);
            await expect(btnTxt).toBe(title, `Pop up title doesn't match title of the selected element ${btnTxt}-${i}`);
            if (await doesItExist(dialogMenuAddonArr)) {
                await checkDialogCascadingMenu(selector, btnSelector, btnBackSelector, length);
            }
            await click(dialogBtnBack);
        }
    }
});
