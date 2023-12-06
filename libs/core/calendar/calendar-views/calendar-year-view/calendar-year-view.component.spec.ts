import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarService } from '../../calendar.service';
import { CalendarYearViewComponent } from './calendar-year-view.component';

describe('CalendarYearViewComponent', () => {
    let component: CalendarYearViewComponent<FdDate>;
    let fixture: ComponentFixture<CalendarYearViewComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, CalendarYearViewComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarYearViewComponent<FdDate>>(CalendarYearViewComponent);
        component = fixture.componentInstance;
        component.yearSelected = 2019;
        component.yearViewGrid = { cols: 4, rows: 4, yearMapping: (year) => year.toString() };
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
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should select the year when Space key is clicked', () => {
        const event: any = {
            key: ' ',
            preventDefault: () => {}
        };
        component._onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should generate grid', () => {
        expect(component._calendarYearListGrid).toBeDefined();

        component.ngOnInit();

        const sizes: number[] = component._calendarYearListGrid.map((list) => list.length);

        expect(sizes).toEqual([4, 4, 4, 4]);
    });

    it('Should generate 5x3 grid', () => {
        component.yearViewGrid = { cols: 5, rows: 3, yearMapping: (year) => year.toString() };
        component.ngOnInit();
        const size: number = component._calendarYearListGrid.map((list) => list.length).reduce((c, i) => c + i);

        expect(size).toEqual(5 * 3);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 3, rows: 3, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        const yearsGrid = component._calendarYearListGrid.map((row) => row.map(({ year }) => year));
        expect(yearsGrid).toEqual([
            [2000, 2001, 2002],
            [2003, 2004, 2005],
            [2006, 2007, 2008]
        ]);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 9, rows: 1, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        const yearsGrid = component._calendarYearListGrid.map((row) => row.map(({ year }) => year));
        expect(yearsGrid).toEqual([[2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008]]);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 1, rows: 9, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        const yearsGrid = component._calendarYearListGrid.map((row) => row.map(({ year }) => year));
        expect(yearsGrid).toEqual([[2000], [2001], [2002], [2003], [2004], [2005], [2006], [2007], [2008]]);
    });

    it('Should detect active year as current one', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component._currentYear = 2020;
        component._firstYearInList = 2010;
        component.ngOnInit();

        component.yearSelected = 1900;

        component._activeYear = (<any>component)._getActiveYear();

        expect(component._activeYear).toBe(component._currentYear);
    });

    it('Should detect active year as selected one', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component._currentYear = 2020;
        component.yearSelected = 1900;
        component._firstYearInList = 1890;

        component.ngOnInit();

        expect(component._activeYear).toBe(component.yearSelected);
    });

    it('Should detect active year as first from grid', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component._currentYear = 2020;
        component.yearSelected = 1900;
        component._firstYearInList = 1890;

        component.ngOnInit();

        expect(component._activeYear).toBe(component._calendarYearListGrid[0][0].year);
    });
});
