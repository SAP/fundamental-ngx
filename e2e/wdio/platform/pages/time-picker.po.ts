import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimePickerPO extends BaseComponentPo {
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

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'time-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'time-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.timePickerInput);
    }
}
