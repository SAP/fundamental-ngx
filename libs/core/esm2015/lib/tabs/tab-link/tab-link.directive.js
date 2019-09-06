/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Tab link for nav mode
 *
 * ```html
 * <a fd-tab-link>
 *    link
 * </a>
 * ```
 */
export class TabLinkDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
    }
}
TabLinkDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-link]',
                host: {
                    'role': 'tab',
                }
            },] }
];
/** @nocollapse */
TabLinkDirective.ctorParameters = () => [
    { type: ElementRef }
];
TabLinkDirective.propDecorators = {
    active: [{ type: Input }, { type: HostBinding, args: ['attr.aria-selected',] }],
    disabled: [{ type: Input }, { type: HostBinding, args: ['attr.aria-disabled',] }]
};
if (false) {
    /**
     * Whether the link is active
     * @type {?}
     */
    TabLinkDirective.prototype.active;
    /**
     * Only visual / accessibility thing on tab-nav mode
     * RouterLink does not respect preventDefault/stopPropagation
     * @type {?}
     */
    TabLinkDirective.prototype.disabled;
    /** @type {?} */
    TabLinkDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFiLWxpbmsvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7O0FBbUJ2RSxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsa0JBQWtCOzs7OztJQXdCcEQsWUFBbUIsVUFBc0I7UUFDckMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBREgsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUV6QyxDQUFDOzs7OztJQVZELGNBQWM7UUFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsS0FBSztpQkFDaEI7YUFDSjs7OztZQW5CbUIsVUFBVTs7O3FCQXVCekIsS0FBSyxZQUNMLFdBQVcsU0FBQyxvQkFBb0I7dUJBT2hDLEtBQUssWUFDTCxXQUFXLFNBQUMsb0JBQW9COzs7Ozs7O0lBVGpDLGtDQUVnQjs7Ozs7O0lBTWhCLG9DQUVrQjs7SUFXTixzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBUYWIgbGluayBmb3IgbmF2IG1vZGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8YSBmZC10YWItbGluaz5cbiAqICAgIGxpbmtcbiAqIDwvYT5cbiAqIGBgYFxuICovXG5cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC10YWItbGlua10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYkxpbmtEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpbmsgaXMgYWN0aXZlICovXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gICAgYWN0aXZlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogT25seSB2aXN1YWwgLyBhY2Nlc3NpYmlsaXR5IHRoaW5nIG9uIHRhYi1uYXYgbW9kZVxuICAgICAqIFJvdXRlckxpbmsgZG9lcyBub3QgcmVzcGVjdCBwcmV2ZW50RGVmYXVsdC9zdG9wUHJvcGFnYXRpb25cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC10YWJzX19saW5rJyk7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cblxufVxuIl19