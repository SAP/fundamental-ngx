import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { CalendarLegendFocusingService } from '../../calendar-legend/calendar-legend-focusing.service';
import { CalendarService } from '../../calendar.service';
import { CalendarDay } from '../../models/calendar-day';
import { CalendarDayViewComponent } from './calendar-day-view.component';

describe('CalendarDayViewComponent', () => {
    let component: CalendarDayViewComponent<FdDate>;
    let fixture: ComponentFixture<CalendarDayViewComponent<FdDate>>;
    let datetimeAdapter: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, CalendarDayViewComponent],
            providers: [CalendarService, CalendarLegendFocusingService]
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

    it('Should Select Proper multi Date', (done) => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.allowMultipleSelection.set(true);
        component.ngOnInit();
        const dayPicked = component._dayViewGrid[2][3];
        component.selectedMultipleDatesChange.subscribe((date: FdDate[]) => {
            expect(date).toContain(dayPicked.date);
            done();
        });
        component.selectDate(dayPicked);
    });

    it('Should mark selected multi date', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.allowMultipleSelection.set(true);
        component.selectedMultipleDates = [new FdDate(2018, 10, 20), new FdDate(2018, 10, 21)];
        component.ngOnInit();
        const calendarDays: CalendarDay<FdDate>[] = component._dayViewGrid.reduce(
            (a: CalendarDay<FdDate>[], b: CalendarDay<FdDate>[]) => {
                if (!b) {
                    b = [];
                }
                return b.concat(a);
            }
        );
        const selected = calendarDays.filter((cell) => cell.selected).map((d) => d.date);
        expect(selected).toEqual(component.selectedMultipleDates);
    });

    it('Should Select Proper First Range Date', (done) => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType.set('range');
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
        component.calType.set('range');
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
        component.calType.set('range');
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
        component.startingDayOfWeek.set(1);
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        component.startingDayOfWeek.set(2);
        component.ngOnInit();
        expect(component.shortWeekDays).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
        component.startingDayOfWeek.set(3);
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
        component.startingDayOfWeek.set(2);
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
        component.rangeHoverEffect.set(true);
        component.calType.set('range');
        component.ngOnInit();
        component.selectedRangeDate = { start: null, end: null };
        component.selectDate(component._calendarDayList[10], new MouseEvent('click'));
        expect((<any>component)._isOnRangePick).toBe(true);
    });

    it('should apply hover range flags on days', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);
        component.rangeHoverEffect.set(true);
        component.calType.set('range');
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
        component.calType.set('range');
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
        component.calType.set('range');
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        component.disableFunction.set((fdDate) => fdDate.day === 1);
        component.disableRangeEndFunction.set(() => false);
        component.disableRangeStartFunction.set((fdDate) => fdDate.day === 3);
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

    it('should mark selected multiple date ranges', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType.set('range');
        component.allowMultipleSelection.set(true);

        // Initialize with specific start and end dates
        const startDate = new FdDate(2018, 10, 20);
        const endDate = new FdDate(2018, 10, 21);
        component.selectedMultipleDateRanges = [{ start: startDate, end: endDate }];

        component.ngOnInit();

        const selectedRange = component.selectedMultipleDateRanges[0];
        expect(selectedRange.start?.toDateString()).toEqual(startDate.toDateString());
        expect(selectedRange.end?.toDateString()).toEqual(endDate.toDateString());
    });

    it('should add flags to cells when multiple ranges are picked', () => {
        component.currentlyDisplayed = { month: 10, year: 2018 };
        component.calType.set('range');
        component.allowMultipleSelection.set(true);

        const startDate1 = new FdDate(2018, 10, 1);
        const endDate1 = new FdDate(2018, 10, 5);
        const startDate2 = new FdDate(2018, 10, 10);
        const endDate2 = new FdDate(2018, 10, 15);

        component.selectedMultipleDateRanges = [
            { start: startDate1, end: endDate1 },
            { start: startDate2, end: endDate2 }
        ];

        component.ngOnInit();

        const firstRangeDays = component._calendarDayList.slice(0, 5);
        const secondRangeDays = component._calendarDayList.slice(9, 15);

        firstRangeDays.forEach((day) => {
            expect(day.selected).toBeTruthy();
        });

        secondRangeDays.forEach((day) => {
            expect(day.selected).toBeTruthy();
        });
    });

    it('should apply _isOnRangePick flag for multiple ranges', () => {
        component.currentlyDisplayed.year = 2015;
        component.currentlyDisplayed.month = 6;
        component.rangeHoverEffect.set(true);
        component.calType.set('range');
        component.allowMultipleSelection.set(true);
        component.ngOnInit();
        component.selectedMultipleDateRanges = [{ start: null, end: null }];
        component.selectDate(component._calendarDayList[10], new MouseEvent('click'));
        expect((<any>component)._isOnRangePick).toBe(true);
    });

    it('should apply hover range flags on days for multiple ranges', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);

        component.rangeHoverEffect.set(true);
        component.calType.set('range');
        component.allowMultipleSelection.set(true);

        component.ngOnInit();
        component.selectedMultipleDateRanges = [{ start: date, end: date }];

        // Simulate the first date selection
        component.selectDate(component._calendarDayList[10]);

        // Hover over a different date to simulate the range effect
        component._refreshHoverRange(component._calendarDayList[15]);

        expect(component._calendarDayList.filter((_day) => _day.hoverRange).length).toBeGreaterThan(0);
    });

    it('should put additional property select on single day in multiple ranges', () => {
        component.currentlyDisplayed.year = 2020;
        component.currentlyDisplayed.month = 4;
        const date = new FdDate(2020, 4, 15);
        component.selectedDate = date;
        component.allowMultipleSelection.set(true);
        component.ngOnInit();
        component.selectDate(component._calendarDayList[15]);
        expect(component.selectedDate).toEqual(component._calendarDayList[14].date);
        expect(component._calendarDayList[15].selected).toBe(true);
    });

    describe('Legend focus optimization', () => {
        it('should cache days with special markers during grid build', () => {
            component.currentlyDisplayed = { month: 10, year: 2018 };
            fixture.componentRef.setInput('specialDaysRules', [
                {
                    specialDayNumber: 5,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 15,
                    legendText: 'Special Day 1'
                },
                {
                    specialDayNumber: 10,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 20,
                    legendText: 'Special Day 2'
                }
            ]);
            component.ngOnInit();

            const cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays).toBeDefined();
            expect(cachedDays.length).toBe(2);
            expect(cachedDays.every((day: CalendarDay<FdDate>) => day.specialDayNumber !== undefined)).toBe(true);
        });

        it('should only update cached special days when legend focus changes', () => {
            component.currentlyDisplayed = { month: 10, year: 2018 };
            fixture.componentRef.setInput('specialDaysRules', [
                {
                    specialDayNumber: 5,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 15,
                    legendText: 'Special Day 1'
                },
                {
                    specialDayNumber: 10,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 20,
                    legendText: 'Special Day 2'
                }
            ]);
            component.ngOnInit();
            fixture.detectChanges();

            // Verify initial state - all markers visible
            const cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays.every((day: CalendarDay<FdDate>) => day.shouldHideSpecialDayMarker === false)).toBe(true);

            // Simulate legend focus via the focusing service - need to provide it in the component's injector
            const focusingService = TestBed.inject(CalendarLegendFocusingService);
            focusingService._handleLegendItemFocus(5);
            fixture.detectChanges();

            // Only days with specialDayNumber !== 5 should be hidden
            const day5 = cachedDays.find((day: CalendarDay<FdDate>) => day.specialDayNumber === 5);
            const day10 = cachedDays.find((day: CalendarDay<FdDate>) => day.specialDayNumber === 10);

            expect(day5.shouldHideSpecialDayMarker).toBe(false);
            expect(day10.shouldHideSpecialDayMarker).toBe(true);
        });

        it('should show all markers when legend focus is cleared', () => {
            component.currentlyDisplayed = { month: 10, year: 2018 };
            fixture.componentRef.setInput('specialDaysRules', [
                {
                    specialDayNumber: 5,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 15,
                    legendText: 'Special Day 1'
                }
            ]);
            component.ngOnInit();
            fixture.detectChanges();

            const focusingService = TestBed.inject(CalendarLegendFocusingService);

            // Focus on a legend item
            focusingService._handleLegendItemFocus(5);
            fixture.detectChanges();

            // Clear focus
            focusingService.clearFocusedElement();
            fixture.detectChanges();

            // All markers should be visible again
            const cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays.every((day: CalendarDay<FdDate>) => day.shouldHideSpecialDayMarker === false)).toBe(true);
        });

        it('should handle grid rebuild by updating cached special days', () => {
            component.currentlyDisplayed = { month: 10, year: 2018 };
            fixture.componentRef.setInput('specialDaysRules', [
                {
                    specialDayNumber: 5,
                    rule: (date: FdDate) => datetimeAdapter.getDate(date) === 15,
                    legendText: 'Special Day 1'
                }
            ]);
            component.ngOnInit();

            let cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays.length).toBe(1);

            // Change month which rebuilds grid
            component.currentlyDisplayed = { month: 11, year: 2018 };
            fixture.detectChanges();

            cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays.length).toBe(1);
            // Verify it's a different day (November 15th instead of October 15th)
            expect(datetimeAdapter.getMonth(cachedDays[0].date)).toBe(11);
        });

        it('should efficiently handle empty special days array', () => {
            component.currentlyDisplayed = { month: 10, year: 2018 };
            fixture.componentRef.setInput('specialDaysRules', []);
            component.ngOnInit();

            const cachedDays = (component as any)._daysWithSpecialMarkers;
            expect(cachedDays.length).toBe(0);

            // Should not error when updating with no special days
            const focusingService = TestBed.inject(CalendarLegendFocusingService);
            focusingService._handleLegendItemFocus(5);
            fixture.detectChanges();

            expect(cachedDays.length).toBe(0);
        });
    });
});
