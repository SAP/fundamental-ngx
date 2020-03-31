import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayViewComponent } from './calendar-day-view.component';
import { FdDate } from '../../models/fd-date';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarService } from '../../calendar.service';

describe('CalendarDayViewComponent', () => {
    let component: CalendarDayViewComponent;
    let fixture: ComponentFixture<CalendarDayViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CalendarDayViewComponent],
            providers: [CalendarService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarDayViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Select Proper Date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        const dayPicked = component.dayViewGrid[2][3];
        component.selectedDateChange.subscribe((date: FdDate) =>
            expect(date.toDateString()).toBe(dayPicked.date.toDateString())
        );
        component.selectDate(dayPicked);
    });

    it('Should mark selected single date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.selectedDate = new FdDate(2018, 10, 20);
        component.ngOnInit();
        const calendarDays: CalendarDay[] = component.dayViewGrid.reduce((a: CalendarDay[], b: CalendarDay[]) => {
            if (!b) {
                b = [];
            }
            return b.concat(a);
        });
        const selected = calendarDays.find(cell => cell.selected);
        expect(selected.date.toDateString()).toBe(component.selectedDate.toDateString());
    });

    it('Should Select Proper First Range Date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayPicked = component.dayViewGrid[2][3];
        component.selectedRangeDateChange.subscribe((date: { start: FdDate, end: FdDate }) =>
            expect(date.start.toDateString()).toBe(dayPicked.date.toDateString())
        );
        component.selectDate(dayPicked);
    });

    it('Should Select Proper Second Range Date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayStartPicked = component.dayViewGrid[2][3];
        const dayEndPicked = component.dayViewGrid[3][3];
        component.selectedRangeDate = { start: dayStartPicked.date, end: null };
        component.selectedRangeDateChange.subscribe((date: { start: FdDate, end: FdDate }) =>
            expect(date.end.toDateString()).toBe(dayEndPicked.date.toDateString())
        );
        component.selectDate(dayEndPicked);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayStartPicked = component.dayViewGrid[1][1];
        const dayEndPicked = component.dayViewGrid[3][3];

        component.selectDate(dayStartPicked);
        component.selectDate(dayEndPicked);

        expect(component.dayViewGrid[2][2].selectedRange).toBe(true);
        expect(component.dayViewGrid[1][1].selectedFirst).toBe(true);
        expect(component.dayViewGrid[3][3].selectedLast).toBe(true);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        const dayPicked = component.dayViewGrid[1][1];

        component.selectDate(dayPicked);

        expect(component.dayViewGrid[1][1].selected).toBe(true);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        component.selectedDate = component.dayViewGrid[1][1].date;
        component.ngOnInit();

        expect(component.dayViewGrid[1][1].selected).toBe(true);
    });

    it('should properly rearrange days when different startingDayOfWeek is used', () => {
        component.startingDayOfWeek = 1;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
        component.startingDayOfWeek = 2;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
        component.startingDayOfWeek = 3;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['T', 'W', 'T', 'F', 'S', 'S', 'M']);
    });

    it('should generate proper week count on january 2010', () => {
        component.currentlyDisplayed.year = 2010;
        component.currentlyDisplayed.month = 1;
        component.ngOnInit();
        component.weeks = [53, 1, 2, 3, 4];
    });

    it('should generate proper week count on december 2010', () => {
        component.currentlyDisplayed.year = 2012;
        component.currentlyDisplayed.month = 12;
        component.ngOnInit();
        component.weeks = [48, 49, 50, 51, 52, 1];
    });

    it('should focus element on ')
});
