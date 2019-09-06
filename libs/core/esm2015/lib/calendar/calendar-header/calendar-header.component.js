/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
/**
 * Internal use only.
 * Header of the calendar component.
 */
export class CalendarHeaderComponent {
    /**
     * @param {?} calendarI18nLabels
     * @param {?} calendarI18n
     */
    constructor(calendarI18nLabels, calendarI18n) {
        this.calendarI18nLabels = calendarI18nLabels;
        this.calendarI18n = calendarI18n;
        /**
         * Event emitted when the active view should change.
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event emitted when the previous button is clicked.
         */
        this.previousClicked = new EventEmitter();
        /**
         * Event emitted when the next button is clicked.
         */
        this.nextClicked = new EventEmitter();
    }
    /**
     * Get the aria label for the previous button. Depends on the active view.
     * @return {?}
     */
    get previousLabel() {
        return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
            : this.calendarI18nLabels.previousYearLabel;
    }
    /**
     * Get the aria label for the next button. Depends on the active view.
     * @return {?}
     */
    get nextLabel() {
        return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
            : this.calendarI18nLabels.nextMonthLabel;
    }
    /**
     * Get aria label for the month shown.
     * @return {?}
     */
    get monthLabel() {
        return this.calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
    }
    /**
     * @return {?}
     */
    isOnMonthView() {
        return this.activeView === 'month';
    }
    /**
     * @return {?}
     */
    isOnYearView() {
        return this.activeView === 'year';
    }
    /**
     * @param {?} type
     * @return {?}
     */
    processViewChange(type) {
        if (type === this.activeView) {
            this.activeView = 'day';
        }
        else {
            this.activeView = type;
        }
        this.activeViewChange.emit(this.activeView);
    }
}
CalendarHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-calendar-header',
                template: "<header class=\"fd-calendar__header\">\n    <div class=\"fd-calendar__navigation\">\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-left\"\n                    [attr.id]=\"id + '-left-arrow'\"\n                    [attr.aria-label]=\"previousLabel\"\n                    [attr.aria-disabled]=\"false\"\n                    type=\"button\"\n                    (click)=\"previousClicked.emit()\">\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--light fd-button--compact\"\n                    [attr.aria-label]=\"calendarI18nLabels.monthSelectionLabel\"\n                    [attr.aria-selected]=\"isOnMonthView()\"\n                    (click)=\"processViewChange('month')\"\n                    type=\"button\">\n                {{monthLabel}}\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--light fd-button--compact\"\n                    [attr.aria-label]=\"calendarI18nLabels.yearSelectionLabel\"\n                    [attr.aria-selected]=\"isOnYearView()\"\n                    (click)=\"processViewChange('year')\"\n                    type=\"button\">\n                {{currentlyDisplayed.year}}\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-right\"\n                    [attr.id]=\"id + '-right-arrow'\"\n                    [attr.aria-label]=\"nextLabel\"\n                    [attr.aria-disabled]=\"false\"\n                    (click)=\"nextClicked.emit()\"\n                    type=\"button\">\n            </button>\n        </div>\n    </div>\n</header>\n",
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[attr.id]': 'id + "-header"'
                },
                styles: [""]
            }] }
];
/** @nocollapse */
CalendarHeaderComponent.ctorParameters = () => [
    { type: CalendarI18nLabels },
    { type: CalendarI18n }
];
CalendarHeaderComponent.propDecorators = {
    activeView: [{ type: Input }],
    currentlyDisplayed: [{ type: Input }],
    id: [{ type: Input }],
    activeViewChange: [{ type: Output }],
    previousClicked: [{ type: Output }],
    nextClicked: [{ type: Output }]
};
if (false) {
    /**
     * Currently active view. Needed for a11y labels.
     * @type {?}
     */
    CalendarHeaderComponent.prototype.activeView;
    /**
     * Currently displayed date on the calendar.
     * @type {?}
     */
    CalendarHeaderComponent.prototype.currentlyDisplayed;
    /**
     * Id
     * @type {?}
     */
    CalendarHeaderComponent.prototype.id;
    /**
     * Event emitted when the active view should change.
     * @type {?}
     */
    CalendarHeaderComponent.prototype.activeViewChange;
    /**
     * Event emitted when the previous button is clicked.
     * @type {?}
     */
    CalendarHeaderComponent.prototype.previousClicked;
    /**
     * Event emitted when the next button is clicked.
     * @type {?}
     */
    CalendarHeaderComponent.prototype.nextClicked;
    /** @type {?} */
    CalendarHeaderComponent.prototype.calendarI18nLabels;
    /** @type {?} */
    CalendarHeaderComponent.prototype.calendarI18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBaUJyRCxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQTZCaEMsWUFDVyxrQkFBc0MsRUFDdEMsWUFBMEI7UUFEMUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYzs7OztRQWY1QixxQkFBZ0IsR0FDbkIsSUFBSSxZQUFZLEVBQWtCLENBQUM7Ozs7UUFJaEMsb0JBQWUsR0FDbEIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQUl0QixnQkFBVyxHQUNkLElBQUksWUFBWSxFQUFRLENBQUM7SUFLNUIsQ0FBQzs7Ozs7SUFHSixJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCO1lBQzFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYztZQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUdELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLElBQW9CO1FBQ2xDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDM0I7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBM0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QiwwMURBQStDO2dCQUUvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFO29CQUNGLFdBQVcsRUFBRSxnQkFBZ0I7aUJBQ2hDOzthQUNKOzs7O1lBakJRLGtCQUFrQjtZQUNsQixZQUFZOzs7eUJBb0JoQixLQUFLO2lDQUlMLEtBQUs7aUJBSUwsS0FBSzsrQkFJTCxNQUFNOzhCQUtOLE1BQU07MEJBS04sTUFBTTs7Ozs7OztJQXRCUCw2Q0FDMkI7Ozs7O0lBRzNCLHFEQUNvQzs7Ozs7SUFHcEMscUNBQ1c7Ozs7O0lBR1gsbURBRXlDOzs7OztJQUd6QyxrREFFK0I7Ozs7O0lBRy9CLDhDQUUrQjs7SUFHM0IscURBQTZDOztJQUM3QywrQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJJMThuTGFiZWxzIH0gZnJvbSAnLi4vaTE4bi9jYWxlbmRhci1pMThuLWxhYmVscyc7XG5pbXBvcnQgeyBDYWxlbmRhckkxOG4gfSBmcm9tICcuLi9pMThuL2NhbGVuZGFyLWkxOG4nO1xuaW1wb3J0IHsgRmRDYWxlbmRhclZpZXcgfSBmcm9tICcuLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJDdXJyZW50IH0gZnJvbSAnLi4vbW9kZWxzL2NhbGVuZGFyLWN1cnJlbnQnO1xuXG4vKipcbiAqIEludGVybmFsIHVzZSBvbmx5LlxuICogSGVhZGVyIG9mIHRoZSBjYWxlbmRhciBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtY2FsZW5kYXItaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCArIFwiLWhlYWRlclwiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJIZWFkZXJDb21wb25lbnQge1xuXG4gICAgLyoqIEN1cnJlbnRseSBhY3RpdmUgdmlldy4gTmVlZGVkIGZvciBhMTF5IGxhYmVscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGl2ZVZpZXc6IEZkQ2FsZW5kYXJWaWV3O1xuXG4gICAgLyoqIEN1cnJlbnRseSBkaXNwbGF5ZWQgZGF0ZSBvbiB0aGUgY2FsZW5kYXIuICovXG4gICAgQElucHV0KClcbiAgICBjdXJyZW50bHlEaXNwbGF5ZWQ6IENhbGVuZGFyQ3VycmVudDtcblxuICAgIC8qKiBJZCAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWQ6IHN0cmluZztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFjdGl2ZSB2aWV3IHNob3VsZCBjaGFuZ2UuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgYWN0aXZlVmlld0NoYW5nZTogRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8RmRDYWxlbmRhclZpZXc+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBwcmV2aW91c0NsaWNrZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIG5leHQgYnV0dG9uIGlzIGNsaWNrZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgbmV4dENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgY2FsZW5kYXJJMThuTGFiZWxzOiBDYWxlbmRhckkxOG5MYWJlbHMsXG4gICAgICAgIHB1YmxpYyBjYWxlbmRhckkxOG46IENhbGVuZGFySTE4blxuICAgICkge31cblxuICAgIC8qKiBHZXQgdGhlIGFyaWEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBidXR0b24uIERlcGVuZHMgb24gdGhlIGFjdGl2ZSB2aWV3LiAqL1xuICAgIGdldCBwcmV2aW91c0xhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXcgIT09ICd5ZWFyJyA/IHRoaXMuY2FsZW5kYXJJMThuTGFiZWxzLnByZXZpb3VzTW9udGhMYWJlbFxuICAgICAgICAgICAgOiB0aGlzLmNhbGVuZGFySTE4bkxhYmVscy5wcmV2aW91c1llYXJMYWJlbDtcbiAgICB9XG5cbiAgICAvKiogR2V0IHRoZSBhcmlhIGxhYmVsIGZvciB0aGUgbmV4dCBidXR0b24uIERlcGVuZHMgb24gdGhlIGFjdGl2ZSB2aWV3LiAqL1xuICAgIGdldCBuZXh0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlldyAhPT0gJ3llYXInID8gdGhpcy5jYWxlbmRhckkxOG5MYWJlbHMubmV4dE1vbnRoTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5jYWxlbmRhckkxOG5MYWJlbHMubmV4dE1vbnRoTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIEdldCBhcmlhIGxhYmVsIGZvciB0aGUgbW9udGggc2hvd24uICovXG4gICAgZ2V0IG1vbnRoTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJJMThuLmdldEFsbEZ1bGxNb250aE5hbWVzKClbdGhpcy5jdXJyZW50bHlEaXNwbGF5ZWQubW9udGggLSAxXTtcbiAgICB9XG5cbiAgICBpc09uTW9udGhWaWV3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVWaWV3ID09PSAnbW9udGgnO1xuICAgIH1cblxuICAgIGlzT25ZZWFyVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlldyA9PT0gJ3llYXInO1xuICAgIH1cblxuICAgIHByb2Nlc3NWaWV3Q2hhbmdlKHR5cGU6IEZkQ2FsZW5kYXJWaWV3KTogdm9pZCB7XG4gICAgICAgIGlmICh0eXBlID09PSB0aGlzLmFjdGl2ZVZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVmlldyA9ICdkYXknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVWaWV3ID0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZVZpZXdDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZVZpZXcpO1xuICAgIH1cblxufVxuIl19