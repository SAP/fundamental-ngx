import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class DatePicker extends BaseComponentPo {
    url = '/date-picker';
    root = '#page-content';

    inputDatePicker = 'fd-date-picker input';
    buttonDatePicker = 'fd-date-picker button';

    activeButtonDatePicker = '[ng-reflect-is-disabled="false"] + span button';
    activeInputDatePicker = '[ng-reflect-is-disabled="false"][aria-label="Date input"]';

    calendarExapnded = '.fd-popover__popper fd-calendar';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    prePopulatedSimpleInput = '#fd-popover-0 input';
    singleTypeInput = '#fd-popover-1 input';
    prePopulatedRangeInput = '#fd-popover-2 input';
    rangeTypeInput = '#fd-popover-3 input';
    birthdateInput = '#fd-popover-4 input';
    holidayInput = '#fd-popover-6 input';
    outsideFormInput = '#fd-popover-8 input';
    outsideFormRangeInput = '#fd-popover-9 input';

    firstDayInCalendarButton = '[id="fd-calendar-0-fd-day-1"]'

    buttonGerman = 'button[ng-reflect-label="German"]'
    buttonBulgarian = 'button[ng-reflect-label="Bulgarian"]';

    datePickerInputsByIndex = (index: string) => {
        return `#fd-popover-${index} input`;
    };

    dayInCalendarButtonByValue = (index: string) => {
        return `//span[text()="${index}"]/ancestor::td[not (contains(@class, 'fd-calendar__item--other-month'))]`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
