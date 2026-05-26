import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DateRange, FdCalendarContainerComponent } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-calendar-multi-month-playground-example',
    template: `
        <div style="display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap; margin-bottom: 1rem">
            <div style="display: flex; flex-direction: column; gap: 0.5rem">
                <label class="fd-form-label" id="months-label">Months</label>
                <fd-segmented-button [(ngModel)]="months" aria-labelledby="months-label">
                    <button fd-button fdkFocusableItem label="1" [value]="1"></button>
                    <button fd-button fdkFocusableItem label="2" [value]="2"></button>
                    <button fd-button fdkFocusableItem label="3" [value]="3"></button>
                    <button fd-button fdkFocusableItem label="4" [value]="4"></button>
                </fd-segmented-button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem">
                <label class="fd-form-label" id="layout-label">Layout</label>
                <fd-segmented-button [(ngModel)]="layout" aria-labelledby="layout-label">
                    <button fd-button fdkFocusableItem label="Horizontal" value="horizontal"></button>
                    <button fd-button fdkFocusableItem label="Vertical" value="vertical"></button>
                </fd-segmented-button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem">
                <label class="fd-form-label" id="hover-label">Range hover effect</label>
                <fd-switch [(ngModel)]="rangeHoverEffect" aria-labelledby="hover-label"></fd-switch>
            </div>
        </div>

        <fd-calendar-container
            calType="range"
            [months]="months"
            [layout]="layout"
            [rangeHoverEffect]="rangeHoverEffect"
            [(selectedRangeDate)]="selectedRange"
        ></fd-calendar-container>
        <br />
        <div>Selected First Date: {{ selectedRange.start?.toDate() | date: 'shortDate' }}</div>
        <br />
        <div>Selected Last Date: {{ selectedRange.end?.toDate() | date: 'shortDate' }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: DatetimeAdapter, useClass: FdDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS }
    ],
    imports: [
        FdCalendarContainerComponent,
        DatePipe,
        FdDatetimeModule,
        FormsModule,
        SegmentedButtonComponent,
        SwitchComponent,
        ButtonComponent,
        FocusableItemDirective
    ]
})
export class CalendarMultiMonthPlaygroundExampleComponent {
    months: 1 | 2 | 3 | 4 = 2;
    layout: 'horizontal' | 'vertical' = 'horizontal';
    rangeHoverEffect = true;
    selectedRange: DateRange<FdDate> = new DateRange(new FdDate(2026, 5, 10), new FdDate(2026, 6, 15));
}
