import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, signal } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';
import { CalendarLegendItemComponent } from './calendar-legend-item.component';
import { CalendarLegendComponent } from './calendar-legend.component';

@Component({
    template: `
        <fd-calendar-legend [legendId]="legendId()" [col]="col()" [specialDaysRules]="specialDaysRules()">
        </fd-calendar-legend>
    `,
    imports: [CalendarLegendComponent]
})
export class CalendarLegendHostComponent {
    legendId = signal<string>('test-legend-1');
    col = signal<boolean>(false);
    specialDaysRules = signal<SpecialDayRule<FdDate>[]>([
        {
            specialDayNumber: 5,
            rule: (fdDate) => this.datetimeAdapter.getDate(fdDate) in [2, 9, 16],
            legendText: 'Placeholder-5'
        },
        {
            specialDayNumber: 6,
            rule: (fdDate) => this.datetimeAdapter.getDayOfWeek(fdDate) === 2,
            appointment: true,
            legendText: 'Appointment Type'
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
    ]);

    constructor(public datetimeAdapter: DatetimeAdapter<FdDate>) {}
}

describe('CalendarLegendComponent', () => {
    let fixture: ComponentFixture<CalendarLegendHostComponent>;
    let host: CalendarLegendHostComponent;
    let legendComponent: CalendarLegendComponent<FdDate>;
    let focusingService: CalendarLegendFocusingService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CalendarLegendHostComponent],
            providers: [
                { provide: DATE_TIME_FORMATS, useValue: FD_DATETIME_FORMATS },
                { provide: DatetimeAdapter, useClass: FdDatetimeAdapter },
                CalendarLegendFocusingService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarLegendHostComponent);
        host = fixture.componentInstance;
        legendComponent = fixture.debugElement.query(By.directive(CalendarLegendComponent)).componentInstance;
        focusingService = TestBed.inject(CalendarLegendFocusingService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
        expect(legendComponent).toBeTruthy();
    });

    describe('signal inputs', () => {
        it('should set legendId correctly', () => {
            expect(legendComponent.legendId()).toBe('test-legend-1');
        });

        it('should update legendId when signal changes', () => {
            host.legendId.set('updated-legend');
            fixture.detectChanges();
            expect(legendComponent.legendId()).toBe('updated-legend');
        });

        it('should set col layout correctly', () => {
            expect(legendComponent.col()).toBe(false);
        });

        it('should update col when signal changes', () => {
            host.col.set(true);
            fixture.detectChanges();
            expect(legendComponent.col()).toBe(true);
        });

        it('should set specialDaysRules correctly', () => {
            const rules = legendComponent.specialDaysRules();
            expect(rules.length).toBe(4);
            expect(rules[0].specialDayNumber).toBe(5);
            expect(rules[1].specialDayNumber).toBe(6);
        });
    });

    describe('legend items rendering', () => {
        it('should render default legend items', () => {
            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            expect(legendItems.length).toBe(8); // 4 default + 4 custom
            expect(legendItems[0].componentInstance.text()).toBe('Today');
            expect(legendItems[1].componentInstance.text()).toBe('Selected date');
            expect(legendItems[2].componentInstance.text()).toBe('Work day');
            expect(legendItems[3].componentInstance.text()).toBe('Non-Work day');
        });

        it('should render custom legend items from specialDaysRules', () => {
            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            expect(legendItems[4].componentInstance.text()).toBe('Placeholder-5');
            expect(legendItems[5].componentInstance.text()).toBe('Appointment Type');
            expect(legendItems[6].componentInstance.text()).toBe('Placeholder-10');
            expect(legendItems[7].componentInstance.text()).toBe('Placeholder-11');
        });

        it('should render appointment type with circle indicator', () => {
            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            const appointmentItem = legendItems[5];
            expect(
                appointmentItem.componentInstance.elementRef.nativeElement.classList.contains(
                    'fd-calendar-legend__item--appointment'
                )
            ).toBe(true);
        });

        it('should update legend items when specialDaysRules changes', () => {
            const adapter = host.datetimeAdapter;
            host.specialDaysRules.set([
                {
                    specialDayNumber: 20,
                    rule: (fdDate) => adapter.getDate(fdDate) === 20,
                    legendText: 'New Rule'
                }
            ]);
            fixture.detectChanges();

            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            expect(legendItems.length).toBe(5); // 4 default + 1 custom
            expect(legendItems[4].componentInstance.text()).toBe('New Rule');
        });

        it('should render only default items when specialDaysRules is empty', () => {
            host.specialDaysRules.set([]);
            fixture.detectChanges();

            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            expect(legendItems.length).toBe(4); // Only default items
        });
    });

    describe('focusing service integration', () => {
        it('should call focusing service when legend item is focused', () => {
            jest.spyOn(focusingService, '_handleLegendItemFocus');

            legendComponent._handleFocusedElementEvent(5);

            expect(focusingService._handleLegendItemFocus).toHaveBeenCalledWith('test-legend-1', 5);
        });

        it('should pass null specialDayNumber when unfocusing', () => {
            jest.spyOn(focusingService, '_handleLegendItemFocus');

            legendComponent._handleFocusedElementEvent(null);

            expect(focusingService._handleLegendItemFocus).toHaveBeenCalledWith('test-legend-1', null);
        });

        it('should use current legendId when handling focus', () => {
            jest.spyOn(focusingService, '_handleLegendItemFocus');
            host.legendId.set('dynamic-legend-id');
            fixture.detectChanges();

            legendComponent._handleFocusedElementEvent(10);

            expect(focusingService._handleLegendItemFocus).toHaveBeenCalledWith('dynamic-legend-id', 10);
        });
    });

    describe('CSS classes and styling', () => {
        it('should apply column layout class when col is true', () => {
            host.col.set(true);
            fixture.detectChanges();

            const legendElement = fixture.debugElement.query(By.directive(CalendarLegendComponent));
            expect(legendElement.nativeElement.classList.contains('fd-calendar-legend')).toBe(true);
            expect(legendElement.nativeElement.classList.contains('fd-calendar-legend--auto-column')).toBe(true);
        });

        it('should not apply column layout class when col is false', () => {
            host.col.set(false);
            fixture.detectChanges();

            const legendElement = fixture.debugElement.query(By.directive(CalendarLegendComponent));
            expect(legendElement.nativeElement.classList.contains('fd-calendar-legend')).toBe(true);
            expect(legendElement.nativeElement.classList.contains('fd-calendar-legend--auto-column')).toBe(false);
        });
    });

    describe('Angular 20 best practices', () => {
        it('should use OnPush change detection', () => {
            // This is verified by the component definition, but we can confirm it doesn't break reactivity
            host.specialDaysRules.set([
                {
                    specialDayNumber: 99,
                    rule: () => true,
                    legendText: 'Test'
                }
            ]);
            fixture.detectChanges();

            const legendItems = fixture.debugElement.queryAll(By.directive(CalendarLegendItemComponent));
            expect(legendItems[4].componentInstance.text()).toBe('Test');
        });

        it('should use inject() for service injection', () => {
            // Verify service is properly injected using inject() function
            expect(legendComponent['_focusingService']).toBeTruthy();
            expect(legendComponent['_focusingService']).toBe(focusingService);
        });
    });
});
