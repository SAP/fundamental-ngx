import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { LegendItemComponent } from './calendar-legend-item.component';
import { CalendarLegendComponent } from './calendar-legend.component';

@Component({
    template: ` <fd-calendar-legend [specialDaysRules]="specialDaysRules"> </fd-calendar-legend> `
})
class CalendarLegendHostTestComponent {
    @ViewChild(CalendarLegendComponent) calendarLegend: CalendarLegendComponent<any>;

    specialDaysRules: SpecialDayRule<FdDate>[] = [
        { legendText: 'Holiday 1', specialDayNumber: 1, rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 14 },
        { legendText: 'Holiday 2', specialDayNumber: 2, rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) === 15 }
    ];

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}
}

describe('CalendarLegendComponent', () => {
    let fixture: ComponentFixture<CalendarLegendHostTestComponent>;
    let host: CalendarLegendHostTestComponent;
    let focusingService: CalendarLegendFocusingService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CalendarLegendComponent, LegendItemComponent],
            declarations: [CalendarLegendHostTestComponent],
            providers: [
                CalendarLegendFocusingService,
                {
                    provide: DatetimeAdapter,
                    useClass: FdDatetimeAdapter
                },
                {
                    provide: DATE_TIME_FORMATS,
                    useValue: FD_DATETIME_FORMATS
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarLegendHostTestComponent);
        host = fixture.componentInstance;
        focusingService = TestBed.inject(CalendarLegendFocusingService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should render legend items correctly', () => {
        const legendItemElements = fixture.debugElement.queryAll(By.directive(LegendItemComponent));
        expect(legendItemElements.length).toBe(2);
        expect(legendItemElements[0].nativeElement.textContent).toContain('Holiday 1');
        expect(legendItemElements[1].nativeElement.textContent).toContain('Holiday 2');
    });

    it('should pass specialDayNumber as color to legend items', () => {
        const legendItemElements = fixture.debugElement.queryAll(By.directive(LegendItemComponent));
        expect(legendItemElements[0].componentInstance.color).toBe('placeholder-1');
        expect(legendItemElements[1].componentInstance.color).toBe('placeholder-2');
    });

    it('should append the legend items to the DOM', () => {
        const nativeElement = fixture.nativeElement;
        expect(nativeElement.querySelectorAll('fd-calendar-legend-item').length).toBe(2);
    });

    it('should set focus on the cell when focusedElementEvent is triggered', () => {
        const setFocusSpy = jest.spyOn(focusingService, 'setFocusOnCell');
        const event = 'focusEvent';
        const specialNumber = 1;

        host.calendarLegend.focusedElementEventHandle(event, specialNumber);

        expect(setFocusSpy).toHaveBeenCalledWith(
            fixture.nativeElement.querySelector(`#${event}`),
            host.calendarLegend.calIndex,
            specialNumber
        );
    });

    it('should toggle column class based on "col" input', () => {
        host.calendarLegend.col = true;
        fixture.detectChanges();
        expect(
            fixture.nativeElement
                .querySelector('.fd-calendar-legend')
                .classList.contains('fd-calendar-legend--auto-column')
        ).toBeTruthy();

        host.calendarLegend.col = false;
        fixture.detectChanges();
        expect(
            fixture.nativeElement
                .querySelector('.fd-calendar-legend')
                .classList.contains('fd-calendar-legend--auto-column')
        ).toBeFalsy();
    });
});
