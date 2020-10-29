import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-calendar-close-button]',
    host: {
        '[class.fd-calendar__close-button]': 'true'
    }
})
export class CalendarCloseButtonDirective {}
