import { MenuPo } from '../pages/menu.po';
import MenuData from '../fixtures/appData/menu-contents';
import {
    browserIsFirefox,
    browserIsIEorSafari,
    browserIsSafari,
    click,
    doubleClick,
    executeScriptAfterTagFF,
    focusElement,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed, waitForPresent
} from '../../driver/wdio';

describe('Menu component test suite', function() {
    const menuPage = new MenuPo();

    beforeAll(() => {
        menuPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuPage.menuBtnArr);
    }, 1);

    it('should check menu btn styles', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        const basicMenuBtnArrLength = getElementArrayLength(menuPage.menuBtnArr);

        for (let i = 0; basicMenuBtnArrLength > i; i++) {
            expect(getCSSPropertyByName(menuPage.menuBtnArr, MenuData.borderColorAttribute, i).value)
                .toContain(MenuData.menuBtnBorderColor);
            scrollIntoView(menuPage.menuBtnArr, i);
            mouseHoverElement(menuPage.menuBtnArr, i);
            expect(getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
                .toContain(MenuData.menuBtnHoverColor);
        }
        focusElement(menuPage.firstMenuBtn);
        sendKeys('Tab');

        const menuBtnBorderStyle = executeScriptAfterTagFF(menuPage.secondMenuBtn);
        expect(menuBtnBorderStyle).toContain(MenuData.menuBtnFocusStyle);
    });
    // Real issue for FF
    xit('should check avatar menu btn styles', () => {
        if (browserIsFirefox()) {
            console.log('Skip for FF due #3734');
            return
        }
        doubleClick(menuPage.menuAvatarBtn);

        expect(getCSSPropertyByName(menuPage.menuAvatarBtn, MenuData.menuAvatarFocusAttr).value)
            .toContain(MenuData.menuAvatarFocusColor);
        expect(getAttributeByName(menuPage.menuAvatarBtn, 'image')).not.toBe(null);
        // checks horizontal example.
        doubleClick(menuPage.menuHorizontalAvatarBtn);
        // todo: fails because of issue #3734
        expect(getAttributeByName(menuPage.menuHorizontalAvatarBtn, 'image')).not.toBe(null);
    });

    it('should check menu btn content', () => {
        const iconMenuBtnIconsArr = getElementArrayLength(menuPage.iconMenuIconArr);
        const basicMenuBtnTextArr = getElementArrayLength(menuPage.menuBtnTextArr);

        for (let i = 0; iconMenuBtnIconsArr > i; i++) {
            expect(getText(menuPage.iconMenuIconArr, i)).not.toBe(null);
        }

        for (let i = 0; basicMenuBtnTextArr > i; i++) {
            expect(isElementDisplayed(menuPage.menuBtnTextArr, i)).toBe(true);
        }
    });

    xit('should check menu btn active state', () => {
        // const arrLength = getElementArrayLength(menuPage.menuBtnArr);
        //
        // for (let i = 0; arrLength > i; i++) {
        //     mouseHoverElement(menuPage.menuBtnArr, i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(menuPage.menuBtnArr, MenuData.bgColorAttribute, i).value)
        //         .toContain(MenuData.menuBtnActiveColor);
        //     mouseButtonUp();
        // }
    });

    it('should check menu item styles', () => {
        // Hover doesn't work correctly in Safari
        if (browserIsSafari()) {
            console.log('Skip for Safari');
            return;
        }
        click(menuPage.menuBtnArr);
        checkMenuItemsHoverState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
        checkMenuItemText(menuPage.menuItemTextArr);
    });

    xit('should check menu items active state', () => {
        click(menuPage.menuBtnArr);
        waitForElDisplayed(menuPage.menuItemArr);
        checkMenuItemsActiveState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuBtnActiveColor);
    });

    it('should check menu item focus', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(menuPage.menuBtnArr);
        checkMenuItemFocus(menuPage.menuItemArr, MenuData.menuItemFocusStyleAttr, MenuData.menuItemFocusStyle);
    });

    it('should check cascading menu', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(menuPage.cascadingMenuBtn);
        waitForElDisplayed(menuPage.cascadingMenuItemsArr);
        checkMenuItemsHoverState(menuPage.cascadingMenuItemsArr, MenuData.bgColorAttribute, MenuData.subMenuHoverColor);
        check2ndLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
            MenuData.bgColorAttribute, MenuData.subMenuHoverColor);
        doubleClick(menuPage.cascadingMenuBtn);
        check3rdLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
            menuPage.cascadingLettuceItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
        return;
    });

    it('should check collapsed and expanded states', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(menuPage.firstMenuBtn);
        expect(isElementDisplayed(menuPage.menuItemOverlay)).toBe(true);
        click(menuPage.firstMenuBtn);
        expect(isElementDisplayed(menuPage.menuItemOverlay)).toBe(false);
    });

    it('should check LTR orientation', () => {
        const areaContainersArrayLength = getElementArrayLength(menuPage.exampleAreaContainersArr);

        for (let i = 0; areaContainersArrayLength > i; i++) {
            expect(getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value)
                .toBe('ltr', 'css prop direction ');
        }
    });

    it('should check RTL orientation', () => {
        const arrL = getElementArrayLength(menuPage.exampleAreaContainersArr);

        for (let i = 0; arrL > i; i++) {
            scrollIntoView(menuPage.exampleAreaContainersArr, i);
            expect(getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            click(menuPage.rtlSwitcherArr, i);
            expect(getCSSPropertyByName(menuPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(getAttributeByName(menuPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });
});

function checkMenuItemsHoverState(itemsArrSelector, attribute, expectation): void {
    const menuItemsArrLength = getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        mouseHoverElement(itemsArrSelector, i);
        expect(getCSSPropertyByName(itemsArrSelector, attribute, i).value).toContain(expectation);
    }
}

function checkMenuItemsActiveState(itemsArrSelector: string, attribute: string, expectation: string): void {
    const menuItemsArrLength = getElementArrayLength(itemsArrSelector);

    for (let i = 0; menuItemsArrLength > i; i++) {
        mouseHoverElement(itemsArrSelector, i);
        // mouseButtonDown();
        browser.performActions([{
            type: 'pointer',
            id: 'mouseDown1212',
            actions: [
                { duration: 0, x: 385, type: 'pointerMove', y: 660 },
                { type: 'pointerDown', button: 0, duration: 500000 }
            ]
        }]);
        browser.releaseActions();

        expect(getCSSPropertyByName(itemsArrSelector, attribute, i).value).toContain(expectation);
        // mouseButtonUp();
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
    mouseHoverElement(itemsArr, 1);
    const arrLength = getElementArrayLength(itemsArr2);

    for (let i = 0; arrLength > i; i++) {
        mouseHoverElement(itemsArr2, i);
        expect(getCSSPropertyByName(itemsArr2, attribute, i).value).toContain(expectation);
    }
}

function check3rdLvlMenuItemsHvrState(itemsArr, itemsArr2, itemsArr3, attribute, expectation): void {
    mouseHoverElement(itemsArr, 1);
    mouseHoverElement(itemsArr2, 1);

    const arrLength = getElementArrayLength(itemsArr3);

    for (let i = 0; arrLength > i; i++) {
        mouseHoverElement(itemsArr3, i);
        expect(getCSSPropertyByName(itemsArr3, attribute, i).value).toContain(expectation);
    }
}

function checkMenuItemText(elementSelector: string): void {
    const elementArrayLength = getElementArrayLength(elementSelector);

    for (let i = 0; elementArrayLength > i; i++) {
        expect(getText(elementSelector, i, 5000)).not.toBe(null);
    }
}

function checkMenuItemFocus(elementSelector: string, property: string, expectation: string): void {
    expect(getCSSPropertyByName(elementSelector, property).value).toContain(expectation);
}
