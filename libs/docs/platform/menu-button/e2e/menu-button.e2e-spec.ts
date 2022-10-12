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

    beforeAll(async () => {
        await menuBtnPage.open();
        await waitForPresent(menuBtnPage.root);
        await waitForElDisplayed(menuBtnPage.title);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(menuBtnPage.root);
        await waitForElDisplayed(menuBtnPage.title);
    }, 1);

    describe('Check general menu button states', () => {
        it('should check that the arrow icon is present', async () => {
            const arrayLength = await getElementArrayLength(btnArrowIconsArr);

            for (let i = 0; arrayLength > i; i++) {
                await expect(await isElementDisplayed(btnArrowIconsArr, i)).toBe(true);
            }
        });

        it('should check selected menu option and close menu', async () => {
            await click(cozyBtnArr);
            await click(menuItemArr);

            await expect(await getText(cozySelectedItemLabel)).toEqual(selectedItem);
            await expect(await isElementDisplayed(menuItemOverlay)).toBe(false);
        });

        it('should check menu items visible', async () => {
            await click(cozyBtnArr);
            await expect(await isElementDisplayed(menuItemOverlay)).toBe(true);
        });

        it('should check close menu by clicking menu btn', async () => {
            await click(cozyBtnArr);
            await click(cozyBtnArr);
            await expect(await isElementDisplayed(menuItemOverlay)).toBe(false);
        });

        it('should check closing menu when clicking outside of menu', async () => {
            await waitForPresent(cozyBtnArr);
            await click(cozyBtnArr);
            await waitForElDisplayed(menuItemOverlay);
            await expect(await isElementDisplayed(menuItemOverlay)).toBe(true);
            await click(sectionTitle);
            await expect(await isElementDisplayed(menuItemOverlay)).toBe(false);
        });
    });

    describe('Check cozy and compact menu button states', () => {
        it('should check btn states', async () => {
            const cozyBtnCount = await getElementArrayLength(cozyBtnAttrArr);
            const compactBtnCount = await getElementArrayLength(compactBtnAttrArr);

            for (let i = 0; cozyBtnCount > i; i++) {
                await expect(await getAttributeByName(cozyBtnArr, 'aria-disabled', i)).toBe('false');
            }

            for (let j = 0; compactBtnCount > j; j++) {
                await expect(await getAttributeByName(compactBtnArr, 'aria-disabled', j)).toBe('false');
            }

            for (let k = 0; cozyBtnCount + compactBtnCount > k; k++) {
                await expect(await isElementDisplayed(btnWorldIconArr, k)).toBe(true);
            }
        });

        it('should check cozy btn text', async () => {
            const cozyBtnTextArrLength = await getElementArrayLength(cozyBtnAttrArr);

            for (let i = 0; cozyBtnTextArrLength > i; i++) {
                await expect((await getText(cozyBtnAttrArr, i)).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }
        });

        it('should check compact btn text', async () => {
            const compactBtnTextArrLength = await getElementArrayLength(compactBtnAttrArr);
            const compactBtnArrLength = await getElementArrayLength(compactBtnArr);

            for (let i = 0; compactBtnTextArrLength > i; i++) {
                await expect((await getText(compactBtnAttrArr, i)).trim()).toEqual(cozyAndCompactBtnTextArr[i]);
            }

            for (let j = 0; compactBtnArrLength > j; j++) {
                await expect(await getElementClass(compactBtnArr, j)).toContain(compactClass);
            }
        });
    });

    describe('Check types of menu buttons', () => {
        it('should check disabled buttons', async () => {
            for (let i = 0; 5 > i; i++) {
                await expect(await getAttributeByName(menuTypeBtnArr, disabledState, i)).toEqual('true');
            }
        });

        it('should check long text menu btn with and without icon', async () => {
            await expect((await getText(menuTypeBtnArr, 11)).trim()).toEqual(truncatedBtnText);
            await expect(await getAttributeByName(menuTypeBtnArr, tooltipAttr, 11)).toContain(truncatedBtnTooltipText);
            await expect((await getText(menuTypeBtnArr, 12)).trim()).toEqual(truncatedBtnText);
            await expect(await getAttributeByName(menuTypeBtnArr, tooltipAttr, 12)).toBe(truncatedBtnNoIconTooltipText);
        });
    });

    describe('Check orientations', () => {
        it('should check LTR/RTL orientation', async () => {
            await menuBtnPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await menuBtnPage.saveExampleBaselineScreenshot();
            await expect(await menuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
