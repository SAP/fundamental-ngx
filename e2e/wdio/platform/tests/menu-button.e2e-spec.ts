import { MenuButtonPo } from '../pages/menu-button.po';
import MenuBtnData from '../fixtures/appData/menu-button-contents';
import { webDriver } from '../../driver/wdio';

describe('Menu button test suite', function() {
    const menuBtnPage = new MenuButtonPo();

    beforeEach(() => {
        menuBtnPage.open();
        webDriver.refreshPage();
        webDriver.waitForDisplayed(menuBtnPage.root);
    });

    describe('Check general menu button states', function() {
        it('should check that the arrow icon is present', () => {
            const arrayLength = webDriver.getElementArrayLength(menuBtnPage.btnArrowIconsArr);

            for (let i = 0; arrayLength > i; i++) {
                expect(webDriver.isElementDisplayed(menuBtnPage.btnArrowIconsArr, i)).toBe(true);
            }
        });

        it('should check selected menu option and close menu', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browser.capabilities.browserName === 'internet explorer' || 'Safari') {
                console.log('skip');
            } else {
                webDriver.click(menuBtnPage.cozyBtnArr);
                webDriver.click(menuBtnPage.menuItemArr);

                expect(webDriver.getText(menuBtnPage.cozySelectedItemLabel)).toEqual(MenuBtnData.selectedItem);
                expect(webDriver.isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);
            }
        });

        it('should check menu items visible', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.click(menuBtnPage.cozyBtnArr);
                expect(webDriver.isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(true);
            }
        });

        it('should check close menu by clicking menu btn', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {

                webDriver.doubleClick(menuBtnPage.cozyBtnArr);
                expect(webDriver.isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);
            }

        });

        it('should check closing menu when clicking outside of menu', () => {
            // skip for IE https://github.com/SAP/fundamental-ngx/issues/4058
            if (browser.capabilities.browserName === 'internet explorer') {
                console.log('skip');
            } else {
                webDriver.waitElementToBePresentInDOM(menuBtnPage.cozyBtnArr);
                webDriver.click(menuBtnPage.cozyBtnArr);
                webDriver.waitForDisplayed(menuBtnPage.menuItemOverlay);
                expect(webDriver.isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(true);
                webDriver.click(menuBtnPage.sectionTitle);
                expect(webDriver.isElementDisplayed(menuBtnPage.menuItemOverlay)).toBe(false);
            }
        });

    });

    describe('Check cozy and compact menu button states', function() {
        it('should check btn states', () => {
            const cozyBtnAttributeArrLength = webDriver.getElementArrayLength(menuBtnPage.cozyBtnAttrArr);
            const compactBtnAttributeArrLength = webDriver.getElementArrayLength(menuBtnPage.compactBtnAttrArr);

            for (let i = 0; cozyBtnAttributeArrLength > i; i++) {
                expect(webDriver.getAttributeByName(menuBtnPage.cozyBtnAttrArr, 'ng-reflect-disabled', i)).toBe('false');
            }

            for (let j = 0; compactBtnAttributeArrLength > j; j++) {
                expect(webDriver.getAttributeByName(menuBtnPage.compactBtnAttrArr, 'ng-reflect-disabled', j)).toBe('false');
            }

            for (let k = 0; 13 > k; k++) {
                expect(webDriver.isElementDisplayed(menuBtnPage.btnWorldIconArr, k)).toBe(true);
            }
        });

        it('should check cozy btn text and colors', () => {
            const cozyBtnTextArrLength = webDriver.getElementArrayLength(menuBtnPage.cozyBtnAttrArr);
            const cozyBtnArrLength = webDriver.getElementArrayLength(menuBtnPage.cozyBtnArr);

            for (let i = 0; cozyBtnTextArrLength > i; i++) {
                expect(webDriver.getText(menuBtnPage.cozyBtnAttrArr, i).trim()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; cozyBtnArrLength > j; j++) {
                expect(webDriver.getCSSPropertyByName(menuBtnPage.cozyBtnArr, MenuBtnData.textColorAttr, j).value)
                    .toContain(MenuBtnData.btnColorArr[j]);
                expect(webDriver.getCSSPropertyByName(menuBtnPage.cozyBtnArr, MenuBtnData.textAlignmentAttr, j).value)
                    .toEqual(MenuBtnData.alignmentCenter);
            }
        });

        it('should check compact btn text and colors', () => {
            const compactBtnTextArrLength = webDriver.getElementArrayLength(menuBtnPage.compactBtnAttrArr);
            const compactBtnArrLength = webDriver.getElementArrayLength(menuBtnPage.compactBtnArr);

            for (let i = 0; compactBtnTextArrLength > i; i++) {
                expect(webDriver.getText(menuBtnPage.compactBtnAttrArr, i).trim())
                    .toEqual(MenuBtnData.cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; compactBtnArrLength > j; j++) {
                expect(webDriver.getCSSPropertyByName(menuBtnPage.compactBtnArr, MenuBtnData.textColorAttr, j).value)
                    .toContain(MenuBtnData.btnColorArr[j]);
                expect(webDriver.getCSSPropertyByName(menuBtnPage.compactBtnArr, MenuBtnData.textAlignmentAttr, j).value)
                    .toEqual(MenuBtnData.alignmentCenter);
                expect(webDriver.getAttributeByName(menuBtnPage.compactBtnArr, MenuBtnData.compactAttr)).toEqual('true');
            }
        });
    });

    describe('Check types of menu buttons', function() {

        it('should check disabled buttons', () => {
            // https://github.com/SAP/fundamental-ngx/issues/3757 first btn is enabled, start from 0 after fix
            for (let i = 1; 6 > i; i++) {
                expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnAttrArr, MenuBtnData.disabledState, i)).toEqual('true');
            }
        });

        it('should check btn with and without icon', () => {
            webDriver.waitForDisplayed(menuBtnPage.menuTypeBtnArr, 0);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 6)).toBe(MenuBtnData.icon);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 6).trim()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 7)).toBe(null);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 7).trim()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 8)).toBe(MenuBtnData.icon);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 8).trim()).toBe('');
        });

        it('should check compact btn with and without icon', () => {
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 9)).toBe(MenuBtnData.icon);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 9).trim()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 10)).toBe(null);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 10).trim()).toEqual(MenuBtnData.cozyAndCompactBtnTextArr[0]);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 11)).toBe(MenuBtnData.icon);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 11).trim()).toBe('');

            for (let i = 9; 12 > i; i++) {
                expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.compactAttr, i)).toBe('true');
            }
        });

        it('should check long text menu btn with and without icon', () => {
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 12)).toContain(MenuBtnData.icon);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 12).trim()).toEqual(MenuBtnData.truncatedBtnText);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.tooltipAttr, 12))
                .toContain(MenuBtnData.truncatedBtnTooltipText);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.iconAttr, 13)).toBe(null);
            expect(webDriver.getText(menuBtnPage.menuTypeBtnArr, 13).trim()).toEqual(MenuBtnData.truncatedBtnText);
            expect(webDriver.getAttributeByName(menuBtnPage.menuTypeBtnArr, MenuBtnData.tooltipAttr, 13))
                .toBe(MenuBtnData.truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', function() {
        it('should check LTR orientation', () => {
            const areaContainersArrayLength = webDriver.getElementArrayLength(menuBtnPage.exampleAreaContainersArr);

            for (let i = 0; areaContainersArrayLength > i; i++) {
                expect(webDriver.getCSSPropertyByName(menuBtnPage.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            const arrL = webDriver.getElementArrayLength(menuBtnPage.exampleAreaContainersArr);

            for (let i = 0; arrL > i; i++) {
                webDriver.scrollIntoView(menuBtnPage.exampleAreaContainersArr, i);
                expect(webDriver.getCSSPropertyByName(menuBtnPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = webDriver.getAttributeByName(menuBtnPage.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                webDriver.click(menuBtnPage.rtlSwitcherArr, i);
                expect(webDriver.getCSSPropertyByName(menuBtnPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(webDriver.getAttributeByName(menuBtnPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            }
        });
    });
});
