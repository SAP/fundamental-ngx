import { MenuPo } from '../pages/menu.po';
import MenuData from '../fixtures/appData/menu-contents';
import { webDriver } from '../../driver/wdio';

describe('Menu component test suite', function() {
    const menuPage = new MenuPo();

    beforeAll(() => {
        menuPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should check menu btn styles', () => {
        if (!webDriver.browserIsIEorSafari()) {
            const basicMenuBtnArrLength = webDriver.getElementArrayLength(menuPage.menuBtnArr);

            for (let i = 0; basicMenuBtnArrLength > i; i++) {
                expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.borderColorAttribute, i).value)
                    .toContain(MenuData.menuBtnBorderColor);
                webDriver.scrollIntoView(menuPage.menuBtnArr, i);
                webDriver.mouseHoverElement(menuPage.menuBtnArr, i);
                expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
                    .toContain(MenuData.menuBtnHoverColor);
            }
            webDriver.focusElement(menuPage.firstMenuBtn);
            webDriver.sendKeys('Tab');

            const menuBtnBorderStyle = webDriver.executeScript2(menuPage.secondMenuBtn);
            expect(menuBtnBorderStyle).toContain(MenuData.menuBtnFocusStyle);
            return;
        }


    });
    // Real issue for FF
    xit('should check avatar menu btn styles', () => {
        if (!webDriver.isBrowser('firefox')) {
            webDriver.doubleClick(menuPage.menuAvatarBtn);

            expect(webDriver.getCSSPropertyByName(menuPage.menuAvatarBtn, MenuData.menuAvatarFocusAttr).value)
                .toContain(MenuData.menuAvatarFocusColor);
            expect(webDriver.getAttributeByName(menuPage.menuAvatarBtn, 'image')).not.toBe(null);
            // checks horizontal example.
            webDriver.doubleClick(menuPage.menuHorizontalAvatarBtn);
            // todo: fails because of issue #3734
            expect(webDriver.getAttributeByName(menuPage.menuHorizontalAvatarBtn, 'image')).not.toBe(null);
            return
        }
        console.log('Skip for FF due #3734');
    });

    it('should check menu btn content', () => {
        const iconMenuBtnIconsArr = webDriver.getElementArrayLength(menuPage.iconMenuIconArr);
        const basicMenuBtnTextArr = webDriver.getElementArrayLength(menuPage.menuBtnTextArr);

        for (let i = 0; iconMenuBtnIconsArr > i; i++) {
            expect(webDriver.getText(menuPage.iconMenuIconArr, i)).not.toBe(null);
        }

        for (let i = 0; basicMenuBtnTextArr > i; i++) {
            expect(webDriver.isElementDisplayed(menuPage.menuBtnTextArr, i)).toBe(true);
        }
    });

    xit('should check menu btn active state', () => {
        // const arrLength = webDriver.getElementArrayLength(menuPage.menuBtnArr);
        //
        // for (let i = 0; arrLength > i; i++) {
        //     webDriver.mouseHoverElement(menuPage.menuBtnArr, i);
        //     webDriver.mouseButtonDown();
        //     expect(webDriver.getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
        //         .toContain(MenuData.menuBtnActiveColor);
        //     webDriver.mouseButtonUp();
        // }
    });

    it('should check menu item styles', () => {
        // Hover doesn't work correctly in Safari
        if (!webDriver.isBrowser('Safari')) {
            webDriver.click(menuPage.menuBtnArr);
            checkMenuItemsHoverState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            checkMenuItemText(menuPage.menuItemTextArr);
            return;
        }
        console.log('Skip for Safari');
    });

    xit('should check menu items active state', () => {
        webDriver.click(menuPage.menuBtnArr);
        webDriver.waitForElDisplayed(menuPage.menuItemArr);
        checkMenuItemsActiveState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuBtnActiveColor);
    });

    it('should check menu item focus', () => {
        if (!webDriver.browserIsIEorSafari()) {
            webDriver.click(menuPage.menuBtnArr);
            checkMenuItemFocus(menuPage.menuItemArr, MenuData.menuItemFocusStyleAttr, MenuData.menuItemFocusStyle);
            return;
        }
        console.log('Skip for Safari and IE');
    });

    it('should check cascading menu', () => {
        if (!webDriver.browserIsIEorSafari()) {
            webDriver.click(menuPage.cascadingMenuBtn);
            webDriver.waitForElDisplayed(menuPage.cascadingMenuItemsArr);
            checkMenuItemsHoverState(menuPage.cascadingMenuItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            check2ndLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
                MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            webDriver.doubleClick(menuPage.cascadingMenuBtn);
            check3rdLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
                menuPage.cascadingLettuceItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            return;
        }
        console.log('Skip for Safari and IE');
    });

    it('should check collapsed and expanded states', () => {
        if (!webDriver.browserIsIEorSafari()) {
            webDriver.click(menuPage.firstMenuBtn);
            expect(webDriver.isElementDisplayed(menuPage.menuItemOverlay)).toBe(true);
            webDriver.click(menuPage.firstMenuBtn);
            expect(webDriver.isElementDisplayed(menuPage.menuItemOverlay)).toBe(false);
            return;
        }
        console.log('Skip for Safari and IE');
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
            webDriver.scrollIntoView(menuPage.exampleAreaContainersArr, i);
            expect(webDriver.getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = webDriver.getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            webDriver.click(menuPage.rtlSwitcherArr, i);
            expect(webDriver.getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(webDriver.getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });
});


function checkMenuItemsHoverState(itemsArrSelector, attribute, expectation): void {
    const menuItemsArrLength = webDriver.getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArrSelector, i);
        expect(webDriver.getCSSPropertyByName(itemsArrSelector, attribute, i).value).toContain(expectation);
    }
}

function checkMenuItemsActiveState(itemsArrSelector: string, attribute: string, expectation: string): void {
    const menuItemsArrLength = webDriver.getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArrSelector, i);
        // webDriver.mouseButtonDown();
        browser.performActions([{
            type: 'pointer',
            id: 'mouseDown1212',
            actions: [
                { duration: 0, x: 385, type: 'pointerMove', y: 660 },
                { type: 'pointerDown', button: 0, duration: 500000 }
            ]
        }]);
        browser.releaseActions();

        expect(webDriver.getCSSPropertyByName(itemsArrSelector, attribute, i).value).toContain(expectation);
        // webDriver.mouseButtonUp();
        browser.performActions([{
            type: 'pointer',
            id: 'mouseUp',
            actions: [
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        browser.releaseActions();
    }
}


function check2ndLvlMenuItemsHvrState(itemsArr, itemsArr2, attribute, expectation): void {
    webDriver.mouseHoverElement(itemsArr, 1);
    const arrLength = webDriver.getElementArrayLength(itemsArr2);

    for (let i = 0; arrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArr2, i);
        expect(webDriver.getCSSPropertyByName(itemsArr2, attribute, i).value).toContain(expectation);
    }
}

function check3rdLvlMenuItemsHvrState(itemsArr, itemsArr2, itemsArr3, attribute, expectation): void {
    webDriver.mouseHoverElement(itemsArr, 1);
    webDriver.mouseHoverElement(itemsArr2, 1);

    const arrLength = webDriver.getElementArrayLength(itemsArr3);

    for (let i = 0; arrLength > i; i++) {
        webDriver.mouseHoverElement(itemsArr3, i);
        expect(webDriver.getCSSPropertyByName(itemsArr3, attribute, i).value).toContain(expectation);
    }
}

function checkMenuItemText(elementSelector: string): void {
    const elementArrayLength = webDriver.getElementArrayLength(elementSelector);

    for (let i = 0; elementArrayLength > i; i++) {
        expect(webDriver.getText(elementSelector, i, 5000)).not.toBe(null);
    }
}

function checkMenuItemFocus(elementSelector: string, property: string, expectation: string): void {
    expect(webDriver.getCSSPropertyByName(elementSelector, property).value).toContain(expectation);
}
