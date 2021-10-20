import { StepInputPo } from '../pages/step-input.po';
import {
    refreshPage,
    getElementArrayLength,
    click,
    getValue,
    getText,
    setValue,
    getElementClass,
    sendKeys,
    doubleClick,
    isElementClickable,
    scrollIntoView,
    browserIsFirefox,
    waitForElDisplayed
} from '../../driver/wdio';
import { sections } from '../fixtures/appData/step-input-content';

describe('Step input component test suit', () => {
    const stepInputPage = new StepInputPo();
    const {
        formExample,
        localExample,
        stateExample,
        configExample,
        currencyExample,
        step,
        input,
        plusButton,
        minusButton,
        text,
        textForDisabledExample
    } = stepInputPage;

    beforeAll(() => {
        stepInputPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForElDisplayed(stepInputPage.title);
    }, 2);

    it('should check default example inputs', () => {
        for (let i = 0; i < sections.length; i++) {
            checkTypingValueInInput(sections[i], '+');
            checkTypingValueInInput(sections[i], '-');
        }
    });

    it('should check increase/dicrease value by plus-minus buttons', () => {
        for (let i = 0; i < sections.length; i++) {
            checkIncDicValueByBtn(sections[i], '+');
            checkIncDicValueByBtn(sections[i], '-');
        }
    });

    it('should check that minimum - maximum value for step input is from -10 to 10', () => {
        scrollIntoView(configExample + input, 5);
        clearInput(configExample, 5);
        setValue(configExample + input, '10', 5);
        sendKeys('Enter');
        expect(getElementClass(configExample + plusButton, 5)).toContain('is-disabled', 'button is not disabled');
        clearInput(configExample, 5);
        setValue(configExample + input, '-10', 5);
        sendKeys('Enter');
        expect(getElementClass(configExample + minusButton, 5)).toContain('is-disabled', 'button is not disabled');
    });

    it('should check data entry more than minimum and maximum', () => {
        scrollIntoView(configExample + input, 5);
        clearInput(configExample, 5);
        setValue(configExample + input, '20', 5);
        sendKeys('Enter');
        expect(getValue(configExample + input, 5)).toEqual('10');
        expect(getElementClass(configExample + plusButton, 5)).toContain('is-disabled', 'button is not disabled');

        clearInput(configExample, 5);
        setValue(configExample + input, '-20', 5);
        sendKeys('Enter');
        expect(getValue(configExample + input, 5)).toEqual('-10');
        expect(getElementClass(configExample + minusButton, 5)).toContain('is-disabled', 'button is not disabled');
    });

    it('should verify that in specific input step is 0.5', () => {
        scrollIntoView(configExample + input, 6);
        click(configExample + plusButton, 6);
        expect(parseFloat(getValue(configExample + input, 6))).toEqual(0.5);
        click(configExample + minusButton, 6);
        click(configExample + minusButton, 6);
        expect(parseFloat(getValue(configExample + input, 6))).toEqual(-0.5);
    });

    it('should check Saudi Arabia locale', () => {
        scrollIntoView(configExample + input, 5);
        clearInput(configExample, 5);
        setValue(localExample + input, '5', 2);
        sendKeys('Enter');
        expect(getValue(localExample + input, 2)).toEqual('٥');
    });

    it('should check input status for Input States example', () => {
        expect(getElementClass(stateExample + step, 0)).toContain('is-information');
        expect(getElementClass(stateExample + step, 1)).toContain('is-success');
        expect(getElementClass(stateExample + step, 2)).toContain('is-warning');
        expect(getElementClass(stateExample + step, 3)).toContain('is-error');
    });

    it('should check entering invalid values in inputs', () => {
        for (let i = 0; i < sections.length; i++) {
            checkInputWithInvalidValues(sections[i]);
        }
    });

    it('should check disabled inputs', () => {
        expect(getElementClass(formExample + step, 2)).toContain('is-disabled', 'input is not disabled');
        expect(isElementClickable(formExample + plusButton, 2)).toBe(false, 'element is clickable');
        expect(isElementClickable(formExample + minusButton, 2)).toBe(false, 'element is clickable');
        expect(getElementClass(formExample + step, 3)).toContain('is-readonly', 'input is not read-only');
    });

    it('should check RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        stepInputPage.saveExampleBaselineScreenshot();
        expect(stepInputPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkInputWithInvalidValues(section: string): void {
        scrollIntoView(section);
        let inputLength = getElementArrayLength(section + input);
        let defaultValue;
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        for (let i = 0; i < inputLength; i++) {
            scrollIntoView(section + input, i);
            defaultValue = getValue(section + input, i);
            browserIsFirefox() ? clearInputFF(configExample, 5) : clearInput(configExample, 5);
            setValue(section + input, 'asd123', i);
            sendKeys('Enter');
            expect(getValue(section + input, i)).toEqual(defaultValue);
        }
    }

    function checkIncDicValueByBtn(section: string, sign: '+' | '-'): void {
        let inputLength = getElementArrayLength(section + input);
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        let defaultValue;

        for (let i = 0; i < inputLength; i++) {
            scrollIntoView(section + input, i);
            browserIsFirefox() ? clearInputFF(section, i) : clearInput(section, i);
            setValue(section + input, '0', i);
            defaultValue = parseFloat(getValue(section + input, i));
            if (sign === '+') {
                click(section + plusButton, i);
                expect(parseFloat(getValue(section + input, i))).toBeGreaterThan(defaultValue);
            }
            if (sign === '-') {
                click(section + minusButton, i);
                expect(parseFloat(getValue(section + input, i))).toBeLessThan(defaultValue);
            }
        }
    }

    function checkTypingValueInInput(section: string, sign: '+' | '-'): void {
        let inputLength = getElementArrayLength(section + input);
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        const plusValue = '5';
        const minusValue = '-5';
        let additionalText;
        let expectedValue;
        for (let i = 0; i < inputLength; i++) {
            scrollIntoView(section + input, i);
            additionalText = '';

            browserIsFirefox() ? clearInputFF(section, i) : clearInput(section, i);

            sign === '+'
                ? setValue(section + input, plusValue.toString(), i)
                : setValue(section + input, minusValue.toString(), i);
            sendKeys('Enter');

            if (section === configExample && i === 0) {
                additionalText = '.0000';
            }
            if ((section === currencyExample && i === 0) || (section === currencyExample && i === 2)) {
                additionalText = '.00';
            }

            if (sign === '+') {
                expectedValue = plusValue;
            }
            if (sign === '-') {
                expectedValue = minusValue;
            }

            expect(getValue(section + input, i)).toEqual(expectedValue + additionalText);
            if (section !== formExample) {
                expect(getText(section + text, i)).toEqual(`Value: ${expectedValue}`);
            }

            if (section === formExample) {
                if (i === 0) {
                    expect(getText(textForDisabledExample)).toEqual(expectedValue);
                } else if (i === 1) {
                    expect(getText(section + text)).toEqual(`Value: ${expectedValue}`);
                }
            }
        }
    }

    function clearInput(section: string, index: number = 0): void {
        doubleClick(section + input, index);
        sendKeys('Backspace');
    }

    function clearInputFF(section: string, index: number = 0): void {
        let inputValue;
        inputValue = getValue(section + input, index);
        click(section + input, index);
        for (let j = 0; j < inputValue.length; j++) {
            sendKeys('Delete');
        }
        sendKeys('Enter');
    }
});
