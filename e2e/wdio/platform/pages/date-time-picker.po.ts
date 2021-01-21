import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DateTimePicker extends BaseComponentPo {
    url = '/datetime-picker';
    root = '#page-content';

    topPage = 'h1.header';
    bottomPage = '#datetimePickerDisableFunction ~ code-example button';

    inputDatePicker = 'fd-datetime-picker input';
    buttonDatePicker = 'fd-datetime-picker button';

    activeButtonDateTimePicker = 'fd-datetime-picker [ng-reflect-is-disabled="false"] + span button';
    activeInputDateTimePicker = '[ng-reflect-is-disabled="false"][aria-label="Datetime input"]';

    disabledButtonDateTimePicker = '.is-disabled button';
    disabledInputDateTimePicker = '.is-disabled input';

    compactButtonDateTimePicker = '.fd-button--compact';
    compactInputDateTimePicker = '.fd-input--compact';
    changeDateTimeValueButton = 'button[name="changeBtn"]';

    calendarExpanded = '.fd-datetime__container';
    calendarYearsSection = '.fd-calendar__content--years';

    currentYear = '[aria-label="Select year"]';
    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';

    buttonGerman = 'button[ng-reflect-label="German"]'
    buttonBulgarian = 'button[ng-reflect-label="Bulgarian"]';
    buttonSelectYear = '[aria-label="Select year"]';
    buttonSelectMonth = '[aria-label="Select month"]';

    buttonFirstRangeYear = '(//td[contains(@id,"fd-aggregated-year")]/child::span)[1]';
    buttonFirstYear = '(//td[contains(@id,"year")]/child::span)[1]';
    buttonFirstMonth = '(//td[contains(@id,"month")]/child::span)[1]';
    buttonNavigationUpArrow = 'button[glyph="navigation-up-arrow"]';
    buttonNavigationDownArrow = 'button[glyph="navigation-down-arrow"]';
    timeItem = 'span.fd-time__item';
    buttonOk = 'button[fdtype="emphasized"]';
    buttonCancel = 'button[ng-reflect-label="Cancel"]'

    selectedHours = '(//div[contains(@class, \'fd-time__wrapper\')]//li[contains(@class, \'fd-time__item\')])[12]';
    selectedMinutes = '(//div[contains(@class, \'fd-time__wrapper\')]//li[contains(@class, \'fd-time__item\')])[54]';
    period = '//span[contains(text(), \' PM \')]/parent::li';


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
        waitForPresent(this.inputDatePicker);
    }
}
