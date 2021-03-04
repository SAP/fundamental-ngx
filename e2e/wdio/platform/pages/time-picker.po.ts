import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimePickerPO extends BaseComponentPo {
    url = '/time-picker';
    root = '#page-content';
    errorBorder = '.is-error';
    setToNullButton = '[label="Set To Null"]';
    setValidTimeButton = '[label="Set Valid Time"]';
    timePickerInput = 'fd-time-picker input';
    timePickerButton = 'fd-time-picker button';
    activeTimePickerInput = 'fd-time-picker[ng-reflect-is-disabled="false"] input';
    activeTimePickerButton = 'fd-time-picker[ng-reflect-is-disabled="false"] button';
    invalidTimePickerInput = '[name="null-validity"] fd-time-picker.ng-invalid'
    timerExpanded = 'div.fd-time';
    disabledTimePicker = 'fd-input-group[ng-reflect-disabled="true"]';
    disabledInput = this.disabledTimePicker + ' input'
    disabledButton = this.disabledTimePicker + ' button'
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeItem = 'span.fd-time__item';
    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    selectedPeriod = '.fd-time__current-indicator ~ span.fd-time-column-custom-hidden'

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.timePickerInput);
    }
}
