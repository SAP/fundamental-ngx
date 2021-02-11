import { SplitMenuButtonPo } from '../pages/split-menu-button.po';
import {standardBtnText, iconAttr, textColorAttr, tooltipAttr, compactAttr, compactValue, bgColorAttr,
    typesBtnHvrColorArr, typesBtnColorArr, standardBtnText2, defaultHvrColor, iconLabel, behaviorBtnTextArr,
    iconBtnTextArr, typesBtnTextArr} from '../fixtures/appData/split-menu-button-page-contents';
import {
    browserIsIEorSafari,
    click,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForNotDisplayed, waitForPresent
} from '../../driver/wdio';

describe('Split menu button test suite', () => {
    const spMenuBtnPage = new SplitMenuButtonPo();

    beforeAll(() => {
        spMenuBtnPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(spMenuBtnPage.arrowBtnArr);
    }, 1);

    // Wasn't debuged yet in IE and Safari
    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
        return;
    }

    it('should check drop-down arrow menu functionality', () => {
        const dropdownArrowBtnArr = getElementArrayLength(spMenuBtnPage.arrowBtnArr);

        for (let i = 0; i < dropdownArrowBtnArr; i++) {
            click(spMenuBtnPage.arrowBtnArr, i);
            expect(waitForElDisplayed(spMenuBtnPage.menuOverlay));
            click(spMenuBtnPage.arrowBtnArr, i);
        }
    });

    it('should check each split btn has main and arrow btns', () => {
        const dropdownArrowBtnCount = getElementArrayLength(spMenuBtnPage.arrowBtnArr);
        const mainBtnCount = getElementArrayLength(spMenuBtnPage.mainBtnArr);

        expect(dropdownArrowBtnCount).toEqual(mainBtnCount);
    });

    it('should check that menu closed after making one selection', () => {
        click(spMenuBtnPage.behaviorsExArrowBtnArr);
        waitForElDisplayed(spMenuBtnPage.menuOverlay);

        click(spMenuBtnPage.behaviorsExArrowBtnArr);
        waitForNotDisplayed(spMenuBtnPage.menuOverlay);
    });

    it('should check split menu button behaviors examples', () => {
        const behaviorArrowBtnArr = elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);
        spMenuBtnPage.checkBtnSelectionChange(behaviorArrowBtnArr, spMenuBtnPage.behaviorsExSelectionBtnArr, behaviorBtnTextArr);
    });

    it('should check split menu button type examples', () => {
        const typesArrowBtnArr = elementArray(spMenuBtnPage.typesExArrowBtnArr);

        spMenuBtnPage.checkBtnSelectionChange(typesArrowBtnArr, spMenuBtnPage.typesExSelectionBtnArr, typesBtnTextArr);
    });

    it('should check btn selections', () => {
        click(spMenuBtnPage.typesExSelectionBtnArr);
        spMenuBtnPage.checkSelectionOutput(spMenuBtnPage.typesOutput, standardBtnText);

        click(spMenuBtnPage.typesExArrowBtnArr);
        click(spMenuBtnPage.menuItemArr, 1);
        spMenuBtnPage.checkSelectionOutput(spMenuBtnPage.typesOutput, standardBtnText2);
    });

    it('should check split menu buttons with icon examples', () => {
        const iconArrowBtnArr = elementArray(spMenuBtnPage.iconExArrowBtnArr);
        const iconBtnArr = elementArray(spMenuBtnPage.iconBtnAttrArr);

        spMenuBtnPage.checkBtnSelectionChange(iconArrowBtnArr, spMenuBtnPage.iconExSelectionBtnArr, iconBtnTextArr);
        for (let i = 0; i < iconBtnArr.length; i++) {
            expect(getAttributeByName(spMenuBtnPage.iconBtnAttrArr, iconAttr, i)).toContain(iconLabel);
        }
    });

    it('should check compact btn styles', () => {
        expect(getAttributeByName(spMenuBtnPage.iconBtnAttrArr, compactAttr, 1)).toContain(compactValue);
    });

    it('should check default hover state', () => {
        const behaviorBtnArr = elementArray(spMenuBtnPage.behaviorsExSelectionBtnArr);
        const behaviorArrowBtnArr = elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);

        for (let i = 0; i < behaviorBtnArr.length; i++) {
            scrollIntoView(spMenuBtnPage.behaviorsExSelectionBtnArr, i);
            mouseHoverElement(spMenuBtnPage.behaviorsExSelectionBtnArr, i);
            expect(getCSSPropertyByName(spMenuBtnPage.behaviorsExSelectionBtnArr, bgColorAttr, i).value)
                .toContain(defaultHvrColor);
        }

        for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
            scrollIntoView(spMenuBtnPage.behaviorsExArrowBtnArr, i);
            mouseHoverElement(spMenuBtnPage.behaviorsExArrowBtnArr, i);
            expect(getCSSPropertyByName(spMenuBtnPage.behaviorsExArrowBtnArr, bgColorAttr, i).value)
                .toContain(defaultHvrColor);
        }
    });

    xit('should check default active state', () => {
        // const behaviorBtnArr = elementArray(spMenuBtnPage.behaviorsExSelectionBtnArr);
        // const behaviorArrowBtnArr = elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);
        //
        // for (let i = 0; i < behaviorBtnArr.length; i++) {
        //     mouseHoverElement(spMenuBtnPage.behaviorsExSelectionBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(spMenuBtnPage.behaviorsExSelectionBtnArr, bgColorAttr, i).value)
        //         .toContain(defaultBtnColor);
        //     mouseButtonUp();
        // }
        //
        // for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
        //     mouseHoverElement(spMenuBtnPage.behaviorsExArrowBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(spMenuBtnPage.behaviorsExArrowBtnArr, bgColorAttr, i).value)
        //         .toContain(defaultBtnColor);
        //     mouseButtonUp();
        // }
    });

    it('should check split btn types example colors', () => {
        const typesBtnArr = elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        const typesArrowBtnArr = elementArray(spMenuBtnPage.typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            expect(getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, textColorAttr, i).value)
                .toContain(typesBtnColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            expect(getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, textColorAttr, i).value)
                .toContain(typesBtnColorArr[i]);
        }
    });

    it('should check split btn type examples hover colors', () => {
        const typesBtnArr = elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        const typesArrowBtnArr = elementArray(spMenuBtnPage.typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            scrollIntoView(spMenuBtnPage.typesExSelectionBtnArr, i);
            mouseHoverElement(spMenuBtnPage.typesExSelectionBtnArr, i);
            expect(getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, bgColorAttr, i).value)
                .toContain(typesBtnHvrColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            scrollIntoView(spMenuBtnPage.typesExArrowBtnArr, i);
            mouseHoverElement(spMenuBtnPage.typesExArrowBtnArr, i);
            expect(getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, bgColorAttr, i).value)
                .toContain(typesBtnHvrColorArr[i]);
        }
    });

    xit('should check split btn type examples active state', () => {
        // const typesBtnArr = elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        // const typesArrowBtnArr = elementArray(spMenuBtnPage.typesExArrowBtnArr);
        //
        // for (let i = 0; i < typesBtnArr.length; i++) {
        //     mouseHoverElement(spMenuBtnPage.typesExSelectionBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, bgColorAttr, i).value)
        //         .toContain(typesBtnActiveColorArr[i]);
        //     mouseButtonUp();
        // }
        //
        // for (let i = 0; i < typesArrowBtnArr.length; i++) {
        //     mouseHoverElement(spMenuBtnPage.typesExArrowBtnArr,  i);
        //     mouseButtonDown();
        //     expect(getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, bgColorAttr, i).value)
        //         .toContain(typesBtnActiveColorArr[i]);
        //     mouseButtonUp();
        // }

    });

    it('should check tooltips', () => {
        const menuBtnArr = elementArray(spMenuBtnPage.mainBtnArr);

        for (let i = 0; i < menuBtnArr.length; i++) {
            expect(getAttributeByName(spMenuBtnPage.mainBtnArr, tooltipAttr, i))
                .not.toEqual(null);
        }
    });

    it('should check RTL orientation', () => {
        spMenuBtnPage.checkRtlSwitch();
    });
});

