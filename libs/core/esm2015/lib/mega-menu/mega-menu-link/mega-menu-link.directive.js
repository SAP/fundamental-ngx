/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
/**
 *  Directive represents mega menu link.
 *  ```html
 * <a fd-mega-menu-link href="#">Link</a>
 *  ```
 *
 */
export class MegaMenuLinkDirective {
    /**
     * @hidden
     * @param {?} itemEl
     */
    constructor(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         * @hidden
         */
        this.hasChild = false;
        /**
         * @hidden
         */
        this.isExpanded = false;
    }
    /**
     * @return {?}
     */
    focus() {
        this.itemEl.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    click() {
        this.itemEl.nativeElement.click();
    }
}
MegaMenuLinkDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-mega-menu-link]',
                host: {
                    'tabindex': '0'
                }
            },] }
];
/** @nocollapse */
MegaMenuLinkDirective.ctorParameters = () => [
    { type: ElementRef }
];
MegaMenuLinkDirective.propDecorators = {
    fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__link',] }],
    hasChild: [{ type: Input }, { type: HostBinding, args: ['class.has-child',] }, { type: HostBinding, args: ['attr.aria-haspopup',] }],
    isExpanded: [{ type: Input }, { type: HostBinding, args: ['attr.aria-expanded',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.fdMegaMenuClass;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.hasChild;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.isExpanded;
    /** @type {?} */
    MegaMenuLinkDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtbGluay9tZWdhLW1lbnUtbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBZTFFLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBaUI5QixZQUFvQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZOzs7O1FBZHRDLG9CQUFlLEdBQVksSUFBSSxDQUFDOzs7O1FBTWhDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztJQUdhLENBQUM7Ozs7SUFFbkMsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7O1lBaENKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsSUFBSSxFQUFFO29CQUNGLFVBQVUsRUFBRSxHQUFHO2lCQUNsQjthQUNKOzs7O1lBZG1CLFVBQVU7Ozs4QkFpQnpCLFdBQVcsU0FBQywwQkFBMEI7dUJBSXRDLEtBQUssWUFDTCxXQUFXLFNBQUMsaUJBQWlCLGNBQzdCLFdBQVcsU0FBQyxvQkFBb0I7eUJBSWhDLEtBQUssWUFDTCxXQUFXLFNBQUMsb0JBQW9COzs7Ozs7O0lBWGpDLGdEQUNnQzs7Ozs7SUFHaEMseUNBRzBCOzs7OztJQUcxQiwyQ0FFNEI7O0lBR2YsdUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiAgRGlyZWN0aXZlIHJlcHJlc2VudHMgbWVnYSBtZW51IGxpbmsuXG4gKiAgYGBgaHRtbFxuICogPGEgZmQtbWVnYS1tZW51LWxpbmsgaHJlZj1cIiNcIj5MaW5rPC9hPlxuICogIGBgYFxuICogKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1tZWdhLW1lbnUtbGlua10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudUxpbmtEaXJlY3RpdmUge1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tZWdhLW1lbnVfX2xpbmsnKVxuICAgIGZkTWVnYU1lbnVDbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oYXMtY2hpbGQnKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWhhc3BvcHVwJylcbiAgICBoYXNDaGlsZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgICBpc0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgaXRlbUVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1FbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxufVxuIl19