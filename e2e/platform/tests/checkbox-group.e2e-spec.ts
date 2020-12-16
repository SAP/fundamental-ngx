import { CheckboxGroupPO } from '../pages/checkbox-group.po';
import { browser } from 'protractor';
import {
    checkBorderColor,
    checkErrorTooltip,
    checkFocusState,
    checkHoverState,
    checkIfDisabled,
    checkLabels,
    checkMarkingCheckbox, checkOutputLabel
} from '../../helper/assertion-helper';
import checkboxGPData from '../fixtures/appData/checkbox-group-page-content';
import { clickByMouseMove } from '../../helper/helper';

describe('Checkbox group test suite', () => {
    const checkboxGroupPage = new CheckboxGroupPO();

    beforeAll(async () => {
        await checkboxGroupPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('Checkbox Group created with List of Values.', () => {
        it('should check that each group and checkbox have labels', async () => {
            const checkboxGroupCount = await checkboxGroupPage.stringValuecheckboxGroupsArr.count();
            const groupLabelsCount = await checkboxGroupPage.stringValuecheckboxGroupLabelsArr.count();
            const checkboxCount = await checkboxGroupPage.stringValueCheckboxesArr.count();
            const checkboxLabelCount = await checkboxGroupPage.stringValueCheckboxLabelArr.count();

            await expect(checkboxGroupCount).toEqual(groupLabelsCount);
            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check checkbox markings are centered', async () => {
            const checkboxMarkDisplayStyle = await browser.executeScript(`return (window.getComputedStyle(document.querySelector(await '${checkboxGroupPage.winterCheckbox.locator().value}'), ":before").display)`);
            await expect(checkboxMarkDisplayStyle).toContain(checkboxGPData.markingsStyle);
        });

        it('should check outputs', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(0, 4);
            const outputLabel = await (await checkboxGroupPage.stringValueoutputLabelsArr).slice(0, 1);

            await clickByMouseMove(await inlineCheckboxes[1]);
            await checkOutputLabel(await outputLabel, checkboxGPData.seasonsOutputLabel, checkboxGPData.seasonsArr[1]);

            await clickByMouseMove(await inlineCheckboxes[0]);
            await checkOutputLabel(await outputLabel, checkboxGPData.seasonsOutputLabel,
                checkboxGPData.seasonsArr[1] + ',' + checkboxGPData.seasonsArr[0]);
        });

        it('should check reactive inline checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(0, 4);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(0, 4);

            await checkLabels(checkboxLabels, checkboxGPData.seasonsArr);
            await checkFocusState(inlineCheckboxes[0]);
            await checkHoverState(inlineCheckboxes[0]);
            await checkMarkingCheckbox(await inlineCheckboxes);
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(4, 8);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(4, 8);

            await checkLabels(checkboxLabels, checkboxGPData.phonesArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            const preselectionFormGroupCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(8, 12);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(8, 12);

            await checkLabels(checkboxLabels, checkboxGPData.sportsArr);
            await checkFocusState(preselectionFormGroupCheckboxes[0]);
            await checkHoverState(preselectionFormGroupCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionFormGroupCheckboxes);
        });

        it('should check reactive disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(12, 16);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(12, 16);

            await checkLabels(checkboxLabels, checkboxGPData.sportsArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });

        it('should check template inline checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(16, 20);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(16, 20);

            await checkLabels(checkboxLabels, checkboxGPData.seasonsArr);
            await checkFocusState(inlineCheckboxes[0]);
            await checkHoverState(inlineCheckboxes[0]);
            await checkMarkingCheckbox(await inlineCheckboxes);
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(20, 24);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(20, 24);

            await checkLabels(checkboxLabels, checkboxGPData.sportsArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check reactive disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.stringValueCheckboxesArr).slice(24, 28);
            const checkboxLabels = await (await checkboxGroupPage.stringValueCheckboxLabelArr).slice(24, 28);

            await checkLabels(checkboxLabels, checkboxGPData.sportsArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });
    });

    describe('Checkbox Group created From List of Objects.', () => {
        it('should check that each group and checkbox have labels', async () => {
            const checkboxGroupCount = await checkboxGroupPage.objectValuecheckboxGroupsArr.count();
            const groupLabelsCount = await checkboxGroupPage.objectValuecheckboxGroupLabelsArr.count();
            const checkboxCount = await checkboxGroupPage.objectValueCheckboxesArr.count();
            const checkboxLabelCount = await checkboxGroupPage.objectValueCheckboxLabelArr.count();

            await expect(checkboxGroupCount).toEqual(groupLabelsCount);
            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive inline checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(0, 4);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(0, 4);

            await checkLabels(checkboxLabels, checkboxGPData.programmingLanguagesArr);
            await checkFocusState(inlineCheckboxes[0]);
            await checkHoverState(inlineCheckboxes[0]);
            await checkMarkingCheckbox(await inlineCheckboxes);
            await checkIfDisabled(inlineCheckboxes[1], 'aria-disabled', 'true');
            await checkIfDisabled(inlineCheckboxes[3], 'aria-disabled', 'true');
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(4, 7);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(4, 7);

            await checkLabels(checkboxLabels, checkboxGPData.countriesArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            const preselectionFormGroupCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(7, 10);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(7, 10);

            await checkLabels(checkboxLabels, checkboxGPData.countriesArr);
            await checkFocusState(preselectionFormGroupCheckboxes[0]);
            await checkHoverState(preselectionFormGroupCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionFormGroupCheckboxes);
        });

        it('should check reactive lookup key and display key usages checkboxes', async () => {
            const itemsCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(10, 13);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(10, 13);

            await checkLabels(checkboxLabels, checkboxGPData.itemsArr);
            await checkHoverState(itemsCheckboxes[0]);
            await checkFocusState(itemsCheckboxes[0]);
            await checkMarkingCheckbox(await itemsCheckboxes);
        });

        it('should check reactive disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(13, 16);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(13, 16);

            await checkLabels(checkboxLabels, checkboxGPData.countriesArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });

        it('should check template inline checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(16, 20);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(16, 20);

            await checkLabels(checkboxLabels, checkboxGPData.programmingLanguagesArr);
            await checkFocusState(inlineCheckboxes[0]);
            await checkHoverState(inlineCheckboxes[0]);
            await checkMarkingCheckbox(await inlineCheckboxes);
            await checkIfDisabled(inlineCheckboxes[1], 'aria-disabled', 'true');
            await checkIfDisabled(inlineCheckboxes[3], 'aria-disabled', 'true');
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(20, 23);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(20, 23);

            await checkLabels(checkboxLabels, checkboxGPData.countriesArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check template lookup key and display key usages checkboxes', async () => {
            const itemsCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(23, 26);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(23, 26);

            await checkLabels(checkboxLabels, checkboxGPData.itemsArr);
            await checkHoverState(itemsCheckboxes[0]);
            await checkFocusState(itemsCheckboxes[0]);
            await checkMarkingCheckbox(await itemsCheckboxes);
        });

        it('should check reactive disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.objectValueCheckboxesArr).slice(26, 29);
            const checkboxLabels = await (await checkboxGroupPage.objectValueCheckboxLabelArr).slice(26, 29);

            await checkLabels(checkboxLabels, checkboxGPData.countriesArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });
    });

    describe('Checkbox Group created From content projected Checkboxes.', () => {
        it('should check that each group and checkbox have labels', async () => {
            const checkboxGroupCount = await checkboxGroupPage.projectedValuecheckboxGroupsArr.count();
            const groupLabelsCount = await checkboxGroupPage.projectedValuecheckboxGroupLabelsArr.count();
            const checkboxCount = await checkboxGroupPage.projectedValueCheckboxesArr.count();
            const checkboxLabelCount = await checkboxGroupPage.projectedValueCheckboxLabelArr.count();

            await expect(checkboxGroupCount).toEqual(groupLabelsCount);
            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check reactive checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(0, 4);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(0, 4);

            await checkLabels(checkboxLabels, checkboxGPData.fourFruitsArr);
            await checkFocusState(inlineCheckboxes[1]);
            await checkHoverState(inlineCheckboxes[1]);
            await checkMarkingCheckbox(await inlineCheckboxes);
            await checkIfDisabled(inlineCheckboxes[0], 'aria-disabled', 'true');
            await checkIfDisabled(inlineCheckboxes[2], 'aria-disabled', 'true');
        });

        it('should check reactive pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(4, 8);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(4, 8);

            await checkLabels(checkboxLabels, checkboxGPData.hobbiesArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check reactive pre-selection based on value passed from formGroup checkboxes', async () => {
            const preselectionFormGroupCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(8, 12);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(8, 12);

            await checkLabels(checkboxLabels, checkboxGPData.europeanCountriesArr);
            await checkFocusState(preselectionFormGroupCheckboxes[0]);
            await checkHoverState(preselectionFormGroupCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionFormGroupCheckboxes);
        });

        it('should check reactive disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(12, 16);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(12, 16);

            await checkLabels(checkboxLabels, checkboxGPData.europeanCountriesArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });

        it('should check template inline checkboxes', async () => {
            const inlineCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(16, 20);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(16, 20);

            await checkLabels(checkboxLabels, checkboxGPData.subjectsArr);
            await checkFocusState(inlineCheckboxes[1]);
            await checkHoverState(inlineCheckboxes[1]);
            await checkMarkingCheckbox(await inlineCheckboxes);
            await checkIfDisabled(inlineCheckboxes[0], 'aria-disabled', 'true');
            await checkIfDisabled(inlineCheckboxes[3], 'aria-disabled', 'true');
        });

        it('should check template pre-selection based on value passed checkboxes', async () => {
            const preselectionCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(20, 24);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(20, 24);

            await checkLabels(checkboxLabels, checkboxGPData.reptilesArr);
            await checkFocusState(preselectionCheckboxes[0]);
            await checkHoverState(preselectionCheckboxes[0]);
            await checkMarkingCheckbox(await preselectionCheckboxes);
        });

        it('should check template disabled checkboxes', async () => {
            const disabledGroupCheckboxes = await (await checkboxGroupPage.projectedValueCheckboxesArr).slice(24, 28);
            const checkboxLabels = await (await checkboxGroupPage.projectedValueCheckboxLabelArr).slice(24, 28);

            await checkLabels(checkboxLabels, checkboxGPData.europeanCountriesArr);
            await disabledGroupCheckboxes.forEach(async element => {
                await checkIfDisabled(element, 'aria-disabled', 'true');
            });
        });
    });

    describe('Checkbox Group handling of Form Validation and Error Message Display.', () => {
        it('should check that each group and checkbox have labels', async () => {
            const checkboxGroupCount = await checkboxGroupPage.formValidationcheckboxGroupsArr.count();
            const groupLabelsCount = await checkboxGroupPage.formValidationcheckboxGroupLabelsArr.count();
            const checkboxCount = await checkboxGroupPage.formValidationCheckboxesArr.count();
            const checkboxLabelCount = await checkboxGroupPage.formValidationCheckboxLabelArr.count();

            await expect(checkboxGroupCount).toEqual(groupLabelsCount);
            await expect(checkboxCount).toEqual(checkboxLabelCount);
        });

        it('should check Checkbox group created from passed checkboxes and value is required', async () => {
            const checkboxes = await (await checkboxGroupPage.formValidationCheckboxesArr).slice(0, 3);
            const checkboxLabels = await (await checkboxGroupPage.formValidationCheckboxLabelArr).slice(0, 3);
            const sectionTitlesArr = await checkboxGroupPage.sectiontitle;

            await clickByMouseMove(checkboxes[1]);
            await checkBorderColor(await checkboxes, checkboxGPData.errorBorderStyle);

            await clickByMouseMove(await sectionTitlesArr[2]);
            await expect(await checkErrorTooltip(await checkboxes[0],
                await checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

             await checkLabels(checkboxLabels, checkboxGPData.threeFruitsArr);
             await checkFocusState(checkboxes[0]);
             await checkHoverState(checkboxes[0]);
             await checkMarkingCheckbox(await checkboxes);
        });

        it('should check Checkbox group created from list of values and value is required', async () => {
            const checkboxes = await (await checkboxGroupPage.formValidationCheckboxesArr).slice(3, 6);
            const checkboxLabels = await (await checkboxGroupPage.formValidationCheckboxLabelArr).slice(3, 6);
            const sectionTitlesArr = await checkboxGroupPage.sectiontitle;

            // get checkbox error color and tooltip
            await clickByMouseMove(checkboxes[1]);
            // click twice to mark and unmark box to get error state
            await clickByMouseMove(checkboxes[1]);
            await checkboxes.forEach(async element => {
                await expect(await element.getCssValue('border-color')).toEqual(checkboxGPData.errorBorderStyle);
            });
            // needed for getting the tooltip in next line
            await clickByMouseMove(await sectionTitlesArr[1]);
            await expect(checkErrorTooltip(await checkboxes[0],
                await checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

           await checkLabels(checkboxLabels, checkboxGPData.threeFruitsArr);
           await checkFocusState(checkboxes[1]);
           await checkHoverState(checkboxes[0]);
           await checkMarkingCheckbox(await checkboxes);
        });

        it('should check Checkbox group created from list of values and value is required', async () => {
            const checkboxes = await (await checkboxGroupPage.formValidationCheckboxesArr).slice(6, 10);
            const checkboxLabels = await (await checkboxGroupPage.formValidationCheckboxLabelArr).slice(6, 10);
            const sectionTitlesArr = await checkboxGroupPage.sectiontitle;

            // get checkbox error color and tooltip
            await clickByMouseMove(checkboxes[0]);
            // click twice to mark and unmark box to get error state
            await clickByMouseMove(checkboxes[0]);
            await checkboxes.forEach(async element => {
                await expect(await element.getCssValue('border-color')).toEqual(checkboxGPData.errorBorderStyle);
            });
            // needed for getting the tooltip in next line
            await clickByMouseMove(await sectionTitlesArr[1]);
            await expect(checkErrorTooltip(await checkboxes[0],
                await checkboxGroupPage.errorTooltip)).toEqual(checkboxGPData.errorTooltipMessage);

            await checkLabels(checkboxLabels, checkboxGPData.programmingLanguagesArr);
            await checkFocusState(checkboxes[0]);
            await checkHoverState(checkboxes[0]);
            await checkMarkingCheckbox(await checkboxes);
            await checkIfDisabled(checkboxes[1], 'aria-disabled', 'true');
            await checkIfDisabled(checkboxes[3], 'aria-disabled', 'true');
        });
    });

    describe('check example orientation', () => {
        it('should check LTR orientation', async () => {
            const areaContainersArray = await checkboxGroupPage.exampleAreaContainersArr;

            areaContainersArray.forEach(element => {
                expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
            });
        });

        it('should check RTL orientation', async () => {
            await checkboxGroupPage.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await checkboxGroupPage.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
            });
        });
    });
});
