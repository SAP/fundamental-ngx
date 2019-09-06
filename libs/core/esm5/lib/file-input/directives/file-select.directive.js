/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { HostListener, HostBinding } from '@angular/core';
/**
 * Directive tool to facilitate interacting with a native file input element.
 */
var FileSelectDirective = /** @class */ (function () {
    function FileSelectDirective() {
        /**
         * Whether the input should accept multiple file selections.
         */
        this.multiple = true;
        /**
         * Event emitted when files are selected.
         */
        this.onFileSelect = new EventEmitter();
    }
    Object.defineProperty(FileSelectDirective.prototype, "multipleBinding", {
        /** @hidden */
        get: /**
         * @hidden
         * @return {?}
         */
        function () {
            return this.multiple ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileSelectDirective.prototype.onChange = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target instanceof HTMLInputElement) {
            /** @type {?} */
            var elRef = ((/** @type {?} */ (event.target)));
            /** @type {?} */
            var files = elRef.files;
            /** @type {?} */
            var fileArray = Array.from(files);
            if (files.length) {
                this.onFileSelect.emit(fileArray);
            }
        }
    };
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
    return FileSelectDirective;
}());
export { FileSelectDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ZpbGUtaW5wdXQvZGlyZWN0aXZlcy9maWxlLXNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLMUQ7SUFBQTs7OztRQU9ZLGFBQVEsR0FBWSxJQUFJLENBQUM7Ozs7UUFJeEIsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQW9CN0UsQ0FBQztJQWpCRyxzQkFDSSxnREFBZTtRQUZuQixjQUFjOzs7OztRQUNkO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELGNBQWM7Ozs7OztJQUVkLHNDQUFROzs7OztJQURSLFVBQ1MsS0FBWTtRQUNqQixJQUFJLEtBQUssQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLEVBQUU7O2dCQUNwQyxLQUFLLEdBQXFCLENBQUMsbUJBQWtCLEtBQUssQ0FBQyxNQUFNLEVBQUEsQ0FBQzs7Z0JBQzFELEtBQUssR0FBYSxLQUFLLENBQUMsS0FBSzs7Z0JBQzdCLFNBQVMsR0FBVyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckM7U0FDSjtJQUNMLENBQUM7O2dCQTlCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7OzsyQkFJSSxLQUFLOytCQUlMLE1BQU07a0NBSU4sV0FBVyxTQUFDLGVBQWU7MkJBTTNCLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBV3RDLDBCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E1QlksbUJBQW1COzs7Ozs7O0lBRzVCLHVDQUNpQzs7Ozs7SUFHakMsMkNBQ3lFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3RMaXN0ZW5lciwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG9vbCB0byBmYWNpbGl0YXRlIGludGVyYWN0aW5nIHdpdGggYSBuYXRpdmUgZmlsZSBpbnB1dCBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmZEZpbGVTZWxlY3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgRmlsZVNlbGVjdERpcmVjdGl2ZSB7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgc2hvdWxkIGFjY2VwdCBtdWx0aXBsZSBmaWxlIHNlbGVjdGlvbnMuICovXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIG11bHRpcGxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gZmlsZXMgYXJlIHNlbGVjdGVkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uRmlsZVNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLm11bHRpcGxlJylcbiAgICBnZXQgbXVsdGlwbGVCaW5kaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlID8gJycgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudCddKVxuICAgIG9uQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgZWxSZWY6IEhUTUxJbnB1dEVsZW1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVzOiBGaWxlTGlzdCA9IGVsUmVmLmZpbGVzO1xuICAgICAgICAgICAgY29uc3QgZmlsZUFycmF5OiBGaWxlW10gPSBBcnJheS5mcm9tKGZpbGVzKTtcbiAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRmlsZVNlbGVjdC5lbWl0KGZpbGVBcnJheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=