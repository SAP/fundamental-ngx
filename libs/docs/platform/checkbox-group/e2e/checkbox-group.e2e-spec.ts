import { CheckboxGroupPO } from './checkbox-group.po';
import {
    checkIfDisabled,
    checkLabels,
    click,
    clickNextElement,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getElementArrayLength,
    getText,
    getTextArr,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    countriesArr,
    currencies,
    engineeringErrorMessage,
    errorTooltipMessage,
    europeanCountriesArr,
    fourFruitsArr,
    graduationErrorMessage,
    hobbiesArr,
    itemsArr,
    markingsStyle,
    phonesArr,
    programmingLanguagesArr,
    purchasedItemsArr,
    qualificationCheckboxesArr,
    reptilesArr,
    seasonsArr,
    sportsArr,
    subjectsArr,
    threeFruitsArr,
    workExpierenceErrorMessage
} from './checkbox-group-page-content';

describe('Checkbox group test suite', () => {
    const checkboxGroupPage = new CheckboxGroupPO();
    const {
        stringValueCheckboxesArr,
        stringValueCheckboxLabelArr,
        stringValueoutputLabelsArr,
        winterCheckbox,
        objectValueCheckboxesArr,
        objectValueCheckboxLabelArr,
        projectedValueCheckboxesArr,
        projectedValueCheckboxLabelArr,
        formValidationCheckboxesArr,
        formValidationCheckboxLabelArr,
        errorTooltip,
        objectValueoutputLabelsArr,
        projectValueoutputLabelsArr,
        formvalidationValueoutputLabelsArr
    } = checkboxGroupPage;

    beforeAll(async () => {
        await checkboxGroupPage.open();
        await waitForPresent(checkboxGroupPage.root);
        await waitForElDisplayed(checkboxGroupPage.title);
    }, 2);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(checkboxGroupPage.root);
        await waitForElDisplayed(checkboxGroupPage.title);
    }, 2);

    describe('Checkbox Group created with List of Values.', () => {
        // TODO: Need to revise this one and consider using nexElement method
        it('should check that each checkbox has label', async () => {
            const checkboxCount = await getElementArrayLength(stringValueCheckboxesArr);
            const checkboxLabelCount = await getElementArrayLength(stringValueCheckboxLabelArr);

            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check checkbox markings are centered', async () => {
            const checkboxMarkDisplayStyle = await executeScriptBeforeTagAttr(winterCheckbox, 'display');
            await expect(checkboxMarkDisplayStyle).toContain(markingsStyle);
        });

        it('should check reactive inline checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, seasonsArr, 0, 4);
            await checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                0,
                0,
                4,
                seasonsArr
            );
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, phonesArr, 4, 8);
            await checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                1,
                4,
                8,
                phonesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, sportsArr, 8, 12);
            await checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                2,
                8,
                12,
                sportsArr
            );
        });

        it('should check reactive disabled checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, sportsArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                await checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, seasonsArr, 19, 23);
            await checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                4,
                19,
                23,
                seasonsArr
            );
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, sportsArr, 23, 27);
            await checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                5,
                23,
                27,
                sportsArr
            );
        });

        it('should check reactive disabled checkboxes', async () => {
            await checkLabels(stringValueCheckboxLabelArr, sportsArr, 27, 31);
            for (let i = 27; 31 > i; i++) {
                await checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From List of Objects.', () => {
        it('should check that each checkbox has label', async () => {
            const checkboxCount = await getElementArrayLength(objectValueCheckboxesArr);
            const checkboxLabelCount = await getElementArrayLength(objectValueCheckboxLabelArr);

            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive inline checkboxes2', async () => {
            await checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 0, 4);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                0,
                0,
                4,
                programmingLanguagesArr
            );
            await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 1);
            await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 3);
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, countriesArr, 4, 7);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                1,
                4,
                7,
                countriesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, countriesArr, 7, 10);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                2,
                7,
                10,
                currencies
            );
        });

        it('should check reactive lookup key and display key usages checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, itemsArr, 10, 13);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                3,
                10,
                13,
                purchasedItemsArr
            );
        });

        it('should check reactive disabled checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, countriesArr, 13, 16);
            for (let i = 13; 16 > i; i++) {
                await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 16, 20);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                4,
                16,
                20,
                programmingLanguagesArr
            );
            await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 17);
            await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 19);
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, countriesArr, 20, 23);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                5,
                20,
                23,
                currencies
            );
        });

        it('should check template lookup key and display key usages checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, itemsArr, 23, 26);
            await checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                6,
                23,
                26,
                purchasedItemsArr
            );
        });

        it('should check reactive disabled checkboxes', async () => {
            await checkLabels(objectValueCheckboxLabelArr, countriesArr, 26, 29);
            for (let i = 26; 29 > i; i++) {
                await checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From content projected Checkboxes.', () => {
        it('should check that each checkbox has label', async () => {
            const checkboxCount = await getElementArrayLength(projectedValueCheckboxesArr);
            const checkboxLabelCount = await getElementArrayLength(projectedValueCheckboxLabelArr);

            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, fourFruitsArr, 0, 4);
            await checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                0,
                0,
                4,
                fourFruitsArr
            );
            await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 0);
            await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 2);
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, hobbiesArr, 4, 8);
            await checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                1,
                4,
                8,
                hobbiesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 8, 12);
            await checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                2,
                8,
                12,
                europeanCountriesArr
            );
        });

        it('should check reactive disabled checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes 555', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, subjectsArr, 16, 20);
            await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 16);
            await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 19);
            await checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                3,
                16,
                20,
                subjectsArr
            );
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, reptilesArr, 20, 24);
            await checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                4,
                20,
                24,
                reptilesArr
            );
        });

        it('should check template disabled checkboxes', async () => {
            await checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                await checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group handling of Form Validation and Error Message Display.', () => {
        it('should check that each checkbox has label', async () => {
            const checkboxCount = await getElementArrayLength(formValidationCheckboxesArr);
            const checkboxLabelCount = await getElementArrayLength(formValidationCheckboxLabelArr);

            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check Checkbox group created from passed checkboxes and value is required', async () => {
            await scrollIntoView(formValidationCheckboxesArr, 1);
            await clickNextElement(formValidationCheckboxesArr, 1);

            await mouseHoverElement(formValidationCheckboxesArr, 0);
            await expect(await isElementDisplayed(errorTooltip)).toBe(true);
            await expect(await getText(errorTooltip)).toEqual(errorTooltipMessage);

            await checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 0, 3);
            await checkCheckboxSelecting(
                formValidationCheckboxesArr,
                formValidationCheckboxLabelArr,
                formvalidationValueoutputLabelsArr,
                0,
                0,
                3,
                threeFruitsArr
            );
        });

        it('should check Checkbox group created from list of values and value is required', async () => {
            // get checkbox error color and tooltip
            await scrollIntoView(formValidationCheckboxesArr, 4);
            await clickNextElement(formValidationCheckboxesArr, 4);
            // click twice to mark and unmark box to get error state
            await clickNextElement(formValidationCheckboxesArr, 4);
            // needed for getting the tooltip in next line
            await mouseHoverElement(formValidationCheckboxesArr, 3);
            await expect(await isElementDisplayed(errorTooltip)).toBe(true);
            await expect(await getText(errorTooltip)).toEqual(errorTooltipMessage);

            await checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 3, 6);
            await checkCheckboxSelecting(
                formValidationCheckboxesArr,
                formValidationCheckboxLabelArr,
                formvalidationValueoutputLabelsArr,
                1,
                3,
                6,
                threeFruitsArr
            );
        });

        it('should check Checkbox group created from list of values and value is required', async () => {
            // get checkbox error color and tooltip
            await scrollIntoView(formValidationCheckboxesArr, 6);
            await clickNextElement(formValidationCheckboxesArr, 6);
            // click twice to mark and unmark box to get error state
            await clickNextElement(formValidationCheckboxesArr, 6);
            await expect(await isElementDisplayed(errorTooltip)).toBe(true);
            await mouseHoverElement(formValidationCheckboxesArr, 6);
            await expect(await isElementDisplayed(errorTooltip)).toBe(true);

            await checkLabels(formValidationCheckboxLabelArr, qualificationCheckboxesArr, 6, 9);
            await expect(await getTextArr(formValidationCheckboxLabelArr, 6, 9)).toEqual(qualificationCheckboxesArr);
            await checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 10);
            await checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 12);
        });

        it('should check error messages in Checkbox group created from list of values and value is required', async () => {
            await scrollIntoView(formValidationCheckboxesArr, 8);
            await clickNextElement(formValidationCheckboxesArr, 8);
            await clickNextElement(formValidationCheckboxesArr, 8);
            await expect((await getText(errorTooltip)).trim()).toEqual(workExpierenceErrorMessage);
            await clickNextElement(formValidationCheckboxesArr, 7);
            await clickNextElement(formValidationCheckboxesArr, 7);
            await expect((await getText(errorTooltip)).trim()).toEqual(engineeringErrorMessage);
            await clickNextElement(formValidationCheckboxesArr, 6);
            await clickNextElement(formValidationCheckboxesArr, 6);
            await expect((await getText(errorTooltip)).trim()).toEqual(graduationErrorMessage);
        });

        it('should check selecting checkboxes created from list of SelectItem Objects and value is required', async () => {
            await checkCheckboxSelecting(
                formValidationCheckboxesArr,
                formValidationCheckboxLabelArr,
                formvalidationValueoutputLabelsArr,
                2,
                9,
                12,
                programmingLanguagesArr
            );
        });
    });

    describe('check example orientation', () => {
        it('should check LTR orientation', async () => {
            await checkboxGroupPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await checkboxGroupPage.saveExampleBaselineScreenshot();
            await expect(await checkboxGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkCheckboxSelecting(
    checkboxesArray: string,
    labelsArray: string,
    outputLabel: string,
    outputLabelIndex: number,
    start: number,
    end: number,
    expectedOutputLabelsArr: string[]
): Promise<void> {
    let j = 0;
    for (let i = start; i < end; i++) {
        await scrollIntoView(checkboxesArray, start);
        if ((await getAttributeByName(checkboxesArray, 'aria-disabled', i)) !== 'true') {
            if (
                (await getText(outputLabel, outputLabelIndex))
                    .toLocaleLowerCase()
                    .includes(expectedOutputLabelsArr[j].toLocaleLowerCase())
            ) {
                await click(labelsArray, i);
                await expect((await getText(outputLabel, outputLabelIndex)).toLocaleLowerCase().trim()).not.toContain(
                    expectedOutputLabelsArr[j].toLocaleLowerCase()
                );
            } else if (
                !(await getText(outputLabel, outputLabelIndex))
                    .toLocaleLowerCase()
                    .includes(expectedOutputLabelsArr[j].toLocaleLowerCase())
            ) {
                await click(labelsArray, i);
                await expect((await getText(outputLabel, outputLabelIndex)).toLocaleLowerCase().trim()).toContain(
                    expectedOutputLabelsArr[j].toLocaleLowerCase()
                );
            }
        }
        j++;
    }
}
