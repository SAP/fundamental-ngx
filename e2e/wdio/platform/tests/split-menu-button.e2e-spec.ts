import { SplitMenuButtonPo } from '../pages/split-menu-button.po';
import {
    behaviorBtnTextArr,
    bgColorAttr,
    compactAttr,
    compactValue,
    defaultHvrColor,
    iconAttr,
    iconBtnTextArr,
    iconLabel,
    standardBtnText,
    standardBtnText2,
    textColorAttr,
    typesBtnColorArr,
    typesBtnHvrColorArr,
    typesBtnTextArr
} from '../fixtures/appData/split-menu-button-page-contents';
import {
    browserIsIEorSafari,
    click,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength, getElementTitle,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Split menu button test suite', () => {
    const spMenuBtnPage = new SplitMenuButtonPo();
    const {
        arrowBtnArr, mainBtnArr, menuOverlay, menuItemArr, behaviorsExSelectionBtnArr, behaviorsExArrowBtnArr,
        typesExSelectionBtnArr, typesExArrowBtnArr, typesOutput, iconExSelectionBtnArr, iconExArrowBtnArr, iconBtnAttrArr
    } = spMenuBtnPage;

    beforeAll(() => {
        spMenuBtnPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(arrowBtnArr);
    }, 1);

    // Wasn't debuged yet in IE and Safari
    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
        return;
    }

    it('should check drop-down arrow menu functionality', () => {
        const dropdownArrowBtnArr = getElementArrayLength(arrowBtnArr);

        // -1 for last disabled button. on disabled button click, click will be intercepted.
        for (let i = 0; i < dropdownArrowBtnArr -1; i++) {
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

    it('should check compact btn styles', () => {
        expect(getAttributeByName(iconBtnAttrArr, compactAttr, 1)).toContain(compactValue);
    });

    it('should check default hover state', () => {
        const behaviorBtnArr = elementArray(behaviorsExSelectionBtnArr);
        const behaviorArrowBtnArr = elementArray(behaviorsExArrowBtnArr);

        for (let i = 0; i < behaviorBtnArr.length; i++) {
            scrollIntoView(behaviorsExSelectionBtnArr, i);
            mouseHoverElement(behaviorsExSelectionBtnArr, i);
            expect(getCSSPropertyByName(behaviorsExSelectionBtnArr, bgColorAttr, i).value)
                .toContain(defaultHvrColor);
        }

        for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
            scrollIntoView(behaviorsExArrowBtnArr, i);
            mouseHoverElement(behaviorsExArrowBtnArr, i);
            expect(getCSSPropertyByName(behaviorsExArrowBtnArr, bgColorAttr, i).value)
                .toContain(defaultHvrColor);
        }
    });

    xit('should check default active state', () => {
        // const behaviorBtnArr = elementArray(behaviorsExSelectionBtnArr);
        // const behaviorArrowBtnArr = elementArray(behaviorsExArrowBtnArr);
        //
        // for (let i = 0; i < behaviorBtnArr.length; i++) {
        //     mouseHoverElement(behaviorsExSelectionBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(behaviorsExSelectionBtnArr, bgColorAttr, i).value)
        //         .toContain(defaultBtnColor);
        //     mouseButtonUp();
        // }
        //
        // for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
        //     mouseHoverElement(behaviorsExArrowBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(behaviorsExArrowBtnArr, bgColorAttr, i).value)
        //         .toContain(defaultBtnColor);
        //     mouseButtonUp();
        // }
    });

    it('should check split btn types example colors', () => {
        const typesBtnArr = elementArray(typesExSelectionBtnArr);
        const typesArrowBtnArr = elementArray(typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            expect(getCSSPropertyByName(typesExSelectionBtnArr, textColorAttr, i).value)
                .toContain(typesBtnColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            expect(getCSSPropertyByName(typesExArrowBtnArr, textColorAttr, i).value)
                .toContain(typesBtnColorArr[i]);
        }
    });

    xit('should check split btn type examples hover colors', () => {
        const typesBtnArr = elementArray(typesExSelectionBtnArr);
        const typesArrowBtnArr = elementArray(typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            scrollIntoView(typesExSelectionBtnArr, i);
            mouseHoverElement(typesExSelectionBtnArr, i);
            expect(getCSSPropertyByName(typesExSelectionBtnArr, bgColorAttr, i).value)
                .toContain(typesBtnHvrColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            scrollIntoView(typesExArrowBtnArr, i);
            mouseHoverElement(typesExArrowBtnArr, i);
            expect(getCSSPropertyByName(typesExArrowBtnArr, bgColorAttr, i).value)
                .toContain(typesBtnHvrColorArr[i]);
        }
    });

    xit('should check split btn type examples active state', () => {
        // const typesBtnArr = elementArray(typesExSelectionBtnArr);
        // const typesArrowBtnArr = elementArray(typesExArrowBtnArr);
        //
        // for (let i = 0; i < typesBtnArr.length; i++) {
        //     mouseHoverElement(typesExSelectionBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(typesExSelectionBtnArr, bgColorAttr, i).value)
        //         .toContain(typesBtnActiveColorArr[i]);
        //     mouseButtonUp();
        // }
        //
        // for (let i = 0; i < typesArrowBtnArr.length; i++) {
        //     mouseHoverElement(typesExArrowBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(typesExArrowBtnArr, bgColorAttr, i).value)
        //         .toContain(typesBtnActiveColorArr[i]);
        //     mouseButtonUp();
        // }

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

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            spMenuBtnPage.saveExampleBaselineScreenshot();
            expect(spMenuBtnPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

