/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, ViewEncapsulation, Input } from '@angular/core';
/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
export class TokenComponent {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        if (this.contentContainer && !this.disabled) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit();
            }
        }
    }
}
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
TokenComponent.ctorParameters = () => [
    { type: ElementRef }
];
TokenComponent.propDecorators = {
    contentContainer: [{ type: ViewChild, args: ['contentContainer',] }],
    disabled: [{ type: Input }],
    onCloseClick: [{ type: Output }],
    clickHandler: [{ type: HostListener, args: ['click', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3Rva2VuL3Rva2VuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFpQi9ILE1BQU0sT0FBTyxjQUFjOzs7OztJQWV2QixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBUHJDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJakIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUlyRSxDQUFDOzs7Ozs7SUFJRCxZQUFZLENBQUMsS0FBSztRQUNkLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDNUI7U0FDSjtJQUNMLENBQUM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLDJHQUFxQztnQkFFckMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxVQUFVO29CQUNqQiw0QkFBNEIsRUFBRSxVQUFVO29CQUN4QyxNQUFNLEVBQUUsUUFBUTtpQkFDbkI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBaEJtQixVQUFVOzs7K0JBb0J6QixTQUFTLFNBQUMsa0JBQWtCO3VCQUk1QixLQUFLOzJCQUlMLE1BQU07MkJBUU4sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQWhCakMsMENBQzZCOzs7OztJQUc3QixrQ0FDMEI7Ozs7O0lBRzFCLHNDQUNxRTs7Ozs7SUFHekQsK0JBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEEgdG9rZW4gaXMgdXNlZCB0byByZXByZXNlbnQgY29udGV4dHVhbGl6aW5nIGluZm9ybWF0aW9uLlxuICogVGhleSBjYW4gYmUgdXNlZnVsIHRvIHNob3cgYXBwbGllZCBmaWx0ZXJzLCBzZWxlY3RlZCB2YWx1ZXMgZm9yIGZvcm0gZmllbGRzIG9yIG9iamVjdCBtZXRhZGF0YS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10b2tlbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rva2VuLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2tlbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdmZC10b2tlbicsXG4gICAgICAgICdbY2xhc3MuZmQtdG9rZW5fX2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgICAgICdyb2xlJzogJ2J1dHRvbidcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVG9rZW5Db21wb25lbnQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdjb250ZW50Q29udGFpbmVyJylcbiAgICBjb250ZW50Q29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRva2VuIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFbWl0dGVkIHdoZW4gdGhlICp4KiBpY29uIGlzIGNsaWNrZWQuIFNwZWNpZmljYWxseSwgYW55IHBzZXVkby1lbGVtZW50LiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uQ2xvc2VDbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRDb250YWluZXIgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAhdGhpcy5jb250ZW50Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZUNsaWNrLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbiJdfQ==