import { RadioButtonGroupPage } from '../pages/radio-button-group.po';
import {
    browserIsFirefox,
    click, elementArray,
    getAttributeByName,
    getElementArrayLength, getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';

import {
    radioButtonWithDefaultStateAndSelectionIndex,
    orientation,
    winterValue,
    radioButtonInlineCozyRadioGroup,
    radioButtonWithDefaultPropertyValues,
    radioButtonWithDisabledButtonAndValidationError,
    januaryValue,
    monthNames,
    resetDisabledValidationGroupButtonIndex,
    marchIndex,
    radioButtonUsingFormGroupAndFormControl,
    marchValue,
    radioButtonInlineWithDefaultSelection,
    radioButtonInlineCompact,
    radioButtonWithDisabledItem,
    radioButtonHaveValidationError,
    resetHaveValidationErrorIndex,
    radioButtonWithNoSelectionValue,
    noneValue,
    radioButtonWithFormGroupAndFormControl,
    radioButtonWithPreSelection,
    radioButtonWithGivenListOfStringValues,
    radioButtonWithListOfSelectItemObjects,
    resetListOfSelectitemObjectIndex,
    seasonsNames,
    radioButtonVertical,
    resetVerticalRadioGroupButtonIndex,
    resetQualificationFormButtonIndex,
    radioButtonWithSelectItemsFormGroupAndFormControl,
    radioButtonVerticalQualificationForm,
    autumnIndex,
    autumnValue,
    radioButtonWithPreSelectionOnObjectDataPassed,
    springIndex,
    springValue,
    radioButtonWithPreSelectionBasedOnControlValue,
    platformRadioButtonWithSelectiemObject,
    samsungValue,
    radioButtonWithLookupKeyAndDisplayKey,
    radioButtonWithDisabledContentAndFormcontrol,
    radioButtonWithSomeDisabledButtons,
    radioButtonCreatedFromList,
    radioButtonDisabledWithSelectedItem,
    radioButtonWithDisabledButtonsFromSelectitemObject,
    radioButtonWithDisabledButtonsDrivenForm,
    radioButtonWithIndividualButtonDisabled,
    radioButtonDisabledCreatedFromList,
    radioButtonDisabledCreatedFromSelectItem,
    radioButtonWithDisabledItemsCreatedFromSelectItem,
    submitDisabledRadioButtonWithValidationErrorIndex,
    submitRadioButtonHaveValidationError,
    submitRadioButtonWithListOfSelectItemObjects,
    ariaChecked,
    ngReflectIsDisabled

} from '../fixtures/testData/radio-button-group';

describe('Radio button group  Test Suite', function() {
    const radioButtonGroupPage: RadioButtonGroupPage = new RadioButtonGroupPage();
    const {
        formGroup, selectedValueLabel, preferredBrandLabel, radioButtonInputByName, radioButtonLabelByName, actionButtonByName
    } = radioButtonGroupPage;

    beforeAll(() => {
        radioButtonGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    it('Verify Radio button buttons can be aligned vertically and horizontally.', () => {
        const groupButtons = elementArray(formGroup);
        for (let i = 1; i < groupButtons.length; i++) {
            expect(orientation).toContain(getAttributeByName(formGroup, 'aria-orientation', i));
        }

    });

    it('Compact radio group with "default" state and with default selection', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithDefaultStateAndSelectionIndex));
        click(radioButtonLabelByName(radioButtonWithDefaultStateAndSelectionIndex));
        expect(getText(selectedValueLabel)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName()
            , ariaChecked)).toBe('true');
    });

    it('Verify Inline cozy radio group', () => {
        scrollIntoView(radioButtonInputByName(radioButtonInlineCozyRadioGroup));
        click(radioButtonLabelByName(radioButtonInlineCozyRadioGroup));
        expect(getText(selectedValueLabel, radioButtonInlineCozyRadioGroup)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonInlineCozyRadioGroup)
            , ariaChecked)).toBe('true');
    });

    it('Verify radio group with default property values', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithDefaultPropertyValues));
        click(radioButtonLabelByName(radioButtonWithDefaultPropertyValues));
        expect(getText(selectedValueLabel, radioButtonWithDefaultPropertyValues)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDefaultPropertyValues)
            , ariaChecked)).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        click(radioButtonLabelByName(radioButtonWithDisabledButtonAndValidationError));
        expect(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError)).toContain(januaryValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError)
            , ariaChecked)).toBe('true');
        click(actionButtonByName(resetDisabledValidationGroupButtonIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError));
    });


    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByName(radioButtonUsingFormGroupAndFormControl));
        click(radioButtonLabelByName(radioButtonUsingFormGroupAndFormControl), marchIndex);
        expect(getText(selectedValueLabel, radioButtonUsingFormGroupAndFormControl)).toContain(marchValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonUsingFormGroupAndFormControl)
            , ngReflectIsDisabled)).toBe('true');
        expect(getAttributeByName(radioButtonInputByName(radioButtonUsingFormGroupAndFormControl)
            , ariaChecked, marchIndex)).toBe('true');
    });

    it('Verify inline compact radio group with default selection', () => {
        scrollIntoView(radioButtonInputByName(radioButtonInlineWithDefaultSelection));
        click(radioButtonLabelByName(radioButtonInlineWithDefaultSelection));
        expect(getText(selectedValueLabel, radioButtonInlineWithDefaultSelection)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonInlineWithDefaultSelection)
            , ariaChecked)).toBe('true');

    });

    it('Verify inline compact radio group', () => {
        scrollIntoView(radioButtonInputByName(radioButtonInlineCompact));
        click(radioButtonLabelByName(radioButtonInlineCompact));
        expect(getText(selectedValueLabel, radioButtonInlineCompact)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonInlineCompact)
            , ariaChecked)).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledItem));
        click(radioButtonLabelByName(radioButtonWithDisabledItem), marchIndex);
        expect(getText(selectedValueLabel, radioButtonWithDisabledItem)).toContain(marchValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItem)
            , ngReflectIsDisabled)).toBe('true');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItem)
            , ariaChecked, marchIndex)).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonHaveValidationError));
        click(radioButtonLabelByName(radioButtonHaveValidationError));
        expect(getText(selectedValueLabel, radioButtonHaveValidationError).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonHaveValidationError)
            , ariaChecked)).toBe('true');
        click(actionButtonByName(resetHaveValidationErrorIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonHaveValidationError));
    });

    it('Verify platform radio button with None (No selection) value created as an Option', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithNoSelectionValue));
        click(radioButtonLabelByName(radioButtonWithNoSelectionValue));
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(noneValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithNoSelectionValue)
            , ariaChecked)).toBe('true');
        click(radioButtonLabelByName(radioButtonWithNoSelectionValue), 1);
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithNoSelectionValue)
            , ariaChecked, 1)).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl with List of String Values', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithFormGroupAndFormControl));
        click(radioButtonLabelByName(radioButtonWithFormGroupAndFormControl));
        expect(getText(selectedValueLabel, radioButtonWithFormGroupAndFormControl).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithFormGroupAndFormControl)
            , ariaChecked)).toBe('true');
    });

    it('Verify Creating platform radio button with list of string values also pre-selection based on control value', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithPreSelection));
        click(radioButtonLabelByName(radioButtonWithPreSelection));
        expect(getText(selectedValueLabel, radioButtonWithPreSelection).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithPreSelection)
            , ariaChecked)).toBe('true');
    });

    it('Verify Creating platform radio button with given list of string values', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithGivenListOfStringValues));
        click(radioButtonLabelByName(radioButtonWithGivenListOfStringValues));
        expect(getText(selectedValueLabel, radioButtonWithGivenListOfStringValues).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithGivenListOfStringValues)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        click(radioButtonLabelByName(radioButtonWithListOfSelectItemObjects));
        expect(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithListOfSelectItemObjects)
            , ariaChecked)).toBe('true');
        click(actionButtonByName(resetListOfSelectitemObjectIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects));
    });

    it('Verify Vertical radio group', () => {
        scrollIntoView(radioButtonInputByName(radioButtonVertical));
        click(radioButtonLabelByName(radioButtonVertical));
        expect(getText(selectedValueLabel, radioButtonVertical)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonVertical)
            , ariaChecked)).toBe('true');
        click(actionButtonByName(resetVerticalRadioGroupButtonIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonVertical));
    });

    it('Verify qualification form', () => {
        scrollIntoView(radioButtonInputByName(radioButtonVerticalQualificationForm));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonVerticalQualificationForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            click(radioButtonLabelByName(radioButtonVerticalQualificationForm), i);
            expect(getAttributeByName(radioButtonInputByName(radioButtonVerticalQualificationForm)
                , ariaChecked, i)).toBe('true');
        }
        click(actionButtonByName(resetQualificationFormButtonIndex));
    });

    it('Verify compact platform radio button created with given list of SelectItem objects.Using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithSelectItemsFormGroupAndFormControl));
        click(radioButtonLabelByName(radioButtonWithSelectItemsFormGroupAndFormControl), autumnIndex);
        expect(getText(selectedValueLabel, radioButtonWithSelectItemsFormGroupAndFormControl - 4)).toContain(autumnValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithSelectItemsFormGroupAndFormControl)
            , ariaChecked, autumnIndex)).toBe('true');
    });

    it('Verify platform radio button creation and pre-selection based on object data passed.', () => {
        expect(getText(selectedValueLabel, 15)).toContain(springValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed)
            , ariaChecked, springIndex)).toBe('true');
        scrollIntoView(radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed));
        click(radioButtonLabelByName(radioButtonWithPreSelectionOnObjectDataPassed));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionOnObjectDataPassed - 4)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects also pre-selection based on control value', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithPreSelectionBasedOnControlValue));
        click(radioButtonLabelByName(radioButtonWithPreSelectionBasedOnControlValue));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionBasedOnControlValue - 5)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithPreSelectionBasedOnControlValue)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio button created with given list of SelectItem objects', () => {
        scrollIntoView(radioButtonInputByName(platformRadioButtonWithSelectiemObject));
        click(radioButtonLabelByName(platformRadioButtonWithSelectiemObject));
        expect(getText(selectedValueLabel, platformRadioButtonWithSelectiemObject - 5)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByName(platformRadioButtonWithSelectiemObject)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform Radio Button created from Invoice objects. Using LookupKey and DisplayKey.', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithLookupKeyAndDisplayKey));
        click(radioButtonLabelByName(radioButtonWithLookupKeyAndDisplayKey));
        expect(getText(preferredBrandLabel)).toContain(samsungValue);
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithLookupKeyAndDisplayKey)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol));
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithSomeDisabledButtons));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithSomeDisabledButtons)
            , ngReflectIsDisabled, 2)).toBe('true');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithSomeDisabledButtons)
            , ngReflectIsDisabled, 3)).toBe('true');
        click(radioButtonLabelByName(platformRadioButtonWithSelectiemObject));
        expect(getAttributeByName(radioButtonInputByName(platformRadioButtonWithSelectiemObject)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio button created from list of string values', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonCreatedFromList));
        scrollIntoView(radioButtonInputByName(radioButtonCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonCreatedFromList)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and FormContol is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledWithSelectedItem));
        scrollIntoView(radioButtonInputByName(radioButtonDisabledWithSelectedItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonDisabledWithSelectedItem)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and some items are disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject));
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , ngReflectIsDisabled)).toBe('false');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , ngReflectIsDisabled, 1)).toBe('false');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , ariaChecked, 1)).toBe('true');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and group is disabled', () => {
        if (browserIsFirefox()) {
            console.log('Skip for FF');
            return
        }
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm));
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and individual radio button is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithIndividualButtonDisabled));
        scrollIntoView(radioButtonInputByName(radioButtonWithIndividualButtonDisabled));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , ngReflectIsDisabled)).toBe('false');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , ngReflectIsDisabled, 1)).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
                , ngReflectIsDisabled, i)).toBe('true');
        }
        click(radioButtonLabelByName(radioButtonWithIndividualButtonDisabled));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , ariaChecked)).toBe('true');
    });

    it('Verify platform radio buttons created from list of string values and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledCreatedFromList));
        scrollIntoView(radioButtonInputByName(radioButtonDisabledCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonDisabledCreatedFromList)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem));
        scrollIntoView(radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem)
                , ngReflectIsDisabled, i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and individual item has disabled property', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , ngReflectIsDisabled)).toBe('false');
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , ngReflectIsDisabled, 1)).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
                , ngReflectIsDisabled, i)).toBe('true');
        }
        click(radioButtonLabelByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(getAttributeByName(radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , ariaChecked)).toBe('true');
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonHaveValidationError));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonHaveValidationError));
        click(actionButtonByName(submitRadioButtonHaveValidationError));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        click(actionButtonByName(submitDisabledRadioButtonWithValidationErrorIndex));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        click(actionButtonByName(submitRadioButtonWithListOfSelectItemObjects));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('should be able to switch to rtl', () => {
        radioButtonGroupPage.checkRtlSwitch();
    });
});
