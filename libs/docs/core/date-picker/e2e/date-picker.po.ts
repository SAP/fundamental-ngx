// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, getElementClass, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class DatePickerPo extends CoreBaseComponentPo {
    private url = '/date-picker';

    defaultExample = 'fd-date-picker-single-example ';
    rangeExample = 'fd-date-picker-range-example ';
    internationalExample = 'fd-datepicker-i18n-example ';
    formattingExample = 'fd-date-picker-format-example ';
    allowNullExample = 'fd-date-picker-allow-null-example ';
    formExample = 'fd-date-picker-form-example ';
    formRangeExample = 'fd-date-picker-form-range-example ';
    disableFuncExample = 'fd-date-picker-disable-func-example ';
    rangeDisabledExample = 'fd-date-picker-range-disabled-example ';
    positionExample = 'fd-date-picker-position-example ';
    disabledExample = 'fd-date-picker-disabled-example ';

    months = '.fd-calendar__months';
    calendarRow = '.fd-calendar__row';
    inputGroup = '.fd-input-group';
    inputGroupInputElement = '.fd-input-group .fd-input';
    calendarBody = '.fd-calendar__group:nth-child(2) ';
    calendarInput = '.fd-input';
    calendarIcon = '.fd-button';
    calendar = '.fd-calendar';
    calendarItem = 'td.fd-calendar__item';
    altCalendarItem = 'table td.fd-calendar__item:not(.hidden-day)';
    currentMonthCalendarItem = "//td[not(contains(@class, 'fd-calendar__item--other-month'))]";
    selectedTimeLine = '> div';
    selectedItem = '.is-active';
    currentItem = 'td.fd-calendar__item--current ';
    itemText = ' .fd-calendar__text';
    buttonText = ' .fd-button__text';
    message = '.fd-form-message--';

    frenchButton = 'button[label="French"]';
    germanButton = 'button[label="German"]';
    bulgarianButton = 'button[label="Bulgarian"]';
    nextMonthButton = '.fd-calendar__action--arrow-right button';
    previousMonthButton = '.fd-calendar__action--arrow-left button';
    selectMonthButton = 'div > div:nth-child(2) > button';
    selectYearButton = 'div:nth-child(3) > button';
    monthAttributeLabel = 'data-fd-calendar-month';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    getCurrentDayIndex = async (): Promise<number> => {
        for (let i = 0; i < this.currentMonthCalendarItem.length; i++) {
            if ((await getElementClass(this.currentMonthCalendarItem, i)).includes('current')) {
                return i;
            }
        }
        return -1;
    };

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'date-picker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'date-picker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
