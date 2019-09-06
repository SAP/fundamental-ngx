/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Output, Input, EventEmitter, ElementRef } from '@angular/core';
import { FdDate } from '../../models/fd-date';
import { takeUntil } from 'rxjs/operators';
import { CalendarService } from '../../calendar.service';
import { Subject } from 'rxjs';
/**
 * Component representing the YearView of the Calendar Component.
 */
var CalendarYearViewComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarYearViewComponent(eRef, calendarService) {
        this.eRef = eRef;
        this.calendarService = calendarService;
        /**
         * Parameter storing the year of the present day.
         */
        this.currentYear = FdDate.getToday().year;
        /**
         * Parameter storing first shown year on list
         */
        this.firstYearInList = this.currentYear;
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
        /**
         * Event fired when a year is selected.
         */
        this.yearClicked = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngAfterViewChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.firstYearInList = this.yearSelected;
        this.constructYearList();
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.newFocusedYearId = _this.id + '-fd-year-' + index;
            _this.focusElement(_this.newFocusedYearId);
        }));
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.selectYear(_this.calendarYearList[index]); }));
        this.calendarService.onListStartApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.loadPreviousYearList(); }));
        this.calendarService.onListEndApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.loadNextYearList(); }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    CalendarYearViewComponent.prototype.getActiveYear = /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selectedYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        function (year) { return year === _this.yearSelected; }));
        if (selectedYear) {
            return selectedYear;
        }
        /** @type {?} */
        var currentYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        function (year) { return year === _this.currentYear; }));
        if (currentYear) {
            return currentYear;
        }
        return this.calendarYearList[0];
    };
    /** Method for handling the keyboard navigation. */
    /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    CalendarYearViewComponent.prototype.onKeydownYearHandler = /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.calendarService.onKeydownHandler(event, index);
    };
    /** Method used to load the previous 12 years to be displayed. */
    /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    CalendarYearViewComponent.prototype.loadNextYearList = /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    function () {
        this.firstYearInList += 12;
        this.constructYearList();
    };
    /** Method used to load the next 12 years to be displayed. */
    /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    CalendarYearViewComponent.prototype.loadPreviousYearList = /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    function () {
        this.firstYearInList -= 12;
        this.constructYearList();
    };
    /** Method allowing focusing on elements within this component. */
    /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    CalendarYearViewComponent.prototype.focusElement = /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    function (elementSelector) {
        /** @type {?} */
        var elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    };
    /** Method that sends the year to the parent component when it is clicked. */
    /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    CalendarYearViewComponent.prototype.selectYear = /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    function (selectedYear, event) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    };
    /** @hidden */
    /**
     * @hidden
     * @private
     * @return {?}
     */
    CalendarYearViewComponent.prototype.constructYearList = /**
     * @hidden
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var displayedYearsAmount = 12;
        this.calendarYearList = [];
        for (var x = 0; x < displayedYearsAmount; ++x) {
            this.calendarYearList.push(this.firstYearInList + x);
        }
        this.activeYear = this.getActiveYear();
    };
    CalendarYearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-year-view',
                    template: "<div class=\"fd-calendar__years\">\n    <ul class=\"fd-calendar__list\">\n        <li class=\"fd-calendar__item\"\n            *ngFor=\"let year of calendarYearList; let i = index\"\n            [ngClass]=\"{\n                'is-selected': (year == yearSelected),\n                'fd-calendar__item--current': (year == currentYear)\n            }\"\n            [attr.id]=\"id + '-fd-year-' + i\"\n            [attr.tabindex]=\"year === activeYear ? 0 : -1\"\n            (keydown)=\"onKeydownYearHandler($event, i)\"\n            (click)=\"selectYear(year, $event)\">\n            <span role=\"button\" class=\"fd-calendar__text\">\n                {{ year }}\n            </span>\n        </li>\n    </ul>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-year-view"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarYearViewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CalendarService }
    ]; };
    CalendarYearViewComponent.propDecorators = {
        id: [{ type: Input }],
        focusEscapeFunction: [{ type: Input }],
        yearSelected: [{ type: Input }],
        yearClicked: [{ type: Output }]
    };
    return CalendarYearViewComponent;
}());
export { CalendarYearViewComponent };
if (false) {
    /**
     * @hidden
     *  This variable is used to define which year from calendarYearList should be focusable by tab key
     * @type {?}
     */
    CalendarYearViewComponent.prototype.activeYear;
    /**
     * Parameter that stores the dozen of years that are currently being displayed.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.calendarYearList;
    /**
     * Parameter storing the year of the present day.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.currentYear;
    /**
     * Parameter storing first shown year on list
     * @type {?}
     */
    CalendarYearViewComponent.prototype.firstYearInList;
    /**
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     * @type {?}
     * @private
     */
    CalendarYearViewComponent.prototype.onDestroy$;
    /**
     * @hidden
     * @type {?}
     * @private
     */
    CalendarYearViewComponent.prototype.newFocusedYearId;
    /**
     * Parameter used in id of years used for help with focusing on the correct element during keyboard navigation.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.id;
    /**
     * Function that is called when the focus would escape the element.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.focusEscapeFunction;
    /**
     * Parameter holding the year that is currently selected.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.yearSelected;
    /**
     * Event fired when a year is selected.
     * @type {?}
     */
    CalendarYearViewComponent.prototype.yearClicked;
    /**
     * @type {?}
     * @private
     */
    CalendarYearViewComponent.prototype.eRef;
    /**
     * @type {?}
     * @private
     */
    CalendarYearViewComponent.prototype.calendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci12aWV3cy9jYWxlbmRhci15ZWFyLXZpZXcvY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQzNJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFHL0I7SUErQ0ksY0FBYztJQUNkLG1DQUFvQixJQUFnQixFQUFVLGVBQWdDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7UUE1QjlFLGdCQUFXLEdBQVcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7OztRQUc3QyxvQkFBZSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7UUFHMUIsZUFBVSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBbUJ4RCxnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXhFLENBQUM7SUFFRCxjQUFjOzs7OztJQUNkLHNEQUFrQjs7OztJQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDekMsSUFB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RUFBRSxDQUFDO0lBQzNDLENBQUM7O2dCQTdKSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsMnRCQUFrRDtvQkFFbEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDRixXQUFXLEVBQUUsbUJBQW1CO3FCQUNuQzs7aUJBQ0o7Ozs7Z0JBZjJFLFVBQVU7Z0JBRzdFLGVBQWU7OztxQkFvQ25CLEtBQUs7c0NBSUwsS0FBSzsrQkFJTCxLQUFLOzhCQUlMLE1BQU07O0lBa0hYLGdDQUFDO0NBQUEsQUE5SkQsSUE4SkM7U0FySlkseUJBQXlCOzs7Ozs7O0lBS2xDLCtDQUFtQjs7Ozs7SUFHbkIscURBQTJCOzs7OztJQUczQixnREFBNkM7Ozs7O0lBRzdDLG9EQUEyQzs7Ozs7O0lBRzNDLCtDQUFpRTs7Ozs7O0lBR2pFLHFEQUFpQzs7Ozs7SUFHakMsdUNBQ1c7Ozs7O0lBR1gsd0RBQzhCOzs7OztJQUc5QixpREFDcUI7Ozs7O0lBR3JCLGdEQUN3RTs7Ozs7SUFHNUQseUNBQXdCOzs7OztJQUFFLG9EQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4uLy4uL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4uLy4uL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vKiogQ29tcG9uZW50IHJlcHJlc2VudGluZyB0aGUgWWVhclZpZXcgb2YgdGhlIENhbGVuZGFyIENvbXBvbmVudC4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtY2FsZW5kYXIteWVhci12aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCArIFwiLXllYXItdmlld1wiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJZZWFyVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogIFRoaXMgdmFyaWFibGUgaXMgdXNlZCB0byBkZWZpbmUgd2hpY2ggeWVhciBmcm9tIGNhbGVuZGFyWWVhckxpc3Qgc2hvdWxkIGJlIGZvY3VzYWJsZSBieSB0YWIga2V5XG4gICAgICovXG4gICAgYWN0aXZlWWVhcjogbnVtYmVyO1xuXG4gICAgLyoqIFBhcmFtZXRlciB0aGF0IHN0b3JlcyB0aGUgZG96ZW4gb2YgeWVhcnMgdGhhdCBhcmUgY3VycmVudGx5IGJlaW5nIGRpc3BsYXllZC4gKi9cbiAgICBjYWxlbmRhclllYXJMaXN0OiBudW1iZXJbXTtcblxuICAgIC8qKiBQYXJhbWV0ZXIgc3RvcmluZyB0aGUgeWVhciBvZiB0aGUgcHJlc2VudCBkYXkuICovXG4gICAgY3VycmVudFllYXI6IG51bWJlciA9IEZkRGF0ZS5nZXRUb2RheSgpLnllYXI7XG5cbiAgICAvKiogUGFyYW1ldGVyIHN0b3JpbmcgZmlyc3Qgc2hvd24geWVhciBvbiBsaXN0ICovXG4gICAgZmlyc3RZZWFySW5MaXN0OiBudW1iZXIgPSB0aGlzLmN1cnJlbnRZZWFyO1xuXG4gICAgLyoqIEFuIFJ4SlMgU3ViamVjdCB0aGF0IHdpbGwga2lsbCB0aGUgZGF0YSBzdHJlYW0gdXBvbiBjb21wb25lbnTigJlzIGRlc3RydWN0aW9uIChmb3IgdW5zdWJzY3JpYmluZykgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHJpdmF0ZSBuZXdGb2N1c2VkWWVhcklkOiBzdHJpbmc7XG5cbiAgICAvKiogUGFyYW1ldGVyIHVzZWQgaW4gaWQgb2YgeWVhcnMgdXNlZCBmb3IgaGVscCB3aXRoIGZvY3VzaW5nIG9uIHRoZSBjb3JyZWN0IGVsZW1lbnQgZHVyaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uICovXG4gICAgQElucHV0KClcbiAgICBpZDogc3RyaW5nO1xuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGZvY3VzIHdvdWxkIGVzY2FwZSB0aGUgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGZvY3VzRXNjYXBlRnVuY3Rpb246IEZ1bmN0aW9uO1xuXG4gICAgLyoqIFBhcmFtZXRlciBob2xkaW5nIHRoZSB5ZWFyIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgeWVhclNlbGVjdGVkOiBudW1iZXI7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiBhIHllYXIgaXMgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgeWVhckNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZVJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5uZXdGb2N1c2VkWWVhcklkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzRWxlbWVudCh0aGlzLm5ld0ZvY3VzZWRZZWFySWQpO1xuICAgICAgICAgICAgdGhpcy5uZXdGb2N1c2VkWWVhcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlyc3RZZWFySW5MaXN0ID0gdGhpcy55ZWFyU2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuY29uc3RydWN0WWVhckxpc3QoKTtcblxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5vbkZvY3VzSWRDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdGb2N1c2VkWWVhcklkID0gdGhpcy5pZCArICctZmQteWVhci0nICsgaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0VsZW1lbnQodGhpcy5uZXdGb2N1c2VkWWVhcklkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIDtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UuZm9jdXNFc2NhcGVGdW5jdGlvbiA9IHRoaXMuZm9jdXNFc2NhcGVGdW5jdGlvbjtcblxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5vbktleVNlbGVjdFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGluZGV4ID0+IHRoaXMuc2VsZWN0WWVhcih0aGlzLmNhbGVuZGFyWWVhckxpc3RbaW5kZXhdKSlcbiAgICAgICAgO1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLm9uTGlzdFN0YXJ0QXBwcm9hY2hcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmxvYWRQcmV2aW91c1llYXJMaXN0KCkpXG4gICAgICAgIDtcblxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5vbkxpc3RFbmRBcHByb2FjaFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubG9hZE5leHRZZWFyTGlzdCgpKVxuICAgICAgICA7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRoYXQgcmV0dXJucyBhY3RpdmUgY2VsbCwgd2hpY2ggbWVhbnM6XG4gICAgICogaWYgdGhlcmUgaXMgYW55IHNlbGVjdGVkIHllYXIsIHJldHVybiBzZWxlY3RlZCB5ZWFyXG4gICAgICogaWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgeWVhciwgYnV0IHRoZXJlIGlzIGN1cnJlbnQgeWVhciwgcmV0dXJuIGN1cnJlbnQgeWVhclxuICAgICAqIGlmIHRoZXJlIGlzIG5vIGN1cnJlbnQgeWVhciwgb3Igc2VsZWN0ZWQsIHJldHVybiBmaXJzdCBvbmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEFjdGl2ZVllYXIoKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRZZWFyOiBudW1iZXIgPSB0aGlzLmNhbGVuZGFyWWVhckxpc3QuZmluZCh5ZWFyID0+IHllYXIgPT09IHRoaXMueWVhclNlbGVjdGVkKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkWWVhcikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkWWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyOiBudW1iZXIgPSB0aGlzLmNhbGVuZGFyWWVhckxpc3QuZmluZCh5ZWFyID0+IHllYXIgPT09IHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICBpZiAoY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50WWVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyWWVhckxpc3RbMF07XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCBmb3IgaGFuZGxpbmcgdGhlIGtleWJvYXJkIG5hdmlnYXRpb24uICovXG4gICAgb25LZXlkb3duWWVhckhhbmRsZXIoZXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uub25LZXlkb3duSGFuZGxlcihldmVudCwgaW5kZXgpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdXNlZCB0byBsb2FkIHRoZSBwcmV2aW91cyAxMiB5ZWFycyB0byBiZSBkaXNwbGF5ZWQuICovXG4gICAgbG9hZE5leHRZZWFyTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXJzdFllYXJJbkxpc3QgKz0gMTI7XG4gICAgICAgIHRoaXMuY29uc3RydWN0WWVhckxpc3QoKTtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHVzZWQgdG8gbG9hZCB0aGUgbmV4dCAxMiB5ZWFycyB0byBiZSBkaXNwbGF5ZWQuICovXG4gICAgbG9hZFByZXZpb3VzWWVhckxpc3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlyc3RZZWFySW5MaXN0IC09IDEyO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdFllYXJMaXN0KCk7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCBhbGxvd2luZyBmb2N1c2luZyBvbiBlbGVtZW50cyB3aXRoaW4gdGhpcyBjb21wb25lbnQuICovXG4gICAgZm9jdXNFbGVtZW50KGVsZW1lbnRTZWxlY3Rvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzOiBIVE1MRWxlbWVudCA9IHRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgICAgaWYgKGVsZW1lbnRUb0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLmVSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGVsZW1lbnRTZWxlY3RvcikuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBzZW5kcyB0aGUgeWVhciB0byB0aGUgcGFyZW50IGNvbXBvbmVudCB3aGVuIGl0IGlzIGNsaWNrZWQuICovXG4gICAgc2VsZWN0WWVhcihzZWxlY3RlZFllYXI6IG51bWJlciwgZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQgPSBzZWxlY3RlZFllYXI7XG4gICAgICAgIHRoaXMueWVhckNsaWNrZWQuZW1pdCh0aGlzLnllYXJTZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIGNvbnN0cnVjdFllYXJMaXN0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkaXNwbGF5ZWRZZWFyc0Ftb3VudDogbnVtYmVyID0gMTI7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJZZWFyTGlzdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGRpc3BsYXllZFllYXJzQW1vdW50OyArK3gpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJZZWFyTGlzdC5wdXNoKHRoaXMuZmlyc3RZZWFySW5MaXN0ICsgeCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmVZZWFyID0gdGhpcy5nZXRBY3RpdmVZZWFyKCk7XG4gICAgfVxufVxuIl19