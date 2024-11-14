import { Directive } from '@angular/core';

@Directive({
    selector: '[fdCalendarLegend], [fd-calendar-legend]',
    standalone: true,
    host: {
        class: 'fd-calendar-legend'
    }
})
export class CalendarLegendDirective {}
