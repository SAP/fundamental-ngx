import { RadioButtonGroupPage } from '../pages/radio-button-group.po';
import {
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
    submitRadioButtonWithListOfSelectItemObjects

} from '../fixtures/testData/radio-button-group';

describe('Radio button group  Test Suite', function() {
    const radioButtonGroupPage: RadioButtonGroupPage = new RadioButtonGroupPage();
    const {
        formGroup, selectedValueLabel, preferredBrandLabel
    } = radioButtonGroupPage;

    beforeAll(() => {
        radioButtonGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    });

    it('Verify Radio button buttons can be aligned vertically and horizontally.', () => {
        const groupButtons = elementArray(formGroup);
        for (let i = 1; i < groupButtons.length; i++) {
            expect(orientation).toContain(getAttributeByName(formGroup, 'aria-orientation', i));
        }

    });

    it('Compact radio group with "default" state and with default selection', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDefaultStateAndSelectionIndex));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithDefaultStateAndSelectionIndex));
        expect(getText(selectedValueLabel)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName()
            , 'aria-checked')).toBe('true');
    });

    it('Verify Inline cozy radio group', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineCozyRadioGroup));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonInlineCozyRadioGroup));
        expect(getText(selectedValueLabel, radioButtonInlineCozyRadioGroup)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineCozyRadioGroup)
            , 'aria-checked')).toBe('true');
    });

    it('Verify radio group with default property values', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDefaultPropertyValues));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithDefaultPropertyValues));
        expect(getText(selectedValueLabel, radioButtonWithDefaultPropertyValues)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDefaultPropertyValues)
            , 'aria-checked')).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithDisabledButtonAndValidationError));
        expect(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError)).toContain(januaryValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError)
            , 'aria-checked')).toBe('true');
        click(radioButtonGroupPage.actionButtonByName(resetDisabledValidationGroupButtonIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError));
    });


    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonUsingFormGroupAndFormControl));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonUsingFormGroupAndFormControl), marchIndex);
        expect(getText(selectedValueLabel, radioButtonUsingFormGroupAndFormControl)).toContain(marchValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonUsingFormGroupAndFormControl)
            , 'ng-reflect-is-disabled')).toBe('true');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonUsingFormGroupAndFormControl)
            , 'aria-checked', marchIndex)).toBe('true');
    });

    it('Verify inline compact radio group with default selection', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineWithDefaultSelection));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonInlineWithDefaultSelection));
        expect(getText(selectedValueLabel, radioButtonInlineWithDefaultSelection)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineWithDefaultSelection)
            , 'aria-checked')).toBe('true');

    });

    it('Verify inline compact radio group', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineCompact));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonInlineCompact));
        expect(getText(selectedValueLabel, radioButtonInlineCompact)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonInlineCompact)
            , 'aria-checked')).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItem));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithDisabledItem), marchIndex);
        expect(getText(selectedValueLabel, radioButtonWithDisabledItem)).toContain(marchValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItem)
            , 'ng-reflect-is-disabled')).toBe('true');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItem)
            , 'aria-checked', marchIndex)).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonHaveValidationError));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonHaveValidationError));
        expect(getText(selectedValueLabel, radioButtonHaveValidationError).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonHaveValidationError)
            , 'aria-checked')).toBe('true');
        click(radioButtonGroupPage.actionButtonByName(resetHaveValidationErrorIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonHaveValidationError));
    });

    it('Verify platform radio button with None (No selection) value created as an Option', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithNoSelectionValue));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithNoSelectionValue));
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(noneValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithNoSelectionValue)
            , 'aria-checked')).toBe('true');
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithNoSelectionValue), 1);
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithNoSelectionValue)
            , 'aria-checked', 1)).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl with List of String Values', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithFormGroupAndFormControl));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithFormGroupAndFormControl));
        expect(getText(selectedValueLabel, radioButtonWithFormGroupAndFormControl).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithFormGroupAndFormControl)
            , 'aria-checked')).toBe('true');
    });

    it('Verify Creating platform radio button with list of string values also pre-selection based on control value', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelection));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithPreSelection));
        expect(getText(selectedValueLabel, radioButtonWithPreSelection).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelection)
            , 'aria-checked')).toBe('true');
    });

    it('Verify Creating platform radio button with given list of string values', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithGivenListOfStringValues));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithGivenListOfStringValues));
        expect(getText(selectedValueLabel, radioButtonWithGivenListOfStringValues).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithGivenListOfStringValues)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithListOfSelectItemObjects));
        expect(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithListOfSelectItemObjects)
            , 'aria-checked')).toBe('true');
        click(radioButtonGroupPage.actionButtonByName(resetListOfSelectitemObjectIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects));
    });

    it('Verify Vertical radio group', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonVertical));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonVertical));
        expect(getText(selectedValueLabel, radioButtonVertical)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonVertical)
            , 'aria-checked')).toBe('true');
        click(radioButtonGroupPage.actionButtonByName(resetVerticalRadioGroupButtonIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonVertical));
    });

    it('Verify qualification form', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonVerticalQualificationForm));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonVerticalQualificationForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            click(radioButtonGroupPage.radioButtonLabelByName(radioButtonVerticalQualificationForm), i);
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonVerticalQualificationForm)
                , 'aria-checked', i)).toBe('true');
        }
        click(radioButtonGroupPage.actionButtonByName(resetQualificationFormButtonIndex));
    });

    it('Verify compact platform radio button created with given list of SelectItem objects.Using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithSelectItemsFormGroupAndFormControl));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithSelectItemsFormGroupAndFormControl), autumnIndex);
        expect(getText(selectedValueLabel, radioButtonWithSelectItemsFormGroupAndFormControl - 4)).toContain(autumnValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithSelectItemsFormGroupAndFormControl)
            , 'aria-checked', autumnIndex)).toBe('true');
    });

    it('Verify platform radio button creation and pre-selection based on object data passed.', () => {
        expect(getText(selectedValueLabel, 15)).toContain(springValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed)
            , 'aria-checked', springIndex)).toBe('true');
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithPreSelectionOnObjectDataPassed));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionOnObjectDataPassed - 4)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelectionOnObjectDataPassed)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects also pre-selection based on control value', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelectionBasedOnControlValue));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithPreSelectionBasedOnControlValue));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionBasedOnControlValue - 5)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithPreSelectionBasedOnControlValue)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio button created with given list of SelectItem objects', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(platformRadioButtonWithSelectiemObject));
        click(radioButtonGroupPage.radioButtonLabelByName(platformRadioButtonWithSelectiemObject));
        expect(getText(selectedValueLabel, platformRadioButtonWithSelectiemObject - 5)).toContain(winterValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(platformRadioButtonWithSelectiemObject)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform Radio Button created from Invoice objects. Using LookupKey and DisplayKey.', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithLookupKeyAndDisplayKey));
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithLookupKeyAndDisplayKey));
        expect(getText(preferredBrandLabel)).toContain(samsungValue);
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithLookupKeyAndDisplayKey)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledContentAndFormcontrol)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithSomeDisabledButtons));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithSomeDisabledButtons)
            , 'ng-reflect-is-disabled', 2)).toBe('true');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithSomeDisabledButtons)
            , 'ng-reflect-is-disabled', 3)).toBe('true');
        click(radioButtonGroupPage.radioButtonLabelByName(platformRadioButtonWithSelectiemObject));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(platformRadioButtonWithSelectiemObject)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio button created from list of string values', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonCreatedFromList));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonCreatedFromList)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and FormContol is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledWithSelectedItem));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledWithSelectedItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledWithSelectedItem)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and some items are disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , 'ng-reflect-is-disabled')).toBe('false');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , 'ng-reflect-is-disabled', 1)).toBe('false');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
            , 'aria-checked', 1)).toBe('true');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsFromSelectitemObject)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonsDrivenForm)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and individual radio button is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithIndividualButtonDisabled));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithIndividualButtonDisabled));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , 'ng-reflect-is-disabled')).toBe('false');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , 'ng-reflect-is-disabled', 1)).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithIndividualButtonDisabled));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithIndividualButtonDisabled)
            , 'aria-checked')).toBe('true');
    });

    it('Verify platform radio buttons created from list of string values and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledCreatedFromList));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledCreatedFromList)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonDisabledCreatedFromSelectItem)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and individual item has disabled property', () => {
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , 'ng-reflect-is-disabled')).toBe('false');
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , 'ng-reflect-is-disabled', 1)).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
                , 'ng-reflect-is-disabled', i)).toBe('true');
        }
        click(radioButtonGroupPage.radioButtonLabelByName(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(getAttributeByName(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledItemsCreatedFromSelectItem)
            , 'aria-checked')).toBe('true');
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonHaveValidationError));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonHaveValidationError));
        click(radioButtonGroupPage.actionButtonByName(submitRadioButtonHaveValidationError));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithDisabledButtonAndValidationError));
        click(radioButtonGroupPage.actionButtonByName(submitDisabledRadioButtonWithValidationErrorIndex));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonGroupPage.radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        const radioButtonsLength = getElementArrayLength(radioButtonGroupPage
            .radioButtonInputByName(radioButtonWithListOfSelectItemObjects));
        click(radioButtonGroupPage.actionButtonByName(submitRadioButtonWithListOfSelectItemObjects));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('should be able to switch to rtl', () => {
        radioButtonGroupPage.checkRtlSwitch();
    });
});
