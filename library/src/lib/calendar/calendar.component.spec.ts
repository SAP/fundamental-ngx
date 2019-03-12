import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent, CalendarDay } from './calendar.component';
import { HashService } from '../utils/hash.service';
import { BehaviorSubject } from 'rxjs';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let hashServiceSpy: jasmine.SpyObj<HashService>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', {
            hash: '1'
        });
        TestBed.configureTestingModule({
            declarations: [CalendarComponent, CalendarComponent],
            providers: [{ provide: HashService, useValue: hashSpy }]
        }).compileComponents();

        hashServiceSpy = TestBed.get(HashService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should determine the number of days in a month', () => {
        expect(component.daysPerMonth).toEqual([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
        let retVal = component.determineDaysInMonth(1, 101);
        expect(retVal).toEqual(28);
        retVal = component.determineDaysInMonth(1, 400);
        expect(retVal).toEqual(29);
        retVal = component.determineDaysInMonth(1, 4);
        expect(retVal).toEqual(29);
        retVal = component.determineDaysInMonth(2, 2019);
        expect(retVal).toEqual(31);
    });

    it('should populate the calendar', () => {
        const today = new Date();

        spyOn(component.date, 'getFullYear').and.returnValue(today.getFullYear());
        spyOn(component.date, 'getMonth').and.returnValue(today.getMonth());

        spyOn(component, 'getPreviousMonthDays').and.returnValue([today]);
        spyOn(component, 'getCurrentMonthDays').and.returnValue([today]);
        spyOn(component, 'getNextMonthDays').and.returnValue([today]);

        const retVal = component.populateCalendar();

        expect(retVal.length).toBeTruthy();
        expect(component.getPreviousMonthDays).toHaveBeenCalled();
        expect(component.getCurrentMonthDays).toHaveBeenCalled();
        expect(component.getNextMonthDays).toHaveBeenCalled();
    });

    it('should construct the calendar', () => {
        const mockPopulatedCalendar = [
            {date: new Date(1)},
            {date: new Date(2)},
            {date: new Date(3)},
            {date: new Date(4)},
            {date: new Date(5)},
            {date: new Date(6)},
            {date: new Date(7)},
            {date: new Date(8)}
        ];
        spyOn(component, 'populateCalendar').and.returnValue(mockPopulatedCalendar);

        component.constructCalendar();

        expect(component.calendarGrid.length).toEqual(2);
    });

    it('should refresh selected', () => {
        component.selectedDay = {date: new Date(5)};
        const mockCalendarGrid = [
            [{date: new Date(1)},
            {date: new Date(2)},
            {date: new Date(3)},
            {date: new Date(4)},
            {date: new Date(5)},
            {date: new Date(6)},
            {date: new Date(7)}],
            [{date: new Date(8)}]
        ];
        component.calendarGrid = mockCalendarGrid;

        component.refreshSelected();
        expect(component.calendarGrid[0][4].selected).toBeTruthy();

        component.selectedDay = {date: null};
        component.selectedRangeFirst = {date: new Date(3)};
        component.refreshSelected();
        expect(component.calendarGrid[0][2].selected).toBeTruthy();
        expect(component.calendarGrid[0][2].selectedFirst).toBeTruthy();

        component.selectedRangeFirst = {date: null};
        component.selectedRangeLast = {date: new Date(6)};
        component.refreshSelected();
        expect(component.calendarGrid[0][5].selected).toBeTruthy();
        expect(component.calendarGrid[0][5].selectedLast).toBeTruthy();

        component.selectedRangeFirst = {date: new Date(3)};
        component.selectedRangeLast = {date: new Date(1000)};
        component.refreshSelected();
        expect(component.calendarGrid[0][5].selected).toBeTruthy();
        expect(component.calendarGrid[0][5].selectedRange).toBeTruthy();
    });

    it('should updateDatePickerInputEmitter', () => {
        spyOn(component.updateDatePickerInput, 'emit');
        component.calType = 'single';
        component.selectedDay = {date: new Date()};
        component.updateDatePickerInputEmitter();
        expect(component.emittedDate.selectedDay).toEqual(component.selectedDay);
        expect(component.updateDatePickerInput.emit).toHaveBeenCalledWith(component.emittedDate);
        component.calType = 'range';
        component.selectedRangeFirst = {date: new Date()};
        component.selectedRangeLast = {date: new Date()};
        component.updateDatePickerInputEmitter();
        expect(component.emittedDate.selectedFirstDay).toEqual(component.selectedRangeFirst);
        expect(component.emittedDate.selectedLastDay).toEqual(component.selectedRangeLast);
    });

    it('should construct the calendar years list', () => {
        component.firstYearCalendarList = 2019;
        component.constructCalendarYearsList();
        expect(component.calendarYearsList.length).toEqual(12);
        expect(component.calendarYearsList[11]).toEqual(2030);
    });

    it('should tab index the year list', () => {
        component.calendarYearsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        component.year = 4;
        let retVal = component.getYearTabIndex(4, 1);
        expect(retVal).toEqual(0);
        retVal = component.getYearTabIndex(13, 0);
        expect(retVal).toEqual(-1);
    });

    it('should go to previous month', () => {
        spyOn(component, 'setCurrentMonth');
        spyOn(component, 'constructCalendar');
        component.date = new Date();
        component.month = component.date.getMonth() - 1;
        component.goToPreviousMonth();
        expect(component.setCurrentMonth).toHaveBeenCalledWith(component.date.getMonth() - 1);
        expect(component.selectedMonth).toEqual(component.date.getMonth() - 1);
        expect(component.constructCalendar).toHaveBeenCalled();
    });

    it('should go to next month', () => {
        spyOn(component, 'setCurrentMonth');
        spyOn(component, 'constructCalendar');
        component.date = new Date();
        component.month = component.date.getMonth() + 1;
        component.goToNextMonth();
        expect(component.setCurrentMonth).toHaveBeenCalledWith(component.date.getMonth() + 1);
        expect(component.selectedMonth).toEqual(component.date.getMonth() + 1);
        expect(component.constructCalendar).toHaveBeenCalled();
    });

    it('should load next year\'s list', () => {
        spyOn(component, 'constructCalendarYearsList');
        component.firstYearCalendarList = 0;
        component.loadNextYearsList();
        expect(component.calendarYearsList).toEqual([]);
        expect(component.firstYearCalendarList).toEqual(12);
        expect(component.constructCalendarYearsList).toHaveBeenCalled();
    });

    it('should load prev year\'s list', () => {
        spyOn(component, 'constructCalendarYearsList');
        component.firstYearCalendarList = 0;
        component.loadPrevYearsList();
        expect(component.calendarYearsList).toEqual([]);
        expect(component.firstYearCalendarList).toEqual(-12);
        expect(component.constructCalendarYearsList).toHaveBeenCalled();
    });

    it('should selectDate for single day', () => {
        const mockDay = {
            date: new Date()
        };
        component.calType = 'single';
        component.init = true;
        spyOn(component.selectedDayChange, 'emit');
        spyOn(component, 'onChange');
        spyOn(component, 'updateDatePickerInputEmitter');
        component.selectDate(mockDay);
        expect(component.selectedDay).toEqual(mockDay);
        expect(component.selectedDayChange.emit).toHaveBeenCalledWith(component.selectedDay);
        expect(component.onChange).toHaveBeenCalledWith({date: mockDay.date});
        expect(component.updateDatePickerInputEmitter).toHaveBeenCalled();
    });

    it('should selectDate for a range of days', () => {
        const mockDay = {
            date: new Date()
        };
        const refreshSpy = spyOn(component, 'refreshSelected');
        spyOn(component, 'onChange');
        const updateDatePickerInputEmitterSpy = spyOn(component, 'updateDatePickerInputEmitter');
        spyOn(component.selectedRangeFirstChange, 'emit');
        spyOn(component.selectedRangeLastChange, 'emit');

        component.selectCounter = 2;
        component.init = true;
        component.calType = 'range';

        component.selectDate(mockDay);

        expect(component.selectedRangeLast).toEqual(mockDay);
        expect(component.selectedRangeFirst).toEqual(mockDay);
        expect(component.selectedRangeLastChange.emit).toHaveBeenCalledWith(component.selectedRangeLast);
        expect(component.selectedRangeFirstChange.emit).toHaveBeenCalledWith(component.selectedRangeFirst);
        expect(updateDatePickerInputEmitterSpy).toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalled();
        expect(component.onChange).toHaveBeenCalledWith({date: mockDay.date, rangeEnd: mockDay.date});

        component.selectCounter = 1;
        component.selectedRangeLast = {date: new Date(1)};
        refreshSpy.calls.reset();
        updateDatePickerInputEmitterSpy.calls.reset();
        component.selectDate(mockDay);
        expect(component.selectedRangeLast).toEqual(mockDay);
        expect(component.selectedRangeLastChange.emit).toHaveBeenCalledWith(component.selectedRangeLast);
        expect(updateDatePickerInputEmitterSpy).toHaveBeenCalled();
        expect(refreshSpy).toHaveBeenCalled();
        expect(component.onChange).toHaveBeenCalledWith({date: component.selectedRangeFirst.date, rangeEnd: mockDay.date});

        component.selectCounter = 1;
        component.selectedRangeFirst = mockDay;
        component.selectedRangeLast = {date: new Date(0)};
        refreshSpy.calls.reset();
        updateDatePickerInputEmitterSpy.calls.reset();
        component.selectDate({date: new Date(0)});
        expect(refreshSpy).toHaveBeenCalled();
        expect(updateDatePickerInputEmitterSpy).toHaveBeenCalled();
        expect(component.selectedRangeLastChange.emit).toHaveBeenCalledWith(component.selectedRangeLast);
        expect(component.selectedRangeFirstChange.emit).toHaveBeenCalledWith(component.selectedRangeFirst);

    });

    it('should openMonthSelection', () => {
        component.showCalendarYears = true;
        component.openMonthSelection();
        expect(component.showCalendarYears).toBeFalsy();
        expect(component.showCalendarDates).toBeFalsy();
        expect(component.showCalendarMonths).toBeTruthy();
        component.showCalendarYears = false;
        component.openMonthSelection();
        expect(component.showCalendarYears).toBeFalsy();
        expect(component.showCalendarDates).toBeTruthy();
        expect(component.showCalendarMonths).toBeFalsy();
    });

    it('should openYearSelection', () => {
        component.showCalendarMonths = true;
        component.openYearSelection();
        expect(component.showCalendarYears).toBeTruthy();
        expect(component.showCalendarDates).toBeFalsy();
        expect(component.showCalendarMonths).toBeFalsy();
        component.showCalendarMonths = false;
        component.openYearSelection();
        expect(component.showCalendarYears).toBeFalsy();
        expect(component.showCalendarDates).toBeTruthy();
        expect(component.showCalendarMonths).toBeFalsy();
    });

    it('should handle escape keydown', () => {
        const event = new KeyboardEvent('keydown', {key: 'Escape'});
        document.dispatchEvent(event);
        expect(component.showCalendarYears).toBeFalsy();
        expect(component.showCalendarDates).toBeTruthy();
        expect(component.showCalendarMonths).toBeFalsy();
    });

    it('should handle document click', () => {
        document.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.showCalendarMonths).toBeFalsy();
        expect(component.showCalendarDates).toBeTruthy();
        expect(component.showCalendarYears).toBeFalsy();
    });

    it('should validate date from date picker', () => {
        let mockDate = [1, 1, 2019];
        let retVal = component.validateDateFromDatePicker(mockDate);
        expect(retVal).toBeFalsy();
        mockDate = [0, 1, 2019];
        retVal = component.validateDateFromDatePicker(mockDate);
        expect(retVal).toBeTruthy();
        mockDate = [undefined, 1, 2019];
        retVal = component.validateDateFromDatePicker(mockDate);
        expect(retVal).toBeTruthy();
        mockDate = [1, 0, 2019];
        retVal = component.validateDateFromDatePicker(mockDate);
        expect(retVal).toBeTruthy();
    });

    it('should resetSelection', () => {
        spyOn(component.selectedDayChange, 'emit');
        spyOn(component.selectedRangeFirstChange, 'emit');
        spyOn(component.selectedRangeLastChange, 'emit');
        spyOn(component, 'constructCalendarYearsList');
        spyOn(component, 'constructCalendar');
        component.calType = 'single';
        component.resetSelection();
        expect(component.selectedDay).toEqual({date: null});
        expect(component.selectedDayChange.emit).toHaveBeenCalledWith(component.selectedDay);

        component.calType = 'range';
        component.resetSelection();
        expect(component.selectedRangeFirst).toEqual({date: null});
        expect(component.selectedRangeLast).toEqual({date: null});
        expect(component.selectedRangeFirstChange.emit).toHaveBeenCalledWith(component.selectedRangeFirst);
        expect(component.selectedRangeLastChange.emit).toHaveBeenCalledWith(component.selectedRangeLast);

        const today = new Date();
        expect(component.year).toEqual(today.getFullYear());
        expect(component.month).toEqual(today.getMonth());
        expect(component.day).toEqual(today.getDate());
        expect(component.selectedMonth).toBe(null);
        expect(component.firstYearCalendarList).toEqual(component.year);
        expect(component.selectCounter).toEqual(0);
        expect(component.calendarYearsList).toEqual([]);
        expect(component.constructCalendar).toHaveBeenCalled();
        expect(component.constructCalendarYearsList).toHaveBeenCalled();
    });

    it('should handle keydown year handler', () => {
        component.calendarId = '';
        spyOn(component, 'selectYear');
        const focusSpy = spyOn(component, 'focusElement');
        component.onKeydownDayHandler({code: 'Tab', preventDefault: () => {}}, {});
        expect(component.focusElement).toHaveBeenCalledWith('#arrowLeft');

        focusSpy.calls.reset();

        component.onKeydownYearHandler({code: 'Enter', preventDefault: () => {}}, 2019);

        expect(component.selectYear).toHaveBeenCalledWith(2019);

        const loadPrevYearsSpy = spyOn(component, 'loadPrevYearsList');
        const loadNextYearsSpy = spyOn(component, 'loadNextYearsList');

        component.calendarYearsList = [2019];
        component.onKeydownYearHandler({code: 'ArrowUp', preventDefault: () => {}}, 2019);
        expect(loadPrevYearsSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-year-2015');
        focusSpy.calls.reset();

        loadPrevYearsSpy.calls.reset();

        component.calendarYearsList = [1, 2, 3, 4, 5, 6, 7, 8, 2019];
        component.onKeydownYearHandler({code: 'ArrowDown', preventDefault: () => {}}, 2019);
        expect(loadNextYearsSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-year-2023');
        focusSpy.calls.reset();

        loadNextYearsSpy.calls.reset();

        component.calendarYearsList = [2019];
        component.onKeydownYearHandler({code: 'ArrowLeft', preventDefault: () => {}}, 2019);
        expect(loadPrevYearsSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-year-2018');
        focusSpy.calls.reset();

        component.onKeydownYearHandler({code: 'ArrowRight', preventDefault: () => {}}, 2019);
        expect(loadNextYearsSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-year-2020');
        focusSpy.calls.reset();
    });

    it('should handle month keydown events', () => {
        component.calendarId = '';
        spyOn(component, 'selectMonth');
        const focusSpy = spyOn(component, 'focusElement');
        component.onKeydownMonthHandler({code: 'Tab', preventDefault: () => {}}, {});
        expect(component.focusElement).toHaveBeenCalledWith('#arrowLeft');

        focusSpy.calls.reset();

        component.onKeydownMonthHandler({code: 'Enter', preventDefault: () => {}}, 5);

        expect(component.selectMonth).toHaveBeenCalledWith(5);
        component.onKeydownMonthHandler({code: 'ArrowUp', preventDefault: () => {}}, 5);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-1');
        focusSpy.calls.reset();

        component.onKeydownMonthHandler({code: 'ArrowDown', preventDefault: () => {}}, 5);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-9');
        focusSpy.calls.reset();

        component.onKeydownMonthHandler({code: 'ArrowLeft', preventDefault: () => {}}, 5);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-4');
        focusSpy.calls.reset();

        component.onKeydownMonthHandler({code: 'ArrowLeft', preventDefault: () => {}}, 0);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-11');
        focusSpy.calls.reset();

        component.onKeydownMonthHandler({code: 'ArrowRight', preventDefault: () => {}}, 5);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-6');
        focusSpy.calls.reset();
        component.onKeydownMonthHandler({code: 'ArrowRight', preventDefault: () => {}}, 11);
        expect(focusSpy).toHaveBeenCalledWith('#-fd-month-0');
        focusSpy.calls.reset();
    });

    it('should handle keydown day handler', () => {
        component.calendarId = '';

        const focusSpy = spyOn(component, 'focusElement');
        component.onKeydownDayHandler({code: 'Tab', preventDefault: () => {}}, {});
        expect(component.focusElement).toHaveBeenCalledWith('#arrowLeft');

        focusSpy.calls.reset();

        spyOn(component, 'selectDate');

        component.calendarGrid = [
            [], [], [], [], []
        ];

        const mockEvent = {
            code: 'Enter',
            currentTarget: {
                id: 'fd-test-1'
            },
            preventDefault: () => {}
        };

        component.onKeydownDayHandler(mockEvent, 'mockCell');

        expect(component.selectDate).toHaveBeenCalledWith('mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-1');

        focusSpy.calls.reset();

        const prevMonthSpy = spyOn(component, 'goToPreviousMonth');

        mockEvent.code = 'ArrowUp';
        mockEvent.currentTarget.id = 'fd-test-12';

        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(prevMonthSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-52');
        focusSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-22';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-12');
        focusSpy.calls.reset();
        prevMonthSpy.calls.reset();

        const nextMonthSpy = spyOn(component, 'goToNextMonth');

        mockEvent.code = 'ArrowDown';
        mockEvent.currentTarget.id = 'fd-test-55';

        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(nextMonthSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-15');
        focusSpy.calls.reset();
        nextMonthSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-22';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-32');
        focusSpy.calls.reset();

        mockEvent.code = 'ArrowLeft';
        mockEvent.currentTarget.id = 'fd-test-10';

        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(prevMonthSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-56');
        focusSpy.calls.reset();
        nextMonthSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-20';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-16');
        focusSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-19';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-18');
        focusSpy.calls.reset();

        mockEvent.code = 'ArrowRight';
        mockEvent.currentTarget.id = 'fd-test-56';

        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(prevMonthSpy).toHaveBeenCalled();
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-10');
        focusSpy.calls.reset();
        nextMonthSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-26';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-30');
        focusSpy.calls.reset();
        mockEvent.currentTarget.id = 'fd-test-19';
        component.onKeydownDayHandler(mockEvent, 'mockCell');
        expect(focusSpy).toHaveBeenCalledWith('#-fd-day-20');
        focusSpy.calls.reset();
    });

    it('should update from date picker - invalid single date', () => {
        component.calType = 'single';
        spyOn(component, 'validateDateFromDatePicker').and.returnValue(true);
        spyOn(component.isInvalidDateInput, 'emit');
        spyOn(component, 'resetSelection');
        component.updateFromDatePicker('0');
        expect(component.validateDateFromDatePicker).toHaveBeenCalledWith(['0']);
        expect(component.invalidDate).toEqual(true);
        expect(component.isInvalidDateInput.emit).toHaveBeenCalledWith(component.invalidDate);
        expect(component.resetSelection).toHaveBeenCalled();
    });

    it('should update date from date picker - valid single date', () => {
        component.calType = 'single';
        spyOn(component, 'validateDateFromDatePicker').and.returnValue(false);
        spyOn(component.isInvalidDateInput, 'emit');
        spyOn(component, 'constructCalendar');
        spyOn(component, 'constructCalendarYearsList');
        spyOn(component, 'updateDatePickerInputEmitter');
        component.updateFromDatePicker('1/1/2019');
        expect(component.selectedDay.date).toEqual(new Date(2019, 0, 1));
        expect(component.date).toEqual(new Date(2019, 0, 1));
        expect(component.year).toEqual(2019);
        expect(component.month).toEqual(0);
        expect(component.monthName).toEqual('January');
        expect(component.isInvalidDateInput.emit).toHaveBeenCalledWith(false);
        expect(component.constructCalendar).toHaveBeenCalled();
        expect(component.constructCalendarYearsList).toHaveBeenCalled();
        expect(component.updateDatePickerInputEmitter).toHaveBeenCalled();
    });

    it('should update from date picker - invalid range', () => {
        component.calType = 'range';
        spyOn(component, 'validateDateFromDatePicker').and.returnValue(true);
        spyOn(component.isInvalidDateInput, 'emit');
        spyOn(component, 'resetSelection');
        component.updateFromDatePicker('0 - 1');
        expect(component.validateDateFromDatePicker).toHaveBeenCalledWith(['0']);
        expect(component.invalidDate).toEqual(true);
        expect(component.isInvalidDateInput.emit).toHaveBeenCalledWith(component.invalidDate);
        expect(component.resetSelection).toHaveBeenCalled();
    });

    it('should update from date picker - valid range', () => {
        component.calType = 'range';
        spyOn(component, 'validateDateFromDatePicker').and.returnValue(false);
        spyOn(component.isInvalidDateInput, 'emit');
        spyOn(component, 'constructCalendar');
        spyOn(component, 'constructCalendarYearsList');
        spyOn(component, 'updateDatePickerInputEmitter');
        component.updateFromDatePicker('1/1/2019 - 2/2/2020');
        expect(component.selectedRangeFirst.date).toEqual(new Date(2019, 0, 1));
        expect(component.selectedRangeLast.date).toEqual(new Date(2020, 1, 2));
        expect(component.date).toEqual(new Date(2019, 0, 1));
        expect(component.year).toEqual(2019);
        expect(component.month).toEqual(0);
        expect(component.monthName).toEqual('January');
        expect(component.isInvalidDateInput.emit).toHaveBeenCalledWith(false);
        expect(component.constructCalendar).toHaveBeenCalled();
        expect(component.constructCalendarYearsList).toHaveBeenCalled();
        expect(component.updateDatePickerInputEmitter).toHaveBeenCalled();
    });

    it('should handle ngOnInit', () => {
        component.date = null;
        spyOn(component, 'constructCalendar');
        spyOn(component, 'selectMonth');
        spyOn(component, 'selectYear');
        spyOn(component, 'updateFromDatePicker');
        spyOn(component, 'constructCalendarYearsList');
        component.ngOnInit();
        expect(component.date).toBeTruthy();
        expect(component.calendarId).toBeTruthy();
        expect(component.constructCalendar).toHaveBeenCalled();
        expect(component.selectMonth).toHaveBeenCalled();
        expect(component.selectYear).toHaveBeenCalled();
        expect(component.init).toBeTruthy();
    });

});
