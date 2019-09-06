/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
var ButtonDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonDirective, _super);
    /** @hidden */
    function ButtonDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    ButtonDirective.prototype._setProperties = 
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
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
                function (option) {
                    if (typeof option === 'string') {
                        _this._addClassToElement('fd-button--' + option);
                    }
                }));
            }
        }
    };
    ButtonDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-button]'
                },] }
    ];
    /** @nocollapse */
    ButtonDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonDirective.propDecorators = {
        compact: [{ type: Input }],
        glyph: [{ type: Input }],
        fdType: [{ type: Input }],
        semantic: [{ type: Input }],
        options: [{ type: Input }],
        size: [{ type: Input }]
    };
    return ButtonDirective;
}(AbstractFdNgxClass));
export { ButtonDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9idXR0b24vYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7QUFTcEU7SUFLcUMsMkNBQWtCO0lBOENuRCxjQUFjO0lBQ2QseUJBQW9CLFVBQXNCO1FBQTFDLFlBQ0ksa0JBQU0sVUFBVSxDQUFDLFNBQ3BCO1FBRm1CLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQUUxQyxDQUFDO0lBNUJELGNBQWM7Ozs7OztJQUNkLHdDQUFjOzs7Ozs7SUFBZDtRQUFBLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0RDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6RDtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxNQUFNO29CQUN2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTt3QkFDNUIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQztxQkFDbkQ7Z0JBQ0wsQ0FBQyxFQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQzs7Z0JBakRKLFNBQVMsU0FBQzs7O29CQUdQLFFBQVEsRUFBRSxhQUFhO2lCQUMxQjs7OztnQkFkbUIsVUFBVTs7OzBCQWtCekIsS0FBSzt3QkFHTCxLQUFLO3lCQUlMLEtBQUs7MkJBR0wsS0FBSzswQkFHTCxLQUFLO3VCQUdMLEtBQUs7O0lBK0JWLHNCQUFDO0NBQUEsQUF2REQsQ0FLcUMsa0JBQWtCLEdBa0R0RDtTQWxEWSxlQUFlOzs7Ozs7SUFHeEIsa0NBQTBCOzs7OztJQUcxQixnQ0FBdUI7Ozs7OztJQUl2QixpQ0FBd0I7Ozs7O0lBR3hCLG1DQUEwQjs7Ozs7SUFHMUIsa0NBQW9DOzs7OztJQUdwQywrQkFBc0I7Ozs7O0lBNEJWLHFDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogQnV0dG9uIGRpcmVjdGl2ZSwgdXNlZCB0byBlbmhhbmNlIHN0YW5kYXJkIEhUTUwgYnV0dG9ucy5cbiAqXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uIGZkLWJ1dHRvbj5CdXR0b24gVGV4dDwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWJ1dHRvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG5cbiAgICAvKiogV2hldGhlciB0byBhcHBseSBjb21wYWN0IG1vZGUgdG8gdGhlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKSBjb21wYWN0OiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBpY29uIHRvIGluY2x1ZGUgaW4gdGhlIGJ1dHRvbi4gU2VlIHRoZSBpY29uIHBhZ2UgZm9yIHRoZSBsaXN0IG9mIGljb25zLiAqL1xuICAgIEBJbnB1dCgpIGdseXBoOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGJ1dHRvbi4gVHlwZXMgaW5jbHVkZSAnc3RhbmRhcmQnLCAncG9zaXRpdmUnLCAnbWVkaXVtJywgYW5kICduZWdhdGl2ZScuXG4gICAgICogTGVhdmUgZW1wdHkgZm9yIGRlZmF1bHQgKEFjdGlvbiBidXR0b24pLicqL1xuICAgIEBJbnB1dCgpIGZkVHlwZTogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASW5wdXQoKSBzZW1hbnRpYzogc3RyaW5nOyAvLyBUT0RPOiBkZXByZWNhdGVkLCBsZWF2aW5nIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG4gICAgLyoqIEJ1dHRvbiBvcHRpb25zLiAgT3B0aW9ucyBpbmNsdWRlICdlbXBoYXNpemVkJyBhbmQgJ2xpZ2h0Jy4gTGVhdmUgZW1wdHkgZm9yIGRlZmF1bHQuJyAqL1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmc7IC8vIFRPRE86IGRlcHJlY2F0ZWQsIGxlYXZpbmcgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYnV0dG9uJyk7XG4gICAgICAgIGlmICh0aGlzLmNvbXBhY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1idXR0b24tLWNvbXBhY3QnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nbHlwaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ3NhcC1pY29uLS0nICsgdGhpcy5nbHlwaCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmRUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYnV0dG9uLS0nICsgdGhpcy5mZFR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1idXR0b24tLScgKyB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1idXR0b24tLScgKyBvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=