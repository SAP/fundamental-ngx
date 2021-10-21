import { MenuPo } from '../pages/menu.po';
import {
    click,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

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
        cascadingVegMenuItemsArr
    } = menuPage;

    beforeAll(() => {
        menuPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuBtnArr);
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

    it('should check menu item text', () => {
        click(menuBtnArr);
        checkMenuItemText(menuItemTextArr);
    });

    it('should check cascading menu', () => {
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
