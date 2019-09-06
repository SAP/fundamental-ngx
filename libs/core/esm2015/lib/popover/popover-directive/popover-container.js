/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import focusTrap from 'focus-trap';
/**
 * Not intended for external use.
 */
export class PopoverContainer {
    /**
     * @param {?} elRef
     * @param {?} cdRef
     */
    constructor(elRef, cdRef) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.noArrow = true;
        this.isSetup = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.content instanceof TemplateRef) {
            this.loadFromTemplate(this.content);
        }
        else {
            this.contentString = this.content;
        }
        this.setupFocusTrap();
        this.isSetup.emit();
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    loadFromTemplate(content) {
        this.containerRef.clear();
        /** @type {?} */
        const context = {
            $implicit: this.context
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }
    /**
     * @private
     * @return {?}
     */
    setupFocusTrap() {
        if (this.focusTrapped) {
            try {
                this.focusTrap = focusTrap(this.elRef.nativeElement, {
                    clickOutsideDeactivates: true,
                    escapeDeactivates: false,
                    initialFocus: this.elRef.nativeElement
                });
                this.focusTrap.activate();
            }
            catch (e) {
                console.warn('Attempted to focus trap the popover, but no tabbable elements were found.');
            }
        }
    }
    /**
     * @return {?}
     */
    escapeHandler() {
        if (this.containerRef && this.context.isOpen && this.closeOnEscapeKey) {
            this.context.close();
        }
    }
}
PopoverContainer.decorators = [
    { type: Component, args: [{
                selector: 'fd-popover-container',
                template: `
        <span class="fd-popover__arrow" x-arrow></span>
        <ng-container #vc>
            {{contentString}}
        </ng-container>
    `,
                host: {
                    class: 'fd-popover__popper fd-popover-container-custom',
                    'tabindex': '-1'
                },
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-popover-container-custom{z-index:1000;transition:none;background-color:#fff}.fd-popover-container-custom:focus{outline:0}"]
            }] }
];
/** @nocollapse */
PopoverContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
PopoverContainer.propDecorators = {
    containerRef: [{ type: ViewChild, args: ['vc', { read: ViewContainerRef },] }],
    noArrow: [{ type: HostBinding, args: ['class.fd-popover__popper--no-arrow',] }],
    isSetup: [{ type: Output }],
    escapeHandler: [{ type: HostListener, args: ['keydown.escape',] }]
};
if (false) {
    /** @type {?} */
    PopoverContainer.prototype.containerRef;
    /** @type {?} */
    PopoverContainer.prototype.noArrow;
    /** @type {?} */
    PopoverContainer.prototype.isSetup;
    /** @type {?} */
    PopoverContainer.prototype.content;
    /** @type {?} */
    PopoverContainer.prototype.contentString;
    /** @type {?} */
    PopoverContainer.prototype.context;
    /** @type {?} */
    PopoverContainer.prototype.placement;
    /** @type {?} */
    PopoverContainer.prototype.focusTrapped;
    /** @type {?} */
    PopoverContainer.prototype.closeOnEscapeKey;
    /**
     * @type {?}
     * @private
     */
    PopoverContainer.prototype.componentRef;
    /**
     * @type {?}
     * @private
     */
    PopoverContainer.prototype.focusTrap;
    /**
     * @type {?}
     * @private
     */
    PopoverContainer.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PopoverContainer.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250YWluZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILGlCQUFpQixFQUNqQixTQUFTLEVBQUUsVUFBVSxFQUNyQixZQUFZLEVBQUUsV0FBVyxFQUN6QixZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7Ozs7QUFvQm5DLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7O0lBMEJ6QixZQUFvQixLQUFpQixFQUNqQixLQUF3QjtRQUR4QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBckI1QyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO0lBbUJ4QyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLE9BQU8sWUFBWSxXQUFXLEVBQUU7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsT0FBeUI7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Y0FDcEIsT0FBTyxHQUFHO1lBQ1osU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7OztJQUVPLGNBQWM7UUFDbEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7b0JBQ2pELHVCQUF1QixFQUFFLElBQUk7b0JBQzdCLGlCQUFpQixFQUFFLEtBQUs7b0JBQ3hCLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7aUJBQ3pDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO2FBQzdGO1NBQ0o7SUFDTCxDQUFDOzs7O0lBR0QsYUFBYTtRQUNULElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7OztZQTFGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7OztLQUtUO2dCQUVELElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsZ0RBQWdEO29CQUN2RCxVQUFVLEVBQUUsSUFBSTtpQkFDbkI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBNUJjLFVBQVU7WUFEckIsaUJBQWlCOzs7MkJBZ0NoQixTQUFTLFNBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO3NCQUcxQyxXQUFXLFNBQUMsb0NBQW9DO3NCQUdoRCxNQUFNOzRCQThETixZQUFZLFNBQUMsZ0JBQWdCOzs7O0lBcEU5Qix3Q0FDK0I7O0lBRS9CLG1DQUN3Qjs7SUFFeEIsbUNBQ3dDOztJQUV4QyxtQ0FBbUM7O0lBRW5DLHlDQUFzQjs7SUFFdEIsbUNBQWE7O0lBRWIscUNBQWtCOztJQUVsQix3Q0FBc0I7O0lBRXRCLDRDQUEwQjs7Ozs7SUFFMUIsd0NBQTJDOzs7OztJQUMzQyxxQ0FBdUI7Ozs7O0lBRVgsaUNBQXlCOzs7OztJQUN6QixpQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZm9jdXNUcmFwIGZyb20gJ2ZvY3VzLXRyYXAnO1xuXG4vKipcbiAqIE5vdCBpbnRlbmRlZCBmb3IgZXh0ZXJuYWwgdXNlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXBvcG92ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZkLXBvcG92ZXJfX2Fycm93XCIgeC1hcnJvdz48L3NwYW4+XG4gICAgICAgIDxuZy1jb250YWluZXIgI3ZjPlxuICAgICAgICAgICAge3tjb250ZW50U3RyaW5nfX1cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLWNvbnRhaW5lci5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLXBvcG92ZXJfX3BvcHBlciBmZC1wb3BvdmVyLWNvbnRhaW5lci1jdXN0b20nLFxuICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250YWluZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgndmMnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSlcbiAgICBjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXBvcG92ZXJfX3BvcHBlci0tbm8tYXJyb3cnKVxuICAgIG5vQXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgaXNTZXR1cCA9IG5ldyBFdmVudEVtaXR0ZXI8dW5kZWZpbmVkPigpO1xuXG4gICAgY29udGVudDogVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZztcblxuICAgIGNvbnRlbnRTdHJpbmc6IHN0cmluZztcblxuICAgIGNvbnRleHQ6IGFueTtcblxuICAgIHBsYWNlbWVudDogc3RyaW5nO1xuXG4gICAgZm9jdXNUcmFwcGVkOiBib29sZWFuO1xuXG4gICAgY2xvc2VPbkVzY2FwZUtleTogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgY29tcG9uZW50UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICBwcml2YXRlIGZvY3VzVHJhcDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRGcm9tVGVtcGxhdGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFN0cmluZyA9IHRoaXMuY29udGVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldHVwRm9jdXNUcmFwKCk7XG4gICAgICAgIHRoaXMuaXNTZXR1cC5lbWl0KCk7XG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZyb21UZW1wbGF0ZShjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMuY29udGV4dFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZW50LCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwRm9jdXNUcmFwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXBwZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAgPSBmb2N1c1RyYXAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBlc2NhcGVEZWFjdGl2YXRlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxGb2N1czogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0F0dGVtcHRlZCB0byBmb2N1cyB0cmFwIHRoZSBwb3BvdmVyLCBidXQgbm8gdGFiYmFibGUgZWxlbWVudHMgd2VyZSBmb3VuZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjYXBlJylcbiAgICBlc2NhcGVIYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXJSZWYgJiYgdGhpcy5jb250ZXh0LmlzT3BlbiAmJiB0aGlzLmNsb3NlT25Fc2NhcGVLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19