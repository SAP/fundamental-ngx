import { MenuPo } from '../pages/menu.po';
import MenuData from '../fixtures/appData/menu-contents';
import { webDriver } from '../../driver/wdio';

describe('Menu component test suite', function() {
    const menuPage = new MenuPo();

    function checkMenuItemText(elementSelector: string): void {
        const elementArrayLength = webDriver.getElementArrayLength(elementSelector);

        for (let i = 0; elementArrayLength > i; i++) {
            expect(webDriver.getText(elementSelector, 5000, i)).not.toBe(null);
        }
    }

    function checkMenuItemFocus(elementSelector: string, property: string, expectation: string): void {
        expect(webDriver.getCSSPropertyByName(elementSelector, property).value).toEqual(expectation);
    }

    beforeAll(() => {
        menuPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should check menu btn styles', () => {
        const basicMenuBtnArrLength = webDriver.getElementArrayLength(menuPage.menuBtnArr);

        for (let i = 0; basicMenuBtnArrLength > i; i++) {
            expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.borderColorAttribute, i).value)
                .toEqual(MenuData.menuBtnBorderColor);
            webDriver.mouseHoverElement(menuPage.menuBtnArr, 5000, i);
            expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
                .toEqual(MenuData.menuBtnHoverColor);
        }
        webDriver.focusElement(menuPage.firstMenuBtn);
        webDriver.sendKeys('Tab');

        const menuBtnBorderStyle = webDriver.executeScript(`return (window.getComputedStyle(document.querySelector(await '${menuPage.secondMenuBtn}'), ":after").border)`);
        expect(menuBtnBorderStyle).toContain(MenuData.menuBtnFocusStyle);

    });

    it('should check avatar menu btn styles', () => {
        webDriver.doubleClick(menuPage.menuAvatarBtn);

        expect(webDriver.getCSSPropertyByName(menuPage.menuAvatarBtn, MenuData.menuAvatarFocusAttr).value)
            .toEqual(MenuData.menuAvatarFocusColor);
        expect(webDriver.getAttributeByName(menuPage.menuAvatarBtn, 'image')).not.toBe(null);

        // checks horizontal example.
        webDriver.doubleClick(menuPage.menuHorizontalAvatarBtn);
        // todo: fails because of issue #3734
        // await expect(await menuPage.menuHorizontalAvatarBtn.getCssValue(MenuData.menuAvatarFocusAttr))
        // .toEqual(MenuData.menuAvatarFocusColor);
        expect(webDriver.getAttributeByName(menuPage.menuHorizontalAvatarBtn, 'image')).not.toBe(null);

    });

    it('should check menu btn content', async () => {
        const iconMenuBtnIconsArr = webDriver.getElementArrayLength(menuPage.iconMenuIconArr);
        const basicMenuBtnTextArr = webDriver.getElementArrayLength(menuPage.menuBtnTextArr);

        for (let i = 0; iconMenuBtnIconsArr > i; i++) {
            expect(webDriver.getText(menuPage.iconMenuIconArr, 5000, i)).not.toBe(null);
        }

        for (let i = 0; basicMenuBtnTextArr > i; i++) {
            expect(webDriver.isElementDisplayed(menuPage.iconMenuIconArr, 5000, i)).toBe(true);
        }
    });

    it('should check menu btn active state', async () => {
        const arrLength = webDriver.getElementArrayLength(menuPage.menuBtnArr);

        for (let i = 0; arrLength > i; i++) {
            webDriver.mouseHoverElement(menuPage.menuBtnArr, 5000, i);
            webDriver.mouseButtonDown();
            expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
                .toEqual(MenuData.menuBtnActiveColor);
            webDriver.mouseButtonUp();
        }
    });

    it('should check menu item styles', async () => {
        webDriver.click(menuPage.menuBtnArr);

        checkMenuItemsHoverState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
        checkMenuItemText(menuPage.menuItemTextArr);
    });

    it('should check menu items active state', async () => {
        webDriver.click(menuPage.menuBtnArr);
        checkMenuItemsActiveState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuBtnActiveColor);
    });

    it('should check menu item focus', () => {
        webDriver.click(menuPage.menuBtnArr);
        checkMenuItemFocus(menuPage.menuItemArr, MenuData.menuItemFocusStyleAttr, MenuData.menuItemFocusStyle);
    });

    it('should check cascading menu', () => {
        webDriver.click(menuPage.cascadingMenuBtn);
        checkMenuItemsHoverState(menuPage.cascadingMenuItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
        check2ndLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
            MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
        webDriver.doubleClick(menuPage.cascadingMenuBtn);
        check3rdLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
            menuPage.cascadingLettuceItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
    });

    it('should check collapsed and expanded states', () => {
        webDriver.click(menuPage.firstMenuBtn);
        expect(webDriver.isElementDisplayed(menuPage.menuItemOverlay)).toBe(true);
        webDriver.click(menuPage.firstMenuBtn);
        expect(webDriver.isElementDisplayed(menuPage.menuItemOverlay)).toBe(false);
    });

    it('should check LTR orientation', () => {
        const areaContainersArrayLength = webDriver.getElementArrayLength(menuPage.exampleAreaContainersArr);

        for (let i = 0; areaContainersArrayLength > i; i++) {
            expect(webDriver.getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value)
                .toBe('ltr', 'css prop direction ');
        }
    });

    it('should check RTL orientation', () => {
        const arrL = webDriver.getElementArrayLength(menuPage.exampleAreaContainersArr);

        for (let i = 0; arrL > i; i++) {
            webDriver.scrollIntoView(menuPage.exampleAreaContainersArr, 5000, i);
            expect(webDriver.getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = webDriver.getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            webDriver.click(menuPage.rtlSwitcherArr, 5000, i);
            expect(webDriver.getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(webDriver.getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });
});


function checkMenuItemsHoverState(itemsArrSelector, attribute, expectation): void {
    const menuItemsArrLength = webDriver.getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArrSelector, 5000, i);
        expect(webDriver.getCSSPropertyByName(itemsArrSelector, attribute, i).value).toEqual(expectation);
    }
}

function checkMenuItemsActiveState(itemsArrSelector: string, attribute: string, expectation: string): void {
    const menuItemsArrLength = webDriver.getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArrSelector, 5000, i);
        webDriver.mouseButtonDown();
        expect(webDriver.getCSSPropertyByName(itemsArrSelector, attribute, i).value).toEqual(expectation);
        webDriver.mouseButtonUp();
    }
}


function check2ndLvlMenuItemsHvrState(itemsArr, itemsArr2, attribute, expectation): void {
    webDriver.mouseHoverElement(itemsArr, 5000, 1);
    const arrLength = webDriver.getElementArrayLength(itemsArr2);

    for (let i = 0; arrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArr2, 5000, i);
        expect(webDriver.getCSSPropertyByName(itemsArr2, attribute, i).value).toEqual(expectation);
    }
}

function check3rdLvlMenuItemsHvrState(itemsArr, itemsArr2, itemsArr3, attribute, expectation): void {
    webDriver.mouseHoverElement(itemsArr, 5000, 1);
    webDriver.mouseHoverElement(itemsArr2, 5000, 1);

    const arrLength = webDriver.getElementArrayLength(itemsArr3);

    for (let i = 0; arrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArr3, 5000, i);
        expect(webDriver.getCSSPropertyByName(itemsArr3, attribute).value).toEqual(expectation);
    }
}
