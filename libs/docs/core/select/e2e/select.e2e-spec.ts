import { SelectPo } from './select.po';
import {
    browserIsSafari,
    click,
    getAttributeByName,
    getElementArrayLength,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForPresent
} from '../../../../../e2e';

describe('Select component:', () => {
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
        displayedText
    } = selectPage;

    beforeAll(() => {
        selectPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(selectPage.root);
        waitForElDisplayed(selectPage.title);
    }, 2);

    describe('Select modes', () => {
        it('should be able to select the option for default select', () => {
            const textBefore = getText(selectModesExample + displayedText);
            click(selectModesExample + buttons);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectModesExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option for compact select', () => {
            const textBefore = getText(selectModesExample + displayedText, 1);
            click(selectModesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectModesExample + displayedText, 1);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should check disabled select', () => {
            expect(isElementClickable(selectModesExample + buttons, 2)).toBe(false);
            expect(getAttributeByName(selectModesExample + buttons, 'disabled', 2)).toBe('true');
        });
    });

    describe('Semantic state', () => {
        it('should be able to select the option Success state', () => {
            const textBefore = getText(selectSemanticStatesExample + displayedText);
            click(selectSemanticStatesExample + buttons);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectSemanticStatesExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Warning state', () => {
            const textBefore = getText(selectSemanticStatesExample + displayedText, 1);
            click(selectSemanticStatesExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectSemanticStatesExample + displayedText, 1);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Error state', () => {
            const textBefore = getText(selectSemanticStatesExample + displayedText, 2);
            click(selectSemanticStatesExample + buttons, 2);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectSemanticStatesExample + displayedText, 2);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Information state', () => {
            const textBefore = getText(selectSemanticStatesExample + displayedText, 3);
            click(selectSemanticStatesExample + buttons, 3);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(selectSemanticStatesExample + displayedText, 3);
            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Custom Control Content', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(customControlExample + displayedText);
            click(customControlExample + buttons);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(customControlExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Extended Options', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(extendedOptionsExample + displayedText);
            click(extendedOptionsExample + buttons);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(extendedOptionsExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Mobile Mode', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(mobileModeExample + displayedText);
            click(mobileModeExample + buttons);
            waitForElDisplayed(option);
            click(option);
            const textAfter = getText(mobileModeExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Max Height', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(maxHeightExample + displayedText);
            click(maxHeightExample + buttons);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(maxHeightExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Adding and Removing Options', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(addRemoveOptionExample + displayedText);
            click(addRemoveOptionExample + buttons, 2);
            waitForElDisplayed(option, 4);
            click(option, 4);
            const textAfter = getText(addRemoveOptionExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to add option', () => {
            // skipped due to unknown error with click intercepting
            if (browserIsSafari()) {
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
            // skipped due to unknown error with click intercepting
            if (browserIsSafari()) {
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

        it('should check that we not able to remove the last option', () => {
            scrollIntoView(addRemoveOptionExample);
            click(addRemoveOptionExample + buttons, 2);
            const optionsCountBefore = getElementArrayLength(overlayContainer + option);
            for (let i = 0; i < optionsCountBefore; i++) {
                click(addRemoveOptionExample + buttons, 1);
            }
            click(addRemoveOptionExample + buttons, 1);
            expect(getElementArrayLength(overlayContainer + option)).toBe(1);
        });
    });

    describe('Programmatic Control', () => {
        it('should be able to select the option', () => {
            const textBefore = getText(programmaticControlExample + displayedText);
            click(programmaticControlExample + buttons, 3);
            waitForElDisplayed(option, 5);
            click(option, 5);
            const textAfter = getText(programmaticControlExample + displayedText);
            expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to control select by buttons', () => {
            const textBefore = getText(programmaticControlExample + displayedText);
            click(programmaticControlExample + buttons);
            const textAfter = getText(programmaticControlExample + displayedText);

            click(programmaticControlExample + buttons, 1);
            waitForElDisplayed(option, 4);
            click(programmaticControlExample + buttons, 2);
            waitForInvisibilityOf(overlayContainer);

            expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR', () => {
            selectPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            selectPage.saveExampleBaselineScreenshot();
            expect(selectPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
