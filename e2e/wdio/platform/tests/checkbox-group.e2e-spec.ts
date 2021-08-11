import { CheckboxGroupPO } from '../pages/checkbox-group.po';
import { checkIfDisabled, checkLabels, checkMarkingCheckbox } from '../../helper/assertion-helper';
import {
    countriesArr,
    errorTooltipMessage,
    europeanCountriesArr,
    fourFruitsArr,
    hobbiesArr,
    itemsArr,
    markingsStyle,
    phonesArr,
    programmingLanguagesArr,
    reptilesArr,
    seasonsArr,
    seasonsOutputLabel,
    sportsArr,
    threeFruitsArr
} from '../fixtures/appData/checkbox-group-page-content';
import {
    click,
    clickNextElement,
    executeScriptBeforeTagAttr,
    getElementArrayLength,
    getText,
    mouseHoverElement,
    refreshPage,
} from '../../driver/wdio';

xdescribe('Checkbox group test suite', () => {
    const checkboxGroupPage = new CheckboxGroupPO();
    const {
        stringValueCheckboxesArr, stringValueCheckboxLabelArr, stringValuecheckboxGroupLabelsArr, stringValuecheckboxGroupsArr,
        stringValueoutputLabelsArr, winterCheckbox, objectValueCheckboxesArr, objectValueCheckboxLabelArr,
        objectValuecheckboxGroupLabelsArr, objectValuecheckboxGroupsArr, projectedValueCheckboxesArr, projectedValueCheckboxLabelArr,
        projectedValuecheckboxGroupLabelsArr, projectedValuecheckboxGroupsArr, formValidationCheckboxesArr,
        formValidationCheckboxLabelArr, formValidationcheckboxGroupLabelsArr, formValidationcheckboxGroupsArr,
        errorTooltip, sectiontitle
    } = checkboxGroupPage;

    beforeAll(() => {
        checkboxGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('Checkbox Group created with List of Values.', () => {
        // TODO: Need to revise this one and consider using nexElement method
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(stringValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(stringValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(stringValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(stringValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check checkbox markings are centered', () => {
            const checkboxMarkDisplayStyle = executeScriptBeforeTagAttr(winterCheckbox, 'display');
            expect(checkboxMarkDisplayStyle).toContain(markingsStyle);
        });

        it('should check outputs1', () => {
            clickNextElement(stringValueCheckboxesArr, 1);
            checkOutputLabel(stringValueoutputLabelsArr, seasonsOutputLabel, seasonsArr[1]);

            clickNextElement(stringValueCheckboxesArr, 0);
            checkOutputLabel(stringValueoutputLabelsArr, seasonsOutputLabel,
                seasonsArr[1] + ',' + seasonsArr[0]);
        });

        it('should check reactive inline checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, seasonsArr, 0, 4);
            // checkFocusState(stringValueCheckboxesArr, 0);
            // checkHoverState(stringValueCheckboxesArr, 0);
            checkMarkingCheckbox(stringValueCheckboxesArr, 0, 4);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, phonesArr, 4, 8);
            // checkFocusState(stringValueCheckboxesArr, 4);
            // checkHoverState(stringValueCheckboxesArr, 4);
            checkMarkingCheckbox(stringValueCheckboxesArr, 4, 8);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 8, 12);
            // checkFocusState(stringValueCheckboxesArr, 8);
            // checkHoverState(stringValueCheckboxesArr, 8);
            checkMarkingCheckbox(stringValueCheckboxesArr, 8, 12);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, seasonsArr, 16, 20);
            // checkFocusState(stringValueCheckboxesArr, 16);
            // checkHoverState(stringValueCheckboxesArr, 16);
            checkMarkingCheckbox(stringValueCheckboxesArr, 16, 20);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 20, 24);
            // checkFocusState(stringValueCheckboxesArr, 20);
            // checkHoverState(stringValueCheckboxesArr, 20);
            checkMarkingCheckbox(stringValueCheckboxesArr, 20, 24);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(stringValueCheckboxLabelArr, sportsArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                checkIfDisabled(stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From List of Objects.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(objectValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(objectValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(objectValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(objectValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive inline checkboxes2', () => {
            checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 0, 4);
            // checkFocusState(objectValueCheckboxesArr, 0);
            // checkHoverState(objectValueCheckboxesArr, 0);
            checkMarkingCheckbox(objectValueCheckboxesArr, 0, 4);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 1);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 3);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 4, 7);
            // checkFocusState(objectValueCheckboxesArr, 4);
            // checkHoverState(objectValueCheckboxesArr, 4);
            checkMarkingCheckbox(objectValueCheckboxesArr, 4, 7);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 7, 10);
            // checkFocusState(objectValueCheckboxesArr, 7);
            // checkHoverState(objectValueCheckboxesArr, 7);
            checkMarkingCheckbox(objectValueCheckboxesArr, 7, 10);
        });

        it('should check reactive lookup key and display key usages checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, itemsArr, 10, 13);
            // checkFocusState(objectValueCheckboxesArr, 10);
            // checkHoverState(objectValueCheckboxesArr, 10);
            checkMarkingCheckbox(objectValueCheckboxesArr, 10, 13);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 13, 16);
            for (let i = 13; 16 > i; i++) {
                checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, programmingLanguagesArr, 16, 20);
            // checkFocusState(objectValueCheckboxesArr, 16);
            // checkHoverState(objectValueCheckboxesArr, 16);
            checkMarkingCheckbox(objectValueCheckboxesArr, 16, 20);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 17);
            checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', 19);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            const preselectionCheckboxes = (objectValueCheckboxesArr).slice(20, 23);
            const checkboxLabels = (objectValueCheckboxLabelArr).slice(20, 23);

            checkLabels(checkboxLabels, countriesArr, 20, 23);
            // checkFocusState(preselectionCheckboxes[0]);
            // checkHoverState(preselectionCheckboxes[0]);
            checkMarkingCheckbox(preselectionCheckboxes);
        });

        it('should check template lookup key and display key usages checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, itemsArr, 23, 26);
            // checkFocusState(objectValueCheckboxesArr, 23);
            // checkHoverState(objectValueCheckboxesArr, 23);
            checkMarkingCheckbox(objectValueCheckboxesArr, 23, 26);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(objectValueCheckboxLabelArr, countriesArr, 26, 29);
            for (let i = 26; 29 > i; i++) {
                checkIfDisabled(objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From content projected Checkboxes.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(projectedValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(projectedValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(projectedValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(projectedValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, fourFruitsArr, 0, 4);
            // checkFocusState(projectedValueCheckboxesArr, 1);
            // checkHoverState(projectedValueCheckboxesArr, 1);
            checkMarkingCheckbox(projectedValueCheckboxesArr, 0, 4);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 0);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 2);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, hobbiesArr, 4, 8);
            // checkFocusState(projectedValueCheckboxesArr, 4);
            // checkHoverState(projectedValueCheckboxesArr, 4);
            checkMarkingCheckbox(projectedValueCheckboxesArr, 4, 8);

        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 8, 12);
            // checkFocusState(projectedValueCheckboxesArr, 8);
            // checkHoverState(projectedValueCheckboxesArr, 8);
            checkMarkingCheckbox(projectedValueCheckboxesArr, 8, 12);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
        // Ask Sean
        xit('should check template inline checkboxes 555', () => {
            // checkLabels(projectedValueCheckboxLabelArr, subjectsArr, 16, 20);
            // checkFocusState(projectedValueCheckboxesArr, 17);
            // checkHoverState(projectedValueCheckboxesArr, 17);

            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 16);
            checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', 19);
            checkMarkingCheckbox(projectedValueCheckboxesArr, 16, 20);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, reptilesArr, 20, 24);
            // checkFocusState(projectedValueCheckboxesArr, 20);
            // checkHoverState(projectedValueCheckboxesArr, 20);
            checkMarkingCheckbox(projectedValueCheckboxesArr, 20, 24);
        });

        it('should check template disabled checkboxes', () => {
            checkLabels(projectedValueCheckboxLabelArr, europeanCountriesArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                checkIfDisabled(projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group handling of Form Validation and Error Message Display.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(formValidationcheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(formValidationcheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(formValidationCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(formValidationCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check Checkbox group created from passed checkboxes and value is required', () => {
            clickNextElement(formValidationCheckboxesArr, 1);
            click(sectiontitle, 2);

            // clickNextElement(formValidationCheckboxesArr, 2);
            mouseHoverElement(formValidationCheckboxesArr, 0);
            expect(getText(errorTooltip)).toEqual(errorTooltipMessage);

            checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 0, 3);
            // checkFocusState(formValidationCheckboxesArr, 0);
            // checkHoverState(formValidationCheckboxesArr, 0);
            checkMarkingCheckbox(formValidationCheckboxesArr, 0, 3);
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            clickNextElement(formValidationCheckboxesArr, 4);
            // click twice to mark and unmark box to get error state
            clickNextElement(formValidationCheckboxesArr, 4);
            // needed for getting the tooltip in next line
            click(sectiontitle, 1);
            mouseHoverElement(formValidationCheckboxesArr, 3);
            expect(getText(errorTooltip)).toEqual(errorTooltipMessage);

            checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 3, 6);
            // checkFocusState(formValidationCheckboxesArr, 4);
            // checkHoverState(formValidationCheckboxesArr, 3);
            checkMarkingCheckbox(formValidationCheckboxesArr, 3, 6);
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            clickNextElement(formValidationCheckboxesArr, 6);
            // click twice to mark and unmark box to get error state
            clickNextElement(formValidationCheckboxesArr, 6);
            click(sectiontitle, 1);
            mouseHoverElement(formValidationCheckboxesArr, 6);
            expect(getText(errorTooltip)).toEqual(errorTooltipMessage);

            checkLabels(formValidationCheckboxLabelArr, threeFruitsArr, 6, 10);
            // checkFocusState(formValidationCheckboxLabelArr, 6);
            // checkHoverState(formValidationCheckboxLabelArr, 6);
            checkMarkingCheckbox(formValidationCheckboxesArr, 6, 10);
            checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 7);
            checkIfDisabled(formValidationCheckboxesArr, 'aria-disabled', 'true', 9);

        });
    });

    describe('check example orientation', () => {
        it('should check LTR orientation', () => {
            checkboxGroupPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            checkboxGroupPage.saveExampleBaselineScreenshot();
            expect(checkboxGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkOutputLabel(array, label, selections): void {
    const arrL = getElementArrayLength(array);
    for (let i = 0; arrL > i; i++) {
        expect(getText(array, i)).toEqual(label + selections);
    }
}
