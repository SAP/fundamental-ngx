/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * The directive that represents an identifier.
 * Identifier is a way to visually present something using an icon or user initials.
 *
 * ```html
 * <span fd-identifier [size]="'l'" [glyph]="'washing-machine'"></span>
 * ```
 */
export class IdentifierDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.size) {
            this._addClassToElement('fd-identifier--' + this.size);
        }
        if (this.circle) {
            this._addClassToElement('fd-identifier--circle');
        }
        if (this.transparent) {
            this._addClassToElement('fd-identifier--transparent');
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
    }
}
IdentifierDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-identifier]',
                host: {
                    role: 'presentation'
                }
            },] }
];
/** @nocollapse */
IdentifierDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
];
IdentifierDirective.propDecorators = {
    size: [{ type: Input }],
    circle: [{ type: Input }],
    transparent: [{ type: Input }],
    colorAccent: [{ type: Input }],
    glyph: [{ type: Input }]
};
if (false) {
    /**
     * The size of the identifier.
     * The predefined values for the size are *xxs*, *xs*, *s*, *m*, *l*, *xl* and *xxl*.
     *  *size* can accept any other string, for example *xxxs*, which will be translated into class *fd-identifier--xxxs*.
     * @type {?}
     */
    IdentifierDirective.prototype.size;
    /**
     * Whether to render a circle style for the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.circle;
    /**
     * Whether to render a transparent style for the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.transparent;
    /**
     * A number specifying the background color of the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.colorAccent;
    /**
     * The glyph name
     * @type {?}
     */
    IdentifierDirective.prototype.glyph;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpZmllci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvaWRlbnRpZmllci9pZGVudGlmaWVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7O0FBa0JwRSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsa0JBQWtCOzs7OztJQTRDdkQsWUFBZ0MsVUFBc0I7UUFDbEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBckJELGNBQWM7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDekQ7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQzs7O1lBakRKLFNBQVMsU0FBQzs7O2dCQUdQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsY0FBYztpQkFDdkI7YUFDSjs7OztZQWxCbUIsVUFBVSx1QkErRGIsTUFBTSxTQUFDLFVBQVU7OzttQkF0QzdCLEtBQUs7cUJBS0wsS0FBSzswQkFLTCxLQUFLOzBCQUdMLEtBQUs7b0JBR0wsS0FBSzs7Ozs7Ozs7O0lBaEJOLG1DQUFzQjs7Ozs7SUFLdEIscUNBQXlCOzs7OztJQUt6QiwwQ0FBOEI7Ozs7O0lBRzlCLDBDQUE2Qjs7Ozs7SUFHN0Isb0NBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFRoZSBkaXJlY3RpdmUgdGhhdCByZXByZXNlbnRzIGFuIGlkZW50aWZpZXIuIFxuICogSWRlbnRpZmllciBpcyBhIHdheSB0byB2aXN1YWxseSBwcmVzZW50IHNvbWV0aGluZyB1c2luZyBhbiBpY29uIG9yIHVzZXIgaW5pdGlhbHMuXG4gKlxuICogYGBgaHRtbFxuICogPHNwYW4gZmQtaWRlbnRpZmllciBbc2l6ZV09XCInbCdcIiBbZ2x5cGhdPVwiJ3dhc2hpbmctbWFjaGluZSdcIj48L3NwYW4+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtaWRlbnRpZmllcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ3ByZXNlbnRhdGlvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIElkZW50aWZpZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBcbiAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgaWRlbnRpZmllci4gXG4gICAgICogVGhlIHByZWRlZmluZWQgdmFsdWVzIGZvciB0aGUgc2l6ZSBhcmUgKnh4cyosICp4cyosICpzKiwgKm0qLCAqbCosICp4bCogYW5kICp4eGwqLlxuICAgICAqICAqc2l6ZSogY2FuIGFjY2VwdCBhbnkgb3RoZXIgc3RyaW5nLCBmb3IgZXhhbXBsZSAqeHh4cyosIHdoaWNoIHdpbGwgYmUgdHJhbnNsYXRlZCBpbnRvIGNsYXNzICpmZC1pZGVudGlmaWVyLS14eHhzKi5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG5cbiAgICAvKiogXG4gICAgICogV2hldGhlciB0byByZW5kZXIgYSBjaXJjbGUgc3R5bGUgZm9yIHRoZSBpZGVudGlmaWVyLiBcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaXJjbGU6IGJvb2xlYW47XG5cbiAgICAvKiogXG4gICAgICogV2hldGhlciB0byByZW5kZXIgYSB0cmFuc3BhcmVudCBzdHlsZSBmb3IgdGhlIGlkZW50aWZpZXIuIFxuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zcGFyZW50OiBib29sZWFuO1xuXG4gICAgLyoqIEEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGlkZW50aWZpZXIuICovXG4gICAgQElucHV0KCkgY29sb3JBY2NlbnQ6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgZ2x5cGggbmFtZSAqL1xuICAgIEBJbnB1dCgpIGdseXBoOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaWRlbnRpZmllci0tJyArIHRoaXMuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2lyY2xlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaWRlbnRpZmllci0tY2lyY2xlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhbnNwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1pZGVudGlmaWVyLS10cmFuc3BhcmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbG9yQWNjZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaGFzLWJhY2tncm91bmQtY29sb3ItYWNjZW50LScgKyB0aGlzLmNvbG9yQWNjZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nbHlwaCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ3NhcC1pY29uLS0nICsgdGhpcy5nbHlwaCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=