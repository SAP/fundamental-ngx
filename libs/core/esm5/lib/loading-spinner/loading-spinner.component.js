/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents a loading spinner.
 *
 * ```html
 * <fd-loading-spinner [loading]="true"></fd-loading-spinner>
 * ```
 */
var LoadingSpinnerComponent = /** @class */ (function () {
    function LoadingSpinnerComponent() {
        /**
         * Whether to display the loading indicator animation.
         */
        this.loading = false;
        /**
         * Aria label for the 'loading' spinner.
         */
        this.loadingLabel = 'Loading';
    }
    LoadingSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-loading-spinner',
                    template: "<div class=\"fd-spinner\" [attr.aria-hidden]=\"!loading\" [attr.aria-label]=\"loadingLabel\">\n    <div></div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [""]
                }] }
    ];
    LoadingSpinnerComponent.propDecorators = {
        loading: [{ type: Input }],
        loadingLabel: [{ type: Input }]
    };
    return LoadingSpinnerComponent;
}());
export { LoadingSpinnerComponent };
if (false) {
    /**
     * Whether to display the loading indicator animation.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loading;
    /**
     * Aria label for the 'loading' spinner.
     * @type {?}
     */
    LoadingSpinnerComponent.prototype.loadingLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBU3BFO0lBQUE7Ozs7UUFTSSxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGlCQUFZLEdBQVcsU0FBUyxDQUFDO0lBQ3JDLENBQUM7O2dCQWRBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixvSUFBK0M7b0JBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7OzswQkFHSSxLQUFLOytCQUlMLEtBQUs7O0lBRVYsOEJBQUM7Q0FBQSxBQWRELElBY0M7U0FSWSx1QkFBdUI7Ozs7OztJQUVoQywwQ0FDeUI7Ozs7O0lBR3pCLCtDQUNpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBsb2FkaW5nIHNwaW5uZXIuIFxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1sb2FkaW5nLXNwaW5uZXIgW2xvYWRpbmddPVwidHJ1ZVwiPjwvZmQtbG9hZGluZy1zcGlubmVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbG9hZGluZy1zcGlubmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9sb2FkaW5nLXNwaW5uZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdTcGlubmVyQ29tcG9uZW50IHtcbiAgICAvKiogV2hldGhlciB0byBkaXNwbGF5IHRoZSBsb2FkaW5nIGluZGljYXRvciBhbmltYXRpb24uICovXG4gICAgQElucHV0KClcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlICdsb2FkaW5nJyBzcGlubmVyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbG9hZGluZ0xhYmVsOiBzdHJpbmcgPSAnTG9hZGluZyc7XG59XG4iXX0=