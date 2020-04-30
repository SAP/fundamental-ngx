import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarYearViewComponent } from './calendar-year-view.component';
import { CalendarService } from '../../calendar.service';

describe('CalendarYearViewComponent', () => {
    let component: CalendarYearViewComponent;
    let fixture: ComponentFixture<CalendarYearViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarYearViewComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarYearViewComponent);
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
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should select the year when Space key is clicked', () => {
        const event: any = {
            key: ' ',
            preventDefault: () => {}
        };
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should generate grid', () => {
        expect(component.calendarYearListGrid).toBeDefined();

        component.ngOnInit();

        const sizes: number[] = component.calendarYearListGrid.map((list) => list.length);

        expect(sizes).toEqual([4, 4, 4, 4]);
    });

    it('Should generate 5x3 grid', () => {
        component.yearViewGrid = { cols: 5, rows: 3, yearMapping: (year) => year.toString() };
        component.ngOnInit();
        const size: number = component.calendarYearListGrid.map((list) => list.length).reduce((c, i) => c + i);

        expect(size).toEqual(5 * 3);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 3, rows: 3, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        expect(component.calendarYearListGrid).toEqual([
            [2000, 2001, 2002],
            [2003, 2004, 2005],
            [2006, 2007, 2008]
        ]);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 9, rows: 1, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        expect(component.calendarYearListGrid).toEqual([[2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008]]);
    });

    it('Should generate proper grid', () => {
        component.yearViewGrid = { cols: 1, rows: 9, yearMapping: (year) => year.toString() };
        component.yearSelected = 2000;
        component.ngOnInit();
        expect(component.calendarYearListGrid).toEqual([
            [2000],
            [2001],
            [2002],
            [2003],
            [2004],
            [2005],
            [2006],
            [2007],
            [2008]
        ]);
    });

    it('Should detect active year as current one', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component.currentYear = 2020;
        component.firstYearInList = 2010;
        component.ngOnInit();

        component.yearSelected = 1900;

        component.activeYear = (<any>component)._getActiveYear();

        expect(component.activeYear).toBe(component.currentYear);
    });

    it('Should detect active year as selected one', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component.currentYear = 2020;
        component.yearSelected = 1900;
        component.firstYearInList = 1890;

        component.ngOnInit();

        expect(component.activeYear).toBe(component.yearSelected);
    });

    it('Should detect active year as first from grid', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component.currentYear = 2020;
        component.yearSelected = 1900;
        component.firstYearInList = 1890;

        component.ngOnInit();

        expect(component.activeYear).toBe(component.calendarYearListGrid[0][0]);
    });
});
