import { MenuButtonPo } from './menu-button.po';
import {
    compactClass,
    cozyAndCompactBtnTextArr,
    disabledState,
    selectedItem,
    tooltipAttr,
    truncatedBtnNoIconTooltipText,
    truncatedBtnText,
    truncatedBtnTooltipText
} from './menu-button-contents';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Menu button test suite', () => {
    const menuBtnPage = new MenuButtonPo();
    const {
        btnArrowIconsArr,
        btnWorldIconArr,
        cozyBtnAttrArr,
        cozyBtnArr,
        cozySelectedItemLabel,
        menuItemArr,
        menuItemOverlay,
        compactBtnAttrArr,
        compactBtnArr,
        sectionTitle,
        menuTypeBtnArr
    } = menuBtnPage;

    beforeAll(() => {
        menuBtnPage.open();
        waitForPresent(menuBtnPage.root);
        waitForElDisplayed(menuBtnPage.title);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(menuBtnPage.root);
        waitForElDisplayed(menuBtnPage.title);
    }, 1);

    describe('Check general menu button states', () => {
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
            click(cozyBtnArr);
            click(cozyBtnArr);
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

    describe('Check cozy and compact menu button states', () => {
        it('should check btn states', () => {
            const cozyBtnCount = getElementArrayLength(cozyBtnAttrArr);
            const compactBtnCount = getElementArrayLength(compactBtnAttrArr);

            for (let i = 0; cozyBtnCount > i; i++) {
                expect(getAttributeByName(cozyBtnArr, 'aria-disabled', i)).toBe('false');
            }

            for (let j = 0; compactBtnCount > j; j++) {
                expect(getAttributeByName(compactBtnArr, 'aria-disabled', j)).toBe('false');
            }

            for (let k = 0; cozyBtnCount + compactBtnCount > k; k++) {
                expect(isElementDisplayed(btnWorldIconArr, k)).toBe(true);
            }
        });

        it('should check cozy btn text', () => {
            const cozyBtnTextArrLength = getElementArrayLength(cozyBtnAttrArr);

            for (let i = 0; cozyBtnTextArrLength > i; i++) {
                expect(getText(cozyBtnAttrArr, i).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }
        });

        it('should check compact btn text', () => {
            const compactBtnTextArrLength = getElementArrayLength(compactBtnAttrArr);
            const compactBtnArrLength = getElementArrayLength(compactBtnArr);

            for (let i = 0; compactBtnTextArrLength > i; i++) {
                expect(getText(compactBtnAttrArr, i).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; compactBtnArrLength > j; j++) {
                expect(getElementClass(compactBtnArr, j)).toContain(compactClass);
            }
        });
    });

    describe('Check types of menu buttons', () => {
        it('should check disabled buttons', () => {
            for (let i = 0; 5 > i; i++) {
                expect(getAttributeByName(menuTypeBtnArr, disabledState, i)).toEqual('true');
            }
        });

        it('should check long text menu btn with and without icon', () => {
            expect(getText(menuTypeBtnArr, 11).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuTypeBtnArr, tooltipAttr, 11)).toContain(truncatedBtnTooltipText);
            expect(getText(menuTypeBtnArr, 12).trim()).toEqual(truncatedBtnText);
            expect(getAttributeByName(menuTypeBtnArr, tooltipAttr, 12)).toBe(truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', () => {
        it('should check LTR/RTL orientation', () => {
            menuBtnPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            menuBtnPage.saveExampleBaselineScreenshot();
            expect(menuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
