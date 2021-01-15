import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class DatePicker extends BaseComponentPo {
    url = '/date-picker';
    root = '#page-content';

    inputDatePicker = 'fd-date-picker input';
    buttonDatePicker = 'fd-date-picker button';

    activeButtonDatePicker = '[ng-reflect-is-disabled="false"] + span button';
    activeInputDatePicker = '[ng-reflect-is-disabled="false"][aria-label="Date input"]';

    calendarExpanded = '.fd-popover__popper fd-calendar';
    calendarYearsSection = '.fd-calendar__content--years';

    currentYear = '[aria-label="Select year"]';
    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';

    buttonGerman = 'button[ng-reflect-label="German"]'
    buttonBulgarian = 'button[ng-reflect-label="Bulgarian"]';
    buttonSelectYear = '[aria-label="Select year"]';
    buttonSelectMonth = '[aria-label="Select month"]';

    buttonFirstRangeYear = '(//td[contains(@id,"fd-aggregated-year")]/child::span)[1]'
    buttonFirstYear = '(//td[contains(@id,"year")]/child::span)[1]'
    buttonFirstMonth = '(//td[contains(@id,"month")]/child::span)[1]'

    filterCaledarValue = (name: string) => {
        return `//td[contains(@id,"fd-${name}")]`;
    };

    datePickerInputByIndex = (index: string) => {
        return `#fd-popover-${index} input`;
    };

    dayInCalendarButtonByValue = (index: string) => {
        return `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    yearInCalendarByValue = (year: number) => {
        return `[aria-label="${year}"]`
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
