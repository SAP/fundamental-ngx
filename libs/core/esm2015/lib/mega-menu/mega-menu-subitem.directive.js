/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChild, Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';
/**
 *  Directive represents mega menu subitem, which can contain sublink.
 *  ```html
 * <li fd-mega-menu-subitem>
 *      <a fd-mega-menu-sublink>Sub Item 2</a>
 * </li>
 *  ```
 *
 */
export class MegaMenuSubitemDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         *
         */
        this.keyDown = new EventEmitter();
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
        this.keyDown.emit(event);
    }
    /**
     * @hidden
     * @return {?}
     */
    focus() {
        this.link.focus();
    }
    /**
     * @hidden
     * @return {?}
     */
    click() {
        this.link.click();
    }
}
MegaMenuSubitemDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-mega-menu-subitem]'
            },] }
];
MegaMenuSubitemDirective.propDecorators = {
    fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__subitem',] }],
    link: [{ type: ContentChild, args: [MegaMenuSublinkDirective,] }],
    keyDown: [{ type: Output }],
    handleKeyboardEvent: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuSubitemDirective.prototype.fdMegaMenuClass;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuSubitemDirective.prototype.link;
    /**
     *
     * @type {?}
     */
    MegaMenuSubitemDirective.prototype.keyDown;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LXN1Yml0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtc3ViaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7OztBQWN6RSxNQUFNLE9BQU8sd0JBQXdCO0lBSnJDOzs7O1FBT0ksb0JBQWUsR0FBWSxJQUFJLENBQUM7Ozs7UUFRdkIsWUFBTyxHQUFnQyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWlCdEYsQ0FBQzs7Ozs7O0lBYkcsbUJBQW1CLENBQUMsS0FBb0I7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFHTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUdNLEtBQUs7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQS9CSixTQUFTLFNBQUM7O2dCQUVQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs4QkFHSSxXQUFXLFNBQUMsNkJBQTZCO21CQUl6QyxZQUFZLFNBQUMsd0JBQXdCO3NCQUlyQyxNQUFNO2tDQUlOLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUFabkMsbURBQ2dDOzs7OztJQUdoQyx3Q0FDK0I7Ozs7O0lBRy9CLDJDQUNrRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmYXVsdE1lbnVJdGVtIH0gZnJvbSAnLi4vbWVudS9kZWZhdWx0LW1lbnUtaXRlbSc7XG5pbXBvcnQgeyBNZWdhTWVudVN1YmxpbmtEaXJlY3RpdmUgfSBmcm9tICcuL21lZ2EtbWVudS1zdWJsaW5rLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogIERpcmVjdGl2ZSByZXByZXNlbnRzIG1lZ2EgbWVudSBzdWJpdGVtLCB3aGljaCBjYW4gY29udGFpbiBzdWJsaW5rLlxuICogIGBgYGh0bWxcbiAqIDxsaSBmZC1tZWdhLW1lbnUtc3ViaXRlbT5cbiAqICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMjwvYT5cbiAqIDwvbGk+XG4gKiAgYGBgXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLW1lZ2EtbWVudS1zdWJpdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVTdWJpdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgRGVmYXVsdE1lbnVJdGVtIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbWVnYS1tZW51X19zdWJpdGVtJylcbiAgICBmZE1lZ2FNZW51Q2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSlcbiAgICBsaW5rOiBNZWdhTWVudVN1YmxpbmtEaXJlY3RpdmU7XG5cbiAgICAvKiogKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBrZXlEb3duOiBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIGhhbmRsZUtleWJvYXJkRXZlbnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5rZXlEb3duLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmsuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHB1YmxpYyBjbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rLmNsaWNrKCk7XG4gICAgfVxufVxuIl19