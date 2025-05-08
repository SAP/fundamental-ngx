import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FocusableItemDirective, FocusableListDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { CalendarLegendItemComponent } from './calendar-legend-item.component';

@Component({
    selector: 'fd-calendar-legend',
    standalone: true,
    template: `
        <ng-content></ng-content>
        <ng-container>
            <div fdkFocusableList>
                @if (displayTodayLegendItem()) {
                    <fd-calendar-legend-item
                        fdkFocusableItem
                        class="fd-calendar-legend__item--today"
                        [text]="'coreCalendar.todayLabel' | fdTranslate"
                        (focus)="_handleFocusedElementEvent('hideAllSpecialMarkers')"
                        (blur)="_handleFocusedElementEvent(null)"
                    ></fd-calendar-legend-item>
                }
                @if (displaySelectedLegendItem()) {
                    <fd-calendar-legend-item
                        fdkFocusableItem
                        class="fd-calendar-legend__item--selected"
                        [text]="'coreCalendar.dateSelectedLabel' | fdTranslate"
                        (focus)="_handleFocusedElementEvent('hideAllSpecialMarkers')"
                        (blur)="_handleFocusedElementEvent(null)"
                    ></fd-calendar-legend-item>
                }
                @if (displayWorkDayLegendItem()) {
                    <fd-calendar-legend-item
                        fdkFocusableItem
                        class="fd-calendar-legend__item--work"
                        [text]="'coreCalendar.workDayLabel' | fdTranslate"
                        (focus)="_handleFocusedElementEvent('hideAllSpecialMarkers')"
                        (blur)="_handleFocusedElementEvent(null)"
                    ></fd-calendar-legend-item>
                }
                @if (displayNonWorkDayLegendItem()) {
                    <fd-calendar-legend-item
                        fdkFocusableItem
                        class="fd-calendar-legend__item--non-work"
                        [text]="'coreCalendar.nonWorkDayLabel' | fdTranslate"
                        (focus)="_handleFocusedElementEvent('hideAllSpecialMarkers')"
                        (blur)="_handleFocusedElementEvent(null)"
                    ></fd-calendar-legend-item>
                }

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
    imports: [
        CommonModule,
        CalendarLegendItemComponent,
        FocusableListDirective,
        FocusableItemDirective,
        FdTranslatePipe
    ]
})
export class CalendarLegendComponent<D> {
    /** The unique identifier of the calendar legend. This is a required property. */
    legendId = input.required<string>();

    /**
     * Make it a column instead
     */
    col = input<boolean>(false);

    /** Whether to display the legend item for today's date. */
    displayTodayLegendItem = input<boolean>(true);

    /** Whether to display the legend item for the currently selected date. */
    displaySelectedLegendItem = input<boolean>(true);

    /** Whether to display the legend item for work days. */
    displayWorkDayLegendItem = input<boolean>(true);

    /** Whether to display the legend item for non-work days. */
    displayNonWorkDayLegendItem = input<boolean>(true);

    /**
     * Special days rules to be displayed in the legend
     */
    specialDaysRules = input<SpecialDayRule<D>[]>([]);

    constructor(
        public datetimeAdapter: DatetimeAdapter<FdDate>,
        private focusingService: CalendarLegendFocusingService
    ) {}

    /** @hidden */
    _handleFocusedElementEvent(specialDayNumber: Nullable<number> | 'hideAllSpecialMarkers'): void {
        this.focusingService._handleLegendItemFocus(this.legendId(), specialDayNumber);
    }
}
