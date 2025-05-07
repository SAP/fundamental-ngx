import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FocusableItemDirective, FocusableListDirective } from '@fundamental-ngx/cdk/utils';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { CalendarLegendItemComponent } from './calendar-legend-item.component';

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
                        [circle]="rule.appointment"
                        [color]="'placeholder-' + rule.specialDayNumber"
                        (focus)="_handleFocusedElementEvent(rule.specialDayNumber)"
                        (blur)="_handleFocusedElementEvent(null)"
                    ></fd-calendar-legend-item>
                }
            </div>
        </ng-container>
    `,
    host: {
        class: 'fd-calendar-legend',
        '[class.fd-calendar-legend--auto-column]': 'col()'
    },
    imports: [CommonModule, CalendarLegendItemComponent, FocusableListDirective, FocusableItemDirective]
})
export class CalendarLegendComponent<D> {
    /** The unique identifier of the calendar legend. This is a required property. */
    legendId = input.required<string>();

    /**
     * Make it a column instead
     */
    col = input<boolean>(false);

    /**
     * Special days rules to be displayed in the legend
     */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    constructor(
        public datetimeAdapter: DatetimeAdapter<FdDate>,
        private focusingService: CalendarLegendFocusingService
    ) {}

    /** @hidden */
    _handleFocusedElementEvent(specialDayNumber: number | null): void {
        this.focusingService._handleLegendItemFocus(this.legendId(), specialDayNumber);
    }
}
