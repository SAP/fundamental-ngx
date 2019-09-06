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
export class LoadingSpinnerComponent {
    constructor() {
        /**
         * Whether to display the loading indicator animation.
         */
        this.loading = false;
        /**
         * Aria label for the 'loading' spinner.
         */
        this.loadingLabel = 'Loading';
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBZXBFLE1BQU0sT0FBTyx1QkFBdUI7SUFOcEM7Ozs7UUFTSSxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGlCQUFZLEdBQVcsU0FBUyxDQUFDO0lBQ3JDLENBQUM7OztZQWRBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixvSUFBK0M7Z0JBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7O3NCQUdJLEtBQUs7MkJBSUwsS0FBSzs7Ozs7OztJQUpOLDBDQUN5Qjs7Ozs7SUFHekIsK0NBQ2lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGxvYWRpbmcgc3Bpbm5lci4gXG4gKlxuICogYGBgaHRtbFxuICogPGZkLWxvYWRpbmctc3Bpbm5lciBbbG9hZGluZ109XCJ0cnVlXCI+PC9mZC1sb2FkaW5nLXNwaW5uZXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1sb2FkaW5nLXNwaW5uZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9sb2FkaW5nLXNwaW5uZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ1NwaW5uZXJDb21wb25lbnQge1xuICAgIC8qKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGFuaW1hdGlvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgJ2xvYWRpbmcnIHNwaW5uZXIuICovXG4gICAgQElucHV0KClcbiAgICBsb2FkaW5nTGFiZWw6IHN0cmluZyA9ICdMb2FkaW5nJztcbn1cbiJdfQ==