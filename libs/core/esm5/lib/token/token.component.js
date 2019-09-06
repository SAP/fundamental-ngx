/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, ViewEncapsulation, Input } from '@angular/core';
/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
var TokenComponent = /** @class */ (function () {
    /** @hidden */
    function TokenComponent(elRef) {
        this.elRef = elRef;
        /**
         * Whether the token is disabled.
         */
        this.disabled = false;
        /**
         * Emitted when the *x* icon is clicked. Specifically, any pseudo-element.
         */
        this.onCloseClick = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    TokenComponent.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.contentContainer && !this.disabled) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit();
            }
        }
    };
    TokenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-token',
                    template: "<span class=\"fd-token-content\" #contentContainer>\n    <ng-content></ng-content>\n</span>\n\n",
                    host: {
                        class: 'fd-token',
                        '[class.fd-token__disabled]': 'disabled',
                        'role': 'button'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-token-content{display:inline-block}.fd-token__disabled::after{cursor:not-allowed}"]
                }] }
    ];
    /** @nocollapse */
    TokenComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TokenComponent.propDecorators = {
        contentContainer: [{ type: ViewChild, args: ['contentContainer',] }],
        disabled: [{ type: Input }],
        onCloseClick: [{ type: Output }],
        clickHandler: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return TokenComponent;
}());
export { TokenComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TokenComponent.prototype.contentContainer;
    /**
     * Whether the token is disabled.
     * @type {?}
     */
    TokenComponent.prototype.disabled;
    /**
     * Emitted when the *x* icon is clicked. Specifically, any pseudo-element.
     * @type {?}
     */
    TokenComponent.prototype.onCloseClick;
    /**
     * @type {?}
     * @private
     */
    TokenComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3Rva2VuL3Rva2VuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNL0g7SUF5QkksY0FBYztJQUNkLHdCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBUHJDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJakIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUlyRSxDQUFDO0lBRUQsY0FBYzs7Ozs7O0lBRWQscUNBQVk7Ozs7O0lBRFosVUFDYSxLQUFLO1FBQ2QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDaEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM1QjtTQUNKO0lBQ0wsQ0FBQzs7Z0JBckNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsMkdBQXFDO29CQUVyQyxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLDRCQUE0QixFQUFFLFVBQVU7d0JBQ3hDLE1BQU0sRUFBRSxRQUFRO3FCQUNuQjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7O2dCQWhCbUIsVUFBVTs7O21DQW9CekIsU0FBUyxTQUFDLGtCQUFrQjsyQkFJNUIsS0FBSzsrQkFJTCxNQUFNOytCQVFOLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBU3JDLHFCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7U0E1QlksY0FBYzs7Ozs7O0lBR3ZCLDBDQUM2Qjs7Ozs7SUFHN0Isa0NBQzBCOzs7OztJQUcxQixzQ0FDcUU7Ozs7O0lBR3pELCtCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIHRva2VuIGlzIHVzZWQgdG8gcmVwcmVzZW50IGNvbnRleHR1YWxpemluZyBpbmZvcm1hdGlvbi5cbiAqIFRoZXkgY2FuIGJlIHVzZWZ1bCB0byBzaG93IGFwcGxpZWQgZmlsdGVycywgc2VsZWN0ZWQgdmFsdWVzIGZvciBmb3JtIGZpZWxkcyBvciBvYmplY3QgbWV0YWRhdGEuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdG9rZW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90b2tlbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9rZW4uY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtdG9rZW4nLFxuICAgICAgICAnW2NsYXNzLmZkLXRva2VuX19kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAncm9sZSc6ICdidXR0b24nXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRva2VuQ29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgnY29udGVudENvbnRhaW5lcicpXG4gICAgY29udGVudENvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2tlbiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSAqeCogaWNvbiBpcyBjbGlja2VkLiBTcGVjaWZpY2FsbHksIGFueSBwc2V1ZG8tZWxlbWVudC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvbkNsb3NlQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50Q29udGFpbmVyICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiYgIXRoaXMuY29udGVudENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2VDbGljay5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4iXX0=