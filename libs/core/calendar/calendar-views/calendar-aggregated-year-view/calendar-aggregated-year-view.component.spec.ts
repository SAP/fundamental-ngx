import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarService } from '../../calendar.service';
import { CalendarAggregatedYear } from '../../models/aggregated-year';
import { CalendarAggregatedYearViewComponent } from './calendar-aggregated-year-view.component';

describe('CalendarAggregatedYearViewComponent', () => {
    let component: CalendarAggregatedYearViewComponent<FdDate>;
    let fixture: ComponentFixture<CalendarAggregatedYearViewComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, CalendarAggregatedYearViewComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarAggregatedYearViewComponent<FdDate>>(
            CalendarAggregatedYearViewComponent
        );
        component = fixture.componentInstance;
        component.yearSelected = 2019;
        component.yearViewGrid = { cols: 4, rows: 4, yearMapping: (year) => year.toString() };
        component.aggregatedYearsViewGrid = { cols: 2, rows: 6, yearMapping: (year) => year.toString() };
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should select the year when Enter key is clicked', () => {
        const event: any = {
            key: 'Enter',
            preventDefault: () => {}
        };
        component._onKeydownYearHandler(event, 6);
        const aggregatedYear: CalendarAggregatedYear = (<any>component)._getYearsList()[6];
        expect(component._yearsSelected).toEqual(aggregatedYear.years);
    });

    it('Should generate proper grid of aggregated years', () => {
        component.yearSelected = 2000;
        component.yearViewGrid = { cols: 4, rows: 4, yearMapping: (year) => year.toString() };
        component.aggregatedYearsViewGrid = { cols: 2, rows: 6, yearMapping: (year) => year.toString() };
        component.ngOnInit();

        const yearsGrid = component._calendarYearListGrid.map((row) => row.map(({ years }) => years));
        expect(yearsGrid).toEqual([
            [
                { startYear: 1984, endYear: 1999 },
                { startYear: 2000, endYear: 2015 }
            ],
            [
                { startYear: 2016, endYear: 2031 },
                { startYear: 2032, endYear: 2047 }
            ],
            [
                { startYear: 2048, endYear: 2063 },
                { startYear: 2064, endYear: 2079 }
            ],
            [
                { startYear: 2080, endYear: 2095 },
                { startYear: 2096, endYear: 2111 }
            ],
            [
                { startYear: 2112, endYear: 2127 },
                { startYear: 2128, endYear: 2143 }
            ],
            [
                { startYear: 2144, endYear: 2159 },
                { startYear: 2160, endYear: 2175 }
            ]
        ]);
    });

    it('Should detect if year is between', () => {
        expect(component._isBetween({ startYear: 2000, endYear: 2015 }, 2010)).toEqual(true);
    });

    it('Should detect if year is between', () => {
        expect(component._isBetween({ startYear: 2000, endYear: 2015 }, 2020)).toEqual(false);
    });
});
