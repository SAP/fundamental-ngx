import { StepInputPo } from './step-input.po';
import {
    browserIsFirefox,
    browserIsSafari,
    click,
    clickRightMouseBtn,
    doubleClick,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { sections } from './step-input-content';

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

    beforeAll(async () => {
        await stepInputPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(stepInputPage.root);
        await waitForElDisplayed(stepInputPage.title);
    }, 2);

    it('should check default example inputs', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkTypingValueInInput(sections[i], '+');
            await checkTypingValueInInput(sections[i], '-');
        }
    });

    it('should check increase/dicrease value by plus-minus buttons', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkIncDicValueByBtn(sections[i], '+');
            await checkIncDicValueByBtn(sections[i], '-');
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6963
    xit('should check increase/dicrease value by plus-minus buttons', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkClickByRightMouseBth(sections[i]);
        }
    });

    it('should check that minimum - maximum value for step input is from -10 to 10', async () => {
        await scrollIntoView(configExample + input, 5);
        (await browserIsFirefox()) || (await browserIsSafari())
            ? await clearInputFF(configExample, 5)
            : await clearInput(configExample, 5);
        await setValue(configExample + input, '10', 5);
        await sendKeys('Enter');
        await expect(await getElementClass(configExample + plusButton, 5)).toContain(
            'is-disabled',
            'button is not disabled'
        );
        (await browserIsFirefox()) || (await browserIsSafari())
            ? await clearInputFF(configExample, 5)
            : await clearInput(configExample, 5);
        await setValue(configExample + input, '-10', 5);
        await sendKeys('Enter');
        await expect(await getElementClass(configExample + minusButton, 5)).toContain(
            'is-disabled',
            'button is not disabled'
        );
    });

    it('should check data entry more than minimum and maximum', async () => {
        await scrollIntoView(configExample + input, 5);
        (await browserIsFirefox()) || (await browserIsSafari())
            ? await clearInputFF(configExample, 5)
            : await clearInput(configExample, 5);
        await setValue(configExample + input, '20', 5);
        await sendKeys('Enter');
        await expect(await getValue(configExample + input, 5)).toEqual('10');
        await expect(await getElementClass(configExample + plusButton, 5)).toContain(
            'is-disabled',
            'button is not disabled'
        );

        (await browserIsFirefox()) || (await browserIsSafari())
            ? await clearInputFF(configExample, 5)
            : await clearInput(configExample, 5);
        await setValue(configExample + input, '-20', 5);
        await sendKeys('Enter');
        await expect(await getValue(configExample + input, 5)).toEqual('-10');
        await expect(await getElementClass(configExample + minusButton, 5)).toContain(
            'is-disabled',
            'button is not disabled'
        );
    });

    it('should verify that in specific input step is 0.5', async () => {
        await scrollIntoView(configExample + input, 6);
        await click(configExample + plusButton, 6);
        await expect(parseFloat(await getValue(configExample + input, 6))).toEqual(0.5);
        await click(configExample + minusButton, 6);
        await click(configExample + minusButton, 6);
        await expect(parseFloat(await getValue(configExample + input, 6))).toEqual(-0.5);
    });

    it('should check Saudi Arabia locale', async () => {
        await scrollIntoView(configExample + input, 5);
        (await browserIsFirefox()) || (await browserIsSafari())
            ? await clearInputFF(configExample, 5)
            : await clearInput(configExample, 5);
        await setValue(localExample + input, '5', 2);
        await sendKeys('Enter');
        await expect(await getValue(localExample + input, 2)).toEqual('٥');
    });

    it('should check input status for Input States example', async () => {
        await expect(await getElementClass(stateExample + step, 0)).toContain('is-information');
        await expect(await getElementClass(stateExample + step, 1)).toContain('is-success');
        await expect(await getElementClass(stateExample + step, 2)).toContain('is-warning');
        await expect(await getElementClass(stateExample + step, 3)).toContain('is-error');
    });

    it('should check entering invalid values in inputs', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkInputWithInvalidValues(sections[i]);
        }
    });

    it('should check disabled inputs', async () => {
        await expect(await getElementClass(formExample + step, 2)).toContain('is-disabled', 'input is not disabled');
        await expect(await isElementClickable(formExample + plusButton, 2)).toBe(false, 'element is clickable');
        await expect(await isElementClickable(formExample + minusButton, 2)).toBe(false, 'element is clickable');
        await expect(await getElementClass(formExample + step, 3)).toContain('is-readonly', 'input is not read-only');
    });

    it('should check RTL orientation', async () => {
        await stepInputPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await stepInputPage.saveExampleBaselineScreenshot();
        await expect(await stepInputPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkClickByRightMouseBth(section: string): Promise<void> {
        const inputLength = await getElementArrayLength(section + input);
        await scrollIntoView(section);
        for (let i = 0; i < inputLength; i++) {
            const defaultValue = await getValue(section + input, i);
            await clickRightMouseBtn(section + plusButton, i);
            await expect(await getValue(section + input, i)).toEqual(
                defaultValue,
                'value changed by clickin on right mouse button'
            );
            await clickRightMouseBtn(section + minusButton, i);
            await expect(await getValue(section + input, i)).toEqual(
                defaultValue,
                'value changed by clickin on right mouse button'
            );
        }
    }

    async function checkInputWithInvalidValues(section: string): Promise<void> {
        await scrollIntoView(section);
        let inputLength = await getElementArrayLength(section + input);
        let defaultValue;
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        for (let i = 0; i < inputLength; i++) {
            await scrollIntoView(section + input, i);
            defaultValue = await getValue(section + input, i);
            browserIsFirefox() || (await browserIsSafari())
                ? await clearInputFF(configExample, 5)
                : await clearInput(configExample, 5);
            await setValue(section + input, 'asd123', i);
            await sendKeys('Enter');
            await expect(await getValue(section + input, i)).toEqual(defaultValue);
        }
    }

    async function checkIncDicValueByBtn(section: string, sign: '+' | '-'): Promise<void> {
        let inputLength = await getElementArrayLength(section + input);
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        let defaultValue;

        for (let i = 0; i < inputLength; i++) {
            await scrollIntoView(section + input, i);
            (await browserIsFirefox()) || (await browserIsSafari())
                ? await clearInputFF(section, i)
                : await clearInput(section, i);
            await setValue(section + input, '0', i);
            defaultValue = parseFloat(await getValue(section + input, i));
            /* for states example, popover can block minus(-) btn when page scrolled for clicks;
            click on input label to remove popover before clicking minus btn */
            await click(section + 'label');
            if (sign === '+') {
                await click(section + plusButton, i);
                await expect(parseFloat(await getValue(section + input, i))).toBeGreaterThan(defaultValue);
            }
            if (sign === '-') {
                await click(section + minusButton, i);
                await expect(parseFloat(await getValue(section + input, i))).toBeLessThan(defaultValue);
            }
        }
    }

    async function checkTypingValueInInput(section: string, sign: '+' | '-'): Promise<void> {
        let inputLength = await getElementArrayLength(section + input);
        if (section === formExample || section === localExample) {
            inputLength = 2;
        }
        const plusValue = '5';
        const minusValue = '-5';
        let additionalText;
        let expectedValue;
        for (let i = 0; i < inputLength; i++) {
            await scrollIntoView(section + input, i);
            additionalText = '';

            (await browserIsFirefox()) || (await browserIsSafari())
                ? await clearInputFF(section, i)
                : await clearInput(section, i);

            sign === '+'
                ? await setValue(section + input, plusValue.toString(), i)
                : await setValue(section + input, minusValue.toString(), i);
            await sendKeys('Enter');

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

            await expect(await getValue(section + input, i)).toEqual(expectedValue + additionalText);
            if (section !== formExample) {
                await expect(await getText(section + text, i)).toEqual(`Value: ${expectedValue}`);
            }

            if (section === formExample) {
                if (i === 0) {
                    await expect(await getText(textForDisabledExample)).toEqual(expectedValue);
                } else if (i === 1) {
                    await expect(await getText(section + text)).toEqual(`Value: ${expectedValue}`);
                }
            }
        }
    }

    async function clearInput(section: string, index: number = 0): Promise<void> {
        await doubleClick(section + input, index);
        await sendKeys('Backspace');
    }

    async function clearInputFF(section: string, index: number = 0): Promise<void> {
        const inputValue = await getValue(section + input, index);
        await click(section + input, index);
        for (let j = 0; j < inputValue.length; j++) {
            await sendKeys('Delete');
        }
        await sendKeys('Enter');
    }
});
