// eslint-disable-next-line @nx/enforce-module-boundaries
import { getElementClass, PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class DateTimePicker extends PlatformBaseComponentPo {
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

    compactDateTimePickerButton = 'fdp-datetime-picker[fdCompact] .fd-button';
    compactDateTimePickerInput = 'fdp-datetime-picker[fdCompact] .fd-input';
    changeDateTimeValueButton = 'button[name="changeBtn"]';

    calendarExpanded = '.fd-datetime__container';
    calendarYearsSection = '.fd-calendar__content--years';
    calendarItem = 'td.fd-calendar__item';
    altCalendarItem = 'table td.fd-calendar__item';
    currentMonthCalendarItem = "//td[not(contains(@class, 'fd-calendar__item--other'))]";

    currentDay = '//*[contains(@class, "fd-calendar__item--today") or contains(@class, "is-active")]';

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

    getCurrentDayIndex = async (): Promise<number | undefined> => {
        for (let i = 0; i < this.currentMonthCalendarItem.length; i++) {
            if ((await getElementClass(this.currentMonthCalendarItem, i)).includes('today')) {
                return i;
            }
        }
    };

    filterCalendarValue = (name: string): string => `//td[contains(@id,"-view-${name}")]`;

    dayInDisabledFunctionsCalendarByIndex = (index: string): string => `[data-fd-calendar-day="${index}"]`;

    dayInCalendarButtonByValue = (index: string): string =>
        `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other'))]`;

    yearInCalendarByValue = (year: number): string => `[data-fd-calendar-year="${year}"]`;

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'date-time-picker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'date-time-picker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
