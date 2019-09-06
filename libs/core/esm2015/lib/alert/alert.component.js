/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, TemplateRef, Optional, Output, EventEmitter, ViewEncapsulation, HostListener, NgZone } from '@angular/core';
import { alertFadeNgIf } from './alert-utils/alert-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { AlertRef } from './alert-utils/alert-ref';
/** @type {?} */
let alertUniqueId = 0;
/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
export class AlertComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} cdRef
     * @param {?} componentFactoryResolver
     * @param {?} ngZone
     * @param {?} alertRef
     */
    constructor(elRef, cdRef, componentFactoryResolver, ngZone, alertRef) {
        super(elRef);
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.ngZone = ngZone;
        this.alertRef = alertRef;
        /**
         * Whether the alert is dismissible.
         */
        this.dismissible = true;
        /**
         * Id for the alert component. If omitted, a unique one is generated.
         */
        this.id = 'fd-alert-' + alertUniqueId++;
        /**
         * Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite.
         */
        this.duration = 10000;
        /**
         * Whether the alert should stay open if the mouse is hovering over it.
         */
        this.mousePersist = false;
        /**
         * Id of the element that labels the alert.
         */
        this.ariaLabelledBy = null;
        /**
         * Aria label for the alert component element.
         */
        this.ariaLabel = null;
        /**
         * Aria label for the dismiss button.
         */
        this.dismissLabel = 'Dismiss';
        /**
         * Event fired when the alert is dismissed.
         */
        this.onDismiss = new EventEmitter();
        /**
         * @hidden
         */
        this.mouseInAlert = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.alertRef) {
            this.open();
        }
        this._setProperties();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadFromComponent(this.childComponentType);
            }
            else if (this.childComponentType instanceof TemplateRef) {
                this.loadFromTemplate(this.childComponentType);
            }
            else {
                this.loadFromString(this.childComponentType);
            }
            this.cdRef.detectChanges();
        }
    }
    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param {?=} reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     * @param {?=} manualDismiss Set to true to skip the dismiss animation.
     * @return {?}
     */
    dismiss(reason, manualDismiss = false) {
        if (manualDismiss) {
            this.elRef.nativeElement.classList.add('fd-has-display-none');
            this.elRef.nativeElement.classList.remove('fd-has-display-block');
        }
        if (this.alertRef) {
            this.alertRef.dismiss(reason);
        }
        else {
            this.elRef.nativeElement.classList.add('fd-has-display-none');
            this.elRef.nativeElement.classList.remove('fd-has-display-block');
        }
        this.onDismiss.emit();
    }
    /**
     * Opens the alert.
     * @return {?}
     */
    open() {
        if (!this.alertRef) {
            if (this.elRef.nativeElement.style.display === 'block') {
                return;
            }
            this.elRef.nativeElement.classList.remove('fd-has-display-none');
            this.elRef.nativeElement.classList.add('fd-has-display-block');
        }
        if (this.duration >= 0) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (this.mousePersist) {
                        /** @type {?} */
                        const wait = (/**
                         * @return {?}
                         */
                        () => {
                            if (this.mouseInAlert === true) {
                                setTimeout(wait, 500);
                            }
                            else {
                                this.ngZone.run((/**
                                 * @return {?}
                                 */
                                () => this.dismiss()));
                            }
                        });
                        wait();
                    }
                    else {
                        this.ngZone.run((/**
                         * @return {?}
                         */
                        () => this.dismiss()));
                    }
                }), this.duration);
            }));
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    handleAlertMouseEvent(event) {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        }
        else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-alert');
        if (this.type) {
            this._addClassToElement('fd-alert--' + this.type);
        }
        if (this.dismissible) {
            this._addClassToElement('fd-alert--dismissible');
        }
    }
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    loadFromTemplate(template) {
        /** @type {?} */
        const context = {
            $implicit: this.alertRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(template, context);
    }
    /**
     * @private
     * @param {?} componentType
     * @return {?}
     */
    loadFromComponent(componentType) {
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }
    /**
     * @private
     * @param {?} contentString
     * @return {?}
     */
    loadFromString(contentString) {
        this.containerRef.clear();
        this.message = contentString;
    }
}
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-alert',
                template: "<button class=\"fd-alert__close\"\n        *ngIf=\"dismissible\"\n        (click)=\"dismiss(undefined, true)\"\n        [attr.aria-controls]=\"id\"\n        [attr.aria-label]=\"dismissLabel\">\n</button>\n<ng-container #container>{{message}}</ng-container>\n<ng-content></ng-content>\n",
                host: {
                    '[attr.aria-labelledby]': 'ariaLabelledBy',
                    '[attr.aria-label]': 'ariaLabel',
                    '[style.width]': 'width',
                    '[style.min-width]': 'minWidth',
                    'role': 'alert',
                    '[attr.id]': 'id',
                    '[@fadeAlertNgIf]': ''
                },
                animations: [
                    alertFadeNgIf
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-alert{display:block}"]
            }] }
];
/** @nocollapse */
AlertComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: NgZone },
    { type: AlertRef, decorators: [{ type: Optional }] }
];
AlertComponent.propDecorators = {
    containerRef: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    dismissible: [{ type: Input }],
    type: [{ type: Input }],
    id: [{ type: Input }],
    duration: [{ type: Input }],
    mousePersist: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    dismissLabel: [{ type: Input }],
    width: [{ type: Input }],
    minWidth: [{ type: Input }],
    message: [{ type: Input }],
    onDismiss: [{ type: Output }],
    handleAlertMouseEvent: [{ type: HostListener, args: ['mouseenter', ['$event'],] }, { type: HostListener, args: ['mouseleave', ['$event'],] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    AlertComponent.prototype.containerRef;
    /**
     * Whether the alert is dismissible.
     * @type {?}
     */
    AlertComponent.prototype.dismissible;
    /**
     * The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null.
     * @type {?}
     */
    AlertComponent.prototype.type;
    /**
     * Id for the alert component. If omitted, a unique one is generated.
     * @type {?}
     */
    AlertComponent.prototype.id;
    /**
     * Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite.
     * @type {?}
     */
    AlertComponent.prototype.duration;
    /**
     * Whether the alert should stay open if the mouse is hovering over it.
     * @type {?}
     */
    AlertComponent.prototype.mousePersist;
    /**
     * Id of the element that labels the alert.
     * @type {?}
     */
    AlertComponent.prototype.ariaLabelledBy;
    /**
     * Aria label for the alert component element.
     * @type {?}
     */
    AlertComponent.prototype.ariaLabel;
    /**
     * Aria label for the dismiss button.
     * @type {?}
     */
    AlertComponent.prototype.dismissLabel;
    /**
     * Width of the alert.
     * @type {?}
     */
    AlertComponent.prototype.width;
    /**
     * Minimum width of the alert.
     * @type {?}
     */
    AlertComponent.prototype.minWidth;
    /**
     * Alternative way of passing in a message to the alert.
     * @type {?}
     */
    AlertComponent.prototype.message;
    /**
     * Event fired when the alert is dismissed.
     * @type {?}
     */
    AlertComponent.prototype.onDismiss;
    /**
     * @hidden
     * @type {?}
     */
    AlertComponent.prototype.mouseInAlert;
    /**
     * @hidden
     * @type {?}
     */
    AlertComponent.prototype.componentRef;
    /**
     * @hidden
     * @type {?}
     */
    AlertComponent.prototype.childComponentType;
    /**
     * @type {?}
     * @private
     */
    AlertComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    AlertComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    AlertComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    AlertComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    AlertComponent.prototype.alertRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBRUwsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLElBQUksRUFFSixnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFFBQVEsRUFFUixNQUFNLEVBQ04sWUFBWSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ3hELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRS9DLGFBQWEsR0FBVyxDQUFDOzs7OztBQXdCN0IsTUFBTSxPQUFPLGNBQWUsU0FBUSxrQkFBa0I7Ozs7Ozs7OztJQWdFbEQsWUFBb0IsS0FBaUIsRUFDakIsS0FBd0IsRUFDeEIsd0JBQWtELEVBQ2xELE1BQWMsRUFDRixRQUFrQjtRQUM5QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFMRyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNGLGFBQVEsR0FBUixRQUFRLENBQVU7Ozs7UUE1RGxELGdCQUFXLEdBQVksSUFBSSxDQUFDOzs7O1FBUTVCLE9BQUUsR0FBVyxXQUFXLEdBQUcsYUFBYSxFQUFFLENBQUM7Ozs7UUFJM0MsYUFBUSxHQUFXLEtBQUssQ0FBQzs7OztRQUl6QixpQkFBWSxHQUFZ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QVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDckMsWUFBWSxTQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQW5KdEMsc0NBQytCOzs7OztJQUcvQixxQ0FDNEI7Ozs7O0lBRzVCLDhCQUNhOzs7OztJQUdiLDRCQUMyQzs7Ozs7SUFHM0Msa0NBQ3lCOzs7OztJQUd6QixzQ0FDOEI7Ozs7O0lBRzlCLHdDQUM4Qjs7Ozs7SUFHOUIsbUNBQ3lCOzs7OztJQUd6QixzQ0FDaUM7Ozs7O0lBR2pDLCtCQUNjOzs7OztJQUdkLGtDQUNpQjs7Ozs7SUFHakIsaUNBQ2dCOzs7OztJQUdoQixtQ0FDbUU7Ozs7O0lBR25FLHNDQUE4Qjs7Ozs7SUFHOUIsc0NBQXVEOzs7OztJQUd2RCw0Q0FBMEQ7Ozs7O0lBRzlDLCtCQUF5Qjs7Ozs7SUFDekIsK0JBQWdDOzs7OztJQUNoQyxrREFBMEQ7Ozs7O0lBQzFELGdDQUFzQjs7Ozs7SUFDdEIsa0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT25Jbml0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgVHlwZSxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgT3B0aW9uYWwsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0TGlzdGVuZXIsIE5nWm9uZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFsZXJ0RmFkZU5nSWYgfSBmcm9tICcuL2FsZXJ0LXV0aWxzL2FsZXJ0LWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcbmltcG9ydCB7IEFsZXJ0UmVmIH0gZnJvbSAnLi9hbGVydC11dGlscy9hbGVydC1yZWYnO1xuXG5sZXQgYWxlcnRVbmlxdWVJZDogbnVtYmVyID0gMDtcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhbiBhbGVydC4gSXQgY2FuIGJlIG9ubHkgYmUgdXNlZCBpbmxpbmUuXG4gKiBJZiB0aGUgQWxlcnRTZXJ2aWNlIGlzIHVzZWQsIHRoaXMgY29tcG9uZW50IGlzIGF1dG8tZ2VuZXJhdGVkLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWFsZXJ0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FsZXJ0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdhcmlhTGFiZWxsZWRCeScsXG4gICAgICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdhcmlhTGFiZWwnLFxuICAgICAgICAnW3N0eWxlLndpZHRoXSc6ICd3aWR0aCcsXG4gICAgICAgICdbc3R5bGUubWluLXdpZHRoXSc6ICdtaW5XaWR0aCcsXG4gICAgICAgICdyb2xlJzogJ2FsZXJ0JyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICdbQGZhZGVBbGVydE5nSWZdJzogJydcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgYWxlcnRGYWRlTmdJZlxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBbGVydENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSlcbiAgICBjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICAvKiogV2hldGhlciB0aGUgYWxlcnQgaXMgZGlzbWlzc2libGUuICovXG4gICAgQElucHV0KClcbiAgICBkaXNtaXNzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGFsZXJ0LiBDYW4gYmUgb25lIG9mICp3YXJuaW5nKiwgKnN1Y2Nlc3MqLCAqaW5mb3JtYXRpb24qLCAqZXJyb3IqIG9yIG51bGwuICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvKiogSWQgZm9yIHRoZSBhbGVydCBjb21wb25lbnQuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSBpcyBnZW5lcmF0ZWQuICovXG4gICAgQElucHV0KClcbiAgICBpZDogc3RyaW5nID0gJ2ZkLWFsZXJ0LScgKyBhbGVydFVuaXF1ZUlkKys7XG5cbiAgICAvKiogRHVyYXRpb24gb2YgdGltZSAqaW4gbWlsbGlzZWNvbmRzKiB0aGF0IHRoZSBhbGVydCB3aWxsIGJlIHZpc2libGUuIFNldCB0byAtMSBmb3IgaW5kZWZpbml0ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAxMDAwMDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBhbGVydCBzaG91bGQgc3RheSBvcGVuIGlmIHRoZSBtb3VzZSBpcyBob3ZlcmluZyBvdmVyIGl0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbW91c2VQZXJzaXN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogSWQgb2YgdGhlIGVsZW1lbnQgdGhhdCBsYWJlbHMgdGhlIGFsZXJ0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGFsZXJ0IGNvbXBvbmVudCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXJpYUxhYmVsOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSBkaXNtaXNzIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc21pc3NMYWJlbDogc3RyaW5nID0gJ0Rpc21pc3MnO1xuXG4gICAgLyoqIFdpZHRoIG9mIHRoZSBhbGVydC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHdpZHRoOiBzdHJpbmc7XG5cbiAgICAvKiogTWluaW11bSB3aWR0aCBvZiB0aGUgYWxlcnQuICovXG4gICAgQElucHV0KClcbiAgICBtaW5XaWR0aDogc3RyaW5nO1xuXG4gICAgLyoqIEFsdGVybmF0aXZlIHdheSBvZiBwYXNzaW5nIGluIGEgbWVzc2FnZSB0byB0aGUgYWxlcnQuICovXG4gICAgQElucHV0KClcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiB0aGUgYWxlcnQgaXMgZGlzbWlzc2VkLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uRGlzbWlzczogRXZlbnRFbWl0dGVyPHVuZGVmaW5lZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHVuZGVmaW5lZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbW91c2VJbkFsZXJ0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY2hpbGRDb21wb25lbnRUeXBlOiBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGFsZXJ0UmVmOiBBbGVydFJlZikge1xuICAgICAgICBzdXBlcihlbFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYWxlcnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZENvbXBvbmVudFR5cGUgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRnJvbUNvbXBvbmVudCh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hpbGRDb21wb25lbnRUeXBlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRGcm9tVGVtcGxhdGUodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRGcm9tU3RyaW5nKHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzbWlzc2VzIHRoZSBhbGVydC4gSWYgdGhlIGFsZXJ0IHdhcyBnZW5lcmF0ZWQgdmlhIHRoZSBBbGVydFNlcnZpY2UsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgICAqIE90aGVyd2lzZSwgaXQgc2V0cyB0aGUgZGlzcGxheSB2YWx1ZSB0byBub25lLiBGaXJlcyB0aGUgb25EaXNtaXNzIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hbnVhbERpc21pc3MgU2V0IHRvIHRydWUgdG8gc2tpcCB0aGUgZGlzbWlzcyBhbmltYXRpb24uXG4gICAgICogQHBhcmFtIHJlYXNvbiBEYXRhIHRvIHBhc3MgYmFjayB0byB0aGUgY2FsbGluZyBjb21wb25lbnQuIE9ubHkgdXNhYmxlIGlmIGFsZXJ0IGlzIG9wZW5lZCB1c2luZyB0aGUgU2VydmljZS5cbiAgICAgKlxuICAgICAqL1xuICAgIGRpc21pc3MocmVhc29uPzogYW55LCBtYW51YWxEaXNtaXNzOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1hbnVhbERpc21pc3MpIHtcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmZC1oYXMtZGlzcGxheS1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmQtaGFzLWRpc3BsYXktYmxvY2snKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hbGVydFJlZikge1xuICAgICAgICAgICAgdGhpcy5hbGVydFJlZi5kaXNtaXNzKHJlYXNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmQtaGFzLWRpc3BsYXktbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZkLWhhcy1kaXNwbGF5LWJsb2NrJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkRpc21pc3MuZW1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBhbGVydC5cbiAgICAgKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYWxlcnRSZWYpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmZC1oYXMtZGlzcGxheS1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmQtaGFzLWRpc3BsYXktYmxvY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VQZXJzaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3YWl0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vdXNlSW5BbGVydCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHdhaXQsIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FpdCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuZGlzbWlzcygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHRoaXMuZHVyYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBbJyRldmVudCddKVxuICAgIGhhbmRsZUFsZXJ0TW91c2VFdmVudChldmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlSW5BbGVydCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlSW5BbGVydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWFsZXJ0Jyk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1hbGVydC0tJyArIHRoaXMudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1hbGVydC0tZGlzbWlzc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZyb21UZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgJGltcGxpY2l0OiB0aGlzLmFsZXJ0UmVmXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRGcm9tQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50VHlwZSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZyb21TdHJpbmcoY29udGVudFN0cmluZzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGNvbnRlbnRTdHJpbmc7XG4gICAgfVxuXG59XG4iXX0=