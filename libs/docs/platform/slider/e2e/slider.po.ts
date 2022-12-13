import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SliderPo extends PlatformBaseComponentPo {
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
    sliderTooltipInput = 'fd-popover-body .fd-popover__body input';
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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'slider'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'slider'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
