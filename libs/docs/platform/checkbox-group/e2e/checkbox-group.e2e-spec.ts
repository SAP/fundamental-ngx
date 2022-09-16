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

    beforeAll(() => {
        checkboxGroupPage.open();
        waitForPresent(checkboxGroupPage.root);
        waitForElDisplayed(checkboxGroupPage.title);
    }, 2);

    beforeEach(() => {
        refreshPage();
        waitForPresent(checkboxGroupPage.root);
        waitForElDisplayed(checkboxGroupPage.title);
    }, 2);

    describe('Checkbox Group created with List of Values.', () => {
        // TODO: Need to revise this one and consider using nexElement method
        it('should check that each checkbox has label', () => {
            const checkboxCount = getElementArrayLength(stringValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(stringValueCheckboxLabelArr);

            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check checkbox markings are centered', () => {
            const checkboxMarkDisplayStyle = executeScriptBeforeTagAttr(winterCheckbox, 'display');
            expect(checkboxMarkDisplayStyle).toContain(markingsStyle);
        });

        it('should check reactive inline checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, seasonsArr, 0, 4);
            checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                0,
                0,
                4,
                seasonsArr
            );
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, phonesArr, 4, 8);
            checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                1,
                4,
                8,
                phonesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 8, 12);
            checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                2,
                8,
                12,
                sportsArr
            );
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, seasonsArr, 19, 23);
            checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                4,
                19,
                23,
                seasonsArr
            );
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 23, 27);
            checkCheckboxSelecting(
                stringValueCheckboxesArr,
                stringValueCheckboxLabelArr,
                stringValueoutputLabelsArr,
                5,
                23,
                27,
                sportsArr
            );
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 27, 31);
            for (let i = 27; 31 > i; i++) {
                checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From List of Objects.', () => {
        it('should check that each checkbox has label', () => {
            const checkboxCount = getElementArrayLength(objectValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(objectValueCheckboxLabelArr);

            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive inline checkboxes2', () => {
            checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 0, 4);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                0,
                0,
                4,
                programmingLanguagesArr
            );
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 1);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 3);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 4, 7);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                1,
                4,
                7,
                countriesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 7, 10);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                2,
                7,
                10,
                currencies
            );
        });

        it('should check reactive lookup key and display key usages checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, itemsArr, 10, 13);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                3,
                10,
                13,
                purchasedItemsArr
            );
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 13, 16);
            for (let i = 13; 16 > i; i++) {
                checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 16, 20);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                4,
                16,
                20,
                programmingLanguagesArr
            );
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 17);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 19);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 20, 23);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                5,
                20,
                23,
                currencies
            );
        });

        it('should check template lookup key and display key usages checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, itemsArr, 23, 26);
            checkCheckboxSelecting(
                objectValueCheckboxesArr,
                objectValueCheckboxLabelArr,
                objectValueoutputLabelsArr,
                6,
                23,
                26,
                purchasedItemsArr
            );
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 26, 29);
            for (let i = 26; 29 > i; i++) {
                checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From content projected Checkboxes.', () => {
        it('should check that each checkbox has label', () => {
            const checkboxCount = getElementArrayLength(projectedValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(projectedValueCheckboxLabelArr);

            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, fourFruitsArr, 0, 4);
            checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                0,
                0,
                4,
                fourFruitsArr
            );
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 0);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 2);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, hobbiesArr, 4, 8);
            checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                1,
                4,
                8,
                hobbiesArr
            );
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 8, 12);
            checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                2,
                8,
                12,
                europeanCountriesArr
            );
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes 555', () => {
            checkLabels(projectedValueCheckboxLabelArr, subjectsArr, 16, 20);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 16);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 19);
            checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                3,
                16,
                20,
                subjectsArr
            );
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, reptilesArr, 20, 24);
            checkCheckboxSelecting(
                projectedValueCheckboxesArr,
                projectedValueCheckboxLabelArr,
                projectValueoutputLabelsArr,
                4,
                20,
                24,
                reptilesArr
            );
        });

        it('should check template disabled checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group handling of Form Validation and Error Message Display.', () => {
        it('should check that each checkbox has label', () => {
            const checkboxCount = getElementArrayLength(formValidationCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(formValidationCheckboxLabelArr);

            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check Checkbox group created from passed checkboxes and value is required', () => {
            scrollIntoView(formValidationCheckboxesArr, 1);
            clickNextElement(formValidationCheckboxesArr, 1);

            mouseHoverElement(formValidationCheckboxesArr, 0);
            expect(isElementDisplayed(errorTooltip)).toBe(true);
            expect(getText(errorTooltip)).toEqual(errorTooltipMessage);

            checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 0, 3);
            checkCheckboxSelecting(
                formValidationCheckboxesArr,
                formValidationCheckboxLabelArr,
                formvalidationValueoutputLabelsArr,
                0,
                0,
                3,
                threeFruitsArr
            );
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            scrollIntoView(formValidationCheckboxesArr, 4);
            clickNextElement(formValidationCheckboxesArr, 4);
            // click twice to mark and unmark box to get error state
            clickNextElement(formValidationCheckboxesArr, 4);
            // needed for getting the tooltip in next line
            mouseHoverElement(formValidationCheckboxesArr, 3);
            expect(isElementDisplayed(errorTooltip)).toBe(true);
            expect(getText(errorTooltip)).toEqual(errorTooltipMessage);

            checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 3, 6);
            checkCheckboxSelecting(
                formValidationCheckboxesArr,
                formValidationCheckboxLabelArr,
                formvalidationValueoutputLabelsArr,
                1,
                3,
                6,
                threeFruitsArr
            );
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            scrollIntoView(formValidationCheckboxesArr, 6);
            clickNextElement(formValidationCheckboxesArr, 6);
            // click twice to mark and unmark box to get error state
            clickNextElement(formValidationCheckboxesArr, 6);
            expect(isElementDisplayed(errorTooltip)).toBe(true);
            mouseHoverElement(formValidationCheckboxesArr, 6);
            expect(isElementDisplayed(errorTooltip)).toBe(true);

            checkLabels(formValidationCheckboxLabelArr, qualificationCheckboxesArr, 6, 9);
            expect(getTextArr(formValidationCheckboxLabelArr, 6, 9)).toEqual(qualificationCheckboxesArr);
            checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 10);
            checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 12);
        });

        it('should check error messages in Checkbox group created from list of values and value is required', () => {
            scrollIntoView(formValidationCheckboxesArr, 8);
            clickNextElement(formValidationCheckboxesArr, 8);
            clickNextElement(formValidationCheckboxesArr, 8);
            expect(getText(errorTooltip).trim()).toEqual(workExpierenceErrorMessage);
            clickNextElement(formValidationCheckboxesArr, 7);
            clickNextElement(formValidationCheckboxesArr, 7);
            expect(getText(errorTooltip).trim()).toEqual(engineeringErrorMessage);
            clickNextElement(formValidationCheckboxesArr, 6);
            clickNextElement(formValidationCheckboxesArr, 6);
            expect(getText(errorTooltip).trim()).toEqual(graduationErrorMessage);
        });

        it('should check selecting checkboxes created from list of SelectItem Objects and value is required', () => {
            checkCheckboxSelecting(
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
        it('should check LTR orientation', () => {
            checkboxGroupPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            checkboxGroupPage.saveExampleBaselineScreenshot();
            expect(checkboxGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkCheckboxSelecting(
    checkboxesArray: string,
    labelsArray: string,
    outputLabel: string,
    outputLabelIndex: number,
    start: number,
    end: number,
    expectedOutputLabelsArr: string[]
): void {
    let j = 0;
    for (let i = start; i < end; i++) {
        scrollIntoView(checkboxesArray, start);
        if (getAttributeByName(checkboxesArray, 'aria-disabled', i) !== 'true') {
            if (
                getText(outputLabel, outputLabelIndex)
                    .toLocaleLowerCase()
                    .includes(expectedOutputLabelsArr[j].toLocaleLowerCase())
            ) {
                click(labelsArray, i);
                expect(getText(outputLabel, outputLabelIndex).toLocaleLowerCase().trim()).not.toContain(
                    expectedOutputLabelsArr[j].toLocaleLowerCase()
                );
            } else if (
                !getText(outputLabel, outputLabelIndex)
                    .toLocaleLowerCase()
                    .includes(expectedOutputLabelsArr[j].toLocaleLowerCase())
            ) {
                click(labelsArray, i);
                expect(getText(outputLabel, outputLabelIndex).toLocaleLowerCase().trim()).toContain(
                    expectedOutputLabelsArr[j].toLocaleLowerCase()
                );
            }
        }
        j++;
    }
}
