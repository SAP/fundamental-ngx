import { BaseComponentPo } from './base-component.po';
import { getElementClass, waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DateTimePicker extends BaseComponentPo {
    url = '/datetime-picker';
    root = '#page-content';

    disabledFunctionExample = 'fdp-platform-datetime-picker-disable-function-example ';

    topPage = 'h1.header';
    bottomPage = '#disable-function ~ code-example button';

    datePickerInput = 'fd-datetime-picker input';
    datePickerButton = 'fd-datetime-picker button';

    activeDateTimePickerButton = 'fd-datetime-picker span button';
    activeDateTimePickerInput = '[ng-reflect-is-disabled="false"][aria-label="Datetime input"]';

    disabledDateTimePickerButton = '.is-disabled button';
    disabledDateTimePickerInput = '.is-disabled input';

    compactDateTimePickerButton = '.fd-button--compact';
    compactDateTimePickerInput = '.fd-input--compact';
    changeDateTimeValueButton = 'button[name="changeBtn"]';

    calendarExpanded = '.fd-datetime__container';
    calendarYearsSection = '.fd-calendar__content--years';
    calendarItem = 'td.fd-calendar__item';
    altCalendarItem = 'table td.fd-calendar__item';
    currentMonthCalendarItem = "//td[not(contains(@class, 'fd-calendar__item--other-month'))]";

    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';

    selectYearButton = '.fd-calendar__action:nth-child(3) .fd-button';
    selectMonthButton = '.fd-calendar__action:nth-child(2) .fd-button';
    firstYearButton = '(//td[contains(@id,"year")]/child::button)[1]';
    firstMonthButton = '(//td[contains(@id,"month")]/child::button)[1]';
    navigationUpArrowButton = 'button[glyph="navigation-up-arrow"]';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeColumn = 'fd-time-column';
    okButton = 'button[fdtype="emphasized"]';
    cancelButton = 'button[aria-label="Cancel"]';
    calendarContainer = 'div.fd-datetime__container';

    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    period = '//span[contains(text(), " PM ")]/parent::li';
    buttonText = ' .fd-button__text';
    inputGroup = this.root + ' .fd-input-group';

    getCurrentDayIndex = (): number | undefined => {
        for (let i = 0; i < this.currentMonthCalendarItem.length; i++) {
            if (getElementClass(this.currentMonthCalendarItem, i).includes('current')) {
                return i;
            }
        }
    };

    filterCalendarValue = (name: string): string => `//td[contains(@id,"-view-${name}")]`;

    dayInDisabledFunctionsCalendarByIndex = (index: string): string => `[data-fd-calendar-day="${index}"]`;

    dayInCalendarButtonByValue = (index: string): string =>
        `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;

    yearInCalendarByValue = (year: number): string => `[data-fd-calendar-year="${year}"]`;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'date-time-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'date-time-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
