import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TimePicker extends BaseComponentPo {
    url = '/time-picker';
    root = '#page-content';
    errorBorder = '.is-error';
    setToNullButton = '[label="Set To Null"]';
    setValidTimeButton = '[label="Set Valid Time"]';
    timePickerInput = 'fd-time-picker input';
    timePickerButton = 'fd-time-picker button';
    activeTimePickerInput = 'fd-time-picker[ng-reflect-is-disabled="false"] input';
    activeTimePickerButton = 'fd-time-picker[ng-reflect-is-disabled="false"] button';
    timerExpanded = '.fd-time';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeItem = 'span.fd-time__item';
    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    period = '//span[contains(text(), " PM ")]/parent::li';


    filterCaledarValue = (name: string): string => {
        return `//td[contains(@id,"fd-${name}")]`;
    };

    dayInDisabledFunctionsCalendarByIndex = (index: string): string => {
        return `#fd-calendar-9-fd-day-${index}`;
    }

    dayInCalendarButtonByValue = (index: string): string => {
        return `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    yearInCalendarByValue = (year: number): string => {
        return `[aria-label="${year}"]`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.timePickerInput);
    }
}
