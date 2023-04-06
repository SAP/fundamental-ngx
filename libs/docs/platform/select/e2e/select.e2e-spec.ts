import { SelectPo } from './select.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    disableSelectModeValueTestText,
    inputStateArr,
    maxHeightTestText,
    mobileExampleTestText,
    selectWithTwoColumnsTestText,
    testTextValue,
    testTextValue6,
    testTextValue7,
    titleTestText
} from './select-contents';

describe('Select test suite', () => {
    const selectPage = new SelectPo();
    const {
        selectModeExample,
        displayText,
        select,
        buttons,
        selectedValue_1,
        selectWithTwoColumnsExample,
        selectedValue_2,
        selectSemanticStateExample,
        selectSemanticStateOption,
        customControlContentExample,
        selectMobileExample,
        mobileCloseButton,
        mobileTitle,
        selectMaxHeightExample,
        selectNoneExample,
        selectNowrapExample,
        selectInReactiveForms,
        inputControl
    } = selectPage;

    beforeAll(async () => {
        await selectPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(selectPage.root);
        await waitForElDisplayed(selectPage.title);
    }, 2);

    describe('Check Select Modes example', () => {
        it('should be able to select the option for default select', async () => {
            await checkOptions(selectModeExample, 2);
            await expect(await getText(selectedValue_1)).toBe(testTextValue);
        });

        it('should be able to select the option for compact select', async () => {
            await checkOptions(selectModeExample, 2, 1);
            await expect(await getText(selectedValue_1, 1)).toBe(testTextValue);
        });

        it('verify select in disabled mode', async () => {
            await expect(await getAttributeByName(selectModeExample + displayText, 'aria-disabled', 2)).toBe('true');
            await expect(await getText(selectedValue_1, 2)).toBe(disableSelectModeValueTestText);
        });

        it('verify select in read only mode', async () => {
            await expect(await getElementClass(selectModeExample + displayText, 3)).toContain('is-readonly');
        });

        it('should check compact select be smaller than basic select', async () => {
            const basicInput = await getElementSize(selectModeExample + displayText);
            const compactInput = await getElementSize(selectModeExample + displayText, 1);

            await expect(basicInput.height).toBeGreaterThan(compactInput.height);
        });
    });

    describe('Check Select with Two Columns example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectWithTwoColumnsExample, 2);
            await expect(await getText(selectedValue_2)).toBe(selectWithTwoColumnsTestText);
        });
    });

    describe('Check Select Semantic States example', () => {
        it('should be able to select the option', async () => {
            const selectLength = await getElementArrayLength(selectSemanticStateExample + inputControl);
            for (let i = 0; i < selectLength; i++) {
                const textBefore = await getText(selectSemanticStateExample + displayText, i);
                await click(selectSemanticStateExample + inputControl, i);
                await click(selectSemanticStateOption, 7);
                const textAfter = await getText(selectSemanticStateExample + displayText, i);
                await expect(textBefore).not.toEqual(textAfter);
            }
        });

        it('should check input states', async () => {
            await scrollIntoView(selectSemanticStateExample);
            const inputLength = await getElementArrayLength(selectSemanticStateExample + inputControl);
            for (let i = 0; i < inputLength; i++) {
                await expect(await getElementClass(selectSemanticStateExample + inputControl, i)).toContain(
                    inputStateArr[i]
                );
            }
        });
    });

    describe('Check Custom Control Content With AutoResize example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(customControlContentExample, 0);
        });

        it('should check changing width of select after selection', async () => {
            const defaultSelectWidth = await (await getElementSize(customControlContentExample + select, 0)).width;

            await checkOptions(customControlContentExample, 0);
            const newSelectWidth = await (await getElementSize(customControlContentExample + select, 0)).width;
            await expect(newSelectWidth).toBeGreaterThan(defaultSelectWidth);
        });
    });

    describe('Check Select In Mobile Mode example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectMobileExample, 2);
            await expect(await getText(selectedValue_2, 1)).toBe(mobileExampleTestText);
        });

        it('verify title and close button is clickable', async () => {
            await scrollIntoView(selectMobileExample + inputControl);
            await click(selectMobileExample + inputControl);

            await expect(await getText(mobileTitle)).toBe(titleTestText);
            await expect(await isElementClickable(mobileCloseButton)).toBe(true, 'close button not clickable');
        });
    });

    describe('Check Select Max Height example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectMaxHeightExample, 2);
            await expect(await getText(selectedValue_1, 4)).toBe(maxHeightTestText);
        });
    });

    describe('Check No Value Select example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectNoneExample, 3);
            await expect(await getText(selectedValue_1, 5)).toBe(maxHeightTestText);
        });
    });

    describe('Check Do not Wrap the Options example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectNowrapExample, 2);
            await expect(await getText(selectedValue_1, 6)).toBe(maxHeightTestText);
        });
    });

    describe('Check Select In A Reactive Form example', () => {
        it('should be able to select the option', async () => {
            await checkOptions(selectInReactiveForms, 0);
            await expect(await getText(selectedValue_2, 2)).toBe(testTextValue6);
            await expect(await getText(selectedValue_2, 3)).toBe(testTextValue7);
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

    async function checkOptions(selector: string, itemIndex: number, index = 0): Promise<void> {
        const textBefore = await getText(selector + displayText, index);
        click(selector + inputControl, index);
        if (selector == selectMobileExample) {
            await (await $('fd-dialog-body .fd-select-options')).waitForDisplayed();
            await click('fd-dialog-body .fd-select-options .fd-list__item', itemIndex);
        } else {
            await (await $('fd-popover-body .fd-select-options')).waitForDisplayed();
            await click('fd-popover-body .fd-select-options .fd-list__item', itemIndex);
        }
        const textAfter = await getText(selector + displayText, index);
        await expect(textBefore).not.toEqual(textAfter);
    }
});
