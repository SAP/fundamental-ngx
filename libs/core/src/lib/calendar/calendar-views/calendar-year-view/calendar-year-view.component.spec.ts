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
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarYearViewComponent);
        component = fixture.componentInstance;
        component.yearSelected = 2019;
        component.yearViewGrid = { cols: 4, rows: 4, yearMapping: year => year.toString() };
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('Should focus on the year below when on ArrowDown', () => {
    //     const focusSpy = spyOn(component, 'focusElement');
    //     const event = {
    //         key: 'ArrowDown', preventDefault: () => {}
    //     };
    //     component.id = 'fd-calendar-0';
    //     component.onKeydownYearHandler(event, 6);
    //     expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-10');
    // });
    //
    // it('Should focus on the year below when on ArrowUp', () => {
    //     const focusSpy = spyOn(component, 'focusElement');
    //     const event = {
    //         key: 'ArrowUp', preventDefault: () => {}
    //     };
    //     component.id = 'fd-calendar-0';
    //     component.onKeydownYearHandler(event, 6);
    //     expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-2');
    // });
    //
    // it('Should focus on the year below when on ArrowRight', () => {
    //     const focusSpy = spyOn(component, 'focusElement');
    //     const event = {
    //         key: 'ArrowRight', preventDefault: () => {}
    //     };
    //     component.id = 'fd-calendar-0';
    //     component.onKeydownYearHandler(event, 6);
    //     expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-7');
    // });
    //
    // it('Should focus on the year below when on ArrowLeft', () => {
    //     const focusSpy = spyOn(component, 'focusElement');
    //     const event = {
    //         key: 'ArrowLeft', preventDefault: () => {}
    //     };
    //     component.id = 'fd-calendar-0';
    //     component.onKeydownYearHandler(event, 6);
    //     expect(focusSpy).toHaveBeenCalledWith('fd-calendar-0-fd-year-5');
    // });

    it('Should select the year when Enter key is clicked', () => {
        let event: { key: string; preventDefault: () => void };
        event = {
            key: 'Enter', preventDefault: () => {
            }
        };
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should select the year when Space key is clicked', () => {
        const event = {
            key: ' ', preventDefault: () => {
            }
        };
        component.onKeydownYearHandler(event, 6);
        expect(component.yearSelected).toEqual(2025);
    });

    it('Should generate grid', () => {
        expect(component.calendarYearListGrid).toBeDefined();

        component.ngOnInit();

        const sizes: number[] = component.calendarYearListGrid.map(list => list.length);

        expect(sizes).toEqual([4, 4, 4, 4]);

    });

    it('Should generate 5x3 grid', () => {
        component.yearViewGrid = { cols: 5, rows: 3, yearMapping: (year) => year.toString() };
        component.ngOnInit();
        const size: number = component.calendarYearListGrid.map(list => list.length).reduce((c, i) => c + i);

        expect(size).toEqual(5 * 3);

    });

    it('Should detect active year as current one', () => {
        component.yearViewGrid = { cols: 5, rows: 4, yearMapping: (year) => year.toString() };

        component.currentYear = 2020;
        component.yearSelected = 1900;
        component.firstYearInList = 2010;

        component.ngOnInit();

        component.activeYear = (<any>component).getActiveYear();

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
