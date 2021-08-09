import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent} from '../../driver/wdio';

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
    calendarRow = '.fd-calendar__row'
    inputGroup = '.fd-input-group';
    calendarBody = '.fd-calendar__group:nth-child(2) ';
    calendarInput = '.fd-input';
    calendarIcon = '.fd-button';
    calendar = '.fd-calendar';
    calendarItem = 'td.fd-calendar__item';
    selectedTimeLine = '> div';
    selectedItem = '.is-active';
    currentItem = '.fd-calendar__item--current ';
    itemText = ' .fd-calendar__text';
    buttonText = ' .fd-button__text'
    message = '.fd-form-message--';

    frenchButton = 'button[label="French"]';
    germanButton = 'button[label="German"]';
    bulgarianButton = 'button[label="Bulgarian"]';
    nextMonthButton = 'button[aria-label="Next month"]';
    previousMonthButton = 'button[aria-label="Previous month"]';
    selectMonthButton = 'button[aria-label="Select month"]';
    selectYearButton = 'button[aria-label="Select year"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'date-picker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'date-picker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
