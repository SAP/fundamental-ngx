import { MenuButtonPo } from '../pages/menu-button.po';
import {
    compactAttr,
    cozyAndCompactBtnTextArr,
    disabledState,
    icon,
    iconAttr,
    selectedItem,
    tooltipAttr,
    truncatedBtnNoIconTooltipText,
    truncatedBtnText,
    truncatedBtnTooltipText
} from '../fixtures/appData/menu-button-contents';
import {
    browserIsIE,
    browserIsIEorSafari,
    click,
    doubleClick,
    getAttributeByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Menu button test suite', function() {
    const menuBtnPage = new MenuButtonPo();
    const {
        btnArrowIconsArr, btnWorldIconArr, cozyBtnAttrArr, cozyBtnArr, cozySelectedItemLabel, menuItemArr,
        menuItemOverlay, compactBtnAttrArr, compactBtnArr, sectionTitle, menuTypeBtnAttrArr, menuTypeBtnArr
    } = menuBtnPage;

    beforeAll(() => {
        menuBtnPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(btnArrowIconsArr);
    }, 1);

    describe('Check general menu button states', function() {
        it('should check that the arrow icon is present', () => {
            const arrayLength = getElementArrayLength(btnArrowIconsArr);

            for (let i = 0; arrayLength > i; i++) {
                expect(isElementDisplayed(btnArrowIconsArr, i)).toBe(true);
            }
        });

        it('should check selected menu option and close menu', () => {
            click(cozyBtnArr);
            click(menuItemArr);

            expect(getText(cozySelectedItemLabel)).toEqual(selectedItem);
            expect(isElementDisplayed(menuItemOverlay)).toBe(false);
        });

        it('should check menu items visible', () => {
            click(cozyBtnArr);
            expect(isElementDisplayed(menuItemOverlay)).toBe(true);
        });

        it('should check close menu by clicking menu btn', () => {
            doubleClick(cozyBtnArr);
            expect(isElementDisplayed(menuItemOverlay)).toBe(false);

        });

        it('should check closing menu when clicking outside of menu', () => {
            waitForPresent(cozyBtnArr);
            click(cozyBtnArr);
            waitForElDisplayed(menuItemOverlay);
            expect(isElementDisplayed(menuItemOverlay)).toBe(true);
            click(sectionTitle);
            expect(isElementDisplayed(menuItemOverlay)).toBe(false);
        });

    });

    describe('Check cozy and compact menu button states', function() {
        xit('should check btn states', () => {
            const cozyBtnAttributeArrLength = getElementArrayLength(cozyBtnAttrArr);
            const compactBtnAttributeArrLength = getElementArrayLength(compactBtnAttrArr);

            for (let i = 0; cozyBtnAttributeArrLength > i; i++) {
                expect(getAttributeByName(cozyBtnAttrArr, 'ng-reflect-disabled', i)).toBe('false');
            }

            for (let j = 0; compactBtnAttributeArrLength > j; j++) {
                expect(getAttributeByName(compactBtnAttrArr, 'ng-reflect-disabled', j)).toBe('false');
            }

            for (let k = 0; 13 > k; k++) {
                expect(isElementDisplayed(btnWorldIconArr, k)).toBe(true);
            }
        });

        it('should check cozy btn text', () => {
            const cozyBtnTextArrLength = getElementArrayLength(cozyBtnAttrArr);

            for (let i = 0; cozyBtnTextArrLength > i; i++) {
                expect(getText(cozyBtnAttrArr, i).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }
        });

        xit('should check compact btn text', () => {
            const compactBtnTextArrLength = getElementArrayLength(compactBtnAttrArr);
            const compactBtnArrLength = getElementArrayLength(compactBtnArr);

            for (let i = 0; compactBtnTextArrLength > i; i++) {
                expect(getText(compactBtnAttrArr, i).trim())
                    .toEqual(cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; compactBtnArrLength > j; j++) {
                expect(getAttributeByName(compactBtnArr, compactAttr)).toEqual('true');
            }
        });
    });

    xdescribe('Check types of menu buttons', function() {

        it('should check disabled buttons', () => {
            for (let i = 0; 5 > i; i++) {
                expect(getAttributeByName(menuTypeBtnAttrArr, disabledState, i)).toEqual('true');
            }
        });

        it('should check btn with and without icon', () => {
            waitForElDisplayed(menuTypeBtnArr, 0);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 5)).toBe(icon);
            expect(getText(menuTypeBtnArr, 5).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 6)).toBe(null);
            expect(getText(menuTypeBtnArr, 6).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 7)).toBe(icon);
            expect(getText(menuTypeBtnArr, 7).trim()).toBe('');
        });

        it('should check compact btn with and without icon', () => {
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 8)).toBe(icon);
            expect(getText(menuTypeBtnArr, 8).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 9)).toBe(null);
            expect(getText(menuTypeBtnArr, 9).trim()).toEqual(cozyAndCompactBtnTextArr[0]);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 10)).toBe(icon);
            expect(getText(menuTypeBtnArr, 10).trim()).toBe('');

            for (let i = 8; 11 > i; i++) {
                expect(getAttributeByName(menuTypeBtnArr, compactAttr, i)).toBe('true');
            }
        });

        it('should check long text menu btn with and without icon', () => {
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 11)).toContain(icon);
            expect(getText(menuTypeBtnArr, 11).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuTypeBtnArr, tooltipAttr, 11))
                .toContain(truncatedBtnTooltipText);
            expect(getAttributeByName(menuTypeBtnArr, iconAttr, 12)).toBe(null);
            expect(getText(menuTypeBtnArr, 12).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuTypeBtnArr, tooltipAttr, 12))
                .toBe(truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', function() {
        it('should check LTR/RTL orientation', () => {
            menuBtnPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            menuBtnPage.saveExampleBaselineScreenshot();
            expect(menuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
})
;
