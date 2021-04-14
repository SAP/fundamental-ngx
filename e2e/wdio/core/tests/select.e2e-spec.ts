import { SelectPo } from '../pages/select.po';
import {
    addIsActiveClass, browserIsFirefox,
    checkElementScreenshot,
    click,
    focusElement,
    getAttributeByName,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    getText,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    waitForElDisplayed,
    waitForInvisibilityOf
} from '../../driver/wdio';
import {
    addRemoveSelectOptions,
    customControlSelectOptions,
    extendedSelectOptions,
    maxHeightSelectOptions,
    mobileSelectOptions,
    optionTag,
    programmaticSelectOptions,
    selectModesCompactSelectOptions,
    selectModesDefaultSelectOptions,
    semanticModesErrorSelectOptions,
    semanticModesInformationSelectOptions,
    semanticModesSuccesSelectOptions,
    semanticModesWarningSelectOptions
} from '../fixtures/testData/select-tags';

describe('Select component:', function() {
    const selectPage = new SelectPo();
    const {
        selectModesExample,
        selectSemanticStatesExample,
        customControlExample,
        extendedOptionsExample,
        mobileModeExample,
        maxHeightExample,
        addRemoveOptionExample,
        programmaticControlExample,
        overlayContainer,
        buttons,
        option,
        options,
        displayedText
    } = selectPage;

    beforeAll(() => {
        selectPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    describe('Select modes', function() {
        it('should be able to select the option for default select', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectModesExample + displayedText);
            click(selectModesExample + buttons);
            waitForElDisplayed(option, 4);
            click(options(2));
            const textAfter = getText(selectModesExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check for default select', () => {
            click(selectModesExample + buttons);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, selectModesDefaultSelectOptions + i, optionTag, i);
            }
        });

        it('should be able to select the option for compact select', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectModesExample + displayedText, 1);
            click(selectModesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(options(7));
            const textAfter = getText(selectModesExample + displayedText, 1);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check for compact select', () => {
            click(selectModesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, selectModesCompactSelectOptions + i, optionTag, i);
            }
        });

        it('should check disabled select', () => {
            expect(isElementClickable(selectModesExample + buttons, 2)).toBe(false);
            expect(getAttributeByName(selectModesExample + buttons, 'disabled', 2)).toBe('true');
        });
    });

    describe('Semantic state', function() {
        it('should be able to select the option Success state', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectSemanticStatesExample + displayedText);
            click(selectSemanticStatesExample + buttons);
            waitForElDisplayed(option, 4);
            click(options(18));
            const textAfter = getText(selectSemanticStatesExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check Success', () => {
            click(selectSemanticStatesExample + buttons);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, semanticModesSuccesSelectOptions + i, optionTag, i);
            }
        });

        it('should be able to select the option Warning state', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectSemanticStatesExample + displayedText, 1);
            click(selectSemanticStatesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(options(21));
            const textAfter = getText(selectSemanticStatesExample + displayedText, 1);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check Warning', () => {
            click(selectSemanticStatesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, semanticModesWarningSelectOptions + i, optionTag, i);
            }
        });

        it('should be able to select the option Error state', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectSemanticStatesExample + displayedText, 2);
            click(selectSemanticStatesExample + buttons, 2);
            waitForElDisplayed(option, 4);
            click(options(26));
            const textAfter = getText(selectSemanticStatesExample + displayedText, 2);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check Error', () => {
            click(selectSemanticStatesExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, semanticModesErrorSelectOptions + i, optionTag, i);
            }
        });

        it('should be able to select the option Information state', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(selectSemanticStatesExample + displayedText, 3);
            click(selectSemanticStatesExample + buttons, 3);
            waitForElDisplayed(option, 4);
            click(options(29));
            const textAfter = getText(selectSemanticStatesExample + displayedText, 3);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check Information', () => {
            click(selectSemanticStatesExample + buttons, 3);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, semanticModesInformationSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Custom Control Content', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(customControlExample + displayedText);
            click(customControlExample + buttons);
            waitForElDisplayed(option, 4);
            click(options(34));
            const textAfter = getText(customControlExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check', () => {
            click(customControlExample + buttons);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, customControlSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Extended Options', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(extendedOptionsExample + displayedText);
            click(extendedOptionsExample + buttons);
            waitForElDisplayed(option, 4);
            click(options(38));
            const textAfter = getText(extendedOptionsExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check', () => {
            click(extendedOptionsExample + buttons);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, extendedSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Mobile Mode', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(mobileModeExample + displayedText);
            click(mobileModeExample + buttons);
            waitForElDisplayed(option);
            click(options(44));
            const textAfter = getText(mobileModeExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check', () => {
            click(mobileModeExample + buttons);
            waitForElDisplayed(option);
            const arrLength = getElementArrayLength(option);

            for (let i = 0; arrLength > i; i++) {
                checkElementStates(option, mobileSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Max Height', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(maxHeightExample + displayedText);
            click(maxHeightExample + buttons);
            waitForElDisplayed(option, 4);
            click(options(47));
            const textAfter = getText(maxHeightExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check', () => {
            click(maxHeightExample + buttons);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, maxHeightSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Adding and Removing Options', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(addRemoveOptionExample + displayedText);
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            click(options(56));
            const textAfter = getText(addRemoveOptionExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to add option', () => {
            if (browserIsFirefox()) {
                return;
            }
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const optionsCountBefore = getElementArrayLength(option);
            click(addRemoveOptionExample + buttons, 2);
            click(addRemoveOptionExample + buttons);
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const optionsCountAfterAdding = getElementArrayLength(option);

            expect(optionsCountBefore).toEqual(optionsCountAfterAdding - 1);
        });

        it('should be able to add remove option', () => {
            if (browserIsFirefox()) {
                return;
            }
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const optionsCountBefore = getElementArrayLength(option);
            click(addRemoveOptionExample + buttons, 2);
            click(addRemoveOptionExample + buttons, 1);
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const optionsCountAfterRemoving = getElementArrayLength(option);

            expect(optionsCountBefore).toEqual(optionsCountAfterRemoving + 1);
        });

        xit('should have visual check', () => {
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, addRemoveSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Programmatic Control', function() {
        it('should be able to select the option', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(programmaticControlExample + displayedText);
            click(programmaticControlExample + buttons, 3);
            waitForElDisplayed(option, 4);
            click(options(60));
            const textAfter = getText(programmaticControlExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to control select by buttons', () => {
            if (browserIsFirefox()) {
                return;
            }
            const textBefore = getText(programmaticControlExample + displayedText);
            click(programmaticControlExample + buttons);
            const textAfter = getText(programmaticControlExample + displayedText);

            click(programmaticControlExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(programmaticControlExample + buttons, 2);
            waitForInvisibilityOf(overlayContainer);

            expect(textBefore).not.toEqual(textAfter);
        });

        xit('should have visual check', () => {
            click(programmaticControlExample + buttons, 3);
            waitForElDisplayed(option, 4);
            const arrLength = getElementArrayLength(option);

            for (let i = 4; arrLength > i; i++) {
                checkElementStates(option, programmaticSelectOptions + i, optionTag, i);
            }
        });
    });

    describe('Check orientation', function() {
        it('should check RTL and LTR', () => {
            selectPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            selectPage.saveExampleBaselineScreenshot();
            expect(selectPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} button item ${index} hover state mismatch`);
    }

    function checkFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        focusElement(selector, index);
        saveElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} button item ${index} focus state mismatch`);
    }

    function checkActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + '-' + getImageTagBrowserPlatform(), selectPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} button item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkHoverState(selector, tag + '-hover', elementName, index);
        checkFocusState(selector, tag + '-focus', elementName, index);
        checkActiveState(selector, tag + '-active', elementName, index);
    }
});

