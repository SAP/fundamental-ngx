import { CheckboxGroupPO } from '../pages/checkbox-group.po';
import { checkIfDisabled, checkLabels, checkMarkingCheckbox } from '../../helper/assertion-helper';
import checkboxGPData from '../fixtures/appData/checkbox-group-page-content';
import checkboxGPData2 from '../fixtures/appData/checkbox-page-contents';
import {
    click,
    clickNextElement,
    executeScriptBeforeTagAttr, focusElement, getAttributeByName, getCSSPropertyByName,
    getElementArrayLength, getText, mouseHoverElement,
    refreshPage, scrollIntoView,
} from '../../driver/wdio';

xdescribe('Checkbox group test suite', () => {
    const checkboxGroupPage = new CheckboxGroupPO();

    beforeAll(() => {
        checkboxGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('Checkbox Group created with List of Values.', () => {
        // TODO: Need to revise this one and consider using nexElement method
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(checkboxGroupPage.stringValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(checkboxGroupPage.stringValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(checkboxGroupPage.stringValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(checkboxGroupPage.stringValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check checkbox markings are centered', () => {
            const checkboxMarkDisplayStyle = executeScriptBeforeTagAttr(checkboxGroupPage.winterCheckbox, 'display');
            expect(checkboxMarkDisplayStyle).toContain(checkboxGPData.markingsStyle);
        });

        it('should check outputs1', () => {
            clickNextElement(checkboxGroupPage.stringValueCheckboxesArr, 1);
            checkOutputLabel(checkboxGroupPage.stringValueoutputLabelsArr, checkboxGPData.seasonsOutputLabel, checkboxGPData.seasonsArr[1]);

            clickNextElement(checkboxGroupPage.stringValueCheckboxesArr, 0);
            checkOutputLabel(checkboxGroupPage.stringValueoutputLabelsArr, checkboxGPData.seasonsOutputLabel,
                checkboxGPData.seasonsArr[1] + ',' + checkboxGPData.seasonsArr[0]);
        });

        it('should check reactive inline checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.seasonsArr, 0, 4);
            checkFocusState(checkboxGroupPage.stringValueCheckboxesArr, 0);
            checkHoverState(checkboxGroupPage.stringValueCheckboxesArr, 0);
            checkMarkingCheckbox(checkboxGroupPage.stringValueCheckboxesArr, 0, 4);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.phonesArr, 4, 8);
            checkFocusState(checkboxGroupPage.stringValueCheckboxesArr, 4);
            checkHoverState(checkboxGroupPage.stringValueCheckboxesArr, 4);
            checkMarkingCheckbox(checkboxGroupPage.stringValueCheckboxesArr, 4, 8);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.sportsArr, 8, 12);
            checkFocusState(checkboxGroupPage.stringValueCheckboxesArr, 8);
            checkHoverState(checkboxGroupPage.stringValueCheckboxesArr, 8);
            checkMarkingCheckbox(checkboxGroupPage.stringValueCheckboxesArr, 8, 12);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.sportsArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(checkboxGroupPage.stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.seasonsArr, 16, 20);
            checkFocusState(checkboxGroupPage.stringValueCheckboxesArr, 16);
            checkHoverState(checkboxGroupPage.stringValueCheckboxesArr, 16);
            checkMarkingCheckbox(checkboxGroupPage.stringValueCheckboxesArr, 16, 20);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.sportsArr, 20, 24);
            checkFocusState(checkboxGroupPage.stringValueCheckboxesArr, 20);
            checkHoverState(checkboxGroupPage.stringValueCheckboxesArr, 20);
            checkMarkingCheckbox(checkboxGroupPage.stringValueCheckboxesArr, 20, 24);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.stringValueCheckboxLabelArr, checkboxGPData.sportsArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                checkIfDisabled(checkboxGroupPage.stringValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From List of Objects.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(checkboxGroupPage.objectValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(checkboxGroupPage.objectValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(checkboxGroupPage.objectValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(checkboxGroupPage.objectValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive inline checkboxes2', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.programmingLanguagesArr, 0, 4);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 0);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 0);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 0, 4);
            checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', 1);
            checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', 3);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.countriesArr, 4, 7);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 4);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 4);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 4, 7);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.countriesArr, 7, 10);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 7);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 7);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 7, 10);
        });

        it('should check reactive lookup key and display key usages checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.itemsArr, 10, 13);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 10);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 10);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 10, 13);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.countriesArr, 13, 16);
            for (let i = 13; 16 > i; i++) {
                checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });

        it('should check template inline checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.programmingLanguagesArr, 16, 20);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 16);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 16);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 16, 20);
            checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', 17);
            checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', 19);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            const preselectionCheckboxes = (checkboxGroupPage.objectValueCheckboxesArr).slice(20, 23);
            const checkboxLabels = (checkboxGroupPage.objectValueCheckboxLabelArr).slice(20, 23);

            checkLabels(checkboxLabels, checkboxGPData.countriesArr, 20, 23);
            checkFocusState(preselectionCheckboxes[0]);
            checkHoverState(preselectionCheckboxes[0]);
            checkMarkingCheckbox(preselectionCheckboxes);
        });

        it('should check template lookup key and display key usages checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.itemsArr, 23, 26);
            checkFocusState(checkboxGroupPage.objectValueCheckboxesArr, 23);
            checkHoverState(checkboxGroupPage.objectValueCheckboxesArr, 23);
            checkMarkingCheckbox(checkboxGroupPage.objectValueCheckboxesArr, 23, 26);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.objectValueCheckboxLabelArr, checkboxGPData.countriesArr, 26, 29);
            for (let i = 26; 29 > i; i++) {
                checkIfDisabled(checkboxGroupPage.objectValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group created From content projected Checkboxes.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(checkboxGroupPage.projectedValuecheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(checkboxGroupPage.projectedValuecheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(checkboxGroupPage.projectedValueCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(checkboxGroupPage.projectedValueCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.fourFruitsArr, 0, 4);
            checkFocusState(checkboxGroupPage.projectedValueCheckboxesArr, 1);
            checkHoverState(checkboxGroupPage.projectedValueCheckboxesArr, 1);
            checkMarkingCheckbox(checkboxGroupPage.projectedValueCheckboxesArr, 0, 4);
            checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', 0);
            checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', 2);
        });

        it('should check reactive pre-selection based on value passed checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.hobbiesArr, 4, 8);
            checkFocusState(checkboxGroupPage.projectedValueCheckboxesArr, 4);
            checkHoverState(checkboxGroupPage.projectedValueCheckboxesArr, 4);
            checkMarkingCheckbox(checkboxGroupPage.projectedValueCheckboxesArr, 4, 8);

        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.europeanCountriesArr, 8, 12);
            checkFocusState(checkboxGroupPage.projectedValueCheckboxesArr, 8);
            checkHoverState(checkboxGroupPage.projectedValueCheckboxesArr, 8);
            checkMarkingCheckbox(checkboxGroupPage.projectedValueCheckboxesArr, 8, 12);
        });

        it('should check reactive disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.europeanCountriesArr, 12, 16);
            for (let i = 12; 16 > i; i++) {
                checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
        // Ask Sean
        xit('should check template inline checkboxes 555', () => {
            // checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.subjectsArr, 16, 20);
            // checkFocusState(checkboxGroupPage.projectedValueCheckboxesArr, 17);
            // checkHoverState(checkboxGroupPage.projectedValueCheckboxesArr, 17);

            checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', 16);
            checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', 19);
            checkMarkingCheckbox(checkboxGroupPage.projectedValueCheckboxesArr, 16, 20);
        });

        it('should check template pre-selection based on value passed checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.reptilesArr, 20, 24);
            checkFocusState(checkboxGroupPage.projectedValueCheckboxesArr, 20);
            checkHoverState(checkboxGroupPage.projectedValueCheckboxesArr, 20);
            checkMarkingCheckbox(checkboxGroupPage.projectedValueCheckboxesArr, 20, 24);
        });

        it('should check template disabled checkboxes', () => {
            checkLabels(checkboxGroupPage.projectedValueCheckboxLabelArr, checkboxGPData.europeanCountriesArr, 24, 28);
            for (let i = 24; 28 > i; i++) {
                checkIfDisabled(checkboxGroupPage.projectedValueCheckboxesArr, 'aria-disabled', 'true', i);
            }
        });
    });

    describe('Checkbox Group handling of Form Validation and Error Message Display.', () => {
        it('should check that each group and checkbox have labels', () => {
            const checkboxGroupCount = getElementArrayLength(checkboxGroupPage.formValidationcheckboxGroupsArr);
            const groupLabelsCount = getElementArrayLength(checkboxGroupPage.formValidationcheckboxGroupLabelsArr);
            const checkboxCount = getElementArrayLength(checkboxGroupPage.formValidationCheckboxesArr);
            const checkboxLabelCount = getElementArrayLength(checkboxGroupPage.formValidationCheckboxLabelArr);

            expect(checkboxGroupCount).toEqual(groupLabelsCount);
            expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check Checkbox group created from passed checkboxes and value is required', () => {
            clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 1);
            for (let i = 0; 3 > i; i++) {
                expect(getCSSPropertyByName(checkboxGroupPage.formValidationCheckboxesArr, 'border-color', i).value)
                    .toContain(checkboxGPData.errorBorderStyle);
            }

            click(checkboxGroupPage.sectiontitle, 2);

            // clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 2);
            mouseHoverElement(checkboxGroupPage.formValidationCheckboxesArr, 0);
            expect(getText(checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

            checkLabels(checkboxGroupPage.formValidationCheckboxLabelArr, checkboxGPData.threeFruitsArr, 0, 3);
            checkFocusState(checkboxGroupPage.formValidationCheckboxesArr, 0);
            checkHoverState(checkboxGroupPage.formValidationCheckboxesArr, 0);
            checkMarkingCheckbox(checkboxGroupPage.formValidationCheckboxesArr, 0, 3);
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 4);
            // click twice to mark and unmark box to get error state
            clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 4);
            for (let i = 3; 6 > i; i++) {
                expect(getCSSPropertyByName(checkboxGroupPage.formValidationCheckboxesArr, 'border-color', i).value)
                    .toContain(checkboxGPData.errorBorderStyle);
            }
            // needed for getting the tooltip in next line
            click(checkboxGroupPage.sectiontitle, 1);
            mouseHoverElement(checkboxGroupPage.formValidationCheckboxesArr, 3);
            expect(getText(checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

            checkLabels(checkboxGroupPage.formValidationCheckboxLabelArr, checkboxGPData.threeFruitsArr, 3, 6);
            checkFocusState(checkboxGroupPage.formValidationCheckboxesArr, 4);
            checkHoverState(checkboxGroupPage.formValidationCheckboxesArr, 3);
            checkMarkingCheckbox(checkboxGroupPage.formValidationCheckboxesArr, 3, 6);
        });

        it('should check Checkbox group created from list of values and value is required', () => {
            // get checkbox error color and tooltip
            clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 6);
            // click twice to mark and unmark box to get error state
            clickNextElement(checkboxGroupPage.formValidationCheckboxesArr, 6);

            for (let i = 6; 10 > i; i++) {
                expect(getCSSPropertyByName(checkboxGroupPage.formValidationCheckboxesArr, 'border-color', i).value)
                    .toContain(checkboxGPData.errorBorderStyle);
            }
            click(checkboxGroupPage.sectiontitle, 1);
            mouseHoverElement(checkboxGroupPage.formValidationCheckboxesArr, 6);
            expect(getText(checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

            checkLabels(checkboxGroupPage.formValidationCheckboxLabelArr, checkboxGPData.threeFruitsArr, 6, 10);
            checkFocusState(checkboxGroupPage.formValidationCheckboxLabelArr, 6);
            checkHoverState(checkboxGroupPage.formValidationCheckboxLabelArr, 6);
            checkMarkingCheckbox(checkboxGroupPage.formValidationCheckboxesArr, 6, 10);
            checkIfDisabled(checkboxGroupPage.formValidationCheckboxesArr, 'aria-disabled', 'true', 7);
            checkIfDisabled(checkboxGroupPage.formValidationCheckboxesArr, 'aria-disabled', 'true', 9);

        });
    });

    xdescribe('check example orientation', () => {
        it('should check LTR orientation', () => {
            const areaContainersArrayLength = getElementArrayLength(checkboxGroupPage.exampleAreaContainersArr);

            for (let i = 0; areaContainersArrayLength > i; i++) {
                expect(getCSSPropertyByName(checkboxGroupPage.exampleAreaContainersArr, 'direction', i).value)
                    .toBe('ltr', 'css prop direction ');
            }
        });

        it('should check RTL orientation', () => {
            const arrL = getElementArrayLength(checkboxGroupPage.exampleAreaContainersArr);

            for (let i = 0; arrL > i; i++) {
                scrollIntoView(checkboxGroupPage.exampleAreaContainersArr, i);
                expect(getCSSPropertyByName(checkboxGroupPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
                const dirValueBefore = getAttributeByName(checkboxGroupPage.exampleAreaContainersArr, 'dir', i);
                expect([null, '']).toContain(dirValueBefore);
                click(checkboxGroupPage.rtlSwitcherArr, i);
                expect(getCSSPropertyByName(checkboxGroupPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                expect(getAttributeByName(checkboxGroupPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            }
        });
    });
});

function checkHoverState(elementSelector, index: number = 0): boolean {
    scrollIntoView(elementSelector, index);
    mouseHoverElement(elementSelector, index);
    return expect(getCSSPropertyByName(elementSelector, 'border-bottom-color', index).value)
        .toContain(checkboxGPData2.checkboxHoverState);
}

function checkFocusState(elementSelector, index: number = 0): boolean {
    // clickNextElement(elementSelector, index);
    focusElement(elementSelector, index);
    return expect(getCSSPropertyByName(elementSelector, 'outline-style', index).value)
        .toContain(checkboxGPData2.checkboxFocusStyle);
}

function checkOutputLabel(array, label, selections): void {
    const arrL = getElementArrayLength(array);
    for (let i = 0; arrL > i; i++) {
        expect(getText(array, i)).toEqual(label + selections);
    }
}
