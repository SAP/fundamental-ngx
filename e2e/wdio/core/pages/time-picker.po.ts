import { CoreBaseComponentPo } from './core-base-component.po';
import { click, waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimePickerPo extends CoreBaseComponentPo {
    url = '/time-picker';

    defaultExample = 'fd-time-picker-example ';
    formattingExample = 'fd-time-picker-format-example ';
    disabledExample = 'fd-time-picker-disabled-example ';
    compactExamle = 'fd-time-picker-compact-example ';
    nullExample = 'fd-time-picker-allow-null-example ';
    formExample = 'fd-time-picker-form-example ';
    localExample = 'fd-time-picker-locale-example ';

    setToNullButton = this.nullExample + '.fd-button:nth-child(5)';
    setValidTimeButton = this.nullExample + '.fd-button:nth-child(6)';
    inputGroup = '.fd-input-group ';
    timeInput = this.inputGroup + '.fd-input';
    customTimePicker = '.fd-timepicker-custom';
    clockIcon = '.fd-input-group__button';
    formatDropDown = this.localExample + '.fd-select__button';
    timePicker = '.fd-time';
    selectedTime = this.formExample + '> form > div:nth-child(1) > span';

    hoursColumn = 'fd-time-column:nth-child(1) ';
    minutesColumn = 'fd-time-column:nth-child(2) ';
    thirdColumn = 'fd-time-column:nth-child(3) div';
    amButton = this.thirdColumn + ' li:nth-child(1)';
    pmButton = this.thirdColumn + ' li:nth-child(2)';

    currentHour = this.hoursColumn + '> .fd-time__wrapper ul > li:nth-child(12)';
    currentMinute = this.minutesColumn + '> .fd-time__wrapper ul > li:nth-child(30)';
    currentSec = this.thirdColumn + '> .fd-time__wrapper ul > li:nth-child(30)';

    hoursPoint = this.hoursColumn + '> .fd-time__wrapper ul > li';

    formatList = '.fd-popover__popper';
    usFormat = '#fd-option-0';
    frFormat = '#fd-option-1';
    bgFormat = '#fd-option-2';
    zhFormat = '#fd-option-3';
    bnFormat = '#fd-option-4';
    arFormat = '#fd-option-5';

    openClock(): void {
        click(this.localExample + this.clockIcon);
    }

    closeClock(): void {
        click(this.localExample + this.clockIcon);
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.root);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'time-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'time-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
