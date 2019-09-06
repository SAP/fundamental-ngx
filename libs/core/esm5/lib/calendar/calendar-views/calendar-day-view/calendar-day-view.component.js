/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18n } from '../../i18n/calendar-i18n';
import { FdDate } from '../../models/fd-date';
import { CalendarService } from '../../calendar.service';
/**
 * Component representing the day view of the calendar.
 */
var CalendarDayViewComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarDayViewComponent(calendarI18n, eRef) {
        this.calendarI18n = calendarI18n;
        this.eRef = eRef;
        /**
         * @hidden
         */
        this.newFocusedDayId = '';
        /**
         * @hidden
         */
        this.fdCalendarDateViewClass = true;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.calType = 'single';
        /**
         * Event emitted always, when model is changed in range mode
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event emitted always, when next month is selected, by focus
         */
        this.nextMonthSelect = new EventEmitter();
        /**
         * Event emitted always, when previous month is selected, by focus
         */
        this.previousMonthSelect = new EventEmitter();
        /**
         * Event emitted always, when model is changed in single mode
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param {?} day CalendarDay object to be selected.
     * @param {?=} event
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectDate = /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param {?} day CalendarDay object to be selected.
     * @param {?=} event
     * @return {?}
     */
    function (day, event) {
        if (event) {
            /**
             * There are some problems with popup integration. After clicking inside day component, the popover closes.
             */
            event.stopPropagation();
            event.preventDefault();
            this.newFocusedDayId = day.id;
            this.focusElement(this.newFocusedDayId);
        }
        if (!day.blocked && !day.disabled) {
            if (this.calType === 'single') {
                this.selectedDate = day.date;
                this.selectedDateChange.emit(day.date);
                this.buildDayViewGrid();
            }
            else {
                if (this.selectCounter === 0 || this.selectCounter === 2) {
                    this.selectedRangeDate = { start: day.date, end: null };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }
                else if (this.selectCounter === 1) {
                    // Check if date picked is higher than already chosen, otherwise just first one
                    if (this.selectedRangeDate.start.getTimeStamp() < day.date.getTimeStamp()) {
                        this.selectedRangeDate = { start: this.selectedRangeDate.start, end: day.date };
                    }
                    else {
                        this.selectedRangeDate = { start: day.date, end: null };
                    }
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.buildDayViewGrid();
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "selectCounter", {
        /** @hidden
         *  Amount of selected days
         *  0, when none,
         *  1, when only startDate, or endDate same as startDate,
         *  2, when both
         */
        get: /**
         * @hidden
         *  Amount of selected days
         *  0, when none,
         *  1, when only startDate, or endDate same as startDate,
         *  2, when both
         * @return {?}
         */
        function () {
            if (!this.selectedRangeDate || !this.selectedRangeDate.start) {
                return 0;
            }
            else if (this.selectedRangeDate.start &&
                (!this.selectedRangeDate.end ||
                    CalendarService.datesEqual(this.selectedRangeDate.start, this.selectedRangeDate.end))) {
                return 1;
            }
            else if (this.selectedRangeDate.start && this.selectedRangeDate.end) {
                return 2;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param grid with specified column and row as a x and y
     */
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param {?} event KeyboardEvent
     * @param {?} cell CalendarDay
     * @param {?} grid with specified column and row as a x and y
     * @return {?}
     */
    CalendarDayViewComponent.prototype.onKeydownDayHandler = /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param {?} event KeyboardEvent
     * @param {?} cell CalendarDay
     * @param {?} grid with specified column and row as a x and y
     * @return {?}
     */
    function (event, cell, grid) {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        }
        else {
            switch (event.code) {
                case ('Space'):
                case ('Enter'): {
                    event.preventDefault();
                    this.selectDate(cell);
                    this.newFocusedDayId = cell.id;
                    break;
                }
                case ('ArrowUp'): {
                    event.preventDefault();
                    if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][grid.x].id;
                    }
                    else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId = this.dayViewGrid[this.dayViewGrid.length - 1][grid.x].id;
                    }
                    break;
                }
                case ('ArrowDown'): {
                    event.preventDefault();
                    if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][grid.x].id;
                    }
                    else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][grid.x].id;
                    }
                    break;
                }
                case ('ArrowLeft'): {
                    event.preventDefault();
                    if (grid.x > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x - 1].id;
                    }
                    else if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][this.dayViewGrid[0].length - 1].id;
                    }
                    else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId =
                            this.dayViewGrid[this.dayViewGrid.length - 1][this.dayViewGrid[0].length - 1].id;
                    }
                    break;
                }
                case ('ArrowRight'): {
                    event.preventDefault();
                    if (grid.x < this.dayViewGrid[0].length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x + 1].id;
                    }
                    else if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][0].id;
                    }
                    else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][0].id;
                    }
                    break;
                }
            }
        }
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnChanges = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.buildDayViewGrid();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngAfterViewChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    };
    /** @hidden
     *  Method that allow to focus elements inside this component
     */
    /**
     * @hidden
     *  Method that allow to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    CalendarDayViewComponent.prototype.focusElement = /**
     * @hidden
     *  Method that allow to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    function (elementSelector) {
        /** @type {?} */
        var elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    };
    /** Active day means that with tabindex = 0, it's selected day or today or first day */
    /**
     * Active day means that with tabindex = 0, it's selected day or today or first day
     * @return {?}
     */
    CalendarDayViewComponent.prototype.focusActiveDay = /**
     * Active day means that with tabindex = 0, it's selected day or today or first day
     * @return {?}
     */
    function () {
        this.newFocusedDayId = this.getActiveCell(this.calendarDayList.filter((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.monthStatus === 'current'; }))).id;
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "calendarDayList", {
        /** Function that gives array of all displayed CalendarDays */
        get: /**
         * Function that gives array of all displayed CalendarDays
         * @return {?}
         */
        function () {
            return this.dayViewGrid.reduce((/**
             * @param {?} totalCalendarRows
             * @param {?} calendarRow
             * @return {?}
             */
            function (totalCalendarRows, calendarRow) {
                if (!calendarRow) {
                    calendarRow = [];
                }
                return totalCalendarRows.concat(calendarRow);
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectPreviousMonth = /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = tslib_1.__assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month - 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        this.buildDayViewGrid();
        this.previousMonthSelect.emit();
    };
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectNextMonth = /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = tslib_1.__assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month + 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        this.buildDayViewGrid();
        this.nextMonthSelect.emit();
    };
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.populateCalendar = /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var calendar = [];
        calendar = this.getPreviousMonthDays(calendar);
        calendar = calendar.concat(this.getCurrentMonthDays());
        calendar = this.getNextMonthDays(calendar);
        calendar.forEach((/**
         * @param {?} call
         * @param {?} index
         * @return {?}
         */
        function (call, index) { return call.id = _this.id + '-fd-day-' + (Math.floor(index / 7) + 1) + '' + (index % 7); }));
        return calendar;
    };
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.buildDayViewGrid = /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     * @private
     * @return {?}
     */
    function () {
        if (!this.currentlyDisplayed) {
            if (this.selectedDate) {
                this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
            }
            else {
                this.currentlyDisplayed = { month: FdDate.getToday().month, year: FdDate.getToday().year };
            }
        }
        /** @type {?} */
        var calendarDays = this.populateCalendar();
        /** @type {?} */
        var dayViewGrid = [];
        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, 7));
        }
        this.dayViewGrid = dayViewGrid;
        return;
    };
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     */
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getCurrentMonthDays = /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var month = this.currentlyDisplayed.month;
        /** @type {?} */
        var year = this.currentlyDisplayed.year;
        /** @type {?} */
        var calendarDays = [];
        /** @type {?} */
        var amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        for (var dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            /** @type {?} */
            var fdDate = new FdDate(year, month, dayNumber);
            calendarDays.push(tslib_1.__assign({}, this.getDay(fdDate), { monthStatus: 'current', today: CalendarService.datesEqual(FdDate.getToday(), fdDate) }));
        }
        this.getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    };
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getActiveCell = /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.selected; }))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return cell.selected; }));
        }
        else if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.today; }))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return cell.today; }));
        }
        else {
            return calendarDays[0];
        }
    };
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     */
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getPreviousMonthDays = /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        /** @type {?} */
        var month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        /** @type {?} */
        var year = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        /** @type {?} */
        var amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        /** @type {?} */
        var prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth);
        /** @type {?} */
        var prevMonthLastDay = amountOfDaysInCurrentMonth;
        /** @type {?} */
        var prevMonthLastWeekDay = prevMonthLastDate.getDay() - this.startingDayOfWeek;
        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         */
        if (prevMonthLastWeekDay < 0) {
            prevMonthLastWeekDay = prevMonthLastWeekDay + 7;
        }
        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                /** @type {?} */
                var prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                /** @type {?} */
                var fdDate = new FdDate(year, month, prevMonthDay);
                calendarDays.push(tslib_1.__assign({}, this.getDay(fdDate), { monthStatus: 'previous' }));
                prevMonthLastWeekDay--;
            }
        }
        return calendarDays;
    };
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     */
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getNextMonthDays = /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        /** @type {?} */
        var month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 1;
        /** @type {?} */
        var year = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;
        // The calendar grid can have 6 (42 days) weeks
        /** @type {?} */
        var nextMonthDisplayedDays = 42 - calendarDays.length;
        for (var nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            /** @type {?} */
            var fdDate = new FdDate(year, month, nextD);
            calendarDays.push(tslib_1.__assign({}, this.getDay(fdDate), { monthStatus: 'next' }));
        }
        return calendarDays;
    };
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     * @private
     * @param {?} fdDate
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getDay = /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     * @private
     * @param {?} fdDate
     * @return {?}
     */
    function (fdDate) {
        /** @type {?} */
        var day = {
            date: fdDate,
            weekDay: fdDate.getDay(),
            disabled: this.disableFunction(fdDate),
            blocked: this.blockFunction(fdDate),
            selected: ((this.calType === 'single' && CalendarService.datesEqual(fdDate, this.selectedDate)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end))),
            selectedFirst: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)),
            selectedLast: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end)),
            selectedRange: (this.selectedRangeDate && ((this.selectedRangeDate.start && (this.selectedRangeDate.start.getTimeStamp() < fdDate.getTimeStamp())) &&
                (this.selectedRangeDate.end && (this.selectedRangeDate.end.getTimeStamp() > fdDate.getTimeStamp())))),
            ariaLabel: this.calendarI18n.getDayAriaLabel(fdDate.toDate())
        };
        if (this.calType === 'range' && (this.selectCounter === 0 || this.selectCounter === 2)) {
            if (this.disableRangeStartFunction && !day.disabled) {
                day.disabled = this.disableRangeStartFunction(day.date);
            }
            if (this.blockRangeStartFunction && !day.blocked) {
                day.blocked = this.blockRangeStartFunction(day.date);
            }
        }
        else if (this.selectCounter === 1) {
            if (this.disableRangeEndFunction && !day.disabled) {
                day.disabled = this.disableRangeEndFunction(day.date);
            }
            if (this.blockRangeEndFunction && !day.blocked) {
                day.blocked = this.blockRangeEndFunction(day.date);
            }
        }
        return day;
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "shortWeekDays", {
        /**
         * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
         * providing other class which implements CalendarI18n
         */
        get: /**
         * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
         * providing other class which implements CalendarI18n
         * @return {?}
         */
        function () {
            return this.calendarI18n.getAllShortWeekdays()
                .slice(this.startingDayOfWeek - 1)
                .concat(this.calendarI18n.getAllShortWeekdays().slice(0, this.startingDayOfWeek - 1))
                .map((/**
             * @param {?} weekday
             * @return {?}
             */
            function (weekday) { return weekday[0].toLocaleUpperCase(); }));
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-day-view',
                    template: "<table class=\"fd-calendar__table\" role=\"grid\">\n    <thead class=\"fd-calendar__group\">\n    <tr class=\"fd-calendar__row\">\n        <th class=\"fd-calendar__column-header\" *ngFor=\"let day of shortWeekDays\">\n            <span class=\"fd-calendar__day-of-week\">{{day}}</span>\n        </th>\n    </tr>\n    </thead>\n    <tbody class=\"fd-calendar__group\">\n        <tr class=\"fd-calendar__row\"\n            *ngFor=\"let row of dayViewGrid; let rowIndex = index;\">\n\n            <td class=\"fd-calendar__item\"\n                role=\"gridcell\"\n                [attr.aria-label]=\"cell.ariaLabel\"\n                *ngFor=\"let cell of row; let cellIndex = index;\"\n                [ngClass]=\"{\n                    'fd-calendar__item--other-month': cell.monthStatus !== 'current',\n                    'is-selected': cell.selected,\n                    'is-selected-range-last': cell.selectedLast && !cell.selectedFirst,\n                    'is-selected-range-first': cell.selectedFirst,\n                    'is-selected-range': cell.selectedRange && !cell.selectedFirst && !cell.selectedLast,\n                    'fd-calendar__item--current': cell.today,\n                    'is-disabled': cell.disabled,\n                    'is-blocked': cell.blocked\n                }\"\n                [attr.id]=\"cell.id\"\n                [attr.tabindex]=\"cell.isTabIndexed ? 0 : -1\"\n                (click)=\"selectDate(cell, $event)\"\n                (keydown)=\"onKeydownDayHandler($event, cell, { x: cellIndex, y: rowIndex })\"\n            >\n                <span class=\"fd-calendar__text\" role=\"button\">{{cell.date.day}}</span>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-day-view"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarDayViewComponent.ctorParameters = function () { return [
        { type: CalendarI18n },
        { type: ElementRef }
    ]; };
    CalendarDayViewComponent.propDecorators = {
        fdCalendarDateViewClass: [{ type: HostBinding, args: ['class.fd-calendar__dates',] }],
        currentlyDisplayed: [{ type: Input }],
        selectedDate: [{ type: Input }],
        selectedRangeDate: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        calType: [{ type: Input }],
        id: [{ type: Input }],
        focusEscapeFunction: [{ type: Input }],
        selectedRangeDateChange: [{ type: Output }],
        nextMonthSelect: [{ type: Output }],
        previousMonthSelect: [{ type: Output }],
        selectedDateChange: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }]
    };
    return CalendarDayViewComponent;
}());
export { CalendarDayViewComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.newFocusedDayId;
    /**
     * Actual day grid with previous/current/next month days
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayViewGrid;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.fdCalendarDateViewClass;
    /**
     * Currently displayed month and year for days
     * @type {?}
     */
    CalendarDayViewComponent.prototype.currentlyDisplayed;
    /**
     * The currently selected FdDate model in single mode.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.selectedDate;
    /**
     * The currently selected FdDates model start and end in range mode.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.selectedRangeDate;
    /**
     * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.startingDayOfWeek;
    /**
     * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.calType;
    /**
     * Id of the calendar. If none is provided, one will be generated.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.id;
    /**
     * Function that allows to specify which function would be called, when focus wants to escape
     * @type {?}
     */
    CalendarDayViewComponent.prototype.focusEscapeFunction;
    /**
     * Event emitted always, when model is changed in range mode
     * @type {?}
     */
    CalendarDayViewComponent.prototype.selectedRangeDateChange;
    /**
     * Event emitted always, when next month is selected, by focus
     * @type {?}
     */
    CalendarDayViewComponent.prototype.nextMonthSelect;
    /**
     * Event emitted always, when previous month is selected, by focus
     * @type {?}
     */
    CalendarDayViewComponent.prototype.previousMonthSelect;
    /**
     * Event emitted always, when model is changed in single mode
     * @type {?}
     */
    CalendarDayViewComponent.prototype.selectedDateChange;
    /**
     * Function used to disable certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.disableFunction;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.disableRangeStartFunction;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.disableRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.blockRangeStartFunction;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.blockRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    CalendarDayViewComponent.prototype.blockFunction;
    /**
     * @type {?}
     * @private
     */
    CalendarDayViewComponent.prototype.calendarI18n;
    /**
     * @type {?}
     * @private
     */
    CalendarDayViewComponent.prototype.eRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NhbGVuZGFyL2NhbGVuZGFyLXZpZXdzL2NhbGVuZGFyLWRheS12aWV3L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sRUFDTixpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUk5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFJekQ7SUFzSEksY0FBYztJQUNkLGtDQUNZLFlBQTBCLEVBQzFCLElBQWdCO1FBRGhCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVk7Ozs7UUE3RzVCLG9CQUFlLEdBQVcsRUFBRSxDQUFDOzs7O1FBT3RCLDRCQUF1QixHQUFZLElBQUksQ0FBQzs7OztRQW9CL0MsWUFBTyxHQUFpQixRQUFRLENBQUM7Ozs7UUFXakIsNEJBQXVCLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7Ozs7UUFJckYsb0JBQWUsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUkvRCx3QkFBbUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUluRSx1QkFBa0IsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQzs7Ozs7UUFPdEYsb0JBQWU7Ozs7UUFBRyxVQUFVLE1BQWM7WUFDdEMsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxFQUFDOzs7OztRQU9GLDhCQUF5Qjs7OztR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Q2hlY2tlZCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSW5wdXQsIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJJMThuIH0gZnJvbSAnLi4vLi4vaTE4bi9jYWxlbmRhci1pMThuJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4uLy4uL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IENhbGVuZGFyQ3VycmVudCB9IGZyb20gJy4uLy4uL21vZGVscy9jYWxlbmRhci1jdXJyZW50JztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgRGF5c09mV2VlayB9IGZyb20gJy4uLy4uL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckRheSB9IGZyb20gJy4uLy4uL21vZGVscy9jYWxlbmRhci1kYXknO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgeyBGZFJhbmdlRGF0ZSB9IGZyb20gJy4uLy4uL21vZGVscy9mZC1yYW5nZS1kYXRlJztcblxuLyoqIENvbXBvbmVudCByZXByZXNlbnRpbmcgdGhlIGRheSB2aWV3IG9mIHRoZSBjYWxlbmRhci4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtY2FsZW5kYXItZGF5LXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCArIFwiLWRheS12aWV3XCInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5ld0ZvY3VzZWREYXlJZDogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogQWN0dWFsIGRheSBncmlkIHdpdGggcHJldmlvdXMvY3VycmVudC9uZXh0IG1vbnRoIGRheXMgKi9cbiAgICBwdWJsaWMgZGF5Vmlld0dyaWQ6IENhbGVuZGFyRGF5W11bXTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1jYWxlbmRhcl9fZGF0ZXMnKVxuICAgIHB1YmxpYyBmZENhbGVuZGFyRGF0ZVZpZXdDbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQ3VycmVudGx5IGRpc3BsYXllZCBtb250aCBhbmQgeWVhciBmb3IgZGF5cyAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGN1cnJlbnRseURpc3BsYXllZDogQ2FsZW5kYXJDdXJyZW50O1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRmREYXRlIG1vZGVsIGluIHNpbmdsZSBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlbGVjdGVkRGF0ZTogRmREYXRlO1xuXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRmREYXRlcyBtb2RlbCBzdGFydCBhbmQgZW5kIGluIHJhbmdlIG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VsZWN0ZWRSYW5nZURhdGU6IEZkUmFuZ2VEYXRlO1xuXG4gICAgLyoqIFRoZSBkYXkgb2YgdGhlIHdlZWsgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBvbi4gMSByZXByZXNlbnRzIFN1bmRheSwgMiBpcyBNb25kYXksIDMgaXMgVHVlc2RheSwgYW5kIHNvIG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHN0YXJ0aW5nRGF5T2ZXZWVrOiBEYXlzT2ZXZWVrO1xuXG4gICAgLyoqIFRoZSB0eXBlIG9mIGNhbGVuZGFyLCAnc2luZ2xlJyBmb3Igc2luZ2xlIGRhdGUgc2VsZWN0aW9uIG9yICdyYW5nZScgZm9yIGEgcmFuZ2Ugb2YgZGF0ZXMuICovXG4gICAgQElucHV0KClcbiAgICBjYWxUeXBlOiBDYWxlbmRhclR5cGUgPSAnc2luZ2xlJztcblxuICAgIC8qKiBJZCBvZiB0aGUgY2FsZW5kYXIuIElmIG5vbmUgaXMgcHJvdmlkZWQsIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgYWxsb3dzIHRvIHNwZWNpZnkgd2hpY2ggZnVuY3Rpb24gd291bGQgYmUgY2FsbGVkLCB3aGVuIGZvY3VzIHdhbnRzIHRvIGVzY2FwZSAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNFc2NhcGVGdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCBhbHdheXMsIHdoZW4gbW9kZWwgaXMgY2hhbmdlZCBpbiByYW5nZSBtb2RlICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkUmFuZ2VEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmRSYW5nZURhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZFJhbmdlRGF0ZT4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGFsd2F5cywgd2hlbiBuZXh0IG1vbnRoIGlzIHNlbGVjdGVkLCBieSBmb2N1cyAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBuZXh0TW9udGhTZWxlY3Q6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIGFsd2F5cywgd2hlbiBwcmV2aW91cyBtb250aCBpcyBzZWxlY3RlZCwgYnkgZm9jdXMgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgcHJldmlvdXNNb250aFNlbGVjdDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgYWx3YXlzLCB3aGVuIG1vZGVsIGlzIGNoYW5nZWQgaW4gc2luZ2xlIG1vZGUgKi9cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2VsZWN0ZWREYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmREYXRlPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmREYXRlPigpO1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBkaXNhYmxlIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlRnVuY3Rpb24gPSBmdW5jdGlvbiAoZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVSYW5nZVN0YXJ0RnVuY3Rpb24gPSBmdW5jdGlvbiAoZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBlbmQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlUmFuZ2VFbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VTdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24gKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBibG9jayBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIGVuZCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VFbmRGdW5jdGlvbiA9IGZ1bmN0aW9uIChmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gYmxvY2sgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIuXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrRnVuY3Rpb24gPSBmdW5jdGlvbiAoZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNhbGVuZGFySTE4bjogQ2FsZW5kYXJJMThuLFxuICAgICAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBmb3Igc2VsZWN0aW5nIGEgZGF0ZSBvbiB0aGUgY2FsZW5kYXIuIFR5cGljYWxseSBjYWxsZWQgd2hlbiBhIGRhdGUgaXMgY2xpY2tlZCwgYnV0IGNhbiBhbHNvIGJlIGNhbGxlZCBwcm9ncmFtbWF0aWNhbGx5LlxuICAgICAqIEBwYXJhbSBkYXkgQ2FsZW5kYXJEYXkgb2JqZWN0IHRvIGJlIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIHNlbGVjdERhdGUoZGF5OiBDYWxlbmRhckRheSwgZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGVyZSBhcmUgc29tZSBwcm9ibGVtcyB3aXRoIHBvcHVwIGludGVncmF0aW9uLiBBZnRlciBjbGlja2luZyBpbnNpZGUgZGF5IGNvbXBvbmVudCwgdGhlIHBvcG92ZXIgY2xvc2VzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWREYXlJZCA9IGRheS5pZDtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMubmV3Rm9jdXNlZERheUlkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRheS5ibG9ja2VkICYmICFkYXkuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbFR5cGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXkuZGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KGRheS5kYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF5Vmlld0dyaWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0Q291bnRlciA9PT0gMCB8fCB0aGlzLnNlbGVjdENvdW50ZXIgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSA9IHsgc3RhcnQ6IGRheS5kYXRlLCBlbmQ6IG51bGwgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRGF5Vmlld0dyaWQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0Q291bnRlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBkYXRlIHBpY2tlZCBpcyBoaWdoZXIgdGhhbiBhbHJlYWR5IGNob3Nlbiwgb3RoZXJ3aXNlIGp1c3QgZmlyc3Qgb25lXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LmdldFRpbWVTdGFtcCgpIDwgZGF5LmRhdGUuZ2V0VGltZVN0YW1wKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUgPSB7IHN0YXJ0OiB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLnN0YXJ0LCBlbmQ6IGRheS5kYXRlIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlID0geyBzdGFydDogZGF5LmRhdGUsIGVuZDogbnVsbCB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWlsZERheVZpZXdHcmlkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1aWxkRGF5Vmlld0dyaWQoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqICBBbW91bnQgb2Ygc2VsZWN0ZWQgZGF5c1xuICAgICAqICAwLCB3aGVuIG5vbmUsXG4gICAgICogIDEsIHdoZW4gb25seSBzdGFydERhdGUsIG9yIGVuZERhdGUgc2FtZSBhcyBzdGFydERhdGUsXG4gICAgICogIDIsIHdoZW4gYm90aFxuICAgICAqL1xuICAgIGdldCBzZWxlY3RDb3VudGVyKCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSB8fCAhdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCAmJlxuICAgICAgICAgICAgKCF0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCB8fFxuICAgICAgICAgICAgICAgIENhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQsIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kKVxuICAgICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQgJiYgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGhhbmRsZXMgZGF5IGNlbGxzIGtleWRvd24gZXZlbnRzLFxuICAgICAqIEBwYXJhbSBldmVudCBLZXlib2FyZEV2ZW50XG4gICAgICogQHBhcmFtIGNlbGwgQ2FsZW5kYXJEYXlcbiAgICAgKiBAcGFyYW0gZ3JpZCB3aXRoIHNwZWNpZmllZCBjb2x1bW4gYW5kIHJvdyBhcyBhIHggYW5kIHlcbiAgICAgKi9cbiAgICBvbktleWRvd25EYXlIYW5kbGVyKGV2ZW50LCBjZWxsOiBDYWxlbmRhckRheSwgZ3JpZDogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5jb2RlID09PSAnVGFiJyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzRXNjYXBlRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNFc2NhcGVGdW5jdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAoJ1NwYWNlJyk6XG4gICAgICAgICAgICAgICAgY2FzZSAoJ0VudGVyJyk6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWREYXlJZCA9IGNlbGwuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICgnQXJyb3dVcCcpOiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkLnkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWREYXlJZCA9IHRoaXMuZGF5Vmlld0dyaWRbZ3JpZC55IC0gMV1bZ3JpZC54XS5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXNNb250aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdGb2N1c2VkRGF5SWQgPSB0aGlzLmRheVZpZXdHcmlkW3RoaXMuZGF5Vmlld0dyaWQubGVuZ3RoIC0gMV1bZ3JpZC54XS5pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAoJ0Fycm93RG93bicpOiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkLnkgPCB0aGlzLmRheVZpZXdHcmlkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gdGhpcy5kYXlWaWV3R3JpZFtncmlkLnkgKyAxXVtncmlkLnhdLmlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0TW9udGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gdGhpcy5kYXlWaWV3R3JpZFswXVtncmlkLnhdLmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICgnQXJyb3dMZWZ0Jyk6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQueCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gdGhpcy5kYXlWaWV3R3JpZFtncmlkLnldW2dyaWQueCAtIDFdLmlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdyaWQueSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gdGhpcy5kYXlWaWV3R3JpZFtncmlkLnkgLSAxXVt0aGlzLmRheVZpZXdHcmlkWzBdLmxlbmd0aCAtIDFdLmlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQcmV2aW91c01vbnRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWREYXlJZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXlWaWV3R3JpZFt0aGlzLmRheVZpZXdHcmlkLmxlbmd0aCAtIDFdW3RoaXMuZGF5Vmlld0dyaWRbMF0ubGVuZ3RoIC0gMV0uaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgKCdBcnJvd1JpZ2h0Jyk6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQueCA8IHRoaXMuZGF5Vmlld0dyaWRbMF0ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdGb2N1c2VkRGF5SWQgPSB0aGlzLmRheVZpZXdHcmlkW2dyaWQueV1bZ3JpZC54ICsgMV0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ3JpZC55IDwgdGhpcy5kYXlWaWV3R3JpZC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWREYXlJZCA9IHRoaXMuZGF5Vmlld0dyaWRbZ3JpZC55ICsgMV1bMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdE5leHRNb250aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXdGb2N1c2VkRGF5SWQgPSB0aGlzLmRheVZpZXdHcmlkWzBdWzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5ld0ZvY3VzZWREYXlJZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0VsZW1lbnQodGhpcy5uZXdGb2N1c2VkRGF5SWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnVpbGREYXlWaWV3R3JpZCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5uZXdGb2N1c2VkRGF5SWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMubmV3Rm9jdXNlZERheUlkKTtcbiAgICAgICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogIE1ldGhvZCB0aGF0IGFsbG93IHRvIGZvY3VzIGVsZW1lbnRzIGluc2lkZSB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1c0VsZW1lbnQoZWxlbWVudFNlbGVjdG9yKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID0gdGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgICAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQWN0aXZlIGRheSBtZWFucyB0aGF0IHdpdGggdGFiaW5kZXggPSAwLCBpdCdzIHNlbGVjdGVkIGRheSBvciB0b2RheSBvciBmaXJzdCBkYXkgKi9cbiAgICBwdWJsaWMgZm9jdXNBY3RpdmVEYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmV3Rm9jdXNlZERheUlkID0gdGhpcy5nZXRBY3RpdmVDZWxsKFxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckRheUxpc3QuZmlsdGVyKGNlbGwgPT4gY2VsbC5tb250aFN0YXR1cyA9PT0gJ2N1cnJlbnQnKVxuICAgICAgICApLmlkO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGdpdmVzIGFycmF5IG9mIGFsbCBkaXNwbGF5ZWQgQ2FsZW5kYXJEYXlzICovXG4gICAgcHVibGljIGdldCBjYWxlbmRhckRheUxpc3QoKTogQ2FsZW5kYXJEYXlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRheVZpZXdHcmlkLnJlZHVjZSgodG90YWxDYWxlbmRhclJvd3M6IENhbGVuZGFyRGF5W10sIGNhbGVuZGFyUm93OiBDYWxlbmRhckRheVtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhbGVuZGFyUm93KSB7XG4gICAgICAgICAgICAgICAgY2FsZW5kYXJSb3cgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b3RhbENhbGVuZGFyUm93cy5jb25jYXQoY2FsZW5kYXJSb3cpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBzZWxlY3RzIHByZXZpb3VzIG1vbnRoXG4gICAgICogVHJpZ2dlcmVkIG9ubHkgd2hlbiB0aGUgbW9udGggaXMgY2hhbmdlZCBkdXJpbmcgY2hhbmdpbmcgZm9jdXNcbiAgICAgKiBBbHNvIHRyaWdnZXJzIGV2ZW50IHRvIHBhcmVudCBjYWxlbmRhciBjb21wb25lbnQgYW5kIHJlYnVpbGRzIGRheSB2aWV3IGdyaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbGVjdFByZXZpb3VzTW9udGgoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRseURpc3BsYXllZC5tb250aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyAuLi50aGlzLmN1cnJlbnRseURpc3BsYXllZCwgbW9udGg6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoIC0gMSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQgPSB7IHllYXI6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgLSAxLCBtb250aDogMTIgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkRGF5Vmlld0dyaWQoKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c01vbnRoU2VsZWN0LmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBzZWxlY3RzIG5leHQgbW9udGhcbiAgICAgKiBUcmlnZ2VyZWQgb25seSB3aGVuIHRoZSBtb250aCBpcyBjaGFuZ2VkIGR1cmluZyBjaGFuZ2luZyBmb2N1c1xuICAgICAqIEFsc28gdHJpZ2dlcnMgZXZlbnQgdG8gcGFyZW50IGNhbGVuZGFyIGNvbXBvbmVudCBhbmQgcmVidWlsZHMgZGF5IHZpZXcgZ3JpZFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0TmV4dE1vbnRoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgLi4udGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQsIG1vbnRoOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC5tb250aCArIDEgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyB5ZWFyOiB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyICsgMSwgbW9udGg6IDEgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkRGF5Vmlld0dyaWQoKTtcbiAgICAgICAgdGhpcy5uZXh0TW9udGhTZWxlY3QuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGNyZWF0ZXMgYXJyYXkgb2YgQ2FsZW5kYXJEYXkgbW9kZWxzIHdoaWNoIHdpbGwgYmUgc2hvd24gb24gZGF5IGdyaWQsXG4gICAgICogZGVwZW5kaW5nIG9uIGN1cnJlbnQgbW9udGggYW5kIHllYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZUNhbGVuZGFyKCk6IENhbGVuZGFyRGF5W10ge1xuICAgICAgICBsZXQgY2FsZW5kYXI6IENhbGVuZGFyRGF5W10gPSBbXTtcblxuICAgICAgICBjYWxlbmRhciA9IHRoaXMuZ2V0UHJldmlvdXNNb250aERheXMoY2FsZW5kYXIpO1xuICAgICAgICBjYWxlbmRhciA9IGNhbGVuZGFyLmNvbmNhdCh0aGlzLmdldEN1cnJlbnRNb250aERheXMoKSk7XG4gICAgICAgIGNhbGVuZGFyID0gdGhpcy5nZXROZXh0TW9udGhEYXlzKGNhbGVuZGFyKTtcblxuICAgICAgICBjYWxlbmRhci5mb3JFYWNoKChjYWxsLCBpbmRleDogbnVtYmVyKSA9PiBjYWxsLmlkID0gdGhpcy5pZCArICctZmQtZGF5LScgKyAoTWF0aC5mbG9vcihpbmRleCAvIDcpICsgMSkgKyAnJyArIChpbmRleCAlIDcpKTtcblxuICAgICAgICByZXR1cm4gY2FsZW5kYXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRoYXQgYnVpbGRzIDIgZGltZW5zaW9ucyBkYXkgdmlldyBncmlkLCBhbHNvIHNldHMgdXAgY3VycmVudGx5IGRpc3BsYXllZCBtb250aCwgb3IgeWVhcixcbiAgICAgKiB3aGVuIHRoZXJlIGlzIG5vdCBhbnkuXG4gICAgICovXG4gICAgcHJpdmF0ZSBidWlsZERheVZpZXdHcmlkKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudGx5RGlzcGxheWVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRseURpc3BsYXllZCA9IHsgbW9udGg6IHRoaXMuc2VsZWN0ZWREYXRlLm1vbnRoLCB5ZWFyOiB0aGlzLnNlbGVjdGVkRGF0ZS55ZWFyIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RGlzcGxheWVkID0geyBtb250aDogRmREYXRlLmdldFRvZGF5KCkubW9udGgsIHllYXI6IEZkRGF0ZS5nZXRUb2RheSgpLnllYXIgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhbGVuZGFyRGF5cyA9IHRoaXMucG9wdWxhdGVDYWxlbmRhcigpO1xuICAgICAgICBjb25zdCBkYXlWaWV3R3JpZDogQ2FsZW5kYXJEYXlbXVtdID0gW107XG5cbiAgICAgICAgd2hpbGUgKGNhbGVuZGFyRGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkYXlWaWV3R3JpZC5wdXNoKGNhbGVuZGFyRGF5cy5zcGxpY2UoMCwgNykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF5Vmlld0dyaWQgPSBkYXlWaWV3R3JpZDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB3aGljaCBwcm92aWRlcyBhcnJheSBvZiBDYWxlbmRhckRheSwgd2hpY2ggY29udGFpbnMgZXZlcnkgc2luZ2xlIGRheSBvZiBjdXJyZW50bHkgc2hvd24gbW9udGgveWVhci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEN1cnJlbnRNb250aERheXMoKTogQ2FsZW5kYXJEYXlbXSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGg7XG4gICAgICAgIGNvbnN0IHllYXIgPSB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyO1xuICAgICAgICBjb25zdCBjYWxlbmRhckRheXM6IENhbGVuZGFyRGF5W10gPSBbXTtcbiAgICAgICAgY29uc3QgYW1vdW50T2ZEYXlzSW5DdXJyZW50TW9udGg6IG51bWJlciA9IENhbGVuZGFyU2VydmljZS5nZXREYXlzSW5Nb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGZvciAobGV0IGRheU51bWJlciA9IDE7IGRheU51bWJlciA8PSBhbW91bnRPZkRheXNJbkN1cnJlbnRNb250aDsgZGF5TnVtYmVyKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGZkRGF0ZTogRmREYXRlID0gbmV3IEZkRGF0ZSh5ZWFyLCBtb250aCwgZGF5TnVtYmVyKTtcbiAgICAgICAgICAgIGNhbGVuZGFyRGF5cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmdldERheShmZERhdGUpLFxuICAgICAgICAgICAgICAgIG1vbnRoU3RhdHVzOiAnY3VycmVudCcsXG4gICAgICAgICAgICAgICAgdG9kYXk6IENhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKEZkRGF0ZS5nZXRUb2RheSgpLCBmZERhdGUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldEFjdGl2ZUNlbGwoY2FsZW5kYXJEYXlzKS5pc1RhYkluZGV4ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gY2FsZW5kYXJEYXlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IHJldHVybnMgYWN0aXZlIGNlbGwsIHdoaWNoIG1lYW5zOlxuICAgICAqIGlmIHRoZXJlIGlzIGFueSBzZWxlY3RlZCBkYXksIHJldHVybiBzZWxlY3RlZCBkYXlcbiAgICAgKiBpZiB0aGVyZSBpcyBubyBzZWxlY3RlZCBkYXksIGJ1dCB0aGVyZSBpcyB0b2RheSBkYXksIHJldHVybiB0b2RheSBkYXlcbiAgICAgKiBpZiB0aGVyZSBpcyBubyB0b2RheSwgb3Igc2VsZWN0ZWQsIHJldHVybiBmaXJzdCBvbmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFjdGl2ZUNlbGwoY2FsZW5kYXJEYXlzOiBDYWxlbmRhckRheVtdKTogQ2FsZW5kYXJEYXkge1xuICAgICAgICBpZiAoY2FsZW5kYXJEYXlzLmZpbmQoY2VsbCA9PiBjZWxsLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGVuZGFyRGF5cy5maW5kKGNlbGwgPT4gY2VsbC5zZWxlY3RlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FsZW5kYXJEYXlzLmZpbmQoY2VsbCA9PiBjZWxsLnRvZGF5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGVuZGFyRGF5cy5maW5kKGNlbGwgPT4gY2VsbC50b2RheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsZW5kYXJEYXlzWzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHdoaWNoIHByb3ZpZGVzIGFycmF5IG9mIENhbGVuZGFyRGF5LCB3aGljaCBjb250YWlucyBsYXN0IDAtNiBkYXlzIG9mIHByZXZpb3VzIG1vbnRoL3llYXIuIFRoZXNlcyBkYXlzXG4gICAgICogZmlsbHMgdGhlIGdhcCBiZXR3ZWVuIHN0YXJ0aW5nIHN0YXJ0aW5nRGF5T2ZXZWVrIGFuZCBmaXJzdCBkYXkgb2YgY3VycmVudCBtb250aFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0UHJldmlvdXNNb250aERheXMoY2FsZW5kYXJEYXlzOiBDYWxlbmRhckRheVtdKTogQ2FsZW5kYXJEYXlbXSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggPiAxID8gdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggLSAxIDogMTI7XG4gICAgICAgIGNvbnN0IHllYXIgPSB0aGlzLmN1cnJlbnRseURpc3BsYXllZC5tb250aCA+IDEgPyB0aGlzLmN1cnJlbnRseURpc3BsYXllZC55ZWFyIDogdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciAtIDE7XG4gICAgICAgIGNvbnN0IGFtb3VudE9mRGF5c0luQ3VycmVudE1vbnRoOiBudW1iZXIgPSBDYWxlbmRhclNlcnZpY2UuZ2V0RGF5c0luTW9udGgobW9udGgsIHllYXIpO1xuICAgICAgICBjb25zdCBwcmV2TW9udGhMYXN0RGF0ZSA9IG5ldyBGZERhdGUoeWVhciwgbW9udGgsIGFtb3VudE9mRGF5c0luQ3VycmVudE1vbnRoKTtcbiAgICAgICAgY29uc3QgcHJldk1vbnRoTGFzdERheSA9IGFtb3VudE9mRGF5c0luQ3VycmVudE1vbnRoO1xuICAgICAgICBsZXQgcHJldk1vbnRoTGFzdFdlZWtEYXkgPSBwcmV2TW9udGhMYXN0RGF0ZS5nZXREYXkoKSAtIHRoaXMuc3RhcnRpbmdEYXlPZldlZWs7XG5cbiAgICAgICAgLyoqIENoZWNraW5nIGlmIHRoZXJlIGFyZSBzb21lIGRheXMgY3V0IGJ5IHN0YXJ0aW5nRGF5T2ZXZWVrIG9wdGlvblxuICAgICAgICAgKiAgSWYgeWVzLCB0aGVyZSBpcyB3aG9sZSB3ZWVrIGFkZGVkLCB0byBhdm9pZCBoaWRpbmdcbiAgICAgICAgICovXG4gICAgICAgIGlmIChwcmV2TW9udGhMYXN0V2Vla0RheSA8IDApIHtcbiAgICAgICAgICAgIHByZXZNb250aExhc3RXZWVrRGF5ID0gcHJldk1vbnRoTGFzdFdlZWtEYXkgKyA3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZNb250aExhc3RXZWVrRGF5IDwgNikge1xuICAgICAgICAgICAgd2hpbGUgKHByZXZNb250aExhc3RXZWVrRGF5ID49IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2TW9udGhEYXkgPSBwcmV2TW9udGhMYXN0RGF5IC0gcHJldk1vbnRoTGFzdFdlZWtEYXk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmREYXRlID0gbmV3IEZkRGF0ZSh5ZWFyLCBtb250aCwgcHJldk1vbnRoRGF5KTtcbiAgICAgICAgICAgICAgICBjYWxlbmRhckRheXMucHVzaCh7IC4uLnRoaXMuZ2V0RGF5KGZkRGF0ZSksIG1vbnRoU3RhdHVzOiAncHJldmlvdXMnIH0pO1xuICAgICAgICAgICAgICAgIHByZXZNb250aExhc3RXZWVrRGF5LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyRGF5cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Qgd2hpY2ggcHJvdmlkZXMgYXJyYXkgb2YgQ2FsZW5kYXJEYXksIHdoaWNoIGNvbnRhaW5zIGZpcnN0IGRheXMgb2YgbmV4dCBtb250aC95ZWFyLiBUaGVzZXMgZGF5c1xuICAgICAqIGZpbGxzIHRoZSBnYXAgYmV0d2VlbiBsYXN0IGRheSBvZiBjdXJyZW50IGRheSBhbmQgZW5kIG9mIDYtd2Vla3MgY2FsZW5kYXIgZ3JpZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE5leHRNb250aERheXMoY2FsZW5kYXJEYXlzOiBDYWxlbmRhckRheVtdKTogQ2FsZW5kYXJEYXlbXSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggPCAxMiA/IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoICsgMSA6IDE7XG4gICAgICAgIGNvbnN0IHllYXIgPSB0aGlzLmN1cnJlbnRseURpc3BsYXllZC5tb250aCA8IDEyID8gdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQueWVhciA6IHRoaXMuY3VycmVudGx5RGlzcGxheWVkLnllYXIgKyAxO1xuXG4gICAgICAgIC8vIFRoZSBjYWxlbmRhciBncmlkIGNhbiBoYXZlIDYgKDQyIGRheXMpIHdlZWtzXG4gICAgICAgIGNvbnN0IG5leHRNb250aERpc3BsYXllZERheXMgPSA0MiAtIGNhbGVuZGFyRGF5cy5sZW5ndGg7XG5cbiAgICAgICAgZm9yIChsZXQgbmV4dEQgPSAxOyBuZXh0RCA8PSBuZXh0TW9udGhEaXNwbGF5ZWREYXlzOyBuZXh0RCsrKSB7XG4gICAgICAgICAgICBjb25zdCBmZERhdGUgPSBuZXcgRmREYXRlKHllYXIsIG1vbnRoLCBuZXh0RCk7XG4gICAgICAgICAgICBjYWxlbmRhckRheXMucHVzaCh7IC4uLnRoaXMuZ2V0RGF5KGZkRGF0ZSksIG1vbnRoU3RhdHVzOiAnbmV4dCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGVuZGFyRGF5cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCBnZW5lcmF0ZXMgd2hvbGUgZGF5IG1vZGVsIGJhc2luZyBvbiBmZERhdGUsIGRpc2FibGluZyBmdW5jdGlvbnMsIGJsb2NrIGZ1bmN0aW9ucywgYW5kIGFjdHVhbGx5XG4gICAgICogY2hvc2VuIHJhbmdlIC8gc2luZ2xlIGRhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXREYXkoZmREYXRlOiBGZERhdGUpOiBDYWxlbmRhckRheSB7XG4gICAgICAgIGNvbnN0IGRheTogQ2FsZW5kYXJEYXkgPSB7XG4gICAgICAgICAgICBkYXRlOiBmZERhdGUsXG4gICAgICAgICAgICB3ZWVrRGF5OiBmZERhdGUuZ2V0RGF5KCksXG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlRnVuY3Rpb24oZmREYXRlKSxcbiAgICAgICAgICAgIGJsb2NrZWQ6IHRoaXMuYmxvY2tGdW5jdGlvbihmZERhdGUpLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IChcbiAgICAgICAgICAgICAgICAodGhpcy5jYWxUeXBlID09PSAnc2luZ2xlJyAmJiBDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChmZERhdGUsIHRoaXMuc2VsZWN0ZWREYXRlKSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJiBDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChmZERhdGUsIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmIENhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKGZkRGF0ZSwgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNlbGVjdGVkRmlyc3Q6ICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlICYmIENhbGVuZGFyU2VydmljZS5kYXRlc0VxdWFsKGZkRGF0ZSwgdGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5zdGFydCkpLFxuICAgICAgICAgICAgc2VsZWN0ZWRMYXN0OiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJiBDYWxlbmRhclNlcnZpY2UuZGF0ZXNFcXVhbChmZERhdGUsIHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuZW5kKSksXG4gICAgICAgICAgICBzZWxlY3RlZFJhbmdlOiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZSAmJiAoXG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQgJiYgKHRoaXMuc2VsZWN0ZWRSYW5nZURhdGUuc3RhcnQuZ2V0VGltZVN0YW1wKCkgPCBmZERhdGUuZ2V0VGltZVN0YW1wKCkpKSAmJlxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdGVkUmFuZ2VEYXRlLmVuZCAmJiAodGhpcy5zZWxlY3RlZFJhbmdlRGF0ZS5lbmQuZ2V0VGltZVN0YW1wKCkgPiBmZERhdGUuZ2V0VGltZVN0YW1wKCkpKVxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBhcmlhTGFiZWw6IHRoaXMuY2FsZW5kYXJJMThuLmdldERheUFyaWFMYWJlbChmZERhdGUudG9EYXRlKCkpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsVHlwZSA9PT0gJ3JhbmdlJyAmJiAodGhpcy5zZWxlY3RDb3VudGVyID09PSAwIHx8IHRoaXMuc2VsZWN0Q291bnRlciA9PT0gMikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVSYW5nZVN0YXJ0RnVuY3Rpb24gJiYgIWRheS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIGRheS5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZVJhbmdlU3RhcnRGdW5jdGlvbihkYXkuZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ibG9ja1JhbmdlU3RhcnRGdW5jdGlvbiAmJiAhZGF5LmJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBkYXkuYmxvY2tlZCA9IHRoaXMuYmxvY2tSYW5nZVN0YXJ0RnVuY3Rpb24oZGF5LmRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0Q291bnRlciA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZVJhbmdlRW5kRnVuY3Rpb24gJiYgIWRheS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIGRheS5kaXNhYmxlZCA9IHRoaXMuZGlzYWJsZVJhbmdlRW5kRnVuY3Rpb24oZGF5LmRhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5ibG9ja1JhbmdlRW5kRnVuY3Rpb24gJiYgIWRheS5ibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgZGF5LmJsb2NrZWQgPSB0aGlzLmJsb2NrUmFuZ2VFbmRGdW5jdGlvbihkYXkuZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IHJldHVybnMgZmlyc3QgbGV0dGVyIG9mIGV2ZXJ5IHdlZWtkYXksIGJhc2luZyBvbiBDYWxlbmRhckkxOG5EZWZhdWx0LiBDYW4gYmUgY2hhbmdlZCBieSB1c2VyIGJ5XG4gICAgICogcHJvdmlkaW5nIG90aGVyIGNsYXNzIHdoaWNoIGltcGxlbWVudHMgQ2FsZW5kYXJJMThuXG4gICAgICovXG4gICAgZ2V0IHNob3J0V2Vla0RheXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhckkxOG4uZ2V0QWxsU2hvcnRXZWVrZGF5cygpXG4gICAgICAgICAgICAuc2xpY2UodGhpcy5zdGFydGluZ0RheU9mV2VlayAtIDEpXG4gICAgICAgICAgICAuY29uY2F0KHRoaXMuY2FsZW5kYXJJMThuLmdldEFsbFNob3J0V2Vla2RheXMoKS5zbGljZSgwLCB0aGlzLnN0YXJ0aW5nRGF5T2ZXZWVrIC0gMSkpXG4gICAgICAgICAgICAubWFwKHdlZWtkYXkgPT4gd2Vla2RheVswXS50b0xvY2FsZVVwcGVyQ2FzZSgpKTtcbiAgICB9XG59XG4iXX0=