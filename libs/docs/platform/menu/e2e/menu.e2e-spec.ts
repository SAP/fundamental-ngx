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

    beforeAll(() => {
        menuPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuPage.root);
        waitForElDisplayed(menuPage.title);
    }, 1);

    it('should check menu btn content', () => {
        const iconMenuBtnIconsArr = getElementArrayLength(iconMenuIconArr);
        const basicMenuBtnTextArr = getElementArrayLength(menuBtnTextArr);

        for (let i = 0; iconMenuBtnIconsArr > i; i++) {
            expect(getText(iconMenuIconArr, i)).not.toBe(null);
        }

        for (let i = 0; basicMenuBtnTextArr > i; i++) {
            expect(isElementDisplayed(menuBtnTextArr, i)).toBe(true);
        }
    });

    it('should check selecting item', () => {
        click(menuWithIconsBtn);
        const itemText = getText(menuWithIconsItemText);
        click(menuWithIconsItem);
        expect(getText(selectedItemLabel)).toEqual(`Item Selected: ${itemText}`);
    });

    it('should check that all icons are displayed in Menu with icons example', () => {
        click(menuWithIconsBtn);
        const iconsLength = getElementArrayLength(menuWithIconsIcon);
        for (let i = 0; i < iconsLength; i++) {
            expect(isElementDisplayed(menuWithIconsIcon, i)).toBe(true);
        }
    });

    it('should check that icon can be aligned left', () => {
        click(menuWithIconsBtn);
        // means icon before span
        expect(getElementClass(menuWithIconsAddon)).toContain('before');
    });

    it('should check that icon can be aligned right', () => {
        click(menuWithIconsBtn);
        // means icon after span
        expect(getElementClass(menuWithIconsAddon, 3)).toContain('after');
    });

    it('should check that icon can be aligned right and left', () => {
        click(menuWithIconsBtn);
        expect(getElementClass(menuWithIconsAddon, 2)).toContain('after');
        expect(getElementClass(menuWithIconsAddon, 1)).toContain('before');
    });

    it('should check menu item text', () => {
        click(menuBtnArr);
        checkMenuItemText(menuItemTextArr);
    });

    it('should check cascading menu', () => {
        if (browserIsSafari()) {
            // mouse hover doesn't work in safari (checkCascadingMenu method)
            return;
        }
        click(cascadingMenuBtn);
        waitForElDisplayed(cascadingMenuItemsArr);
        checkCascadingMenu(cascadingMenuItemsArr, cascadingVegMenuItemsArr);
    });

    it('should check collapsed and expanded states', () => {
        click(menuBtn);
        expect(isElementDisplayed(menuItemOverlay)).toBe(true);
        click(menuBtn);
        expect(isElementDisplayed(menuItemOverlay)).toBe(false);
    });

    it('should check RTL/LTR orientation', () => {
        menuPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            menuPage.saveExampleBaselineScreenshot();
            expect(menuPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});

function checkCascadingMenu(itemsArr, itemsArr2): void {
    mouseHoverElement(itemsArr, 1);
    expect(getElementArrayLength('.cdk-overlay-pane .fd-menu__list')).toBe(2);
    mouseHoverElement(itemsArr2, 1);
    expect(getElementArrayLength('.cdk-overlay-pane .fd-menu__list')).toBe(3);
}

function checkMenuItemText(elementSelector: string): void {
    const elementArrayLength = getElementArrayLength(elementSelector);

    for (let i = 0; elementArrayLength > i; i++) {
        expect(getText(elementSelector, i, 5000)).not.toBe(null);
    }
}
