import {
    click,
    doesItExist,
    elementDisplayed,
    getElementArrayLength,
    getText,
    isElementClickable,
    refreshPage,
    waitForElDisappear,
    waitForElDisplayed
} from '../../../../../e2e';
import { MenuPo } from './menu.po';

describe('Menu test suite', () => {
    const menuPage = new MenuPo();
    const {
        menuButtonsArr,
        dialogMenuTitle,
        icons,
        btnMenuWithIcons,
        btnMobileMenu,
        menuItemsArr,
        menuItems,
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
        await menuPage.waitForRoot();
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

    describe('check dialog popup Mobile Menu example', () => {
        it('should open and close dialog popup Mobile Menu', async () => {
            await click(btnMobileMenu);
            await waitForElDisplayed(dialogMobileMenu);
            await expect(await elementDisplayed(dialogMobileMenu))
                .withContext('Dialog popup Mobile Menu is not displayed after opening')
                .toBe(true);

            await click(closeDialogMobileMenu);
            await expect(await waitForElDisappear(dialogMobileMenu))
                .withContext('Dialog popup Mobile Menu is not closed after clicking the close button')
                .toBe(true);
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
