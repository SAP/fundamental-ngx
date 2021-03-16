import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DatePicker extends CoreBaseComponentPo {
    url = '/datePicker';
    root = '#page-content';
    inputDatePicker = 'fd-date-picker input';
    buttonDatePicker = 'fd-date-picker button';
    activeButtonDatePicker = '//fd-date-picker//button[contains(@class, \'fd-button\') and not (contains(@class, \'is-disabled\'))]';
    activeDatePicker = '//div[contains(@class, \'fd-input-group\') and not (contains(@class, \'is-disabled\'))]//ancestor::fd-date-picker';
    activeInputDatePicker = '//fd-date-picker//input[contains(@class, \'fd-input-group\') and not (contains(@ng-reflect-is-disabled, "true"))]';
    disabledDivDatePicker = 'div.is-disabled';
    calendarExpanded = '.fd-popover__popper fd-calendar';
    calendarYearsSection = '.fd-calendar__content--years';
    currentDay = 'td.fd-calendar__item--current.is-active';
    buttonFrench = 'fd-segmented-button button:nth-child(1)';
    buttonGerman = 'fd-segmented-button button:nth-child(2)';
    buttonBulgarian = 'fd-segmented-button button:nth-child(3)';
    buttonSelectYear = '.fd-calendar__action:nth-child(3) .fd-button';
    buttonSelectMonth = '.fd-calendar__action:nth-child(2) .fd-button';
    buttonSelectYearsRange = '.fd-calendar__action:nth-child(2) .fd-button';
    buttonFirstRangeYear = '(//td[contains(@id,"fd-aggregated-year")]/child::span)[1]';
    buttonFirstYear = '(//td[contains(@id,"year")]/child::span)[1]';
    buttonFirstMonth = '(//td[contains(@id,"month")]/child::span)[1]';
    selectedDate = 'br~div';

    filterCalendarValue = (name: string): string => {
        return `//td[contains(@id,"fd-${name}")]`;
    };

    dayInCalendarButtonByValue = (index: string): string => {
        return `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    yearInCalendarByValue = (year: number): string => {
        return `[aria-label="${year}"]`
    };

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'date-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'date-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }


open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.inputDatePicker);
    };
}
