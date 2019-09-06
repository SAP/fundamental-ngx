/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, TemplateRef, Optional, Output, EventEmitter, ViewEncapsulation, HostListener, NgZone } from '@angular/core';
import { alertFadeNgIf } from './alert-utils/alert-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { AlertRef } from './alert-utils/alert-ref';
/** @type {?} */
var alertUniqueId = 0;
/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
var AlertComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AlertComponent, _super);
    /** @hidden */
    function AlertComponent(elRef, cdRef, componentFactoryResolver, ngZone, alertRef) {
        var _this = _super.call(this, elRef) || this;
        _this.elRef = elRef;
        _this.cdRef = cdRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.ngZone = ngZone;
        _this.alertRef = alertRef;
        /**
         * Whether the alert is dismissible.
         */
        _this.dismissible = true;
        /**
         * Id for the alert component. If omitted, a unique one is generated.
         */
        _this.id = 'fd-alert-' + alertUniqueId++;
        /**
         * Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite.
         */
        _this.duration = 10000;
        /**
         * Whether the alert should stay open if the mouse is hovering over it.
         */
        _this.mousePersist = false;
        /**
         * Id of the element that labels the alert.
         */
        _this.ariaLabelledBy = null;
        /**
         * Aria label for the alert component element.
         */
        _this.ariaLabel = null;
        /**
         * Aria label for the dismiss button.
         */
        _this.dismissLabel = 'Dismiss';
        /**
         * Event fired when the alert is dismissed.
         */
        _this.onDismiss = new EventEmitter();
        /**
         * @hidden
         */
        _this.mouseInAlert = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AlertComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.alertRef) {
            this.open();
        }
        this._setProperties();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AlertComponent.prototype.ngAfterViewInit = /**
     * @hidden
     * @return {?}
     */
    function () {
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
    };
    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param manualDismiss Set to true to skip the dismiss animation.
     * @param reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     */
    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param {?=} reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     * @param {?=} manualDismiss Set to true to skip the dismiss animation.
     * @return {?}
     */
    AlertComponent.prototype.dismiss = /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param {?=} reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     * @param {?=} manualDismiss Set to true to skip the dismiss animation.
     * @return {?}
     */
    function (reason, manualDismiss) {
        if (manualDismiss === void 0) { manualDismiss = false; }
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
    };
    /**
     * Opens the alert.
     */
    /**
     * Opens the alert.
     * @return {?}
     */
    AlertComponent.prototype.open = /**
     * Opens the alert.
     * @return {?}
     */
    function () {
        var _this = this;
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
            function () {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (_this.mousePersist) {
                        /** @type {?} */
                        var wait_1 = (/**
                         * @return {?}
                         */
                        function () {
                            if (_this.mouseInAlert === true) {
                                setTimeout(wait_1, 500);
                            }
                            else {
                                _this.ngZone.run((/**
                                 * @return {?}
                                 */
                                function () { return _this.dismiss(); }));
                            }
                        });
                        wait_1();
                    }
                    else {
                        _this.ngZone.run((/**
                         * @return {?}
                         */
                        function () { return _this.dismiss(); }));
                    }
                }), _this.duration);
            }));
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    AlertComponent.prototype.handleAlertMouseEvent = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        }
        else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AlertComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-alert');
        if (this.type) {
            this._addClassToElement('fd-alert--' + this.type);
        }
        if (this.dismissible) {
            this._addClassToElement('fd-alert--dismissible');
        }
    };
    /**
     * @private
     * @param {?} template
     * @return {?}
     */
    AlertComponent.prototype.loadFromTemplate = /**
     * @private
     * @param {?} template
     * @return {?}
     */
    function (template) {
        /** @type {?} */
        var context = {
            $implicit: this.alertRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(template, context);
    };
    /**
     * @private
     * @param {?} componentType
     * @return {?}
     */
    AlertComponent.prototype.loadFromComponent = /**
     * @private
     * @param {?} componentType
     * @return {?}
     */
    function (componentType) {
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    };
    /**
     * @private
     * @param {?} contentString
     * @return {?}
     */
    AlertComponent.prototype.loadFromString = /**
     * @private
     * @param {?} contentString
     * @return {?}
     */
    function (contentString) {
        this.containerRef.clear();
        this.message = contentString;
    };
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
    AlertComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: NgZone },
        { type: AlertRef, decorators: [{ type: Optional }] }
    ]; };
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
    return AlertComponent;
}(AbstractFdNgxClass));
export { AlertComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUV4QixJQUFJLEVBRUosZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxRQUFRLEVBRVIsTUFBTSxFQUNOLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUN4RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztJQUUvQyxhQUFhLEdBQVcsQ0FBQzs7Ozs7QUFNN0I7SUFrQm9DLDBDQUFrQjtJQStEbEQsY0FBYztJQUNkLHdCQUFvQixLQUFpQixFQUNqQixLQUF3QixFQUN4Qix3QkFBa0QsRUFDbEQsTUFBYyxFQUNGLFFBQWtCO1FBSmxELFlBS0ksa0JBQU0sS0FBSyxDQUFDLFNBQ2Y7UUFObUIsV0FBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixXQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4Qiw4QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELFlBQU0sR0FBTixNQUFNLENBQVE7UUFDRixjQUFRLEdBQVIsUUFBUSxDQUFVOzs7O1FBNURsRCxpQkFBVyxHQUFZLElBQUksQ0FBQzs7OztRQVE1QixRQUFFLEdBQVcsV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDOzs7O1FBSTNDLGNBQVEsR0FBVyxLQUFLLENBQUM7Ozs7UUFJekIsa0JBQVksR0FBWSxLQUFLLENB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QUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7OEJBSS9DLEtBQUs7dUJBSUwsS0FBSztxQkFJTCxLQUFLOzJCQUlMLEtBQUs7K0JBSUwsS0FBSztpQ0FJTCxLQUFLOzRCQUlMLEtBQUs7K0JBSUwsS0FBSzt3QkFJTCxLQUFLOzJCQUlMLEtBQUs7MEJBSUwsS0FBSzs0QkFJTCxNQUFNO3dDQWtHTixZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQ3JDLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBc0MxQyxxQkFBQztDQUFBLEFBOU1ELENBa0JvQyxrQkFBa0IsR0E0THJEO1NBNUxZLGNBQWM7Ozs7OztJQUd2QixzQ0FDK0I7Ozs7O0lBRy9CLHFDQUM0Qjs7Ozs7SUFHNUIsOEJBQ2E7Ozs7O0lBR2IsNEJBQzJDOzs7OztJQUczQyxrQ0FDeUI7Ozs7O0lBR3pCLHNDQUM4Qjs7Ozs7SUFHOUIsd0NBQzhCOzs7OztJQUc5QixtQ0FDeUI7Ozs7O0lBR3pCLHNDQUNpQzs7Ozs7SUFHakMsK0JBQ2M7Ozs7O0lBR2Qsa0NBQ2lCOzs7OztJQUdqQixpQ0FDZ0I7Ozs7O0lBR2hCLG1DQUNtRTs7Ozs7SUFHbkUsc0NBQThCOzs7OztJQUc5QixzQ0FBdUQ7Ozs7O0lBR3ZELDRDQUEwRDs7Ozs7SUFHOUMsK0JBQXlCOzs7OztJQUN6QiwrQkFBZ0M7Ozs7O0lBQ2hDLGtEQUEwRDs7Ozs7SUFDMUQsZ0NBQXNCOzs7OztJQUN0QixrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBUeXBlLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgVmlld0NvbnRhaW5lclJlZixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBPcHRpb25hbCxcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RMaXN0ZW5lciwgTmdab25lXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYWxlcnRGYWRlTmdJZiB9IGZyb20gJy4vYWxlcnQtdXRpbHMvYWxlcnQtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuaW1wb3J0IHsgQWxlcnRSZWYgfSBmcm9tICcuL2FsZXJ0LXV0aWxzL2FsZXJ0LXJlZic7XG5cbmxldCBhbGVydFVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGFuIGFsZXJ0LiBJdCBjYW4gYmUgb25seSBiZSB1c2VkIGlubGluZS5cbiAqIElmIHRoZSBBbGVydFNlcnZpY2UgaXMgdXNlZCwgdGhpcyBjb21wb25lbnQgaXMgYXV0by1nZW5lcmF0ZWQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtYWxlcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYWxlcnQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbGxlZEJ5JyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ2FyaWFMYWJlbCcsXG4gICAgICAgICdbc3R5bGUud2lkdGhdJzogJ3dpZHRoJyxcbiAgICAgICAgJ1tzdHlsZS5taW4td2lkdGhdJzogJ21pbldpZHRoJyxcbiAgICAgICAgJ3JvbGUnOiAnYWxlcnQnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1tAZmFkZUFsZXJ0TmdJZl0nOiAnJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBhbGVydEZhZGVOZ0lmXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KVxuICAgIGNvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBhbGVydCBpcyBkaXNtaXNzaWJsZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc21pc3NpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgdHlwZSBvZiB0aGUgYWxlcnQuIENhbiBiZSBvbmUgb2YgKndhcm5pbmcqLCAqc3VjY2VzcyosICppbmZvcm1hdGlvbiosICplcnJvciogb3IgbnVsbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKiBJZCBmb3IgdGhlIGFsZXJ0IGNvbXBvbmVudC4gSWYgb21pdHRlZCwgYSB1bmlxdWUgb25lIGlzIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmcgPSAnZmQtYWxlcnQtJyArIGFsZXJ0VW5pcXVlSWQrKztcblxuICAgIC8qKiBEdXJhdGlvbiBvZiB0aW1lICppbiBtaWxsaXNlY29uZHMqIHRoYXQgdGhlIGFsZXJ0IHdpbGwgYmUgdmlzaWJsZS4gU2V0IHRvIC0xIGZvciBpbmRlZmluaXRlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHVyYXRpb246IG51bWJlciA9IDEwMDAwO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGFsZXJ0IHNob3VsZCBzdGF5IG9wZW4gaWYgdGhlIG1vdXNlIGlzIGhvdmVyaW5nIG92ZXIgaXQuICovXG4gICAgQElucHV0KClcbiAgICBtb3VzZVBlcnNpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJZCBvZiB0aGUgZWxlbWVudCB0aGF0IGxhYmVscyB0aGUgYWxlcnQuICovXG4gICAgQElucHV0KClcbiAgICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgYWxlcnQgY29tcG9uZW50IGVsZW1lbnQuICovXG4gICAgQElucHV0KClcbiAgICBhcmlhTGFiZWw6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGRpc21pc3MgYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzbWlzc0xhYmVsOiBzdHJpbmcgPSAnRGlzbWlzcyc7XG5cbiAgICAvKiogV2lkdGggb2YgdGhlIGFsZXJ0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgd2lkdGg6IHN0cmluZztcblxuICAgIC8qKiBNaW5pbXVtIHdpZHRoIG9mIHRoZSBhbGVydC4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1pbldpZHRoOiBzdHJpbmc7XG5cbiAgICAvKiogQWx0ZXJuYXRpdmUgd2F5IG9mIHBhc3NpbmcgaW4gYSBtZXNzYWdlIHRvIHRoZSBhbGVydC4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIC8qKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBhbGVydCBpcyBkaXNtaXNzZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgb25EaXNtaXNzOiBFdmVudEVtaXR0ZXI8dW5kZWZpbmVkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dW5kZWZpbmVkPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBtb3VzZUluQWxlcnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiB8IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjaGlsZENvbXBvbmVudFR5cGU6IFR5cGU8YW55PiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgYWxlcnRSZWY6IEFsZXJ0UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsUmVmKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hbGVydFJlZikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0UHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRGcm9tQ29tcG9uZW50KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGlsZENvbXBvbmVudFR5cGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZyb21UZW1wbGF0ZSh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZyb21TdHJpbmcodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNtaXNzZXMgdGhlIGFsZXJ0LiBJZiB0aGUgYWxlcnQgd2FzIGdlbmVyYXRlZCB2aWEgdGhlIEFsZXJ0U2VydmljZSwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00uXG4gICAgICogT3RoZXJ3aXNlLCBpdCBzZXRzIHRoZSBkaXNwbGF5IHZhbHVlIHRvIG5vbmUuIEZpcmVzIHRoZSBvbkRpc21pc3MgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWFudWFsRGlzbWlzcyBTZXQgdG8gdHJ1ZSB0byBza2lwIHRoZSBkaXNtaXNzIGFuaW1hdGlvbi5cbiAgICAgKiBAcGFyYW0gcmVhc29uIERhdGEgdG8gcGFzcyBiYWNrIHRvIHRoZSBjYWxsaW5nIGNvbXBvbmVudC4gT25seSB1c2FibGUgaWYgYWxlcnQgaXMgb3BlbmVkIHVzaW5nIHRoZSBTZXJ2aWNlLlxuICAgICAqXG4gICAgICovXG4gICAgZGlzbWlzcyhyZWFzb24/OiBhbnksIG1hbnVhbERpc21pc3M6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBpZiAobWFudWFsRGlzbWlzcykge1xuICAgICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZkLWhhcy1kaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmZC1oYXMtZGlzcGxheS1ibG9jaycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFsZXJ0UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0UmVmLmRpc21pc3MocmVhc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmZC1oYXMtZGlzcGxheS1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmQtaGFzLWRpc3BsYXktYmxvY2snKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRGlzbWlzcy5lbWl0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIGFsZXJ0LlxuICAgICAqL1xuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hbGVydFJlZikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZkLWhhcy1kaXNwbGF5LW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmZC1oYXMtZGlzcGxheS1ibG9jaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHVyYXRpb24gPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3VzZVBlcnNpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VJbkFsZXJ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQod2FpdCwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5kaXNtaXNzKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlQWxlcnRNb3VzZUV2ZW50KGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2VlbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VJbkFsZXJ0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VJbkFsZXJ0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYWxlcnQnKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWFsZXJ0LS0nICsgdGhpcy50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNtaXNzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWFsZXJ0LS1kaXNtaXNzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRnJvbVRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAgICAgICAkaW1wbGljaXQ6IHRoaXMuYWxlcnRSZWZcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGUsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEZyb21Db21wb25lbnQoY29tcG9uZW50VHlwZTogVHlwZTxhbnk+KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRUeXBlKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRnJvbVN0cmluZyhjb250ZW50U3RyaW5nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gY29udGVudFN0cmluZztcbiAgICB9XG5cbn1cbiJdfQ==