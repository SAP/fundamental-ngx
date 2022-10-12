import { MenuPo } from './menu.po';
import {
    browserIsSafari,
    click,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Menu component test suite', () => {
    const menuPage = new MenuPo();
    const {
        menuBtnArr,
        menuBtn,
        menuBtnTextArr,
        menuItemTextArr,
        iconMenuIconArr,
        menuItemOverlay,
        cascadingMenuBtn,
        cascadingMenuItemsArr,
        cascadingVegMenuItemsArr,
        menuWithIconsBtn,
        menuWithIconsItem,
        menuWithIconsIcon,
        menuWithIconsAddon,
        menuWithIconsItemText,
        selectedItemLabel
    } = menuPage;

    beforeAll(async () => {
        await menuPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(menuPage.root);
        await waitForElDisplayed(menuPage.title);
    }, 1);

    it('should check menu btn content', async () => {
        const iconMenuBtnIconsArr = await getElementArrayLength(iconMenuIconArr);
        const basicMenuBtnTextArr = await getElementArrayLength(menuBtnTextArr);

        for (let i = 0; iconMenuBtnIconsArr > i; i++) {
            await expect(await getText(iconMenuIconArr, i)).not.toBe(null);
        }

        for (let i = 0; basicMenuBtnTextArr > i; i++) {
            await expect(await isElementDisplayed(menuBtnTextArr, i)).toBe(true);
        }
    });

    it('should check selecting item', async () => {
        await click(menuWithIconsBtn);
        const itemText = await getText(menuWithIconsItemText);
        await click(menuWithIconsItem);
        await expect(await getText(selectedItemLabel)).toEqual(`Item Selected: ${itemText}`);
    });

    it('should check that all icons are displayed in Menu with icons example', async () => {
        await click(menuWithIconsBtn);
        const iconsLength = await getElementArrayLength(menuWithIconsIcon);
        for (let i = 0; i < iconsLength; i++) {
            await expect(await isElementDisplayed(menuWithIconsIcon, i)).toBe(true);
        }
    });

    it('should check that icon can be aligned left', async () => {
        await click(menuWithIconsBtn);
        // means icon before span
        await expect(await getElementClass(menuWithIconsAddon)).toContain('before');
    });

    it('should check that icon can be aligned right', async () => {
        await click(menuWithIconsBtn);
        // means icon after span
        await expect(await getElementClass(menuWithIconsAddon, 3)).toContain('after');
    });

    it('should check that icon can be aligned right and left', async () => {
        await click(menuWithIconsBtn);
        await expect(await getElementClass(menuWithIconsAddon, 2)).toContain('after');
        await expect(await getElementClass(menuWithIconsAddon, 1)).toContain('before');
    });

    it('should check menu item text', async () => {
        await click(menuBtnArr);
        await checkMenuItemText(menuItemTextArr);
    });

    it('should check cascading menu', async () => {
        if (await browserIsSafari()) {
            // mouse hover doesn't work in safari (checkCascadingMenu method)
            return;
        }
        await click(cascadingMenuBtn);
        await waitForElDisplayed(cascadingMenuItemsArr);
        await checkCascadingMenu(cascadingMenuItemsArr, cascadingVegMenuItemsArr);
    });

    it('should check collapsed and expanded states', async () => {
        await click(menuBtn);
        await expect(await isElementDisplayed(menuItemOverlay)).toBe(true);
        await click(menuBtn);
        await expect(await isElementDisplayed(menuItemOverlay)).toBe(false);
    });

    it('should check RTL/LTR orientation', async () => {
        await menuPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await menuPage.saveExampleBaselineScreenshot();
            await expect(await menuPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});

async function checkCascadingMenu(itemsArr, itemsArr2): Promise<void> {
    await mouseHoverElement(itemsArr, 1);
    await expect(await getElementArrayLength('.cdk-overlay-pane .fd-menu__list')).toBe(2);
    await mouseHoverElement(itemsArr2, 1);
    await expect(await getElementArrayLength('.cdk-overlay-pane .fd-menu__list')).toBe(3);
}

async function checkMenuItemText(elementSelector: string): Promise<void> {
    const elementArrayLength = await getElementArrayLength(elementSelector);

    for (let i = 0; elementArrayLength > i; i++) {
        await expect(await getText(elementSelector, i, 5000)).not.toBe('');
    }
}
