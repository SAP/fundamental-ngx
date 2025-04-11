import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';
import { LegendItemComponent } from './calendar-legend-item.component';
import { CalendarLegendComponent } from './calendar-legend.component';

describe('CalendarLegendComponent', () => {
    let fixture: ComponentFixture<CalendarLegendComponent<FdDate>>;
    let host: CalendarLegendComponent<FdDate>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CalendarLegendComponent, LegendItemComponent],
            providers: [
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
        fixture = TestBed.createComponent(CalendarLegendComponent<FdDate>);
        host = fixture.componentInstance;

        host.specialDaysRules().push(
            {
                specialDayNumber: 5,
                rule: (fdDate) => host.datetimeAdapter.getDate(fdDate) in [2, 9, 16],
                legendText: 'Placeholder-5'
            },
            {
                specialDayNumber: 6,
                rule: (fdDate) => host.datetimeAdapter.getDayOfWeek(fdDate) === 2,
                legendText: 'Placeholder-6'
            },
            {
                specialDayNumber: 10,
                rule: (fdDate) => host.datetimeAdapter.getDate(fdDate) === 15,
                legendText: 'Placeholder-10'
            },
            {
                specialDayNumber: 11,
                rule: (fdDate) => host.datetimeAdapter.getDate(fdDate) === 30,
                legendText: 'Placeholder-11'
            }
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should render the legend items', () => {
        const legendItems = fixture.debugElement.queryAll(By.directive(LegendItemComponent));
        expect(legendItems.length).toBe(4);
        legendItems.forEach((item) => {
            expect(item.classes['fd-calendar-legend__item']).toBe(true);
        });

        const legendItemTexts = legendItems.map((item) => item.componentInstance.text);
        expect(legendItemTexts).toEqual(['Placeholder-5', 'Placeholder-6', 'Placeholder-10', 'Placeholder-11']);
    });

    it('should change the layout to column when col is true', () => {
        host.col = true;
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const calendarLegend = fixture.debugElement.query(By.css('.fd-calendar-legend'));
            expect(calendarLegend.classes['fd-calendar-legend--auto-column']).toBe(true);
        });

        host.col = false;
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const calendarLegend = fixture.debugElement.query(By.css('.fd-calendar-legend'));
            expect(calendarLegend.classes['fd-calendar-legend--auto-column']).toBe(false);
        });
    });
});
