import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TimePickerPO extends PlatformBaseComponentPo {
    url = '/time-picker';
    root = '#page-content';
    errorBorder = '.is-error';
    setToNullButton = '[label="Set To Null"]';
    setValidTimeButton = '[label="Set Valid Time"]';
    timePickerInput = 'fd-time-picker input';
    activeTimePickerInput = 'fd-time-picker input';
    activeTimePickerButton = 'fdp-time-picker button';
    invalidTimePickerInput = '[name="null-validity"] fd-time-picker.ng-invalid';
    timerExpanded = 'div.fd-time';
    disabledTimePicker = 'div.fd-input-group.is-disabled';
    disabledInput = this.disabledTimePicker + ' input';
    disabledButton = this.disabledTimePicker + ' button';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeColumn = 'fd-time-column';
    selectedValue = 'div.fd-time__current-indicator ~ span';
    hoursColumn = '.fd-time .fd-time__col:nth-child(1) ';
    thirdColumn = '.fd-time .fd-time__col:nth-child(3) ';
    columnItem = '.fd-time__item:not(.fd-time__item--collapsed)';
    selectedTimeItem = '.fd-time__item:nth-child(12)';

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'time-picker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'time-picker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
