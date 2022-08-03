import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class SliderPo extends BaseComponentPo {
    private url = '/slider';
    root = '#page-content';

    // example blocks
    basicExamples = 'fdp-slider-basic-example ';
    tooltipExamples = 'fdp-slider-tooltip-example ';
    ticksAndLabelsExamples = 'fdp-slider-ticks-and-labels-example ';
    customExamples = 'fdp-slider-custom-values-example ';
    rangeExamples = 'fdp-slider-range-example ';
    formFieldExamples = 'fdp-slider-form-field-example ';
    disabledExamples = 'fdp-slider-disabled-example ';
    cozyExamples = 'fdp-slider-cozy-example ';
    playgroundExamples = 'playground ';

    // main selectors
    sliderHandles = '.fd-slider__handle';
    valueLabels = 'p:nth-of-type(2)';
    formValueLabels = 'p';
    sliderTooltip = 'fd-popover-body .fd-slider--tooltip';
    sliderTooltipInput = 'fd-popover-body .fd-popover__popper input';
    sliderTooltipInputFF = 'fd-popover-body .fd-slider--tooltip-wrapper input';
    sliderAttr = 'fd-slider';
    altSliderAttr = 'fdp-slider';
    sliderLabels = '.fd-slider__labels';
    sliderLabel = '.fd-slider__label';

    // playground selectors
    sliderTypeMenu = this.playgroundExamples + '#playgroundmode';
    sliderTypeOptions = this.playgroundExamples + 'option';
    sliderInput = this.playgroundExamples + 'input';
    firstSliderLabel = this.playgroundExamples + this.sliderLabel + ':first-of-type';
    lastSliderLabel = this.playgroundExamples + this.sliderLabel + ':last-of-type';
    secondSliderLabel = this.playgroundExamples + this.sliderLabel + ':nth-of-type(2)';
    progressTracker = this.playgroundExamples + '.fd-slider__track-range';
    sliderTicks = this.playgroundExamples + '.fd-slider__tick';
    inputCheckboxes = this.playgroundExamples + '.fd-checkbox__label';
    sliderCozyClass = '.fd-slider--lg';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'slider'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'slider'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
