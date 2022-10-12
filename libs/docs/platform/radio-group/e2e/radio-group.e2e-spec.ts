import { RadioButtonGroupPage } from './radio-group.po';
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
} from '../../../../../e2e';

import {
    ariaChecked,
    autumnIndex,
    autumnValue,
    januaryValue,
    marchIndex,
    marchValue,
    monthNames,
    ngReflectIsDisabled,
    noneValue,
    orientation,
    platformRadioButtonWithSelectiemObject,
    radioButtonCreatedFromList,
    radioButtonDisabledCreatedFromList,
    radioButtonDisabledCreatedFromSelectItem,
    radioButtonDisabledWithSelectedItem,
    radioButtonHaveValidationError,
    radioButtonInlineCompact,
    radioButtonInlineCozyRadioGroup,
    radioButtonInlineWithDefaultSelection,
    radioButtonUsingFormGroupAndFormControl,
    radioButtonVertical,
    radioButtonVerticalQualificationForm,
    radioButtonWithDefaultPropertyValues,
    radioButtonWithDefaultStateAndSelectionIndex,
    radioButtonWithDisabledButtonAndValidationError,
    radioButtonWithDisabledButtonsDrivenForm,
    radioButtonWithDisabledButtonsFromSelectitemObject,
    radioButtonWithDisabledContentAndFormcontrol,
    radioButtonWithDisabledItem,
    radioButtonWithDisabledItemsCreatedFromSelectItem,
    radioButtonWithFormGroupAndFormControl,
    radioButtonWithGivenListOfStringValues,
    radioButtonWithIndividualButtonDisabled,
    radioButtonWithListOfSelectItemObjects,
    radioButtonWithLookupKeyAndDisplayKey,
    radioButtonWithNoSelectionValue,
    radioButtonWithPreSelection,
    radioButtonWithPreSelectionBasedOnControlValue,
    radioButtonWithPreSelectionOnObjectDataPassed,
    radioButtonWithSelectItemsFormGroupAndFormControl,
    radioButtonWithSomeDisabledButtons,
    resetDisabledValidationGroupButtonIndex,
    resetHaveValidationErrorIndex,
    resetListOfSelectitemObjectIndex,
    resetQualificationFormButtonIndex,
    resetVerticalRadioGroupButtonIndex,
    samsungValue,
    seasonsNames,
    springIndex,
    springValue,
    submitDisabledRadioButtonWithValidationErrorIndex,
    submitRadioButtonHaveValidationError,
    submitRadioButtonWithListOfSelectItemObjects,
    winterValue
} from './radio-group';

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

    beforeAll(async () => {
        await radioButtonGroupPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage(true);
        await waitForPresent(radioButtonGroupPage.root);
        await waitForElDisplayed(radioButtonGroupPage.title);
    }, 2);

    it('Verify Radio button buttons can be aligned vertically and horizontally.', async () => {
        const groupButtons = await elementArray(formGroup);
        for (let i = 1; i < groupButtons.length; i++) {
            await expect(orientation).toContain(await getAttributeByName(formGroup, 'aria-orientation', i));
        }
    });

    it('Compact radio group with "default" state and with default selection', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDefaultStateAndSelectionIndex));
        await click(radioButtonLabelByIndex(radioButtonWithDefaultStateAndSelectionIndex));
        await expect(await getText(selectedValueLabel)).toContain(winterValue);
        await expect(await getAttributeByName(radioButtonInputByIndex(), ariaChecked)).toBe('true');
    });

    it('Verify Inline cozy radio group', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonInlineCozyRadioGroup));
        await click(radioButtonLabelByIndex(radioButtonInlineCozyRadioGroup));
        await expect(await getText(selectedValueLabel, radioButtonInlineCozyRadioGroup)).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonInlineCozyRadioGroup), ariaChecked)
        ).toBe('true');
    });

    it('Verify radio group with default property values', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDefaultPropertyValues));
        await click(radioButtonLabelByIndex(radioButtonWithDefaultPropertyValues));
        await expect(await getText(selectedValueLabel, radioButtonWithDefaultPropertyValues)).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithDefaultPropertyValues), ariaChecked)
        ).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError));
        await click(radioButtonLabelByIndex(radioButtonWithDisabledButtonAndValidationError));
        await expect(await getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError)).toContain(
            januaryValue
        );
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError),
                ariaChecked
            )
        ).toBe('true');
        await click(actionButtonByIndex(resetDisabledValidationGroupButtonIndex));
        await expect(monthNames).not.toContain(
            await getText(selectedValueLabel, radioButtonWithDisabledButtonAndValidationError)
        );
    });

    it('Verify radio group using FormGroup and FormControl', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl));
        await click(radioButtonLabelByIndex(radioButtonUsingFormGroupAndFormControl), marchIndex);
        await expect(await getText(selectedValueLabel, radioButtonUsingFormGroupAndFormControl)).toContain(marchValue);
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl),
                ngReflectIsDisabled
            )
        ).toBe('true');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonUsingFormGroupAndFormControl),
                ariaChecked,
                marchIndex
            )
        ).toBe('true');
    });

    it('Verify inline compact radio group with default selection', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonInlineWithDefaultSelection));
        await click(radioButtonLabelByIndex(radioButtonInlineWithDefaultSelection));
        await expect(await getText(selectedValueLabel, radioButtonInlineWithDefaultSelection)).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonInlineWithDefaultSelection), ariaChecked)
        ).toBe('true');
    });

    it('Verify inline compact radio group', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonInlineCompact));
        await click(radioButtonLabelByIndex(radioButtonInlineCompact));
        await expect(await getText(selectedValueLabel, radioButtonInlineCompact)).toContain(winterValue);
        await expect(await getAttributeByName(radioButtonInputByIndex(radioButtonInlineCompact), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify radio group using FormGroup and FormControl', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledItem));
        await click(radioButtonLabelByIndex(radioButtonWithDisabledItem), marchIndex);
        await expect(await getText(selectedValueLabel, radioButtonWithDisabledItem)).toContain(marchValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledItem), ngReflectIsDisabled)
        ).toBe('true');
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithDisabledItem), ariaChecked, marchIndex)
        ).toBe('true');
    });

    it('Verify radio group with disabled button and validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonHaveValidationError));
        await click(radioButtonLabelByIndex(radioButtonHaveValidationError));
        await expect((await getText(selectedValueLabel, radioButtonHaveValidationError)).toLowerCase()).toContain(
            winterValue
        );
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonHaveValidationError), ariaChecked)
        ).toBe('true');
        await click(actionButtonByIndex(resetHaveValidationErrorIndex));
        await expect(monthNames).not.toContain(await getText(selectedValueLabel, radioButtonHaveValidationError));
    });

    it('Verify platform radio button with None (No selection) value created as an Option', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithNoSelectionValue));
        await click(radioButtonLabelByIndex(radioButtonWithNoSelectionValue));
        await expect((await getText(selectedValueLabel, radioButtonWithNoSelectionValue)).toLowerCase()).toContain(
            noneValue
        );
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithNoSelectionValue), ariaChecked)
        ).toBe('true');
        await click(radioButtonLabelByIndex(radioButtonWithNoSelectionValue), 1);
        await expect((await getText(selectedValueLabel, radioButtonWithNoSelectionValue)).toLowerCase()).toContain(
            winterValue
        );
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithNoSelectionValue), ariaChecked, 1)
        ).toBe('true');
    });

    it('Verify radio group using FormGroup and FormControl with List of String Values', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithFormGroupAndFormControl));
        await click(radioButtonLabelByIndex(radioButtonWithFormGroupAndFormControl));
        await expect(
            (await getText(selectedValueLabel, radioButtonWithFormGroupAndFormControl)).toLowerCase()
        ).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithFormGroupAndFormControl), ariaChecked)
        ).toBe('true');
    });

    it('Verify Creating platform radio button with list of string values also pre-selection based on control value', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelection));
        await click(radioButtonLabelByIndex(radioButtonWithPreSelection));
        await expect((await getText(selectedValueLabel, radioButtonWithPreSelection)).toLowerCase()).toContain(
            winterValue
        );
        await expect(await getAttributeByName(radioButtonInputByIndex(radioButtonWithPreSelection), ariaChecked)).toBe(
            'true'
        );
    });

    it('Verify Creating platform radio button with given list of string values', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithGivenListOfStringValues));
        await click(radioButtonLabelByIndex(radioButtonWithGivenListOfStringValues));
        await expect(
            (await getText(selectedValueLabel, radioButtonWithGivenListOfStringValues)).toLowerCase()
        ).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithGivenListOfStringValues), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects and have validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects));
        await click(radioButtonLabelByIndex(radioButtonWithListOfSelectItemObjects));
        await expect(await getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects)).toContain(winterValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects), ariaChecked)
        ).toBe('true');
        await click(actionButtonByIndex(resetListOfSelectitemObjectIndex));
        await expect(seasonsNames).not.toContain(
            await getText(selectedValueLabel, radioButtonWithListOfSelectItemObjects)
        );
    });

    it('Verify Vertical radio group', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonVertical));
        await click(radioButtonLabelByIndex(radioButtonVertical));
        await expect(await getText(selectedValueLabel, radioButtonVertical)).toContain(winterValue);
        await expect(await getAttributeByName(radioButtonInputByIndex(radioButtonVertical), ariaChecked)).toBe('true');
        await click(actionButtonByIndex(resetVerticalRadioGroupButtonIndex));
        await expect(seasonsNames).not.toContain(await getText(selectedValueLabel, radioButtonVertical));
    });

    it('Verify qualification form', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonVerticalQualificationForm));
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonVerticalQualificationForm)
        );
        for (let i = 0; i < radioButtonsLength; i++) {
            await click(radioButtonLabelByIndex(radioButtonVerticalQualificationForm), i);
            await expect(
                await getAttributeByName(radioButtonInputByIndex(radioButtonVerticalQualificationForm), ariaChecked, i)
            ).toBe('true');
        }
        await click(actionButtonByIndex(resetQualificationFormButtonIndex));
    });

    it('Verify compact platform radio button created with given list of SelectItem objects.Using FormGroup and FormControl', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithSelectItemsFormGroupAndFormControl));
        await click(radioButtonLabelByIndex(radioButtonWithSelectItemsFormGroupAndFormControl), autumnIndex);
        await expect(
            await getText(selectedValueLabel, radioButtonWithSelectItemsFormGroupAndFormControl - 4)
        ).toContain(autumnValue);
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithSelectItemsFormGroupAndFormControl),
                ariaChecked,
                autumnIndex
            )
        ).toBe('true');
    });

    it('Verify platform radio button creation and pre-selection based on object data passed.', async () => {
        await expect(await getText(selectedValueLabel, 15)).toContain(springValue);
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed),
                ariaChecked,
                springIndex
            )
        ).toBe('true');
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed));
        await click(radioButtonLabelByIndex(radioButtonWithPreSelectionOnObjectDataPassed));
        await expect(await getText(selectedValueLabel, radioButtonWithPreSelectionOnObjectDataPassed - 4)).toContain(
            winterValue
        );
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithPreSelectionOnObjectDataPassed),
                ariaChecked
            )
        ).toBe('true');
    });

    it('Verify platform radio buttons created with given list of SelectItem objects also pre-selection based on control value', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithPreSelectionBasedOnControlValue));
        await click(radioButtonLabelByIndex(radioButtonWithPreSelectionBasedOnControlValue));
        await expect(await getText(selectedValueLabel, radioButtonWithPreSelectionBasedOnControlValue - 5)).toContain(
            winterValue
        );
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithPreSelectionBasedOnControlValue),
                ariaChecked
            )
        ).toBe('true');
    });

    it('Verify platform radio button created with given list of SelectItem objects', async () => {
        await scrollIntoView(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject));
        await click(radioButtonLabelByIndex(platformRadioButtonWithSelectiemObject));
        await expect(await getText(selectedValueLabel, platformRadioButtonWithSelectiemObject - 5)).toContain(
            winterValue
        );
        await expect(
            await getAttributeByName(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform Radio Button created from Invoice objects. Using LookupKey and DisplayKey.', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithLookupKeyAndDisplayKey));
        await click(radioButtonLabelByIndex(radioButtonWithLookupKeyAndDisplayKey));
        await expect(await getText(preferredBrandLabel)).toContain(samsungValue);
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithLookupKeyAndDisplayKey), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledContentAndFormcontrol),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    xit('Verify platform radio buttons Passed as content projection and some radio buttons are disabled', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithSomeDisabledButtons));
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithSomeDisabledButtons),
                ngReflectIsDisabled,
                2
            )
        ).toBe('true');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithSomeDisabledButtons),
                ngReflectIsDisabled,
                3
            )
        ).toBe('true');
        await click(radioButtonLabelByIndex(platformRadioButtonWithSelectiemObject));
        await expect(
            await getAttributeByName(radioButtonInputByIndex(platformRadioButtonWithSelectiemObject), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio button created from list of string values', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonCreatedFromList)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(radioButtonInputByIndex(radioButtonCreatedFromList), ngReflectIsDisabled, i)
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and FormContol is disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledWithSelectedItem)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonDisabledWithSelectedItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonDisabledWithSelectedItem),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem objects and some items are disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject));
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ngReflectIsDisabled
            )
        ).toBe('false');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ngReflectIsDisabled,
                1
            )
        ).toBe('false');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                ariaChecked,
                1
            )
        ).toBe('true');
        for (let i = 2; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledButtonsFromSelectitemObject),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and group is disabled', async () => {
        if (await browserIsFirefox()) {
            console.log('Skip for FF');
            return;
        }
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledButtonsDrivenForm),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons passed as content projection and individual radio button is disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled));
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled),
                ngReflectIsDisabled
            )
        ).toBe('false');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled),
                ngReflectIsDisabled,
                1
            )
        ).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
        await click(radioButtonLabelByIndex(radioButtonWithIndividualButtonDisabled));
        await expect(
            await getAttributeByName(radioButtonInputByIndex(radioButtonWithIndividualButtonDisabled), ariaChecked)
        ).toBe('true');
    });

    it('Verify platform radio buttons created from list of string values and group is disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledCreatedFromList)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonDisabledCreatedFromList));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonDisabledCreatedFromList),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and group is disabled', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem));
        for (let i = 0; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonDisabledCreatedFromSelectItem),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
    });

    it('Verify platform radio buttons created from list of SelectItem and individual item has disabled property', async () => {
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem)
        );
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem));
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                ngReflectIsDisabled
            )
        ).toBe('false');
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                ngReflectIsDisabled,
                1
            )
        ).toBe('false');
        for (let i = 2; i < radioButtonsLength; i++) {
            await expect(
                await getAttributeByName(
                    radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                    ngReflectIsDisabled,
                    i
                )
            ).toBe('true');
        }
        await click(radioButtonLabelByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem));
        await expect(
            await getAttributeByName(
                radioButtonInputByIndex(radioButtonWithDisabledItemsCreatedFromSelectItem),
                ariaChecked
            )
        ).toBe('true');
    });

    it('Verify validation for radio group with disabled button and validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonHaveValidationError));
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonHaveValidationError)
        );
        await click(actionButtonByIndex(submitRadioButtonHaveValidationError));
        for (let i = 0; i < radioButtonsLength; i++) {
            await waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio group with disabled button and validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError));
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithDisabledButtonAndValidationError)
        );
        await click(actionButtonByIndex(submitDisabledRadioButtonWithValidationErrorIndex));
        for (let i = 0; i < radioButtonsLength; i++) {
            await waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    it('Verify validation for radio buttons created with given list of SelectItem objects and have validation error', async () => {
        await scrollIntoView(radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects));
        const radioButtonsLength = await getElementArrayLength(
            await radioButtonGroupPage.radioButtonInputByIndex(radioButtonWithListOfSelectItemObjects)
        );
        await click(actionButtonByIndex(submitRadioButtonWithListOfSelectItemObjects));
        for (let i = 0; i < radioButtonsLength; i++) {
            await waitForElDisplayed(radioButtonGroupPage.errorMessage, i);
        }
    });

    describe('orientation check', () => {
        it('should be able to switch to rtl', async () => {
            await radioButtonGroupPage.checkRtlSwitch();
        });
    });
});
