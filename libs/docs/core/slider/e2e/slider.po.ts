import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SliderPo extends CoreBaseComponentPo {
    private url = '/slider';

    pageHeader = 'fd-slider-header h1';

    // example blocks
    basicExamples = 'fd-slider-basic-example ';
    tooltipExamples = 'fd-slider-tooltip-example ';
    ticksAndLabelsExamples = 'fd-slider-ticks-and-labels-example ';
    customExamples = 'fd-slider-custom-values-example ';
    rangeExamples = 'fd-slider-range-example ';
    disabledExamples = 'fd-slider-disabled-example ';
    cozyExamples = 'fd-slider-cozy-example ';
    playgroundExamples = 'playground ';

    // main selectors
    sliderHandles = '.fd-slider__handle';
    valueLabels = 'p:nth-of-type(2)';
    sliderTooltip = 'fd-popover-body .fd-slider--tooltip';
    sliderTooltipInput = 'fd-popover-body .fd-popover__popper input';
    sliderTooltipInputFF = 'fd-popover-body .fd-slider--tooltip-wrapper input';
    sliderAttr = 'fd-slider';
    sliderLabels = '.fd-slider__labels';
    sliderLabel = '.fd-slider__label';

    // playground selectors
    sliderTypeMenu = this.playgroundExamples + 'select';
    sliderTypeOptions = this.playgroundExamples + 'option';
    sliderInput = this.playgroundExamples + 'input';
    firstSliderLabel = this.playgroundExamples + this.sliderLabel + ':first-of-type';
    lastSliderLabel = this.playgroundExamples + this.sliderLabel + ':last-of-type';
    secondSliderLabel = this.playgroundExamples + this.sliderLabel + ':nth-of-type(2)';
    progressTracker = this.playgroundExamples + '.fd-slider__track-range';
    sliderTicks = this.playgroundExamples + '.fd-slider__tick';
    inputCheckboxes = this.playgroundExamples + '.fd-checkbox__label';

    // other selectors
    ticksAnsMarksSliderTicks = this.ticksAndLabelsExamples + '.fd-slider__ticks';
    ticksAnsMarksSliderLabels = this.ticksAndLabelsExamples + this.sliderLabels;

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
