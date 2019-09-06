/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding } from '@angular/core';
/**
 * Directive tool to facilitate interacting with a native file input element.
 */
export class FileSelectDirective {
    constructor() {
        /**
         * Whether the input should accept multiple file selections.
         */
        this.multiple = true;
        /**
         * Event emitted when files are selected.
         */
        this.onFileSelect = new EventEmitter();
    }
    /**
     * @hidden
     * @return {?}
     */
    get multipleBinding() {
        return this.multiple ? '' : undefined;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        if (event.target instanceof HTMLInputElement) {
            /** @type {?} */
            const elRef = ((/** @type {?} */ (event.target)));
            /** @type {?} */
            const files = elRef.files;
            /** @type {?} */
            const fileArray = Array.from(files);
            if (files.length) {
                this.onFileSelect.emit(fileArray);
            }
        }
    }
}
FileSelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdFileSelect]',
            },] }
];
FileSelectDirective.propDecorators = {
    multiple: [{ type: Input }],
    onFileSelect: [{ type: Output }],
    multipleBinding: [{ type: HostBinding, args: ['attr.multiple',] }],
    onChange: [{ type: HostListener, args: ['change', ['$event'],] }]
};
if (false) {
    /**
     * Whether the input should accept multiple file selections.
     * @type {?}
     * @private
     */
    FileSelectDirective.prototype.multiple;
    /**
     * Event emitted when files are selected.
     * @type {?}
     */
    FileSelectDirective.prototype.onFileSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtaW5wdXQvZGlyZWN0aXZlcy9maWxlLXNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRMUQsTUFBTSxPQUFPLG1CQUFtQjtJQUhoQzs7OztRQU9ZLGFBQVEsR0FBWSxJQUFJLENBQUM7Ozs7UUFJeEIsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQW9CN0UsQ0FBQzs7Ozs7SUFqQkcsSUFDSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFJRCxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLEtBQUssQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLEVBQUU7O2tCQUNwQyxLQUFLLEdBQXFCLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQzs7a0JBQzFELEtBQUssR0FBYSxLQUFLLENBQUMsS0FBSzs7a0JBQzdCLFNBQVMsR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckM7U0FDSjtJQUNMLENBQUM7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjthQUM3Qjs7O3VCQUlJLEtBQUs7MkJBSUwsTUFBTTs4QkFJTixXQUFXLFNBQUMsZUFBZTt1QkFNM0IsWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7SUFkbEMsdUNBQ2lDOzs7OztJQUdqQywyQ0FDeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSG9zdExpc3RlbmVyLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0b29sIHRvIGZhY2lsaXRhdGUgaW50ZXJhY3Rpbmcgd2l0aCBhIG5hdGl2ZSBmaWxlIGlucHV0IGVsZW1lbnQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkRmlsZVNlbGVjdF0nLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlU2VsZWN0RGlyZWN0aXZlIHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBzaG91bGQgYWNjZXB0IG11bHRpcGxlIGZpbGUgc2VsZWN0aW9ucy4gKi9cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgbXVsdGlwbGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBmaWxlcyBhcmUgc2VsZWN0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25GaWxlU2VsZWN0OiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIubXVsdGlwbGUnKVxuICAgIGdldCBtdWx0aXBsZUJpbmRpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50J10pXG4gICAgb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbFJlZjogSFRNTElucHV0RWxlbWVudCA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgZmlsZXM6IEZpbGVMaXN0ID0gZWxSZWYuZmlsZXM7XG4gICAgICAgICAgICBjb25zdCBmaWxlQXJyYXk6IEZpbGVbXSA9IEFycmF5LmZyb20oZmlsZXMpO1xuICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25GaWxlU2VsZWN0LmVtaXQoZmlsZUFycmF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==