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

    beforeAll(() => {
        formGeneratorPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(formGeneratorPage.root);
        waitForElDisplayed(formGeneratorPage.title);
        if (doesItExist(busyIndicator) === true) {
            pause(2000);
        }
    }, 1);

    describe('Tests for default example', () => {
        it('should check required fields validation', () => {
            checkFormValidation(defaultExample);
        });

        it('should check framework error messages', () => {
            checkFrameworkValidation(defaultExample);
        });

        it('should check permissions error', () => {
            checkPermissionsValidation(defaultExample);
        });

        it('should check birtday year validation', () => {
            checkBirthdayValidation(defaultExample);
        });

        it('should check password validation', () => {
            checkPasswordValidation(defaultExample);
        });
    });

    describe('Tests for field layout example', () => {
        it('should check required fields validation', () => {
            checkFormValidation(fieldLayoutExample);
        });

        it('should check framework error messages', () => {
            checkFrameworkValidation(fieldLayoutExample);
        });

        it('should check permissions error', () => {
            checkPermissionsValidation(fieldLayoutExample);
        });

        it('should check birtday year error message', () => {
            checkBirthdayValidation(fieldLayoutExample);
        });

        it('should check password validation', () => {
            checkPasswordValidation(fieldLayoutExample);
        });
    });

    describe('Tests for observable example', () => {
        it('should check required fields validation', () => {
            checkFormValidation(observableExample);
        });

        it('should check framework error messages', () => {
            checkFrameworkValidation(observableExample);
        });

        it('should check permissions error', () => {
            checkPermissionsValidation(observableExample);
        });

        it('should check birtday year error message', () => {
            checkBirthdayValidation(observableExample);
        });

        it('should check password validation', () => {
            checkPasswordValidation(observableExample);
        });
    });

    describe('Tests for programmatic example', () => {
        it('should check validation for required fields', () => {
            checkFormValidation(programmaticExample);
        });

        it('should check framework error messages', () => {
            checkFrameworkValidation(programmaticExample);
        });

        it('should check permissions error', () => {
            checkPermissionsValidation(programmaticExample);
        });

        it('should check birtday year error message', () => {
            checkBirthdayValidation(programmaticExample);
        });

        it('should check password validation', () => {
            checkPasswordValidation(programmaticExample);
        });
    });

    xit('should check custom controls example', () => {
        scrollIntoView(sliderPoint);
        clickAndMoveElement(sliderPoint, -400, 0);
        expect(doesItExist(formValue)).toBe(false, 'form value row exists');
        click(customExample + submitButton);
        if (!browserIsSafari()) {
            expect(getText(formValue)).toEqual('Form value: { "some_slider": { "value": 10, "label": "Ten" } }');
        }
        if (browserIsSafari()) {
            expect(getText(formValue)).toEqual(
                'Form value: {\n' +
                    '  "some_slider": {\n' +
                    '    "value": 10,\n' +
                    '    "label": "Ten"\n' +
                    '  }\n' +
                    '}'
            );
        }
    });

    it('should check custom error example', () => {
        click(errorExample + submitButton);
        checkValidationMessage(errorExample, validationInput, requiredErrorMessage);
        checkValidationMessage(errorExample, validationInput, requiredErrorMessage, 1);
        setValue(errorExample + validationInput, '1');
        setValue(errorExample + validationInput, '1', 1);
        expect(doesItExist(errorMessage)).toBe(false, 'error message still visible');
    });

    it('should check RTL', () => {
        formGeneratorPage.checkRtlSwitch();
    });

    function checkPasswordValidation(section: string): void {
        scrollIntoView(section + passwordInput);
        setValue(section + passwordInput, simplePassword);
        checkValidationMessage(section, passwordInput, passwordConditionsErrorMessage);
        setValue(section + passwordInput, correctPassword);
        expect(doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    function checkBirthdayValidation(section: string): void {
        scrollIntoView(section + dateInput);
        setValue(section + dateInput, invalidBirthday);
        checkValidationMessage(section, calendarInputGroup, birthdayYearErrorMessage);
        setValue(section + dateInput, validBirthday);
        expect(doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    function checkPermissionsValidation(section: string): void {
        scrollIntoView(section + radioButtonLabel, 1);
        checkValidationMessage(section, radioButtonLabel, termsErrorMesssage, 1);
        click(section + radioButtonLabel);
        expect(doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    function checkFrameworkValidation(section: string): void {
        scrollIntoView(section + radioButtonLabel);
        checkValidationMessage(section, radioButtonLabel, frameworkErrorMessage, 3);
        checkValidationMessage(section, radioButtonLabel, frameworkErrorMessage, 4);
        click(section + radioButtonLabel, 2);
        expect(doesItExist(errorMessage)).toBe(false, 'error message exists');
    }

    function checkFormValidation(section: string): void {
        scrollIntoView(section);
        click(section + nameInput);

        const nameLength = getValue(section + nameInput).length;
        for (let i = 0; i < nameLength; i++) {
            scrollIntoView(section + nameInput);
            sendKeys('Backspace');
        }

        const ageLength = getValue(section + ageInput).length;
        click(section + ageInput);
        for (let i = 0; i < ageLength; i++) {
            scrollIntoView(section + ageInput);
            sendKeys('Backspace');
        }

        scrollIntoView(section + submitButton);
        click(section + submitButton);

        checkValidationMessage(section, nameInput, requiredErrorMessage);
        checkValidationMessage(section, ageInput, requiredErrorMessage);
        checkValidationMessage(section, passwordInput, requiredErrorMessage);
        checkValidationMessage(section, calendarInputGroup, requiredErrorMessage);

        if (section === defaultExample) {
            expect(getElementClass(section + select, 1)).toContain('is-error', 'element is not highlighted by error');
        }

        for (let i = 0; i < getElementArrayLength(section + radioButton); i++) {
            expect(getElementClass(section + radioButton, i)).toContain('is-error', 'no error for radio button');
        }
        for (let i = 0; i < getElementArrayLength(section + checkbox); i++) {
            expect(getElementClass(section + checkbox, i)).toContain('is-error', 'no error for checkbox');
        }
    }

    function checkValidationMessage(section: string, item: string, message: string, i: number = 0): void {
        click(section + item, i);
        // pause for element to be created
        pause(1000);
        expect(waitForElDisplayed(errorMessage)).toBe(true, 'error message is not displayed');
        expect(getText(errorMessage)).toEqual(message, 'error message is not match');
    }
});
