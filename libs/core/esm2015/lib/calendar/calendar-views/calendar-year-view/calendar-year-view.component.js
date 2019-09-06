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
export class CalendarYearViewComponent {
    /**
     * @hidden
     * @param {?} eRef
     * @param {?} calendarService
     */
    constructor(eRef, calendarService) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.firstYearInList = this.yearSelected;
        this.constructYearList();
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.newFocusedYearId = this.id + '-fd-year-' + index;
            this.focusElement(this.newFocusedYearId);
        }));
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.selectYear(this.calendarYearList[index])));
        this.calendarService.onListStartApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.loadPreviousYearList()));
        this.calendarService.onListEndApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.loadNextYearList()));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    getActiveYear() {
        /** @type {?} */
        const selectedYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        year => year === this.yearSelected));
        if (selectedYear) {
            return selectedYear;
        }
        /** @type {?} */
        const currentYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        year => year === this.currentYear));
        if (currentYear) {
            return currentYear;
        }
        return this.calendarYearList[0];
    }
    /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onKeydownYearHandler(event, index) {
        this.calendarService.onKeydownHandler(event, index);
    }
    /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    loadNextYearList() {
        this.firstYearInList += 12;
        this.constructYearList();
    }
    /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    loadPreviousYearList() {
        this.firstYearInList -= 12;
        this.constructYearList();
    }
    /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    focusElement(elementSelector) {
        /** @type {?} */
        const elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    }
    /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    selectYear(selectedYear, event) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
    /**
     * @hidden
     * @private
     * @return {?}
     */
    constructYearList() {
        /** @type {?} */
        const displayedYearsAmount = 12;
        this.calendarYearList = [];
        for (let x = 0; x < displayedYearsAmount; ++x) {
            this.calendarYearList.push(this.firstYearInList + x);
        }
        this.activeYear = this.getActiveYear();
    }
}
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
CalendarYearViewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: CalendarService }
];
CalendarYearViewComponent.propDecorators = {
    id: [{ type: Input }],
    focusEscapeFunction: [{ type: Input }],
    yearSelected: [{ type: Input }],
    yearClicked: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci12aWV3cy9jYWxlbmRhci15ZWFyLXZpZXcvY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQzNJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFZL0IsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7O0lBdUNsQyxZQUFvQixJQUFnQixFQUFVLGVBQWdDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7Ozs7UUE1QjlFLGdCQUFXLEdBQVcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQzs7OztRQUc3QyxvQkFBZSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7UUFHMUIsZUFBVSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBbUJ4RCxnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO0lBSXhFLENBQUM7Ozs7O0lBR0Qsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZTthQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsQ0FBQyxFQUFDLENBQ0w7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUVwRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7YUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUNyRTtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CO2FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFDLENBQ2hEO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUI7YUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsQ0FDNUM7SUFDTCxDQUFDOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7O0lBUU8sYUFBYTs7Y0FDWCxZQUFZLEdBQVcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUk7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFDO1FBQzNGLElBQUksWUFBWSxFQUFFO1lBQ2QsT0FBTyxZQUFZLENBQUM7U0FDdkI7O2NBRUssV0FBVyxHQUFXLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBQztRQUN6RixJQUFJLFdBQVcsRUFBRTtZQUNiLE9BQU8sV0FBVyxDQUFDO1NBQ3RCO1FBRUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7OztJQUdELG9CQUFvQixDQUFDLEtBQUssRUFBRSxLQUFhO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBR0QsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFHRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBR0QsWUFBWSxDQUFDLGVBQXVCOztjQUMxQixjQUFjLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDO1FBQ2hHLElBQUksY0FBYyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEU7SUFDTCxDQUFDOzs7Ozs7O0lBR0QsVUFBVSxDQUFDLFlBQW9CLEVBQUUsS0FBa0I7UUFDL0MsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBR08saUJBQWlCOztjQUNmLG9CQUFvQixHQUFXLEVBQUU7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7O1lBN0pKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQywydEJBQWtEO2dCQUVsRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFO29CQUNGLFdBQVcsRUFBRSxtQkFBbUI7aUJBQ25DOzthQUNKOzs7O1lBZjJFLFVBQVU7WUFHN0UsZUFBZTs7O2lCQW9DbkIsS0FBSztrQ0FJTCxLQUFLOzJCQUlMLEtBQUs7MEJBSUwsTUFBTTs7Ozs7Ozs7SUE5QlAsK0NBQW1COzs7OztJQUduQixxREFBMkI7Ozs7O0lBRzNCLGdEQUE2Qzs7Ozs7SUFHN0Msb0RBQTJDOzs7Ozs7SUFHM0MsK0NBQWlFOzs7Ozs7SUFHakUscURBQWlDOzs7OztJQUdqQyx1Q0FDVzs7Ozs7SUFHWCx3REFDOEI7Ozs7O0lBRzlCLGlEQUNxQjs7Ozs7SUFHckIsZ0RBQ3dFOzs7OztJQUc1RCx5Q0FBd0I7Ozs7O0lBQUUsb0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmREYXRlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2ZkLWRhdGUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKiBDb21wb25lbnQgcmVwcmVzZW50aW5nIHRoZSBZZWFyVmlldyBvZiB0aGUgQ2FsZW5kYXIgQ29tcG9uZW50LiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1jYWxlbmRhci15ZWFyLXZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkICsgXCIteWVhci12aWV3XCInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclllYXJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiAgVGhpcyB2YXJpYWJsZSBpcyB1c2VkIHRvIGRlZmluZSB3aGljaCB5ZWFyIGZyb20gY2FsZW5kYXJZZWFyTGlzdCBzaG91bGQgYmUgZm9jdXNhYmxlIGJ5IHRhYiBrZXlcbiAgICAgKi9cbiAgICBhY3RpdmVZZWFyOiBudW1iZXI7XG5cbiAgICAvKiogUGFyYW1ldGVyIHRoYXQgc3RvcmVzIHRoZSBkb3plbiBvZiB5ZWFycyB0aGF0IGFyZSBjdXJyZW50bHkgYmVpbmcgZGlzcGxheWVkLiAqL1xuICAgIGNhbGVuZGFyWWVhckxpc3Q6IG51bWJlcltdO1xuXG4gICAgLyoqIFBhcmFtZXRlciBzdG9yaW5nIHRoZSB5ZWFyIG9mIHRoZSBwcmVzZW50IGRheS4gKi9cbiAgICBjdXJyZW50WWVhcjogbnVtYmVyID0gRmREYXRlLmdldFRvZGF5KCkueWVhcjtcblxuICAgIC8qKiBQYXJhbWV0ZXIgc3RvcmluZyBmaXJzdCBzaG93biB5ZWFyIG9uIGxpc3QgKi9cbiAgICBmaXJzdFllYXJJbkxpc3Q6IG51bWJlciA9IHRoaXMuY3VycmVudFllYXI7XG5cbiAgICAvKiogQW4gUnhKUyBTdWJqZWN0IHRoYXQgd2lsbCBraWxsIHRoZSBkYXRhIHN0cmVhbSB1cG9uIGNvbXBvbmVudOKAmXMgZGVzdHJ1Y3Rpb24gKGZvciB1bnN1YnNjcmliaW5nKSAgKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uRGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIG5ld0ZvY3VzZWRZZWFySWQ6IHN0cmluZztcblxuICAgIC8qKiBQYXJhbWV0ZXIgdXNlZCBpbiBpZCBvZiB5ZWFycyB1c2VkIGZvciBoZWxwIHdpdGggZm9jdXNpbmcgb24gdGhlIGNvcnJlY3QgZWxlbWVudCBkdXJpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgZm9jdXMgd291bGQgZXNjYXBlIHRoZSBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNFc2NhcGVGdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgICAvKiogUGFyYW1ldGVyIGhvbGRpbmcgdGhlIHllYXIgdGhhdCBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuICovXG4gICAgQElucHV0KClcbiAgICB5ZWFyU2VsZWN0ZWQ6IG51bWJlcjtcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIGEgeWVhciBpcyBzZWxlY3RlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSB5ZWFyQ2xpY2tlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5ld0ZvY3VzZWRZZWFySWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMubmV3Rm9jdXNlZFllYXJJZCk7XG4gICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWRZZWFySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXJzdFllYXJJbkxpc3QgPSB0aGlzLnllYXJTZWxlY3RlZDtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RZZWFyTGlzdCgpO1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLm9uRm9jdXNJZENoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGluZGV4ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0ZvY3VzZWRZZWFySWQgPSB0aGlzLmlkICsgJy1mZC15ZWFyLScgKyBpbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzRWxlbWVudCh0aGlzLm5ld0ZvY3VzZWRZZWFySWQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5mb2N1c0VzY2FwZUZ1bmN0aW9uID0gdGhpcy5mb2N1c0VzY2FwZUZ1bmN0aW9uO1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLm9uS2V5U2VsZWN0XG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vbkRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaW5kZXggPT4gdGhpcy5zZWxlY3RZZWFyKHRoaXMuY2FsZW5kYXJZZWFyTGlzdFtpbmRleF0pKVxuICAgICAgICA7XG5cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uub25MaXN0U3RhcnRBcHByb2FjaFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubG9hZFByZXZpb3VzWWVhckxpc3QoKSlcbiAgICAgICAgO1xuXG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLm9uTGlzdEVuZEFwcHJvYWNoXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5vbkRlc3Ryb3kkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5sb2FkTmV4dFllYXJMaXN0KCkpXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uRGVzdHJveSQubmV4dCgpO1xuICAgICAgICB0aGlzLm9uRGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdGhhdCByZXR1cm5zIGFjdGl2ZSBjZWxsLCB3aGljaCBtZWFuczpcbiAgICAgKiBpZiB0aGVyZSBpcyBhbnkgc2VsZWN0ZWQgeWVhciwgcmV0dXJuIHNlbGVjdGVkIHllYXJcbiAgICAgKiBpZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB5ZWFyLCBidXQgdGhlcmUgaXMgY3VycmVudCB5ZWFyLCByZXR1cm4gY3VycmVudCB5ZWFyXG4gICAgICogaWYgdGhlcmUgaXMgbm8gY3VycmVudCB5ZWFyLCBvciBzZWxlY3RlZCwgcmV0dXJuIGZpcnN0IG9uZVxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QWN0aXZlWWVhcigpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFllYXI6IG51bWJlciA9IHRoaXMuY2FsZW5kYXJZZWFyTGlzdC5maW5kKHllYXIgPT4geWVhciA9PT0gdGhpcy55ZWFyU2VsZWN0ZWQpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRZZWFyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRZZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFllYXI6IG51bWJlciA9IHRoaXMuY2FsZW5kYXJZZWFyTGlzdC5maW5kKHllYXIgPT4geWVhciA9PT0gdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIGlmIChjdXJyZW50WWVhcikge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRZZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJZZWFyTGlzdFswXTtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIGZvciBoYW5kbGluZyB0aGUga2V5Ym9hcmQgbmF2aWdhdGlvbi4gKi9cbiAgICBvbktleWRvd25ZZWFySGFuZGxlcihldmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5vbktleWRvd25IYW5kbGVyKGV2ZW50LCBpbmRleCk7XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB1c2VkIHRvIGxvYWQgdGhlIHByZXZpb3VzIDEyIHllYXJzIHRvIGJlIGRpc3BsYXllZC4gKi9cbiAgICBsb2FkTmV4dFllYXJMaXN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpcnN0WWVhckluTGlzdCArPSAxMjtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RZZWFyTGlzdCgpO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdXNlZCB0byBsb2FkIHRoZSBuZXh0IDEyIHllYXJzIHRvIGJlIGRpc3BsYXllZC4gKi9cbiAgICBsb2FkUHJldmlvdXNZZWFyTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXJzdFllYXJJbkxpc3QgLT0gMTI7XG4gICAgICAgIHRoaXMuY29uc3RydWN0WWVhckxpc3QoKTtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIGFsbG93aW5nIGZvY3VzaW5nIG9uIGVsZW1lbnRzIHdpdGhpbiB0aGlzIGNvbXBvbmVudC4gKi9cbiAgICBmb2N1c0VsZW1lbnQoZWxlbWVudFNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudFRvRm9jdXM6IEhUTUxFbGVtZW50ID0gdGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBlbGVtZW50U2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgZWxlbWVudFNlbGVjdG9yKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE1ldGhvZCB0aGF0IHNlbmRzIHRoZSB5ZWFyIHRvIHRoZSBwYXJlbnQgY29tcG9uZW50IHdoZW4gaXQgaXMgY2xpY2tlZC4gKi9cbiAgICBzZWxlY3RZZWFyKHNlbGVjdGVkWWVhcjogbnVtYmVyLCBldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZCA9IHNlbGVjdGVkWWVhcjtcbiAgICAgICAgdGhpcy55ZWFyQ2xpY2tlZC5lbWl0KHRoaXMueWVhclNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHByaXZhdGUgY29uc3RydWN0WWVhckxpc3QoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXllZFllYXJzQW1vdW50OiBudW1iZXIgPSAxMjtcbiAgICAgICAgdGhpcy5jYWxlbmRhclllYXJMaXN0ID0gW107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZGlzcGxheWVkWWVhcnNBbW91bnQ7ICsreCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclllYXJMaXN0LnB1c2godGhpcy5maXJzdFllYXJJbkxpc3QgKyB4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZVllYXIgPSB0aGlzLmdldEFjdGl2ZVllYXIoKTtcbiAgICB9XG59XG4iXX0=