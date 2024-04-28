import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    disabledState,
    selectedItem,
    tooltipAttr,
    truncatedBtnNoIconTooltipText,
    truncatedBtnText,
    truncatedBtnTooltipText
} from './menu-button-contents';
import { MenuButtonPo } from './menu-button.po';

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
        sectionTitle,
        menuTypeBtnArr
    } = menuBtnPage;

    beforeAll(async () => {
        await menuBtnPage.open();
        await menuBtnPage.waitForRoot();
        await waitForElDisplayed(menuBtnPage.title);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await menuBtnPage.waitForRoot();
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
});
