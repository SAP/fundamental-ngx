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

    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';

    selectYearButton = '.fd-calendar__action:nth-child(3) .fd-button';
    selectMonthButton = '.fd-calendar__action:nth-child(2) .fd-button';
    firstYearButton = '(//td[contains(@id,"year")]/child::span)[1]';
    firstMonthButton = '(//td[contains(@id,"month")]/child::span)[1]';
    navigationUpArrowButton = 'button[glyph="navigation-up-arrow"]';
    navigationDownArrowButton = 'button[glyph="navigation-down-arrow"]';
    timeItem = 'span.fd-time__item';
    okButton = 'button[fdtype="emphasized"]';
    cancelButton = 'button[label="Cancel"]';

    selectedHours = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[12]';
    selectedMinutes = '(//div[contains(@class, "fd-time__wrapper")]//li[contains(@class, "fd-time__item")])[54]';
    period = '//span[contains(text(), " PM ")]/parent::li';

    getCurrentDayIndex = (): number => {
        for (let i = 0; i < this.calendarItem.length; i++) {
            if (getElementClass(this.calendarItem, i).includes('is-active')) {
                return i;
            }
        }
    }

    filterCaledarValue = (name: string): string => {
        return `//td[contains(@id,"fd-${name}")]`;
    };

    dayInDisabledFunctionsCalendarByIndex = (index: string): string => {
        return `#fd-calendar-9-fd-day-${index}`;
    };

    dayInCalendarButtonByValue = (index: string): string => {
        return `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    yearInCalendarByValue = (year: number): string => {
        return `[aria-label="${year}"]`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.datePickerInput);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'date-time-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'date-time-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
