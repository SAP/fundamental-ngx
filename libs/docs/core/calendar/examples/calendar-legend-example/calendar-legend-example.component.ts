import { Component } from '@angular/core';
import { CalendarComponent } from '@fundamental-ngx/core/calendar';
import { LegendItemComponent } from '../../../../../../libs/core/calendar/calendar-legend/calendar-legend-item.component';
import { CalendarLegendDirective } from '../../../../../../libs/core/calendar/calendar-legend/calendar-legend.directive';

@Component({
    selector: 'fd-calendar-legend-example',
    standalone: true,
    templateUrl: './calendar-legend-example.component.html',
    styleUrls: ['./calendar-legend-example.component.scss'],
    imports: [CalendarComponent, CalendarLegendDirective, LegendItemComponent]
})
export class CalendarLegendExampleComponent {}
