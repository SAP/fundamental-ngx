import { MenuPo } from '../pages/menu.po';
import {
    bgColorAttribute,
    menuAvatarFocusAttr,
    menuAvatarFocusColor,
    menuBtnActiveColor,
    menuBtnFocusStyle,
    menuBtnHoverColor,
    menuItemFocusStyle,
    menuItemFocusStyleAttr,
    menuItemHoverColor,
    subMenuHoverColor
} from '../fixtures/appData/menu-contents';
import {
    browserIsFirefox,
    browserIsIEorSafari,
    browserIsSafari,
    click,
    doubleClick,
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
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Menu component test suite', function() {
    const menuPage = new MenuPo();
    const {
        menuBtnArr, firstMenuBtn, secondMenuBtn, menuBtnTextArr, menuAvatarBtn, menuHorizontalAvatarBtn, menuItemArr,
        menuItemTextArr, iconMenuIconArr, menuItemOverlay, cascadingMenuBtn, cascadingMenuItemsArr, cascadingVegMenuItemsArr,
        cascadingLettuceItemsArr
    } = menuPage;

    beforeAll(() => {
        menuPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuBtnArr);
    }, 1);

    xit('should check menu btn styles', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        const basicMenuBtnArrLength = getElementArrayLength(menuBtnArr);

        for (let i = 0; basicMenuBtnArrLength > i; i++) {
            scrollIntoView(menuBtnArr, i);
            mouseHoverElement(menuBtnArr, i);
            expect(getCSSPropertyByName(menuBtnArr, bgColorAttribute, i).value)
                .toContain(menuBtnHoverColor);
        }
        focusElement(firstMenuBtn);
        sendKeys('Tab');

        const menuBtnBorderStyle = getCSSPropertyByName(secondMenuBtn, 'outline-style').value;
        expect(menuBtnBorderStyle).toContain(menuBtnFocusStyle);
    });
    // Real issue for FF
    xit('should check avatar menu btn styles', () => {
        if (browserIsFirefox()) {
            console.log('Skip for FF due #3734');
            return
        }
        doubleClick(menuAvatarBtn);

        expect(getCSSPropertyByName(menuAvatarBtn, menuAvatarFocusAttr).value)
            .toContain(menuAvatarFocusColor);
        expect(getAttributeByName(menuAvatarBtn, 'image')).not.toBe(null);
        // checks horizontal example.
        doubleClick(menuHorizontalAvatarBtn);
        // todo: fails because of issue #3734
        expect(getAttributeByName(menuHorizontalAvatarBtn, 'image')).not.toBe(null);
    });

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

    xit('should check menu btn active state', () => {
        // const arrLength = getElementArrayLength(menuPage.menuBtnArr);
        //
        // for (let i = 0; arrLength > i; i++) {
        //     mouseHoverElement(menuBtnArr, i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(menuBtnArr, bgColorAttribute, i).value)
        //         .toContain(menuBtnActiveColor);
        //     mouseButtonUp();
        // }
    });

    it('should check menu item styles', () => {
        // Hover doesn't work correctly in Safari
        if (browserIsSafari()) {
            console.log('Skip for Safari');
            return;
        }
        click(menuBtnArr);
        checkMenuItemsHoverState(menuItemArr, bgColorAttribute, menuItemHoverColor);
        checkMenuItemText(menuItemTextArr);
    });

    xit('should check menu items active state', () => {
        click(menuBtnArr);
        waitForElDisplayed(menuItemArr);
        checkMenuItemsActiveState(menuItemArr, bgColorAttribute, menuBtnActiveColor);
    });

    it('should check menu item focus', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(menuBtnArr);
        checkMenuItemFocus(menuItemArr, menuItemFocusStyleAttr, menuItemFocusStyle);
    });

    it('should check cascading menu', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(cascadingMenuBtn);
        waitForElDisplayed(cascadingMenuItemsArr);
        checkMenuItemsHoverState(cascadingMenuItemsArr, bgColorAttribute, subMenuHoverColor);
        check2ndLvlMenuItemsHvrState(cascadingMenuItemsArr, cascadingVegMenuItemsArr, bgColorAttribute,
            subMenuHoverColor);
        doubleClick(cascadingMenuBtn);
        check3rdLvlMenuItemsHvrState(cascadingMenuItemsArr, cascadingVegMenuItemsArr,
            cascadingLettuceItemsArr, bgColorAttribute, menuItemHoverColor);
        return;
    });

    xit('should check collapsed and expanded states', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for Safari and IE');
            return;
        }
        click(firstMenuBtn);
        expect(isElementDisplayed(menuItemOverlay)).toBe(true);
        click(firstMenuBtn);
        expect(isElementDisplayed(menuItemOverlay)).toBe(false);
    });

    it('should check RTL/LTR orientation', () => {
        menuPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            menuPage.saveExampleBaselineScreenshot();
            expect(menuPage.compareWithBaseline()).toBeLessThan(3);
        });
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
