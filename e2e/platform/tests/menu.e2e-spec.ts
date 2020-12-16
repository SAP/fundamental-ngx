import { MenuPo } from '../pages/menu.po';
import { browser, protractor } from 'protractor';
import MenuData from '../fixtures/appData/menu-contents'
import { clickTwice, getValueOfAttribute, hoverMouse } from '../../helper/helper';
import {
    check2ndLvlMenuItemsHvrState,
    check3rdLvlMenuItemsHvrState,
    checkMenuItemsActiveState,
    checkMenuItemsHoverState
} from '../../helper/assertion-helper';

describe('Menu component test suite', function() {
    const menuPage = new MenuPo();

    async function checkMenuItemText(element): Promise<any> {
        const menuItemTextArr = await element;

        await menuItemTextArr.forEach(async item => {
            await expect(await item.getText()).not.toBe(null);
        });
    }

    async function checkMenuItemFocus(element, property, expectation): Promise<any> {
        const menuItemTextArr = await element;
        await expect(await menuItemTextArr[0].getCssValue(property)).toEqual(expectation);
    }

    beforeAll(async () => {
        await menuPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

        it('should check menu btn styles', async () => {
            const basicMenuBtnArr = await menuPage.menuBtnArr;

            basicMenuBtnArr.forEach(async element => {
                await expect(await element.getCssValue(MenuData.borderColorAttribute)).toEqual(MenuData.menuBtnBorderColor);
            });

            basicMenuBtnArr.forEach(async element => {
                await hoverMouse(element).then( async () => {
                    await expect(await element.getCssValue(MenuData.bgColorAttribute)).toEqual(MenuData.menuBtnHoverColor);
                });
            });

            await menuPage.firstMenuBtn.sendKeys(protractor.Key.TAB).then( async () => {
                const menuBtnBorderStyle = await browser.executeScript(`return (window.getComputedStyle(document.querySelector(await '${menuPage.secondMenuBtn.locator().value}'), ":after").border)`);
                await expect(menuBtnBorderStyle).toContain(MenuData.menuBtnFocusStyle);
            });
        });

        it('should check avatar menu btn styles', async () => {

            await clickTwice(menuPage.menuAvatarBtn);
            await expect(await menuPage.menuAvatarBtn.getCssValue(MenuData.menuAvatarFocusAttr)).toEqual(MenuData.menuAvatarFocusColor);
            await expect(await getValueOfAttribute(menuPage.menuAvatarBtn, 'image')).not.toBe(null);

            // checks horizontal example.
            await clickTwice(menuPage.menuHorizontalAvatarBtn);
            // todo: fails because of issue #3734
            // await expect(await menuPage.menuHorizontalAvatarBtn.getCssValue(MenuData.menuAvatarFocusAttr)).toEqual(MenuData.menuAvatarFocusColor);
            await expect(await getValueOfAttribute(menuPage.menuHorizontalAvatarBtn, 'image')).not.toBe(null);

        });

        it('should check menu btn content', async () => {
            const iconMenuBtnIconsArr = await menuPage.iconMenuIconArr;
            const basicMenuBtnTextArr = await menuPage.menuBtnTextArr;

            basicMenuBtnTextArr.forEach(async element => {
                await expect(await element.getText()).not.toBe(null);
            });

            iconMenuBtnIconsArr.forEach(async element => {
                await expect(await element.isDisplayed()).toBe(true);
            });
        });

        it('should check menu btn active state', async () => {
            const basicMenuBtnArr = await menuPage.menuBtnArr;

            await basicMenuBtnArr.forEach(async element => {
                 await browser.actions().mouseDown(element).perform().then( async () => {
                     await expect(await element.getCssValue(MenuData.bgColorAttribute)).toEqual(MenuData.menuBtnActiveColor);
                     await browser.actions().mouseUp(element).perform();
                 });
            });
        });

        it('should check menu item styles', async () => {
            const basicMenuBtnArr = await menuPage.menuBtnArr;

            await basicMenuBtnArr[0].click();
            await checkMenuItemsHoverState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            await checkMenuItemText(menuPage.menuItemTextArr);
        });

        it('should check menu items active state', async () => {
            const basicMenuBtnArr = await menuPage.menuBtnArr;

            await basicMenuBtnArr[0].click();
            await checkMenuItemsActiveState(menuPage.menuItemArr, MenuData.bgColorAttribute, MenuData.menuBtnActiveColor);
        });

        it('should check menu item focus', async () => {
            const basicMenuBtnArr = await menuPage.menuBtnArr;

            await basicMenuBtnArr[0].click();
            await checkMenuItemFocus(menuPage.menuItemArr, MenuData.menuItemFocusStyleAttr, MenuData.menuItemFocusStyle);
        });

        it('should check cascading menu', async () => {
            await menuPage.cascadingMenuBtn.click();
            await checkMenuItemsHoverState(menuPage.cascadingMenuItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            await check2ndLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
                MenuData.bgColorAttribute, MenuData.menuItemHoverColor);
            await clickTwice(menuPage.cascadingMenuBtn);
            await check3rdLvlMenuItemsHvrState(menuPage.cascadingMenuItemsArr, menuPage.cascadingVegMenuItemsArr,
                menuPage.cascadingLettuceItemsArr, MenuData.bgColorAttribute, MenuData.menuItemHoverColor)
        });

        it('should check collapsed and expanded states', async () => {
            await menuPage.firstMenuBtn.click();
            await expect(await menuPage.menuItemOverlay.isDisplayed()).toBe(true);
            await menuPage.firstMenuBtn.click();
            await expect(await menuPage.menuItemOverlay.isDisplayed()).toBe(false);
        });

        it('should check LTR orientation', async () => {
            const areaContainersArray = await menuPage.exampleAreaContainersArr;

            areaContainersArray.forEach(element => {
                expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
        });
    });

        it('should check RTL orientation', async () => {
            await menuPage.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await menuPage.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
        });
    });
});
