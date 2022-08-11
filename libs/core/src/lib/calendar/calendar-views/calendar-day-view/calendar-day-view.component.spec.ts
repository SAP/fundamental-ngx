import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { DatetimeAdapter, FdDatetimeAdapter, FdDatetimeModule } from '../../../datetime';
import { FdDate } from '../../../datetime/fd-date';
import { CalendarService } from '../../calendar.service';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarDayViewComponent } from './calendar-day-view.component';

describe('CalendarDayViewComponent', () => {
    let component: CalendarDayViewComponent<FdDate>;
    let fixture: ComponentFixture<CalendarDayViewComponent<FdDate>>;
    let datetimeAdapter: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule],
            declarations: [CalendarDayViewComponent],
            providers: [CalendarService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarDayViewComponent<FdDate>>(CalendarDayViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([DatetimeAdapter], (dateAdapter: FdDatetimeAdapter) => {
        datetimeAdapter = dateAdapter;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Select Proper Date', (done) => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        const dayPicked = component._dayViewGrid[2][3];
        component.selectedDateChange.subscribe((date: FdDate) => {
            expect(date.toDateString()).toBe(dayPicked.date.toDateString());
            done();
        });
        component.selectDate(dayPicked);
    });

    it('Should mark selected single date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.selectedDate = new FdDate(2018, 10, 20);
        component.ngOnInit();
        const calendarDays: CalendarDay<FdDate>[] = component._dayViewGrid.reduce(
            (a: CalendarDay<FdDate>[], b: CalendarDay<FdDate>[]) => {
                if (!b) {
                    b = [];
                }
                return b.concat(a);
            }
        );
        const selected = calendarDays.find((cell) => cell.selected);
        expect(selected?.date.toDateString()).toBe(component.selectedDate.toDateString());
    });

    it('Should Select Proper First Range Date', (done) => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayPicked = component._dayViewGrid[2][3];
        component.selectedRangeDateChange.subscribe((date: { start: FdDate; end: FdDate }) => {
            expect(date.start.toDateString()).toBe(dayPicked.date.toDateString());
            done();
        });
        component.selectDate(dayPicked);
    });

    it('Should Select Proper Second Range Date', (done) => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayStartPicked = component._dayViewGrid[2][3];
        const dayEndPicked = component._dayViewGrid[3][3];
        component.selectedRangeDate = { start: dayStartPicked.date, end: null };
        component.selectedRangeDateChange.pipe(first()).subscribe((date) => {
            expect(date.end?.toDateString()).toBe(dayEndPicked.date.toDateString());
            done();
        });
        component.selectDate(dayEndPicked);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType = 'range';
        component.ngOnInit();
        const dayStartPicked = component._dayViewGrid[1][1];
        const dayEndPicked = component._dayViewGrid[3][3];

        component.selectDate(dayStartPicked);
        component.selectDate(dayEndPicked);

        expect(component._dayViewGrid[2][2].selectedRange).toBe(true);
        expect(component._dayViewGrid[1][1].selected).toBe(true);
        expect(component._dayViewGrid[3][3].selected).toBe(true);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        const dayPicked = component._dayViewGrid[1][1];

        component.selectDate(dayPicked);

        expect(component._dayViewGrid[1][1].selected).toBe(true);
    });

    it('Should add flags to cells, when picked on range', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.ngOnInit();
        component.selectedDate = component._dayViewGrid[1][1].date;
        component.ngOnInit();

        expect(component._dayViewGrid[1][1].selected).toBe(true);
    });

    it('should properly rearrange days when different startingDayOfWeek is used', () => {
        component.startingDayOfWeek = 1;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        component.startingDayOfWeek = 2;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        component.startingDayOfWeek = 3;
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']);
    });

    it('should generate proper week count on january 2010', () => {
        component.currentlyDisplayed.year = 2010;
        component.currentlyDisplayed.month = 1;
        component.ngOnInit();
        component._weeks = ['53', '1', '2', '3', '4', '5'];
    });

    it('should generate proper week count on december 2010', () => {
        component.currentlyDisplayed.year = 2012;
        component.currentlyDisplayed.month = 12;
        component.ngOnInit();
        component._weeks = ['48', '49', '50', '51', '52'];
    });

    it('should generate proper days for february 2020', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 2;
        component.startingDayOfWeek = 2;
        component.ngOnInit();
        expect(component._dayViewGrid.map((day) => day.map((_day) => _day.date.day))).toEqual([
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
        const day: CalendarDay<FdDate> = component._calendarDayList[15];
        component.selectDate(day);
        const activeCell: CalendarDay<FdDate> = (<any>component)._getActiveCell(component._calendarDayList);
        expect(datetimeAdapter.datesEqual(activeCell.date, day.date)).toBe(true);
    });

    it('should get active cell for today', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.ngOnInit();
        const day: CalendarDay<FdDate> = component._calendarDayList[15];
        day.current = true;
        const activeCell: CalendarDay<FdDate> = (<any>component)._getActiveCell(component._calendarDayList);
        expect(datetimeAdapter.datesEqual(activeCell.date, day.date)).toBe(true);
    });

    it('should apply _isOnRangePick flag', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.rangeHoverEffect = true;
        component.calType = 'range';
        component.ngOnInit();
        component.selectedRangeDate = { start: null, end: null };
        component.selectDate(component._calendarDayList[10], new MouseEvent('click'));
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
        component._refreshHoverRange(component._calendarDayList[0]);
        expect(component._calendarDayList.filter((_day) => _day.hoverRange).length).toBe(13);
    });

    it('should put additional property select on single day', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);
        component.selectedDate = date;
        component.ngOnInit();
        component.selectDate(component._calendarDayList[15]);
        expect(component.selectedDate).toBe(component._calendarDayList[15].date);
        expect(component._calendarDayList[15].selected).toBe(true);
        component.selectDate(component._calendarDayList[10]);
        expect(component.selectedDate).toBe(component._calendarDayList[10].date);
        expect(component._calendarDayList[10].selected).toBe(true);
        expect(component._calendarDayList[15].selected).toBe(false);
    });

    it('should put additional property select on range day', () => {
        component.calType = 'range';
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const startDate = new FdDate(2020, 4, 15);
        const endDate = new FdDate(2020, 4, 20);
        component.ngOnInit();
        const newlyChosenDate: CalendarDay<FdDate> = component._calendarDayList[5];
        const secondNewlyChosenDate: CalendarDay<FdDate> = component._calendarDayList[30];
        component.selectedRangeDate = { start: startDate, end: endDate };
        component.selectDate(newlyChosenDate);
        expect(component.selectedRangeDate.start).toBe(newlyChosenDate.date);
        expect(newlyChosenDate.selected).toBe(true);
        expect(component._calendarDayList.filter((_day) => _day.selectedRange).length).toBe(0);
        component.selectDate(secondNewlyChosenDate);
        expect(component.selectedRangeDate).toEqual({ start: newlyChosenDate.date, end: secondNewlyChosenDate.date });
        expect(component._calendarDayList.filter((_day) => _day.selectedRange).length).toBe(24);
        expect(newlyChosenDate.selected).toBe(true);
        expect(secondNewlyChosenDate.selected).toBe(true);
    });

    it('should put additional property disabled on range days', () => {
        component.calType = 'range';
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        component.disableFunction = (fdDate) => fdDate.day === 1;
        component.disableRangeEndFunction = () => false;
        component.disableRangeStartFunction = (fdDate) => fdDate.day === 3;
        component.ngOnInit();
        const startDate = new FdDate(2020, 4, 15);
        const endDate = new FdDate(2020, 4, 20);
        const newlyChosenDate: CalendarDay<FdDate> = component._calendarDayList[5];
        const secondNewlyChosenDate: CalendarDay<FdDate> = component._calendarDayList[34];
        component.selectedRangeDate = { start: startDate, end: endDate };
        component.selectDate(newlyChosenDate);
        expect(component.selectedRangeDate.start).toBe(newlyChosenDate.date);
        expect(newlyChosenDate.selected).toBe(true);
        expect(component._calendarDayList.filter((_day) => _day.disabled).length).toBe(2);
        component.selectDate(secondNewlyChosenDate);
        expect(component.selectedRangeDate).toEqual({ start: newlyChosenDate.date, end: secondNewlyChosenDate.date });
        expect(component._calendarDayList.filter((_day) => _day.disabled).length).toBe(4);
        expect(newlyChosenDate.selected).toBe(true);
        expect(secondNewlyChosenDate.selected).toBe(true);
    });
});
