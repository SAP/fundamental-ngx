import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendItemComponent } from './calendar-legend-item.component';
import { CalendarLegendComponent } from './calendar-legend.component';

@Component({
    template: ` <fd-calendar-legend [col]="col" [specialDaysRules]="specialDaysRules"> </fd-calendar-legend> `,
    imports: [CalendarLegendComponent]
})
export class CalendarLegendHostComponent {
    /** Element getting focused */
    focusedElement = '';

    /** If the layout is column */
    col = false;

    /** Special days rules to be displayed in the legend */
    specialDaysRules: SpecialDayRule<FdDate>[] = [
        {
            specialDayNumber: 5,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) in [2, 9, 16],
            legendText: 'Placeholder-5'
        },
        {
            specialDayNumber: 6,
            rule: (fdDate) => this.datetimeAdapter.getDayOfWeek(fdDate) === 2,
            legendText: 'Placeholder-6'
        },
        {
            specialDayNumber: 10,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 15,
            legendText: 'Placeholder-10'
        },
        {
            specialDayNumber: 11,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 30,
            legendText: 'Placeholder-11'
        }
    ];

    constructor(public datetimeAdapter: DatetimeAdapter<FdDate>) {}
}

describe('CalendarLegendComponent', () => {
    let fixture: ComponentFixture<CalendarLegendHostComponent>;
    let host: CalendarLegendHostComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CalendarLegendHostComponent],
            providers: [
                { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS },
                { provide: DatetimeAdapter, useClass: FdDatetimeAdapter }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarLegendHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should render legend items', () => {
        const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
        expect(legendItems.length).toBe(4);
        expect(legendItems[0].componentInstance.text()).toBe('Placeholder-5');
        expect(legendItems[1].componentInstance.text()).toBe('Placeholder-6');
        expect(legendItems[2].componentInstance.text()).toBe('Placeholder-10');
        expect(legendItems[3].componentInstance.text()).toBe('Placeholder-11');
    });
});
