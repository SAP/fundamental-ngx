import {
    browserIsSafari,
    click,
    clickAndMoveElement,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    birthdayYearErrorMessage,
    frameworkErrorMessage,
    passwordConditionsErrorMessage,
    requiredErrorMessage,
    termsErrorMesssage
} from './form-generator-contents';
import { correctPassword, invalidBirthday, simplePassword, validBirthday } from './form-generator';
import { FormGeneratorPo } from './form-generator.po';

describe('Form generator test suite', () => {
    const formGeneratorPage = new FormGeneratorPo();
    const {
        errorExample,
        customExample,
        defaultExample,
        observableExample,
        fieldLayoutExample,
        programmaticExample,
        nameInput,
        passwordInput,
        ageInput,
        dateInput,
        radioButton,
        checkbox,
        submitButton,
        select,
        calendarInputGroup,
        errorMessage,
        radioButtonLabel,
        sliderPoint,
        formValue,
        validationInput,
        busyIndicator
    } = formGeneratorPage;

    beforeAll(async () => {
        await formGeneratorPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(formGeneratorPage.root);
        await waitForElDisplayed(formGeneratorPage.title);
        if ((await doesItExist(busyIndicator)) === true) {
            await pause(2000);
        }
    }, 1);

    describe('Tests for default example', () => {
        it('should check required fields validation', async () => {
            await checkFormValidation(defaultExample);
        });

        it('should check framework error messages', async () => {
            await checkFrameworkValidation(defaultExample);
        });

        it('should check permissions error', async () => {
            await checkPermissionsValidation(defaultExample);
        });

        it('should check birtday year validation', async () => {
            await checkBirthdayValidation(defaultExample);
        });

        it('should check password validation', async () => {
            await checkPasswordValidation(defaultExample);
        });
    });

    describe('Tests for field layout example', () => {
        it('should check required fields validation', async () => {
            await checkFormValidation(fieldLayoutExample);
        });

        it('should check framework error messages', async () => {
            await checkFrameworkValidation(fieldLayoutExample);
        });

        it('should check permissions error', async () => {
            await checkPermissionsValidation(fieldLayoutExample);
        });

        it('should check birtday year error message', async () => {
            await checkBirthdayValidation(fieldLayoutExample);
        });

        it('should check password validation', async () => {
            await checkPasswordValidation(fieldLayoutExample);
        });
    });

    describe('Tests for observable example', () => {
        it('should check required fields validation', async () => {
            await checkFormValidation(observableExample);
        });

        it('should check framework error messages', async () => {
            await checkFrameworkValidation(observableExample);
        });

        it('should check permissions error', async () => {
            await checkPermissionsValidation(observableExample);
        });

        it('should check birtday year error message', async () => {
            await checkBirthdayValidation(observableExample);
        });

        it('should check password validation', async () => {
            await checkPasswordValidation(observableExample);
        });
    });

    describe('Tests for programmatic example', () => {
        it('should check validation for required fields', async () => {
            await checkFormValidation(programmaticExample);
        });

        it('should check framework error messages', async () => {
            await checkFrameworkValidation(programmaticExample);
        });

        it('should check permissions error', async () => {
            await checkPermissionsValidation(programmaticExample);
        });

        it('should check birtday year error message', async () => {
            await checkBirthdayValidation(programmaticExample);
        });

        it('should check password validation', async () => {
            await checkPasswordValidation(programmaticExample);
        });
    });

    xit('should check custom controls example', async () => {
        await scrollIntoView(sliderPoint);
        await clickAndMoveElement(sliderPoint, -400, 0);
        await expect(await doesItExist(formValue)).toBe(false, 'form value row exists');
        await click(customExample + submitButton);
        if (!(await browserIsSafari())) {
            await expect(await getText(formValue)).toEqual(
                'Form value: { "some_slider": { "value": 10, "label": "Ten" } }'
            );
        }
        if (await browserIsSafari()) {
            await expect(await getText(formValue)).toEqual(
                'Form value: {\n' +
                    '  "some_slider": {\n' +
                    '    "value": 10,\n' +
                    '    "label": "Ten"\n' +
                    '  }\n' +
                    '}'
            );
        }
    });

    it('should check custom error example', async () => {
        await click(errorExample + submitButton);
        await checkValidationMessage(errorExample, validationInput, requiredErrorMessage);
        await checkValidationMessage(errorExample, validationInput, requiredErrorMessage, 1);
        await setValue(errorExample + validationInput, '1');
        await setValue(errorExample + validationInput, '1', 1);
        await expect(await doesItExist(errorMessage)).toBe(false, 'error message still visible');
    });

    it('should check RTL', async () => {
        await formGeneratorPage.checkRtlSwitch();
    });

    async function checkPasswordValidation(section: string): Promise<void> {
        await scrollIntoView(section + passwordInput);
        await setValue(section + passwordInput, simplePassword);
        await checkValidationMessage(section, passwordInput, passwordConditionsErrorMessage);
        await setValue(section + passwordInput, correctPassword);
        await expect(await doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    async function checkBirthdayValidation(section: string): Promise<void> {
        await scrollIntoView(section + dateInput);
        await setValue(section + dateInput, invalidBirthday);
        await checkValidationMessage(section, calendarInputGroup, birthdayYearErrorMessage);
        await setValue(section + dateInput, validBirthday);
        await expect(await doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    async function checkPermissionsValidation(section: string): Promise<void> {
        await scrollIntoView(section + radioButtonLabel, 1);
        await checkValidationMessage(section, radioButtonLabel, termsErrorMesssage, 1);
        await click(section + radioButtonLabel);
        await expect(await doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    async function checkFrameworkValidation(section: string): Promise<void> {
        await scrollIntoView(section + radioButtonLabel);
        await checkValidationMessage(section, radioButtonLabel, frameworkErrorMessage, 3);
        await checkValidationMessage(section, radioButtonLabel, frameworkErrorMessage, 4);
        await click(section + radioButtonLabel, 2);
        await expect(await doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    async function checkFormValidation(section: string): Promise<void> {
        await scrollIntoView(section);
        await click(section + nameInput);

        const nameLength = (await getValue(section + nameInput)).length;
        for (let i = 0; i < nameLength; i++) {
            await scrollIntoView(section + nameInput);
            await sendKeys('Backspace');
        }

        const ageLength = (await getValue(section + ageInput)).length;
        await click(section + ageInput);
        for (let i = 0; i < ageLength; i++) {
            await scrollIntoView(section + ageInput);
            await sendKeys('Backspace');
        }

        await scrollIntoView(section + submitButton);
        await click(section + submitButton);

        await checkValidationMessage(section, nameInput, requiredErrorMessage);
        await checkValidationMessage(section, ageInput, requiredErrorMessage);
        await checkValidationMessage(section, passwordInput, requiredErrorMessage);
        await checkValidationMessage(section, calendarInputGroup, requiredErrorMessage);

        if (section === defaultExample) {
            await expect(await getElementClass(section + select, 1)).toContain(
                'is-error',
                'element is not highlighted by error'
            );
        }

        for (let i = 0; i < (await getElementArrayLength(section + radioButton)); i++) {
            await expect(await getElementClass(section + radioButton, i)).toContain(
                'is-error',
                'no error for radio button'
            );
        }
        for (let i = 0; i < (await getElementArrayLength(section + checkbox)); i++) {
            await expect(await getElementClass(section + checkbox, i)).toContain('is-error', 'no error for checkbox');
        }
    }

    async function checkValidationMessage(
        section: string,
        item: string,
        message: string,
        i: number = 0
    ): Promise<void> {
        await click(section + item, i);
        // pause for element to be created
        await pause(1000);
        await expect(await waitForElDisplayed(errorMessage)).toBe(true, 'error message is not displayed');
        await expect(await getText(errorMessage)).toEqual(message, 'error message is not match');
    }
});
