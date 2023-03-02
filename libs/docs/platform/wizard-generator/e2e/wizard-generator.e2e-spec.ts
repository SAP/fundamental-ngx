import { WizardGeneratorPO } from './wizard-generator.po';
import {
    browserIsFirefox,
    browserIsSafari,
    click,
    currentPlatformName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    cardDetails,
    cardDetails2,
    errorMessageText,
    firstAdress,
    name,
    newPassword,
    password,
    secondAdress,
    textArr
} from './wizard-generator';

describe('Wizard generator test suite', () => {
    const wizardGeneratorPage = new WizardGeneratorPO();
    const {
        defaultExample,
        customizableGeneratorExample,
        externalNavigationExample,
        visibleSummaryExample,
        responsiveExample,
        summaryObjectsExample,
        onChangeExample,
        dialogExample,
        customizableDialogExample,
        branchingExample,
        responsiveDialogExample,
        step,
        stepContainer,
        select,
        button,
        listItem,
        nextStepBtn,
        listItemText,
        input,
        formLabel,
        editButton,
        nextStepBtn2,
        checkboxLabel,
        checkbox,
        dialog,
        dialogBarButton,
        selectControl,
        errorMessage
    } = wizardGeneratorPage;

    if (browserIsSafari()) {
        // skip due to unknown error where browser closes halfway through the test
        return;
    }

    beforeAll(async () => {
        await wizardGeneratorPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(wizardGeneratorPage.root);
        await waitForElDisplayed(wizardGeneratorPage.title);
    }, 1);

    describe('Default example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(defaultExample);
                await expect(await getElementClass(defaultExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(defaultExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );
            });

            it('should check second step', async () => {
                await completeFirstStep(defaultExample);
                await completeSecondStep(defaultExample);
                await expect(await getElementClass(defaultExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(defaultExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );
            });

            it('should check third step and skip 4th step', async () => {
                await completeFirstStep(defaultExample);
                await completeSecondStep(defaultExample);
                await completeThirdStep(defaultExample, 4);
                await expect(await getElementClass(defaultExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(defaultExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );
            });

            it('should check results', async () => {
                await completeFirstStep(defaultExample);
                await completeSecondStep(defaultExample);
                await completeThirdStep(defaultExample, 4);
                await checkResults(defaultExample);
            });

            it('should check editing', async () => {
                await completeFirstStep(defaultExample);
                await completeSecondStep(defaultExample);
                await completeThirdStep(defaultExample, 4);
                await checkResults(defaultExample);
                await checkEditing(defaultExample, 5);
            });

            it('should check editing password', async () => {
                await completeFirstStep(defaultExample);
                await completeSecondStep(defaultExample);
                await completeThirdStep(defaultExample, 4);
                await checkResults(defaultExample);
                await click(defaultExample + editButton, 1);
                await setValue(defaultExample + input, newPassword, 3);
                await click(nextStepBtn);
                const newPasswordLength = newPassword.length;
                let stars = '';
                for (let i = 0; i < newPasswordLength; i++) {
                    stars += '*';
                }
                await expect((await getText(defaultExample + formLabel, 4)).trim()).toEqual(stars);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(defaultExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(defaultExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(defaultExample, 4);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(defaultExample);
            });

            // TODO: https://github.com/SAP/fundamental-ngx/issues/8802
            xit('should check navigation by scrolling', async () => {
                await checkNavigationByScrolling(defaultExample);
            });
        });
    });

    describe('responsive example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(responsiveExample);
                await expect(await getElementClass(responsiveExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(responsiveExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );
                await completeSecondStep(responsiveExample);

                await expect(await getElementClass(responsiveExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(responsiveExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );
                await completeThirdStep(responsiveExample);

                await expect(await getElementClass(responsiveExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(responsiveExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(responsiveExample);
                await checkEditing(responsiveExample);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(responsiveExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(responsiveExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(responsiveExample);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(responsiveExample);
            });

            // TODO: https://github.com/SAP/fundamental-ngx/issues/8802
            xit('should check navigation by scrolling', async () => {
                await checkNavigationByScrolling(responsiveExample);
            });
        });
    });

    describe('visible summary example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(visibleSummaryExample);
                await expect(await getElementClass(visibleSummaryExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(visibleSummaryExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(visibleSummaryExample);
                await expect(await getElementClass(visibleSummaryExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(visibleSummaryExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );

                await completeThirdStep(visibleSummaryExample);
                await expect(await getElementClass(visibleSummaryExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(visibleSummaryExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(visibleSummaryExample);

                // skipped for FF on macOS due to https://github.com/SAP/fundamental-ngx/issues/7038
                if (!(await browserIsFirefox()) && (await currentPlatformName()) !== 'macOs') {
                    await checkEditing(visibleSummaryExample);
                }
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(visibleSummaryExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(visibleSummaryExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(visibleSummaryExample);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(visibleSummaryExample);
            });

            xit('should check navigation by scrolling', async () => {
                // skipped due to https://github.com/SAP/fundamental-ngx/issues/7046
                await checkNavigationByScrolling(visibleSummaryExample);
            });
        });
    });

    describe('external navigation example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(externalNavigationExample);
                await expect(await getElementClass(externalNavigationExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(externalNavigationExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(externalNavigationExample);
                await expect(await getElementClass(externalNavigationExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(externalNavigationExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );

                await completeThirdStep(externalNavigationExample);
                await expect(await getElementClass(externalNavigationExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(externalNavigationExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(externalNavigationExample);
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(externalNavigationExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(externalNavigationExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(externalNavigationExample);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(externalNavigationExample);
            });
        });
    });

    describe('customizable example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(customizableGeneratorExample);
                await expect(await getElementClass(customizableGeneratorExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(customizableGeneratorExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(customizableGeneratorExample);
                await expect(await getElementClass(customizableGeneratorExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(customizableGeneratorExample + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                await completeThirdStep(customizableGeneratorExample);
                await expect(await getElementClass(customizableGeneratorExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(customizableGeneratorExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(customizableGeneratorExample);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(customizableGeneratorExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(customizableGeneratorExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(customizableGeneratorExample);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(customizableGeneratorExample);
            });
        });
    });

    describe('summary object example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await completeFirstStep(summaryObjectsExample);
                await expect(await getElementClass(summaryObjectsExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(summaryObjectsExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(summaryObjectsExample);
                await expect(await getElementClass(summaryObjectsExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(summaryObjectsExample + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                await completeThirdStep(summaryObjectsExample);
                await expect(await getElementClass(summaryObjectsExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(summaryObjectsExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(summaryObjectsExample);
            });
        });

        describe('Other cases', () => {
            beforeEach(async () => {
                await refreshPage();
                await waitForElDisplayed(wizardGeneratorPage.title);
            }, 1);

            it('should check validation first required field', async () => {
                await checkFirstRequiredFieldValidation(summaryObjectsExample);
            });

            it('should check validation second required field', async () => {
                await checkSecondStepRequiredValidation(summaryObjectsExample);
            });

            it('should check validation third required field', async () => {
                await checkThirdStepRequiredValidation(summaryObjectsExample);
            });

            it('should check navigation by steps', async () => {
                await checkNavigationBySteps(summaryObjectsExample);
            });

            xit('should check navigation by scrolling', async () => {
                // skipped due to https://github.com/SAP/fundamental-ngx/issues/7046
                await checkNavigationByScrolling(summaryObjectsExample);
            });
        });
    });

    describe('On change example', () => {
        it('should check basic way', async () => {
            await scrollIntoView(onChangeExample);
            await setValue(onChangeExample + input, name);
            await click(onChangeExample + nextStepBtn);
            await pause(await getPauseTime());
            await expect(await getElementClass(onChangeExample + step, 1)).toContain(
                'current',
                'you not moved to second step'
            );
            await expect(await getElementClass(onChangeExample + step, 0)).toContain(
                'completed',
                'first step not completed'
            );
            const defaultValue = await getValue(onChangeExample + input, 1);
            await click(onChangeExample + nextStepBtn, 1);
            await pause(await getPauseTime());
            await expect((await getText(onChangeExample + formLabel, 0)).trim()).toEqual(
                name,
                'value is not equal entered value'
            );
            await expect((await getText(onChangeExample + formLabel, 1)).trim()).toEqual(
                defaultValue,
                'value is not equal entered value'
            );
            await click(onChangeExample + editButton);
            await pause(await getPauseTime());
            await setValue(onChangeExample + input, cardDetails2);
            await click(onChangeExample + nextStepBtn);
            await pause(await getPauseTime());
            await expect((await getText(onChangeExample + formLabel, 0)).trim()).toEqual(
                cardDetails2,
                'value is not equal changed value'
            );
        });

        it('should check required fields validation', async () => {
            await scrollIntoView(onChangeExample);
            await click(onChangeExample + nextStepBtn);
            await pause(await getPauseTime());
            await expect(await getElementClass(onChangeExample + input)).toContain('error', 'error is not appeared');
            await setValue(onChangeExample + input, name);
            await click(onChangeExample + nextStepBtn);
            await pause(await getPauseTime());
            // clear default value
            const inputValue = await getValue(onChangeExample + input, 1);
            await click(onChangeExample + input, 1);
            for (let i = 0; i < inputValue.length; i++) {
                await sendKeys('Backspace');
            }
            await pause(await getPauseTime());
            await expect(await getElementClass(onChangeExample + input, 1)).toContain('error', 'error is not appeared');
        });

        it('should check default value from first input', async () => {
            await scrollIntoView(onChangeExample);
            await setValue(onChangeExample + input, name);
            await click(onChangeExample + nextStepBtn);
            await expect(await getValue(onChangeExample + input, 1)).toEqual(
                name + '-repo',
                'value is not equal entered value + default additional string'
            );
        });

        it('should check navigation by steps', async () => {
            await checkNavigationBySteps(onChangeExample);
        });

        // TODO: https://github.com/SAP/fundamental-ngx/issues/8802
        xit('should check navigation by scrolling', async () => {
            await checkNavigationByScrolling(onChangeExample);
        });
    });

    describe('dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await openDialog(dialogExample);
                await completeFirstStep(dialog);
                await expect(await getElementClass(dialog + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );
            });
            it('should check second step', async () => {
                await openDialog(dialogExample);
                await completeFirstStep(dialog);
                await completeSecondStep(dialog);
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );
            });

            it('should check third step', async () => {
                await openDialog(dialogExample);
                await completeFirstStep(dialog);
                await completeSecondStep(dialog);
                await completeThirdStep(dialog);
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(dialog + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );
            });

            it('should check results', async () => {
                await openDialog(dialogExample);
                await completeFirstStep(dialog);
                await completeSecondStep(dialog);
                await completeThirdStep(dialog);
                await checkResults(dialog);
            });

            it('should check editing', async () => {
                await openDialog(dialogExample);
                await completeFirstStep(dialog);
                await completeSecondStep(dialog);
                await completeThirdStep(dialog);
                await checkResults(dialog);
                await checkEditing(dialog);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await openDialog(dialogExample);
                await checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', async () => {
                await openDialog(dialogExample);
                await checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', async () => {
                await openDialog(dialogExample);
                await checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', async () => {
                await openDialog(dialogExample);
                await checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', async () => {
                await checkNavigationByButtonsInDialog(dialogExample);
            });
        });
    });

    describe('customizable dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await refreshPage();
                await waitForElDisplayed(wizardGeneratorPage.title);
                await openDialog(customizableDialogExample);
                await completeFirstStep(dialog);
                await expect(await getElementClass(dialog + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(dialog);
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                await completeThirdStep(dialog);
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                await checkResults(dialog);
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await openDialog(customizableDialogExample);
                await checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', async () => {
                await openDialog(customizableDialogExample);
                await checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', async () => {
                await openDialog(customizableDialogExample);
                await checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', async () => {
                await openDialog(customizableDialogExample);
                await checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', async () => {
                await checkNavigationByButtonsInDialog(customizableDialogExample);
            });
        });
    });

    describe('condition dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await refreshPage();
                await scrollIntoView(branchingExample);
                await openDialog(branchingExample, 1500);
                await completeFirstStep(dialog);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(dialog);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                await click(dialog + select);
                await pause(await getPauseTime());
                const paymentMethod = await getText(listItemText);
                textArr.splice(3, 0, paymentMethod);

                await click(listItem);
                await pause(await getPauseTime());
                await click(dialog + nextStepBtn2);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                await expect(await getElementClass(dialog + step, 3)).toContain(
                    'current',
                    'you are not moved to 5th step'
                );

                await setValue(dialog + input, cardDetails);
                await pause(await getPauseTime());
                await click(dialog + nextStepBtn2);
                await click(dialog + nextStepBtn2);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 4)).toContain(
                    'completed',
                    '5th step is not completed'
                );

                for (let i = 1; i < 6; i++) {
                    await expect((await getText(dialog + formLabel, i)).trim()).toBe(
                        textArr[i - 1],
                        'value is not equal entered value'
                    );
                }
                // remove added value because it can force fail next result check
                textArr.splice(3, 1);

                // click(dialog + editButton, 3);
                // setValue(dialog + input, cardDetails2);
                // click(dialog + nextStepBtn2);
                // expect(getText(dialog + formLabel, 5)).toBe(cardDetails2, 'value is not equal changed value');
            });
        });
        describe('Other cases', () => {
            // TODO: https://github.com/SAP/fundamental-ngx/issues/9461
            xit('should check required fields validation', async () => {
                await openDialog(branchingExample, 1500);
                await click(dialog + nextStepBtn2);
                await expect(await getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
                await click(dialog + select);
                await pause(await getPauseTime());
                await click(listItem);
                await click(dialog + nextStepBtn2);
                await click(dialog + nextStepBtn2);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + input)).toContain('error', 'error is not appeared');
                await pause(await getPauseTime());
                await setValue(dialog + input, name);
                await setValue(dialog + input, firstAdress, 1);
                await click(dialog + nextStepBtn2);
                await click(dialog + nextStepBtn2);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
                await click(dialog + select);
                await pause(await getPauseTime());
                await click(listItem);
                await pause(await getPauseTime());
                await click(dialog + nextStepBtn2);
                await click(dialog + nextStepBtn2);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + input)).toContain('error', 'error is not appeared');
            });

            it('should check navigation by steps', async () => {
                await openDialog(branchingExample);
                await checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', async () => {
                await checkNavigationByButtonsInDialog(branchingExample);
            });
        });
    });

    describe('responsive dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', async () => {
                await scrollIntoView(responsiveDialogExample);
                await openDialog(responsiveDialogExample, 1500);

                await completeFirstStep(dialog);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                await completeSecondStep(dialog);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                await completeThirdStep(dialog);
                await pause(await getPauseTime());
                await expect(await getElementClass(dialog + step, 2)).toContain(
                    'completed',
                    'first step is not completed'
                );
                await expect(await getElementClass(dialog + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );
                await pause(await getPauseTime());
                await checkResults(dialog);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', async () => {
                await click(responsiveDialogExample + button);
                await checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', async () => {
                await openDialog(responsiveDialogExample, 1500);
                await checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', async () => {
                await openDialog(responsiveDialogExample, 1500);
                await checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', async () => {
                await openDialog(responsiveDialogExample, 1500);
                await checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', async () => {
                await checkNavigationByButtonsInDialog(responsiveDialogExample);
            });
        });
    });

    async function checkNavigationByScrolling(selector: string): Promise<void> {
        await scrollIntoView(selector);
        if (selector === summaryObjectsExample) {
            await click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            await setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            await click(selector + select);
            await click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample
            ? await click(selector + nextStepBtn2)
            : await click(selector + nextStepBtn);
        await pause(await getPauseTime());
        await expect(await getElementClass(selector + step, 1)).toContain('current');
        await expect(await getElementClass(selector + step, 0)).toContain('completed');
        await scrollIntoView(selector + stepContainer);
        await scrollIntoView(selector + step);
        await pause(await getPauseTime());
        await expect(await getElementClass(selector + step, 0)).toContain('current', 'step did not back to first');
        await expect(await getElementClass(selector + step, 1)).toContain('upcoming', 'step did not back to first');
    }

    async function checkNavigationByButtonsInDialog(selector: string): Promise<void> {
        await scrollIntoView(selector);
        await openDialog(selector);
        await click(dialog + select);
        await click(listItem);
        await click(dialog + nextStepBtn2);
        await pause(await getPauseTime());
        await expect(await getElementArrayLength(dialogBarButton)).toBe(3, 'back button is appeared');
        await expect(await getElementClass(dialog + step, 1)).toContain('current', 'second step is not current');
        await expect(await getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
        await click(dialogBarButton);
        await pause(await getPauseTime());
        await expect(await getElementClass(dialog + step, 0)).toContain('current', 'step did not back to first');
        await expect(await getElementClass(dialog + step, 1)).toContain('upcoming', 'step did not back to first');
        await expect(await getElementArrayLength(dialogBarButton)).toBe(2, 'back button is not hidden');
    }

    async function checkNavigationBySteps(selector: string): Promise<void> {
        await scrollIntoView(selector);
        await expect(await isElementClickable(selector + '.fd-wizard__step-container', 1)).toBe(
            false,
            'second step clickable but should not'
        );
        if (selector === summaryObjectsExample) {
            await click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            await setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            await click(selector + select);
            await click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? await click(selector + nextStepBtn2)
            : await click(selector + nextStepBtn);
        await pause(await getPauseTime());
        await expect(await getElementClass(selector + step, 1)).toContain('current', 'you not moved to second step');
        await expect(await getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        await click(selector + '.fd-wizard__step-container');
        await pause(await getPauseTime());
        await expect(await getElementClass(selector + step, 0)).toContain(
            'current',
            'you did not get back to first step by click on step tab'
        );
    }

    async function checkFirstRequiredFieldValidation(selector: string): Promise<void> {
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? await click(selector + nextStepBtn2)
            : await click(selector + nextStepBtn);
        if (selector !== summaryObjectsExample) {
            await expect(await getElementClass(selector + selectControl)).toContain('error', 'error is not appeared');
            await click(selector + select);
            await click(listItem);
        }
        if (selector === summaryObjectsExample) {
            await expect(await getElementClass(selector + checkbox)).toContain('error', 'error is not appeared');
            await click(checkboxLabel);
        }
    }

    async function checkSecondStepRequiredValidation(selector: string): Promise<void> {
        await completeFirstStep(selector);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            await click(selector + nextStepBtn, 1);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            await click(selector + nextStepBtn2);
        }
        await pause(await getPauseTime());
        for (let i = 0; i < 2; i++) {
            await click(selector + input, i);
            await pause(await getPauseTime());
            await expect(await isElementDisplayed(errorMessage)).toBe(true);
            await expect((await getText(errorMessage)).trim()).toBe(errorMessageText);
        }
    }

    async function checkThirdStepRequiredValidation(selector: string, i: number = 3): Promise<void> {
        await completeFirstStep(selector);
        await completeSecondStep(selector);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            await click(selector + nextStepBtn, 2);
            await click(selector + input, i);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            await click(selector + nextStepBtn2);
            await click(selector + input);
        }
        await expect(await isElementDisplayed(errorMessage)).toBe(true);
        await expect((await getText(errorMessage)).trim()).toBe(errorMessageText);
    }

    async function completeFirstStep(selector: string): Promise<void> {
        if (selector === summaryObjectsExample) {
            await click(checkboxLabel);
        }
        if (selector !== summaryObjectsExample) {
            await click(selector + select);
            await click(listItem);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            await click(selector + nextStepBtn);
        }

        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            await click(selector + nextStepBtn2);
        }
        await pause(await getPauseTime());
    }

    async function completeSecondStep(selector: string): Promise<void> {
        await setValue(selector + input, name);
        await setValue(selector + input, firstAdress, 1);
        await setValue(selector + input, secondAdress, 2);
        if (selector === defaultExample) {
            await setValue(defaultExample + input, password, 3);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            await click(selector + nextStepBtn, 1);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            await click(selector + nextStepBtn2);
        }
        await pause(await getPauseTime());
    }

    async function completeThirdStep(selector: string, i: number = 3): Promise<void> {
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            await setValue(selector + input, cardDetails);
            await click(selector + nextStepBtn2);
            await click(selector + nextStepBtn2);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            await pause(await getPauseTime());
            await setValue(selector + input, cardDetails, i);
            await click(selector + nextStepBtn, 2);
            await pause(await getPauseTime());
            await click(selector + nextStepBtn, 3);
        }
        await pause(await getPauseTime());
    }

    async function checkResults(selector: string): Promise<void> {
        if (selector === defaultExample) {
            const passwordLength = password.length;
            let stars = '';
            for (let i = 0; i < passwordLength; i++) {
                stars += '*';
            }
            textArr.splice(3, 0, stars);
        }
        for (let i = 1; i < 5; i++) {
            await expect((await getText(selector + formLabel, i)).trim()).toBe(textArr[i - 1]);
        }
        if (selector === defaultExample) {
            textArr.splice(3, 1);
        }
    }

    async function checkEditing(selector: string, i: number = 4): Promise<void> {
        await click(selector + editButton, 2);
        await setValue(selector + input, cardDetails2);
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? await click(selector + nextStepBtn2)
            : await click(selector + nextStepBtn);
        await pause(await getPauseTime());
        await expect((await getText(selector + formLabel, i)).trim()).toBe(
            cardDetails2,
            'current value is not equal changed value'
        );
    }

    async function getPauseTime(): Promise<number> {
        if ((await getCurrentUrl()).includes('localhost') || (await getCurrentUrl()).includes('web.app')) {
            return 500;
        } else {
            return 0;
        }
    }

    async function openDialog(selector: string, pauseTime?: number): Promise<void> {
        pauseTime = pauseTime ?? (await getPauseTime());
        await click(selector + button);
        await pause(pauseTime);
    }
});
