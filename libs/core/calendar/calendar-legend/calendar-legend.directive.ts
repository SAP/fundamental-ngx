import { Directive } from '@angular/core';

@Directive({
    selector: '[fdCalendarLegend], [fd-calendar-legend]',
    standalone: true,
    host: {
        class: 'fd-calendar-legend'
    }
})
export class CalendarLegendDirective {}

@Directive({
    selector:
        '[fdCalendarLegendAutoColumn], [fd-calendar-legend-auto-column], [fdCalendarLegendCol], [fd-calendar-legend-col]',
    standalone: true,
    host: {
        class: 'fd-calendar-legend fd-calendar-legend--auto-column'
    }
})
export class CalendarLegendAutoColumnDirective {}
