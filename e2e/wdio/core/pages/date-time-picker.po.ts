import { CoreBaseComponentPo } from './core-base-component.po';
import { click, waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DateTimePicker extends CoreBaseComponentPo {
    url = '/datetime-picker';
    root = '#page-content';
    topPage = 'h1.header';
    datePickerInput = 'fd-datetime-picker input';
    datePickerButton = 'fd-datetime-picker button';
    datePickerGroup = this.root + ' .fd-input-group';
    calendarExpanded = '.fd-datetime__container';
    buttonChange = 'button[label="Change"]';
    disabledDateTimePickerButton = '.is-disabled button';
    disabledDateTimePickerInput = '.is-disabled input';
    activeDay = '.fd-calendar__item--current';
    calendarYearsSection = '.fd-calendar__content--years';
    selectYearButton = '.fd-calendar__action:nth-child(3) .fd-button';
    selectMonthButton = '.fd-calendar__action:nth-child(2) .fd-button';
    buttonSelectYearsRange = '.fd-calendar__action:nth-child(2) .fd-button';
    okButton = 'button[fdtype="emphasized"]';
    cancelButton = 'button[aria-label="Cancel"]';
    buttonFirstRangeYear = '(//td[contains(@id,"-view-aggregated-years")]/child::button)[1]';
    buttonFirstYear = '(//td[contains(@id,"year")]/child::button)[1]';
    buttonFirstMonth = '(//td[contains(@id,"month")]/child::button)[1]';
    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    navigationUpArrowButton = 'button[glyph="navigation-up-arrow"]';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeColumn = 'fd-time-column';
    period = '//span[contains(text(), " PM ")]/parent::li';
    optionButton = 'div.fd-select__control';
    countryOption = 'ul.fd-select-options';
    calendarItem = '.fd-calendar__table td.fd-calendar__item';
    buttonText = ' .fd-button__text';

    filterCalendarValue = (name: string): string => `[id*="${name}"]`;

    getOptionById = (id: string): string => `#${id}`;

    clickDayInCalendarButtonByValue = (dayNumber: number): void => {
        click('.fd-calendar__table td.fd-calendar__item:not(.fd-calendar__item--other-month)', dayNumber - 1);
    };

    yearInCalendarByValue = (year: number): string => `[data-fd-calendar-year="${year}"]`;

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'datetime-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'datetime-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
