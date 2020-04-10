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
        expect(component.dayViewGrid[1][1].selected).toBe(true);
        expect(component.dayViewGrid[3][3].selected).toBe(true);
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
        component.weeks = [53, 1, 2, 3, 4, 5];
    });

    it('should generate proper week count on december 2010', () => {
        component.currentlyDisplayed.year = 2012;
        component.currentlyDisplayed.month = 12;
        component.ngOnInit();
        component.weeks = [48, 49, 50, 51, 52];
    });

    it('should generate proper days for february 2020', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 2;
        component.startingDayOfWeek = 2;
        component.ngOnInit();
        expect(component.dayViewGrid.map(day => day.map(_day => _day.date.day))).toEqual([
            [27, 28, 29, 30, 31, 1, 2],
            [3, 4, 5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14, 15, 16],
            [17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 1]
        ]);
    });

    it('should get active cell for selected', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.ngOnInit();
        const day: CalendarDay = component.calendarDayList[15];
        component.selectDate(day);
        const activeCell: CalendarDay = (<any>component)._getActiveCell(component.calendarDayList);
        expect(CalendarService.datesEqual(activeCell.date, day.date)).toBe(true);
    });

    it('should get active cell for today', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.ngOnInit();
        const day: CalendarDay = component.calendarDayList[15];
        day.today = true;
        const activeCell: CalendarDay = (<any>component)._getActiveCell(component.calendarDayList);
        expect(CalendarService.datesEqual(activeCell.date, day.date)).toBe(true);
    });

    it('should apply _isOnRangePick flag', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.rangeHoverEffect = true;
        component.calType = 'range';
        component.ngOnInit();
        component.selectedRangeDate = { start: null, end: null };
        component.selectDate(component.calendarDayList[10], new MouseEvent('click'));
        expect((<any>component)._isOnRangePick).toBe(true);
    });

    it('should apply hover range flags on days', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);
        component.rangeHoverEffect = true;
        component.calType = 'range';
        (<any>component)._isOnRangePick = true;
        component.ngOnInit();
        component.selectedRangeDate = { start: date, end: date };
        component.refreshHoverRange(component.calendarDayList[0]);
        expect(component.calendarDayList.filter(_day => _day.hoverRange).length).toBe(13);
    });

    it('should change id of day focused', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 5;
        component.newFocusedDayIndex = 10;
        (<any>component)._selectPreviousMonth();
        component.newFocusedDayIndex = 3;
    });

    it('should put additional property select on single day', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);
        component.selectedDate = date;
        component.ngOnInit();
        component.selectDate(component.calendarDayList[15]);
        expect(component.selectedDate).toBe(component.calendarDayList[15].date);
        expect(component.calendarDayList[15].selected).toBe(true);
        component.selectDate(component.calendarDayList[10]);
        expect(component.selectedDate).toBe(component.calendarDayList[10].date);
        expect(component.calendarDayList[10].selected).toBe(true);
        expect(component.calendarDayList[15].selected).toBe(false);
    });

    it('should put additional property select on range day', () => {
        component.calType = 'range';
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const startDate = new FdDate(2020, 4, 15);
        const endDate = new FdDate(2020, 4, 20);
        component.ngOnInit();
        const newlyChosenDate: CalendarDay = component.calendarDayList[5];
        const secondNewlyChosenDate: CalendarDay = component.calendarDayList[30];
        component.selectedRangeDate = { start: startDate, end: endDate };
        component.selectDate(newlyChosenDate);
        expect(component.selectedRangeDate.start).toBe(newlyChosenDate.date);
        expect(newlyChosenDate.selected).toBe(true);
        expect(component.calendarDayList.filter(_day => _day.selectedRange).length).toBe(0);
        component.selectDate(secondNewlyChosenDate);
        expect(component.selectedRangeDate).toEqual({ start: newlyChosenDate.date, end: secondNewlyChosenDate.date });
        expect(component.calendarDayList.filter(_day => _day.selectedRange).length).toBe(24);
        expect(newlyChosenDate.selected).toBe(true);
        expect(secondNewlyChosenDate.selected).toBe(true);
    });

    it('should put additional property disabled on range days', () => {
        component.calType = 'range';
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        component.disableFunction = (fdDate) => fdDate.getDay() === 1;
        component.disableRangeEndFunction = (fdDate) => false;
        component.disableRangeStartFunction = (fdDate) => fdDate.getDay() === 3;
        component.ngOnInit();
        const startDate = new FdDate(2020, 4, 15);
        const endDate = new FdDate(2020, 4, 20);
        const newlyChosenDate: CalendarDay = component.calendarDayList[5];
        const secondNewlyChosenDate: CalendarDay = component.calendarDayList[34];
        component.selectedRangeDate = { start: startDate, end: endDate };
        component.selectDate(newlyChosenDate);
        expect(component.selectedRangeDate.start).toBe(newlyChosenDate.date);
        expect(newlyChosenDate.selected).toBe(true);
        expect(component.calendarDayList.filter(_day => _day.disabled).length).toBe(5);
        component.selectDate(secondNewlyChosenDate);
        expect(component.selectedRangeDate).toEqual({ start: newlyChosenDate.date, end: secondNewlyChosenDate.date });
        expect(component.calendarDayList.filter(_day => _day.disabled).length).toBe(10);
        expect(newlyChosenDate.selected).toBe(true);
        expect(secondNewlyChosenDate.selected).toBe(true);
    });
});
