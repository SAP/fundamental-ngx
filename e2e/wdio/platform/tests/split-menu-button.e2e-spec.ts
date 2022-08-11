import { SplitMenuButtonPo } from '../pages/split-menu-button.po';
import {
    behaviorBtnTextArr,
    iconAttr,
    iconBtnTextArr,
    iconLabel,
    standardBtnText,
    standardBtnText2,
    typesBtnTextArr,
    compactButtonClass
} from '../fixtures/appData/split-menu-button-page-contents';
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
} from '../../driver/wdio';

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

    beforeAll(() => {
        spMenuBtnPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(spMenuBtnPage.root);
        waitForElDisplayed(spMenuBtnPage.title);
    }, 1);

    // Wasn't debuged yet in IE and Safari
    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
        return;
    }

    it('should check drop-down arrow menu functionality', () => {
        const dropdownArrowBtnArr = getElementArrayLength(arrowBtnArr);

        // -1 for last disabled button. on disabled button click, click will be intercepted.
        for (let i = 0; i < dropdownArrowBtnArr - 1; i++) {
            click(arrowBtnArr, i);
            expect(waitForElDisplayed(menuOverlay));
            click(arrowBtnArr, i);
        }
    });

    it('should check each split btn has main and arrow btns', () => {
        const dropdownArrowBtnCount = getElementArrayLength(arrowBtnArr);
        const mainBtnCount = getElementArrayLength(mainBtnArr);

        expect(dropdownArrowBtnCount).toEqual(mainBtnCount);
    });

    it('should check that menu closed after making one selection', () => {
        click(behaviorsExArrowBtnArr);
        waitForElDisplayed(menuOverlay);

        click(behaviorsExArrowBtnArr);
        waitForNotDisplayed(menuOverlay);
    });

    it('should check split menu button behaviors examples', () => {
        const behaviorArrowBtnArr = elementArray(behaviorsExArrowBtnArr);
        spMenuBtnPage.checkBtnSelectionChange(behaviorArrowBtnArr, behaviorsExSelectionBtnArr, behaviorBtnTextArr);
    });

    it('should check split menu button type examples', () => {
        const typesArrowBtnArr = elementArray(typesExArrowBtnArr);

        spMenuBtnPage.checkBtnSelectionChange(typesArrowBtnArr, typesExSelectionBtnArr, typesBtnTextArr);
    });

    it('should check btn selections', () => {
        click(typesExSelectionBtnArr);
        acceptAlert();
        spMenuBtnPage.checkSelectionOutput(typesOutput, standardBtnText);

        click(typesExArrowBtnArr);
        click(menuItemArr, 1);
        spMenuBtnPage.checkSelectionOutput(typesOutput, standardBtnText2);
    });

    it('should check split menu buttons with icon examples', () => {
        const iconArrowBtnArr = elementArray(iconExArrowBtnArr);
        const iconBtnArr = elementArray(iconBtnAttrArr);

        // last button is disabled
        iconArrowBtnArr.splice(-1, 1);
        iconBtnArr.splice(-1, 1);

        spMenuBtnPage.checkBtnSelectionChange(iconArrowBtnArr, iconExSelectionBtnArr, iconBtnTextArr);
        for (let i = 0; i < iconBtnArr.length; i++) {
            expect(getAttributeByName(iconBtnAttrArr, iconAttr, i)).toContain(iconLabel);
        }
    });

    it('should check compact btn styles', async () => {
        const compactButtons = await $$(`${iconBtnAttrArr}[fdCompact] ${compactButtonClass}`);
        expect(compactButtons.length).toBe(2);
    });

    it('should check tooltips', () => {
        const menuBtnArr = elementArray(mainBtnArr);

        for (let i = 0; i < menuBtnArr.length; i++) {
            expect(getElementTitle(mainBtnArr, i)).not.toEqual(null);
        }
    });

    it('should check RTL orientation', () => {
        spMenuBtnPage.checkRtlSwitch();
    });

    it('should check menu item density matches button density', () => {
        const compactButtonHeight = getElementSize(iconExArrowBtnArr, 1, 'height');
        const cozyButtonHeight = getElementSize(iconExArrowBtnArr, 0, 'height');

        click(iconExArrowBtnArr);
        const cozyMenuItemHeight = getElementSize(menuItemArr, 0, 'height');

        click(iconExArrowBtnArr);
        click(iconExArrowBtnArr, 1);
        const compactMenuItemHeight = getElementSize(menuItemArr, 0, 'height');

        expect(compactButtonHeight).toBeLessThan(cozyButtonHeight);
        expect(compactMenuItemHeight).toBeLessThan(cozyMenuItemHeight);
    });

    it('should check changing width of split-button after selecting item', () => {
        const defaultMenuWidth = getElementSize(iconBtnAttrArr, 2, 'width');
        click(iconExArrowBtnArr, 2);
        click(menuItemArr, 1);
        const menuWidthAfterSelection = getElementSize(iconBtnAttrArr, 2, 'width');
        expect(menuWidthAfterSelection).toBeGreaterThan(defaultMenuWidth);
        click(iconExArrowBtnArr, 2);
        click(menuItemArr);
        expect(getElementSize(iconBtnAttrArr, 2, 'width')).toBeLessThan(menuWidthAfterSelection);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            spMenuBtnPage.saveExampleBaselineScreenshot();
            expect(spMenuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
