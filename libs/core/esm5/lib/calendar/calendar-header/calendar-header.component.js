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
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent(calendarI18nLabels, calendarI18n) {
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
    Object.defineProperty(CalendarHeaderComponent.prototype, "previousLabel", {
        /** Get the aria label for the previous button. Depends on the active view. */
        get: /**
         * Get the aria label for the previous button. Depends on the active view.
         * @return {?}
         */
        function () {
            return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
                : this.calendarI18nLabels.previousYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarHeaderComponent.prototype, "nextLabel", {
        /** Get the aria label for the next button. Depends on the active view. */
        get: /**
         * Get the aria label for the next button. Depends on the active view.
         * @return {?}
         */
        function () {
            return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
                : this.calendarI18nLabels.nextMonthLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarHeaderComponent.prototype, "monthLabel", {
        /** Get aria label for the month shown. */
        get: /**
         * Get aria label for the month shown.
         * @return {?}
         */
        function () {
            return this.calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isOnMonthView = /**
     * @return {?}
     */
    function () {
        return this.activeView === 'month';
    };
    /**
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isOnYearView = /**
     * @return {?}
     */
    function () {
        return this.activeView === 'year';
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CalendarHeaderComponent.prototype.processViewChange = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === this.activeView) {
            this.activeView = 'day';
        }
        else {
            this.activeView = type;
        }
        this.activeViewChange.emit(this.activeView);
    };
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
    CalendarHeaderComponent.ctorParameters = function () { return [
        { type: CalendarI18nLabels },
        { type: CalendarI18n }
    ]; };
    CalendarHeaderComponent.propDecorators = {
        activeView: [{ type: Input }],
        currentlyDisplayed: [{ type: Input }],
        id: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        previousClicked: [{ type: Output }],
        nextClicked: [{ type: Output }]
    };
    return CalendarHeaderComponent;
}());
export { CalendarHeaderComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9jYWxlbmRhci9jYWxlbmRhci1oZWFkZXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBUXJEO0lBc0NJLGlDQUNXLGtCQUFzQyxFQUN0QyxZQUEwQjtRQUQxQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGlCQUFZLEdBQVosWUFBWSxDQUFjOzs7O1FBZjVCLHFCQUFnQixHQUNuQixJQUFJLFlBQVksRUFBa0IsQ0FBQzs7OztRQUloQyxvQkFBZSxHQUNsQixJQUFJLFlBQVksRUFBUSxDQUFDOzs7O1FBSXRCLGdCQUFXLEdBQ2QsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUs1QixDQUFDO0lBR0osc0JBQUksa0RBQWE7UUFEakIsOEVBQThFOzs7OztRQUM5RTtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0I7Z0JBQzFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSw4Q0FBUztRQURiLDBFQUEwRTs7Ozs7UUFDMUU7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYztnQkFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSwrQ0FBVTtRQURkLDBDQUEwQzs7Ozs7UUFDMUM7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7OztPQUFBOzs7O0lBRUQsK0NBQWE7OztJQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU8sQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsOENBQVk7OztJQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELG1EQUFpQjs7OztJQUFqQixVQUFrQixJQUFvQjtRQUNsQyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQzNCO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2dCQTNFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsMDFEQUErQztvQkFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDRixXQUFXLEVBQUUsZ0JBQWdCO3FCQUNoQzs7aUJBQ0o7Ozs7Z0JBakJRLGtCQUFrQjtnQkFDbEIsWUFBWTs7OzZCQW9CaEIsS0FBSztxQ0FJTCxLQUFLO3FCQUlMLEtBQUs7bUNBSUwsTUFBTTtrQ0FLTixNQUFNOzhCQUtOLE1BQU07O0lBMkNYLDhCQUFDO0NBQUEsQUE3RUQsSUE2RUM7U0FwRVksdUJBQXVCOzs7Ozs7SUFHaEMsNkNBQzJCOzs7OztJQUczQixxREFDb0M7Ozs7O0lBR3BDLHFDQUNXOzs7OztJQUdYLG1EQUV5Qzs7Ozs7SUFHekMsa0RBRStCOzs7OztJQUcvQiw4Q0FFK0I7O0lBRzNCLHFEQUE2Qzs7SUFDN0MsK0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFySTE4bkxhYmVscyB9IGZyb20gJy4uL2kxOG4vY2FsZW5kYXItaTE4bi1sYWJlbHMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJJMThuIH0gZnJvbSAnLi4vaTE4bi9jYWxlbmRhci1pMThuJztcbmltcG9ydCB7IEZkQ2FsZW5kYXJWaWV3IH0gZnJvbSAnLi4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IENhbGVuZGFyQ3VycmVudCB9IGZyb20gJy4uL21vZGVscy9jYWxlbmRhci1jdXJyZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCB1c2Ugb25seS5cbiAqIEhlYWRlciBvZiB0aGUgY2FsZW5kYXIgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWNhbGVuZGFyLWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQgKyBcIi1oZWFkZXJcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFySGVhZGVyQ29tcG9uZW50IHtcblxuICAgIC8qKiBDdXJyZW50bHkgYWN0aXZlIHZpZXcuIE5lZWRlZCBmb3IgYTExeSBsYWJlbHMuICovXG4gICAgQElucHV0KClcbiAgICBhY3RpdmVWaWV3OiBGZENhbGVuZGFyVmlldztcblxuICAgIC8qKiBDdXJyZW50bHkgZGlzcGxheWVkIGRhdGUgb24gdGhlIGNhbGVuZGFyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY3VycmVudGx5RGlzcGxheWVkOiBDYWxlbmRhckN1cnJlbnQ7XG5cbiAgICAvKiogSWQgKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBhY3RpdmUgdmlldyBzaG91bGQgY2hhbmdlLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGFjdGl2ZVZpZXdDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz5cbiAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPEZkQ2FsZW5kYXJWaWV3PigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJldmlvdXMgYnV0dG9uIGlzIGNsaWNrZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgcHJldmlvdXNDbGlja2VkOiBFdmVudEVtaXR0ZXI8dm9pZD5cbiAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG5leHRDbGlja2VkOiBFdmVudEVtaXR0ZXI8dm9pZD5cbiAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbGVuZGFySTE4bkxhYmVsczogQ2FsZW5kYXJJMThuTGFiZWxzLFxuICAgICAgICBwdWJsaWMgY2FsZW5kYXJJMThuOiBDYWxlbmRhckkxOG5cbiAgICApIHt9XG5cbiAgICAvKiogR2V0IHRoZSBhcmlhIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgYnV0dG9uLiBEZXBlbmRzIG9uIHRoZSBhY3RpdmUgdmlldy4gKi9cbiAgICBnZXQgcHJldmlvdXNMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVWaWV3ICE9PSAneWVhcicgPyB0aGlzLmNhbGVuZGFySTE4bkxhYmVscy5wcmV2aW91c01vbnRoTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5jYWxlbmRhckkxOG5MYWJlbHMucHJldmlvdXNZZWFyTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgYXJpYSBsYWJlbCBmb3IgdGhlIG5leHQgYnV0dG9uLiBEZXBlbmRzIG9uIHRoZSBhY3RpdmUgdmlldy4gKi9cbiAgICBnZXQgbmV4dExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXcgIT09ICd5ZWFyJyA/IHRoaXMuY2FsZW5kYXJJMThuTGFiZWxzLm5leHRNb250aExhYmVsXG4gICAgICAgICAgICA6IHRoaXMuY2FsZW5kYXJJMThuTGFiZWxzLm5leHRNb250aExhYmVsO1xuICAgIH1cblxuICAgIC8qKiBHZXQgYXJpYSBsYWJlbCBmb3IgdGhlIG1vbnRoIHNob3duLiAqL1xuICAgIGdldCBtb250aExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFySTE4bi5nZXRBbGxGdWxsTW9udGhOYW1lcygpW3RoaXMuY3VycmVudGx5RGlzcGxheWVkLm1vbnRoIC0gMV07XG4gICAgfVxuXG4gICAgaXNPbk1vbnRoVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlVmlldyA9PT0gJ21vbnRoJztcbiAgICB9XG5cbiAgICBpc09uWWVhclZpZXcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZVZpZXcgPT09ICd5ZWFyJztcbiAgICB9XG5cbiAgICBwcm9jZXNzVmlld0NoYW5nZSh0eXBlOiBGZENhbGVuZGFyVmlldyk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZSA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVZpZXcgPSAnZGF5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlVmlldyA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3Q2hhbmdlLmVtaXQodGhpcy5hY3RpdmVWaWV3KTtcbiAgICB9XG5cbn1cbiJdfQ==