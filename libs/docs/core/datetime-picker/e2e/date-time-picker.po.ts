// eslint-disable-next-line @nx/enforce-module-boundaries
import { click, CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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
    activeDay = '.fd-calendar__item--today';
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

    filterCalendarValue = async (name: string): Promise<string> => `[id*="${name}"]`;

    getOptionById = async (id: string): Promise<string> => `#${id}`;

    clickDayInCalendarButtonByValue = async (dayNumber: number): Promise<void> => {
        await click('.fd-calendar__table td.fd-calendar__item:not(.fd-calendar__item--other-month)', dayNumber - 1);
    };

    yearInCalendarByValue = async (year: number): Promise<string> => `[data-fd-calendar-year="${year}"]`;

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'datetime-picker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'datetime-picker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
