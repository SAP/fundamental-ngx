import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DateTimePicker extends CoreBaseComponentPo {
    url = '/datetime-picker';
    root = '#page-content';

    topPage = 'h1.header';

    datePickerInput = 'fd-datetime-picker input';
    datePickerButton = 'fd-datetime-picker button';

    activeDateTimePickerButton = '//button[contains(@class, \' fd-input-group__button\') and not (contains(@class, \'is-disabled\'))]';
    activeDateTimePickerInput = '//component-example//fd-input-group[not (contains(@ng-reflect-disabled, \'true\'))]//input';

    calendarExpanded = '.fd-datetime__container';

    currentDay = '//*[contains(@class, "fd-calendar__item--current") or contains(@class, "is-active")]';





    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
       // waitForPresent(this.datePickerInput);
    }

}
