/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Directive to be applied to buttons that are members of a button group.
 *
 * ```html
 * <button fd-button-grouped>Button</button>
 * ```
 */
export class ButtonGroupedDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the button should be in compact form.
         */
        this.compact = false;
        /**
         * @hidden
         */
        this.fdButtonGroupedClass = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }
}
ButtonGroupedDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-button-grouped]'
            },] }
];
/** @nocollapse */
ButtonGroupedDirective.ctorParameters = () => [
    { type: ElementRef }
];
ButtonGroupedDirective.propDecorators = {
    size: [{ type: Input }],
    glyph: [{ type: Input }],
    state: [{ type: Input }],
    compact: [{ type: Input }, { type: HostBinding, args: ['class.fd-button--compact',] }],
    fdButtonGroupedClass: [{ type: HostBinding, args: ['class.fd-button--grouped',] }]
};
if (false) {
    /**
     * Size of the button. Can be `xs`, `s`, or left blank for large size.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.size;
    /**
     * Glyph (icon) of the button.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.glyph;
    /**
     * State of the button. Can be `selected` or `disabled`.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.state;
    /**
     * Whether the button should be in compact form.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.compact;
    /**
     * @hidden
     * @type {?}
     */
    ButtonGroupedDirective.prototype.fdButtonGroupedClass;
    /**
     * @type {?}
     * @private
     */
    ButtonGroupedDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXBlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7O0FBY3BFLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxrQkFBa0I7Ozs7O0lBd0IxRCxZQUFvQixVQUFzQjtRQUN0QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7O1FBUDFDLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIseUJBQW9CLEdBQVksSUFBSSxDQUFDO0lBS3JDLENBQUM7Ozs7O0lBR0QsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7OztZQTVDSixTQUFTLFNBQUM7OztnQkFHUCxRQUFRLEVBQUUscUJBQXFCO2FBQ2xDOzs7O1lBZG1CLFVBQVU7OzttQkFrQnpCLEtBQUs7b0JBSUwsS0FBSztvQkFJTCxLQUFLO3NCQUlMLEtBQUssWUFDTCxXQUFXLFNBQUMsMEJBQTBCO21DQUl0QyxXQUFXLFNBQUMsMEJBQTBCOzs7Ozs7O0lBakJ2QyxzQ0FDYTs7Ozs7SUFHYix1Q0FDYzs7Ozs7SUFHZCx1Q0FDYzs7Ozs7SUFHZCx5Q0FFeUI7Ozs7O0lBR3pCLHNEQUNxQzs7Ozs7SUFHekIsNENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGJlIGFwcGxpZWQgdG8gYnV0dG9ucyB0aGF0IGFyZSBtZW1iZXJzIG9mIGEgYnV0dG9uIGdyb3VwLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxidXR0b24gZmQtYnV0dG9uLWdyb3VwZWQ+QnV0dG9uPC9idXR0b24+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtYnV0dG9uLWdyb3VwZWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Hcm91cGVkRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBTaXplIG9mIHRoZSBidXR0b24uIENhbiBiZSBgeHNgLCBgc2AsIG9yIGxlZnQgYmxhbmsgZm9yIGxhcmdlIHNpemUuICovXG4gICAgQElucHV0KClcbiAgICBzaXplOiBzdHJpbmc7XG5cbiAgICAvKiogR2x5cGggKGljb24pIG9mIHRoZSBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBnbHlwaDogc3RyaW5nO1xuXG4gICAgLyoqIFN0YXRlIG9mIHRoZSBidXR0b24uIENhbiBiZSBgc2VsZWN0ZWRgIG9yIGBkaXNhYmxlZGAuICovXG4gICAgQElucHV0KClcbiAgICBzdGF0ZTogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGJ1dHRvbiBzaG91bGQgYmUgaW4gY29tcGFjdCBmb3JtLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1idXR0b24tLWNvbXBhY3QnKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1idXR0b24tLWdyb3VwZWQnKVxuICAgIGZkQnV0dG9uR3JvdXBlZENsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1idXR0b24tLScgKyB0aGlzLnNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdseXBoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnc2FwLWljb24tLScgKyB0aGlzLmdseXBoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2lzLScgKyB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==