import { Component } from '@angular/core';
import { CalendarLegend } from '@fundamental-ngx/ui5-webcomponents/calendar-legend';
import { CalendarLegendItem } from '@fundamental-ngx/ui5-webcomponents/calendar-legend-item';

@Component({
    selector: 'ui5-calendar-legend-item-types-example',
    templateUrl: './item-types.html',
    standalone: true,
    imports: [CalendarLegend, CalendarLegendItem]
})
export class CalendarLegendItemTypesExample {}
