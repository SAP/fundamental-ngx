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
    usFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(1)';
    frFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(2)';
    bgFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(3)';
    zhFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(4)';
    bnFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(5)';
    arFormat = '.cdk-overlay-container ul[fd-list] li[fd-option]:nth-child(6)';

    openClock(): void {
        click(this.localExample + this.clockIcon);
    }

    closeClock(): void {
        click(this.localExample + this.clockIcon);
    }

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
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
