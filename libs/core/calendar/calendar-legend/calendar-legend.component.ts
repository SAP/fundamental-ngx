import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, input } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: `
        <ng-content></ng-content>
        <ng-container>
            @for (rule of specialDaysRules(); track rule.specialDayNumber) {
                <fd-calendar-legend-item
                    [text]="rule.legendText"
                    [color]="'placeholder-' + rule.specialDayNumber"
                    (focusedElementEvent)="handleFocusedElementEvent($event, rule.specialDayNumber)"
                ></fd-calendar-legend-item>
            }
        </ng-container>
    `,
    host: {
        class: 'fd-calendar-legend',
        '[class.fd-calendar-legend--auto-column]': 'col'
    },
    imports: [CommonModule, LegendItemComponent]
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

    /** Calendar Index */
    calIndex: number;

    constructor(
        public datetimeAdapter: DatetimeAdapter<FdDate>,
        private elementRef: ElementRef,
        private focusingService: CalendarLegendFocusingService
    ) {
        this.calIndex = this.focusingService.getCalendarIndex() - 1;
    }

    /** @hidden */
    handleFocusedElementEvent(event: string, specialDayNumber: number): void {
        this.focusedElementEventHandle(event, specialDayNumber);
    }

    /** @hidden */
    focusedElementEventHandle(event: string, specialNumber?: number): void {
        this.focusingService.setFocusOnCell(
            this.elementRef.nativeElement.querySelector(`#${event}`),
            this.calIndex,
            specialNumber
        );
    }
}
