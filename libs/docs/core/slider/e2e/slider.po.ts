import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class SliderPo extends CoreBaseComponentPo {
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
    sliderTooltip = 'fd-popover-body .fd-slider-tooltip';
    sliderTooltipInput = 'fd-popover-body .fd-popover__body input';
    sliderTooltipInputFF = 'fd-popover-body .fd-slider-tooltip-wrapper input';
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

    private url = '/slider';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'slider'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'slider'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
