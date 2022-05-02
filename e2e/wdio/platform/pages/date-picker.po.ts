import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DatePicker extends BaseComponentPo {
    url = '/date-picker';
    root = '#page-content';

    inputDatePicker = 'fd-date-picker input';
    buttonDatePicker = 'fd-date-picker button';

    calendarExpanded = '.fd-popover__popper fd-calendar';
    calendarYearsSection = '.fd-calendar__content--years';

    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';

    buttonGerman = 'fd-segmented-button button:nth-child(2)';
    buttonBulgarian = 'fd-segmented-button button:nth-child(3)';
    buttonSelectYear = '.fd-calendar__action:nth-child(3) .fd-button';
    buttonSelectMonth = '.fd-calendar__action:nth-child(2) .fd-button';
    buttonSelectYearsRange = '.fd-calendar__action:nth-child(2) .fd-button';

    buttonFirstRangeYear = '(//td[contains(@id,"-view-aggregated-years")]/child::button)[1]';
    buttonFirstYear = '(//td[contains(@id,"year")]/child::button)[1]';
    buttonFirstMonth = '(//td[contains(@id,"month")]/child::button)[1]';

    filterCalendarValue = (name: string): string => `//td[contains(@id,"-view-${name}")]`;

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

    saveExampleBaselineScreenshot(specName: string = 'date-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'date-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
