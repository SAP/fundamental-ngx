import { MenuButtonPo } from '../pages/menu-button.po';
import { browser } from 'protractor';
import { clickTwice, getValueOfAttribute } from '../helper/helper';
import MenuBtnData from '../fixtures/appData/menu-button-contents';

describe('Menu button test suite', function() {
    const menuBtnPage = new MenuButtonPo();

    beforeAll(async () => {
        await menuBtnPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('Check general menu button states', function() {
        it('should check that the arrow icon is present', async () => {
            const dropDownArrowArr = await menuBtnPage.btnArrowIconsArr;

            dropDownArrowArr.forEach(async element => {
                await expect(await element.isDisplayed()).toBe(true);
            });
        });

        it('should check selected menu option and close menu', async () => {
            const cozyBtnArr = await menuBtnPage.cozyBtnArr;

            await cozyBtnArr[0].click().then( async() => {
                const menuItemsArr = await menuBtnPage.menuItemArr;

                await menuItemsArr[0].click();
            });
            await expect(await menuBtnPage.cozySelectedItemLabel.getText()).toEqual(MenuBtnData.selectedItem);
            await expect(await menuBtnPage.menuItemOverlay.isDisplayed()).toBe(false);
        });

        it('should check menu items visible', async () => {
            const cozyBtnArr = await menuBtnPage.cozyBtnArr;

            await cozyBtnArr[0].click();
            await expect(await menuBtnPage.menuItemOverlay.isDisplayed()).toBe(true);
        });

        it('should check close menu by clicking menu btn', async () => {
            const cozyBtnArr = await menuBtnPage.cozyBtnArr;

            await clickTwice(cozyBtnArr[0]);
            await expect(await menuBtnPage.menuItemOverlay.isDisplayed()).toBe(false);
        });

        it('should check closing menu when clicking outside of menu', async () => {
            const cozyBtnArr = await menuBtnPage.cozyBtnArr;

            await cozyBtnArr[0].click();
            await expect(await menuBtnPage.menuItemOverlay.isDisplayed()).toBe(true);
            await menuBtnPage.sectionTitle.click();
            await expect(await menuBtnPage.menuItemOverlay.isDisplayed()).toBe(false);
        });
    });

    describe('Check cozy and compact menu button states', function() {
        it('should check btn states', async () => {
            const cozyBtnAttributeArr = await menuBtnPage.cozyBtnAttrArr;
            const compactBtnAttributeArr = await menuBtnPage.compactBtnAttrArr;
            const cozyAndCompactBtnAttrArr = await cozyBtnAttributeArr.concat(compactBtnAttributeArr);
            const cozyAndCompactBtnIconArr = await (await menuBtnPage.btnWorldIconArr).slice(0, 14);

            cozyAndCompactBtnAttrArr.forEach(async element => {
                await expect(await getValueOfAttribute(element, MenuBtnData.disabledState)).toBe('false');
            });
            cozyAndCompactBtnIconArr.forEach((async element => {
                await expect(await element.isDisplayed()).toBe(true);
            }));
        });

        it('should check cozy btn text and colors', async () => {
            const cozyBtnTextArr = await menuBtnPage.cozyBtnAttrArr;
            const cozyBtnArr = await menuBtnPage.cozyBtnArr;

            cozyBtnTextArr.forEach(async (element, index) => {
                await expect(element.getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[index]);
            });
            cozyBtnArr.forEach(async (element, index) => {
                await expect(await element.getCssValue(MenuBtnData.textColorAttr))
                    .toEqual(MenuBtnData.cozyAndCompactBtnColorArr[index]);
            });
            cozyBtnArr.forEach(async element => {
                await expect(await element.getCssValue(MenuBtnData.textAlignmentAttr)).toEqual(MenuBtnData.alignmentCenter);
            });
        });

        it('should check compact btn text and colors', async () => {
            const compactBtnTextArr = await menuBtnPage.compactBtnAttrArr;
            const compactBtnArr = await menuBtnPage.compactBtnArr;

            compactBtnTextArr.forEach(async (element, index) => {
                await expect(element.getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[index]);
            });
            compactBtnArr.forEach(async (element, index) => {
                await expect(await element.getCssValue(MenuBtnData.textColorAttr))
                    .toEqual(MenuBtnData.cozyAndCompactBtnColorArr[index]);
            });
            compactBtnArr.forEach(async element => {
                await expect(await element.getCssValue(MenuBtnData.textAlignmentAttr)).toEqual(MenuBtnData.alignmentCenter);
            });
            compactBtnArr.forEach(async element => {
               await expect(await getValueOfAttribute(element, MenuBtnData.compactAttr)).toEqual('true');
            });
        });
    });

    describe('Check types of menu buttons', function() {

        it('should check disabled buttons', async () => {
            const disabledBtnArr = await (await menuBtnPage.menuTypeBtnAttrArr).slice(0, 6);

            disabledBtnArr.forEach(async (element, index) => {
                // https://github.com/SAP/fundamental-ngx/issues/3757 first btn is enabled, remove if statement after fix
                if (index !== 0) {
                await expect(await getValueOfAttribute(element, MenuBtnData.disabledState)).toEqual('true');
                }
            });
        });

        it('should check btn with and without icon', async () => {
            const menuBtnArr = await (await menuBtnPage.menuTypeBtnArr).slice(6, 9);

            await expect(await getValueOfAttribute(menuBtnArr[0], MenuBtnData.iconAttr)).toBe(MenuBtnData.icon);
            await expect(await menuBtnArr[0].getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            await expect(await getValueOfAttribute(menuBtnArr[1], MenuBtnData.iconAttr)).toBe(null);
            await expect(await menuBtnArr[1].getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            await expect(await getValueOfAttribute(menuBtnArr[2], MenuBtnData.iconAttr)).toBe(MenuBtnData.icon);
            await expect(await menuBtnArr[2].getText()).toBe('');
        });

        it('should check compact btn with and without icon', async () => {
            const menuBtnArr = await (await menuBtnPage.menuTypeBtnArr).slice(9, 12);

            await expect(await getValueOfAttribute(menuBtnArr[0], MenuBtnData.iconAttr)).toBe(MenuBtnData.icon);
            await expect(await menuBtnArr[0].getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            await expect(await getValueOfAttribute(menuBtnArr[1], MenuBtnData.iconAttr)).toBe(null);
            await expect(await menuBtnArr[1].getText()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            await expect(await getValueOfAttribute(menuBtnArr[2], MenuBtnData.iconAttr)).toBe(MenuBtnData.icon);
            await expect(await menuBtnArr[2].getText()).toBe('');

            menuBtnArr.forEach(async element => {
                await expect(await getValueOfAttribute(element, MenuBtnData.compactAttr)).toBe('true');
            });
        });

        it('should check long text menu btn with and without icon', async () => {
            const menuBtnArr = await (await menuBtnPage.menuTypeBtnArr).slice(12, 14);

            await expect(await getValueOfAttribute(menuBtnArr[0], MenuBtnData.iconAttr)).toBe(MenuBtnData.icon);
            await expect(await menuBtnArr[0].getText()).toEqual(MenuBtnData.truncatedBtnText);
            await expect(await getValueOfAttribute(menuBtnArr[0], MenuBtnData.tooltipAttr)).toBe(MenuBtnData.truncatedBtnTooltipText);
            await expect(await getValueOfAttribute(menuBtnArr[1], MenuBtnData.iconAttr)).toBe(null);
            await expect(await menuBtnArr[1].getText()).toEqual(MenuBtnData.truncatedBtnText);
            await expect(await getValueOfAttribute(menuBtnArr[1], MenuBtnData.tooltipAttr)).toBe(MenuBtnData.truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', function() {
        it('should check LTR orientation', async () => {
            const areaContainersArray = await menuBtnPage.exampleAreaContainersArr;

            areaContainersArray.forEach(async element => {
                expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
            });
        });

        it('should check RTL orientation', async () => {
            await menuBtnPage.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await menuBtnPage.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
            });
        });
    });
});
