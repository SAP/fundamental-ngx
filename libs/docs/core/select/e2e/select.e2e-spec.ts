import { SelectPo } from './select.po';
import {
    browserIsSafari,
    click,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForPresent
} from '../../../../../e2e';

fdescribe('Select component:', () => {
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
        displayedText,
        selectControl
    } = selectPage;

    beforeAll(async () => {
        await selectPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(selectPage.root);
        await waitForElDisplayed(selectPage.title);
    }, 2);

    describe('Select modes', () => {
        it('should be able to select the option for default select', async () => {
            const textBefore = await getText(selectModesExample + displayedText);
            await click(selectModesExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectModesExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option for compact select', async () => {
            const textBefore = await getText(selectModesExample + displayedText, 1);
            await click(selectModesExample + selectControl, 1);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectModesExample + displayedText, 1);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should check disabled select', async () => {
            await expect(await getElementClass(selectModesExample + selectControl, 2)).toContain('is-disabled');
        });
    });

    describe('Semantic state', () => {
        it('should be able to select the option Success state', async () => {
            const textBefore = await getText(selectSemanticStatesExample + displayedText);
            await click(selectSemanticStatesExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectSemanticStatesExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Warning state', async () => {
            const textBefore = await getText(selectSemanticStatesExample + displayedText, 1);
            await click(selectSemanticStatesExample + selectControl, 1);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectSemanticStatesExample + displayedText, 1);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Error state', async () => {
            const textBefore = await getText(selectSemanticStatesExample + displayedText, 2);
            await click(selectSemanticStatesExample + selectControl, 2);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectSemanticStatesExample + displayedText, 2);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to select the option Information state', async () => {
            const textBefore = await getText(selectSemanticStatesExample + displayedText, 3);
            await click(selectSemanticStatesExample + selectControl, 3);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(selectSemanticStatesExample + displayedText, 3);
            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Custom Control Content', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(customControlExample + displayedText);
            await click(customControlExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(customControlExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Extended Options', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(extendedOptionsExample + displayedText);
            await click(extendedOptionsExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(extendedOptionsExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Mobile Mode', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(mobileModeExample + displayedText);
            await click(mobileModeExample + selectControl);
            await waitForElDisplayed(option);
            await click(option);
            const textAfter = await getText(mobileModeExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Max Height', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(maxHeightExample + displayedText);
            await click(maxHeightExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(maxHeightExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Adding and Removing Options', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(addRemoveOptionExample + displayedText);
            await click(addRemoveOptionExample + selectControl);
            await waitForElDisplayed(option, 4);
            await click(option, 4);
            const textAfter = await getText(addRemoveOptionExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to add option', async () => {
            // skipped due to unknown error with click intercepting
            if (await browserIsSafari()) {
                return;
            }
            await click(addRemoveOptionExample + selectControl);
            await waitForElDisplayed(option, 4);
            const optionsCountBefore = await getElementArrayLength(option);
            await click(addRemoveOptionExample + selectControl);
            await click(addRemoveOptionExample + buttons);
            await click(addRemoveOptionExample + selectControl);
            await waitForElDisplayed(option, 4);
            const optionsCountAfterAdding = await getElementArrayLength(option);

            await expect(optionsCountBefore).toEqual(optionsCountAfterAdding - 1);
        });

        it('should be able to add remove option', async () => {
            // skipped due to unknown error with click intercepting
            if (await browserIsSafari()) {
                return;
            }
            await click(addRemoveOptionExample + selectControl);
            await waitForElDisplayed(option, 4);
            const optionsCountBefore = await getElementArrayLength(option);
            await click(addRemoveOptionExample + selectControl);
            await click(addRemoveOptionExample + buttons, 1);
            await click(addRemoveOptionExample + selectControl);
            await waitForElDisplayed(option, 4);
            const optionsCountAfterRemoving = await getElementArrayLength(option);

            await expect(optionsCountBefore).toEqual(optionsCountAfterRemoving + 1);
        });

        it('should check that we not able to remove the last option', async () => {
            await scrollIntoView(addRemoveOptionExample);
            await click(addRemoveOptionExample + selectControl);
            const optionsCountBefore = await getElementArrayLength(overlayContainer + option);
            for (let i = 0; i < optionsCountBefore; i++) {
                await click(addRemoveOptionExample + buttons, 1);
            }
            await click(addRemoveOptionExample + buttons, 1);
            await expect(await getElementArrayLength(overlayContainer + option)).toBe(1);
        });
    });

    describe('Programmatic Control', () => {
        it('should be able to select the option', async () => {
            const textBefore = await getText(programmaticControlExample + displayedText);
            await click(programmaticControlExample + selectControl);
            await waitForElDisplayed(option, 5);
            await click(option, 5);
            const textAfter = await getText(programmaticControlExample + displayedText);
            await expect(textBefore).not.toEqual(textAfter);
        });

        it('should be able to control select by buttons', async () => {
            const textBefore = await getText(programmaticControlExample + displayedText);
            await click(programmaticControlExample + buttons);
            const textAfter = await getText(programmaticControlExample + displayedText);

            await click(programmaticControlExample + buttons, 1);
            await waitForElDisplayed(option, 4);
            await click(programmaticControlExample + buttons, 2);
            await waitForInvisibilityOf(overlayContainer);

            await expect(textBefore).not.toEqual(textAfter);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR', async () => {
            await selectPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await selectPage.saveExampleBaselineScreenshot();
            await expect(await selectPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
