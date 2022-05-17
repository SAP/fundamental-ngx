import { RadioButtonGroupPage } from '../pages/radio-button-group.po';
import {
    browserIsFirefox,
    click,
    elementArray,
    getAttributeByName,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
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

describe('Radio button group  Test Suite', () => {
    const radioButtonGroupPage: RadioButtonGroupPage = new RadioButtonGroupPage();
    const {
        formGroup,
        selectedValueLabel,
        preferredBrandLabel,
        radioButtonInputByIndex,
        radioButtonLabelByIndex,
        actionButtonByIndex
    } = radioButtonGroupPage;

    beforeAll(() => {
        radioButtonGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage(true);
        waitForPresent(radioButtonGroupPage.root);
        waitForElDisplayed(radioButtonGroupPage.title);
    }, 2);

    it('Verify Radio button buttons can be aligned vertically and horizontally.', () => {
        const groupButtons = elementArray(formGroup);
        for (let i = 1; i < groupButtons.length; i++) {
            expect(orientation).toContain(getAttributeByName(formGroup, 'aria-orientation', i));
        }
    });

    it('Compact radio group with "default" state and with default selection', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDefaultStateAndSelectionIndex));
        click(radioButtonLabelByIndex(radioButtonWithDefaultStateAndSelectionIndex));
        expect(getText(selectedValueLabel)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(), ariaChecked)).toBe('true');
    });

    it('Verify Inline cozy radio group', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonInlineCozyRadioGroup));
        click(radioButtonLabelByIndex(radioButtonInlineCozyRadioGroup));
        expect(getText(selectedValueLabel, radioButtonInlineCozyRadioGroup)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonInlineCozyRadioGroup), ariaChecked)).toBe('true');
    });

    it('Verify radio group with default property values', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDefaultPropertyValues));
        click(radioButtonLabelByIndex(radioButtonWithDefaultPropertyValues));
        expect(getText(selectedValueLabel, radioButtonWithDefaultPropertyValues)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithDefaultPropertyValues), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError));
        click(radioButtonLabelByIndex(radioButtonWithDisabledButtonAndValidationError));
        expect(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError)).toContain(januaryValue);
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError), ariaChecked)
        ).toBe('true');
        click(actionButtonByIndex(resetDisabledValidationGroupButtonIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError));
    });

    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl));
        click(radioButtonLabelByIndex(radioButtonUsingFormGroupAndFormControl), marchIndex);
        expect(getText(selectedValueLabel, radioButtonUsingFormGroupAndFormControl)).toContain(marchValue);
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl), ngReflectIsDisabled)
        ).toBe('true');
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl),
                ariaChecked,
                marchIndex
            )
        ).toBe('true');
    });

    it('Verify inline compact radio group with default selection', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonInlineWithDefaultSelection));
        click(radioButtonLabelByIndex(radioButtonInlineWithDefaultSelection));
        expect(getText(selectedValueLabel, radioButtonInlineWithDefaultSelection)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonInlineWithDefaultSelection), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify inline compact radio group', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonInlineCompact));
        click(radioButtonLabelByIndex(radioButtonInlineCompact));
        expect(getText(selectedValueLabel, radioButtonInlineCompact)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonInlineCompact), ariaChecked)).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledItem));
        click(radioButtonLabelByIndex(radioButtonWithDisabledItem), marchIndex);
        expect(getText(selectedValueLabel, radioButtonWithDisabledItem)).toContain(marchValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledItem), ngReflectIsDisabled)).toBe(
            'true'
        );
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledItem), ariaChecked, marchIndex)).toBe(
            'true'
        );
    });

    it('Verify radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonHaveValidationError));
        click(radioButtonLabelByIndex(radioButtonHaveValidationError));
        expect(getText(selectedValueLabel, radioButtonHaveValidationError).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonHaveValidationError), ariaChecked)).toBe('true');
        click(actionButtonByIndex(resetHaveValidationErrorIndex));
        expect(monthNames).not.toContain(getText(selectedValueLabel, radioButtonHaveValidationError));
    });

    it('Verify platform radio button with None (No selection) value created as an Option', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithNoSelectionValue));
        click(radioButtonLabelByIndex(radioButtonWithNoSelectionValue));
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(noneValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithNoSelectionValue), ariaChecked)).toBe('true');
        click(radioButtonLabelByIndex(radioButtonWithNoSelectionValue), 1);
        expect(getText(selectedValueLabel, radioButtonWithNoSelectionValue).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithNoSelectionValue), ariaChecked, 1)).toBe(
            'true'
        );
    });

    it('Verify radio group using FormGroup and FormControl with List of String Values', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithFormGroupAndFormControl));
        click(radioButtonLabelByIndex(radioButtonWithFormGroupAndFormControl));
        expect(getText(selectedValueLabel, radioButtonWithFormGroupAndFormControl).toLowerCase()).toContain(
            winterValue
        );
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithFormGroupAndFormControl), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify Creating platform radio button with list of string values also pre-selection based on control value', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelection));
        click(radioButtonLabelByIndex(radioButtonWithPreSelection));
        expect(getText(selectedValueLabel, radioButtonWithPreSelection).toLowerCase()).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithPreSelection), ariaChecked)).toBe('true');
    });

    it('Verify Creating platform radio button with given list of string values', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithGivenListOfStringValues));
        click(radioButtonLabelByIndex(radioButtonWithGivenListOfStringValues));
        expect(getText(selectedValueLabel, radioButtonWithGivenListOfStringValues).toLowerCase()).toContain(
            winterValue
        );
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithGivenListOfStringValues), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify platform radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects));
        click(radioButtonLabelByIndex(radioButtonWithListOfSelectItemObjects));
        expect(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects), ariaChecked)).toBe(
            'true'
        );
        click(actionButtonByIndex(resetListOfSelectitemObjectIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects));
    });

    it('Verify Vertical radio group', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonVertical));
        click(radioButtonLabelByIndex(radioButtonVertical));
        expect(getText(selectedValueLabel, radioButtonVertical)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonVertical), ariaChecked)).toBe('true');
        click(actionButtonByIndex(resetVerticalRadioGroupButtonIndex));
        expect(seasonsNames).not.toContain(getText(selectedValueLabel, radioButtonVertical));
    });

    it('Verify qualification form', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonVerticalQualificationForm));
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonVerticalQualificationForm)
        );
        for (let i = 0; i < radioButtonsLength; i++) {
            click(radioButtonLabelByIndex(radioButtonVerticalQualificationForm), i);
            expect(
                getAttributeByName(radioButtonInputByIndex(radioButtonVerticalQualificationForm), ariaChecked, i)
            ).toBe('true');
        }
        click(actionButtonByIndex(resetQualificationFormButtonIndex));
    });

    it('Verify compact platform radio button created with given list of SelectItem objects.Using FormGroup and FormControl', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithSelectItemsFormGroupAndFormControl));
        click(radioButtonLabelByIndex(radioButtonWithSelectItemsFormGroupAndFormControl), autumnIndex);
        expect(getText(selectedValueLabel, radioButtonWithSelectItemsFormGroupAndFormControl - 4)).toContain(
            autumnValue
        );
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithSelectItemsFormGroupAndFormControl),
                ariaChecked,
                autumnIndex
            )
        ).toBe('true');
    });

    it('Verify platform radio button creation and pre-selection based on object data passed.', () => {
        expect(getText(selectedValueLabel, 15)).toContain(springValue);
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed),
                ariaChecked,
                springIndex
            )
        ).toBe('true');
        scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed));
        click(radioButtonLabelByIndex(radioButtonWithPreSelectionOnObjectDataPassed));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionOnObjectDataPassed - 4)).toContain(winterValue);
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects also pre-selection based on control value', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelectionBasedOnControlValue));
        click(radioButtonLabelByIndex(radioButtonWithPreSelectionBasedOnControlValue));
        expect(getText(selectedValueLabel, radioButtonWithPreSelectionBasedOnControlValue - 5)).toContain(winterValue);
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithPreSelectionBasedOnControlValue), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio button created with given list of SelectItem objects', () => {
        scrollIntoView(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject));
        click(radioButtonLabelByIndex(platformRadioButtonWithSelectiemObject));
        expect(getText(selectedValueLabel, platformRadioButtonWithSelectiemObject - 5)).toContain(winterValue);
        expect(getAttributeByName(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify platform Radio Button created from Invoice objects. Using LookupKey and DisplayKey.', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithLookupKeyAndDisplayKey));
        click(radioButtonLabelByIndex(radioButtonWithLookupKeyAndDisplayKey));
        expect(getText(preferredBrandLabel)).toContain(samsungValue);
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithLookupKeyAndDisplayKey), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    xit('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithSomeDisabledButtons));
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithSomeDisabledButtons), ngReflectIsDisabled, 2)
        ).toBe('true');
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithSomeDisabledButtons), ngReflectIsDisabled, 3)
        ).toBe('true');
        click(radioButtonLabelByIndex(platformRadioButtonWithSelectiemObject));
        expect(getAttributeByName(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify platform radio button created from list of string values', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonCreatedFromList)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(radioButtonInputByIndex(radioButtonCreatedFromList), ngReflectIsDisabled, i)
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and FormContol is disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledWithSelectedItem)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonDisabledWithSelectedItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(radioButtonInputByIndex(radioButtonDisabledWithSelectedItem), ngReflectIsDisabled, i)
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and some items are disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject));
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ngReflectIsDisabled
            )
        ).toBe('false');
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ngReflectIsDisabled,
                1
            )
        ).toBe('false');
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ariaChecked,
                1
            )
        ).toBe('true');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and group is disabled', () => {
        if (browserIsFirefox()) {
            console.log('Skip for FF');
            return;
        }
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and individual radio button is disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled));
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled), ngReflectIsDisabled)
        ).toBe('false');
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled), ngReflectIsDisabled, 1)
        ).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
        click(radioButtonLabelByIndex(radioButtonWithIndividualButtonDisabled));
        expect(getAttributeByName(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify platform radio buttons created from list of string values and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledCreatedFromList)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonDisabledCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(radioButtonInputByIndex(radioButtonDisabledCreatedFromList), ngReflectIsDisabled, i)
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and group is disabled', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and individual item has disabled property', () => {
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem)
        );
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                ngReflectIsDisabled
            )
        ).toBe('false');
        expect(
            getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                ngReflectIsDisabled,
                1
            )
        ).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            expect(
                getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
        click(radioButtonLabelByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem));
        expect(
            getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem), ariaChecked)
        ).toBe('true');
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonHaveValidationError));
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonHaveValidationError)
        );
        click(actionButtonByIndex(submitRadioButtonHaveValidationError));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio group with disabled button and validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError));
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError)
        );
        click(actionButtonByIndex(submitDisabledRadioButtonWithValidationErrorIndex));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio buttons created with given list of SelectItem objects and have validation error', () => {
        scrollIntoView(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects));
        const radioButtonsLength = getElementArrayLength(
            radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects)
        );
        click(actionButtonByIndex(submitRadioButtonWithListOfSelectItemObjects));
        for (let i = 0; i < radioButtonsLength; i++) {
            waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    describe('orientation check', () => {
        it('should be able to switch to rtl', () => {
            radioButtonGroupPage.checkRtlSwitch();
        });
    });
});
