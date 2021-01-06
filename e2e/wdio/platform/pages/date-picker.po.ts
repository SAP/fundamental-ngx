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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
