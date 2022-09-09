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

    beforeAll(() => {
        wizardGeneratorPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(wizardGeneratorPage.root);
        waitForElDisplayed(wizardGeneratorPage.title);
    }, 1);

    describe('Default example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(defaultExample);
                expect(getElementClass(defaultExample + step, 0)).toContain('completed', 'first step is not completed');
                expect(getElementClass(defaultExample + step, 1)).toContain('current', 'you not moved to second step');
            });

            it('should check second step', () => {
                completeFirstStep(defaultExample);
                completeSecondStep(defaultExample);
                expect(getElementClass(defaultExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(defaultExample + step, 2)).toContain('current', 'third step is not current');
            });

            it('should check third step and skip 4th step', () => {
                completeFirstStep(defaultExample);
                completeSecondStep(defaultExample);
                completeThirdStep(defaultExample, 4);
                expect(getElementClass(defaultExample + step, 2)).toContain('completed', 'third step is not completed');
                expect(getElementClass(defaultExample + step, 3)).toContain('completed', '4th step is not completed');
            });

            it('should check results', () => {
                completeFirstStep(defaultExample);
                completeSecondStep(defaultExample);
                completeThirdStep(defaultExample, 4);
                checkResults(defaultExample);
            });

            it('should check editing', () => {
                completeFirstStep(defaultExample);
                completeSecondStep(defaultExample);
                completeThirdStep(defaultExample, 4);
                checkResults(defaultExample);
                checkEditing(defaultExample, 5);
            });

            it('should check editing password', () => {
                completeFirstStep(defaultExample);
                completeSecondStep(defaultExample);
                completeThirdStep(defaultExample, 4);
                checkResults(defaultExample);
                click(defaultExample + editButton, 1);
                setValue(defaultExample + input, newPassword, 3);
                click(nextStepBtn);
                const newPasswordLength = newPassword.length;
                let stars = '';
                for (let i = 0; i < newPasswordLength; i++) {
                    stars += '*';
                }
                expect(getText(defaultExample + formLabel, 4).trim()).toEqual(stars);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(defaultExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(defaultExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(defaultExample, 4);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(defaultExample);
            });

            it('should check navigation by scrolling', () => {
                checkNavigationByScrolling(defaultExample);
            });
        });
    });

    describe('responsive example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(responsiveExample);
                expect(getElementClass(responsiveExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                expect(getElementClass(responsiveExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );
                completeSecondStep(responsiveExample);

                expect(getElementClass(responsiveExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(responsiveExample + step, 2)).toContain('current', 'third step is not current');
                completeThirdStep(responsiveExample);

                expect(getElementClass(responsiveExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                expect(getElementClass(responsiveExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                checkResults(responsiveExample);
                checkEditing(responsiveExample);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(responsiveExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(responsiveExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(responsiveExample);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(responsiveExample);
            });

            it('should check navigation by scrolling', () => {
                checkNavigationByScrolling(responsiveExample);
            });
        });
    });

    describe('visible summary example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(visibleSummaryExample);
                expect(getElementClass(visibleSummaryExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                expect(getElementClass(visibleSummaryExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                completeSecondStep(visibleSummaryExample);
                expect(getElementClass(visibleSummaryExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(visibleSummaryExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );

                completeThirdStep(visibleSummaryExample);
                expect(getElementClass(visibleSummaryExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                expect(getElementClass(visibleSummaryExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                checkResults(visibleSummaryExample);

                // skipped for FF on macOS due to https://github.com/SAP/fundamental-ngx/issues/7038
                if (!browserIsFirefox() && currentPlatformName() !== 'macOs') {
                    checkEditing(visibleSummaryExample);
                }
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(visibleSummaryExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(visibleSummaryExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(visibleSummaryExample);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(visibleSummaryExample);
            });

            xit('should check navigation by scrolling', () => {
                // skipped due to https://github.com/SAP/fundamental-ngx/issues/7046
                checkNavigationByScrolling(visibleSummaryExample);
            });
        });
    });

    describe('external navigation example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(externalNavigationExample);
                expect(getElementClass(externalNavigationExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                expect(getElementClass(externalNavigationExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                completeSecondStep(externalNavigationExample);
                expect(getElementClass(externalNavigationExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(externalNavigationExample + step, 2)).toContain(
                    'current',
                    'third step is not current'
                );

                completeThirdStep(externalNavigationExample);
                expect(getElementClass(externalNavigationExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                expect(getElementClass(externalNavigationExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                checkResults(externalNavigationExample);
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(externalNavigationExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(externalNavigationExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(externalNavigationExample);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(externalNavigationExample);
            });
        });
    });

    describe('customizable example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(customizableGeneratorExample);
                expect(getElementClass(customizableGeneratorExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                expect(getElementClass(customizableGeneratorExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                completeSecondStep(customizableGeneratorExample);
                expect(getElementClass(customizableGeneratorExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(customizableGeneratorExample + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                completeThirdStep(customizableGeneratorExample);
                expect(getElementClass(customizableGeneratorExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                expect(getElementClass(customizableGeneratorExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                checkResults(customizableGeneratorExample);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(customizableGeneratorExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(customizableGeneratorExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(customizableGeneratorExample);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(customizableGeneratorExample);
            });
        });
    });

    describe('summary object example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                completeFirstStep(summaryObjectsExample);
                expect(getElementClass(summaryObjectsExample + step, 0)).toContain(
                    'completed',
                    'first step is not completed'
                );
                expect(getElementClass(summaryObjectsExample + step, 1)).toContain(
                    'current',
                    'you not moved to second step'
                );

                completeSecondStep(summaryObjectsExample);
                expect(getElementClass(summaryObjectsExample + step, 1)).toContain(
                    'completed',
                    'second step is not completed'
                );
                expect(getElementClass(summaryObjectsExample + step, 2)).toContain(
                    'current',
                    'you not moved to third step'
                );

                completeThirdStep(summaryObjectsExample);
                expect(getElementClass(summaryObjectsExample + step, 2)).toContain(
                    'completed',
                    'third step is not completed'
                );
                expect(getElementClass(summaryObjectsExample + step, 3)).toContain(
                    'completed',
                    '4th step is not completed'
                );

                checkResults(summaryObjectsExample);
            });
        });

        describe('Other cases', () => {
            beforeEach(() => {
                refreshPage();
                waitForElDisplayed(wizardGeneratorPage.title);
            }, 1);

            it('should check validation first required field', () => {
                checkFirstRequiredFieldValidation(summaryObjectsExample);
            });

            it('should check validation second required field', () => {
                checkSecondStepRequiredValidation(summaryObjectsExample);
            });

            it('should check validation third required field', () => {
                checkThirdStepRequiredValidation(summaryObjectsExample);
            });

            it('should check navigation by steps', () => {
                checkNavigationBySteps(summaryObjectsExample);
            });

            xit('should check navigation by scrolling', () => {
                // skipped due to https://github.com/SAP/fundamental-ngx/issues/7046
                checkNavigationByScrolling(summaryObjectsExample);
            });
        });
    });

    describe('On change example', () => {
        it('should check basic way', () => {
            scrollIntoView(onChangeExample);
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            pause(getPauseTime());
            expect(getElementClass(onChangeExample + step, 1)).toContain('current', 'you not moved to second step');
            expect(getElementClass(onChangeExample + step, 0)).toContain('completed', 'first step not completed');
            const defaultValue = getValue(onChangeExample + input, 1);
            click(onChangeExample + nextStepBtn, 1);
            pause(getPauseTime());
            expect(getText(onChangeExample + formLabel, 0).trim()).toEqual(name, 'value is not equal entered value');
            expect(getText(onChangeExample + formLabel, 1).trim()).toEqual(
                defaultValue,
                'value is not equal entered value'
            );
            click(onChangeExample + editButton);
            pause(getPauseTime());
            setValue(onChangeExample + input, cardDetails2);
            click(onChangeExample + nextStepBtn);
            pause(getPauseTime());
            expect(getText(onChangeExample + formLabel, 0).trim()).toEqual(
                cardDetails2,
                'value is not equal changed value'
            );
        });

        it('should check required fields validation', () => {
            scrollIntoView(onChangeExample);
            click(onChangeExample + nextStepBtn);
            pause(getPauseTime());
            expect(getElementClass(onChangeExample + input)).toContain('error', 'error is not appeared');
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            pause(getPauseTime());
            // clear default value
            const inputValue = getValue(onChangeExample + input, 1);
            click(onChangeExample + input, 1);
            for (let i = 0; i < inputValue.length; i++) {
                sendKeys('Backspace');
            }
            pause(getPauseTime());
            expect(getElementClass(onChangeExample + input, 1)).toContain('error', 'error is not appeared');
        });

        it('should check default value from first input', () => {
            scrollIntoView(onChangeExample);
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            expect(getValue(onChangeExample + input, 1)).toEqual(
                name + '-repo',
                'value is not equal entered value + default additional string'
            );
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(onChangeExample);
        });

        it('should check navigation by scrolling', () => {
            checkNavigationByScrolling(onChangeExample);
        });
    });

    describe('dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                openDialog(dialogExample);
                completeFirstStep(dialog);
                expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 1)).toContain('current', 'you not moved to second step');
            });
            it('should check second step', () => {
                openDialog(dialogExample);
                completeFirstStep(dialog);
                completeSecondStep(dialog);
                expect(getElementClass(dialog + step, 1)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 2)).toContain('current', 'you not moved to third step');
            });

            it('should check third step', () => {
                openDialog(dialogExample);
                completeFirstStep(dialog);
                completeSecondStep(dialog);
                completeThirdStep(dialog);
                expect(getElementClass(dialog + step, 2)).toContain('completed', 'second step is not completed');
                expect(getElementClass(dialog + step, 3)).toContain('completed', '4th step is not completed');
            });

            it('should check results', () => {
                openDialog(dialogExample);
                completeFirstStep(dialog);
                completeSecondStep(dialog);
                completeThirdStep(dialog);
                checkResults(dialog);
            });

            it('should check editing', () => {
                openDialog(dialogExample);
                completeFirstStep(dialog);
                completeSecondStep(dialog);
                completeThirdStep(dialog);
                checkResults(dialog);
                checkEditing(dialog);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', () => {
                openDialog(dialogExample);
                checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', () => {
                openDialog(dialogExample);
                checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', () => {
                openDialog(dialogExample);
                checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', () => {
                openDialog(dialogExample);
                checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', () => {
                checkNavigationByButtonsInDialog(dialogExample);
            });
        });
    });

    describe('customizable dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                refreshPage();
                waitForElDisplayed(wizardGeneratorPage.title);
                openDialog(customizableDialogExample);
                completeFirstStep(dialog);
                expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 1)).toContain('current', 'you not moved to second step');

                completeSecondStep(dialog);
                expect(getElementClass(dialog + step, 1)).toContain('completed', 'second step is not completed');
                expect(getElementClass(dialog + step, 2)).toContain('current', 'you not moved to third step');

                completeThirdStep(dialog);
                expect(getElementClass(dialog + step, 2)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 3)).toContain('completed', '4th step is not completed');

                checkResults(dialog);
            });
        });
        describe('Other cases', () => {
            it('should check validation first required field', () => {
                openDialog(customizableDialogExample);
                checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', () => {
                openDialog(customizableDialogExample);
                checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', () => {
                openDialog(customizableDialogExample);
                checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', () => {
                openDialog(customizableDialogExample);
                checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', () => {
                checkNavigationByButtonsInDialog(customizableDialogExample);
            });
        });
    });

    describe('condition dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                refreshPage();
                scrollIntoView(branchingExample);
                openDialog(branchingExample, 1500);
                completeFirstStep(dialog);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 1)).toContain('current', 'you not moved to second step');

                completeSecondStep(dialog);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 1)).toContain('completed', 'second step is not completed');
                expect(getElementClass(dialog + step, 2)).toContain('current', 'you not moved to third step');

                click(dialog + nextStepBtn2);
                click(dialog + select);
                pause(getPauseTime());
                const paymentMethod = getText(listItemText);
                textArr.splice(3, 0, paymentMethod);

                click(listItem);
                pause(getPauseTime());
                click(dialog + nextStepBtn2);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 2)).toContain('completed', 'third step is not completed');
                expect(getElementClass(dialog + step, 3)).toContain('current', 'you are not moved to 5th step');

                setValue(dialog + input, cardDetails);
                pause(getPauseTime());
                click(dialog + nextStepBtn2);
                click(dialog + nextStepBtn2);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 4)).toContain('completed', '5th step is not completed');

                for (let i = 1; i < 6; i++) {
                    expect(getText(dialog + formLabel, i).trim()).toBe(
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
            it('should check required fields validation', () => {
                openDialog(branchingExample, 1500);
                click(dialog + nextStepBtn2);
                expect(getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
                click(dialog + select);
                pause(getPauseTime());
                click(listItem);
                click(dialog + nextStepBtn2);
                click(dialog + nextStepBtn2);
                pause(getPauseTime());
                expect(getElementClass(dialog + input)).toContain('error', 'error is not appeared');
                pause(getPauseTime());
                setValue(dialog + input, name);
                setValue(dialog + input, firstAdress, 1);
                click(dialog + nextStepBtn2);
                click(dialog + nextStepBtn2);
                pause(getPauseTime());
                expect(getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
                click(dialog + select);
                pause(getPauseTime());
                click(listItem);
                pause(getPauseTime());
                click(dialog + nextStepBtn2);
                click(dialog + nextStepBtn2);
                pause(getPauseTime());
                expect(getElementClass(dialog + input)).toContain('error', 'error is not appeared');
            });

            it('should check navigation by steps', () => {
                openDialog(branchingExample);
                checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', () => {
                checkNavigationByButtonsInDialog(branchingExample);
            });
        });
    });

    describe('responsive dialog example', () => {
        describe('Basic way', () => {
            it('should check basic way', () => {
                scrollIntoView(responsiveDialogExample);
                openDialog(responsiveDialogExample, 1500);

                completeFirstStep(dialog);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 1)).toContain('current', 'you not moved to second step');

                completeSecondStep(dialog);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 1)).toContain('completed', 'second step is not completed');
                expect(getElementClass(dialog + step, 2)).toContain('current', 'you not moved to third step');

                completeThirdStep(dialog);
                pause(getPauseTime());
                expect(getElementClass(dialog + step, 2)).toContain('completed', 'first step is not completed');
                expect(getElementClass(dialog + step, 3)).toContain('completed', '4th step is not completed');
                pause(getPauseTime());
                checkResults(dialog);
            });
        });

        describe('Other cases', () => {
            it('should check validation first required field', () => {
                click(responsiveDialogExample + button);
                checkFirstRequiredFieldValidation(dialog);
            });

            it('should check validation second required field', () => {
                openDialog(responsiveDialogExample, 1500);
                checkSecondStepRequiredValidation(dialog);
            });

            it('should check validation third required field', () => {
                openDialog(responsiveDialogExample, 1500);
                checkThirdStepRequiredValidation(dialog);
            });

            it('should check navigation by steps', () => {
                openDialog(responsiveDialogExample, 1500);
                checkNavigationBySteps(dialog);
            });

            it('should check navigation by buttons', () => {
                checkNavigationByButtonsInDialog(responsiveDialogExample);
            });
        });
    });

    function checkNavigationByScrolling(selector: string): void {
        scrollIntoView(selector);
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            click(selector + select);
            click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        pause(getPauseTime());
        expect(getElementClass(selector + step, 1)).toContain('current', 'second step is not current');
        expect(getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        scrollIntoView(selector + stepContainer);
        scrollIntoView(selector + step);
        pause(getPauseTime());
        expect(getElementClass(selector + step, 0)).toContain('current', 'step did not back to first');
        expect(getElementClass(selector + step, 1)).toContain('upcoming', 'step did not back to first');
    }

    function checkNavigationByButtonsInDialog(selector: string): void {
        scrollIntoView(selector);
        openDialog(selector);
        click(dialog + select);
        click(listItem);
        click(dialog + nextStepBtn2);
        pause(getPauseTime());
        expect(getElementArrayLength(dialogBarButton)).toBe(3, 'back button is appeared');
        expect(getElementClass(dialog + step, 1)).toContain('current', 'second step is not current');
        expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
        click(dialogBarButton);
        pause(getPauseTime());
        expect(getElementClass(dialog + step, 0)).toContain('current', 'step did not back to first');
        expect(getElementClass(dialog + step, 1)).toContain('upcoming', 'step did not back to first');
        expect(getElementArrayLength(dialogBarButton)).toBe(2, 'back button is not hidden');
    }

    function checkNavigationBySteps(selector: string): void {
        scrollIntoView(selector);
        expect(isElementClickable(selector + '.fd-wizard__step-container', 1)).toBe(
            false,
            'second step clickable but should not'
        );
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            click(selector + select);
            click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        pause(getPauseTime());
        expect(getElementClass(selector + step, 1)).toContain('current', 'you not moved to second step');
        expect(getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        click(selector + '.fd-wizard__step-container');
        pause(getPauseTime());
        expect(getElementClass(selector + step, 0)).toContain(
            'current',
            'you did not get back to first step by click on step tab'
        );
    }

    function checkFirstRequiredFieldValidation(selector: string): void {
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        if (selector !== summaryObjectsExample) {
            expect(getElementClass(selector + selectControl)).toContain('error', 'error is not appeared');
            click(selector + select);
            click(listItem);
        }
        if (selector === summaryObjectsExample) {
            expect(getElementClass(selector + checkbox)).toContain('error', 'error is not appeared');
            click(checkboxLabel);
        }
    }

    function checkSecondStepRequiredValidation(selector: string): void {
        completeFirstStep(selector);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn, 1);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
        }
        pause(getPauseTime());
        for (let i = 0; i < 2; i++) {
            click(selector + input, i);
            pause(getPauseTime());
            expect(isElementDisplayed(errorMessage)).toBe(true);
            expect(getText(errorMessage).trim()).toBe(errorMessageText);
        }
    }

    function checkThirdStepRequiredValidation(selector: string, i: number = 3): void {
        completeFirstStep(selector);
        completeSecondStep(selector);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn, 2);
            click(selector + input, i);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
            click(selector + input);
        }
        expect(isElementDisplayed(errorMessage)).toBe(true);
        expect(getText(errorMessage).trim()).toBe(errorMessageText);
    }

    function completeFirstStep(selector: string): void {
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector !== summaryObjectsExample) {
            click(selector + select);
            click(listItem);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn);
        }

        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
        }
        pause(getPauseTime());
    }

    function completeSecondStep(selector: string): void {
        setValue(selector + input, name);
        setValue(selector + input, firstAdress, 1);
        setValue(selector + input, secondAdress, 2);
        if (selector === defaultExample) {
            setValue(defaultExample + input, password, 3);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn, 1);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
        }
        pause(getPauseTime());
    }

    function completeThirdStep(selector: string, i: number = 3): void {
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            setValue(selector + input, cardDetails);
            click(selector + nextStepBtn2);
            click(selector + nextStepBtn2);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            pause(getPauseTime());
            setValue(selector + input, cardDetails, i);
            click(selector + nextStepBtn, 2);
            pause(getPauseTime());
            click(selector + nextStepBtn, 3);
        }
        pause(getPauseTime());
    }

    function checkResults(selector: string): void {
        if (selector === defaultExample) {
            const passwordLength = password.length;
            let stars = '';
            for (let i = 0; i < passwordLength; i++) {
                stars += '*';
            }
            textArr.splice(3, 0, stars);
        }
        for (let i = 1; i < 5; i++) {
            expect(getText(selector + formLabel, i).trim()).toBe(textArr[i - 1]);
        }
        if (selector === defaultExample) {
            textArr.splice(3, 1);
        }
    }

    function checkEditing(selector: string, i: number = 4): void {
        click(selector + editButton, 2);
        setValue(selector + input, cardDetails2);
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        pause(getPauseTime());
        expect(getText(selector + formLabel, i).trim()).toBe(cardDetails2, 'current value is not equal changed value');
    }

    function getPauseTime(): number {
        if (getCurrentUrl().includes('localhost') || getCurrentUrl().includes('web.app')) {
            return 500;
        } else {
            return 0;
        }
    }

    function openDialog(selector: string, pauseTime: number = getPauseTime()): void {
        click(selector + button);
        pause(pauseTime);
    }
});
