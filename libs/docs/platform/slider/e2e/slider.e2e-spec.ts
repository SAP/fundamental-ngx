import { SliderPo } from './slider.po';
import {
    browserIsFirefox,
    browserIsSafari,
    clearValue,
    click,
    clickAndMoveElement,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '../../../../../e2e';

declare const $$: any;

describe('slider test suite', () => {
    const sliderPage = new SliderPo();
    const {
        basicExamples,
        sliderHandles,
        valueLabels,
        tooltipExamples,
        sliderTooltip,
        sliderAttr,
        sliderLabels,
        customExamples,
        rangeExamples,
        disabledExamples,
        cozyExamples,
        playgroundExamples,
        sliderTypeMenu,
        sliderTypeOptions,
        sliderInput,
        firstSliderLabel,
        lastSliderLabel,
        secondSliderLabel,
        progressTracker,
        inputCheckboxes,
        sliderTicks,
        sliderTooltipInput,
        sliderTooltipInputFF,
        formFieldExamples,
        formValueLabels,
        altSliderAttr,
        sliderCozyClass
    } = sliderPage;

    beforeAll(async () => {
        await sliderPage.open();
    }, 1);

    describe('basic examples', () => {
        it('should check slider with default state', async () => {
            const startValue = await getText(basicExamples + valueLabels);
            await clickAndMoveElement(basicExamples + sliderHandles, -50, 0);
            await expect(await getText(basicExamples + valueLabels)).not.toEqual(startValue);
        });

        it('should check slider with negative values', async () => {
            const startValue = await getText(basicExamples + valueLabels, 1);
            await clickAndMoveElement(basicExamples + sliderHandles, -50, 0, 1);
            await expect(await getText(basicExamples + valueLabels, 1)).not.toEqual(startValue);
            await expect(await getText(basicExamples + valueLabels, 1)).toContain('-');
        });

        it('should check slider with step by 5', async () => {
            await clickAndMoveElement(basicExamples + sliderHandles, -50, 0, 2);
            await expect(await getText(basicExamples + valueLabels, 2)).toContain('-5');
        });

        it('should check slider with float value step', async () => {
            await clickAndMoveElement(basicExamples + sliderHandles, -70, 0, 3);
            await expect(await getText(basicExamples + valueLabels, 3)).toContain('-0.2');
        });
    });

    describe('tooltip examples', () => {
        it('should check readonly tooltip', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(tooltipExamples);
            await mouseHoverElement(tooltipExamples + sliderHandles);
            await expect(await waitForElDisplayed(sliderTooltip)).toBe(true);
        });

        it('should check tooltip with input', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await click(tooltipExamples + sliderHandles, 1);
            await mouseHoverElement(tooltipExamples + sliderHandles, 1);
            await waitForElDisplayed(sliderTooltipInput);
            await clearTooltipInput();
            await clickTooltipInput();
            await sendKeys(['20', 'Enter']);
            await expect(await getText(tooltipExamples + valueLabels, 1)).toContain('20');
        });
    });

    describe('custom value examples', () => {
        it('should check custom slider values', async () => {
            await scrollIntoView(customExamples);
            const startValue = await getText(customExamples + valueLabels);
            await clickAndMoveElement(customExamples + sliderHandles, -200, 0);
            await expect(await getText(customExamples + valueLabels)).not.toEqual(startValue);
        });
    });

    describe('range slider examples', () => {
        it('should check default range slider', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(rangeExamples);
            const startValuesArr = (await getText(rangeExamples + valueLabels)).split('\n');
            const startMinValue = startValuesArr[0];
            const startMaxValue = startValuesArr[1];

            await clickAndMoveElement(rangeExamples + sliderHandles, -75, 0);
            await scrollIntoView(rangeExamples);
            await clickAndMoveElement(rangeExamples + sliderHandles, 75, 0, 1);
            const endValuesArr = (await getText(rangeExamples + valueLabels)).split('\n');
            const endMinValue = endValuesArr[0];
            const endMaxValue = endValuesArr[1];

            await expect(startMinValue).not.toEqual(endMinValue);
            await expect(startMaxValue).not.toEqual(endMaxValue);
        });

        it('should check range slider with custom values', async () => {
            if (await browserIsSafari()) {
                return;
            }
            const startValuesArr = (await getText(rangeExamples + valueLabels, 1)).split('\n');
            const startMinValue = startValuesArr[0];
            const startMaxValue = startValuesArr[1];

            await clickAndMoveElement(rangeExamples + sliderHandles, -200, 0, 2);
            await clickAndMoveElement(rangeExamples + sliderHandles, 200, 0, 3);
            const endValuesArr = (await getText(rangeExamples + valueLabels, 1)).split('\n');
            const endMinValue = endValuesArr[0];
            const endMaxValue = endValuesArr[1];

            await expect(startMinValue).not.toEqual(endMinValue);
            await expect(startMaxValue).not.toEqual(endMaxValue);
        });
    });

    describe('should check form field examples', () => {
        it('should check single mode output', async () => {
            const startValue = await getText(formFieldExamples + formValueLabels);
            await clickAndMoveElement(formFieldExamples + sliderHandles, -50, 0);
            await expect(await getText(formFieldExamples + formValueLabels)).not.toEqual(startValue);
        });

        it('should check range mode output', async () => {
            const startValue = await getText(formFieldExamples + formValueLabels, 1);
            await clickAndMoveElement(formFieldExamples + sliderHandles, -50, 0, 1);
            await clickAndMoveElement(formFieldExamples + sliderHandles, 50, 0, 2);
            await expect(await getText(formFieldExamples + formValueLabels, 1)).not.toEqual(startValue);
        });
    });

    describe('disabled examples', () => {
        it('should check range slider is disabled', async () => {
            await scrollIntoView(disabledExamples);
            await expect(await getElementClass(disabledExamples + sliderAttr)).toContain('is-disabled');
        });
    });

    describe('cozy examples', () => {
        it('should check cozy property', async () => {
            await scrollIntoView(cozyExamples);
            await expect(await $$(`${cozyExamples + altSliderAttr} > ${sliderCozyClass}`)).toBeTruthy();
        });

        it('should check cozy slider', async () => {
            const startValue = await getText(cozyExamples + valueLabels);
            await clickAndMoveElement(cozyExamples + sliderHandles, -50, 0);
            await expect(await getText(cozyExamples + valueLabels)).not.toEqual(startValue);
        });
    });

    xdescribe('playground examples', () => {
        it('should check slider single and range sliders available', async () => {
            await scrollIntoView(playgroundExamples);
            await expect(await getElementArrayLength(playgroundExamples + sliderHandles)).toBe(1);
            await click(sliderTypeMenu);
            await click(sliderTypeOptions, 1);
            await expect(await getElementArrayLength(playgroundExamples + sliderHandles)).toBe(2);
        });

        it('should check custom min and max values', async () => {
            await clearValue(sliderInput);
            await click(sliderInput);
            await setValue(sliderInput, '-10');
            await clearValue(sliderInput, 1);
            await click(sliderInput, 1);
            await setValue(sliderInput, '110', 1);

            await expect(await getText(firstSliderLabel)).toEqual('-10');
            await expect(await getText(lastSliderLabel)).toEqual('110');
        });

        it('should check step values', async () => {
            await clearValue(sliderInput, 2);
            await click(sliderInput, 2);
            await setValue(sliderInput, '20', 2);
            // eslint-disable-next-line radix
            const firstLabelValue = parseInt(await getText(firstSliderLabel));
            // eslint-disable-next-line radix
            const secondLabelValue = parseInt(await getText(secondSliderLabel));

            await expect(secondLabelValue - firstLabelValue).toEqual(20);
        });

        it('should check hide/show progress bar', async () => {
            await expect(await doesItExist(progressTracker)).toBe(true);
            await click(inputCheckboxes);
            await expect(await doesItExist(progressTracker)).toBe(false);
        });

        it('should check hide/show ticks', async () => {
            await expect(await doesItExist(sliderTicks)).toBe(true);
            await click(inputCheckboxes, 1);
            await expect(await doesItExist(sliderTicks)).toBe(false);
        });

        it('should check hide/show tick labels', async () => {
            await click(inputCheckboxes, 1);
            await expect(await doesItExist(playgroundExamples + sliderLabels)).toBe(true);
            await click(inputCheckboxes, 2);
            await expect(await doesItExist(playgroundExamples + sliderLabels)).toBe(false);
        });

        it('should check ability to disable slider', async () => {
            await expect(await getElementClass(playgroundExamples + sliderAttr)).not.toContain('is-disabled');
            await click(inputCheckboxes, 3);
            await expect(await getElementClass(playgroundExamples + sliderAttr)).toContain('is-disabled');
        });
    });

    describe('orientation check', () => {
        it('should check RTL/LTR orientations', async () => {
            await sliderPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        beforeEach(async () => {
            await refreshPage();
        }, 1);

        it('should check examples visual regression', async () => {
            await sliderPage.saveExampleBaselineScreenshot();
            await expect(await sliderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function clickTooltipInput(): Promise<void> {
        return (await browserIsFirefox()) ? await click(sliderTooltipInputFF) : await click(sliderTooltipInput);
    }

    async function clearTooltipInput(): Promise<void> {
        return (await browserIsFirefox())
            ? await clearValue(sliderTooltipInputFF)
            : await clearValue(sliderTooltipInput);
    }
});
