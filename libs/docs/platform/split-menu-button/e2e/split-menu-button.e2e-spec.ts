import { SplitMenuButtonPo } from './split-menu-button.po';
import {
    behaviorBtnTextArr,
    compactButtonClass,
    iconAttr,
    iconBtnTextArr,
    iconLabel,
    standardBtnText,
    standardBtnText2,
    typesBtnTextArr
} from './split-menu-button-page-contents';
import {
    acceptAlert,
    browserIsIEorSafari,
    click,
    elementArray,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getElementTitle,
    refreshPage,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

declare const $$: any;

describe('Split menu button test suite', () => {
    const spMenuBtnPage = new SplitMenuButtonPo();
    const {
        arrowBtnArr,
        mainBtnArr,
        menuOverlay,
        menuItemArr,
        behaviorsExSelectionBtnArr,
        behaviorsExArrowBtnArr,
        typesExSelectionBtnArr,
        typesExArrowBtnArr,
        typesOutput,
        iconExSelectionBtnArr,
        iconExArrowBtnArr,
        iconBtnAttrArr
    } = spMenuBtnPage;

    beforeAll(async () => {
        await spMenuBtnPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(spMenuBtnPage.root);
        await waitForElDisplayed(spMenuBtnPage.title);
    }, 1);

    // Wasn't debuged yet in IE and Safari
    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
        return;
    }

    it('should check drop-down arrow menu functionality', async () => {
        const dropdownArrowBtnArr = await getElementArrayLength(arrowBtnArr);

        // -1 for last disabled button. on disabled button click, click will be intercepted.
        for (let i = 0; i < dropdownArrowBtnArr - 1; i++) {
            await click(arrowBtnArr, i);
            expect(await waitForElDisplayed(menuOverlay));
            await click(arrowBtnArr, i);
        }
    });

    it('should check each split btn has main and arrow btns', async () => {
        const dropdownArrowBtnCount = await getElementArrayLength(arrowBtnArr);
        const mainBtnCount = await getElementArrayLength(mainBtnArr);

        await expect(dropdownArrowBtnCount).toEqual(mainBtnCount);
    });

    it('should check that menu closed after making one selection', async () => {
        await click(behaviorsExArrowBtnArr);
        await waitForElDisplayed(menuOverlay);

        await click(behaviorsExArrowBtnArr);
        await waitForNotDisplayed(menuOverlay);
    });

    it('should check split menu button behaviors examples', async () => {
        const behaviorArrowBtnArr = await elementArray(behaviorsExArrowBtnArr);
        await spMenuBtnPage.checkBtnSelectionChange(
            behaviorArrowBtnArr,
            behaviorsExSelectionBtnArr,
            behaviorBtnTextArr
        );
    });

    it('should check split menu button type examples', async () => {
        const typesArrowBtnArr = await elementArray(typesExArrowBtnArr);

        await spMenuBtnPage.checkBtnSelectionChange(typesArrowBtnArr, typesExSelectionBtnArr, typesBtnTextArr);
    });

    it('should check btn selections', async () => {
        await click(typesExSelectionBtnArr);
        await acceptAlert();
        await spMenuBtnPage.checkSelectionOutput(typesOutput, standardBtnText);

        await click(typesExArrowBtnArr);
        await click(menuItemArr, 1);
        await spMenuBtnPage.checkSelectionOutput(typesOutput, standardBtnText2);
    });

    it('should check split menu buttons with icon examples', async () => {
        const iconArrowBtnArr = await elementArray(iconExArrowBtnArr);
        const iconBtnArr = await elementArray(iconBtnAttrArr);

        // last button is disabled
        iconArrowBtnArr.splice(-1, 1);
        iconBtnArr.splice(-1, 1);

        await spMenuBtnPage.checkBtnSelectionChange(iconArrowBtnArr, iconExSelectionBtnArr, iconBtnTextArr);
        for (let i = 0; i < iconBtnArr.length; i++) {
            await expect(await getAttributeByName(iconBtnAttrArr, iconAttr, i)).toContain(iconLabel);
        }
    });

    it('should check compact btn styles', async () => {
        const compactButtons = await $$(`${iconBtnAttrArr}[fdCompact] ${compactButtonClass}`);
        await expect(compactButtons.length).toBe(2);
    });

    it('should check tooltips', async () => {
        const menuBtnArr = await elementArray(mainBtnArr);

        for (let i = 0; i < menuBtnArr.length; i++) {
            await expect(await getElementTitle(mainBtnArr, i)).not.toEqual('');
        }
    });

    it('should check RTL orientation', async () => {
        await spMenuBtnPage.checkRtlSwitch();
    });

    it('should check menu item density matches button density', async () => {
        const compactButtonHeight = await (await getElementSize(iconExArrowBtnArr, 1)).height;
        const cozyButtonHeight = await (await getElementSize(iconExArrowBtnArr, 0)).height;

        await click(iconExArrowBtnArr);
        const cozyMenuItemHeight = await (await getElementSize(menuItemArr, 0)).height;

        await click(iconExArrowBtnArr);
        await click(iconExArrowBtnArr, 1);
        const compactMenuItemHeight = await (await getElementSize(menuItemArr, 0)).height;

        await expect(compactButtonHeight).toBeLessThan(cozyButtonHeight);
        await expect(compactMenuItemHeight).toBeLessThan(cozyMenuItemHeight);
    });

    it('should check changing width of split-button after selecting item', async () => {
        const defaultMenuWidth = await (await getElementSize(iconBtnAttrArr, 2)).width;
        await click(iconExArrowBtnArr, 2);
        await click(menuItemArr, 1);
        const menuWidthAfterSelection = await (await getElementSize(iconBtnAttrArr, 2)).width;
        await expect(menuWidthAfterSelection).toBeGreaterThan(defaultMenuWidth);
        await click(iconExArrowBtnArr, 2);
        await click(menuItemArr);
        await expect(await (await getElementSize(iconBtnAttrArr, 2)).width).toBeLessThan(menuWidthAfterSelection);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await spMenuBtnPage.saveExampleBaselineScreenshot();
            await expect(await spMenuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
