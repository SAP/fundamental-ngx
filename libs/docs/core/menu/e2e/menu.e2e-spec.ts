import { MenuPo } from './menu.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    elementDisplayed,
    getCSSPropertyByName,
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

    beforeAll(() => {
        menuPage.open();
        buttonsArrLength = getElementArrayLength(menuButtonsArr);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuPage.root);
        waitForElDisplayed(menuPage.title);
    }, 1);

    describe('check all buttons functionality', () => {
        it('should be clickable', () => {
            for (let i = 0; i < buttonsArrLength; i++) {
                expect(isElementClickable(menuButtonsArr, i)).toBe(true, `Button with index ${i} is not clickable`);
            }
        });

        it('should open menu when user clicks the button and close menu on 2nd click', () => {
            for (let i = 0; i < buttonsArrLength - 1; i++) {
                click(menuButtonsArr, i);
                expect(elementDisplayed(menuItems)).toBe(true, `Menu with index ${i} is not displayed`);
                click(menuButtonsArr, i);
                expect(doesItExist(menuItems)).toBe(false, `Menu with index ${i} is displayed`);
            }
        });

        it('should check items in all drop downs', () => {
            for (let i = 0; i < buttonsArrLength - 1; i++) {
                click(menuButtonsArr, i);
                const menuItemsArrLength = getElementArrayLength(menuItems);
                expect(menuItemsArrLength).not.toBe(0, `Menu with index ${i} does not have items`);
            }
        });
    });

    it('should check icons near items in drop down', () => {
        click(btnMenuWithIcons);
        const menuItemsArrLength = getElementArrayLength(menuItemsArr);
        for (let j = 0; j < menuItemsArrLength; j++) {
            expect(elementDisplayed(icons, j)).toBe(true, `item with index ${j} does not have icon`);
        }
    });

    describe('ability to navigate through menu items with tab and arrow keys', () => {
        it('should navigate through menu items when user uses arrow down and arrow up', () => {
            for (let i = 0; i < buttonsArrLength; i++) {
                click(menuButtonsArr, i);
                const menuItemsArrLength = getElementArrayLength(menuItemsArr);
                for (let j = 0; j < menuItemsArrLength - 1; j++) {
                    sendKeys('ArrowDown');
                    expect(emptyValuesArr).not.toContain(getCSSPropertyByName(menuItemsArr, 'outline-style', j + 1));
                }

                for (let g = menuItemsArrLength - 1; g > 0; g--) {
                    sendKeys('ArrowUp');
                    expect(emptyValuesArr).not.toContain(getCSSPropertyByName(menuItemsArr, 'outline-style', g - 1));
                }
            }
        });

        it('should navigate through menu items when user uses the tab key', () => {
            for (let i = 0; i < buttonsArrLength; i++) {
                click(menuButtonsArr, i);
                const menuItemsArrLength = getElementArrayLength(menuItemsArr);
                for (let j = 0; j < menuItemsArrLength - 1; j++) {
                    sendKeys('Tab');
                    expect(emptyValuesArr).not.toContain(getCSSPropertyByName(menuItemsArr, 'outline-style', j + 1));
                }
            }
        });
    });

    it('should show active path on the "menu with submenu"', () => {
        // skip due to hoverElemenet does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        click(btnWithSubmenu);
        let menuItemsArrLength = getElementArrayLength(submenuItems);
        for (let i = 0; i < menuItemsArrLength; i++) {
            mouseHoverElement(submenuItems, i);
            const textItem = getText(submenuItems, i);
            const activePath = getTextArr(submenuActivePath);
            const booleanExp = activePath.some((el) => el.trim() === textItem);
            menuItemsArrLength = getElementArrayLength(submenuItems);
            expect(booleanExp).toBe(true, `Active path mismatch with ${textItem} with index ${i}`);
        }
    });

    describe('check dialog popup Mobile Menu example', () => {
        it('should open and close dialog popup Mobile Menu', () => {
            click(btnMobileMenu);
            waitForElDisplayed(dialogMobileMenu);
            expect(elementDisplayed(dialogMobileMenu)).toBe(true);
            click(closeDialogMobileMenu);
            expect(doesItExist(dialogMobileMenu)).toBe(false);
        });

        it('should check cascading menu for all dialog popup buttons', () => {
            click(btnMobileMenu);
            const dialogMenuItemsArrLength = getElementArrayLength(dialogMenuItemsArr);
            checkDialogCascadingMenu(dialogMenuItemsArr, dialogMenuAddonArr, dialogBtnBack, dialogMenuItemsArrLength);
        });
    });

    xit('should check visual regression for all examples', () => {
        menuPage.saveExampleBaselineScreenshot();
        expect(menuPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check RTL and LTR orientation', () => {
        menuPage.checkRtlSwitch();
    });

    function checkDialogCascadingMenu(
        selector: string,
        btnSelector: string,
        btnBackSelector: string,
        previousLength: number
    ): void {
        for (let i = 0; i < previousLength; i++) {
            const btnTxt = getText(selector, i);
            click(btnSelector, i);
            const length = getElementArrayLength(selector);
            const title = getText(dialogMenuTitle);
            expect(btnTxt).toBe(title, `Pop up title doesn't match title of the selected element ${btnTxt}-${i}`);
            if (doesItExist(dialogMenuAddonArr)) {
                checkDialogCascadingMenu(selector, btnSelector, btnBackSelector, length);
            }
            click(dialogBtnBack);
        }
    }
});
