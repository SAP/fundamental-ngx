/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
export class ButtonDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
    }
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.compact) {
            this._addClassToElement('fd-button--compact');
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.fdType) {
            this._addClassToElement('fd-button--' + this.fdType);
        }
        if (this.options) {
            if (typeof this.options === 'string') {
                this._addClassToElement('fd-button--' + this.options);
            }
            else if (Array.isArray(this.options)) {
                this.options.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                option => {
                    if (typeof option === 'string') {
                        this._addClassToElement('fd-button--' + option);
                    }
                }));
            }
        }
    }
}
ButtonDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-button]'
            },] }
];
/** @nocollapse */
ButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
ButtonDirective.propDecorators = {
    compact: [{ type: Input }],
    glyph: [{ type: Input }],
    fdType: [{ type: Input }],
    semantic: [{ type: Input }],
    options: [{ type: Input }],
    size: [{ type: Input }]
};
if (false) {
    /**
     * Whether to apply compact mode to the button.
     * @type {?}
     */
    ButtonDirective.prototype.compact;
    /**
     * The icon to include in the button. See the icon page for the list of icons.
     * @type {?}
     */
    ButtonDirective.prototype.glyph;
    /**
     * The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'
     * @type {?}
     */
    ButtonDirective.prototype.fdType;
    /**
     * @hidden
     * @type {?}
     */
    ButtonDirective.prototype.semantic;
    /**
     * Button options.  Options include 'emphasized' and 'light'. Leave empty for default.'
     * @type {?}
     */
    ButtonDirective.prototype.options;
    /**
     * @hidden
     * @type {?}
     */
    ButtonDirective.prototype.size;
    /**
     * @type {?}
     * @private
     */
    ButtonDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQWNwRSxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxrQkFBa0I7Ozs7O0lBK0NuRCxZQUFvQixVQUFzQjtRQUN0QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBRTFDLENBQUM7Ozs7OztJQTNCRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekQ7aUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O2dCQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMxQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQztxQkFDbkQ7Z0JBQ0wsQ0FBQyxFQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQzs7O1lBakRKLFNBQVMsU0FBQzs7O2dCQUdQLFFBQVEsRUFBRSxhQUFhO2FBQzFCOzs7O1lBZG1CLFVBQVU7OztzQkFrQnpCLEtBQUs7b0JBR0wsS0FBSztxQkFJTCxLQUFLO3VCQUdMLEtBQUs7c0JBR0wsS0FBSzttQkFHTCxLQUFLOzs7Ozs7O0lBaEJOLGtDQUEwQjs7Ozs7SUFHMUIsZ0NBQXVCOzs7Ozs7SUFJdkIsaUNBQXdCOzs7OztJQUd4QixtQ0FBMEI7Ozs7O0lBRzFCLGtDQUFvQzs7Ozs7SUFHcEMsK0JBQXNCOzs7OztJQTRCVixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIEJ1dHRvbiBkaXJlY3RpdmUsIHVzZWQgdG8gZW5oYW5jZSBzdGFuZGFyZCBIVE1MIGJ1dHRvbnMuXG4gKlxuICogYGBgaHRtbFxuICogPGJ1dHRvbiBmZC1idXR0b24+QnV0dG9uIFRleHQ8L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1idXR0b25dJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuXG4gICAgLyoqIFdoZXRoZXIgdG8gYXBwbHkgY29tcGFjdCBtb2RlIHRvIHRoZSBidXR0b24uICovXG4gICAgQElucHV0KCkgY29tcGFjdDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgaWNvbiB0byBpbmNsdWRlIGluIHRoZSBidXR0b24uIFNlZSB0aGUgaWNvbiBwYWdlIGZvciB0aGUgbGlzdCBvZiBpY29ucy4gKi9cbiAgICBASW5wdXQoKSBnbHlwaDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSB0eXBlIG9mIHRoZSBidXR0b24uIFR5cGVzIGluY2x1ZGUgJ3N0YW5kYXJkJywgJ3Bvc2l0aXZlJywgJ21lZGl1bScsIGFuZCAnbmVnYXRpdmUnLlxuICAgICAqIExlYXZlIGVtcHR5IGZvciBkZWZhdWx0IChBY3Rpb24gYnV0dG9uKS4nKi9cbiAgICBASW5wdXQoKSBmZFR5cGU6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KCkgc2VtYW50aWM6IHN0cmluZzsgLy8gVE9ETzogZGVwcmVjYXRlZCwgbGVhdmluZyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblxuICAgIC8qKiBCdXR0b24gb3B0aW9ucy4gIE9wdGlvbnMgaW5jbHVkZSAnZW1waGFzaXplZCcgYW5kICdsaWdodCcuIExlYXZlIGVtcHR5IGZvciBkZWZhdWx0LicgKi9cbiAgICBASW5wdXQoKSBvcHRpb25zOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nOyAvLyBUT0RPOiBkZXByZWNhdGVkLCBsZWF2aW5nIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWJ1dHRvbicpO1xuICAgICAgICBpZiAodGhpcy5jb21wYWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYnV0dG9uLS1jb21wYWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2x5cGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdzYXAtaWNvbi0tJyArIHRoaXMuZ2x5cGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZkVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWJ1dHRvbi0tJyArIHRoaXMuZmRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYnV0dG9uLS0nICsgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYnV0dG9uLS0nICsgb3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxufVxuIl19