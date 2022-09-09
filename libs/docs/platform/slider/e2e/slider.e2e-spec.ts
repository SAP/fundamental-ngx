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

    beforeAll(() => {
        sliderPage.open();
    }, 1);

    describe('basic examples', () => {
        it('should check slider with default state', () => {
            const startValue = getText(basicExamples + valueLabels);
            clickAndMoveElement(basicExamples + sliderHandles, -50, 0);
            expect(getText(basicExamples + valueLabels)).not.toEqual(startValue);
        });

        it('should check slider with negative values', () => {
            const startValue = getText(basicExamples + valueLabels, 1);
            clickAndMoveElement(basicExamples + sliderHandles, -50, 0, 1);
            expect(getText(basicExamples + valueLabels, 1)).not.toEqual(startValue);
            expect(getText(basicExamples + valueLabels, 1)).toContain('-');
        });

        it('should check slider with step by 5', () => {
            clickAndMoveElement(basicExamples + sliderHandles, -50, 0, 2);
            expect(getText(basicExamples + valueLabels, 2)).toContain('-5');
        });

        it('should check slider with float value step', () => {
            clickAndMoveElement(basicExamples + sliderHandles, -70, 0, 3);
            expect(getText(basicExamples + valueLabels, 3)).toContain('-0.2');
        });
    });

    describe('tooltip examples', () => {
        it('should check readonly tooltip', () => {
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(tooltipExamples);
            mouseHoverElement(tooltipExamples + sliderHandles);
            expect(waitForElDisplayed(sliderTooltip)).toBe(true);
        });

        it('should check tooltip with input', () => {
            if (browserIsSafari()) {
                return;
            }
            click(tooltipExamples + sliderHandles, 1);
            mouseHoverElement(tooltipExamples + sliderHandles, 1);
            waitForElDisplayed(sliderTooltipInput);
            clearTooltipInput();
            clickTooltipInput();
            sendKeys(['20', 'Enter']);
            expect(getText(tooltipExamples + valueLabels, 1)).toContain('20');
        });
    });

    describe('custom value examples', () => {
        it('should check custom slider values', () => {
            scrollIntoView(customExamples);
            const startValue = getText(customExamples + valueLabels);
            clickAndMoveElement(customExamples + sliderHandles, -200, 0);
            expect(getText(customExamples + valueLabels)).not.toEqual(startValue);
        });
    });

    describe('range slider examples', () => {
        it('should check default range slider', () => {
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(rangeExamples);
            const startValuesArr = getText(rangeExamples + valueLabels).split('\n');
            const startMinValue = startValuesArr[0];
            const startMaxValue = startValuesArr[1];

            clickAndMoveElement(rangeExamples + sliderHandles, -75, 0);
            scrollIntoView(rangeExamples);
            clickAndMoveElement(rangeExamples + sliderHandles, 75, 0, 1);
            const endValuesArr = getText(rangeExamples + valueLabels).split('\n');
            const endMinValue = endValuesArr[0];
            const endMaxValue = endValuesArr[1];

            expect(startMinValue).not.toEqual(endMinValue);
            expect(startMaxValue).not.toEqual(endMaxValue);
        });

        it('should check range slider with custom values', () => {
            if (browserIsSafari()) {
                return;
            }
            const startValuesArr = getText(rangeExamples + valueLabels, 1).split('\n');
            const startMinValue = startValuesArr[0];
            const startMaxValue = startValuesArr[1];

            clickAndMoveElement(rangeExamples + sliderHandles, -200, 0, 2);
            clickAndMoveElement(rangeExamples + sliderHandles, 200, 0, 3);
            const endValuesArr = getText(rangeExamples + valueLabels, 1).split('\n');
            const endMinValue = endValuesArr[0];
            const endMaxValue = endValuesArr[1];

            expect(startMinValue).not.toEqual(endMinValue);
            expect(startMaxValue).not.toEqual(endMaxValue);
        });
    });

    describe('should check form field examples', () => {
        it('should check single mode output', () => {
            const startValue = getText(formFieldExamples + formValueLabels);
            clickAndMoveElement(formFieldExamples + sliderHandles, -50, 0);
            expect(getText(formFieldExamples + formValueLabels)).not.toEqual(startValue);
        });

        it('should check range mode output', () => {
            const startValue = getText(formFieldExamples + formValueLabels, 1);
            clickAndMoveElement(formFieldExamples + sliderHandles, -50, 0, 1);
            clickAndMoveElement(formFieldExamples + sliderHandles, 50, 0, 2);
            expect(getText(formFieldExamples + formValueLabels, 1)).not.toEqual(startValue);
        });
    });

    describe('disabled examples', () => {
        it('should check range slider is disabled', () => {
            scrollIntoView(disabledExamples);
            expect(getElementClass(disabledExamples + sliderAttr)).toContain('is-disabled');
        });
    });

    describe('cozy examples', () => {
        it('should check cozy property', () => {
            scrollIntoView(cozyExamples);
            expect($$(`${cozyExamples + altSliderAttr} > ${sliderCozyClass}`)).toBeTruthy();
        });

        it('should check cozy slider', () => {
            const startValue = getText(cozyExamples + valueLabels);
            clickAndMoveElement(cozyExamples + sliderHandles, -50, 0);
            expect(getText(cozyExamples + valueLabels)).not.toEqual(startValue);
        });
    });

    xdescribe('playground examples', () => {
        it('should check slider single and range sliders available', () => {
            scrollIntoView(playgroundExamples);
            expect(getElementArrayLength(playgroundExamples + sliderHandles)).toBe(1);
            click(sliderTypeMenu);
            click(sliderTypeOptions, 1);
            expect(getElementArrayLength(playgroundExamples + sliderHandles)).toBe(2);
        });

        it('should check custom min and max values', () => {
            clearValue(sliderInput);
            click(sliderInput);
            setValue(sliderInput, '-10');
            clearValue(sliderInput, 1);
            click(sliderInput, 1);
            setValue(sliderInput, '110', 1);

            expect(getText(firstSliderLabel)).toEqual('-10');
            expect(getText(lastSliderLabel)).toEqual('110');
        });

        it('should check step values', () => {
            clearValue(sliderInput, 2);
            click(sliderInput, 2);
            setValue(sliderInput, '20', 2);
            // eslint-disable-next-line radix
            const firstLabelValue = parseInt(getText(firstSliderLabel));
            // eslint-disable-next-line radix
            const secondLabelValue = parseInt(getText(secondSliderLabel));

            expect(secondLabelValue - firstLabelValue).toEqual(20);
        });

        it('should check hide/show progress bar', () => {
            expect(doesItExist(progressTracker)).toBe(true);
            click(inputCheckboxes);
            expect(doesItExist(progressTracker)).toBe(false);
        });

        it('should check hide/show ticks', () => {
            expect(doesItExist(sliderTicks)).toBe(true);
            click(inputCheckboxes, 1);
            expect(doesItExist(sliderTicks)).toBe(false);
        });

        it('should check hide/show tick labels', () => {
            click(inputCheckboxes, 1);
            expect(doesItExist(playgroundExamples + sliderLabels)).toBe(true);
            click(inputCheckboxes, 2);
            expect(doesItExist(playgroundExamples + sliderLabels)).toBe(false);
        });

        it('should check ability to disable slider', () => {
            expect(getElementClass(playgroundExamples + sliderAttr)).not.toContain('is-disabled');
            click(inputCheckboxes, 3);
            expect(getElementClass(playgroundExamples + sliderAttr)).toContain('is-disabled');
        });
    });

    describe('orientation check', () => {
        it('should check RTL/LTR orientations', () => {
            sliderPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        beforeEach(() => {
            refreshPage();
        }, 1);

        it('should check examples visual regression', () => {
            sliderPage.saveExampleBaselineScreenshot();
            expect(sliderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function clickTooltipInput(): void {
        return browserIsFirefox() ? click(sliderTooltipInputFF) : click(sliderTooltipInput);
    }

    function clearTooltipInput(): void {
        return browserIsFirefox() ? clearValue(sliderTooltipInputFF) : clearValue(sliderTooltipInput);
    }
});
