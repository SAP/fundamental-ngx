import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FocusableItemDirective, FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: `
        <ng-content></ng-content>
        <ng-container>
            <div fdkFocusableList>
                @for (rule of specialDaysRules(); track rule.specialDayNumber) {
                    <fd-calendar-legend-item
                        fdkFocusableItem
                        [text]="rule.legendText"
                        [color]="'placeholder-' + rule.specialDayNumber"
                    ></fd-calendar-legend-item>
                }
            </div>
        </ng-container>
    `,
    host: {
        class: 'fd-calendar-legend',
        '[class.fd-calendar-legend--auto-column]': 'col'
    },
    imports: [CommonModule, LegendItemComponent, FocusableListDirective, FocusableItemDirective]
})
export class CalendarLegendComponent<D> {
    /**
     * Make it a column instead
     */
    @Input() col = false;

    /** Special
     * days rules to be displayed in the legend */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /** Element getting focused */
    focusedElement = input<string>('');

    constructor(public datetimeAdapter: DatetimeAdapter<FdDate>) {}
}
