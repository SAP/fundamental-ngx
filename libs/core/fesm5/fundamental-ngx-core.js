import Popper from 'popper.js';
import { animate, style, transition, trigger } from '@angular/animations';
import focusTrap from 'focus-trap';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { __extends, __spread, __assign } from 'tslib';
import { CommonModule, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Subject, fromEvent, defer, merge } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';
import { Input, Directive, ElementRef, NgModule, Component, ViewEncapsulation, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, TemplateRef, Optional, Output, EventEmitter, HostListener, NgZone, HostBinding, Injectable, ApplicationRef, Injector, ContentChild, Pipe, forwardRef, ContentChildren, isDevMode, Renderer2, ViewChildren, Inject, defineInjectable, LOCALE_ID, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 This abstract class allows the user to set their own custom styles on a Fundamental NGX directive, in addition to the
 styles the library needs to add itself.
 When library styles were added through the directive's host: {'[class]'} property, any styles the user added would be
 overwritten.  By extending this class, we instead add library styles to the user's classList rather than replace them.
 */
/**
 * @hidden
 * @abstract
 */
var AbstractFdNgxClass = /** @class */ (function () {
    /** @hidden */
    function AbstractFdNgxClass(elementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    AbstractFdNgxClass.prototype._addClassToElement = /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    function (className) {
        var _a;
        (_a = ((/** @type {?} */ (this._elementRef.nativeElement))).classList).add.apply(_a, __spread(className.split(' ')));
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    AbstractFdNgxClass.prototype._addStyleToElement = /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    function (attribute, value) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).style[attribute] = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AbstractFdNgxClass.prototype.ngOnChanges = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var classList = ((/** @type {?} */ (this._elementRef.nativeElement))).classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }
        if (this.class) {
            this._addClassToElement(this.class);
        }
        this._setProperties();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AbstractFdNgxClass.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    AbstractFdNgxClass.propDecorators = {
        class: [{ type: Input }]
    };
    return AbstractFdNgxClass;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
var ButtonDirective = /** @class */ (function (_super) {
    __extends(ButtonDirective, _super);
    /** @hidden */
    function ButtonDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    ButtonDirective.prototype._setProperties = 
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this._addClassToElement('fd-button');
        if (this.compact) {
            this._addClassToElement('fd-button--compact');
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.fdType) {
            this._addClassToElement('fd-button--' + this.fdType);
        }
        if (this.options) {
            if (typeof this.options === 'string') {
                this._addClassToElement('fd-button--' + this.options);
            }
            else if (Array.isArray(this.options)) {
                this.options.forEach((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    if (typeof option === 'string') {
                        _this._addClassToElement('fd-button--' + option);
                    }
                }));
            }
        }
    };
    ButtonDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-button]'
                },] }
    ];
    /** @nocollapse */
    ButtonDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonDirective.propDecorators = {
        compact: [{ type: Input }],
        glyph: [{ type: Input }],
        fdType: [{ type: Input }],
        semantic: [{ type: Input }],
        options: [{ type: Input }],
        size: [{ type: Input }]
    };
    return ButtonDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ButtonModule = /** @class */ (function () {
    function ButtonModule() {
    }
    ButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [ButtonDirective],
                    declarations: [ButtonDirective]
                },] }
    ];
    return ButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @hidden
 * The base class for the icon component
 * @type {?}
 */
var BASE_ICON_CLASS = 'sap-icon';
/**
 * @hidden
 * Prefix for icon prop classes
 * @type {?}
 */
var PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';
/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 * ```
 */
var IconComponent = /** @class */ (function (_super) {
    __extends(IconComponent, _super);
    /** @hidden */
    function IconComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * The size of the icon
         * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
         * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
         */
        _this.size = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    IconComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }
        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    };
    IconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-icon',
                    template: "",
                    host: {
                        role: 'presentation'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    IconComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    IconComponent.propDecorators = {
        glyph: [{ type: Input }],
        size: [{ type: Input }]
    };
    return IconComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [IconComponent],
                    declarations: [IconComponent]
                },] }
    ];
    return IconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The parent action bar directive.
 *
 * Children usage:
 * ```html
 * <div fd-action-bar-actions>
 * <div fd-action-bar-back>
 * <div fd-action-bar-description>
 * <div fd-action-bar-header>
 * <div fd-action-bar-mobile>
 * <h1 fd-action-bar-title>
 * ```
 */
var ActionBarDirective = /** @class */ (function () {
    function ActionBarDirective() {
    }
    ActionBarDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar]',
                    host: {
                        class: 'fd-action-bar'
                    }
                },] }
    ];
    return ActionBarDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The action bar title component.
 *
 * ```html
 * <fd-action-bar>
 *     <div fd-action-bar-header>
 *         <h1 fd-action-bar-title>Page Title</h1>
 *     </div>
 * <fd-action-bar>
 * ```
 */
var ActionBarTitleDirective = /** @class */ (function () {
    function ActionBarTitleDirective() {
    }
    ActionBarTitleDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-title]',
                    host: {
                        class: 'fd-action-bar__title'
                    }
                },] }
    ];
    return ActionBarTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The action bar description.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *         <div fd-action-bar-description>Page Description</div>
 *     </div>
 * <div>
 * ```
 */
var ActionBarDescriptionDirective = /** @class */ (function () {
    function ActionBarDescriptionDirective() {
    }
    ActionBarDescriptionDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-description]',
                    host: {
                        class: 'fd-action-bar__description'
                    }
                },] }
    ];
    return ActionBarDescriptionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The action bar header, which contains the action bar's title and description components.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *     </div>
 * </div>
 * ```
 */
var ActionBarHeaderDirective = /** @class */ (function () {
    function ActionBarHeaderDirective() {
    }
    ActionBarHeaderDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-header]',
                    host: {
                        class: 'fd-action-bar__header'
                    }
                },] }
    ];
    return ActionBarHeaderDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This component holds the right-aligned action buttons for the action bar.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-actions>
 *         <button fd-button [fdType]="'primary'">Cancel</button>
 *         <button fd-button [fdType]="'main'">Save</button>
 *     </div>
 * </div>
 * ```
 */
var ActionBarActionsDirective = /** @class */ (function () {
    function ActionBarActionsDirective() {
    }
    ActionBarActionsDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-actions]',
                    host: {
                        class: 'fd-action-bar__actions'
                    }
                },] }
    ];
    return ActionBarActionsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The left-aligned back button for the action bar.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-back>
 *         <button aria-label="back" fd-button [fdType]="'light'" [compact]="true" [glyph]="'nav-back'"></button>
 *     </div>
 * </div>
 * ```
 */
var ActionBarBackDirective = /** @class */ (function () {
    function ActionBarBackDirective() {
    }
    ActionBarBackDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-back]',
                    host: {
                        class: 'fd-action-bar__back'
                    }
                },] }
    ];
    return ActionBarBackDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The action bar mobile component. This component should wrap all other action bar components, including the <fd-action-bar>.
 *
 * ```html
 * <div fd-action-bar-mobile>
 *     <div fd-action-bar>
 *     </div>
 * </div>
 * ```
 */
var ActionBarMobileDirective = /** @class */ (function () {
    function ActionBarMobileDirective() {
    }
    ActionBarMobileDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-action-bar-mobile]'
                },] }
    ];
    return ActionBarMobileDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActionBarModule = /** @class */ (function () {
    function ActionBarModule() {
    }
    ActionBarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ActionBarDirective,
                        ActionBarTitleDirective,
                        ActionBarDescriptionDirective,
                        ActionBarHeaderDirective,
                        ActionBarActionsDirective,
                        ActionBarBackDirective,
                        ActionBarMobileDirective
                    ],
                    imports: [CommonModule, ButtonModule, IconModule],
                    exports: [
                        ActionBarDirective,
                        ActionBarTitleDirective,
                        ActionBarDescriptionDirective,
                        ActionBarHeaderDirective,
                        ActionBarActionsDirective,
                        ActionBarBackDirective,
                        ActionBarMobileDirective
                    ]
                },] }
    ];
    return ActionBarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var alertFadeNgIf = trigger('fadeAlertNgIf', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate('250ms ease-in-out', style({
            opacity: 1
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            marginTop: '*',
            paddingTop: '*',
            paddingBottom: '*',
            height: '*',
            overflow: 'hidden'
        }),
        animate('400ms ease-in-out', style({
            opacity: 0,
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
            height: 0,
            overflow: 'hidden'
        }))
    ])
]);
/** @type {?} */
var alertContainerNgIf = trigger('alertContainerNgIf', [
    transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
var  /**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
AlertRef = /** @class */ (function () {
    function AlertRef() {
        this._afterDismissed = new Subject();
        /**
         * Observable that is triggered when the alert is dismissed.
         */
        this.afterDismissed = this._afterDismissed.asObservable();
    }
    /**
     * Dismisses the alert.
     *
     * @param reason Data passed back to the calling component through the AfterDismissed observable.
     */
    /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    AlertRef.prototype.dismiss = /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    function (reason) {
        this._afterDismissed.next(reason);
    };
    return AlertRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var alertUniqueId = 0;
/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
var AlertComponent = /** @class */ (function (_super) {
    __extends(AlertComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertContainerComponent = /** @class */ (function () {
    function AlertContainerComponent() {
        /**
         * @hidden
         */
        this.fdAlertContainerClass = true;
    }
    AlertContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-alert-container',
                    template: "",
                    host: {
                        '[@alertContainerNgIf]': ''
                    },
                    animations: [
                        alertContainerNgIf
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-alert-container {\n            position: fixed;\n            display: flex;\n            flex-direction: column;\n            z-index: 5000;\n            align-items: center;\n            top: 0;\n            right: 50%;\n            left: 50%;\n        }\n    "]
                }] }
    ];
    AlertContainerComponent.propDecorators = {
        fdAlertContainerClass: [{ type: HostBinding, args: ['class.fd-alert-container',] }]
    };
    return AlertContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertConfig = /** @class */ (function () {
    function AlertConfig() {
        /**
         * Whether the alert is dismissible.
         */
        this.dismissible = true;
        /**
         * Width of the alert.
         */
        this.width = '33vw';
        /**
         * Minimum width of the alert.
         */
        this.minWidth = '300px';
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
         * The container that the Alert is appended to. By default, it is appended to the body.
         */
        this.container = 'body';
    }
    return AlertConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DynamicComponentInjector = /** @class */ (function () {
    function DynamicComponentInjector(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    DynamicComponentInjector.prototype.get = /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    function (token, notFoundValue, flags) {
        /** @type {?} */
        var value = this._additionalTokens.get(token);
        if (value) {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return DynamicComponentInjector;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
var DynamicComponentService = /** @class */ (function () {
    /** @hidden */
    function DynamicComponentService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param contentType Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param services Services that will be injected to the component.
     */
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    DynamicComponentService.prototype.createDynamicComponent = /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    function (contentType, componentType, config, services) {
        // Dynamically inject services to component
        /** @type {?} */
        var configMap = new WeakMap();
        if (services) {
            services.forEach((/**
             * @param {?} service
             * @return {?}
             */
            function (service) { return configMap.set(service.constructor, service); }));
        }
        // Prepare component
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        /** @type {?} */
        var componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);
        // Assign component attributes
        /** @type {?} */
        var configObj = Object.assign({}, config);
        Object.keys(configObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        }));
        componentRef.instance.childComponentType = contentType;
        // Render component
        /** @type {?} */
        var componentEl = (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        }
        else {
            document.body.appendChild(componentEl);
        }
        return componentRef;
    };
    /** Function that destroys dynamic component */
    /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    DynamicComponentService.prototype.destroyComponent = /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    DynamicComponentService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return DynamicComponentService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate an alert as an overlay.
 */
var AlertService = /** @class */ (function () {
    /** @hidden */
    function AlertService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.alerts = [];
    }
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     */
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    AlertService.prototype.hasOpenAlerts = /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    function () {
        return this.alerts && this.alerts.length > 0;
    };
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param content Content of the alert component.
     * @param alertConfig Configuration of the alert component.
     */
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    AlertService.prototype.open = /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    function (content, alertConfig) {
        var _this = this;
        if (alertConfig === void 0) { alertConfig = new AlertConfig(); }
        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);
        // Instantiate alert ref service
        /** @type {?} */
        var service = new AlertRef();
        service.data = alertConfig.data;
        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent(content, AlertContainerComponent, alertConfig);
        }
        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;
        /** @type {?} */
        var component = this.dynamicComponentService.createDynamicComponent(content, AlertComponent, alertConfig, [service]);
        component.location.nativeElement.style.marginTop = '10px';
        // Subscription to close alert from ref
        /** @type {?} */
        var refSub = service.afterDismissed.subscribe((/**
         * @return {?}
         */
        function () {
            _this.destroyAlertComponent(component);
            refSub.unsubscribe();
        }));
        // Log new component
        this.alerts.push(component);
        return service;
    };
    /**
     * Dismisses all service-opened alerts.
     */
    /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    AlertService.prototype.dismissAll = /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    function () {
        var _this = this;
        this.alerts.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) {
            _this.destroyAlertComponent(ref);
        }));
    };
    /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    AlertService.prototype.destroyAlertComponent = /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item !== null && item !== undefined; }));
        this.dynamicComponentService.destroyComponent(alert);
        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    };
    /**
     * @private
     * @return {?}
     */
    AlertService.prototype.destroyAlertContainer = /**
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    };
    AlertService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AlertService.ctorParameters = function () { return [
        { type: DynamicComponentService }
    ]; };
    return AlertService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertModule = /** @class */ (function () {
    function AlertModule() {
    }
    AlertModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [AlertComponent, AlertContainerComponent],
                    imports: [CommonModule, IconModule],
                    exports: [AlertComponent, AlertContainerComponent],
                    entryComponents: [AlertContainerComponent, AlertComponent],
                    providers: [AlertService]
                },] }
    ];
    return AlertModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Badge directive, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
var BadgeDirective = /** @class */ (function (_super) {
    __extends(BadgeDirective, _super);
    /** @hidden */
    function BadgeDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * @hidden
         */
        _this.fdBadgeClass = true;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    BadgeDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    };
    BadgeDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-badge]'
                },] }
    ];
    /** @nocollapse */
    BadgeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    BadgeDirective.propDecorators = {
        status: [{ type: Input }],
        modifier: [{ type: Input }],
        fdBadgeClass: [{ type: HostBinding, args: ['class.fd-badge',] }]
    };
    return BadgeDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Label directive, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
var LabelDirective = /** @class */ (function (_super) {
    __extends(LabelDirective, _super);
    /** @hidden */
    function LabelDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        _this.status = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    LabelDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    };
    LabelDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-label]'
                },] }
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    LabelDirective.propDecorators = {
        status: [{ type: Input }]
    };
    return LabelDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Status Label directive with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
var StatusLabelDirective = /** @class */ (function (_super) {
    __extends(StatusLabelDirective, _super);
    /** @hidden */
    function StatusLabelDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        _this.status = '';
        /**
         * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
         */
        _this.statusIcon = '';
        /**
         * The icon used with the status indicator. See the icon page for the list of icons.
         */
        _this.icon = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    StatusLabelDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-status-label');
        if (this.status) {
            this._addClassToElement('fd-status-label--' + this.status);
        }
        if (this.statusIcon) {
            this._addClassToElement('fd-status-label--' + this.statusIcon);
        }
        if (this.icon) {
            this._addClassToElement('sap-icon--' + this.icon);
        }
    };
    StatusLabelDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-status-label]'
                },] }
    ];
    /** @nocollapse */
    StatusLabelDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    StatusLabelDirective.propDecorators = {
        status: [{ type: Input }],
        statusIcon: [{ type: Input }],
        icon: [{ type: Input }]
    };
    return StatusLabelDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BadgeLabelModule = /** @class */ (function () {
    function BadgeLabelModule() {
    }
    BadgeLabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [BadgeDirective, LabelDirective, StatusLabelDirective],
                    declarations: [BadgeDirective, LabelDirective, StatusLabelDirective]
                },] }
    ];
    return BadgeLabelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Breadcrumb parent wrapper directive. Must have breadcrumb item child directives.
 *
 * ```html
 * <fd-breadcrumb>
 *     <fd-breadcrumb-item>
 *         <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Link</a>
 *     </fd-breadcrumb-item>
 * </fd-breadcrumb>
 * ```
 */
var BreadcrumbDirective = /** @class */ (function () {
    function BreadcrumbDirective() {
    }
    BreadcrumbDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: 'fd-breadcrumb',
                    host: {
                        class: 'fd-breadcrumb'
                    }
                },] }
    ];
    return BreadcrumbDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Breadcrumb item directive. Must have child breadcrumb link directives.
 *
 * ```html
 * <fd-breadcrumb-item>
 *     <a fd-breadcrumb-link [routerLink]="'#'">Breadcrumb Link</a>
 * </fd-breadcrumb-item>
 * ```
 */
var BreadcrumbItemDirective = /** @class */ (function () {
    function BreadcrumbItemDirective() {
    }
    BreadcrumbItemDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: 'fd-breadcrumb-item',
                    host: {
                        class: 'fd-breadcrumb__item'
                    }
                },] }
    ];
    return BreadcrumbItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Breadcrumb link directive. Use Angular router options (such as 'routerLink' and 'queryParams') with this directive.
 *
 * ```html
 * <a fd-breadcrumb-link [routerLink]="'some-url'" [queryParams]="'params'">Breadcrumb Link</a>
 * ```
 */
var BreadcrumbLinkDirective = /** @class */ (function () {
    function BreadcrumbLinkDirective() {
    }
    BreadcrumbLinkDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-breadcrumb-link]',
                    host: {
                        class: 'fd-breadcrumb__link'
                    }
                },] }
    ];
    return BreadcrumbLinkDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BreadcrumbModule = /** @class */ (function () {
    function BreadcrumbModule() {
    }
    BreadcrumbModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective],
                    declarations: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective]
                },] }
    ];
    return BreadcrumbModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Container for grouped buttons.
 *
 * ```html
 * <fd-button-group>
 *     <button fd-button-grouped>Button</button>
 * </fd-button-group>
 * ```
 */
var ButtonGroupComponent = /** @class */ (function () {
    function ButtonGroupComponent() {
        /**
         * @hidden
         */
        this.fdButtonGroupClass = true;
    }
    ButtonGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-button-group',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        'role': 'group'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ButtonGroupComponent.propDecorators = {
        fdButtonGroupClass: [{ type: HostBinding, args: ['class.fd-button-group',] }]
    };
    return ButtonGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive to be applied to buttons that are members of a button group.
 *
 * ```html
 * <button fd-button-grouped>Button</button>
 * ```
 */
var ButtonGroupedDirective = /** @class */ (function (_super) {
    __extends(ButtonGroupedDirective, _super);
    /** @hidden */
    function ButtonGroupedDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the button should be in compact form.
         */
        _this.compact = false;
        /**
         * @hidden
         */
        _this.fdButtonGroupedClass = true;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ButtonGroupedDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    };
    ButtonGroupedDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-button-grouped]'
                },] }
    ];
    /** @nocollapse */
    ButtonGroupedDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonGroupedDirective.propDecorators = {
        size: [{ type: Input }],
        glyph: [{ type: Input }],
        state: [{ type: Input }],
        compact: [{ type: Input }, { type: HostBinding, args: ['class.fd-button--compact',] }],
        fdButtonGroupedClass: [{ type: HostBinding, args: ['class.fd-button--grouped',] }]
    };
    return ButtonGroupedDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ButtonGroupModule = /** @class */ (function () {
    function ButtonGroupModule() {
    }
    ButtonGroupModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [ButtonGroupComponent, ButtonGroupedDirective],
                    declarations: [ButtonGroupComponent, ButtonGroupedDirective]
                },] }
    ];
    return ButtonGroupModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for labels inside the calendar component.
 */
var CalendarI18nLabels = /** @class */ (function () {
    function CalendarI18nLabels() {
        // This will be needed when we use OnPush change detection.
        // readonly labelsChange: Subject<void> = new Subject<void>();
        /**
         * Year selection aria label. Used on the button to navigate to the years view.
         */
        this.yearSelectionLabel = 'Year selection';
        /**
         * Previous year aria label. Used on the button to switch to a previous year in the years view.
         */
        this.previousYearLabel = 'Previous year';
        /**
         * Next year aria label. Used on the button to switch to a next year in the years view.
         */
        this.nextYearLabel = 'Next year';
        /**
         * Month selection aria label. Used on the button to navigate to the months view.
         */
        this.monthSelectionLabel = 'Month selection';
        /**
         * Previous month aria label. Used on the button to switch to a previous month in the months view.
         */
        this.previousMonthLabel = 'Previous month';
        /**
         * Next month aria label. Used on the button to switch to a next month in the months view.
         */
        this.nextMonthLabel = 'Next month';
    }
    CalendarI18nLabels.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ CalendarI18nLabels.ngInjectableDef = defineInjectable({ factory: function CalendarI18nLabels_Factory() { return new CalendarI18nLabels(); }, token: CalendarI18nLabels, providedIn: "root" });
    return CalendarI18nLabels;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} locale
 * @return {?}
 */
function CALENDAR_I18N_FACTORY(locale) {
    return new CalendarI18nDefault(locale);
}
/**
 * Abstract class which defines the behaviour calendar internationalization. See calendar examples for usage details.
 * @abstract
 */
var CalendarI18n = /** @class */ (function () {
    function CalendarI18n() {
    }
    CalendarI18n.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: CALENDAR_I18N_FACTORY,
                    deps: [LOCALE_ID]
                },] }
    ];
    /** @nocollapse */ CalendarI18n.ngInjectableDef = defineInjectable({ factory: function CalendarI18n_Factory() { return CALENDAR_I18N_FACTORY(inject(LOCALE_ID)); }, token: CalendarI18n, providedIn: "root" });
    return CalendarI18n;
}());
/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
var CalendarI18nDefault = /** @class */ (function (_super) {
    __extends(CalendarI18nDefault, _super);
    /** Constructor takes in a locale_id and gets the appropriate data from Angular. */
    function CalendarI18nDefault(locale) {
        var _this = _super.call(this) || this;
        _this.locale = locale;
        _this.weekdaysFallback = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        _this.monthsFullFallback = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        _this.monthsShortFallback = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if (locale) {
            /** @type {?} */
            var sundayStartWeekdays_1 = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
            _this.weekdaysShort = sundayStartWeekdays_1.map((/**
             * @param {?} day
             * @param {?} index
             * @return {?}
             */
            function (day, index) { return sundayStartWeekdays_1[index % 7]; }));
            _this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
            _this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
        }
        _this.checkForFallback();
        return _this;
    }
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param date Native date object to use for the label.
     */
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getDayAriaLabel = /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    function (date) {
        return date.getDate() + ' ' + this.monthsFull[date.getMonth()] + ' ' + date.getFullYear();
    };
    /** Get all full month names. */
    /**
     * Get all full month names.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllFullMonthNames = /**
     * Get all full month names.
     * @return {?}
     */
    function () {
        return this.monthsFull;
    };
    /** Get all short month names, such as Nov for November. */
    /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllShortMonthNames = /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    function () {
        return this.monthsShort;
    };
    /** Get all short week day names, such as Mo for Monday. */
    /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    CalendarI18nDefault.prototype.getAllShortWeekdays = /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    function () {
        return this.weekdaysShort;
    };
    /** Checks if a fallback is needed. Older versions of Angular may need this. */
    /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    CalendarI18nDefault.prototype.checkForFallback = /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    function () {
        if (!this.weekdaysShort || this.weekdaysShort.length === 0) {
            this.weekdaysShort = this.weekdaysFallback;
        }
        if (!this.monthsShort || this.monthsShort.length === 0) {
            this.monthsShort = this.monthsShortFallback;
        }
        if (!this.monthsFull || this.monthsFull.length === 0) {
            this.monthsFull = this.monthsFullFallback;
        }
    };
    CalendarI18nDefault.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CalendarI18nDefault.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return CalendarI18nDefault;
}(CalendarI18n));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Internal use only.
 * Header of the calendar component.
 */
var CalendarHeaderComponent = /** @class */ (function () {
    function CalendarHeaderComponent(calendarI18nLabels, calendarI18n) {
        this.calendarI18nLabels = calendarI18nLabels;
        this.calendarI18n = calendarI18n;
        /**
         * Event emitted when the active view should change.
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event emitted when the previous button is clicked.
         */
        this.previousClicked = new EventEmitter();
        /**
         * Event emitted when the next button is clicked.
         */
        this.nextClicked = new EventEmitter();
    }
    Object.defineProperty(CalendarHeaderComponent.prototype, "previousLabel", {
        /** Get the aria label for the previous button. Depends on the active view. */
        get: /**
         * Get the aria label for the previous button. Depends on the active view.
         * @return {?}
         */
        function () {
            return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
                : this.calendarI18nLabels.previousYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarHeaderComponent.prototype, "nextLabel", {
        /** Get the aria label for the next button. Depends on the active view. */
        get: /**
         * Get the aria label for the next button. Depends on the active view.
         * @return {?}
         */
        function () {
            return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
                : this.calendarI18nLabels.nextMonthLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarHeaderComponent.prototype, "monthLabel", {
        /** Get aria label for the month shown. */
        get: /**
         * Get aria label for the month shown.
         * @return {?}
         */
        function () {
            return this.calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isOnMonthView = /**
     * @return {?}
     */
    function () {
        return this.activeView === 'month';
    };
    /**
     * @return {?}
     */
    CalendarHeaderComponent.prototype.isOnYearView = /**
     * @return {?}
     */
    function () {
        return this.activeView === 'year';
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CalendarHeaderComponent.prototype.processViewChange = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        if (type === this.activeView) {
            this.activeView = 'day';
        }
        else {
            this.activeView = type;
        }
        this.activeViewChange.emit(this.activeView);
    };
    CalendarHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-header',
                    template: "<header class=\"fd-calendar__header\">\n    <div class=\"fd-calendar__navigation\">\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-left\"\n                    [attr.id]=\"id + '-left-arrow'\"\n                    [attr.aria-label]=\"previousLabel\"\n                    [attr.aria-disabled]=\"false\"\n                    type=\"button\"\n                    (click)=\"previousClicked.emit()\">\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--light fd-button--compact\"\n                    [attr.aria-label]=\"calendarI18nLabels.monthSelectionLabel\"\n                    [attr.aria-selected]=\"isOnMonthView()\"\n                    (click)=\"processViewChange('month')\"\n                    type=\"button\">\n                {{monthLabel}}\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--light fd-button--compact\"\n                    [attr.aria-label]=\"calendarI18nLabels.yearSelectionLabel\"\n                    [attr.aria-selected]=\"isOnYearView()\"\n                    (click)=\"processViewChange('year')\"\n                    type=\"button\">\n                {{currentlyDisplayed.year}}\n            </button>\n        </div>\n        <div class=\"fd-calendar__action\">\n            <button class=\"fd-button--standard fd-button--light fd-button--compact sap-icon--slim-arrow-right\"\n                    [attr.id]=\"id + '-right-arrow'\"\n                    [attr.aria-label]=\"nextLabel\"\n                    [attr.aria-disabled]=\"false\"\n                    (click)=\"nextClicked.emit()\"\n                    type=\"button\">\n            </button>\n        </div>\n    </div>\n</header>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-header"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarHeaderComponent.ctorParameters = function () { return [
        { type: CalendarI18nLabels },
        { type: CalendarI18n }
    ]; };
    CalendarHeaderComponent.propDecorators = {
        activeView: [{ type: Input }],
        currentlyDisplayed: [{ type: Input }],
        id: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        previousClicked: [{ type: Output }],
        nextClicked: [{ type: Output }]
    };
    return CalendarHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarService = /** @class */ (function () {
    function CalendarService() {
        /**
         * Event thrown, when the element is selected by space or enter keys
         */
        this.onKeySelect = new Subject();
        /**
         * Event thrown, when the focus goes after list of elements
         */
        this.onListEndApproach = new Subject();
        /**
         * Event thrown, when the focus goes before list of elements
         */
        this.onListStartApproach = new Subject();
        /**
         * Event thrown, when the focus is changed.
         */
        this.onFocusIdChange = new Subject();
    }
    /**
     * Method that provides, amount of day depending on month and year passed
     * @param month which is number 1-12
     * @param year which is number
     */
    /**
     * Method that provides, amount of day depending on month and year passed
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    CalendarService.getDaysInMonth = /**
     * Method that provides, amount of day depending on month and year passed
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    function (month, year) {
        /** @type {?} */
        var isLeapYear = (/**
         * @param {?} _year
         * @return {?}
         */
        function (_year) {
            if (_year % 4 !== 0) {
                return false;
            }
            else if (_year % 400 === 0) {
                return true;
            }
            else {
                return _year % 100 !== 0;
            }
        });
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        else if ((month % 2 === 0 && month < 8) || (month % 2 === 1 && month > 8)) {
            return 30;
        }
        else {
            return 31;
        }
    };
    /**
     * Method that check equality of 2 dates.
     */
    /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    CalendarService.datesEqual = /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        else {
            return date1.toDateString() === date2.toDateString();
        }
    };
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param event KeyboardEvent
     * @param index which is number (0 - 11)
     */
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    CalendarService.prototype.onKeydownHandler = /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    function (event, index) {
        switch (event.code) {
            case 'Enter':
            case 'Space': {
                event.preventDefault();
                this.onKeySelect.next(index);
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                if (index === 0) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(11);
                }
                else {
                    this.onFocusIdChange.next(index - 1);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                if (index === 11) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(0);
                }
                else {
                    this.onFocusIdChange.next(index + 1);
                }
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                if (index <= 3) {
                    this.onListStartApproach.next();
                    this.onFocusIdChange.next(index + 8);
                }
                else {
                    this.onFocusIdChange.next(index - 4);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                if (index >= 8) {
                    this.onListEndApproach.next();
                    this.onFocusIdChange.next(index - 8);
                }
                else {
                    this.onFocusIdChange.next(index + 4);
                }
                break;
            }
            case 'Tab': {
                if (this.focusEscapeFunction && !event.shiftKey) {
                    event.preventDefault();
                    this.focusEscapeFunction();
                }
                break;
            }
        }
    };
    return CalendarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FdDate = /** @class */ (function () {
    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param year The year of the date.
     * @param month The month of the date (1-12).
     * @param day The day of the date (1-31, generally).
     */
    function FdDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    /**
     * Static function to get the current date in FdDate form.
     */
    /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    FdDate.getToday = /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tempDate = new Date();
        return new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
    };
    /**
     *  Static function allowing convert js date object to FdDate model
     */
    /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    FdDate.getModelFromDate = /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    };
    /**
     * Get Luxon date object converted to string from FdDate.
     */
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    FdDate.prototype.toDateString = /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day && this.isDateValid()) {
            return this.toDate().toDateString();
        }
        else {
            return '';
        }
    };
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     */
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    FdDate.prototype.getTimeStamp = /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day) {
            return this.toDate().getTime();
        }
        else {
            return -1;
        }
    };
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     */
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    FdDate.prototype.getDay = /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    function () {
        if (this.year && this.month && this.day) {
            return this.toDate().getDay() + 1;
        }
        else {
            return -1;
        }
    };
    /** Get next day */
    /**
     * Get next day
     * @return {?}
     */
    FdDate.prototype.nextDay = /**
     * Get next day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        var day = this.day >= maxDays ? 1 : this.day + 1;
        /** @type {?} */
        var month = day !== 1 ? this.month : (this.month > 11 ? 1 : this.month + 1);
        /** @type {?} */
        var year = month !== 1 ? this.year : this.year + 1;
        return new FdDate(year, month, day);
    };
    /** Get previous day  */
    /**
     * Get previous day
     * @return {?}
     */
    FdDate.prototype.previousDay = /**
     * Get previous day
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        var day = this.day === 1 ? maxDays : this.day - 1;
        /** @type {?} */
        var month = day !== maxDays ? this.month : (this.month === 1 ? 12 : this.month - 1);
        /** @type {?} */
        var year = month !== 12 ? this.year : this.year - 1;
        return new FdDate(year, month, day);
    };
    /**
     * Get native date object from FdDate.
     */
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    FdDate.prototype.toDate = /**
     * Get native date object from FdDate.
     * @return {?}
     */
    function () {
        return new Date(this.year, this.month - 1, this.day);
    };
    /**
     * Method that checks validity of current FdDate object.
     */
    /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    FdDate.prototype.isDateValid = /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    function () {
        if (!this) {
            return false;
        }
        if (!this.year || !this.month || !this.day) {
            return false;
        }
        if (this.year <= 0 || this.month < 1 || this.month > 12) {
            return false;
        }
        if (this.day < 1 || this.day > CalendarService.getDaysInMonth(this.month, this.year)) {
            return false;
        }
        return true;
    };
    return FdDate;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the day view of the calendar.
 */
var CalendarDayViewComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarDayViewComponent(calendarI18n, eRef) {
        this.calendarI18n = calendarI18n;
        this.eRef = eRef;
        /**
         * @hidden
         */
        this.newFocusedDayId = '';
        /**
         * @hidden
         */
        this.fdCalendarDateViewClass = true;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.calType = 'single';
        /**
         * Event emitted always, when model is changed in range mode
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event emitted always, when next month is selected, by focus
         */
        this.nextMonthSelect = new EventEmitter();
        /**
         * Event emitted always, when previous month is selected, by focus
         */
        this.previousMonthSelect = new EventEmitter();
        /**
         * Event emitted always, when model is changed in single mode
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param day CalendarDay object to be selected.
     */
    /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param {?} day CalendarDay object to be selected.
     * @param {?=} event
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectDate = /**
     * Function for selecting a date on the calendar. Typically called when a date is clicked, but can also be called programmatically.
     * @param {?} day CalendarDay object to be selected.
     * @param {?=} event
     * @return {?}
     */
    function (day, event) {
        if (event) {
            /**
             * There are some problems with popup integration. After clicking inside day component, the popover closes.
             */
            event.stopPropagation();
            event.preventDefault();
            this.newFocusedDayId = day.id;
            this.focusElement(this.newFocusedDayId);
        }
        if (!day.blocked && !day.disabled) {
            if (this.calType === 'single') {
                this.selectedDate = day.date;
                this.selectedDateChange.emit(day.date);
                this.buildDayViewGrid();
            }
            else {
                if (this.selectCounter === 0 || this.selectCounter === 2) {
                    this.selectedRangeDate = { start: day.date, end: null };
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }
                else if (this.selectCounter === 1) {
                    // Check if date picked is higher than already chosen, otherwise just first one
                    if (this.selectedRangeDate.start.getTimeStamp() < day.date.getTimeStamp()) {
                        this.selectedRangeDate = { start: this.selectedRangeDate.start, end: day.date };
                    }
                    else {
                        this.selectedRangeDate = { start: day.date, end: null };
                    }
                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.buildDayViewGrid();
                }
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.buildDayViewGrid();
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "selectCounter", {
        /** @hidden
         *  Amount of selected days
         *  0, when none,
         *  1, when only startDate, or endDate same as startDate,
         *  2, when both
         */
        get: /**
         * @hidden
         *  Amount of selected days
         *  0, when none,
         *  1, when only startDate, or endDate same as startDate,
         *  2, when both
         * @return {?}
         */
        function () {
            if (!this.selectedRangeDate || !this.selectedRangeDate.start) {
                return 0;
            }
            else if (this.selectedRangeDate.start &&
                (!this.selectedRangeDate.end ||
                    CalendarService.datesEqual(this.selectedRangeDate.start, this.selectedRangeDate.end))) {
                return 1;
            }
            else if (this.selectedRangeDate.start && this.selectedRangeDate.end) {
                return 2;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param event KeyboardEvent
     * @param cell CalendarDay
     * @param grid with specified column and row as a x and y
     */
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param {?} event KeyboardEvent
     * @param {?} cell CalendarDay
     * @param {?} grid with specified column and row as a x and y
     * @return {?}
     */
    CalendarDayViewComponent.prototype.onKeydownDayHandler = /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param {?} event KeyboardEvent
     * @param {?} cell CalendarDay
     * @param {?} grid with specified column and row as a x and y
     * @return {?}
     */
    function (event, cell, grid) {
        if (event.code === 'Tab' && !event.shiftKey) {
            if (this.focusEscapeFunction) {
                event.preventDefault();
                this.focusEscapeFunction();
            }
        }
        else {
            switch (event.code) {
                case ('Space'):
                case ('Enter'): {
                    event.preventDefault();
                    this.selectDate(cell);
                    this.newFocusedDayId = cell.id;
                    break;
                }
                case ('ArrowUp'): {
                    event.preventDefault();
                    if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][grid.x].id;
                    }
                    else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId = this.dayViewGrid[this.dayViewGrid.length - 1][grid.x].id;
                    }
                    break;
                }
                case ('ArrowDown'): {
                    event.preventDefault();
                    if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][grid.x].id;
                    }
                    else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][grid.x].id;
                    }
                    break;
                }
                case ('ArrowLeft'): {
                    event.preventDefault();
                    if (grid.x > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x - 1].id;
                    }
                    else if (grid.y > 0) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y - 1][this.dayViewGrid[0].length - 1].id;
                    }
                    else {
                        this.selectPreviousMonth();
                        this.newFocusedDayId =
                            this.dayViewGrid[this.dayViewGrid.length - 1][this.dayViewGrid[0].length - 1].id;
                    }
                    break;
                }
                case ('ArrowRight'): {
                    event.preventDefault();
                    if (grid.x < this.dayViewGrid[0].length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y][grid.x + 1].id;
                    }
                    else if (grid.y < this.dayViewGrid.length - 1) {
                        this.newFocusedDayId = this.dayViewGrid[grid.y + 1][0].id;
                    }
                    else {
                        this.selectNextMonth();
                        this.newFocusedDayId = this.dayViewGrid[0][0].id;
                    }
                    break;
                }
            }
        }
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngOnChanges = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.buildDayViewGrid();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarDayViewComponent.prototype.ngAfterViewChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    };
    /** @hidden
     *  Method that allow to focus elements inside this component
     */
    /**
     * @hidden
     *  Method that allow to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    CalendarDayViewComponent.prototype.focusElement = /**
     * @hidden
     *  Method that allow to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    function (elementSelector) {
        /** @type {?} */
        var elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    };
    /** Active day means that with tabindex = 0, it's selected day or today or first day */
    /**
     * Active day means that with tabindex = 0, it's selected day or today or first day
     * @return {?}
     */
    CalendarDayViewComponent.prototype.focusActiveDay = /**
     * Active day means that with tabindex = 0, it's selected day or today or first day
     * @return {?}
     */
    function () {
        this.newFocusedDayId = this.getActiveCell(this.calendarDayList.filter((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.monthStatus === 'current'; }))).id;
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "calendarDayList", {
        /** Function that gives array of all displayed CalendarDays */
        get: /**
         * Function that gives array of all displayed CalendarDays
         * @return {?}
         */
        function () {
            return this.dayViewGrid.reduce((/**
             * @param {?} totalCalendarRows
             * @param {?} calendarRow
             * @return {?}
             */
            function (totalCalendarRows, calendarRow) {
                if (!calendarRow) {
                    calendarRow = [];
                }
                return totalCalendarRows.concat(calendarRow);
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectPreviousMonth = /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = __assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month - 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        this.buildDayViewGrid();
        this.previousMonthSelect.emit();
    };
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     */
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.selectNextMonth = /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = __assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month + 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        this.buildDayViewGrid();
        this.nextMonthSelect.emit();
    };
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     */
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.populateCalendar = /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var calendar = [];
        calendar = this.getPreviousMonthDays(calendar);
        calendar = calendar.concat(this.getCurrentMonthDays());
        calendar = this.getNextMonthDays(calendar);
        calendar.forEach((/**
         * @param {?} call
         * @param {?} index
         * @return {?}
         */
        function (call, index) { return call.id = _this.id + '-fd-day-' + (Math.floor(index / 7) + 1) + '' + (index % 7); }));
        return calendar;
    };
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     */
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.buildDayViewGrid = /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     * @private
     * @return {?}
     */
    function () {
        if (!this.currentlyDisplayed) {
            if (this.selectedDate) {
                this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
            }
            else {
                this.currentlyDisplayed = { month: FdDate.getToday().month, year: FdDate.getToday().year };
            }
        }
        /** @type {?} */
        var calendarDays = this.populateCalendar();
        /** @type {?} */
        var dayViewGrid = [];
        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, 7));
        }
        this.dayViewGrid = dayViewGrid;
        return;
    };
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     */
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     * @private
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getCurrentMonthDays = /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var month = this.currentlyDisplayed.month;
        /** @type {?} */
        var year = this.currentlyDisplayed.year;
        /** @type {?} */
        var calendarDays = [];
        /** @type {?} */
        var amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        for (var dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            /** @type {?} */
            var fdDate = new FdDate(year, month, dayNumber);
            calendarDays.push(__assign({}, this.getDay(fdDate), { monthStatus: 'current', today: CalendarService.datesEqual(FdDate.getToday(), fdDate) }));
        }
        this.getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    };
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     */
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getActiveCell = /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.selected; }))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return cell.selected; }));
        }
        else if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        function (cell) { return cell.today; }))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) { return cell.today; }));
        }
        else {
            return calendarDays[0];
        }
    };
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     */
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getPreviousMonthDays = /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        /** @type {?} */
        var month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        /** @type {?} */
        var year = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        /** @type {?} */
        var amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        /** @type {?} */
        var prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth);
        /** @type {?} */
        var prevMonthLastDay = amountOfDaysInCurrentMonth;
        /** @type {?} */
        var prevMonthLastWeekDay = prevMonthLastDate.getDay() - this.startingDayOfWeek;
        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         */
        if (prevMonthLastWeekDay < 0) {
            prevMonthLastWeekDay = prevMonthLastWeekDay + 7;
        }
        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                /** @type {?} */
                var prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                /** @type {?} */
                var fdDate = new FdDate(year, month, prevMonthDay);
                calendarDays.push(__assign({}, this.getDay(fdDate), { monthStatus: 'previous' }));
                prevMonthLastWeekDay--;
            }
        }
        return calendarDays;
    };
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     */
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getNextMonthDays = /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    function (calendarDays) {
        /** @type {?} */
        var month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 1;
        /** @type {?} */
        var year = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;
        // The calendar grid can have 6 (42 days) weeks
        /** @type {?} */
        var nextMonthDisplayedDays = 42 - calendarDays.length;
        for (var nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            /** @type {?} */
            var fdDate = new FdDate(year, month, nextD);
            calendarDays.push(__assign({}, this.getDay(fdDate), { monthStatus: 'next' }));
        }
        return calendarDays;
    };
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     */
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     * @private
     * @param {?} fdDate
     * @return {?}
     */
    CalendarDayViewComponent.prototype.getDay = /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     * @private
     * @param {?} fdDate
     * @return {?}
     */
    function (fdDate) {
        /** @type {?} */
        var day = {
            date: fdDate,
            weekDay: fdDate.getDay(),
            disabled: this.disableFunction(fdDate),
            blocked: this.blockFunction(fdDate),
            selected: ((this.calType === 'single' && CalendarService.datesEqual(fdDate, this.selectedDate)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)) ||
                (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end))),
            selectedFirst: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.start)),
            selectedLast: (this.selectedRangeDate && CalendarService.datesEqual(fdDate, this.selectedRangeDate.end)),
            selectedRange: (this.selectedRangeDate && ((this.selectedRangeDate.start && (this.selectedRangeDate.start.getTimeStamp() < fdDate.getTimeStamp())) &&
                (this.selectedRangeDate.end && (this.selectedRangeDate.end.getTimeStamp() > fdDate.getTimeStamp())))),
            ariaLabel: this.calendarI18n.getDayAriaLabel(fdDate.toDate())
        };
        if (this.calType === 'range' && (this.selectCounter === 0 || this.selectCounter === 2)) {
            if (this.disableRangeStartFunction && !day.disabled) {
                day.disabled = this.disableRangeStartFunction(day.date);
            }
            if (this.blockRangeStartFunction && !day.blocked) {
                day.blocked = this.blockRangeStartFunction(day.date);
            }
        }
        else if (this.selectCounter === 1) {
            if (this.disableRangeEndFunction && !day.disabled) {
                day.disabled = this.disableRangeEndFunction(day.date);
            }
            if (this.blockRangeEndFunction && !day.blocked) {
                day.blocked = this.blockRangeEndFunction(day.date);
            }
        }
        return day;
    };
    Object.defineProperty(CalendarDayViewComponent.prototype, "shortWeekDays", {
        /**
         * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
         * providing other class which implements CalendarI18n
         */
        get: /**
         * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
         * providing other class which implements CalendarI18n
         * @return {?}
         */
        function () {
            return this.calendarI18n.getAllShortWeekdays()
                .slice(this.startingDayOfWeek - 1)
                .concat(this.calendarI18n.getAllShortWeekdays().slice(0, this.startingDayOfWeek - 1))
                .map((/**
             * @param {?} weekday
             * @return {?}
             */
            function (weekday) { return weekday[0].toLocaleUpperCase(); }));
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-day-view',
                    template: "<table class=\"fd-calendar__table\" role=\"grid\">\n    <thead class=\"fd-calendar__group\">\n    <tr class=\"fd-calendar__row\">\n        <th class=\"fd-calendar__column-header\" *ngFor=\"let day of shortWeekDays\">\n            <span class=\"fd-calendar__day-of-week\">{{day}}</span>\n        </th>\n    </tr>\n    </thead>\n    <tbody class=\"fd-calendar__group\">\n        <tr class=\"fd-calendar__row\"\n            *ngFor=\"let row of dayViewGrid; let rowIndex = index;\">\n\n            <td class=\"fd-calendar__item\"\n                role=\"gridcell\"\n                [attr.aria-label]=\"cell.ariaLabel\"\n                *ngFor=\"let cell of row; let cellIndex = index;\"\n                [ngClass]=\"{\n                    'fd-calendar__item--other-month': cell.monthStatus !== 'current',\n                    'is-selected': cell.selected,\n                    'is-selected-range-last': cell.selectedLast && !cell.selectedFirst,\n                    'is-selected-range-first': cell.selectedFirst,\n                    'is-selected-range': cell.selectedRange && !cell.selectedFirst && !cell.selectedLast,\n                    'fd-calendar__item--current': cell.today,\n                    'is-disabled': cell.disabled,\n                    'is-blocked': cell.blocked\n                }\"\n                [attr.id]=\"cell.id\"\n                [attr.tabindex]=\"cell.isTabIndexed ? 0 : -1\"\n                (click)=\"selectDate(cell, $event)\"\n                (keydown)=\"onKeydownDayHandler($event, cell, { x: cellIndex, y: rowIndex })\"\n            >\n                <span class=\"fd-calendar__text\" role=\"button\">{{cell.date.day}}</span>\n            </td>\n        </tr>\n    </tbody>\n</table>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-day-view"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarDayViewComponent.ctorParameters = function () { return [
        { type: CalendarI18n },
        { type: ElementRef }
    ]; };
    CalendarDayViewComponent.propDecorators = {
        fdCalendarDateViewClass: [{ type: HostBinding, args: ['class.fd-calendar__dates',] }],
        currentlyDisplayed: [{ type: Input }],
        selectedDate: [{ type: Input }],
        selectedRangeDate: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        calType: [{ type: Input }],
        id: [{ type: Input }],
        focusEscapeFunction: [{ type: Input }],
        selectedRangeDateChange: [{ type: Output }],
        nextMonthSelect: [{ type: Output }],
        previousMonthSelect: [{ type: Output }],
        selectedDateChange: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }]
    };
    return CalendarDayViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the month view of the calendar.
 */
var CalendarMonthViewComponent = /** @class */ (function () {
    function CalendarMonthViewComponent(eRef, cdRef, calendarI18n, calendarService) {
        this.eRef = eRef;
        this.cdRef = cdRef;
        this.calendarI18n = calendarI18n;
        this.calendarService = calendarService;
        /**
         * A number offset used to achieve the 1-12 representation of the calendar
         */
        this._monthOffset = 1;
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
        /**
         * An event fired when a new month is selected
         */
        this.monthClicked = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarMonthViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.focusElement('#' + _this.id + '-fd-month-' + index); }));
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.selectMonth(index); }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarMonthViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    Object.defineProperty(CalendarMonthViewComponent.prototype, "currentMonth", {
        /** Get a number (1-12) representing the current month  */
        get: /**
         * Get a number (1-12) representing the current month
         * @return {?}
         */
        function () {
            return FdDate.getToday().month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarMonthViewComponent.prototype, "monthOffset", {
        /**  Getter for the private class member _monthOffset */
        get: /**
         * Getter for the private class member _monthOffset
         * @return {?}
         */
        function () {
            return this._monthOffset;
        },
        enumerable: true,
        configurable: true
    });
    /** Method for handling the mouse click event when a month is selected  */
    /**
     * Method for handling the mouse click event when a month is selected
     * @param {?} selectedMonth
     * @param {?=} event
     * @return {?}
     */
    CalendarMonthViewComponent.prototype.selectMonth = /**
     * Method for handling the mouse click event when a month is selected
     * @param {?} selectedMonth
     * @param {?=} event
     * @return {?}
     */
    function (selectedMonth, event) {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = selectedMonth + this.monthOffset;
        this.monthClicked.emit(this.monthSelected);
    };
    /** Method for handling the keyboard events (a11y) */
    /**
     * Method for handling the keyboard events (a11y)
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    CalendarMonthViewComponent.prototype.onKeydownMonthHandler = /**
     * Method for handling the keyboard events (a11y)
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.calendarService.onKeydownHandler(event, index);
    };
    /** Method that allows to focus elements inside this component */
    /**
     * Method that allows to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    CalendarMonthViewComponent.prototype.focusElement = /**
     * Method that allows to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    function (elementSelector) {
        /** @type {?} */
        var elementToFocus = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    };
    Object.defineProperty(CalendarMonthViewComponent.prototype, "shortMonthNames", {
        /** Method that returns list of short month names from currently provided calendarI18n service */
        get: /**
         * Method that returns list of short month names from currently provided calendarI18n service
         * @return {?}
         */
        function () {
            return this.calendarI18n.getAllShortMonthNames();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-month-view',
                    template: "<div class=\"fd-calendar__months\">\n    <ul class=\"fd-calendar__list\">\n        <li class=\"fd-calendar__item\"\n            *ngFor=\"let month of shortMonthNames; let i = index\"\n            [ngClass]=\"{\n                'fd-calendar__item--current': i + monthOffset === currentMonth,\n                'is-selected': i + monthOffset === monthSelected\n            }\"\n            [attr.tabIndex]=\"i + monthOffset === monthSelected ? 0 : -1\"\n            [attr.id]=\"id + '-fd-month-' + i\"\n            (keydown)=\"onKeydownMonthHandler($event, i)\"\n            (click)=\"selectMonth(i, $event)\">\n            <span role=\"button\" class=\"fd-calendar__text\">\n                {{ month }}\n            </span>\n        </li>\n    </ul>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-month-view"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarMonthViewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: CalendarI18n },
        { type: CalendarService }
    ]; };
    CalendarMonthViewComponent.propDecorators = {
        id: [{ type: Input }],
        monthSelected: [{ type: Input }],
        focusEscapeFunction: [{ type: Input }],
        monthClicked: [{ type: Output }]
    };
    return CalendarMonthViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the YearView of the Calendar Component.
 */
var CalendarYearViewComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarYearViewComponent(eRef, calendarService) {
        this.eRef = eRef;
        this.calendarService = calendarService;
        /**
         * Parameter storing the year of the present day.
         */
        this.currentYear = FdDate.getToday().year;
        /**
         * Parameter storing first shown year on list
         */
        this.firstYearInList = this.currentYear;
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
        /**
         * Event fired when a year is selected.
         */
        this.yearClicked = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngAfterViewChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.firstYearInList = this.yearSelected;
        this.constructYearList();
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.newFocusedYearId = _this.id + '-fd-year-' + index;
            _this.focusElement(_this.newFocusedYearId);
        }));
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.selectYear(_this.calendarYearList[index]); }));
        this.calendarService.onListStartApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.loadPreviousYearList(); }));
        this.calendarService.onListEndApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.loadNextYearList(); }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarYearViewComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     */
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    CalendarYearViewComponent.prototype.getActiveYear = /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selectedYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        function (year) { return year === _this.yearSelected; }));
        if (selectedYear) {
            return selectedYear;
        }
        /** @type {?} */
        var currentYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        function (year) { return year === _this.currentYear; }));
        if (currentYear) {
            return currentYear;
        }
        return this.calendarYearList[0];
    };
    /** Method for handling the keyboard navigation. */
    /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    CalendarYearViewComponent.prototype.onKeydownYearHandler = /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.calendarService.onKeydownHandler(event, index);
    };
    /** Method used to load the previous 12 years to be displayed. */
    /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    CalendarYearViewComponent.prototype.loadNextYearList = /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    function () {
        this.firstYearInList += 12;
        this.constructYearList();
    };
    /** Method used to load the next 12 years to be displayed. */
    /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    CalendarYearViewComponent.prototype.loadPreviousYearList = /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    function () {
        this.firstYearInList -= 12;
        this.constructYearList();
    };
    /** Method allowing focusing on elements within this component. */
    /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    CalendarYearViewComponent.prototype.focusElement = /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    function (elementSelector) {
        /** @type {?} */
        var elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    };
    /** Method that sends the year to the parent component when it is clicked. */
    /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    CalendarYearViewComponent.prototype.selectYear = /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    function (selectedYear, event) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    };
    /** @hidden */
    /**
     * @hidden
     * @private
     * @return {?}
     */
    CalendarYearViewComponent.prototype.constructYearList = /**
     * @hidden
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var displayedYearsAmount = 12;
        this.calendarYearList = [];
        for (var x = 0; x < displayedYearsAmount; ++x) {
            this.calendarYearList.push(this.firstYearInList + x);
        }
        this.activeYear = this.getActiveYear();
    };
    CalendarYearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar-year-view',
                    template: "<div class=\"fd-calendar__years\">\n    <ul class=\"fd-calendar__list\">\n        <li class=\"fd-calendar__item\"\n            *ngFor=\"let year of calendarYearList; let i = index\"\n            [ngClass]=\"{\n                'is-selected': (year == yearSelected),\n                'fd-calendar__item--current': (year == currentYear)\n            }\"\n            [attr.id]=\"id + '-fd-year-' + i\"\n            [attr.tabindex]=\"year === activeYear ? 0 : -1\"\n            (keydown)=\"onKeydownYearHandler($event, i)\"\n            (click)=\"selectYear(year, $event)\">\n            <span role=\"button\" class=\"fd-calendar__text\">\n                {{ year }}\n            </span>\n        </li>\n    </ul>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id + "-year-view"'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    CalendarYearViewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CalendarService }
    ]; };
    CalendarYearViewComponent.propDecorators = {
        id: [{ type: Input }],
        focusEscapeFunction: [{ type: Input }],
        yearSelected: [{ type: Input }],
        yearClicked: [{ type: Output }]
    };
    return CalendarYearViewComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var calendarUniqueId = 0;
/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 *
 * Calendar component used for selecting dates, typically used by the DatePicker and DateTimePicker components.
 * Supports the Angular forms module, enabling form validity, ngModel, etc.
 * ```html
 * <fd-calendar></fd-calendar>
 * ```
 */
var CalendarComponent = /** @class */ (function () {
    /** @hidden */
    function CalendarComponent(calendarI18n, changeDetectorRef) {
        var _this = this;
        this.calendarI18n = calendarI18n;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * @hidden
         */
        this.fdCalendarClass = true;
        /**
         * @hidden
         */
        this.fdHasDisplayBlockClass = true;
        /**
         * The currently selected FdDate model in single mode.
         */
        this.selectedDate = FdDate.getToday();
        /**
         * Actually shown active view one of 'day' | 'month' | 'year'
         */
        this.activeView = 'day';
        /**
         * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
         */
        this.startingDayOfWeek = 1;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.calType = 'single';
        /**
         * Id of the calendar. If none is provided, one will be generated.
         */
        this.id = 'fd-calendar-' + calendarUniqueId++;
        /**
         * Event thrown every time active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event thrown every time selected date in single mode is changed
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Event thrown every time selected first or last date in range mode is changed
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event thrown every time when value is overwritten from outside and throw back isValid
         */
        this.isValidDateChange = new EventEmitter();
        /**
         * Event thrown every time when calendar should be closed
         */
        this.closeCalendar = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * That allows to define function that should happen, when focus should normally escape of component
         */
        this.escapeFocusFunction = (/**
         * @return {?}
         */
        function () {
            if (document.getElementById(_this.id + '-left-arrow')) {
                document.getElementById(_this.id + '-left-arrow').focus();
            }
        });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.prepareDisplayedView();
    };
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     */
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    CalendarComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        /** @type {?} */
        var valid = true;
        if (selected) {
            if (this.calType === 'single') {
                selected = (/** @type {?} */ (selected));
                valid = selected.isDateValid();
                this.selectedDate = selected;
                if (selected.isDateValid()) {
                    this.prepareDisplayedView();
                }
            }
            else if (this.calType === 'range') {
                selected = (/** @type {?} */ (selected));
                if (!selected.start || !selected.end) {
                    valid = false;
                }
                if (selected.start && !selected.start.isDateValid()) {
                    valid = false;
                }
                if (selected.end && !selected.end.isDateValid()) {
                    valid = false;
                }
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                if (valid) {
                    this.prepareDisplayedView();
                }
            }
        }
        this.isValidDateChange.emit(valid);
    };
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    CalendarComponent.prototype.validate = /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    CalendarComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    CalendarComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    CalendarComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        // Not needed
    };
    /**
     * Method that handle active view change and throws event.
     */
    /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    CalendarComponent.prototype.handleActiveViewChange = /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeView = activeView;
        this.activeViewChange.emit(activeView);
    };
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    CalendarComponent.prototype.selectedDateChanged = /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedDate = date;
        this.onChange(date);
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    };
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    CalendarComponent.prototype.selectedRangeDateChanged = /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    function (dates) {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    };
    /** Function that handles next arrow icon click, depending on current view it changes month, year or list of years */
    /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    CalendarComponent.prototype.handleNextArrowClick = /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    function () {
        switch (this.activeView) {
            case 'day':
                this.displayNextMonth();
                break;
            case 'month':
                this.displayNextYear();
                break;
            case 'year':
                this.displayNextYearList();
                break;
        }
        this.onTouched();
    };
    /** Function that handles previous arrow icon click, depending on current view it changes month, year or list of years */
    /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    CalendarComponent.prototype.handlePreviousArrowClick = /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    function () {
        switch (this.activeView) {
            case 'day':
                this.displayPreviousMonth();
                break;
            case 'month':
                this.displayPreviousYear();
                break;
            case 'year':
                this.displayPreviousYearList();
                break;
        }
        this.onTouched();
    };
    /** Function that allows to switch actual view to next month */
    /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    CalendarComponent.prototype.displayNextMonth = /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    };
    /** Function that allows to switch actual view to previous month */
    /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousMonth = /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    function () {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    };
    /** Function that allows to switch actual view to next year */
    /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    CalendarComponent.prototype.displayNextYear = /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    function () {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year + 1 };
    };
    /** Function that allows to switch actual view to previous year */
    /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousYear = /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    function () {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year - 1 };
    };
    /** Function that allows to switch actually displayed list of year to next year list*/
    /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    CalendarComponent.prototype.displayNextYearList = /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    function () {
        this.yearViewComponent.loadNextYearList();
    };
    /** Function that allows to switch actually displayed list of year to previous year list*/
    /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    CalendarComponent.prototype.displayPreviousYearList = /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    function () {
        this.yearViewComponent.loadPreviousYearList();
    };
    /** Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     */
    /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    CalendarComponent.prototype.setCurrentlyDisplayed = /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    function (fdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    };
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     */
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    CalendarComponent.prototype.handleMonthViewChange = /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.currentlyDisplayed = { month: month, year: this.currentlyDisplayed.year };
        this.activeView = 'day';
        this.activeViewChange.emit(this.activeView);
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    };
    /**
     * @param {?} yearSelected
     * @return {?}
     */
    CalendarComponent.prototype.selectedYear = /**
     * @param {?} yearSelected
     * @return {?}
     */
    function (yearSelected) {
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    CalendarComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
        if (this.calType === 'single') {
            return this.selectedDate &&
                this.selectedDate instanceof FdDate &&
                this.selectedDate.isDateValid();
        }
        else {
            return this.selectedRangeDate &&
                (this.selectedRangeDate.start &&
                    this.selectedRangeDate.start instanceof FdDate &&
                    this.selectedRangeDate.start.isDateValid()) && (this.selectedRangeDate.end &&
                this.selectedRangeDate.end instanceof FdDate &&
                this.selectedRangeDate.start.isDateValid());
        }
    };
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     */
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    CalendarComponent.prototype.prepareDisplayedView = /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    function () {
        if (this.calType === 'single' && this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
        }
        else if (this.selectedRangeDate && this.selectedRangeDate.start) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.start.month,
                year: this.selectedRangeDate.start.year
            };
        }
        else if (this.selectedRangeDate && this.selectedRangeDate.end) {
            this.currentlyDisplayed = {
                month: this.selectedRangeDate.end.month,
                year: this.selectedRangeDate.end.year
            };
        }
        else {
            /** @type {?} */
            var tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-calendar',
                    template: "<fd-calendar-header [currentlyDisplayed]=\"currentlyDisplayed\"\n                    [activeView]=\"activeView\"\n                    (activeViewChange)=\"handleActiveViewChange($event)\"\n                    [id]=\"id\"\n                    (nextClicked)=\"handleNextArrowClick()\"\n                    (previousClicked)=\"handlePreviousArrowClick()\"\n></fd-calendar-header>\n<ng-container [ngSwitch]=\"activeView\">\n    <div class=\"fd-calendar__content\">\n        <fd-calendar-day-view *ngSwitchCase=\"'day'\"\n                              [selectedDate]=\"selectedDate\"\n                              (selectedDateChange)=\"selectedDateChanged($event)\"\n                              [selectedRangeDate]=\"selectedRangeDate\"\n                              (selectedRangeDateChange)=\"selectedRangeDateChanged($event)\"\n                              [currentlyDisplayed]=\"currentlyDisplayed\"\n                              [startingDayOfWeek]=\"startingDayOfWeek\"\n                              [blockFunction]=\"blockFunction\"\n                              [disableFunction]=\"disableFunction\"\n                              [disableRangeEndFunction]=\"disableRangeEndFunction\"\n                              [blockRangeEndFunction]=\"blockRangeEndFunction\"\n                              [disableRangeStartFunction]=\"disableRangeStartFunction\"\n                              [blockRangeStartFunction]=\"blockRangeStartFunction\"\n                              [calType]=\"calType\"\n                              [id]=\"id\"\n                              [focusEscapeFunction]=\"escapeFocusFunction\"\n                              (nextMonthSelect)=\"displayNextMonth()\"\n                              (previousMonthSelect)=\"displayPreviousMonth()\"\n        ></fd-calendar-day-view>\n        <fd-calendar-month-view *ngSwitchCase=\"'month'\"\n                                [monthSelected]=\"currentlyDisplayed?.month\"\n                                [id]=\"id\"\n                                [focusEscapeFunction]=\"escapeFocusFunction\"\n                                (monthClicked)=\"handleMonthViewChange($event)\"\n        ></fd-calendar-month-view>\n        <fd-calendar-year-view *ngSwitchCase=\"'year'\"\n                               (yearClicked)=\"selectedYear($event)\"\n                               [yearSelected]=\"currentlyDisplayed.year\"\n                               [id]=\"id\"\n                               [focusEscapeFunction]=\"escapeFocusFunction\">\n        </fd-calendar-year-view>\n    </div>\n</ng-container>\n\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CalendarComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CalendarComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        '(blur)': 'onTouched()',
                        '[attr.id]': 'id'
                    },
                    styles: [".fd-calendar__content{min-height:276px;background:#fff}.fd-calendar__content li:focus,.fd-calendar__content td:focus{outline:0;box-shadow:inset 0 0 2px 2px var(--fd-color-neutral-3)}.fd-calendar__content li:focus:after,.fd-calendar__content td:focus:after{display:none}"]
                }] }
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarI18n },
        { type: ChangeDetectorRef }
    ]; };
    CalendarComponent.propDecorators = {
        dayViewComponent: [{ type: ViewChild, args: [CalendarDayViewComponent,] }],
        yearViewComponent: [{ type: ViewChild, args: [CalendarYearViewComponent,] }],
        fdCalendarClass: [{ type: HostBinding, args: ['class.fd-calendar',] }],
        fdHasDisplayBlockClass: [{ type: HostBinding, args: ['class.fd-has-display-block',] }],
        selectedDate: [{ type: Input }],
        selectedRangeDate: [{ type: Input }],
        activeView: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        calType: [{ type: Input }],
        id: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        selectedDateChange: [{ type: Output }],
        selectedRangeDateChange: [{ type: Output }],
        isValidDateChange: [{ type: Output }],
        closeCalendar: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }],
        escapeFocusFunction: [{ type: Input }]
    };
    return CalendarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CalendarComponent, CalendarHeaderComponent,
                        CalendarDayViewComponent, CalendarMonthViewComponent, CalendarYearViewComponent],
                    imports: [CommonModule, IconModule],
                    exports: [CalendarComponent, CalendarDayViewComponent,
                        CalendarHeaderComponent, CalendarYearViewComponent, CalendarMonthViewComponent],
                    providers: [CalendarService]
                },] }
    ];
    return CalendarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Not intended for external use.
 */
var PopoverContainer = /** @class */ (function () {
    function PopoverContainer(elRef, cdRef) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.noArrow = true;
        this.isSetup = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PopoverContainer.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.content instanceof TemplateRef) {
            this.loadFromTemplate(this.content);
        }
        else {
            this.contentString = this.content;
        }
        this.setupFocusTrap();
        this.isSetup.emit();
        this.cdRef.detectChanges();
    };
    /**
     * @return {?}
     */
    PopoverContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    PopoverContainer.prototype.loadFromTemplate = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.containerRef.clear();
        /** @type {?} */
        var context = {
            $implicit: this.context
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    };
    /**
     * @private
     * @return {?}
     */
    PopoverContainer.prototype.setupFocusTrap = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    PopoverContainer.prototype.escapeHandler = /**
     * @return {?}
     */
    function () {
        if (this.containerRef && this.context.isOpen && this.closeOnEscapeKey) {
            this.context.close();
        }
    };
    PopoverContainer.decorators = [
        { type: Component, args: [{
                    selector: 'fd-popover-container',
                    template: "\n        <span class=\"fd-popover__arrow\" x-arrow></span>\n        <ng-container #vc>\n            {{contentString}}\n        </ng-container>\n    ",
                    host: {
                        class: 'fd-popover__popper fd-popover-container-custom',
                        'tabindex': '-1'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-popover-container-custom{z-index:1000;transition:none;background-color:#fff}.fd-popover-container-custom:focus{outline:0}"]
                }] }
    ];
    /** @nocollapse */
    PopoverContainer.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    PopoverContainer.propDecorators = {
        containerRef: [{ type: ViewChild, args: ['vc', { read: ViewContainerRef },] }],
        noArrow: [{ type: HostBinding, args: ['class.fd-popover__popper--no-arrow',] }],
        isSetup: [{ type: Output }],
        escapeHandler: [{ type: HostListener, args: ['keydown.escape',] }]
    };
    return PopoverContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive which manages the popper and popover components of the library.
 * It can be attached to any element. To bind it to a body, use the following syntax.
 * ```html
 * <div [fdPopover]="template">Control Element</div>
 * <ng-template #template>
 *     Popover Body
 * </ng-template>
 * ```
 */
var PopoverDirective = /** @class */ (function () {
    /** @hidden */
    function PopoverDirective(elRef, cdRef, resolver, injector, appRef, renderer) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.resolver = resolver;
        this.injector = injector;
        this.appRef = appRef;
        this.renderer = renderer;
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover should display the default arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * The element to which the popover should be appended.
         */
        this.appendTo = 'body';
        /**
         * The Popper.js options to attach to this popover.
         * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details.
         */
        this.options = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'scrollParent'
                }
            }
        };
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        this.eventRef = [];
        this.isSetup = false;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PopoverDirective.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.open();
        }
        this.setupFillBehaviour();
        this.initPlacement();
        this.addTriggerListeners();
        this.isSetup = true;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PopoverDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.popper) {
            this.popper.destroy();
        }
        if (this.containerRef) {
            this.destroyContainer();
        }
        this.destroyTriggerListeners();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    PopoverDirective.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (!this.isSetup) {
            return;
        }
        if (changes.triggers) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.destroyTriggerListeners();
                _this.addTriggerListeners();
            }));
        }
        if (changes.isOpen) {
            if (changes.isOpen.currentValue) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.isOpen = false;
                    _this.open(false);
                }));
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.isOpen = true;
                    _this.close(false);
                }));
            }
        }
        if (changes.placement) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.initPlacement();
            }));
        }
        if (changes.fillControl) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setupFillBehaviour();
            }));
        }
    };
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.toggle = /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (this.isOpen) {
            this.close(fireEvent);
        }
        else {
            this.open(fireEvent);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.open = /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.close = /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    };
    /**
     * Forces an update of the popover's positioning calculation.
     */
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    PopoverDirective.prototype.updatePopper = /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    function () {
        if (this.popper) {
            this.popper.scheduleUpdate();
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.createContainer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.containerRef) {
            return;
        }
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);
        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.noArrow = this.noArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;
        this.appRef.attachView(this.containerRef.hostView);
        /** @type {?} */
        var setupRef = this.containerRef.instance.isSetup.subscribe((/**
         * @return {?}
         */
        function () {
            _this.createPopper();
            setupRef.unsubscribe();
        }));
        /** @type {?} */
        var containerEl = (/** @type {?} */ (((/** @type {?} */ (this.containerRef.hostView))).rootNodes[0]));
        if (this.appendTo === 'body') {
            document.body.appendChild(containerEl);
        }
        else {
            this.appendTo.appendChild(containerEl);
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.destroyTriggerListeners = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.eventRef && this.eventRef.length > 0) {
            this.eventRef.forEach((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event();
            }));
            this.eventRef = [];
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.addTriggerListeners = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach((/**
             * @param {?} trigger
             * @return {?}
             */
            function (trigger$$1) {
                _this.eventRef.push(_this.renderer.listen(_this.elRef.nativeElement, trigger$$1, (/**
                 * @return {?}
                 */
                function () {
                    _this.toggle();
                })));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.destroyContainer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.containerRef) {
            this.appRef.detachView(this.containerRef.hostView);
            this.containerRef.destroy();
            this.containerRef = null;
        }
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.createPopper = /**
     * @private
     * @return {?}
     */
    function () {
        this.popper = new Popper((/** @type {?} */ (this.elRef.nativeElement)), (/** @type {?} */ (this.containerRef.location.nativeElement)), this.options);
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    PopoverDirective.prototype.fillReference = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.offsets.popper.width = data.styles.width = data.offsets.reference.width;
        return data;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    PopoverDirective.prototype.atLeastReference = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.styles.minWidth = data.offsets.reference.width + 'px';
        return data;
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.initPlacement = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.placement) {
            if (this.options) {
                this.options.placement = this.placement;
            }
            else {
                this.options = { placement: this.placement };
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.setupFillBehaviour = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.fillControlMode) {
            if (this.options && this.options.modifiers) {
                this.options.modifiers.fillReference = {
                    enabled: true,
                    fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                    order: 840
                };
            }
            else {
                this.options = {
                    modifiers: {
                        fillReference: {
                            enabled: true,
                            fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                            order: 840
                        }
                    }
                };
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    PopoverDirective.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.containerRef &&
            this.isOpen &&
            this.closeOnOutsideClick &&
            event.target !== this.elRef.nativeElement &&
            !this.elRef.nativeElement.contains(event.target) &&
            !this.containerRef.location.nativeElement.contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        }
    };
    PopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdPopover]'
                },] }
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ApplicationRef },
        { type: Renderer2 }
    ]; };
    PopoverDirective.propDecorators = {
        content: [{ type: Input, args: ['fdPopover',] }],
        isOpen: [{ type: Input }],
        triggers: [{ type: Input }],
        noArrow: [{ type: Input }],
        placement: [{ type: Input }],
        focusTrapped: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        disabled: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        appendTo: [{ type: Input }],
        options: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return PopoverDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A component used to enforce a certain layout for the popover. With additional styling
 * ```html
 * <fd-popover>
 *     <fd-dropdown>Dropdown</fd-dropdown>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
var PopoverDropdownComponent = /** @class */ (function () {
    function PopoverDropdownComponent() {
        /**
         * Whether the popover should have an arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * The btnType to display.
         */
        this.btnType = '';
        /**
         * Whether the dropdown is in compact format.
         */
        this.compact = false;
        /**
         * Whether the dropdown is in a toolbar.
         */
        this.toolbar = false;
        /**
         * Whether the dropdown is opened.
         */
        this.isOpen = false;
    }
    PopoverDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-dropdown-control',
                    host: {
                        class: 'fd-dropdown',
                    },
                    template: "<div class=\"fd-dropdown\">\n    <button\n        fd-button\n        class=\"fd-dropdown__control fd-button\"\n        [ngClass]=\"\n                    (btnType ? ' fd-button--' + btnType : '') +\n                    (glyph ? ' sap-icon--' + glyph : '') +\n                    (compact ? ' fd-button--compact' : '') +\n                    (this.disabled ? ' is-disabled' : '') +\n                    (toolbar ? ' fd-button--standard': '')\n                \"\n        [attr.aria-expanded]=\"this.disabled ? false : isOpen\"\n        [attr.aria-disabled]=\"this.disabled\"\n        aria-haspopup=\"true\"\n        [disabled]=\"disabled\"\n    >\n        <ng-content></ng-content>\n    </button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PopoverDropdownComponent.propDecorators = {
        noArrow: [{ type: Input }],
        disabled: [{ type: Input }],
        glyph: [{ type: Input }],
        btnType: [{ type: Input }],
        compact: [{ type: Input }],
        toolbar: [{ type: Input }],
        isOpen: [{ type: Input }]
    };
    return PopoverDropdownComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var popoverUniqueId = 0;
/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent() {
        /**
         * Whether the popover should have an arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * Whether the popover should be treated as a dropdown.
         */
        this.isDropdown = false;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
        /**
         * The Popper.js options to attach to this popover.
         * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details.
         */
        this.options = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'scrollParent'
                }
            }
        };
        /**
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Id of the popover. If none is provided, one will be generated.
         */
        this.id = 'fd-popover-' + popoverUniqueId++;
    }
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    PopoverComponent.prototype.toggle = /**
     * Toggles the popover open state.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @return {?}
     */
    PopoverComponent.prototype.close = /**
     * Closes the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @return {?}
     */
    PopoverComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Forces an update of the popover's positioning calculation.
     */
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    PopoverComponent.prototype.updatePopover = /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    function () {
        this.directiveRef.updatePopper();
    };
    /**
     * Function is called every time popover changes open attribute
     */
    /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    PopoverComponent.prototype.openChanged = /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpenChange.emit(isOpen);
        this.updateDropdownIsOpen(isOpen);
    };
    /** @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     * */
    /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    PopoverComponent.prototype.updateDropdownIsOpen = /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        if (this.dropdownComponent) {
            this.dropdownComponent.isOpen = isOpen;
        }
    };
    PopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-popover',
                    template: "<div #popoverContainer>\n    <div class=\"fd-popover__control\"\n         [attr.aria-expanded]=\"this.disabled ? false : isOpen\"\n         [attr.aria-disabled]=\"this.disabled\"\n         aria-haspopup=\"true\"\n         [fdPopover]=\"popoverBody\"\n         [(isOpen)]=\"isOpen\"\n         (isOpenChange)=\"openChanged($event)\"\n         [noArrow]=\"noArrow\"\n         [disabled]=\"disabled\"\n         [triggers]=\"triggers\"\n         [placement]=\"placement\"\n         [focusTrapped]=\"focusTrapped\"\n         [options]=\"options\"\n         [fillControlMode]=\"fillControlMode\"\n         [closeOnOutsideClick]=\"closeOnOutsideClick\"\n         [closeOnEscapeKey]=\"closeOnEscapeKey\"\n         [appendTo]=\"(appendTo ? appendTo : popoverContainer)\">\n        <ng-content select=\"fd-popover-control\"></ng-content>\n        <ng-content select=\"fd-dropdown-control\"></ng-content>\n    </div>\n    <ng-template #popoverBody>\n        <ng-container *ngTemplateOutlet=\"popoverBodyTpl\"></ng-container>\n    </ng-template>\n</div>\n\n<ng-template #popoverBodyTpl>\n    <div [attr.aria-hidden]=\"disabled ? true : !isOpen\">\n        <ng-content select=\"fd-popover-body\"></ng-content>\n    </div>\n</ng-template>\n",
                    host: {
                        '[class.fd-popover-custom]': 'true',
                        '[attr.id]': 'id'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-popover-custom{margin-right:0;display:inline-block}.fd-popover-custom .fd-dropdown{position:static}"]
                }] }
    ];
    PopoverComponent.propDecorators = {
        directiveRef: [{ type: ViewChild, args: [PopoverDirective,] }],
        dropdownComponent: [{ type: ContentChild, args: [PopoverDropdownComponent,] }],
        noArrow: [{ type: Input }],
        disabled: [{ type: Input }],
        isDropdown: [{ type: Input }],
        appendTo: [{ type: Input }],
        triggers: [{ type: Input }],
        placement: [{ type: Input }],
        isOpen: [{ type: Input }],
        options: [{ type: Input }],
        focusTrapped: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        id: [{ type: Input }]
    };
    return PopoverComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A component used to enforce a certain layout for the popover.
 * ```html
 * <fd-popover>
 *     <fd-popover-control>Control Element</fd-popover-control>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
var PopoverControlComponent = /** @class */ (function () {
    function PopoverControlComponent() {
    }
    PopoverControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-popover-control',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return PopoverControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A component used to enforce a certain layout for the popover.
 * ```html
 * <fd-popover>
 *     <fd-popover-control>Control Element</fd-popover-control>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
var PopoverBodyComponent = /** @class */ (function () {
    function PopoverBodyComponent() {
    }
    PopoverBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-popover-body',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return PopoverBodyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PopoverComponent,
                        PopoverControlComponent,
                        PopoverBodyComponent,
                        PopoverDirective,
                        PopoverContainer,
                        PopoverDropdownComponent,
                    ],
                    imports: [CommonModule],
                    exports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, PopoverDirective, PopoverDropdownComponent],
                    entryComponents: [PopoverContainer]
                },] }
    ];
    return PopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a menu.
 */
var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        /**
         * @hidden
         */
        this.fdMenuClass = true;
        /**
         * The separator line for each menu item. When set to true, it adds a separator below each menu item in the list.
         * False by default. Leave empty for default.
         */
        this.separator = false;
    }
    MenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-menu',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-menu__item:focus{outline:var(--fd-color-action-focus) dotted 1px}"]
                }] }
    ];
    MenuComponent.propDecorators = {
        fdMenuClass: [{ type: HostBinding, args: ['class.fd-menu',] }],
        separator: [{ type: Input }, { type: HostBinding, args: ['class.fd-menu__list--separated',] }]
    };
    return MenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a menu group.
 */
var MenuGroupComponent = /** @class */ (function () {
    function MenuGroupComponent() {
        /**
         * @hidden
         */
        this.fdHasDisplayBlockClass = true;
        /**
         * @hidden
         */
        this.fdMenuGroupClass = true;
    }
    MenuGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-menu-group',
                    template: "<ng-content select=\"h1.fd-menu-title\"></ng-content>\n<ng-content select=\"ul.fd-menu-list\"></ng-content>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    MenuGroupComponent.propDecorators = {
        fdHasDisplayBlockClass: [{ type: HostBinding, args: ['class.fd-has-display-block',] }],
        fdMenuGroupClass: [{ type: HostBinding, args: ['class.fd-menu__group',] }]
    };
    return MenuGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents the menu title.
 */
var MenuTitleDirective = /** @class */ (function () {
    function MenuTitleDirective() {
        /**
         * @hidden
         */
        this.elementClass = 'fd-menu__title';
    }
    MenuTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-menu-title]'
                },] }
    ];
    MenuTitleDirective.propDecorators = {
        elementClass: [{ type: HostBinding, args: ['class',] }]
    };
    return MenuTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a listing structure of the menu.
 */
var MenuListDirective = /** @class */ (function () {
    function MenuListDirective() {
        /**
         * @hidden
         */
        this.fdMenuListClass = true;
    }
    MenuListDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-menu-list]'
                },] }
    ];
    MenuListDirective.propDecorators = {
        fdMenuListClass: [{ type: HostBinding, args: ['class.fd-menu__list',] }]
    };
    return MenuListDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a menu item.
 */
var MenuItemDirective = /** @class */ (function () {
    /** @hidden */
    function MenuItemDirective(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
    }
    /**
     * @return {?}
     */
    MenuItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MenuItemDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
    MenuItemDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-menu-item]',
                },] }
    ];
    /** @nocollapse */
    MenuItemDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MenuItemDirective.propDecorators = {
        fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }]
    };
    return MenuItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive for menu addon(for icons).
 */
var MenuAddonDirective = /** @class */ (function () {
    function MenuAddonDirective() {
        /**
         * @hidden
         */
        this.fdMenuAddonClass = true;
    }
    MenuAddonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fd-menu-addon], [fdMenuAddon]'
                },] }
    ];
    MenuAddonDirective.propDecorators = {
        fdMenuAddonClass: [{ type: HostBinding, args: ['class.fd-menu--addon-before',] }]
    };
    return MenuAddonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive for menu item addon(for icons).
 */
var MenuItemAddonDirective = /** @class */ (function () {
    function MenuItemAddonDirective() {
        /**
         * @hidden
         */
        this.fdMenuItemAddonClass = true;
    }
    MenuItemAddonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fd-menu-item-addon], [fdMenuItemAddon]'
                },] }
    ];
    MenuItemAddonDirective.propDecorators = {
        fdMenuItemAddonClass: [{ type: HostBinding, args: ['class.fd-menu__addon-before',] }]
    };
    return MenuItemAddonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        MenuComponent,
                        MenuGroupComponent,
                        MenuTitleDirective,
                        MenuListDirective,
                        MenuItemDirective,
                        MenuAddonDirective,
                        MenuItemAddonDirective
                    ],
                    declarations: [
                        MenuComponent,
                        MenuGroupComponent,
                        MenuTitleDirective,
                        MenuListDirective,
                        MenuItemDirective,
                        MenuAddonDirective,
                        MenuItemAddonDirective
                    ]
                },] }
    ];
    return MenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DisplayFnPipe = /** @class */ (function () {
    function DisplayFnPipe() {
    }
    /**
     * @param {?} value
     * @param {?} displayFn
     * @return {?}
     */
    DisplayFnPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} displayFn
     * @return {?}
     */
    function (value, displayFn) {
        return displayFn(value);
    };
    DisplayFnPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'displayFnPipe'
                },] }
    ];
    return DisplayFnPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SearchHighlightPipe = /** @class */ (function () {
    function SearchHighlightPipe() {
    }
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    SearchHighlightPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    function (value, args, active) {
        if (active === void 0) { active = true; }
        if (args && value && active) {
            /** @type {?} */
            var startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                /** @type {?} */
                var matchingString = value.substr(startIndex, args.length);
                return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        return value;
    };
    SearchHighlightPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'highlight'
                },] }
    ];
    return SearchHighlightPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PipeModule = /** @class */ (function () {
    function PipeModule() {
    }
    PipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DisplayFnPipe,
                        SearchHighlightPipe
                    ],
                    exports: [
                        DisplayFnPipe,
                        SearchHighlightPipe
                    ]
                },] }
    ];
    return PipeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuKeyboardService = /** @class */ (function () {
    function MenuKeyboardService() {
        /**
         * Event emitted when an item link is clicked.
         */
        this.itemClicked = new Subject();
        /**
         * Whether user wants to remove keyboard handling
         */
        this.disableKeydownHandling = false;
    }
    /** Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param event KeyboardEvent
     * @param index index of items starts from 0
     * @param menuItems array of menu item directives
     * */
    /**
     * Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param {?} event KeyboardEvent
     * @param {?} index index of items starts from 0
     * @param {?} menuItems array of menu item directives
     *
     * @return {?}
     */
    MenuKeyboardService.prototype.keyDownHandler = /**
     * Function that should be called every time, keydown event is used on some menu item,
     * it provides whole functionality for handling
     * ArrowDown - focus, ArrowUp - focus, Space bar - simulate click, Enter key - simulate click.
     * @param {?} event KeyboardEvent
     * @param {?} index index of items starts from 0
     * @param {?} menuItems array of menu item directives
     *
     * @return {?}
     */
    function (event, index, menuItems) {
        if (this.disableKeydownHandling) {
            return;
        }
        switch (event.code) {
            case ('ArrowDown'): {
                if (menuItems.length > index + 1) {
                    menuItems[index + 1].focus();
                }
                else {
                    if (this.focusEscapeAfterList) {
                        this.focusEscapeAfterList();
                    }
                    else {
                        menuItems[0].focus();
                    }
                }
                event.preventDefault();
                break;
            }
            case ('ArrowUp'): {
                if (index > 0) {
                    menuItems[index - 1].focus();
                }
                else {
                    if (this.focusEscapeBeforeList) {
                        this.focusEscapeBeforeList();
                    }
                    else {
                        menuItems[menuItems.length - 1].focus();
                    }
                }
                event.preventDefault();
                break;
            }
            case ('Space'): {
                if (menuItems[index]) {
                    menuItems[index].click();
                    event.preventDefault();
                }
                break;
            }
            case ('Enter'): {
                if (menuItems[index]) {
                    menuItems[index].click();
                    event.preventDefault();
                }
                break;
            }
        }
    };
    MenuKeyboardService.propDecorators = {
        itemClicked: [{ type: Output }]
    };
    return MenuKeyboardService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Allows users to filter through results and select a value.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-combobox
 *      [(ngModel)]="searchTerm"
 *      [dropdownValues]="dropdownValues"
 *      [placeholder]="'Type some text...'">
 * </fd-combobox>
 * ```
 */
var ComboboxComponent = /** @class */ (function () {
    function ComboboxComponent(elRef, menuKeyboardService) {
        this.elRef = elRef;
        this.menuKeyboardService = menuKeyboardService;
        /**
         * Values to be filtered in the search input.
         */
        this.dropdownValues = [];
        /**
         * Filter function. Accepts an array of objects and a search term as arguments
         * and returns a string. See search input examples for details.
         */
        this.filterFn = this.defaultFilter;
        /**
         * Icon to display in the right-side button.
         */
        this.glyph = 'navigation-down-arrow';
        /**
         *  The trigger events that will open/close the options popover, by default it is click, so if user click on
         *  input field, the popover with options will open or close
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Max height of the popover. Any overflowing elements will be accessible through scrolling.
         */
        this.maxHeight = '200px';
        /**
         * Whether the search input should be displayed in compact mode.
         */
        this.compact = false;
        /**
         * Whether the matching string should be highlighted during filtration.
         */
        this.highlighting = true;
        /**
         * Whether the popover should close when a user selects a result.
         */
        this.closeOnSelect = true;
        /**
         * Whether the input field should be populated with the result picked by the user.
         */
        this.fillOnSelect = true;
        /**
         * Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
         * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
         * can be achieved only by objects with same type as dropdownValue
         */
        this.communicateByObject = false;
        /**
         * Display function. Accepts an object of the same type as the
         * items passed to dropdownValues as argument, and outputs a string.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See search input examples for details.
         */
        this.displayFn = this.defaultDisplay;
        /**
         * Event emitted when an item is clicked. Use *$event* to retrieve it.
         */
        this.itemClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.displayedValues = [];
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * @hidden
         */
        this.onDestroy$ = new Subject();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        this.setupFocusTrap();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ComboboxComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    };
    /**
     * @return {?}
     */
    ComboboxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.ngAfterViewInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.onMenuClickHandler(index); }));
        this.menuKeyboardService.focusEscapeBeforeList = (/**
         * @return {?}
         */
        function () { return _this.searchInputElement.nativeElement.focus(); });
        this.menuKeyboardService.focusEscapeAfterList = (/**
         * @return {?}
         */
        function () { });
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ComboboxComponent.prototype.onInputKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.focus();
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ComboboxComponent.prototype.onInputKeyupHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.inputText &&
            this.inputText.length &&
            event.code !== 'Escape' &&
            event.code !== 'Space' &&
            event.code !== 'Enter') {
            this.isOpen = true;
            this.isOpenChangeHandle(this.isOpen);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    ComboboxComponent.prototype.onMenuKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    ComboboxComponent.prototype.onMenuClickHandler = /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this.handleClickActions(selectedItem);
            this.itemClicked.emit({ item: selectedItem, index: index });
        }
    };
    Object.defineProperty(ComboboxComponent.prototype, "inputText", {
        /** Get the input text of the input. */
        get: /**
         * Get the input text of the input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the input text of the input. */
        set: /**
         * Set the input text of the input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            if (this.communicateByObject) {
                this.onChange(this.getOptionObjectByDisplayedValue(value));
            }
            else {
                this.onChange(value);
            }
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    ComboboxComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.communicateByObject) {
            this.inputTextValue = this.displayFn(value);
        }
        else {
            this.inputTextValue = value;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ComboboxComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ComboboxComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.onPrimaryButtonClick = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.searchFunction) {
            this.searchFunction();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    ComboboxComponent.prototype.isOpenChangeHandle = /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpen = isOpen;
        this.onTouched();
        if (isOpen) {
            this.focusTrap.activate();
        }
        else {
            this.focusTrap.deactivate();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    ComboboxComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    ComboboxComponent.prototype.defaultDisplay = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    ComboboxComponent.prototype.defaultFilter = /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    function (contentArray, searchTerm) {
        var _this = this;
        /** @type {?} */
        var searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return _this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    };
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    ComboboxComponent.prototype.handleClickActions = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
            this.isOpenChangeHandle(this.isOpen);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    };
    /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    ComboboxComponent.prototype.getOptionObjectByDisplayedValue = /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    function (displayValue) {
        var _this = this;
        return this.dropdownValues.find((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.displayFn(value) === displayValue; }));
    };
    /**
     * @private
     * @return {?}
     */
    ComboboxComponent.prototype.setupFocusTrap = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            this.focusTrap = focusTrap(this.elRef.nativeElement, {
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                escapeDeactivates: false
            });
        }
        catch (e) {
            console.warn('Unsuccessful attempting to focus trap the Combobox.');
        }
    };
    ComboboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-combobox',
                    template: "<fd-popover [isOpen]=\"isOpen\"\n            (isOpenChange)=\"isOpenChangeHandle($event)\"\n            [fillControlMode]=\"'at-least'\"\n            [triggers]=\"triggers\"\n            [disabled]=\"disabled\"\n            class=\"fd-combobox-popover-custom\"\n            [ngClass]=\"{'fd-popover-body--display-none': displayedValues && !displayedValues.length}\">\n    <fd-popover-control>\n        <div class=\"fd-combobox-control\">\n            <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                <input #searchInputElement type=\"text\" class=\"fd-input\" [ngClass]=\"{'fd-input--compact': compact}\"\n                       (keydown)=\"onInputKeydownHandler($event)\"\n                       (keyup)=\"onInputKeyupHandler($event)\"\n                       [disabled]=\"disabled\"\n                       [(ngModel)]=\"inputText\"\n                       (ngModelChange)=\"handleSearchTermChange()\"\n                       placeholder=\"{{placeholder}}\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button fd-button\n                            tabindex=\"-1\"\n                            type=\"button\"\n                            [fdType]=\"'light'\"\n                            [glyph]=\"glyph\"\n                            [disabled]=\"disabled\"\n                            (click)=\"onPrimaryButtonClick()\">\n                    </button>\n                </span>\n            </div>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displayedValues && displayedValues.length\">\n        <fd-menu class=\"fd-combobox-input-menu-overflow\"\n                 [style.maxHeight]=\"maxHeight\">\n            <ng-content></ng-content>\n            <ul fd-menu-list>\n                <li *ngFor=\"let term of displayedValues; let index = index;\"\n                    (click)=\"onMenuClickHandler(index)\"\n                    (keydown)=\"onMenuKeydownHandler($event, index)\"\n                    fd-menu-item\n                    tabindex=\"0\">\n                    <span *ngIf=\"!itemTemplate\"\n                          [innerHTML]=\"term | displayFnPipe:displayFn | highlight:inputText:highlighting\"\n                    ></span>\n                    <ng-container *ngIf=\"itemTemplate\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: term}\"></ng-container>\n                    </ng-container>\n                </li>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ComboboxComponent; })),
                            multi: true
                        },
                        MenuKeyboardService
                    ],
                    host: {
                        '[class.fd-combobox-custom-class]': 'true',
                        '[class.fd-combobox-input]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-combobox-custom-class,.fd-combobox-custom-class .fd-combobox-popover-custom{display:block}.fd-combobox-custom-class .fd-combobox-input-menu-overflow{overflow:auto}"]
                }] }
    ];
    /** @nocollapse */
    ComboboxComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MenuKeyboardService }
    ]; };
    ComboboxComponent.propDecorators = {
        dropdownValues: [{ type: Input }],
        filterFn: [{ type: Input }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        glyph: [{ type: Input }],
        triggers: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        maxHeight: [{ type: Input }],
        searchFunction: [{ type: Input }],
        compact: [{ type: Input }],
        highlighting: [{ type: Input }],
        closeOnSelect: [{ type: Input }],
        fillOnSelect: [{ type: Input }],
        communicateByObject: [{ type: Input }],
        displayFn: [{ type: Input }],
        itemClicked: [{ type: Output }],
        menuItems: [{ type: ViewChildren, args: [MenuItemDirective,] }],
        searchInputElement: [{ type: ViewChild, args: ['searchInputElement',] }]
    };
    return ComboboxComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ComboboxModule = /** @class */ (function () {
    function ComboboxModule() {
    }
    ComboboxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ComboboxComponent],
                    imports: [CommonModule, PopoverModule, FormsModule, MenuModule, PipeModule, ButtonModule],
                    exports: [ComboboxComponent]
                },] }
    ];
    return ComboboxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function DATE_FORMAT_FACTORY() {
    return new DateFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the date format and parser.
 * @abstract
 */
var DateFormatParser = /** @class */ (function () {
    function DateFormatParser() {
        /**
         * Delimiter for the range. This should not show up in the string representation of the dates.
         */
        this.rangeDelimiter = ' - ';
    }
    DateFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: DATE_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ DateFormatParser.ngInjectableDef = defineInjectable({ factory: DATE_FORMAT_FACTORY, token: DateFormatParser, providedIn: "root" });
    return DateFormatParser;
}());
/**
 * Default implementation of the DateFormatParser service.
 */
var DateFormatParserDefault = /** @class */ (function (_super) {
    __extends(DateFormatParserDefault, _super);
    function DateFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string value and return a FdDate model object.
     * @param value String to concert to a FdDate model object.
     */
    /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    DateFormatParserDefault.prototype.parse = /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    function (value) {
        if (value) {
            /** @type {?} */
            var str = value.toString().split('/').map(Number);
            return new FdDate(str[2], str[0], str[1]);
        }
        else {
            return new FdDate(null, null, null);
        }
    };
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param date FdDate to format to string value.
     */
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    DateFormatParserDefault.prototype.format = /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    function (date) {
        return date.month + '/' + date.day + '/' + date.year;
    };
    DateFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return DateFormatParserDefault;
}(DateFormatParser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The datetime picker component is an opinionated composition of the fd-popover and
 * fd-calendar components to accomplish the UI pattern for picking a date.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-date-picker [(ngModel)]="date"></fd-date-picker>
 * ```
 */
var DatePickerComponent = /** @class */ (function () {
    /** @hidden */
    function DatePickerComponent(dateAdapter) {
        this.dateAdapter = dateAdapter;
        /**
         * @hidden The value of the input
         */
        this.inputFieldDate = null;
        /**
         * @hidden Whether the date input is invalid
         */
        this.isInvalidDateInput = false;
        /**
         * @hidden Whether the date picker is open
         */
        this.isOpen = false;
        /**
         * The type of calendar, 'single' for single date selection or 'range' for a range of dates.
         */
        this.type = 'single';
        /**
         * Date picker input placeholder string
         */
        this.placeholder = 'mm/dd/yyyy';
        /**
         * Whether this is the compact input date picker
         */
        this.compact = false;
        /**
         * The currently selected FdDates model start and end in range mode.
         */
        this.selectedRangeDate = { start: null, end: null };
        /**
         * The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on.
         */
        this.startingDayOfWeek = 1;
        /**
         * Whether to validate the date picker input.
         */
        this.useValidation = true;
        /**
         * Aria label for the datepicker input.
         */
        this.dateInputLabel = 'Date input';
        /**
         * Aria label for the button to show/hide the calendar.
         */
        this.displayCalendarToggleLabel = 'Display calendar toggle';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
         */
        this.activeView = 'day';
        /**
         *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         */
        this.placement = 'bottom-start';
        /**
         * Fired when a new date is selected.
         */
        this.selectedDateChange = new EventEmitter();
        /**
         * Event thrown every time selected first or last date in range mode is changed
         */
        this.selectedRangeDateChange = new EventEmitter();
        /**
         * Event thrown every time calendar active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * Method that handle calendar active view change and throws event.
     */
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    DatePickerComponent.prototype.handleCalendarActiveViewChange = /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeViewChange.emit(activeView);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatePickerComponent.prototype.closeFromCalendar = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.type === 'single') {
            this.closeCalendar();
        }
    };
    /** Opens the calendar */
    /**
     * Opens the calendar
     * @return {?}
     */
    DatePickerComponent.prototype.openCalendar = /**
     * Opens the calendar
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    };
    /** Toggles the calendar open or closed */
    /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    DatePickerComponent.prototype.toggleCalendar = /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    function () {
        this.onTouched();
        this.isOpen = !this.isOpen;
    };
    /** Closes the calendar if it is open */
    /**
     * Closes the calendar if it is open
     * @return {?}
     */
    DatePickerComponent.prototype.closeCalendar = /**
     * Closes the calendar if it is open
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.handleSingleDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    DatePickerComponent.prototype.handleRangeDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    function (dates) {
        if (dates &&
            (!CalendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !CalendarService.datesEqual(this.selectedRangeDate.end, dates.end))) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end);
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
        }
    };
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    DatePickerComponent.prototype.handleInputChange = /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    function (strDate) {
        this.dateStringUpdate(strDate);
    };
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    DatePickerComponent.prototype.validate = /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    DatePickerComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    DatePickerComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        /** If written value is not defined, null, empty string */
        if (!selected) {
            this.inputFieldDate = '';
            return;
        }
        if (this.type === 'single') {
            /**
             * For single mode, if the date is invalid, model is changed, it refresh currently
             * input field text, but it does not refresh currently displayed day
             */
            selected = (/** @type {?} */ (selected));
            this.selectedDate = selected;
            if (this.isModelValid()) {
                this.inputFieldDate = this.dateAdapter.format(selected);
                this.calendarComponent.setCurrentlyDisplayed(this.selectedDate);
            }
            else {
                this.inputFieldDate = '';
            }
        }
        else {
            /**
             * For range mode, if the date is invalid, model is changed, but it does not refresh currently
             * displayed day view, or input field text
             */
            selected = (/** @type {?} */ (selected));
            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                if (this.isModelValid()) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                    this.inputFieldDate = this.dateAdapter.format(selected.start) +
                        this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.end);
                }
                else {
                    this.inputFieldDate = '';
                }
            }
            else {
                this.inputFieldDate = '';
            }
        }
        this.isInvalidDateInput = !this.isModelValid();
    };
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     */
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.dateStringUpdate = /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** Case when there is single mode */
        if (this.type === 'single') {
            /** @type {?} */
            var fdDate = this.dateAdapter.parse(date);
            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed date fro string is valid or not.
             */
            if (!CalendarService.datesEqual(fdDate, this.selectedDate)) {
                this.isInvalidDateInput = !fdDate.isDateValid();
                this.selectedDate = fdDate;
                this.onChange(this.selectedDate);
                this.selectedDateChange.emit(this.selectedDate);
                /** Check if date is valid, if it's not, there is no need to refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                }
            }
            /** Case when there is range mode */
        }
        else {
            /** @type {?} */
            var currentDates = date.split(this.dateAdapter.rangeDelimiter);
            /** @type {?} */
            var firstDate = this.dateAdapter.parse(currentDates[0]);
            /** @type {?} */
            var secondDate = this.dateAdapter.parse(currentDates[1]);
            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed dates from string are valid or not.
             */
            if (!CalendarService.datesEqual(firstDate, this.selectedRangeDate.start) ||
                !CalendarService.datesEqual(secondDate, this.selectedRangeDate.end)) {
                this.isInvalidDateInput = !firstDate.isDateValid() || !secondDate.isDateValid();
                /** If the end date is before the start date, there is need to replace them  */
                if ((firstDate.getTimeStamp() > secondDate.getTimeStamp()) && secondDate.isDateValid()) {
                    this.selectedRangeDate = { start: secondDate, end: firstDate };
                }
                else {
                    this.selectedRangeDate = { start: firstDate, end: secondDate };
                }
                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange({ start: this.selectedRangeDate.start, end: this.selectedRangeDate.end });
                /** Check if dates are valid, if it's not, there is no need o refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                }
            }
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
        }
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    DatePickerComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
        if (this.type === 'single') {
            return this.selectedDate &&
                this.selectedDate instanceof FdDate &&
                this.selectedDate.isDateValid();
        }
        else {
            return this.selectedRangeDate &&
                (this.selectedRangeDate.start &&
                    this.selectedRangeDate.start instanceof FdDate &&
                    this.selectedRangeDate.start.isDateValid()) && (this.selectedRangeDate.end &&
                this.selectedRangeDate.end instanceof FdDate &&
                this.selectedRangeDate.end.isDateValid());
        }
    };
    DatePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-date-picker',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            (isOpenChange)=\"handleInputChange(datePicker.value)\"\n            [triggers]=\"[]\"\n            [placement]=\"placement\"\n            [closeOnEscapeKey]=\"true\"\n            [disabled]=\"disabled\">\n    <fd-popover-control>\n        <div class=\"fd-input-group fd-input-group--after\"\n             [ngClass]=\"{'fd-input-group--compact' : compact}\">\n            <input #datePicker\n                   type=\"text\"\n                   [attr.aria-label]=\"dateInputLabel\"\n                   [value]=\"inputFieldDate\"\n                   [placeholder]=\"placeholder\"\n                   (keyup.enter)=\"handleInputChange(datePicker.value)\"\n                   (click)=\"openCalendar()\"\n                   [disabled]=\"disabled\"\n                   [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidDateInput && useValidation }\">\n            <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button [disabled]=\"disabled\" class=\"fd-popover__control fd-button--icon fd-button--light sap-icon--calendar\"\n                            (click)=\"toggleCalendar()\" [attr.aria-label]=\"displayCalendarToggleLabel\"\n                            [attr.aria-expanded]=\"isOpen\" type=\"button\"></button>\n            </span>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body\n        [style.display]=\"'block'\"\n        [attr.aria-expanded]=\"isOpen\"\n        [attr.aria-hidden]=\"!isOpen\">\n        <fd-calendar (closeCalendar)=\"closeFromCalendar()\"\n                     [activeView]=\"activeView\"\n                     (activeViewChange)=\"handleCalendarActiveViewChange($event)\"\n                     [calType]=\"type\"\n                     [disableFunction]=\"disableFunction ? disableFunction : null\"\n                     [blockFunction]=\"blockFunction ? blockFunction : null\"\n                     [disableRangeStartFunction]=\"disableRangeStartFunction ? disableRangeStartFunction : null\"\n                     [disableRangeEndFunction]=\"disableRangeEndFunction ? disableRangeEndFunction : null\"\n                     [blockRangeStartFunction]=\"blockRangeStartFunction ? blockRangeStartFunction : null\"\n                     [blockRangeEndFunction]=\"blockRangeEndFunction ? blockRangeEndFunction : null\"\n                     [selectedDate]=\"selectedDate\"\n                     [selectedRangeDate]=\"selectedRangeDate\"\n                     (selectedRangeDateChange)=\"handleRangeDateChange($event)\"\n                     (selectedDateChange)=\"handleSingleDateChange($event)\"\n                     [startingDayOfWeek]=\"startingDayOfWeek\"></fd-calendar>\n    </fd-popover-body>\n</fd-popover>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        '[class.fd-date-picker]': 'true',
                        '[class.fd-date-picker-custom]': 'true'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatePickerComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-date-picker-custom{display:inline-block}.fd-date-picker-custom fd-popover{display:block}"]
                }] }
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return [
        { type: DateFormatParser }
    ]; };
    DatePickerComponent.propDecorators = {
        calendarComponent: [{ type: ViewChild, args: [CalendarComponent,] }],
        type: [{ type: Input }],
        placeholder: [{ type: Input }],
        compact: [{ type: Input }],
        selectedDate: [{ type: Input }],
        selectedRangeDate: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        useValidation: [{ type: Input }],
        dateInputLabel: [{ type: Input }],
        displayCalendarToggleLabel: [{ type: Input }],
        allowNull: [{ type: Input }],
        activeView: [{ type: Input }],
        placement: [{ type: Input }],
        disabled: [{ type: Input }],
        selectedDateChange: [{ type: Output }],
        selectedRangeDateChange: [{ type: Output }],
        activeViewChange: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }]
    };
    return DatePickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatePickerModule = /** @class */ (function () {
    function DatePickerModule() {
    }
    DatePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DatePickerComponent],
                    imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule],
                    exports: [DatePickerComponent]
                },] }
    ];
    return DatePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimeObject = /** @class */ (function () {
    function TimeObject() {
    }
    return TimeObject;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for labels inside the time component.
 */
var TimeI18nLabels = /** @class */ (function () {
    function TimeI18nLabels() {
        /**
         * Aria label for the 'increase hours' button
         */
        this.increaseHoursLabel = 'Increase hours';
        /**
         * Aria label for the 'hours' input
         */
        this.hoursLabel = 'Hours';
        /**
         * Aria label for the 'decrease hours' button
         */
        this.decreaseHoursLabel = 'Decrease hours';
        /**
         * Aria label for the 'increase minutes' button
         */
        this.increaseMinutesLabel = 'Increase minutes';
        /**
         * Aria label for the 'minutes' input
         */
        this.minutesLabel = 'Minutes';
        /**
         * Aria label for the 'decrease minutes' button
         */
        this.decreaseMinutesLabel = 'Decrease minutes';
        /**
         * Aria label for the 'increase seconds' button
         */
        this.increaseSecondsLabel = 'Increase seconds';
        /**
         * Aria label for the 'seconds' input
         */
        this.secondsLabel = 'Seconds';
        /**
         * Aria label for the 'decrease seconds' button
         */
        this.decreaseSecondsLabel = 'Decrease seconds';
        /**
         * Aria label for the 'increase period' button
         */
        this.increasePeriodLabel = 'Increase period';
        /**
         * Aria label for the 'period' input
         */
        this.periodLabel = 'Period';
        /**
         * Aria label for the 'decrease period' button
         */
        this.decreasePeriodLabel = 'Decrease period';
    }
    TimeI18nLabels.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ TimeI18nLabels.ngInjectableDef = defineInjectable({ factory: function TimeI18nLabels_Factory() { return new TimeI18nLabels(); }, token: TimeI18nLabels, providedIn: "root" });
    return TimeI18nLabels;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
var TimeI18n = /** @class */ (function () {
    function TimeI18n() {
        /**
         * Ante Meridian naming label. The value written in the input should match this or Post Meridian. Otherwise it would be
         * treated as invalid
         *
         */
        this.meridianAm = 'am';
        /**
         * Post Meridian naming label. The value written in the input should match this or Ante Meridian. Otherwise it would be
         * treated as invalid
         *
         */
        this.meridianPm = 'pm';
        /**
         * Placeholder on the Ante Meridian / Post Meridian input
         *
         */
        this.meridianPlaceholder = 'am';
        /**
         * Placeholder for hours input
         *
         */
        this.hoursPlaceholder = 'hh';
        /**
         * Placeholder for minutes input
         *
         */
        this.minutesPlaceholder = 'mm';
        /**
         * Placeholder for seconds input
         *
         */
        this.secondsPlaceholder = 'ss';
        /**
         * Defines if the meridian validation should be case sensitive.
         *
         */
        this.meridianCaseSensitive = false;
    }
    TimeI18n.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ TimeI18n.ngInjectableDef = defineInjectable({ factory: function TimeI18n_Factory() { return new TimeI18n(); }, token: TimeI18n, providedIn: "root" });
    return TimeI18n;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimeComponent = /** @class */ (function () {
    function TimeComponent(timeI18nLabels, timeI18n) {
        this.timeI18nLabels = timeI18nLabels;
        this.timeI18n = timeI18n;
        /**
         * \@Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
         * and does not display a period control.
         */
        this.meridian = false;
        /**
         * \@Input When set to false, does not set the input field to invalid state on invalid entry.
         */
        this.validate = true;
        /**
         * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
         */
        this.spinners = true;
        /**
         * \@Input When set to false, hides the input for seconds.
         */
        this.displaySeconds = true;
        /**
         * \@Input When set to false, hides the input for minutes.
         */
        this.displayMinutes = true;
        /**
         * When set to false, hides the input for hours
         */
        this.displayHours = true;
        /**
         * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
         * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
         *
         * ```json
         * { hour: 12, minute: 0, second: 0 }
         * ```
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * @hidden
         */
        this.focusArrowLeft = new EventEmitter();
        /**
         * @hidden
         * Variable that is displayed as an hour.
         * For meridian mode ranging from 0 to 12,
         * For non-meridian mode ranging from 0 to 23, and reflects the hour value
         */
        this.displayedHour = 0;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} time
         * @return {?}
         */
        function (time) {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimeComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimeComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    TimeComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    TimeComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (!time) {
            return;
        }
        this.time = time;
        this.setDisplayedHour();
    };
    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    TimeComponent.prototype.ngOnChanges = /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
        }
    };
    /** @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     */
    /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    TimeComponent.prototype.setDisplayedHour = /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    function () {
        if (!this.meridian) {
            this.displayedHour = this.time.hour;
        }
        else if (this.time.hour === 0) {
            this.displayedHour = 12;
            this.period = this.timeI18n.meridianAm;
        }
        else if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = this.timeI18n.meridianPm;
        }
        else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = this.timeI18n.meridianPm;
        }
        else {
            this.displayedHour = this.time.hour;
            this.period = this.timeI18n.meridianAm;
        }
    };
    /** @hidden
     * Handles changes of displayed hour value from template.
     */
    /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    TimeComponent.prototype.displayedHourChanged = /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    function () {
        if (!this.meridian) {
            this.time.hour = this.displayedHour;
        }
        else {
            if (this.period === this.timeI18n.meridianAm) {
                if (this.displayedHour === 12) {
                    this.time.hour = 0;
                }
                else {
                    this.time.hour = this.displayedHour;
                }
            }
            else if (this.period === this.timeI18n.meridianPm) {
                if (this.displayedHour === 12) {
                    this.time.hour = this.displayedHour;
                }
                else {
                    this.time.hour = this.displayedHour + 12;
                }
            }
        }
        this.onChange(this.time);
    };
    /** @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     */
    /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    TimeComponent.prototype.inputBlur = /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    function (inputType) {
        switch (inputType) {
            case 'hour': {
                this.displayedHour = Math.round(Math.abs(this.displayedHour)) % 24;
                this.time.hour = this.displayedHour;
                if (this.meridian) {
                    if (this.displayedHour > 12) {
                        this.period = this.timeI18n.meridianPm;
                        this.displayedHour = this.displayedHour !== 12 ? this.displayedHour % 12 : this.displayedHour;
                    }
                    else if (this.displayedHour === 0) {
                        this.displayedHour = 12;
                        this.period = this.timeI18n.meridianAm;
                    }
                    else if (this.isAm(this.period) && this.displayedHour === 12) {
                        this.time.hour = 0;
                    }
                }
                break;
            }
            case 'minute': {
                this.time.minute = Math.abs(Math.round(this.time.minute) % 60);
                break;
            }
            case 'second': {
                this.time.second = Math.abs(Math.round(this.time.second) % 60);
                break;
            }
            case 'period': {
                /**
                 * When there is invalid period, function changes period to valid basing on actual hour
                 */
                if (!this.period ||
                    (!this.isPm(this.period) && !this.isAm(this.period))) {
                    this.setDisplayedHour();
                }
            }
        }
        this.onChange(this.time);
    };
    /** Increases the hour value by one. */
    /**
     * Increases the hour value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseHour = /**
     * Increases the hour value by one.
     * @return {?}
     */
    function () {
        if (this.time.hour === null) {
            this.time.hour = 0;
        }
        else if (this.time.hour === 23) {
            this.time.hour = 0;
        }
        else {
            this.time.hour = this.time.hour + 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    };
    /** Decreases the hour value by one. */
    /**
     * Decreases the hour value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseHour = /**
     * Decreases the hour value by one.
     * @return {?}
     */
    function () {
        if (this.time.hour === null) {
            this.time.hour = 0;
        }
        else if (this.time.hour === 0) {
            this.time.hour = 23;
        }
        else {
            this.time.hour = this.time.hour - 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    };
    /** Increases the minute value by one. */
    /**
     * Increases the minute value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseMinute = /**
     * Increases the minute value by one.
     * @return {?}
     */
    function () {
        if (this.time.minute === null) {
            this.time.minute = 0;
        }
        else if (this.time.minute === 59) {
            this.time.minute = 0;
            this.increaseHour();
        }
        else {
            this.time.minute = this.time.minute + 1;
        }
        this.onChange(this.time);
    };
    /** Decreases the minute value by one. */
    /**
     * Decreases the minute value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseMinute = /**
     * Decreases the minute value by one.
     * @return {?}
     */
    function () {
        if (this.time.minute === null) {
            this.time.minute = 0;
        }
        else if (this.time.minute === 0) {
            this.time.minute = 59;
            this.decreaseHour();
        }
        else {
            this.time.minute = this.time.minute - 1;
        }
        this.onChange(this.time);
    };
    /** Increases the second value by one. */
    /**
     * Increases the second value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseSecond = /**
     * Increases the second value by one.
     * @return {?}
     */
    function () {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            }
            else if (this.time.second === 59) {
                this.time.second = 0;
                this.increaseMinute();
            }
            else {
                this.time.second = this.time.second + 1;
            }
        }
        this.onChange(this.time);
    };
    /** Decreases the second value by one. */
    /**
     * Decreases the second value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseSecond = /**
     * Decreases the second value by one.
     * @return {?}
     */
    function () {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            }
            else if (this.time.second === 0) {
                this.time.second = 59;
                this.decreaseMinute();
            }
            else {
                this.time.second = this.time.second - 1;
            }
        }
        this.onChange(this.time);
    };
    /** Toggles the period (am/pm). */
    /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    TimeComponent.prototype.togglePeriod = /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    function () {
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isAm(this.period)) {
                this.period = this.timeI18n.meridianPm;
                this.periodModelChange();
            }
            else if (this.isPm(this.period)) {
                this.period = this.timeI18n.meridianAm;
                this.periodModelChange();
            }
        }
    };
    /** @hidden
     * Handles minutes model change from template
     * */
    /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    TimeComponent.prototype.minuteModelChange = /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    function () {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    };
    /** @hidden
     * Handles seconds model change from template
     * */
    /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    TimeComponent.prototype.secondModelChange = /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    function () {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    };
    /** @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     */
    /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    TimeComponent.prototype.periodModelChange = /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    function () {
        if (this.time && !this.time.hour) {
            this.time.hour = 0;
        }
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isPm(this.period) && this.time.hour < 12) {
                this.time.hour = this.time.hour + 12;
            }
            else if (this.time.hour >= 12 && this.isAm(this.period)) {
                this.time.hour = this.time.hour - 12;
            }
            this.onChange(this.time);
        }
    };
    /** @hidden
     * Handles last button keyboard events
     */
    /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    TimeComponent.prototype.lastButtonKeydown = /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    };
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     */
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    TimeComponent.prototype.isPm = /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var pmMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianPm : this.timeI18n.meridianPm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === pmMeridian;
    };
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     */
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    TimeComponent.prototype.isAm = /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var amMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianAm : this.timeI18n.meridianAm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === amMeridian;
    };
    TimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-time',
                    template: "<div *ngIf=\"displayHours\"\n    class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseHour()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseHoursLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"displayedHour\"\n               fd-only-digits\n               [ngClass]=\"{\n                'is-disabled': disabled,\n                'is-invalid': ((displayedHour > 24 || displayedHour < 0) && validate)\n               }\"\n               (ngModelChange)=\"displayedHourChanged()\"\n               (blur)=\"inputBlur('hour')\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.hoursPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.hoursLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseHour()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseHoursLabel\"></button>\n    </div>\n</div>\n\n<div *ngIf=\"displayMinutes\"\n    class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseMinute()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseMinutesLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"time.minute\"\n               fd-only-digits\n               (ngModelChange)=\"minuteModelChange()\"\n               (blur)=\"inputBlur('minute')\"\n               [ngClass]=\"{'is-disabled': disabled, 'is-invalid': ((time.minute > 59 || time.minute < 0) && validate)}\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.minutesPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.minutesLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseMinute()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseMinutesLabel\"></button>\n    </div>\n</div>\n<div *ngIf=\"displaySeconds\"\n     class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseSecond()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseSecondsLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"time.second\"\n               fd-only-digits\n               (ngModelChange)=\"secondModelChange()\"\n               (blur)=\"inputBlur('second')\"\n               [ngClass]=\"{'is-disabled': disabled, 'is-invalid': ((time.second > 59 || time.second < 0) && validate)}\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.secondsPlaceholder}}\"\n               (keydown)=\"!meridian && !spinners ? lastButtonKeydown($event) : ''\"\n               [attr.aria-label]=\"timeI18nLabels?.secondsLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseSecond()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseSecondsLabel\"\n                (keydown)=\"!meridian ? lastButtonKeydown($event) : ''\"></button>\n    </div>\n</div>\n<div *ngIf=\"meridian\"\n     class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"togglePeriod()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increasePeriodLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"period\"\n               [ngClass]=\"{'is-disabled': disabled}\"\n               class=\"fd-form__control\"\n               (blur)=\"inputBlur('period')\"\n               (ngModelChange)=\"periodModelChange()\"\n               type=\"text\"\n               placeholder=\"{{timeI18n?.meridianPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.periodLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"togglePeriod()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreasePeriodLabel\"\n                (keydown)=\"lastButtonKeydown($event)\"></button>\n    </div>\n</div>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        class: 'fd-time fd-has-display-block'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return TimeComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"]
                }] }
    ];
    /** @nocollapse */
    TimeComponent.ctorParameters = function () { return [
        { type: TimeI18nLabels },
        { type: TimeI18n }
    ]; };
    TimeComponent.propDecorators = {
        meridian: [{ type: Input }],
        validate: [{ type: Input }],
        disabled: [{ type: Input }],
        spinners: [{ type: Input }],
        displaySeconds: [{ type: Input }],
        displayMinutes: [{ type: Input }],
        displayHours: [{ type: Input }],
        time: [{ type: Input }],
        focusArrowLeft: [{ type: Output }]
    };
    return TimeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FdDatetime = /** @class */ (function () {
    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param date the FdDate object.
     * @param time the TimeObject object.
     */
    function FdDatetime(date, time) {
        this.date = date;
        this.time = time;
    }
    /**
     * Static function to get the current date in FdDateTime form.
     */
    /**
     * Static function to get the current date in FdDateTime form.
     * @return {?}
     */
    FdDatetime.getToday = /**
     * Static function to get the current date in FdDateTime form.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = new Date();
        /** @type {?} */
        var time = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
        return new FdDatetime(FdDate.getToday(), time);
    };
    /**
     * Get Luxon date object converted to string from FdDate.
     */
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    FdDatetime.prototype.toLocaleDateString = /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    function () {
        if (this.toDate() && this.isTimeValid() && this.isDateValid()) {
            return this.toDate().toLocaleString();
        }
        else {
            return null;
        }
    };
    /**
     * Method that checks validity of time on FdDateTime object.
     */
    /**
     * Method that checks validity of time on FdDateTime object.
     * @return {?}
     */
    FdDatetime.prototype.isTimeValid = /**
     * Method that checks validity of time on FdDateTime object.
     * @return {?}
     */
    function () {
        if (!this.time ||
            this.hour === undefined ||
            this.minute === undefined ||
            this.second === undefined) {
            return false;
        }
        if (this.hour > 23 || this.hour < 0) {
            return false;
        }
        if (this.minute > 59 || this.minute < 0) {
            return false;
        }
        if (this.second > 59 || this.second < 0) {
            return false;
        }
        return true;
    };
    /**
     * Method that checks validity of date on FdDateTime object.
     */
    /**
     * Method that checks validity of date on FdDateTime object.
     * @return {?}
     */
    FdDatetime.prototype.isDateValid = /**
     * Method that checks validity of date on FdDateTime object.
     * @return {?}
     */
    function () {
        return this.date && this.date.isDateValid();
    };
    Object.defineProperty(FdDatetime.prototype, "year", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.date) {
                return this.date.year;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FdDatetime.prototype, "month", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.date) {
                return this.date.month;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FdDatetime.prototype, "day", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.date) {
                return this.date.day;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FdDatetime.prototype, "hour", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.time) {
                return this.time.hour;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FdDatetime.prototype, "minute", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.time) {
                return this.time.minute;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FdDatetime.prototype, "second", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.time) {
                return this.time.second;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get native date object from FdDate.
     */
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    FdDatetime.prototype.toDate = /**
     * Get native date object from FdDate.
     * @return {?}
     */
    function () {
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    };
    return FdDatetime;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function DATE_TIME_FORMAT_FACTORY() {
    return new DateTimeFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the datetime format and parser.
 * @abstract
 */
var DateTimeFormatParser = /** @class */ (function () {
    function DateTimeFormatParser() {
    }
    DateTimeFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: DATE_TIME_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ DateTimeFormatParser.ngInjectableDef = defineInjectable({ factory: DATE_TIME_FORMAT_FACTORY, token: DateTimeFormatParser, providedIn: "root" });
    return DateTimeFormatParser;
}());
/**
 * Default implementation of the DateFormatParser service.
 */
var DateTimeFormatParserDefault = /** @class */ (function (_super) {
    __extends(DateTimeFormatParserDefault, _super);
    function DateTimeFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param value String to convert to a FdDatetime model object.
     */
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    DateTimeFormatParserDefault.prototype.parse = /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    function (value) {
        if (!value) {
            return FdDatetime.getToday();
        }
        else {
            /** @type {?} */
            var time = void 0;
            /** @type {?} */
            var date = void 0;
            /** @type {?} */
            var dateStr = value.split(',')[0];
            if (dateStr) {
                /** @type {?} */
                var dateSplitStr = dateStr.split('.').map(Number);
                date = new FdDate(dateSplitStr[2], dateSplitStr[1], dateSplitStr[0]);
            }
            /** @type {?} */
            var timeStr = value.split(',')[1];
            if (timeStr) {
                /** @type {?} */
                var timeSplitStr = timeStr.split(':').map(Number);
                time = { hour: timeSplitStr[0], minute: timeSplitStr[1], second: timeSplitStr[2] };
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    };
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param date FdDatetime model object to convert to a string.
     */
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    DateTimeFormatParserDefault.prototype.format = /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    function (date) {
        return date.day + '.' +
            date.month + '.' +
            date.year + ', ' +
            date.hour + ':' +
            date.minute + ':' +
            date.second;
    };
    DateTimeFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return DateTimeFormatParserDefault;
}(DateTimeFormatParser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 * Supports Angular Forms.
 * ```html
 * <fd-date-time-picker [(ngModel)]="dateTime"></fd-date-time-picker>
 * ```
 */
var DatetimePickerComponent = /** @class */ (function () {
    /** @hidden */
    function DatetimePickerComponent(elRef, changeDetRef, dateTimeAdapter) {
        this.elRef = elRef;
        this.changeDetRef = changeDetRef;
        this.dateTimeAdapter = dateTimeAdapter;
        /**
         * @hidden Date of the input field. Internal use.
         * For programmatic selection, use two-way binding on the date input.
         */
        this.inputFieldDate = null;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.isInvalidDateInput = false;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * Placeholder for the inner input element.
         */
        this.placeholder = 'mm/dd/yyyy, hh:mm:ss am';
        /**
         * Whether the component should be in compact mode.
         */
        this.compact = false;
        /**
         *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         */
        this.placement = 'bottom-start';
        /**
         * Whether the time component should be meridian (am/pm).
         */
        this.meridian = true;
        /**
         * Whether the time component shows spinners for changing the time.
         */
        this.spinners = true;
        /**
         * Whether the time component shows seconds.
         */
        this.displaySeconds = true;
        /**
         * Whether the time component shows minutes.
         */
        this.displayMinutes = true;
        /**
         * Whether the time component shows hours.
         */
        this.displayHours = true;
        /**
         * Whether to perform visual validation on the picker input.
         */
        this.useValidation = true;
        /**
         * Current selected date. Two-way binding is supported.
         */
        this.date = FdDatetime.getToday();
        /**
         * Whether the popover is open. Two-way binding is supported.
         */
        this.isOpen = false;
        /**
         * The disableFunction for the calendar.
         */
        this.startingDayOfWeek = 1;
        /**
         * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
         */
        this.activeView = 'day';
        /**
         * Aria label for the datetime picker input.
         */
        this.datetimeInputLabel = 'Datetime input';
        /**
         * Aria label for the button to show/hide the calendar.
         */
        this.displayDatetimeToggleLabel = 'Display calendar toggle';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * Event thrown every time calendar active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event emitted when the date changes. This can be a time or day change.
         */
        this.dateChange = new EventEmitter();
        /**
         * Event emitted when the day changes from the calendar.
         */
        this.calendarChange = new EventEmitter();
        /**
         * Event emitted when the time changes from the time component.
         */
        this.timeChange = new EventEmitter();
        /**
         * Event emitted when popover closes.
         */
        this.onClose = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    DatetimePickerComponent.prototype.validate = /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    };
    /** Toggles the popover. */
    /**
     * Toggles the popover.
     * @return {?}
     */
    DatetimePickerComponent.prototype.togglePopover = /**
     * Toggles the popover.
     * @return {?}
     */
    function () {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        }
        else {
            this.openPopover();
        }
    };
    /**
     * Method that handle calendar active view change and throws event.
     */
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleCalendarActiveViewChange = /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    function (activeView) {
        this.activeViewChange.emit(activeView);
    };
    /** Opens the popover. */
    /**
     * Opens the popover.
     * @return {?}
     */
    DatetimePickerComponent.prototype.openPopover = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    };
    /** Closes the popover and refresh model */
    /**
     * Closes the popover and refresh model
     * @return {?}
     */
    DatetimePickerComponent.prototype.closePopover = /**
     * Closes the popover and refresh model
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.handleInputChange(this.inputFieldDate);
            this.onClose.emit();
            this.isOpen = false;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    DatetimePickerComponent.prototype.isInvalidDateInputHandler = /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isInvalidDateInput = e;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.onEscapeKeydownHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.closePopover();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    DatetimePickerComponent.prototype.onGlobalClick = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.date && this.inputFieldDate !== null) {
            this.selectedDate = this.date.date;
            this.time = this.date.time;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatetimePickerComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    DatetimePickerComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    DatetimePickerComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    DatetimePickerComponent.prototype.writeValue = /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (!selected || !(selected instanceof FdDatetime)) {
            return;
        }
        this.selectedDate = selected.date;
        this.time = selected.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        if (this.isModelValid()) {
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.setInput(this.date);
        }
    };
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     */
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleDateChange = /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedDate = date;
        if (!this.date.isTimeValid()) {
            this.time = this.timeComponent.time;
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    };
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     */
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleTimeChange = /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.time = time;
        if (!this.selectedDate || !this.selectedDate.isDateValid()) {
            this.selectedDate = FdDate.getToday();
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    DatetimePickerComponent.prototype.focusArrowLeft = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    };
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     */
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    DatetimePickerComponent.prototype.handleInputChange = /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var fdTimeDate = this.dateTimeAdapter.parse(date);
        this.selectedDate = fdTimeDate.date;
        this.time = fdTimeDate.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.onChange(fdTimeDate);
        if (!this.isInvalidDateInput) {
            this.calendarComponent.setCurrentlyDisplayed(fdTimeDate.date);
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
            this.date = FdDatetime.getToday();
            this.selectedDate = this.date.date;
            this.time = this.date.time;
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.onChange(null);
        }
        else if (!this.allowNull) {
            this.isInvalidDateInput = true;
        }
    };
    /** Method that provides information if model selected date/dates have properly types and are valid */
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    DatetimePickerComponent.prototype.isModelValid = /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    function () {
        return this.date &&
            this.date instanceof FdDatetime &&
            this.date.isDateValid() && this.date.isTimeValid();
    };
    /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    DatetimePickerComponent.prototype.setInput = /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    function (fdDateTime) {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
        this.changeDetRef.detectChanges();
    };
    DatetimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-datetime-picker',
                    template: "<div class=\"fd-datetime\">\n    <fd-popover [(isOpen)]=\"isOpen\"\n                (isOpenChange)=\"handleInputChange(dateTimePicker.value)\"\n                [closeOnOutsideClick]=\"false\"\n                [closeOnEscapeKey]=\"false\"\n                [triggers]=\"[]\"\n                [disabled]=\"disabled\"\n                [placement]=\"placement\">\n        <fd-popover-control>\n            <div class=\"fd-input-group fd-input-group--after\"\n                 [ngClass]=\"{'fd-input-group--compact' : compact}\">\n                <input type=\"text\"\n                       #dateTimePicker\n                       [attr.aria-label]=\"datetimeInputLabel\"\n                       [(ngModel)]=\"inputFieldDate\"\n                       [placeholder]=\"placeholder\"\n                       (keyup.enter)=\"handleInputChange(dateTimePicker.value)\"\n                       (click)=\"openPopover()\"\n                       [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidDateInput && useValidation }\"\n                       [disabled]=\"disabled\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button class=\"fd-popover__control fd-button--icon fd-button--light sap-icon--date-time\"\n                            (click)=\"togglePopover()\" [attr.aria-label]=\"displayDatetimeToggleLabel\"\n                            [attr.aria-expanded]=\"isOpen\" type=\"button\" [disabled]=\"disabled\"></button>\n                </span>\n            </div>\n        </fd-popover-control>\n        <fd-popover-body\n            [attr.aria-expanded]=\"isOpen\"\n            [attr.aria-hidden]=\"!isOpen\"\n            [style.display]=\"'block'\">\n            <div class=\"fd-datetime__container\">\n                <fd-calendar calType=\"single\"\n                             [activeView]=\"activeView\"\n                             (activeViewChange)=\"handleCalendarActiveViewChange($event)\"\n                             [disableFunction]=\"disableFunction ? disableFunction : null\"\n                             [blockFunction]=\"blockFunction ? blockFunction : null\"\n                             [disableRangeStartFunction]=\"disableRangeStartFunction ? disableRangeStartFunction : null\"\n                             [disableRangeEndFunction]=\"disableRangeEndFunction ? disableRangeEndFunction : null\"\n                             [blockRangeStartFunction]=\"blockRangeStartFunction ? blockRangeStartFunction : null\"\n                             [blockRangeEndFunction]=\"blockRangeEndFunction ? blockRangeEndFunction : null\"\n                             [selectedDate]=\"selectedDate\"\n                             (selectedDateChange)=\"handleDateChange($event)\"\n                             (isValidDateChange)=\"isInvalidDateInputHandler($event)\"\n                             [escapeFocusFunction]=\"null\"\n                             [startingDayOfWeek]=\"startingDayOfWeek\"></fd-calendar>\n                <div class=\"fd-datetime__separator\"></div>\n                <fd-time [disabled]=\"disabled\"\n                         [meridian]=\"meridian\"\n                         [ngModel]=\"time\"\n                         (ngModelChange)=\"handleTimeChange($event)\"\n                         [spinners]=\"spinners\"\n                         [displaySeconds]=\"displaySeconds\"\n                         [displayMinutes]=\"displayMinutes\"\n                         [displayHours]=\"displayHours\"\n                         (focusArrowLeft)=\"focusArrowLeft()\"></fd-time>\n            </div>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        '[class.fd-datetime-host]': 'true'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatetimePickerComponent; })),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return DatetimePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-datetime-host{display:inline-block;width:230px}.fd-datetime-host .fd-datetime{display:block}.fd-datetime-host .fd-datetime__container{display:flex;align-items:center;margin:0 16px}.fd-datetime-host .fd-datetime__separator{background-color:#d3d3d3;width:1px;margin:42px 28px;-ms-grid-row-align:stretch;align-self:stretch}.fd-datetime-host .fd-datetime fd-popover{display:block}.fd-datetime-host .fd-datetime fd-time{width:auto}"]
                }] }
    ];
    /** @nocollapse */
    DatetimePickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: DateTimeFormatParser }
    ]; };
    DatetimePickerComponent.propDecorators = {
        timeComponent: [{ type: ViewChild, args: [TimeComponent,] }],
        calendarComponent: [{ type: ViewChild, args: [CalendarComponent,] }],
        placeholder: [{ type: Input }],
        compact: [{ type: Input }],
        placement: [{ type: Input }],
        meridian: [{ type: Input }],
        disabled: [{ type: Input }],
        spinners: [{ type: Input }],
        displaySeconds: [{ type: Input }],
        displayMinutes: [{ type: Input }],
        displayHours: [{ type: Input }],
        useValidation: [{ type: Input }],
        date: [{ type: Input }],
        isOpen: [{ type: Input }],
        startingDayOfWeek: [{ type: Input }],
        activeView: [{ type: Input }],
        datetimeInputLabel: [{ type: Input }],
        displayDatetimeToggleLabel: [{ type: Input }],
        allowNull: [{ type: Input }],
        activeViewChange: [{ type: Output }],
        dateChange: [{ type: Output }],
        calendarChange: [{ type: Output }],
        timeChange: [{ type: Output }],
        onClose: [{ type: Output }],
        disableFunction: [{ type: Input }],
        disableRangeStartFunction: [{ type: Input }],
        disableRangeEndFunction: [{ type: Input }],
        blockRangeStartFunction: [{ type: Input }],
        blockRangeEndFunction: [{ type: Input }],
        blockFunction: [{ type: Input }],
        onEscapeKeydownHandler: [{ type: HostListener, args: ['document:keydown.escape', [],] }],
        onGlobalClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return DatetimePickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OnlyDigitsDirective = /** @class */ (function () {
    function OnlyDigitsDirective() {
    }
    /**
     * @param {?} e
     * @return {?}
     */
    OnlyDigitsDirective.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (
        // Allow: Delete, Backspace, Tab, Escape, Enter
        [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
            (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
            (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
            (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
            (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
        ) {
            return; // let it happen, don't do anything
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    OnlyDigitsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdOnlyDigits], [fd-only-digits]'
                },] }
    ];
    OnlyDigitsDirective.propDecorators = {
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return OnlyDigitsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimeModule = /** @class */ (function () {
    function TimeModule() {
    }
    TimeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TimeComponent, OnlyDigitsDirective],
                    imports: [CommonModule, FormsModule],
                    exports: [TimeComponent, OnlyDigitsDirective]
                },] }
    ];
    return TimeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatetimePickerModule = /** @class */ (function () {
    function DatetimePickerModule() {
    }
    DatetimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DatetimePickerComponent],
                    imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule, TimeModule],
                    exports: [DatetimePickerComponent]
                },] }
    ];
    return DatetimePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
var FileInputComponent = /** @class */ (function () {
    function FileInputComponent() {
        /**
         * @hidden
         */
        this.fdFileInputClass = true;
        /**
         * Whether the file input is disabled.
         */
        this.disabled = false;
        /**
         * Whether the file input should accept multiple files.
         */
        this.multiple = true;
        /**
         * Whether the file input accepts drag and dropped files.
         */
        this.dragndrop = true;
        /**
         * Event fired when files are selected. Passed object is the array of files selected.
         */
        this.onSelect = new EventEmitter();
        /**
         * Event fired when some invalid files are selected. Passed object is the array of invalid files.
         */
        this.onInvalidFiles = new EventEmitter();
        /**
         * Event fired when the dragged file enters the component boundaries.
         */
        this.onDragEnter = new EventEmitter();
        /**
         * Event fired when the dragged file exits the component boundaries.
         */
        this.onDragLeave = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    FileInputComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    FileInputComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    FileInputComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    FileInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    function (files) {
        // not needed - should be handled by user.
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileInputComponent.prototype.selectHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.maxFileSize) {
            /** @type {?} */
            var valid_files_1 = [];
            /** @type {?} */
            var invalid_files_1 = [];
            event.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                if (file.size < _this.maxFileSize) {
                    valid_files_1.push(file);
                }
                else {
                    invalid_files_1.push(file);
                }
            }));
            if (valid_files_1.length > 0) {
                this.onChange(valid_files_1);
                this.onSelect.emit(valid_files_1);
            }
            if (invalid_files_1.length > 0) {
                this.onInvalidFiles.emit(invalid_files_1);
            }
        }
        else {
            this.onChange(event);
            this.onSelect.emit(event);
        }
    };
    /**
     * Opens the file selector.
     */
    /**
     * Opens the file selector.
     * @return {?}
     */
    FileInputComponent.prototype.open = /**
     * Opens the file selector.
     * @return {?}
     */
    function () {
        this.inputRef.nativeElement.click();
    };
    /**
     * Clears the files from the input.
     */
    /**
     * Clears the files from the input.
     * @return {?}
     */
    FileInputComponent.prototype.clear = /**
     * Clears the files from the input.
     * @return {?}
     */
    function () {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    };
    FileInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-file-input',
                    template: "<div style=\"display: block\"\n     fdFileDragnDrop\n     [accept]=\"accept\"\n     [dragndrop]=\"dragndrop\"\n     [disabled]=\"disabled\"\n     [multiple]=\"multiple\"\n     (onFileChange)=\"selectHandler($event)\"\n     (onInvalidFiles)=\"onInvalidFiles.emit($event)\"\n     (onDragEnter)=\"onDragEnter.emit()\"\n     (onDragLeave)=\"onDragLeave.emit()\">\n    <ng-content></ng-content>\n</div>\n<input #input\n       class=\"hidden-file-input\"\n       type=\"file\"\n       [attr.accept]=\"accept\"\n       (onFileSelect)=\"selectHandler($event)\"\n       [multiple]=\"multiple\"\n       [disabled]=\"disabled\"\n       fdFileSelect>\n\n",
                    host: {
                        '(blur)': 'onTouched()'
                    },
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return FileInputComponent; })),
                            multi: true,
                        }],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-file-input{display:inline-block}.fd-file-input input.hidden-file-input{display:none}"]
                }] }
    ];
    FileInputComponent.propDecorators = {
        fdFileInputClass: [{ type: HostBinding, args: ['class.fd-file-input',] }],
        inputRef: [{ type: ViewChild, args: ['input',] }],
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        accept: [{ type: Input }],
        dragndrop: [{ type: Input }],
        maxFileSize: [{ type: Input }],
        onSelect: [{ type: Output }],
        onInvalidFiles: [{ type: Output }],
        onDragEnter: [{ type: Output }],
        onDragLeave: [{ type: Output }]
    };
    return FileInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive tool to facilitate interacting with a native file input element.
 */
var FileSelectDirective = /** @class */ (function () {
    function FileSelectDirective() {
        /**
         * Whether the input should accept multiple file selections.
         */
        this.multiple = true;
        /**
         * Event emitted when files are selected.
         */
        this.onFileSelect = new EventEmitter();
    }
    Object.defineProperty(FileSelectDirective.prototype, "multipleBinding", {
        /** @hidden */
        get: /**
         * @hidden
         * @return {?}
         */
        function () {
            return this.multiple ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileSelectDirective.prototype.onChange = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target instanceof HTMLInputElement) {
            /** @type {?} */
            var elRef = ((/** @type {?} */ (event.target)));
            /** @type {?} */
            var files = elRef.files;
            /** @type {?} */
            var fileArray = Array.from(files);
            if (files.length) {
                this.onFileSelect.emit(fileArray);
            }
        }
    };
    FileSelectDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdFileSelect]',
                },] }
    ];
    FileSelectDirective.propDecorators = {
        multiple: [{ type: Input }],
        onFileSelect: [{ type: Output }],
        multipleBinding: [{ type: HostBinding, args: ['attr.multiple',] }],
        onChange: [{ type: HostListener, args: ['change', ['$event'],] }]
    };
    return FileSelectDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that handles the drag and drop feature of the file input.
 */
var FileDragndropDirective = /** @class */ (function () {
    function FileDragndropDirective() {
        /**
         * Whether multiple files can be dropped at once.
         */
        this.multiple = true;
        /**
         * Whether selecting of new files is disabled.
         */
        this.disabled = false;
        /**
         * Whether drag and drop is enabled. Disables this directive.
         */
        this.dragndrop = true;
        /**
         * Event emitted when files are selected. Passes back an array of files.
         */
        this.onFileChange = new EventEmitter();
        /**
         * Event emitted when invalid files are selected. Passes back an array of files.
         */
        this.onInvalidFiles = new EventEmitter();
        /**
         * Event emitted when the dragged file enters the dropzone.
         */
        this.onDragEnter = new EventEmitter();
        /**
         * Event emitted when the dragged file exits the dropzone.
         */
        this.onDragLeave = new EventEmitter();
        this.elementStateCounter = 0;
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragover = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragenter = /**
     * @hidden
     * @return {?}
     */
    function () {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDragleave = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    FileDragndropDirective.prototype.onDrop = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.elementStateCounter = 0;
        if (!this.dragndrop || this.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        /** @type {?} */
        var rawFiles = event.dataTransfer.files;
        /** @type {?} */
        var files = Array.from(rawFiles);
        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }
        /** @type {?} */
        var valid_files = [];
        /** @type {?} */
        var invalid_files = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                function (file) {
                    valid_files.push(file);
                }));
            }
            else {
                /** @type {?} */
                var allowed_extensions_1 = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                function (file) {
                    /** @type {?} */
                    var ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions_1.lastIndexOf(ext) !== -1) {
                        valid_files.push(file);
                    }
                    else {
                        invalid_files.push(file);
                    }
                }));
            }
            this.onFileChange.emit(valid_files);
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
    };
    FileDragndropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdFileDragnDrop]'
                },] }
    ];
    FileDragndropDirective.propDecorators = {
        multiple: [{ type: Input }],
        accept: [{ type: Input }],
        disabled: [{ type: Input }],
        dragndrop: [{ type: Input }],
        onFileChange: [{ type: Output }],
        onInvalidFiles: [{ type: Output }],
        onDragEnter: [{ type: Output }],
        onDragLeave: [{ type: Output }],
        onDragover: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragenter: [{ type: HostListener, args: ['dragenter', [],] }],
        onDragleave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return FileDragndropDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FileInputModule = /** @class */ (function () {
    function FileInputModule() {
    }
    FileInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [FileInputComponent, FileSelectDirective, FileDragndropDirective],
                    declarations: [FileInputComponent, FileSelectDirective, FileDragndropDirective]
                },] }
    ];
    return FileInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used for easily displaying forms with a margin. Not necessary for fundamental forms to be functional.
 *
 * ```html
 * <div fd-form-set>
 *     <div fd-form-item>
 *         ...
 *     </div>
 * </div>
 * ```
 */
var FormSetDirective = /** @class */ (function () {
    function FormSetDirective() {
    }
    FormSetDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-set]',
                    host: {
                        class: 'fd-form__set'
                    }
                },] }
    ];
    return FormSetDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
var FormControlDirective = /** @class */ (function (_super) {
    __extends(FormControlDirective, _super);
    /** @hidden */
    function FormControlDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    FormControlDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-form__control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    };
    FormControlDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-control]'
                },] }
    ];
    /** @nocollapse */
    FormControlDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FormControlDirective.propDecorators = {
        state: [{ type: Input }]
    };
    return FormControlDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
var FormItemDirective = /** @class */ (function () {
    function FormItemDirective() {
        /**
         * Whether the form item is a checkbox.
         */
        this.isCheck = false;
        /**
         * Whether the form item is inline.
         */
        this.isInline = false;
        /**
         * @hidden
         */
        this.fdFormItemClass = true;
    }
    FormItemDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-item]'
                },] }
    ];
    FormItemDirective.propDecorators = {
        isCheck: [{ type: Input }, { type: HostBinding, args: ['class.fd-form__item--check',] }],
        isInline: [{ type: Input }, { type: HostBinding, args: ['class.fd-form__item--inline',] }],
        fdFormItemClass: [{ type: HostBinding, args: ['class.fd-form__item',] }]
    };
    return FormItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Label to be linked to a form control.
 *
 * ```html
 * <label fd-form-label for="input-id">Label Text</label>
 * <input fd-form-control type="text" id="input-id" />
 * ```
 */
var FormLabelDirective = /** @class */ (function () {
    function FormLabelDirective() {
        /**
         * @hidden
         */
        this.fdFormLabelClass = true;
    }
    FormLabelDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-label]',
                },] }
    ];
    FormLabelDirective.propDecorators = {
        fdFormLabelClass: [{ type: HostBinding, args: ['class.fd-form__label',] }]
    };
    return FormLabelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies css to a legend html element.
 *
 * <legend fd-form-legend>Legend</legend>
 */
var FormLegendDirective = /** @class */ (function () {
    function FormLegendDirective() {
        /**
         * @hidden
         */
        this.fdFormLegendClass = true;
    }
    FormLegendDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-legend]',
                },] }
    ];
    FormLegendDirective.propDecorators = {
        fdFormLegendClass: [{ type: HostBinding, args: ['class.fd-form__legend',] }]
    };
    return FormLegendDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Form message. Intended to be displayed under a form control for validation purposes.
 */
var FormMessageComponent = /** @class */ (function () {
    function FormMessageComponent() {
        /**
         * Type of the message. Can be `text`, `help`, `error` and `warning`.
         */
        this.type = '';
    }
    FormMessageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-form-message',
                    template: "<span class=\"fd-form__message\" [ngClass]=\"[type ? ' fd-form__message--' + type : '']\">\n  <ng-content></ng-content>\n</span>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    FormMessageComponent.propDecorators = {
        type: [{ type: Input }]
    };
    return FormMessageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents a form group element.
 *
 * ```html
 * <fd-form-group>
 *     <div fd-form-item [isCheck]="true">
 *         <input fd-form-control type="radio" checked>
 *         <fd-form-label>Option One</fd-form-label>
 *     </div>
 * </fd-form-group>
 * ```
 */
var FormGroupComponent = /** @class */ (function () {
    function FormGroupComponent() {
        /**
         * @hidden
         */
        this.fdFormGroupClass = true;
    }
    FormGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-form-group',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    FormGroupComponent.propDecorators = {
        fdFormGroupClass: [{ type: HostBinding, args: ['class.fd-form__group',] }]
    };
    return FormGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FormModule = /** @class */ (function () {
    function FormModule() {
    }
    FormModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        FormSetDirective,
                        FormControlDirective,
                        FormItemDirective,
                        FormLabelDirective,
                        FormLegendDirective,
                        FormMessageComponent,
                        FormGroupComponent
                    ],
                    declarations: [
                        FormSetDirective,
                        FormControlDirective,
                        FormItemDirective,
                        FormLabelDirective,
                        FormLegendDirective,
                        FormMessageComponent,
                        FormGroupComponent
                    ]
                },] }
    ];
    return FormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents an identifier.
 * Identifier is a way to visually present something using an icon or user initials.
 *
 * ```html
 * <span fd-identifier [size]="'l'" [glyph]="'washing-machine'"></span>
 * ```
 */
var IdentifierDirective = /** @class */ (function (_super) {
    __extends(IdentifierDirective, _super);
    /** @hidden */
    function IdentifierDirective(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    IdentifierDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
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
    };
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
    IdentifierDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
    ]; };
    IdentifierDirective.propDecorators = {
        size: [{ type: Input }],
        circle: [{ type: Input }],
        transparent: [{ type: Input }],
        colorAccent: [{ type: Input }],
        glyph: [{ type: Input }]
    };
    return IdentifierDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IdentifierModule = /** @class */ (function () {
    function IdentifierModule() {
    }
    IdentifierModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [IdentifierDirective],
                    declarations: [IdentifierDirective]
                },] }
    ];
    return IdentifierModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents an image.
 *
 * ```html
 * <fd-image style="margin-right: 10px;" [size]="'l'" [circle]="true" [photo]="'https://placeimg.com/400/400/nature'"></fd-image>
 * ```
 */
var ImageComponent = /** @class */ (function () {
    function ImageComponent() {
        /**
         * The size of the image.
         * The predefined values for the size are *s*, *m*, and *l*.
         */
        this.size = 'm';
        /**
         * Whether to render a circle style for the image.
         */
        this.circle = false;
        /**
         * The image label.
         */
        this.label = 'Image label';
    }
    ImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-image',
                    template: "<span\n  [ngClass]='(size ? \"fd-image--\" + size : \"\") + (circle ? \" fd-image--circle\" : \"\") '\n  [attr.aria-label]='label'\n  [ngStyle]= \"{'background-image': 'url(' + photo + ')'}\">\n</span>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ImageComponent.propDecorators = {
        size: [{ type: Input }],
        circle: [{ type: Input }],
        label: [{ type: Input }],
        photo: [{ type: Input }]
    };
    return ImageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImageModule = /** @class */ (function () {
    function ImageModule() {
    }
    ImageModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [ImageComponent],
                    declarations: [ImageComponent]
                },] }
    ];
    return ImageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
var InfiniteScrollDirective = /** @class */ (function () {
    /** @hidden */
    function InfiniteScrollDirective(element) {
        this.element = element;
        /**
         * Scroll percentage at which the onScrollAction event is fired.
         */
        this.scrollPercent = 75;
        /**
         * Event emitted when the scrollPercent threshold is met.
         */
        this.onScrollAction = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');
        this.subscription = this.scrollEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > _this.scrollPercent / 100) {
                _this.onScrollAction.emit(null);
            }
        }));
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    InfiniteScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdInfiniteScroll]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    InfiniteScrollDirective.propDecorators = {
        scrollPercent: [{ type: Input }],
        onScrollAction: [{ type: Output }]
    };
    return InfiniteScrollDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InfiniteScrollModule = /** @class */ (function () {
    function InfiniteScrollModule() {
    }
    InfiniteScrollModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [InfiniteScrollDirective],
                    exports: [InfiniteScrollDirective]
                },] }
    ];
    return InfiniteScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 *
 * ```html
 * <fd-inline-help [placement]="'bottom-left'">
 *      Lorem ipsum dolor sit amet, consectetur adipiscing.
 * </fd-inline-help>
 * ```
 */
var InlineHelpComponent = /** @class */ (function () {
    function InlineHelpComponent() {
        /**
         * The placement of the inline help component. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         *   The default placement is *bottom start*
         */
        this.placement = 'bottom-start';
        /**
         * The trigger events that will open/close the inline help component.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['mouseenter', 'mouseleave'];
    }
    InlineHelpComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-inline-help',
                    template: "<fd-popover [noArrow]=\"false\"\n            [placement]=\"placement\"\n            [triggers]=\"triggers\"\n    >\n        <fd-popover-control>\n            <span class=\"fd-inline-help\" role=\"alert\"></span>\n        </fd-popover-control>\n        <fd-popover-body>\n            <span class=\"fd-inline-help__content\">\n                <ng-content></ng-content>\n            </span>\n        </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-inline-help__content{visibility:visible;opacity:1;overflow:visible;position:relative;top:0;right:0;border:none;color:var(--fd-color-text-1)}.fd-inline-help__content:after,.fd-inline-help__content:before{display:none}"]
                }] }
    ];
    InlineHelpComponent.propDecorators = {
        placement: [{ type: Input }],
        triggers: [{ type: Input }]
    };
    return InlineHelpComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InlineHelpModule = /** @class */ (function () {
    function InlineHelpModule() {
    }
    InlineHelpModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, PopoverModule],
                    exports: [InlineHelpComponent],
                    declarations: [InlineHelpComponent]
                },] }
    ];
    return InlineHelpModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group [placement]="'after'" [addOnText]="'$'" [placeholder]="'Amount'">
 * </fd-input-group>
 * ```
 */
var InputGroupComponent = /** @class */ (function () {
    function InputGroupComponent() {
        /**
         * Whether the input group is in compact mode.
         */
        this.compact = false;
        /**
         * Event emitted when the add-on button is clicked.
         */
        this.addOnButtonClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(InputGroupComponent.prototype, "inputText", {
        /** Get the value of the text input. */
        get: /**
         * Get the value of the text input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the value of the text input. */
        set: /**
         * Set the value of the text input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    InputGroupComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputTextValue = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    InputGroupComponent.prototype.buttonClicked = /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.addOnButtonClicked.emit($event);
    };
    InputGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-input-group',
                    template: "<div class=\"fd-input-group\"\n     [ngClass]=\"{'fd-input-group--after': placement !== 'before',\n        'fd-input-group--before': placement === 'before', 'fd-input-group--inline': inline === true,\n        'fd-input-group--compact' : compact}\">\n  <input [(ngModel)]=\"inputText\"\n         [disabled]=\"disabled\"\n         type=\"text\"\n         *ngIf=\"placement !== 'before'\"\n         placeholder=\"{{placeholder}}\"\n         [ngClass]=\"{'fd-input--compact' : compact}\">\n  <span *ngIf=\"!button\"\n        class=\"fd-input-group__addon\"\n        [ngClass]=\"{'fd-input-group__addon--after': placement !== 'before',\n          'fd-input-group__addon--before': placement === 'before'}\">\n    <ng-container *ngIf=\"!glyph\">{{addOnText}}</ng-container>\n    <span *ngIf=\"glyph\"\n          [ngClass]=\"'sap-icon--' + glyph\"></span>\n  </span>\n  <span *ngIf=\"button\"\n        class=\"fd-input-group__addon fd-input-group__addon--button\"\n        [ngClass]=\"{'fd-input-group__addon--after': placement !== 'before', 'fd-input-group__addon--before': placement === 'before'}\">\n    <button [disabled]=\"disabled\"\n            *ngIf=\"!glyph\"\n            (click)=\"buttonClicked($event)\"\n            class=\"fd-button--light\">{{addOnText}}</button>\n    <button [disabled]=\"disabled\"\n            *ngIf=\"glyph\"\n            (click)=\"buttonClicked($event)\"\n            class=\"fd-button--icon fd-button--light\"\n            [ngClass]=\"'sap-icon--' + glyph\"></button>\n  </span>\n  <input [(ngModel)]=\"inputText\"\n         *ngIf=\"placement === 'before'\"\n         [disabled]=\"disabled\"\n         type=\"text\"\n         placeholder=\"{{placeholder}}\"\n         [ngClass]=\"{'fd-input--compact' : compact}\">\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return InputGroupComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    InputGroupComponent.propDecorators = {
        placement: [{ type: Input }],
        compact: [{ type: Input }],
        inline: [{ type: Input }],
        placeholder: [{ type: Input }],
        addOnText: [{ type: Input }],
        glyph: [{ type: Input }],
        button: [{ type: Input }],
        disabled: [{ type: Input }],
        addOnButtonClicked: [{ type: Output }]
    };
    return InputGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents an integer value input.
 * The value is increased or decreased using the spinner add-on.
 *
 * ```html
 * <fd-input-group-number [disabled]="false" [(ngModel)]="numberValue"></fd-input-group-number>
 * ```
 */
var InputGroupNumberComponent = /** @class */ (function () {
    function InputGroupNumberComponent() {
        /**
         * Aria label for the 'step up' button.
         */
        this.stepUpLabel = 'Step up';
        /**
         * Aria label for the 'step down' button.
         */
        this.stepDownLabel = 'Step down';
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(InputGroupNumberComponent.prototype, "inputText", {
        /** Get the value of the text input. */
        get: /**
         * Get the value of the text input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the value of the text input. */
        set: /**
         * Set the value of the text input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    InputGroupNumberComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputTextValue = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupNumberComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupNumberComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    InputGroupNumberComponent.prototype.stepUpClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    InputGroupNumberComponent.prototype.stepDownClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    };
    InputGroupNumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-input-group-number',
                    template: "<div class=\"fd-input-group fd-input-group--after\">\n        <input class=\"\"\n               type=\"number\"\n               name=\"\"\n               [disabled]=\"disabled\"\n               [(ngModel)]=\"inputText\"\n               placeholder=\"{{placeholder}}\" />\n        <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon fd-input-group__addon--after\">\n                <button class=\"fd-input-group__button fd-input-group__button--step-up sap-icon--slim-arrow-up\"\n                        [attr.aria-label]=\"stepUpLabel\"\n                        (click)=\"stepUpClicked()\"></button>\n                <button class=\"fd-input-group__button fd-input-group__button--step-down sap-icon--slim-arrow-down\"\n                        [attr.aria-label]=\"stepDownLabel\"\n                        (click)=\"stepDownClicked()\"></button>\n        </span>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return InputGroupNumberComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    InputGroupNumberComponent.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        stepUpLabel: [{ type: Input }],
        stepDownLabel: [{ type: Input }]
    };
    return InputGroupNumberComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a search input group.
 *
 * ```html
 * <fd-input-group-search [disabled]="false" [(ngModel)]="searchTerm"></fd-input-group-search>
 * ```
 */
var InputGroupSearchComponent = /** @class */ (function () {
    function InputGroupSearchComponent() {
        /**
         * Aria label for the 'clear' button.
         */
        this.clearLabel = 'Clear';
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(InputGroupSearchComponent.prototype, "inputText", {
        /** Get the value of the text input. */
        get: /**
         * Get the value of the text input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the value of the text input. */
        set: /**
         * Set the value of the text input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    InputGroupSearchComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputTextValue = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupSearchComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    InputGroupSearchComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    InputGroupSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-input-group-search',
                    template: "<div class=\"fd-input-group\">\n      <input type=\"search\"\n             [disabled]=\"disabled\"\n             [(ngModel)]=\"inputText\"\n             placeholder=\"{{placeholder}}\" />\n      <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon\">\n            <button *ngIf=\"inputText\"\n                    class=\"fd-input-group__button fd-input-group__button--clear\"\n                    [attr.aria-label]=\"clearLabel\"\n                    (click)=\"inputText = '';\"></button>\n      </span>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return InputGroupSearchComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    InputGroupSearchComponent.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        clearLabel: [{ type: Input }]
    };
    return InputGroupSearchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InputGroupModule = /** @class */ (function () {
    function InputGroupModule() {
    }
    InputGroupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent],
                    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                    exports: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent]
                },] }
    ];
    return InputGroupModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
var ListDirective = /** @class */ (function () {
    function ListDirective() {
    }
    ListDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-list]',
                    host: {
                        class: 'fd-list-group'
                    }
                },] }
    ];
    return ListDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 *
 * ```html
 * <ul fd-list>
 *    <li fd-list-item>
 *        List item 1
 *    </li>
 * </ul>
 * ```
 */
var ListItemDirective = /** @class */ (function () {
    function ListItemDirective() {
    }
    ListItemDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-list-item]',
                    host: {
                        'class': 'fd-list-group__item'
                    }
                },] }
    ];
    return ListItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var listCheckboxUniqueId = 0;
/**
 * The component that represents a checkbox list.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>
 *       <fd-list-checkbox>List item 1</fd-list-checkbox>
 *    </li>
 * </fd-list>
 * ```
 */
var ListCheckboxComponent = /** @class */ (function () {
    function ListCheckboxComponent() {
        /**
         * Whether the list item checkbox is checked.
         */
        this.checked = false;
        /**
         * Whether the list item checkbox is disabled.
         */
        this.disabled = false;
        /**
         * Event fired when the state of the checkbox changes. Passes back the id and the value.
         */
        this.onToggle = new EventEmitter();
        /**
         * Event fired when the checkbox becomes active.
         */
        this.onActivated = new EventEmitter();
        /**
         * The id of the checkbox.
         */
        this.id = 'fd-list-checkbox-' + listCheckboxUniqueId++;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(ListCheckboxComponent.prototype, "isChecked", {
        /** Set the value of the *isChecked* property. */
        get: /**
         * Set the value of the *isChecked* property.
         * @return {?}
         */
        function () {
            return this.checked;
        },
        /** Set the value of the *isChecked* property. */
        set: /**
         * Set the value of the *isChecked* property.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.checked = value;
            this.onChange(value);
            this.onTouched();
            this.onToggle.emit({ id: this.id, value: value });
            if (this.checked) {
                this.onActivated.emit(this.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    ListCheckboxComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ListCheckboxComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ListCheckboxComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    ListCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-list-checkbox',
                    host: {
                        class: 'fd-form__item fd-form__item--check',
                        '[attr.id]': 'id'
                    },
                    template: "<div class=\"fd-form__item fd-form__item--check\">\n    <label class=\"fd-form__label\"\n           [htmlFor]=\"this.id\">\n        <input class=\"fd-form__control\"\n               type=\"checkbox\"\n               [id]=\"this.id\"\n               [(ngModel)]=\"this.isChecked\"\n               [disabled]=\"this.disabled\">\n        <ng-content></ng-content>\n    </label>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ListCheckboxComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ListCheckboxComponent.propDecorators = {
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        onToggle: [{ type: Output }],
        onActivated: [{ type: Output }],
        id: [{ type: Input }]
    };
    return ListCheckboxComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * List item level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>List item 1
 *        <fd-list-action>
 *            <button fd-button [options]="'light'" [glyph]="'edit'"></button>
 *       </fd-list-action>
 *    </li>
 * </fd-list>
 * ```
 */
var ListActionDirective = /** @class */ (function () {
    function ListActionDirective() {
    }
    ListActionDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: 'fd-list-action',
                    host: {
                        class: 'fd-list-group__action'
                    }
                },] }
    ];
    return ListActionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent],
                    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                    exports: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent]
                },] }
    ];
    return ListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a loading spinner.
 *
 * ```html
 * <fd-loading-spinner [loading]="true"></fd-loading-spinner>
 * ```
 */
var LoadingSpinnerComponent = /** @class */ (function () {
    function LoadingSpinnerComponent() {
        /**
         * Whether to display the loading indicator animation.
         */
        this.loading = false;
        /**
         * Aria label for the 'loading' spinner.
         */
        this.loadingLabel = 'Loading';
    }
    LoadingSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-loading-spinner',
                    template: "<div class=\"fd-spinner\" [attr.aria-hidden]=\"!loading\" [attr.aria-label]=\"loadingLabel\">\n    <div></div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [""]
                }] }
    ];
    LoadingSpinnerComponent.propDecorators = {
        loading: [{ type: Input }],
        loadingLabel: [{ type: Input }]
    };
    return LoadingSpinnerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoadingSpinnerModule = /** @class */ (function () {
    function LoadingSpinnerModule() {
    }
    LoadingSpinnerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [LoadingSpinnerComponent],
                    exports: [LoadingSpinnerComponent],
                    imports: [CommonModule]
                },] }
    ];
    return LoadingSpinnerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var modalFadeNgIf = trigger('modal-fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('75ms ease-in-out', style({ opacity: 0 }))
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Reference to a modal component generated via the ModalService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
var  /**
 * Reference to a modal component generated via the ModalService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
ModalRef = /** @class */ (function () {
    function ModalRef() {
        this._afterClosed = new Subject();
        /**
         * Observable that is triggered when the modal is closed.
         * On close a *result* is passed back. On dismiss, an *error* is returned instead.
         */
        this.afterClosed = this._afterClosed.asObservable();
    }
    /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param {?=} result Value passed back to the observable as a result.
     * @return {?}
     */
    ModalRef.prototype.close = /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param {?=} result Value passed back to the observable as a result.
     * @return {?}
     */
    function (result) {
        this._afterClosed.next(result);
    };
    /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param {?=} reason Value passed back to the observable as an error.
     * @return {?}
     */
    ModalRef.prototype.dismiss = /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param {?=} reason Value passed back to the observable as an error.
     * @return {?}
     */
    function (reason) {
        this._afterClosed.error(reason);
    };
    return ModalRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalComponent = /** @class */ (function (_super) {
    __extends(ModalComponent, _super);
    function ModalComponent(elRef, componentFactoryResolver, cdRef, modalRef) {
        var _this = _super.call(this, elRef) || this;
        _this.elRef = elRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.cdRef = cdRef;
        _this.modalRef = modalRef;
        _this.escKeyCloseable = true;
        _this.focusTrapped = true;
        _this.ariaLabelledBy = null;
        _this.ariaLabel = null;
        _this.ariaDescribedBy = null;
        _this.backdropClickCloseable = true;
        _this.hasBackdrop = true;
        _this.modalPanelClass = '';
        return _this;
    }
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngAfterViewInit = /**
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
        }
        if (this.focusTrapped) {
            try {
                this.focusTrap = focusTrap(this.elRef.nativeElement, {
                    clickOutsideDeactivates: this.backdropClickCloseable && this.hasBackdrop,
                    escapeDeactivates: false,
                    initialFocus: this.elRef.nativeElement
                });
                this.focusTrap.activate();
            }
            catch (e) {
                console.warn('Attempted to focus trap the modal, but no tabbable elements were found.');
            }
        }
        this.cdRef.detectChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalComponent.prototype.closeModalEsc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this.modalRef.dismiss('escape');
        }
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    ModalComponent.prototype.loadFromComponent = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.containerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    ModalComponent.prototype.loadFromTemplate = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.containerRef.clear();
        /** @type {?} */
        var context = {
            $implicit: this.modalRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype._setProperties = /**
     * @return {?}
     */
    function () {
        if (this.modalPanelClass) {
            this._addClassToElement(this.modalPanelClass);
        }
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal',
                    template: "<div class=\"fd-modal__content fd-modal__content--overrides\" role=\"document\">\n    <ng-content select=\"fd-modal-header\"></ng-content>\n    <ng-content select=\"fd-modal-body\"></ng-content>\n    <ng-content select=\"fd-modal-footer\"></ng-content>\n    <ng-container #vc></ng-container>\n    <ng-content></ng-content>\n</div>\n",
                    host: {
                        'role': 'dialog',
                        '[class.fd-modal]': 'true',
                        '[class.fd-modal-custom]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-label]': 'ariaLabel',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                        '[attr.aria-modal]': 'true',
                        '[attr.id]': 'id',
                        'tabindex': '-1',
                        '[@modal-fade]': ''
                    },
                    animations: [
                        modalFadeNgIf
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-modal-custom{max-width:none;z-index:1000;position:absolute}.fd-modal-custom:focus{outline:0}.fd-modal__content--overrides{height:100%;width:100%;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;display:flex;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: ChangeDetectorRef },
        { type: ModalRef, decorators: [{ type: Optional }] }
    ]; };
    ModalComponent.propDecorators = {
        containerRef: [{ type: ViewChild, args: ['vc', { read: ViewContainerRef },] }],
        closeModalEsc: [{ type: HostListener, args: ['keyup', ['$event'],] }]
    };
    return ModalComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies fundamental layout and styling to the contents of a modal header.
 *
 * ```html
 * <fd-modal-header>
 *     <h1 fd-modal-title>Title</h1>
 *     <button fd-modal-close-btn></button>
 * </fd-modal-header>
 * ```
 */
var ModalHeaderComponent = /** @class */ (function () {
    function ModalHeaderComponent() {
        /**
         * @hidden
         */
        this.modalHeader = true;
    }
    ModalHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-header',
                    template: "<ng-content></ng-content>\n",
                    styles: [':host {display: block;}']
                }] }
    ];
    ModalHeaderComponent.propDecorators = {
        modalHeader: [{ type: HostBinding, args: ['class.fd-modal__header',] }]
    };
    return ModalHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies fundamental layout and styling to the contents of a modal body.
 *
 * ```html
 * <fd-modal-body>
 *     <div>Modal body content</div>
 * </fd-modal-body>
 * ```
 */
var ModalBodyComponent = /** @class */ (function () {
    function ModalBodyComponent() {
        /**
         * @hidden
         */
        this.modalBody = true;
    }
    ModalBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-body',
                    template: "<ng-content></ng-content>\n",
                    styles: ["\n        :host {\n            display: block;\n            overflow: auto;\n            flex-grow: 1;\n        }\n    "]
                }] }
    ];
    ModalBodyComponent.propDecorators = {
        modalBody: [{ type: HostBinding, args: ['class.fd-modal__body',] }]
    };
    return ModalBodyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies fundamental layout and styling to the contents of a modal footer.
 *
 * ```html
 * <fd-modal-footer>
 *     <button>Do action</button>
 * </fd-modal-footer>
 * ```
 */
var ModalFooterComponent = /** @class */ (function () {
    function ModalFooterComponent() {
        /**
         * @hidden
         */
        this.modalFooter = true;
    }
    ModalFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-footer',
                    template: "<div class=\"fd-modal__actions\">\n    <ng-content></ng-content>\n</div>\n",
                    styles: ["\n        :host {\n            display: block;\n            border-top: 1px solid #eeeeef;\n        }\n    "]
                }] }
    ];
    ModalFooterComponent.propDecorators = {
        modalFooter: [{ type: HostBinding, args: ['class.fd-modal__footer',] }]
    };
    return ModalFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalBackdrop = /** @class */ (function (_super) {
    __extends(ModalBackdrop, _super);
    function ModalBackdrop(elRef, modalRef) {
        var _this = _super.call(this, elRef) || this;
        _this.elRef = elRef;
        _this.modalRef = modalRef;
        _this.backdropClass = '';
        _this.backdropClickCloseable = true;
        _this.overlayMain = true;
        _this.overlayModal = true;
        return _this;
    }
    /**
     * @return {?}
     */
    ModalBackdrop.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    /**
     * @return {?}
     */
    ModalBackdrop.prototype._setProperties = /**
     * @return {?}
     */
    function () {
        if (this.backdropClass) {
            this._addClassToElement(this.backdropClass);
        }
    };
    /**
     * @return {?}
     */
    ModalBackdrop.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        if (this.backdropClickCloseable) {
            this.modalRef.dismiss('backdrop');
        }
    };
    ModalBackdrop.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-overlay',
                    template: "",
                    host: {
                        'tabindex': '-1',
                        '[@modal-fade]': ''
                    },
                    animations: [
                        modalFadeNgIf
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    ModalBackdrop.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ModalRef }
    ]; };
    ModalBackdrop.propDecorators = {
        overlayMain: [{ type: HostBinding, args: ['class.fd-overlay',] }],
        overlayModal: [{ type: HostBinding, args: ['class.fd-overlay--modal',] }],
        closeModal: [{ type: HostListener, args: ['click',] }]
    };
    return ModalBackdrop;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalContainer = /** @class */ (function () {
    function ModalContainer() {
    }
    ModalContainer.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-container',
                    template: "",
                    host: {
                        '[@modal-fade]': '',
                        '[class.fd-modal-container]': 'true'
                    },
                    animations: [
                        modalFadeNgIf
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-modal-container {\n            position: fixed;\n            top: 0;\n            bottom: 0;\n            right: 0;\n            left: 0;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 1000;\n        }\n    "]
                }] }
    ];
    return ModalContainer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalConfig = /** @class */ (function () {
    function ModalConfig() {
        /**
         * Aria label for the modal component element.
         */
        this.ariaLabel = null;
        /**
         * Id of the element that labels the modal.
         */
        this.ariaLabelledBy = null;
        /**
         * Id of the element that describes the modal.
         */
        this.ariaDescribedBy = null;
        /**
         * Whether the modal should have a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Global classes to apply to the backdrop.
         */
        this.backdropClass = '';
        /**
         * Whether clicking on the backdrop should close the modal. Only works if hasBackdrop is true.
         */
        this.backdropClickCloseable = true;
        /**
         * Global classes to apply to the modal panel.
         */
        this.modalPanelClass = '';
        /**
         * Whether the escape key should close the modal.
         */
        this.escKeyCloseable = true;
        /**
         * Whether the modal should be focus trapped.
         */
        this.focusTrapped = true;
        /**
         * The container that the modal is appended to. By default, it is appended to the body.
         */
        this.container = 'body';
    }
    return ModalConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate a modal.
 */
var ModalService = /** @class */ (function () {
    /** @hidden */
    function ModalService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.modals = [];
    }
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     */
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    ModalService.prototype.hasOpenModals = /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    function () {
        return this.modals && this.modals.length > 0;
    };
    /**
     * Dismisses all currently open modals.
     */
    /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    ModalService.prototype.dismissAll = /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    function () {
        var _this = this;
        this.modals.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.destroyModalComponent(item.modalRef);
        }));
    };
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param contentType Content of the modal component.
     * @param modalConfig Configuration of the modal component.
     */
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    ModalService.prototype.open = /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    function (contentType, modalConfig) {
        var _this = this;
        if (modalConfig === void 0) { modalConfig = new ModalConfig(); }
        // Get default values from model
        modalConfig = Object.assign(new ModalConfig(), modalConfig);
        // Instantiate modal ref service
        /** @type {?} */
        var service = new ModalRef();
        service.data = modalConfig.data;
        // Create Container
        /** @type {?} */
        var container = this.dynamicComponentService.createDynamicComponent(contentType, ModalContainer, modalConfig);
        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;
        // Create Backdrop
        /** @type {?} */
        var backdrop;
        if (modalConfig.hasBackdrop) {
            backdrop = this.dynamicComponentService.createDynamicComponent(contentType, ModalBackdrop, modalConfig, [service]);
        }
        // Create Component
        /** @type {?} */
        var component = this.dynamicComponentService.createDynamicComponent(contentType, ModalComponent, modalConfig, [service]);
        // Sizing
        this.setModalSize(component, modalConfig);
        // Positioning
        this.setModalPosition(component, modalConfig.position);
        this.modals.push({
            modalRef: component,
            containerRef: container,
            backdropRef: backdrop
        });
        /** @type {?} */
        var defaultBehaviourOnClose = (/**
         * @return {?}
         */
        function () {
            _this.destroyModalComponent(component);
            refSub.unsubscribe();
        });
        /** @type {?} */
        var refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);
        return service;
    };
    /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    ModalService.prototype.destroyModalComponent = /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    function (modal) {
        /** @type {?} */
        var arrayRef = this.modals.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.modalRef === modal; }));
        /** @type {?} */
        var indexOf = this.modals.indexOf(arrayRef);
        this.dynamicComponentService.destroyComponent(arrayRef.modalRef);
        this.dynamicComponentService.destroyComponent(arrayRef.containerRef);
        arrayRef.containerRef.destroy();
        arrayRef.modalRef.destroy();
        if (arrayRef.backdropRef) {
            this.dynamicComponentService.destroyComponent(arrayRef.backdropRef);
            arrayRef.backdropRef.destroy();
        }
        this.modals[indexOf] = null;
        this.modals = this.modals.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item !== null && item !== undefined; }));
    };
    /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    ModalService.prototype.setModalSize = /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    function (componentRef, configObj) {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    };
    /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    ModalService.prototype.setModalPosition = /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    function (componentRef, position) {
        if (position) {
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    };
    ModalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: DynamicComponentService, decorators: [{ type: Inject, args: [DynamicComponentService,] }] }
    ]; };
    return ModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that applies fundamental modal styling to a header.
 *
 * ```html
 * <h1 fd-modal-title>Modal Title</h1>
 * ```
 */
var ModalTitleDirective = /** @class */ (function () {
    function ModalTitleDirective() {
        /**
         * @hidden
         */
        this.modalTitle = true;
    }
    ModalTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-modal-title]'
                },] }
    ];
    ModalTitleDirective.propDecorators = {
        modalTitle: [{ type: HostBinding, args: ['class.fd-modal__title',] }]
    };
    return ModalTitleDirective;
}());
/**
 * Directive that applies fundamental modal styling to a button.
 *
 * ```html
 * <button fd-modal-close-btn></button>
 * ```
 */
var ModalCloseButtonDirective = /** @class */ (function () {
    function ModalCloseButtonDirective() {
        /**
         * @hidden
         */
        this.lightButton = true;
        /**
         * @hidden
         */
        this.modalClose = true;
    }
    ModalCloseButtonDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-modal-close-btn]'
                },] }
    ];
    ModalCloseButtonDirective.propDecorators = {
        lightButton: [{ type: HostBinding, args: ['class.fd-button--light',] }],
        modalClose: [{ type: HostBinding, args: ['class.fd-modal__close',] }]
    };
    return ModalCloseButtonDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ModalComponent,
                        ModalHeaderComponent,
                        ModalBodyComponent,
                        ModalFooterComponent,
                        ModalBackdrop,
                        ModalContainer,
                        ModalCloseButtonDirective,
                        ModalTitleDirective
                    ],
                    imports: [
                        CommonModule,
                        ButtonModule,
                        IconModule
                    ],
                    exports: [
                        ModalHeaderComponent,
                        ModalBodyComponent,
                        ModalFooterComponent,
                        ModalBackdrop,
                        ModalContainer,
                        ModalCloseButtonDirective,
                        ModalTitleDirective
                    ],
                    entryComponents: [
                        ModalComponent,
                        ModalBackdrop,
                        ModalContainer
                    ],
                    providers: [ModalService, DynamicComponentService]
                },] }
    ];
    return ModalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
var MultiInputComponent = /** @class */ (function () {
    /** @hidden */
    function MultiInputComponent(elRef) {
        this.elRef = elRef;
        /**
         * @hidden
         */
        this.multiInputClass = true;
        /**
         * Placeholder for the input field.
         */
        this.placeholder = '';
        /**
         * Whether the input is disabled.
         */
        this.disabled = false;
        /**
         * Whether the input is in compact mode.
         */
        this.compact = false;
        /**
         * Max height of the popover. Any overflowing elements will be accessible through scrolling.
         */
        this.maxHeight = '300px';
        /**
         * Icon of the button on the right of the input field.
         */
        this.glyph = 'navigation-down-arrow';
        /**
         * Values to be displayed in the unfiltered dropdown.
         */
        this.dropdownValues = [];
        /**
         * Whether the search term should be highlighted in results.
         */
        this.highlight = true;
        /**
         * Selected dropdown items.
         */
        this.selected = [];
        /**
         * Filter function. Accepts an array and a string as arguments, and outputs an array.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See multi input examples for details.
         */
        this.filterFn = this.defaultFilter;
        /**
         * Display function. Accepts an object of the same type as the
         * items passed to dropdownValues as argument, and outputs a string.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See multi input examples for details.
         */
        this.displayFn = this.defaultDisplay;
        /**
         * Aria label for the multi input body.
         */
        this.multiInputBodyLabel = 'Multi input body';
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * Event emitted when the search term changes. Use *$event* to access the new term.
         */
        this.searchTermChange = new EventEmitter();
        /**
         * Event emitted when the selected items change. Use *$event* to access the new selected array.
         */
        this.selectedChange = new EventEmitter();
        /**
         * @hidden
         */
        this.displayedValues = [];
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MultiInputComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    MultiInputComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    MultiInputComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    MultiInputComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    MultiInputComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} selected
     * @return {?}
     */
    MultiInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected) {
            this.selected = selected;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    MultiInputComponent.prototype.handleSelect = /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    function (checked, value) {
        /** @type {?} */
        var previousLength = this.selected.length;
        if (checked) {
            this.selected.push(value);
        }
        else {
            this.selected.splice(this.selected.indexOf(value), 1);
        }
        // Handle popover placement update
        if ((previousLength === 0 && this.selected.length === 1) ||
            (previousLength === 1 && this.selected.length === 0)) {
            this.popoverRef.updatePopover();
        }
        this.onChange(this.selected);
        this.selectedChange.emit(this.selected);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MultiInputComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this.popoverRef.updatePopover();
    };
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    MultiInputComponent.prototype.defaultFilter = /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    function (contentArray, searchTerm) {
        var _this = this;
        /** @type {?} */
        var searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return _this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    MultiInputComponent.prototype.defaultDisplay = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MultiInputComponent.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    };
    MultiInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-multi-input',
                    template: "<div class=\"fd-multi-input-field\">\n    <fd-popover [(isOpen)]=\"isOpen\"\n                [triggers]=\"[]\"\n                [disabled]=\"disabled\"\n                [fillControlMode]=\"fillControlMode\"\n                class=\"fd-multi-input-popover-custom\">\n        <fd-popover-control>\n            <div class=\"fd-combobox-control\"\n                 [attr.aria-label]=\"multiInputBodyLabel\"\n                 [attr.aria-expanded]=\"isOpen\">\n                <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                    <input type=\"text\" class=\"fd-input\"\n                           [ngClass]=\"{'fd-input--compact': compact}\"\n                           [placeholder]=\"placeholder\"\n                           [disabled]=\"disabled\"\n                           [(ngModel)]=\"searchTerm\"\n                           (ngModelChange)=\"handleSearchTermChange()\"\n                           (keypress)=\"isOpen = true\"\n                           (click)=\"isOpen = !isOpen\">\n                    <span class=\"fd-input-group__addon fd-input-group__addon--after\n                        fd-input-group__addon--button\">\n                            <button class=\"fd-button--light\" type=\"button\"\n                                    [ngClass]=\"('sap-icon--' + glyph)\"\n                                    [disabled]=\"disabled\"\n                                    (click)=\"isOpen = !isOpen\"></button>\n                        </span>\n                </div>\n            </div>\n        </fd-popover-control>\n        <fd-popover-body [attr.aria-hidden]=\"!isOpen\">\n            <fd-menu class=\"fd-multi-input-menu-overflow\"\n                     *ngIf=\"displayedValues && displayedValues.length\"\n                     [style.maxHeight]=\"maxHeight\">\n                <ul fd-menu-list>\n                    <li *ngFor=\"let value of displayedValues\">\n                        <label fd-menu-item>\n                            <input type=\"checkbox\" class=\"fd-checkbox\"\n                                   [ngModel]=\"selected ? selected.indexOf(value) !== -1 : false\"\n                                   (ngModelChange)=\"handleSelect($event, value)\">\n                            <span [innerHtml]=\"value | displayFnPipe:displayFn | highlight:searchTerm:highlight\"></span>\n                        </label>\n                    </li>\n                </ul>\n            </fd-menu>\n            <ng-content></ng-content>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n<div class=\"fd-multi-input-tags\">\n    <fd-token \n            *ngFor=\"let token of selected\"\n            [disabled]=this.disabled\n            (onCloseClick)=\"handleSelect(false, token)\"\n            class=\"fd-multi-input-token-spacing\">\n        {{token | displayFnPipe:displayFn}}\n    </fd-token>\n</div>\n\n",
                    host: {
                        '(blur)': 'onTouched()',
                        '[class.fd-multi-input-custom]': 'true'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return MultiInputComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-multi-input-custom{display:block}.fd-multi-input-custom .fd-multi-input-popover-size{overflow:auto;display:block}.fd-multi-input-custom .fd-multi-input-popover-custom{display:block}.fd-multi-input-custom .fd-multi-input-menu-overflow{overflow:auto}.fd-multi-input-custom .fd-multi-input-token-spacing{margin:0 4px 4px 0}.fd-multi-input-custom .fd-multi-input-token-spacing:last-child{margin-right:0}"]
                }] }
    ];
    /** @nocollapse */
    MultiInputComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MultiInputComponent.propDecorators = {
        popoverRef: [{ type: ViewChild, args: [PopoverComponent,] }],
        multiInputClass: [{ type: HostBinding, args: ['class.fd-multi-input',] }],
        placeholder: [{ type: Input }],
        disabled: [{ type: Input }],
        compact: [{ type: Input }],
        maxHeight: [{ type: Input }],
        glyph: [{ type: Input }],
        dropdownValues: [{ type: Input }],
        searchTerm: [{ type: Input }],
        highlight: [{ type: Input }],
        selected: [{ type: Input }],
        filterFn: [{ type: Input }],
        displayFn: [{ type: Input }],
        multiInputBodyLabel: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        searchTermChange: [{ type: Output }],
        selectedChange: [{ type: Output }],
        clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return MultiInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TokenModule = /** @class */ (function () {
    function TokenModule() {
    }
    TokenModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TokenComponent],
                    imports: [CommonModule],
                    exports: [TokenComponent]
                },] }
    ];
    return TokenModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MultiInputModule = /** @class */ (function () {
    function MultiInputModule() {
    }
    MultiInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MultiInputComponent],
                    imports: [
                        CommonModule,
                        TokenModule,
                        FormsModule,
                        MenuModule,
                        PopoverModule,
                        PipeModule
                    ],
                    exports: [MultiInputComponent]
                },] }
    ];
    return MultiInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DISPLAY_NUM_PAGES = 3;
/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
var PaginationService = /** @class */ (function () {
    /** @hidden */
    function PaginationService() {
        /**
         * Constant representing the default number of items per page.
         */
        this.DEFAULT_ITEMS_PER_PAGE = 10;
        /**
         * @hidden
         */
        this.MORE = -1;
    }
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Returns a number array representing the pages of the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.getPages = /**
     * Returns a number array representing the pages of the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        /** @type {?} */
        var pages = [];
        this.validate(pagination);
        /** @type {?} */
        var totalPages = this.getTotalPages(pagination);
        if (totalPages <= DISPLAY_NUM_PAGES) {
            for (var i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            if (pagination.currentPage <= DISPLAY_NUM_PAGES) {
                for (var i = 1; i <= DISPLAY_NUM_PAGES; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
            else if (pagination.currentPage > totalPages - (DISPLAY_NUM_PAGES - 1)) {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                for (var i = totalPages - (DISPLAY_NUM_PAGES - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            }
            else {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                /** @type {?} */
                var buffer = Math.floor(DISPLAY_NUM_PAGES / 2);
                for (var i = pagination.currentPage - buffer; i <= pagination.currentPage + buffer; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
        }
        return pages;
    };
    /**
     * Retrieves the total number of pages.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.getTotalPages = /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    };
    /**
     * Provides validation for the pagination object.
     * @param pagination An object of type *Pagination*.
     */
    /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    PaginationService.prototype.validate = /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    function (pagination) {
        if (!pagination.totalItems && isDevMode()) {
            console.warn("No pages provided in the Pagination object. This warning only appears in development mode.");
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        else if (pagination.itemsPerPage < 0 && isDevMode()) {
            console.warn("itemsPerPage must be greater than zero. This warning only appears in development mode.");
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    };
    PaginationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PaginationService.ctorParameters = function () { return []; };
    return PaginationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that is used to provide navigation between paged information.
 * ```html
 * <fd-pagination
 *          [totalItems]="50"
 *          [itemsPerPage]="10"
 *          [currentPage]="3">
 * </fd-pagination>
 * ```
 */
var PaginationComponent = /** @class */ (function () {
    /** @hidden */
    function PaginationComponent(paginationService) {
        this.paginationService = paginationService;
        /**
         * Whether to display the total number of items.
         */
        this.displayTotalItems = true;
        /**
         * The text appended to the total number of items.
         * The default text is set to 'items'
         */
        this.displayText = 'items';
        /**
         * Label for the 'previous' page button.
         */
        this.previousLabel = 'Previous';
        /**
         * Label for the 'next' page button.
         */
        this.nextLabel = 'Next';
        /**
         * Event fired when the page is changed.
         */
        this.pageChangeStart = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    PaginationComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        /** @type {?} */
        var totalPages = this.paginationService.getTotalPages(this.getPaginationObject());
        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        }
        else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
    };
    /**
     * Checks if the current page is the last page.
     */
    /**
     * Checks if the current page is the last page.
     * @return {?}
     */
    PaginationComponent.prototype.isLastPage = /**
     * Checks if the current page is the last page.
     * @return {?}
     */
    function () {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
    };
    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param page The number of the page.
     * @param $event The keyboard event.
     */
    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param {?} page The number of the page.
     * @param {?} $event The keyboard event.
     * @return {?}
     */
    PaginationComponent.prototype.onKeypressHandler = /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param {?} page The number of the page.
     * @param {?} $event The keyboard event.
     * @return {?}
     */
    function (page, $event) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.goToPage(page);
        }
    };
    /**
     * Navigates to a specific page.
     * @param page The number of the page to navigate to.
     * @param $event The mouse event (optional).
     */
    /**
     * Navigates to a specific page.
     * @param {?} page The number of the page to navigate to.
     * @param {?=} $event The mouse event (optional).
     * @return {?}
     */
    PaginationComponent.prototype.goToPage = /**
     * Navigates to a specific page.
     * @param {?} page The number of the page to navigate to.
     * @param {?=} $event The mouse event (optional).
     * @return {?}
     */
    function (page, $event) {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.paginationService.getTotalPages(this.getPaginationObject()) || page < 1) {
            return;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        this.pageChangeStart.emit(page);
    };
    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     */
    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     * @return {?}
     */
    PaginationComponent.prototype.getPaginationObject = /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var retVal = {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
        return retVal;
    };
    PaginationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-pagination',
                    template: "<span class=\"fd-pagination__total\" *ngIf=\"displayTotalItems && totalItems\">{{ totalItems }} {{displayText}}</span>\n<nav class=\"fd-pagination__nav\" *ngIf=\"totalItems && totalItems >= itemsPerPage\">\n    <a class=\"fd-pagination__link fd-pagination__link--previous\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-label]=\"previousLabel\"\n       [attr.aria-disabled]=\"currentPage === 1 ? true : null\"\n       (keypress)=\"onKeypressHandler(currentPage - 1, $event)\"\n       (click)=\"goToPage(currentPage - 1)\">\n    </a>\n    <ng-container *ngFor=\"let page of pages\">\n        <a class=\"fd-pagination__link\"\n           tabindex=\"0\"\n           role=\"button\"\n           (keypress)=\"onKeypressHandler(page, $event)\"\n           (click)=\"goToPage(page, $event)\"\n           *ngIf=\"page !== -1; else more\"\n           [attr.aria-selected]=\"currentPage === page\">{{page}}</a>\n        <ng-template #more>\n            <span class=\"fd-pagination__link fd-pagination__link--more\"\n                  aria-hidden=\"true\"\n                  aria-label=\"...\"\n                  role=\"presentation\"></span>\n        </ng-template>\n    </ng-container>\n    <a class=\"fd-pagination__link fd-pagination__link--next\"\n       [attr.aria-label]=\"nextLabel\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-disabled]=\"isLastPage()\"\n       (keypress)=\"onKeypressHandler(currentPage + 1, $event)\"\n       (click)=\"goToPage(currentPage + 1)\">\n    </a>\n</nav>\n",
                    providers: [PaginationService],
                    host: {
                        class: 'fd-pagination'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-pagination a {\n            cursor: pointer;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return [
        { type: PaginationService }
    ]; };
    PaginationComponent.propDecorators = {
        totalItems: [{ type: Input }],
        currentPage: [{ type: Input }],
        itemsPerPage: [{ type: Input }],
        displayTotalItems: [{ type: Input }],
        displayText: [{ type: Input }],
        previousLabel: [{ type: Input }],
        nextLabel: [{ type: Input }],
        pageChangeStart: [{ type: Output }]
    };
    return PaginationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [PaginationComponent],
                    imports: [CommonModule, ButtonModule, IconModule],
                    providers: [PaginationService],
                    exports: [PaginationComponent]
                },] }
    ];
    return PaginationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
var PanelComponent = /** @class */ (function (_super) {
    __extends(PanelComponent, _super);
    /** @hidden */
    function PanelComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * @hidden
         */
        _this.fdPanelClass = true;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PanelComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    };
    PanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel',
                    template: "<ng-content select=\"fd-panel-header\"></ng-content>\n<ng-content select=\"fd-panel-filters\"></ng-content>\n<ng-content select=\"fd-panel-body\"></ng-content>\n<ng-content select=\"fd-panel-footer\"></ng-content>\n<ng-content></ng-content>\n",
                    host: {
                        '[class.fd-has-display-block]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    PanelComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PanelComponent.propDecorators = {
        columnSpan: [{ type: Input }],
        backgroundImage: [{ type: Input }],
        fdPanelClass: [{ type: HostBinding, args: ['class.fd-panel',] }]
    };
    return PanelComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Header of the panel. Contains a head and actions.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-title>Title!</fd-panel-title>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
var PanelHeaderComponent = /** @class */ (function () {
    function PanelHeaderComponent() {
        /**
         * @hidden
         */
        this.fdPanelHeaderClass = true;
    }
    PanelHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-header',
                    template: "<ng-content select=\"fd-panel-head\"></ng-content>\n<ng-content select=\"fd-panel-actions\"></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelHeaderComponent.propDecorators = {
        fdPanelHeaderClass: [{ type: HostBinding, args: ['class.fd-panel__header',] }]
    };
    return PanelHeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Container for title and description.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-title>Title!</fd-panel-title>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
var PanelHeadComponent = /** @class */ (function () {
    function PanelHeadComponent() {
        /**
         * @hidden
         */
        this.fdPanelHeadClass = true;
    }
    PanelHeadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-head',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelHeadComponent.propDecorators = {
        fdPanelHeadClass: [{ type: HostBinding, args: ['class.fd-panel__head',] }]
    };
    return PanelHeadComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-panel-title>Panel Title</h1>
 * <h3 fd-panel-title>Panel Title</h3>
 * ```
 */
var PanelTitleDirective = /** @class */ (function () {
    function PanelTitleDirective() {
        /**
         * @hidden
         */
        this.fdPanelTitleClass = true;
    }
    PanelTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-panel-title]',
                },] }
    ];
    PanelTitleDirective.propDecorators = {
        fdPanelTitleClass: [{ type: HostBinding, args: ['class.fd-panel__title',] }]
    };
    return PanelTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Description of the panel title.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-description>This is a description for a panel title!</fd-panel-description>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
var PanelDescriptionComponent = /** @class */ (function () {
    function PanelDescriptionComponent() {
    }
    PanelDescriptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-description',
                    template: "<p class=\"fd-panel__description\">\n    <ng-content></ng-content>\n</p>",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return PanelDescriptionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Panel level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-actions>
 *             <button fd-button (click)="action()">Action</button>
 *         </fd-panel-actions>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
var PanelActionsComponent = /** @class */ (function () {
    function PanelActionsComponent() {
        /**
         * @hidden
         */
        this.fdPanelActionsClass = true;
    }
    PanelActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-actions',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelActionsComponent.propDecorators = {
        fdPanelActionsClass: [{ type: HostBinding, args: ['class.fd-panel__actions',] }]
    };
    return PanelActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Panel level filters that is specific to the data being displayed within the panel.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-filters>
 *         Some text can go here!
 *     </fd-panel-filters>
 * </fd-panel>
 * ```
 */
var PanelFiltersComponent = /** @class */ (function () {
    function PanelFiltersComponent() {
        /**
         * @hidden
         */
        this.fdPanelFiltersClass = true;
    }
    PanelFiltersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-filters',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        '[class.fd-has-display-block]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelFiltersComponent.propDecorators = {
        fdPanelFiltersClass: [{ type: HostBinding, args: ['class.fd-panel__filters',] }]
    };
    return PanelFiltersComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Main content of the panel can that hold lists, table, tree, text, form or any other information.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-body>
 *         Some text can go here!
 *     </fd-panel-body>
 * </fd-panel>
 * ```
 */
var PanelBodyComponent = /** @class */ (function () {
    function PanelBodyComponent() {
        /**
         * @hidden
         */
        this.fdPanelBodyClass = true;
        /**
         * Whether the edges of the panel should have bleeding padding.
         */
        this.bleed = false;
    }
    PanelBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-body',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        '[class.fd-has-display-block]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelBodyComponent.propDecorators = {
        fdPanelBodyClass: [{ type: HostBinding, args: ['class.fd-panel__body',] }],
        bleed: [{ type: Input }, { type: HostBinding, args: ['class.fd-panel__body--bleed',] }]
    };
    return PanelBodyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Panel footer can be utilized for pagination, secondary actions, add more data, etc.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-footer>
 *         Some text can go here!
 *     </fd-panel-footer>
 * </fd-panel>
 * ```
 */
var PanelFooterComponent = /** @class */ (function () {
    function PanelFooterComponent() {
        /**
         * @hidden
         */
        this.fdPanelFooterClass = true;
    }
    PanelFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-footer',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelFooterComponent.propDecorators = {
        fdPanelFooterClass: [{ type: HostBinding, args: ['class.fd-panel__footer',] }]
    };
    return PanelFooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
var PanelGridComponent = /** @class */ (function (_super) {
    __extends(PanelGridComponent, _super);
    /** @hidden */
    function PanelGridComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the grid should have a gap.
         */
        _this.nogap = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PanelGridComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-panel-grid');
        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    };
    PanelGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-grid',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    PanelGridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PanelGridComponent.propDecorators = {
        col: [{ type: Input }],
        nogap: [{ type: Input }]
    };
    return PanelGridComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PanelComponent,
                        PanelHeaderComponent,
                        PanelHeadComponent,
                        PanelTitleDirective,
                        PanelDescriptionComponent,
                        PanelActionsComponent,
                        PanelFiltersComponent,
                        PanelBodyComponent,
                        PanelFooterComponent,
                        PanelGridComponent
                    ],
                    imports: [CommonModule],
                    exports: [
                        PanelComponent,
                        PanelHeaderComponent,
                        PanelHeadComponent,
                        PanelTitleDirective,
                        PanelDescriptionComponent,
                        PanelActionsComponent,
                        PanelFiltersComponent,
                        PanelBodyComponent,
                        PanelFooterComponent,
                        PanelGridComponent
                    ]
                },] }
    ];
    return PanelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
var ScrollSpyDirective = /** @class */ (function () {
    /** @hidden */
    function ScrollSpyDirective(elRef) {
        this.elRef = elRef;
        /**
         * An array of tags to track.
         */
        this.trackedTags = [];
        /**
         * Whether events are still fired if there is no tag present on the user's screen.
         */
        this.fireEmpty = false;
        /**
         * A number that represent at what location in the container the event is fired.
         * 0.5 would fire the events in the middle of the container,
         * 0 for the top and 1 for the bottom.
         */
        this.targetPercent = 0;
        /**
         * Event fired on the scroll element when a new item becomes activated by the scrollspy .
         * The returned value is the HTMLElement itself.
         */
        this.spyChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ScrollSpyDirective.prototype.onScroll = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var spiedTag;
        /** @type {?} */
        var children = this.elRef.nativeElement.children;
        /** @type {?} */
        var targetScrollTop = event.target.scrollTop;
        /** @type {?} */
        var targetOffsetTop = event.target.offsetTop;
        var _loop_1 = function (i) {
            /** @type {?} */
            var element = children[i];
            if (this_1.trackedTags.some((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase(); }))) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop + event.target.offsetHeight * this_1.targetPercent) {
                    spiedTag = element;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < children.length; i++) {
            _loop_1(i);
        }
        if ((spiedTag || this.fireEmpty) && spiedTag !== this.currentActive) {
            this.currentActive = spiedTag;
            this.spyChange.emit(this.currentActive);
        }
    };
    ScrollSpyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdScrollSpy]'
                },] }
    ];
    /** @nocollapse */
    ScrollSpyDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ScrollSpyDirective.propDecorators = {
        trackedTags: [{ type: Input }],
        fireEmpty: [{ type: Input }],
        targetPercent: [{ type: Input }],
        spyChange: [{ type: Output }],
        onScroll: [{ type: HostListener, args: ['scroll', ['$event'],] }]
    };
    return ScrollSpyDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ScrollSpyModule = /** @class */ (function () {
    function ScrollSpyModule() {
    }
    ScrollSpyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ScrollSpyDirective],
                    exports: [ScrollSpyDirective]
                },] }
    ];
    return ScrollSpyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Allows users to filter through results and select.
 * Can also be customized to execute a search function.
 *
 * Supports Angular Forms.
 */
var SearchInputComponent = /** @class */ (function () {
    function SearchInputComponent() {
        /**
         * Values to be filtered in the search input.
         */
        this.dropdownValues = [];
        /**
         * Filter function. Accepts an array of objects and a search term as arguments
         * and returns a string. See search input examples for details.
         */
        this.filterFn = this.defaultFilter;
        /**
         * Whether the search input is in a shellbar *
         */
        this.inShellbar = false;
        /**
         * Icon to display in the right-side button.
         */
        this.glyph = 'search';
        /**
         * Max height of the popover. Any overflowing elements will be accessible through scrolling.
         */
        this.maxHeight = '200px';
        /**
         * Whether the search input should be displayed in compact mode.
         */
        this.compact = false;
        /**
         * Whether the matching string should be highlighted during filtration.
         */
        this.highlighting = true;
        /**
         * Whether the popover should close when a user selects a result.
         */
        this.closeOnSelect = true;
        /**
         * Whether the input field should be populated with the result picked by the user.
         */
        this.fillOnSelect = true;
        /**
         * Display function. Accepts an object of the same type as the
         * items passed to dropdownValues as argument, and outputs a string.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See search input examples for details.
         */
        this.displayFn = this.defaultDisplay;
        /**
         * Event emitted when an item is clicked. Use *$event* to retrieve it.
         */
        this.itemClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.displayedValues = [];
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * @hidden
         */
        this.searchInputClass = true;
        /**
         * @hidden
         */
        this.shellBarClass = this.inShellbar;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SearchInputComponent.prototype.onInputKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.onInputKeyupHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.inputText && this.inputText.length) {
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    SearchInputComponent.prototype.onMenuKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    function (event, term) {
        var _this = this;
        if (event.code === 'Enter' && term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            /** @type {?} */
            var foundItem_1 = false;
            /** @type {?} */
            var menuItemsArray_1 = this.menuItems.toArray();
            menuItemsArray_1.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem_1) {
                    if (menuItemsArray_1[index + 1]) {
                        menuItemsArray_1[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem_1 = true;
                }
            }));
        }
        else if (event.code === 'ArrowUp') {
            event.preventDefault();
            /** @type {?} */
            var foundItem_2 = false;
            /** @type {?} */
            var menuItemsArray_2 = this.menuItems.toArray();
            menuItemsArray_2.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (!foundItem_2) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        _this.searchInputElement.nativeElement.focus();
                        foundItem_2 = true;
                    }
                    else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray_2[index - 1]) {
                            menuItemsArray_2[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem_2 = true;
                    }
                }
            }));
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    SearchInputComponent.prototype.onMenuClickHandler = /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    function (event, term) {
        if (term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SearchInputComponent.prototype.shellbarSearchInputClicked = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    Object.defineProperty(SearchInputComponent.prototype, "inputText", {
        /** Get the input text of the input. */
        get: /**
         * Get the input text of the input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the input text of the input. */
        set: /**
         * Set the input text of the input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    SearchInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputTextValue = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SearchInputComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SearchInputComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    SearchInputComponent.prototype.handleClickActions = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        if (isDevMode()) {
            console.warn('Search Input is deprecated. Please use Combobox instead. Visit the fundamental-ngx wiki for more information.');
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    SearchInputComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    SearchInputComponent.prototype.defaultDisplay = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    SearchInputComponent.prototype.defaultFilter = /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    function (contentArray, searchTerm) {
        var _this = this;
        /** @type {?} */
        var searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return _this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    };
    SearchInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-search-input',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [fillControlMode]=\"'at-least'\"\n            [disabled]=\"disabled\"\n            class=\"fd-search-input-popover-custom\"\n            [ngClass]=\"{'fd-popover-body--display-none': displayedValues && !displayedValues.length}\">\n    <fd-popover-control>\n        <div *ngIf=\"!inShellbar\" class=\"fd-combobox-control\">\n            <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                <input #searchInputElement type=\"text\" class=\"fd-input\" [ngClass]=\"{'fd-input--compact': compact}\"\n                       (keydown)=\"onInputKeydownHandler($event)\"\n                       (keyup)=\"onInputKeyupHandler()\"\n                       [disabled]=\"disabled\"\n                       [(ngModel)]=\"inputText\"\n                       (ngModelChange)=\"handleSearchTermChange()\"\n                       placeholder=\"{{placeholder}}\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button type=\"button\" class=\"fd-button--light\" [ngClass]=\"('sap-icon--' + this.glyph)\"></button>\n                </span>\n            </div>\n        </div>\n        <div *ngIf=\"inShellbar\" class=\"fd-search-input__control\">\n            <button tabindex=\"0\" type=\"button\" class=\"fd-button--shell\" [attr.aria-expanded]=\"isOpen\"\n                    [ngClass]=\"('sap-icon--' + this.glyph)\"></button>\n            <div class=\"fd-search-input__closedcontrol\" [attr.aria-hidden]=\"!isOpen\">\n                <div class=\"fd-search-input__controlinput\" [attr.aria-expanded]=\"isOpen\" aria-haspopup=\"true\">\n                    <input type=\"text\" class=\"fd-input\"\n                           (keydown)=\"onInputKeydownHandler($event)\"\n                           (keyup)=\"onInputKeyupHandler()\"\n                           [disabled]=\"disabled\"\n                           [(ngModel)]=\"inputText\"\n                           (ngModelChange)=\"handleSearchTermChange()\"\n                           placeholder=\"{{placeholder}}\"\n                           (click)=\"shellbarSearchInputClicked($event)\">\n                </div>\n            </div>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displayedValues && displayedValues.length\">\n        <fd-menu class=\"fd-search-input-menu-overflow\"\n                 [style.maxHeight]=\"maxHeight\">\n            <ul fd-menu-list>\n                <li fd-menu-item *ngFor=\"let term of displayedValues\"\n                    (click)=\"onMenuClickHandler($event, term)\"\n                    (keydown)=\"onMenuKeydownHandler($event, term)\">\n                    <a tabindex=\"0\" [innerHTML]=\"term | displayFnPipe:displayFn | highlight:inputText:highlighting\"></a>\n                </li>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return SearchInputComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'fd-search-input-custom'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-search-input-custom .fd-search-input-popover-custom{display:block}.fd-search-input-custom .fd-search-input-menu-overflow{overflow:auto}"]
                }] }
    ];
    SearchInputComponent.propDecorators = {
        dropdownValues: [{ type: Input }],
        filterFn: [{ type: Input }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        inShellbar: [{ type: Input }],
        glyph: [{ type: Input }],
        maxHeight: [{ type: Input }],
        searchFunction: [{ type: Input }],
        compact: [{ type: Input }],
        highlighting: [{ type: Input }],
        closeOnSelect: [{ type: Input }],
        fillOnSelect: [{ type: Input }],
        displayFn: [{ type: Input }],
        itemClicked: [{ type: Output }],
        menuItems: [{ type: ViewChildren, args: [MenuItemDirective,] }],
        searchInputElement: [{ type: ViewChild, args: ['searchInputElement',] }],
        searchInputClass: [{ type: HostBinding, args: ['class.fd-search-input',] }],
        shellBarClass: [{ type: HostBinding, args: ['class.fd-search-input--closed',] }]
    };
    return SearchInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SearchInputModule = /** @class */ (function () {
    function SearchInputModule() {
    }
    SearchInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SearchInputComponent],
                    imports: [
                        CommonModule,
                        PopoverModule,
                        MenuModule,
                        FormsModule,
                        PipeModule
                    ],
                    exports: [SearchInputComponent]
                },] }
    ];
    return SearchInputModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
var ShellbarComponent = /** @class */ (function () {
    function ShellbarComponent() {
    }
    ShellbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar',
                    template: "<div class=\"fd-shellbar\">\n    <div class=\"fd-shellbar__group fd-shellbar__group--start\">\n        <ng-content select=\"fd-shellbar-logo\"></ng-content>\n        <div class=\"fd-shellbar__product\">\n            <ng-content select=\"fd-shellbar-title\"></ng-content>\n            <ng-content select=\"fd-product-menu\"></ng-content>\n        </div>\n        <ng-content select=\"fd-shellbar-subtitle\"></ng-content>\n    </div>\n    <div class=\"fd-shellbar__group fd-shellbar__group--end\">\n        <ng-content select=\"fd-shellbar-actions\"></ng-content>\n    </div>\n</div>\n"
                }] }
    ];
    return ShellbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a product menu.
 * Product menu is used for navigating to applications within the product.
 * ```html
 * <fd-product-menu [control]="productMenuControl"
 *                  [items]="productMenuItems">
 * </fd-product-menu>
 * ```
 */
var ProductMenuComponent = /** @class */ (function () {
    function ProductMenuComponent() {
        /**
         * @hidden
         */
        this.productMenuCollapsed = false;
        /**
         * When set to true, popover list will be closed after selecting the option
         */
        this.closePopoverOnSelect = false;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductMenuComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductMenuComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onResize();
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    ProductMenuComponent.prototype.itemClicked = /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponent.close();
        }
        item.callback(event);
    };
    ProductMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-product-menu',
                    template: "<div class=\"fd-product-menu\">\n    <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                [focusTrapped]=\"false\"\n                [disabled]=\"!items || items.length === 0\" >\n        <fd-popover-control>\n            <button class=\"fd-product-menu__control\">\n                <span class=\"fd-shellbar__title fd-product-menu__title\">\n                    {{control}}\n                </span>\n            </button>\n        </fd-popover-control>\n        <fd-popover-body>\n            <fd-menu>\n                <ul fd-menu-list>\n                    <li fd-menu-item *ngFor=\"let item of items\" (click)=\"itemClicked(item, $event)\">\n                        {{item.name}}\n                    </li>\n                </ul>\n            </fd-menu>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ProductMenuComponent.propDecorators = {
        popoverComponent: [{ type: ViewChild, args: [PopoverComponent,] }],
        control: [{ type: Input }],
        items: [{ type: Input }],
        closePopoverOnSelect: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', [],] }]
    };
    return ProductMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a shellbar subtitle.
 * The subtitle is optional and should be used rarely.
 * ```html
 *   <fd-shellbar-subtitle>
 *      Corporate Portal
 *   </fd-shellbar-subtitle>
 * ```
 */
var ShellbarSubtitleComponent = /** @class */ (function () {
    function ShellbarSubtitleComponent() {
    }
    ShellbarSubtitleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-subtitle',
                    template: "<div class=\"fd-shellbar__subtitle\">\n    <ng-content></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return ShellbarSubtitleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a shellbar action.
 * ```html
 *  <fd-shellbar-action *ngFor="let action of actions"
 *                      [glyph]="action.glyph"
 *                      [callback]="action.callback"
 *                      [label]="action.label"
 *                      [notificationCount]="action.notificationCount"
 *                      [notificationLabel]="action.notificationLabel">
 *  </fd-shellbar-action>
 * ```
 */
var ShellbarActionComponent = /** @class */ (function () {
    function ShellbarActionComponent() {
    }
    ShellbarActionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-action',
                    template: "<div class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n    <button class=\"fd-button--shell\" (click)=\"callback ? callback($event) : ''\"\n            [ngClass]=\"(glyph ? ('sap-icon--' + glyph) : '')\"\n            [attr.aria-label]=\"label\">\n        <span *ngIf=\"notificationCount\" class=\"fd-counter fd-counter--notification\" [attr.aria-label]=\"notificationLabel\">{{notificationCount}}</span>\n    </button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ShellbarActionComponent.propDecorators = {
        glyph: [{ type: Input }],
        callback: [{ type: Input }],
        label: [{ type: Input }],
        notificationLabel: [{ type: Input }],
        notificationCount: [{ type: Input }]
    };
    return ShellbarActionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents shellbar actions.
 * It is a container wrapper for all product actions and links (required element).
 * ```html
 * <fd-shellbar-actions [user]="user"
 *                      [userMenu]="userMenu"
 *                      [productSwitcher]="productSwitcher">
 *        <button fd-button [fdType]="'standard'">Custom Button</button>
 *
 *        <fd-shellbar-action *ngFor="let action of actions"
 *                            [glyph]="action.glyph"
 *                            [callback]="action.callback"
 *                            [label]="action.label"
 *                            [notificationCount]="action.notificationCount"
 *                            [notificationLabel]="action.notificationLabel">
 *        </fd-shellbar-action>
 * </fd-shellbar-actions>
 * ```
 */
var ShellbarActionsComponent = /** @class */ (function () {
    function ShellbarActionsComponent() {
        /**
         * @hidden
         */
        this.actionsCollapsed = false;
        /**
         * @hidden
         */
        this.showCollapsedProducts = false;
        /**
         * When set to true, popover list will be closed after selecting the option
         */
        this.closePopoverOnSelect = false;
        /**
         * Label for the collapsed item menu.
         */
        this.collapsedItemMenuLabel = 'Collapsed Item Menu';
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.actionsCollapsed = window.innerWidth < 1024;
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    ShellbarActionsComponent.prototype.itemClicked = /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponents.forEach((/**
             * @param {?} popover
             * @return {?}
             */
            function (popover) { return popover.close(); }));
        }
        item.callback(event);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onResize();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.ngAfterContentChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.totalNotifications = 0;
        this.shellbarActions.forEach((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                _this.totalNotifications = _this.totalNotifications + action.notificationCount;
            }
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ShellbarActionsComponent.prototype.toggleCollapsedProducts = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    };
    ShellbarActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-actions',
                    template: "<div class=\"fd-shellbar__actions\">\n    <div *ngIf=\"searchInputComponent\" class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n        <div class=\"fd-search-input fd-search-input--closed\">\n            <ng-content select=\"fd-search-input\"></ng-content>\n        </div>\n    </div>\n    <div *ngIf=\"actionsCollapsed && shellbarActions.length\"\n         class=\"fd-shellbar__action fd-shellbar__action--collapse\">\n        <div class=\"fd-shellbar-collapse\">\n            <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                        [focusTrapped]=\"false\">\n                <fd-popover-control>\n                    <div class=\"fd-shellbar-collapse--control\">\n                        <button class=\"fd-button--shell sap-icon--overflow\"\n                                [attr.aria-label]=\"collapsedItemMenuLabel\">\n                            <span *ngIf=\"totalNotifications\"\n                                  class=\"fd-counter fd-counter--notification\">{{totalNotifications}}</span>\n                        </button>\n                    </div>\n                </fd-popover-control>\n                <fd-popover-body>\n                    <fd-menu>\n                        <ul fd-menu-list\n                            *ngIf=\"!showCollapsedProducts\">\n                            <div *ngFor=\"let action of shellbarActions\"\n                                 class=\"fd-menu__addon-before\">\n                                <span [ngClass]=\"'sap-icon--' + action.glyph\"></span>\n                            </div>\n                            <li fd-menu-item\n                                *ngFor=\"let action of shellbarActions\"\n                                (click)=\"itemClicked(action, $event)\">\n                                {{action.label}}\n                            </li>\n                            <div *ngIf=\"productSwitcher\"\n                                 class=\"fd-menu__addon-before\">\n                                <span [ngClass]=\"'sap-icon--grid'\"></span>\n                            </div>\n                            <li fd-menu-item\n                                *ngIf=\"productSwitcher\"\n                                (click)=\"toggleCollapsedProducts($event);\">\n                                Product Switcher\n                            </li>\n                        </ul>\n                        <ul fd-menu-list\n                            *ngIf=\"showCollapsedProducts\">\n                            <li fd-menu-item\n                                (click)=\"toggleCollapsedProducts($event)\">\n                                <span class=\"fd-menu__item sap-icon--nav-back\"></span>\n                            </li>\n                            <hr>\n                            <li fd-menu-item\n                                *ngFor=\"let product of productSwitcher\"\n                                (click)=\"itemClicked(product, $event)\">\n                                {{product.title}}\n                            </li>\n                        </ul>\n                    </fd-menu>\n                </fd-popover-body>\n            </fd-popover>\n        </div>\n    </div>\n    <ng-content></ng-content>\n    <ng-content select=\"fd-shellbar-action\"></ng-content>\n    <ng-container *ngIf=\"user\">\n        <div class=\"fd-shellbar__action fd-shellbar__action--show-always\">\n            <div class=\"fd-user-menu\">\n                <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                            [focusTrapped]=\"false\">\n                    <fd-popover-control>\n                        <div class=\"fd-user-menu__control\">\n                            <span *ngIf=\"!user.image\"\n                                  class=\"fd-identifier fd-identifier--xs fd-identifier--circle\"\n                                  [ngClass]=\"(user.colorAccent ? 'fd-has-background-color-accent-' + user.colorAccent : '')\">\n                                {{user.initials}}\n                            </span>\n                            <span *ngIf=\"user.image\"\n                                  class=\"fd-identifier fd-identifier--xs fd-identifier--circle fd-identifier--thumbnail\"\n                                  [ngStyle]=\"{'background-image': 'url(' + user.image + ')'}\">\n                            </span>\n                        </div>\n                    </fd-popover-control>\n                    <fd-popover-body>\n                        <fd-menu>\n                            <ul fd-menu-list>\n                                <li fd-menu-item\n                                    *ngFor=\"let item of userMenu\"\n                                    (click)=\"itemClicked(item, $event)\">\n                                    {{item.text}}\n                                </li>\n                            </ul>\n                        </fd-menu>\n                    </fd-popover-body>\n                </fd-popover>\n            </div>\n        </div>\n    </ng-container>\n    <ng-container *ngIf=\"productSwitcher\">\n        <div class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n            <div class=\"fd-product-switcher\">\n                <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                            [focusTrapped]=\"false\">\n                    <fd-popover-control>\n                        <button class=\"fd-button--shell sap-icon--grid\"></button>\n                    </fd-popover-control>\n                    <fd-popover-body>\n                        <div class=\"fd-product-switcher__body\">\n                            <nav>\n                                <ul>\n                                    <li *ngFor=\"let product of productSwitcher\"\n                                        (click)=\"itemClicked(product, $event)\">\n                                        <span class=\"fd-product-switcher__product-icon\">\n                                            <img [src]=\"product.image\">\n                                        </span>\n                                        <span class=\"fd-product-switcher__product-title\">\n                                            {{product.title}}\n                                        </span>\n                                    </li>\n                                </ul>\n                            </nav>\n                        </div>\n                    </fd-popover-body>\n                </fd-popover>\n            </div>\n        </div>\n    </ng-container>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-search-input--closed .fd-popover__popper{width:300px!important;left:-264px!important}"]
                }] }
    ];
    ShellbarActionsComponent.propDecorators = {
        productSwitcher: [{ type: Input }],
        user: [{ type: Input }],
        userMenu: [{ type: Input }],
        closePopoverOnSelect: [{ type: Input }],
        collapsedItemMenuLabel: [{ type: Input }],
        shellbarActions: [{ type: ContentChildren, args: [ShellbarActionComponent,] }],
        popoverComponents: [{ type: ViewChildren, args: [PopoverComponent,] }],
        searchInputComponent: [{ type: ContentChild, args: [SearchInputComponent,] }],
        onResize: [{ type: HostListener, args: ['window:resize', [],] }]
    };
    return ShellbarActionsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a shellbar logo.
 * The logo is a required element and is used for company branding.
 * ```html
 *   <fd-shellbar-logo>
 *      <a href="#" class="fd-shellbar__logo fd-shellbar__logo--image-replaced" aria-label="SAP"></a>
 *   </fd-shellbar-logo>
 * ```
 */
var ShellbarLogoComponent = /** @class */ (function () {
    function ShellbarLogoComponent() {
    }
    ShellbarLogoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-logo',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return ShellbarLogoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a shellbar title.
 * The title is a required element and displays the current application name.
 * ```html
 *   <fd-shellbar-title>
 *      Corporate Portal
 *   </fd-shellbar-title>
 * ```
 */
var ShellbarTitleComponent = /** @class */ (function () {
    function ShellbarTitleComponent() {
    }
    ShellbarTitleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-title',
                    template: "<span class=\"fd-shellbar__title\">\n    <ng-content></ng-content>\n</span>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return ShellbarTitleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShellbarModule = /** @class */ (function () {
    function ShellbarModule() {
    }
    ShellbarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        ShellbarComponent,
                        ProductMenuComponent,
                        ShellbarSubtitleComponent,
                        ShellbarActionsComponent,
                        ShellbarActionComponent,
                        ShellbarLogoComponent,
                        ShellbarTitleComponent
                    ],
                    imports: [CommonModule, PopoverModule, MenuModule],
                    exports: [
                        ShellbarComponent,
                        ProductMenuComponent,
                        ShellbarSubtitleComponent,
                        ShellbarActionsComponent,
                        ShellbarActionComponent,
                        ShellbarLogoComponent,
                        ShellbarTitleComponent
                    ]
                },] }
    ];
    return ShellbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
var SideNavigationComponent = /** @class */ (function () {
    function SideNavigationComponent() {
        /**
         * Whether the side navigation is collapsed.
         */
        this.collapsed = false;
    }
    SideNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-side-nav',
                    template: "<div class=\"fd-side-nav\" [ngClass]=\"{' fd-side-nav--icons': collapsed === true}\">\n  <ng-content></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    SideNavigationComponent.propDecorators = {
        collapsed: [{ type: Input }]
    };
    return SideNavigationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationGroupComponent = /** @class */ (function () {
    function SideNavigationGroupComponent() {
    }
    SideNavigationGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-side-nav-group',
                    template: "<div class=\"fd-side-nav__group\">\n  <ng-content></ng-content>\n  <ng-content select=\"[fd-side-nav-list]\"></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return SideNavigationGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies the side navigation title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-side-nav-title>Side Nav Title</h1>
 * ```
 */
var SideNavigationTitleDirective = /** @class */ (function () {
    function SideNavigationTitleDirective() {
        /**
         * @hidden
         */
        this.fdSideNavTitleClass = true;
    }
    SideNavigationTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-title]'
                },] }
    ];
    SideNavigationTitleDirective.propDecorators = {
        fdSideNavTitleClass: [{ type: HostBinding, args: ['class.fd-side-nav__title',] }]
    };
    return SideNavigationTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a list group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationListDirective = /** @class */ (function () {
    function SideNavigationListDirective() {
    }
    SideNavigationListDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-list]',
                    host: {
                        class: 'fd-side-nav__list'
                    }
                },] }
    ];
    return SideNavigationListDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a navigation link.
 * ```html
 *    <a fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </a>
 * ```
 */
var SideNavigationLinkDirective = /** @class */ (function (_super) {
    __extends(SideNavigationLinkDirective, _super);
    /** @hidden */
    function SideNavigationLinkDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the link has a sublist.
         */
        _this.hasSublist = false;
        /**
         * Whether the sub list is opened or closed
         */
        _this.onSubListOpenChange = new EventEmitter();
        _this.sublistIsOpen = false;
        _this.role = _this.hasSublist ? 'button' : '';
        _this.hasPopup = _this.hasSublist;
        _this.tabindex = _this.hasSublist ? '0' : '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SideNavigationLinkDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-side-nav__link');
        if (this.hasSublist) {
            this._addClassToElement('has-child');
            this._addStyleToElement('cursor', 'pointer');
            this.elementRef.nativeElement.setAttribute('aria-expanded', this.sublistIsOpen);
        }
        if (this.sublistIsOpen && this.hasSublist) {
            this._addClassToElement('is-selected');
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SideNavigationLinkDirective.prototype.onKeypressHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.changeSubListIsOpen();
        }
    };
    /**
     * @return {?}
     */
    SideNavigationLinkDirective.prototype.changeSubListIsOpen = /**
     * @return {?}
     */
    function () {
        if (this.hasSublist) {
            this.sublistIsOpen = !this.sublistIsOpen;
            this.onSubListOpenChange.emit(this.sublistIsOpen);
            this.ngOnChanges();
        }
    };
    SideNavigationLinkDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-link]',
                },] }
    ];
    /** @nocollapse */
    SideNavigationLinkDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
    ]; };
    SideNavigationLinkDirective.propDecorators = {
        hasSublist: [{ type: Input }],
        onSubListOpenChange: [{ type: Output }],
        sublistIsOpen: [{ type: Input }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
        tabindex: [{ type: HostBinding, args: ['tabindex',] }],
        onKeypressHandler: [{ type: HostListener, args: ['keypress', ['$event'],] }],
        changeSubListIsOpen: [{ type: HostListener, args: ['click', ['$event.target'],] }]
    };
    return SideNavigationLinkDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationSublistDirective = /** @class */ (function () {
    /** @hidden */
    function SideNavigationSublistDirective(elementRef) {
        this.elementRef = elementRef;
        this.sublistIsOpen = false;
    }
    /**
     * @param {?} sublistIsOpen
     * @return {?}
     */
    SideNavigationSublistDirective.prototype.subListIsOpenChange = /**
     * @param {?} sublistIsOpen
     * @return {?}
     */
    function (sublistIsOpen) {
        this.sublistIsOpen = sublistIsOpen;
        this.elementRef.nativeElement.setAttribute('aria-hidden', !this.sublistIsOpen);
    };
    SideNavigationSublistDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-sublist]',
                    host: {
                        class: 'fd-side-nav__sublist'
                    }
                },] }
    ];
    /** @nocollapse */
    SideNavigationSublistDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return SideNavigationSublistDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationItemComponent = /** @class */ (function () {
    function SideNavigationItemComponent() {
    }
    /**
     * @return {?}
     */
    SideNavigationItemComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.linkElement && this.subListElement) {
            /** After view content check if there is flag with opened true */
            this.subListElement.subListIsOpenChange(this.linkElement.sublistIsOpen);
            this.subListOpenChanged$ = this.linkElement.onSubListOpenChange.subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            function (isOpen) {
                _this.subListElement.subListIsOpenChange(isOpen);
            }));
        }
    };
    /**
     * @return {?}
     */
    SideNavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subListOpenChanged$) {
            this.subListOpenChanged$.unsubscribe();
        }
    };
    SideNavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-side-nav-item',
                    template: "<div class=\"fd-side-nav__item\">\n  <ng-content select=\"[fd-side-nav-link]\"></ng-content>\n  <ng-content select=\"[fd-side-nav-sublist]\"></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    SideNavigationItemComponent.propDecorators = {
        linkElement: [{ type: ContentChild, args: [SideNavigationLinkDirective,] }],
        subListElement: [{ type: ContentChild, args: [SideNavigationSublistDirective,] }]
    };
    return SideNavigationItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a sub item.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *            <a fd-side-nav-link>Link Item</a>
 *                <div fd-side-nav-sublist>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [attr.href]="'#'">Link Item</a>
 *                    </div>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [routerLink]="'#'">Link Item</a>
 *                    </div>
 *              </div>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationSubitemDirective = /** @class */ (function () {
    function SideNavigationSubitemDirective() {
    }
    SideNavigationSubitemDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-subitem]',
                    host: {
                        class: 'fd-side-nav__subitem'
                    }
                },] }
    ];
    return SideNavigationSubitemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a navigation sublink.
 * ```html
 *     <a fd-side-nav-sublink [attr.href]="'#'">Sub Link Item</a>
 * ```
 */
var SideNavigationSublinkDirective = /** @class */ (function () {
    function SideNavigationSublinkDirective() {
    }
    SideNavigationSublinkDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-sublink]',
                    host: {
                        class: 'fd-side-nav__sublink'
                    }
                },] }
    ];
    return SideNavigationSublinkDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SideNavigationModule = /** @class */ (function () {
    function SideNavigationModule() {
    }
    SideNavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        SideNavigationComponent,
                        SideNavigationGroupComponent,
                        SideNavigationTitleDirective,
                        SideNavigationListDirective,
                        SideNavigationItemComponent,
                        SideNavigationLinkDirective,
                        SideNavigationSublistDirective,
                        SideNavigationSubitemDirective,
                        SideNavigationSublinkDirective,
                    ],
                    declarations: [
                        SideNavigationComponent,
                        SideNavigationGroupComponent,
                        SideNavigationTitleDirective,
                        SideNavigationListDirective,
                        SideNavigationItemComponent,
                        SideNavigationLinkDirective,
                        SideNavigationSublistDirective,
                        SideNavigationSubitemDirective,
                        SideNavigationSublinkDirective,
                    ]
                },] }
    ];
    return SideNavigationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to represent an option of the select component.
 */
var OptionComponent = /** @class */ (function () {
    /** @hidden */
    function OptionComponent(elRef) {
        this.elRef = elRef;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
        /**
         * @hidden
         */
        this.selected = false;
        /**
         * Whether to disable this option specifically.
         */
        this.disabled = false;
        /**
         * Emitted when the selected state changes.
         */
        this.selectedChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    OptionComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.selected && !this.disabled) {
            this.focus();
        }
    };
    Object.defineProperty(OptionComponent.prototype, "viewValueText", {
        /** Returns the view value text of the option, or the viewValue input if it exists. */
        get: /**
         * Returns the view value text of the option, or the viewValue input if it exists.
         * @return {?}
         */
        function () {
            return this.viewValue ? this.viewValue :
                (((/** @type {?} */ (this.elRef.nativeElement))).textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Returns the view value text of the option, or the viewValue input if it exists. */
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    OptionComponent.prototype.setSelected = /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    function (value, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        this.selected = value;
        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    };
    /** Focuses the element. */
    /**
     * Focuses the element.
     * @return {?}
     */
    OptionComponent.prototype.focus = /**
     * Focuses the element.
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.elRef.nativeElement))).focus();
    };
    /** Returns HTMLElement representation of the component. */
    /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    OptionComponent.prototype.getHtmlElement = /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.elRef.nativeElement));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    OptionComponent.prototype.selectionHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.selected && !this.disabled) {
            this.selected = true;
            this.selectedChange.emit(this);
        }
    };
    OptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-option',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class.fd-option-default-custom]': 'true',
                        '[attr.aria-disabled]': 'disabled',
                        '[tabindex]': 'disabled ? -1 : 0',
                        'role': 'option',
                    },
                    styles: [".fd-option-default-custom{text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden}.fd-option-default-custom:focus{color:var(--fd-color-text-1);background-color:var(--fd-color-background-hover);outline:0}.fd-option-default-custom.is-selected:focus{background-color:var(--fd-color-background-selected-hover)}"]
                }] }
    ];
    /** @nocollapse */
    OptionComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    OptionComponent.propDecorators = {
        fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }],
        selected: [{ type: HostBinding, args: ['class.is-selected',] }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        viewValue: [{ type: Input }],
        selectedChange: [{ type: Output }],
        selectionHandler: [{ type: HostListener, args: ['keydown.enter',] }, { type: HostListener, args: ['click',] }]
    };
    return OptionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Select component intended to mimic the behaviour of the native select element.
 */
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        var _this = this;
        /**
         * @hidden
         */
        this.fdDropdownClass = true;
        /**
         * Whether the select component is disabled.
         */
        this.disabled = false;
        /**
         * Open state of the select.
         */
        this.isOpen = false;
        /**
         * Whether the select is in compact mode.
         */
        this.compact = false;
        /**
         * Popper.js options of the popover.
         */
        this.popperOptions = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'scrollParent'
                }
            }
        };
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * Event emitted when the popover open state changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Event emitted when the selected value of the select changes.
         */
        this.valueChange = new EventEmitter();
        /**
         * Subject triggered when the component is destroyed.
         */
        this.destroy$ = new Subject();
        /**
         * Observable triggered when an option has its selectedChange event fire.
         */
        this.optionsStatusChanges = (/** @type {?} */ (defer((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var options = _this.options;
            if (options) {
                return options.changes.pipe(startWith(options), switchMap((/**
                 * @return {?}
                 */
                function () { return merge.apply(void 0, __spread(options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.selectedChange; })))); })));
            }
        }))));
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    SelectComponent.prototype.isOpenChangeHandle = /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.value) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.value) {
                    _this.selectValue(_this.value, false);
                }
            }));
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        // If the observable state changes, reset the options and initialize selection.
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.resetOptions();
            _this.initSelection();
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /** Toggles the open state of the select. */
    /**
     * Toggles the open state of the select.
     * @return {?}
     */
    SelectComponent.prototype.toggle = /**
     * Toggles the open state of the select.
     * @return {?}
     */
    function () {
        if (this.isOpen && !this.disabled) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /** Opens the select popover body. */
    /**
     * Opens the select popover body.
     * @return {?}
     */
    SelectComponent.prototype.open = /**
     * Opens the select popover body.
     * @return {?}
     */
    function () {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /** Closes the select popover body. */
    /**
     * Closes the select popover body.
     * @return {?}
     */
    SelectComponent.prototype.close = /**
     * Closes the select popover body.
     * @return {?}
     */
    function () {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    SelectComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.options) {
            this.selectValue(value, false);
        }
        else {
            // Defer the selection of the value to support forms
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                if (_this.options) {
                    _this.selectValue(value, false);
                }
            }));
        }
    };
    Object.defineProperty(SelectComponent.prototype, "triggerValue", {
        /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
        get: /**
         * Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder.
         * @return {?}
         */
        function () {
            return this.selected ? this.selected.viewValueText : this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.keydownHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.code) {
            case ('ArrowUp'): {
                event.preventDefault();
                this.decrementFocused();
                break;
            }
            case ('ArrowDown'): {
                event.preventDefault();
                this.incrementFocused();
                break;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.resizeScrollHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    };
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @param option The option component to search for.
     * @param fireEvents Whether to fire change events.
     */
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    SelectComponent.prototype.selectOption = /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    function (option, fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        if (!this.isOptionActive(option)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            option.setSelected(true, false);
            this.selected = option;
            this.updateValue(fireEvents);
            this.close();
            return option;
        }
        return;
    };
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @param value Value to search for.
     * @param fireEvents Whether to fire change events.
     */
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    SelectComponent.prototype.selectValue = /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    function (value, fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        /** @type {?} */
        var matchOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.value != null && option.value === value;
        }));
        // If not match is found, set everything to null
        // This is mostly only for cases where a user removes an active option
        if (!matchOption) {
            this.unselectOptions();
            return;
        }
        // If match is found, select the new value
        if (matchOption && !this.isOptionActive(matchOption)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            matchOption.setSelected(true, false);
            this.selected = matchOption;
            this.updateValue(fireEvents);
            this.close();
        }
        return matchOption;
    };
    /**
     * Updates the value parameter with optional events.
     * @param fireEvents If true, function fires valueChange, onChange and onTouched events.
     */
    /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    SelectComponent.prototype.updateValue = /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    function (fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    };
    /**
     * Function used to reset the options state.
     */
    /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.resetOptions = /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Create observable that fires when the options change or the component is destroyed.
        /** @type {?} */
        var destroyCurrentObs = merge(this.options.changes, this.destroy$);
        // Subscribe to observable defined in component properties which fires when an option is clicked.
        // Destroy if the observable defined above triggers.
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            _this.selectOption(instance);
        }));
    };
    /** Selection initialization when a change occurs in options. */
    /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.initSelection = /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    function () {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    };
    /**
     * Function that tests whether the tested option is currently selected.
     * @param option Option to test against the selected option.
     */
    /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    SelectComponent.prototype.isOptionActive = /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    function (option) {
        return option && this.selected && option === this.selected;
    };
    /** Method that focuses the next option in the list, or the first one if the last one is currently focused. */
    /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.incrementFocused = /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    function () {
        // Get active focused element
        /** @type {?} */
        var activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        var correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.getHtmlElement() === activeElement;
        }));
        if (correspondingOption) {
            /** @type {?} */
            var arrayOptions = this.options.toArray();
            /** @type {?} */
            var index = arrayOptions.indexOf(correspondingOption);
            // If active option is the last option, focus the first one
            // Otherwise, focus the next option.
            if (index === this.options.length - 1) {
                arrayOptions[0].focus();
            }
            else {
                arrayOptions[index + 1].focus();
            }
        }
        else if (this.options) {
            this.options.first.focus();
        }
    };
    /** Method that focuses the previous option in the list, or the last one if the last one is currently focused. */
    /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.decrementFocused = /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    function () {
        // Get active focused element
        /** @type {?} */
        var activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        var correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.getHtmlElement() === activeElement;
        }));
        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            /** @type {?} */
            var arrayOptions = this.options.toArray();
            /** @type {?} */
            var index = arrayOptions.indexOf(correspondingOption);
            if (index === 0) {
                arrayOptions[this.options.length - 1].focus();
            }
            else {
                arrayOptions[index - 1].focus();
            }
        }
        else if (this.options) {
            this.options.first.focus();
        }
    };
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     */
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.unselectOptions = /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.selected) {
                _this.selected.setSelected(false, false);
            }
            _this.selected = undefined;
            _this.value = undefined;
            _this.valueChange.emit(undefined);
            _this.onChange(undefined);
        }));
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-select',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            (isOpenChange)=\"isOpenChangeHandle($event)\"\n            [options]=\"popperOptions\"\n            [fillControlMode]=\"fillControlMode\"\n            [appendTo]=\"appendTo\"\n            class=\"fd-select-popover-custom\">\n    <fd-popover-control>\n        <ng-container *ngIf=\"triggerTemplate\">\n            <ng-container *ngTemplateOutlet=\"triggerTemplate; context: {$implicit: this}\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!triggerTemplate\">\n            <button class=\"fd-dropdown__control fd-button fd-select-button-custom\"\n                    aria-haspopup=\"true\"\n                    [ngClass]=\"{'fd-button--compact': compact}\"\n                    [attr.aria-expanded]=\"isOpen\"\n                    [disabled]=\"disabled\">\n                <span class=\"fd-select-text-custom\">{{triggerValue}}</span>\n            </button>\n        </ng-container>\n    </fd-popover-control>\n    <fd-popover-body\n        class=\"fd-select-popover-body-custom\"\n        [style.maxHeight]=\"maxHeight || (calculatedMaxHeight + 'px')\">\n        <ng-content></ng-content>\n    </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return SelectComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.fd-select-custom]': 'true',
                        'role': 'listbox',
                    },
                    styles: [".fd-select-custom{display:inline-block;width:100%}.fd-select-custom .fd-select-popover-custom{display:block}.fd-select-custom .fd-select-popover-custom fd-popover-container{min-width:100%;overflow:auto}.fd-select-custom .fd-select-button-custom{display:flex;align-items:flex-end;justify-content:space-between}.fd-select-custom .fd-select-button-custom::after{flex-shrink:0;margin-top:0}.fd-select-custom .fd-select-text-custom{text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden}.fd-select-custom .fd-select-popover-body-custom{display:block}"]
                }] }
    ];
    SelectComponent.propDecorators = {
        fdDropdownClass: [{ type: HostBinding, args: ['class.fd-dropdown',] }],
        options: [{ type: ContentChildren, args: [OptionComponent, { descendants: true },] }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        isOpen: [{ type: Input }],
        value: [{ type: Input }],
        compact: [{ type: Input }],
        maxHeight: [{ type: Input }],
        popperOptions: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        triggerTemplate: [{ type: Input }],
        appendTo: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        resizeScrollHandler: [{ type: HostListener, args: ['window:resize',] }]
    };
    return SelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SelectComponent,
                        OptionComponent
                    ],
                    exports: [
                        SelectComponent,
                        OptionComponent
                    ],
                    imports: [
                        CommonModule,
                        PopoverModule
                    ]
                },] }
    ];
    return SelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive used to identify the template which will populate the main action button.
 * Used to achieve complex buttons that require more than a string.
 * ```html
 *    <fd-button-split>
 *        <ng-template fd-button-split-action-title>
 *            <p>Paragraph 1</p>
 *            <p>Paragraph 2</p>
 *        </ng-template>
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 * </fd-button-split>
 * ```
 */
var SplitButtonActionTitle = /** @class */ (function () {
    function SplitButtonActionTitle() {
    }
    SplitButtonActionTitle.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-split-button-action-title]'
                },] }
    ];
    return SplitButtonActionTitle;
}());
/**
 *   Directive used to specify menu list of items for dropdown.
 * ```html
 *    <fd-button-split>
 *        Action Button
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 * </fd-button-split>
 * ```
 */
var SplitButtonMenuDirective = /** @class */ (function () {
    function SplitButtonMenuDirective() {
    }
    SplitButtonMenuDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-split-button-menu]',
                },] }
    ];
    return SplitButtonMenuDirective;
}());
/**
 * Not for external use. Portal to render the complex title template.
 */
var SplitButtonLoadActionTitle = /** @class */ (function () {
    function SplitButtonLoadActionTitle(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    SplitButtonLoadActionTitle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    };
    SplitButtonLoadActionTitle.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-split-button-load-action-title]'
                },] }
    ];
    /** @nocollapse */
    SplitButtonLoadActionTitle.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    SplitButtonLoadActionTitle.propDecorators = {
        content: [{ type: Input, args: ['fd-split-button-load-action-title',] }]
    };
    return SplitButtonLoadActionTitle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Split Button component, used to enhance standard HTML button and add possibility to put some dropdown with
 * additional options.
 *
 * ```html
 *    <fd-split-button>
 *        Action Button
 *        <div fd-split-button-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-split-button>
 * ```
 */
var SplitButtonComponent = /** @class */ (function () {
    function SplitButtonComponent() {
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * The icon to include in the button. See the icon page for the list of icons.
         */
        this.glyph = 'slim-arrow-down';
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * Event sent when is open popover changed
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Event sent when primary button is clicked
         */
        this.primaryButtonClicked = new EventEmitter();
    }
    /**
     *  Handles primary button click
     *  */
    /**
     *  Handles primary button click
     *
     * @param {?} $event
     * @return {?}
     */
    SplitButtonComponent.prototype.buttonClick = /**
     *  Handles primary button click
     *
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
    };
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    SplitButtonComponent.prototype.toggle = /**
     * Toggles the popover open state.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @return {?}
     */
    SplitButtonComponent.prototype.close = /**
     * Closes the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @return {?}
     */
    SplitButtonComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    SplitButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-split-button',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [focusTrapped]=\"focusTrapped\"\n            [closeOnEscapeKey]=\"closeOnEscapeKey\"\n            [closeOnOutsideClick]=\"closeOnOutsideClick\"\n            [disabled]=\"disabled\"\n            [triggers]=\"triggers\"\n            [fillControlMode]=\"fillControlMode\">\n    <fd-popover-control>\n        <div class=\"fd-button-split\">\n            <button fd-button\n                    [fdType]=\"fdType\"\n                    [options]=\"options\"\n                    [compact]=\"compact\"\n                    (click)=\"buttonClick($event)\"\n                    [disabled]=\"disabled\">\n                <ng-container *ngIf=\"titleTemplate\">\n                    <ng-container [fd-split-button-load-action-title]=\"titleTemplate\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"!titleTemplate\">\n                    {{mainActionTitle}}\n                </ng-container>\n            </button>\n            <button fd-button\n                    [attr.aria-expanded]=\"disabled ? false : isOpen\"\n                    [attr.aria-disabled]=\"disabled\"\n                    aria-haspopup=\"true\"\n                    [fdType]=\"fdType\"\n                    [options]=\"options\"\n                    [compact]=\"compact\"\n                    [glyph]=\"glyph\">\n            </button>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body>\n        <ng-content select=\"[fd-split-button-menu]\"></ng-content>\n    </fd-popover-body>\n</fd-popover>\n"
                }] }
    ];
    SplitButtonComponent.propDecorators = {
        titleTemplate: [{ type: ContentChild, args: [SplitButtonActionTitle, { read: TemplateRef },] }],
        triggers: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        focusTrapped: [{ type: Input }],
        compact: [{ type: Input }],
        glyph: [{ type: Input }],
        disabled: [{ type: Input }],
        mainActionTitle: [{ type: Input }],
        fdType: [{ type: Input }],
        options: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        isOpen: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        primaryButtonClicked: [{ type: Output }]
    };
    return SplitButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ButtonModule, PopoverModule],
                    declarations: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle],
                    exports: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle]
                },] }
    ];
    return SplitButtonModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table fd-table></table>
 * ```
 */
var TableDirective = /** @class */ (function () {
    function TableDirective() {
        /**
         * @hidden
         */
        this.fdTableClass = true;
    }
    TableDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-table]'
                },] }
    ];
    TableDirective.propDecorators = {
        fdTableClass: [{ type: HostBinding, args: ['class.fd-table',] }]
    };
    return TableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
var ColumnSortableDirective = /** @class */ (function () {
    function ColumnSortableDirective() {
    }
    ColumnSortableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdColumnSortable]',
                    host: {
                        class: 'fd-table__sort-column',
                        '[class.fd-table__sort-column--dsc]': 'sortDir === "desc" || sortDir === "dsc"',
                        '[class.fd-table__sort-column--asc]': 'sortDir === "asc"'
                    }
                },] }
    ];
    ColumnSortableDirective.propDecorators = {
        sortDir: [{ type: Input }]
    };
    return ColumnSortableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 *     <div fd-table-responsive-wrapper>
 *         <table fd-table>
 *         </table>
 *     </div>
 * ```
 */
var TableResponsiveWrapperDirective = /** @class */ (function () {
    function TableResponsiveWrapperDirective() {
    }
    TableResponsiveWrapperDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-table-responsive-wrapper]',
                    host: {
                        style: 'overflow-x: auto'
                    }
                },] }
    ];
    return TableResponsiveWrapperDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective],
                    exports: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective]
                },] }
    ];
    return TableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive used to identify the template which will populate the tab header.
 * Used to achieve complex headers that require more than a string.
 *
 * ```html
 * <fd-tab>
 *      <ng-template fd-tab-title>
 *          <fd-icon [glyph]="'delete'"></fd-icon>
 *          <span>Tab Label</span>
 *      </ng-template>
 * </fd-tab>
 * ```
 */
var TabTitleDirective = /** @class */ (function () {
    function TabTitleDirective() {
    }
    TabTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-title]'
                },] }
    ];
    return TabTitleDirective;
}());
/**
 * Not for external use. Portal to render the complex title template.
 */
var TabLoadTitleDirective = /** @class */ (function () {
    function TabLoadTitleDirective(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    TabLoadTitleDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    };
    TabLoadTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-load-title]'
                },] }
    ];
    /** @nocollapse */
    TabLoadTitleDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TabLoadTitleDirective.propDecorators = {
        content: [{ type: Input, args: ['fd-tab-load-title',] }]
    };
    return TabLoadTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var tabPanelUniqueId = 0;
/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
var TabPanelComponent = /** @class */ (function () {
    function TabPanelComponent() {
        /**
         * Id of the tab. If none is provided, one will be generated.
         */
        this.id = 'fd-tab-panel' + tabPanelUniqueId++;
        /**
         * @hidden
         */
        this.expanded = false;
    }
    TabPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tab',
                    template: "<ng-container *ngIf=\"expanded\">\n  <ng-content></ng-content>\n</ng-container>\n",
                    host: {
                        role: 'tabpanel',
                        class: 'fd-tabs__panel',
                        '[attr.id]': 'id',
                        '[attr.aria-expanded]': 'expanded ? true : null',
                        '[class.is-expanded]': 'expanded'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    TabPanelComponent.propDecorators = {
        titleTemplate: [{ type: ContentChild, args: [TabTitleDirective, { read: TemplateRef },] }],
        title: [{ type: Input }],
        ariaLabel: [{ type: Input }],
        ariaLabelledBy: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }]
    };
    return TabPanelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that is responsible for providing keyboard actions support
 *
 */
var TabsService = /** @class */ (function () {
    function TabsService() {
        /**
         * Event is thrown always when tab is selected by keyboard actions
         */
        this.tabSelected = new Subject();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    TabsService.prototype.tabHeaderKeyHandler = /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    function (index, event, elements) {
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(elements.length - 1, elements).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < elements.length) {
                    this.getTabLinkFromIndex(index + 1, elements).focus();
                }
                else {
                    this.getTabLinkFromIndex(0, elements).focus();
                }
                break;
            }
            case ('Space'): {
                event.preventDefault();
                this.tabSelected.next(index);
                break;
            }
            case ('Enter'): {
                this.tabSelected.next(index);
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    TabsService.prototype.getTabLinkFromIndex = /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    function (index, elements) {
        return elements[index];
    };
    TabsService.decorators = [
        { type: Injectable }
    ];
    return TabsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents a list of tab-panels.
 */
var TabListComponent = /** @class */ (function () {
    function TabListComponent(tabsService) {
        this.tabsService = tabsService;
        /**
         * Index of the selected tab panel.
         */
        this.selectedIndex = 0;
        /**
         * Event emitted when the selected panel changes.
         */
        this.selectedIndexChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabListComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.selectTab(_this.selectedIndex);
        }));
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index !== _this.selectedIndex) {
                _this.selectTab(index);
            }
        }));
        this._tabsSubscription = this.panelTabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this.isIndexInRange() || _this.isTabContentEmpty()) {
                _this.resetTabHook();
            }
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabListComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._tabsSubscription.unsubscribe();
        this._tabSelectSubscription.unsubscribe();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    TabListComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.selectedIndex) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.selectTab(changes.selectedIndex.currentValue);
            }));
        }
    };
    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    TabListComponent.prototype.selectTab = /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    function (tabIndex) {
        if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.panelTabs.forEach((/**
             * @param {?} tab
             * @param {?} index
             * @return {?}
             */
            function (tab, index) {
                tab.expanded = index === tabIndex;
            }));
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    TabListComponent.prototype.tabHeaderClickHandler = /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    function (tabIndex) {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    TabListComponent.prototype.tabHeaderKeyHandler = /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.nativeElement; })));
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.isIndexInRange = /**
     * @private
     * @return {?}
     */
    function () {
        return this.panelTabs && this.panelTabs.length > 0 && this.selectedIndex < this.panelTabs.length;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    TabListComponent.prototype.isTargetTabEnabled = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return !this.panelTabs.toArray()[index].disabled;
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.isTabContentEmpty = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = true;
        this.panelTabs.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) {
            if (tab.expanded) {
                result = false;
            }
        }));
        return result;
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.resetTabHook = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedIndex = 0;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.selectTab(_this.selectedIndex);
        }));
    };
    TabListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tab-list',
                    template: "<ul class=\"fd-tabs\"\n    role=\"tablist\">\n    <li fd-tab-item\n        *ngFor=\"let tab of panelTabs.toArray(); let i = index;\">\n        <a #tabLink\n           fd-tab-link\n           [disabled]=\"tab.disabled\"\n           [active]=\"tab.expanded\"\n           [attr.tabindex]=\"tab.disabled ? -1 : 0\"\n           [attr.aria-controls]=\"tab.id\"\n           [attr.aria-label]=\"tab.ariaLabel || null\"\n           [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledBy) ? tab.ariaLabelledBy : null\"\n           (keydown)=\"tabHeaderKeyHandler(i, $event)\"\n           (click)=\"tabHeaderClickHandler(i)\">\n\n            <ng-container *ngIf=\"tab.titleTemplate\">\n                <ng-container [fd-tab-load-title]=\"tab.titleTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!tab.titleTemplate\">{{ tab.title }}</ng-container>\n        </a>\n    </li>\n</ul>\n<ng-content select=\"fd-tab\"></ng-content>\n<ng-content></ng-content>\n",
                    host: {
                        class: 'fd-tabs-custom'
                    },
                    encapsulation: ViewEncapsulation.None,
                    providers: [TabsService],
                    styles: [".fd-tabs-custom{display:block}"]
                }] }
    ];
    /** @nocollapse */
    TabListComponent.ctorParameters = function () { return [
        { type: TabsService }
    ]; };
    TabListComponent.propDecorators = {
        panelTabs: [{ type: ContentChildren, args: [TabPanelComponent,] }],
        tabLinks: [{ type: ViewChildren, args: ['tabLink',] }],
        selectedIndex: [{ type: Input }],
        selectedIndexChange: [{ type: Output }]
    };
    return TabListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tab link for nav mode
 *
 * ```html
 * <a fd-tab-link>
 *    link
 * </a>
 * ```
 */
var TabLinkDirective = /** @class */ (function (_super) {
    __extends(TabLinkDirective, _super);
    /** @hidden */
    function TabLinkDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabLinkDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
    };
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
    TabLinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TabLinkDirective.propDecorators = {
        active: [{ type: Input }, { type: HostBinding, args: ['attr.aria-selected',] }],
        disabled: [{ type: Input }, { type: HostBinding, args: ['attr.aria-disabled',] }]
    };
    return TabLinkDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tab Item is optional wrapper for Tab link
 *
 * ```html
 * <div fd-tab-item>
 *    <a fd-tab-link>
 *        link
 *    </a>
 * </div>
 * ```
 */
var TabItemDirective = /** @class */ (function () {
    function TabItemDirective() {
    }
    TabItemDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-item]',
                    host: {
                        'class': 'fd-tabs__item'
                    }
                },] }
    ];
    TabItemDirective.propDecorators = {
        linkItem: [{ type: ContentChild, args: [TabLinkDirective,] }]
    };
    return TabItemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tab Nav for only navigation mode when you want for example use router-outlet
 *
 * ```html
 * <nav fd-tab-nav>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="true">
 *          Link
 *      </a>
 *  </div>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="false">
 *          Link
 *      </a>
 *  </div>
 *  <a fd-tab-link
 *  [active]="false">
 *      Link
 *  </a>
 * </nav>
 * ```
 */
var TabNavDirective = /** @class */ (function () {
    /** @hidden */
    function TabNavDirective(renderer, tabsService) {
        this.renderer = renderer;
        this.tabsService = tabsService;
        /**
         * Event Thrown every time something is clicked
         */
        this.onKeyDown = new EventEmitter();
    }
    Object.defineProperty(TabNavDirective.prototype, "tabLinks", {
        /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
        get: /**
         * Function that gives possibility to get all the link directives, with and without nav__item wrapper
         * @return {?}
         */
        function () {
            /** @type {?} */
            var tabLinks = [];
            if (this.links) {
                tabLinks = tabLinks.concat(this.links.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                function (link) { return link; })));
            }
            if (this.items) {
                tabLinks = tabLinks.concat(this.items.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item.linkItem; })).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.linkItem; })));
            }
            return tabLinks;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabNavDirective.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.selectTab(index);
        }));
        this.tabLinks.forEach((/**
         * @param {?} linkElement
         * @param {?} index
         * @return {?}
         */
        function (linkElement, index) {
            _this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.tabsService.tabHeaderKeyHandler(index, event, _this.tabLinks.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                function (link) { return link.elementRef.nativeElement; })));
            }));
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabNavDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._tabSelectSubscription.unsubscribe();
    };
    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    TabNavDirective.prototype.selectTab = /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    function (tabIndex) {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    };
    TabNavDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-nav]',
                    host: {
                        'class': 'fd-tabs',
                        'role': 'tablist'
                    },
                    providers: [TabsService]
                },] }
    ];
    /** @nocollapse */
    TabNavDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: TabsService }
    ]; };
    TabNavDirective.propDecorators = {
        links: [{ type: ContentChildren, args: [TabLinkDirective,] }],
        items: [{ type: ContentChildren, args: [TabItemDirective,] }],
        onKeyDown: [{ type: Output }]
    };
    return TabNavDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        TabListComponent,
                        TabPanelComponent,
                        TabTitleDirective,
                        TabLoadTitleDirective,
                        TabNavDirective,
                        TabLinkDirective,
                        TabItemDirective
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        TabListComponent,
                        TabPanelComponent,
                        TabTitleDirective,
                        TabLoadTitleDirective,
                        TabNavDirective,
                        TabItemDirective,
                        TabLinkDirective
                    ]
                },] }
    ];
    return TabsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tile is used to display information in a simple container format.
 * ```html
 * <fd-tile>
 *     <fd-tile-content>
 *         <h2 fd-tile-title>Tile Tile</h2>
 *         <p>Tile Description</p>
 *     </fd-tile-content>
 * </fd-tile>
 * ```
 */
var TileComponent = /** @class */ (function (_super) {
    __extends(TileComponent, _super);
    /** @hidden */
    function TileComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the tile is disabled.
         */
        _this.disabled = false;
        /**
         * Whether the tile is rendered as a button.
         */
        _this.isButton = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TileComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
        if (this.rowSpan) {
            this._addClassToElement('fd-has-grid-row-span-' + this.rowSpan);
        }
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
    };
    TileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tile',
                    host: {
                        '[attr.role]': '(this.isButton === true ? \'button\' : \'\')'
                    },
                    template: "<ng-content select=\"[fd-tile-media]\"></ng-content>\n<ng-content select=\"[fd-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    TileComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TileComponent.propDecorators = {
        disabled: [{ type: Input }],
        isButton: [{ type: Input }],
        rowSpan: [{ type: Input }],
        columnSpan: [{ type: Input }],
        colorAccent: [{ type: Input }]
    };
    return TileComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that represents a tile content.
 * ```html
 * <div fd-tile-content>
 *    <h2 fd-tile-title>Tile Tile</h2>
 *    <p>Tile Description</p>
 * </div>
 * ```
 */
var TileContentDirective = /** @class */ (function () {
    function TileContentDirective() {
    }
    TileContentDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-content]',
                    host: {
                        class: 'fd-tile__content'
                    }
                },] }
    ];
    return TileContentDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies the tile title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-tile-title>Tile Title</h1>
 * <h2 fd-tile-title>Tile Title</h2>
 * <h3 fd-tile-title>Tile Title</h3>
 * ```
 */
var TileTitleDirective = /** @class */ (function () {
    function TileTitleDirective() {
        /**
         * @hidden
         */
        this.fdTileTitleClass = true;
    }
    TileTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-title]'
                },] }
    ];
    TileTitleDirective.propDecorators = {
        fdTileTitleClass: [{ type: HostBinding, args: ['class.fd-tile__title',] }]
    };
    return TileTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a tile media container.
 * ```html
 * <div fd-tile-media>
 *      <span fd-identifier
 *            [size]="'m'"
 *            [glyph]="'home'"
 *            [transparent]="true"></span>
 * </div>
 * ```
 */
var TileMediaDirective = /** @class */ (function () {
    function TileMediaDirective() {
    }
    TileMediaDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-media]',
                    host: {
                        class: 'fd-tile__media'
                    }
                },] }
    ];
    return TileMediaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tile level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-tile>
 *    <div fd-tile-actions>
 *        <button fd-button (click)="action()">Action</button>
 *    </div>
 * </fd-tile>
 * ```
 */
var TileActionsDirective = /** @class */ (function () {
    function TileActionsDirective() {
    }
    TileActionsDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-actions]',
                    host: {
                        class: 'fd-tile__actions'
                    }
                },] }
    ];
    return TileActionsDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Product tile is used to display product information.
 * ```html
 * <fd-product-tile>
 *     <fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 *     </fd-product-tile-media>
 *     <fd-product-tile-content>
 *         <h2 fd-product-tile-title>Default Product Tile</h2>
 *     </fd-product-tile-content>
 * </fd-product-tile>
 * ```
 */
var ProductTileComponent = /** @class */ (function (_super) {
    __extends(ProductTileComponent, _super);
    /** @hidden */
    function ProductTileComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the product tile is disabled.
         */
        _this.disabled = false;
        /**
         * Whether the product tile is rendered as a button.
         */
        _this.isButton = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductTileComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    };
    ProductTileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-product-tile',
                    host: {
                        '[attr.role]': '(this.isButton === true ? "button" : "")',
                        '[class.fd-product-tile-custom]': 'true'
                    },
                    template: "<ng-content select=\"[fd-product-tile-media]\"></ng-content>\n<ng-content select=\"[fd-product-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-product-tile-custom {\n            display: block;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    ProductTileComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ProductTileComponent.propDecorators = {
        disabled: [{ type: Input }],
        isButton: [{ type: Input }]
    };
    return ProductTileComponent;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 * </div>
 * ```
 */
var ProductTileMediaDirective = /** @class */ (function (_super) {
    __extends(ProductTileMediaDirective, _super);
    /** @hidden */
    function ProductTileMediaDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductTileMediaDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-product-tile__media');
        if (this.photo) {
            this._addStyleToElement('background-image', 'url(' + this.photo + ')');
        }
    };
    ProductTileMediaDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-product-tile-media]',
                },] }
    ];
    /** @nocollapse */
    ProductTileMediaDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ProductTileMediaDirective.propDecorators = {
        photo: [{ type: Input }]
    };
    return ProductTileMediaDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component that represents a product tile content.
 * ```html
 * <div fd-product-tile-content>
 *    <h2 fd-product-tile-title>Default Product Tile</h2>
 * </div>
 * ```
 */
var ProductTileContentDirective = /** @class */ (function () {
    function ProductTileContentDirective() {
    }
    ProductTileContentDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-product-tile-content]',
                    host: {
                        'class': 'fd-product-tile__content'
                    }
                },] }
    ];
    return ProductTileContentDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that represents a product tile title.
 * ```html
 * <h2 fd-product-tile-title>Default Product Tile</h2>
 * ```
 */
var ProductTileTitleDirective = /** @class */ (function () {
    function ProductTileTitleDirective() {
        /**
         * @hidden
         */
        this.fdProductTileTitleClass = true;
    }
    ProductTileTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-product-tile-title]'
                },] }
    ];
    ProductTileTitleDirective.propDecorators = {
        fdProductTileTitleClass: [{ type: HostBinding, args: ['class.fd-product-tile__title',] }]
    };
    return ProductTileTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that represents a tile grid.
 * A Tile Gird is a collection of fd-tile components in a gird layout.
 * ```html
 * <fd-tile-grid [col]="3">
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 1</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 2</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 * </fd-tile-grid>
 * ```
 */
var TileGridDirective = /** @class */ (function (_super) {
    __extends(TileGridDirective, _super);
    /** @hidden */
    function TileGridDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TileGridDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    };
    TileGridDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-grid]'
                },] }
    ];
    /** @nocollapse */
    TileGridDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TileGridDirective.propDecorators = {
        col: [{ type: Input }]
    };
    return TileGridDirective;
}(AbstractFdNgxClass));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TileModule = /** @class */ (function () {
    function TileModule() {
    }
    TileModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        TileComponent,
                        TileContentDirective,
                        TileTitleDirective,
                        TileMediaDirective,
                        TileActionsDirective,
                        ProductTileComponent,
                        ProductTileMediaDirective,
                        ProductTileContentDirective,
                        ProductTileTitleDirective,
                        TileGridDirective
                    ],
                    declarations: [
                        TileComponent,
                        TileContentDirective,
                        TileTitleDirective,
                        TileMediaDirective,
                        TileActionsDirective,
                        ProductTileComponent,
                        ProductTileMediaDirective,
                        ProductTileContentDirective,
                        ProductTileTitleDirective,
                        TileGridDirective
                    ]
                },] }
    ];
    return TileModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TreeChildComponent = /** @class */ (function () {
    function TreeChildComponent() {
        this.editClicked = new EventEmitter();
        this.deleteClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TreeChildComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hideChildren = false;
    };
    /**
     * @param {?=} hideAll
     * @return {?}
     */
    TreeChildComponent.prototype.toggleDisplayChildren = /**
     * @param {?=} hideAll
     * @return {?}
     */
    function (hideAll) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        }
        else {
            this.hideChildren = !this.hideChildren;
        }
    };
    /**
     * @param {?=} variable
     * @return {?}
     */
    TreeChildComponent.prototype.typeOf = /**
     * @param {?=} variable
     * @return {?}
     */
    function (variable) {
        /** @type {?} */
        var retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        }
        else if (typeof variable === 'object') {
            retVal = 'object';
        }
        return retVal;
    };
    /**
     * @param {?=} row
     * @return {?}
     */
    TreeChildComponent.prototype.editTreeItem = /**
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (row) {
            this.editClicked.emit(row);
        }
    };
    /**
     * @param {?=} row
     * @return {?}
     */
    TreeChildComponent.prototype.deleteTreeItem = /**
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (row) {
            this.deleteClicked.emit(row);
        }
    };
    TreeChildComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tree-child',
                    template: "<li #treeChild\n    class=\"fd-tree__item\"\n    role=\"treeitem\">\n  <div class=\"fd-tree__row\">\n    <div *ngFor=\"let cell of row.rowData; let i = index\"\n         [attr.data-index]=\"i\"\n         class=\"fd-tree__col\"\n         [ngClass]=\"{'fd-tree__col--control': i === 0}\">\n      <button (click)=\"toggleDisplayChildren()\"\n              *ngIf=\"row.children && i === 0\"\n              class=\"fd-tree__control\"\n              aria-label=\"Expand\"\n              [attr.aria-pressed]=\"!hideChildren\"></button>\n      <ng-container *ngIf=\"typeOf(cell) === 'string'\">\n        {{cell}}\n      </ng-container>\n      <ng-container *ngIf=\"typeOf(cell) === 'object'\">\n        <ng-container *ngIf=\"cell.linkUrl\">\n          <ng-container *ngIf=\"cell.displayText\">\n            <!-- link with display text -->\n            <a [attr.href]=\"cell.linkUrl\"\n               class=\"fd-has-font-weight-semi\">{{cell.displayText}}</a>\n          </ng-container>\n          <ng-container *ngIf=\"!cell.displayText\">\n            <!-- link without display text -->\n            <a [attr.href]=\"cell.linkUrl\"\n               class=\"fd-has-font-weight-semi\">{{cell.linkUrl}}</a>\n          </ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!cell.linkUrl\">\n          {{cell.displayText}}\n        </ng-container>\n      </ng-container>\n    </div>\n    <div class=\"fd-tree__col fd-tree__col--actions\">\n      <ng-container *ngIf=\"displayTreeActions\">\n        <fd-popover>\n          <fd-popover-control>\n            <button fd-button\n                    [options]=\"'light'\"\n                    [glyph]=\"'vertical-grip'\"></button>\n          </fd-popover-control>\n          <fd-popover-body>\n            <fd-menu>\n              <ul fd-menu-list>\n                <li fd-menu-item (click)=\"editTreeItem(row)\">Edit</li>\n                <li fd-menu-item (click)=\"deleteTreeItem(row)\">Delete</li>\n              </ul>\n            </fd-menu>\n          </fd-popover-body>\n        </fd-popover>\n      </ng-container>\n    </div>\n  </div>\n  <ul *ngIf=\"row.children && row.children.length > 0\"\n      [ngClass]=\"{'is-hidden': hideChildren}\"\n      class=\"fd-tree__group\"\n      role=\"group\">\n    <fd-tree-child *ngFor=\"let child of row.children\"\n                   [displayTreeActions]=\"displayTreeActions\"\n                   [row]=\"child\"\n                   [ngClass]=\"child.sublevelClass\"></fd-tree-child>\n  </ul>\n</li>\n"
                }] }
    ];
    TreeChildComponent.propDecorators = {
        row: [{ type: Input }],
        hideChildren: [{ type: Input }],
        displayTreeActions: [{ type: Input }],
        editClicked: [{ type: Output }],
        deleteClicked: [{ type: Output }]
    };
    return TreeChildComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TreeComponent = /** @class */ (function () {
    function TreeComponent() {
        this.editRowClicked = new EventEmitter();
        this.deleteRowClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hideAll = false;
    };
    /**
     * @return {?}
     */
    TreeComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                _this.getChildDepth(row, 0);
                _this.handleEmptyTrailingCells(row); // handle empty cells for parents
            }));
        }
    };
    /**
     * @return {?}
     */
    TreeComponent.prototype.toggleDisplayAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            child.toggleDisplayChildren(_this.hideAll);
        }));
    };
    /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    TreeComponent.prototype.getChildDepth = /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    function (row, depth) {
        var _this = this;
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this.getChildDepth(child, depth + 1);
                _this.handleEmptyTrailingCells(child); // handle empty cells for children
            }));
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.handleEmptyTrailingCells = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] !== 'object' &&
            this.headers &&
            this.headers.length) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push('');
            }
        }
        else if (row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] === 'object' &&
            this.headers &&
            this.headers.length) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push({
                    displayText: ''
                });
            }
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.editClicked = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.editRowClicked.emit(row);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.deleteClicked = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.deleteRowClicked.emit(row);
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tree',
                    template: "<div class=\"fd-tree fd-tree--header\"\n     *ngIf=\"headers.length > 0\">\n  <div class=\"fd-tree__row fd-tree__row--header\">\n    <div class=\"fd-tree__col fd-tree__col--control\">\n      <button (click)=\"toggleDisplayAll()\"\n              class=\"fd-tree__control\"\n              aria-label=\"Expand all\"\n              [attr.aria-pressed]=\"!hideAll\"></button>\n      {{headers[0]}}\n    </div>\n    <div class=\"fd-tree__col\"\n         *ngFor=\"let header of headers | slice:1\">\n      {{header}}\n    </div>\n    <div class=\"fd-tree__col fd-tree__col--actions\"></div>\n  </div>\n</div>\n<ul class=\"fd-tree\"\n    id=\"ENusD653\"\n    role=\"tree\">\n  <fd-tree-child (editClicked)=\"editClicked($event)\"\n                 (deleteClicked)=\"deleteClicked($event)\"\n                 [displayTreeActions]=\"displayTreeActions\"\n                 *ngFor=\"let row of treeData\"\n                 [row]=\"row\"></fd-tree-child>\n</ul>"
                }] }
    ];
    TreeComponent.propDecorators = {
        headers: [{ type: Input }],
        treeData: [{ type: Input }],
        hideAll: [{ type: Input }],
        displayTreeActions: [{ type: Input }],
        editRowClicked: [{ type: Output }],
        deleteRowClicked: [{ type: Output }],
        treeChildren: [{ type: ViewChildren, args: [TreeChildComponent,] }]
    };
    return TreeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TreeModule = /** @class */ (function () {
    function TreeModule() {
    }
    TreeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TreeComponent, TreeChildComponent],
                    imports: [CommonModule, ButtonModule, IconModule, PopoverModule, MenuModule],
                    exports: [TreeComponent, TreeChildComponent]
                },] }
    ];
    return TreeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function TIME_FORMAT_FACTORY() {
    return new TimeFormatParserDefault();
}
/**
 * Abstract class which defines the behaviour of the time format and parser.
 * @abstract
 */
var TimeFormatParser = /** @class */ (function () {
    function TimeFormatParser() {
    }
    TimeFormatParser.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: TIME_FORMAT_FACTORY
                },] }
    ];
    /** @nocollapse */ TimeFormatParser.ngInjectableDef = defineInjectable({ factory: TIME_FORMAT_FACTORY, token: TimeFormatParser, providedIn: "root" });
    return TimeFormatParser;
}());
/**
 * Default implementation of the DateFormatParser service.
 */
var TimeFormatParserDefault = /** @class */ (function (_super) {
    __extends(TimeFormatParserDefault, _super);
    function TimeFormatParserDefault() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param value String to convert to a time object.
     * @param meridian boolean to define if string should be treated as a meridian.
     * @param displaySeconds boolean to define if string should display seconds.
     */
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParserDefault.prototype.parse = /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    function (value, displaySeconds, meridian) {
        if (displaySeconds === void 0) { displaySeconds = true; }
        /** @type {?} */
        var time = new TimeObject();
        /** @type {?} */
        var regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                var splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            }
            else {
                return null;
            }
        }
        else if (meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9]) [APap][mM]$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]) [APap][mM]$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                var period = value.split(' ')[1];
                /** @type {?} */
                var splitString = value.split(':');
                time.hour = parseInt(splitString[0], 10);
                if ((period === 'pm' || period === 'PM') && time.hour < 12) {
                    time.hour = time.hour + 12;
                }
                else if ((period === 'am' || period === 'AM') && time.hour === 12) {
                    time.hour = 0;
                }
                time.minute = parseInt(splitString[1], 10);
                if (displaySeconds) {
                    time.second = parseInt(splitString[2], 10);
                }
                return time;
            }
            else {
                return null;
            }
        }
    };
    /**
     * Takes in a time object and returns the string representation.
     * @param time TimeObject to convert to a string.
     * @param meridian boolean to define if TimeObject should be treated as a meridian.
     */
    /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    TimeFormatParserDefault.prototype.format = /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    function (time, meridian) {
        /** @type {?} */
        var formattedHour;
        /** @type {?} */
        var formattedMinute;
        /** @type {?} */
        var formattedSecond;
        /** @type {?} */
        var formattedTime;
        /** @type {?} */
        var formattedMeridian;
        if (time.hour !== null) {
            if (meridian) {
                if (time.hour === 0) {
                    formattedHour = 12;
                    formattedMeridian = 'am';
                }
                else if (time.hour > 12) {
                    formattedHour = time.hour - 12;
                    formattedMeridian = 'pm';
                }
                else if (time.hour === 12) {
                    formattedHour = 12;
                    formattedMeridian = 'pm';
                }
                else {
                    formattedHour = time.hour;
                    formattedMeridian = 'am';
                }
            }
            else {
                formattedHour = time.hour;
            }
        }
        if (time.minute !== null) {
            formattedMinute = time.minute < 10 ? '0' + time.minute : time.minute;
        }
        if (time.second !== null) {
            formattedSecond = time.second < 10 ? '0' + time.second : time.second;
        }
        if (formattedHour || formattedHour === 0) {
            formattedTime = formattedHour;
            if (formattedMinute || formattedMinute === '00') {
                formattedTime = formattedTime + ':' + formattedMinute;
                if (formattedSecond || formattedSecond === '00') {
                    formattedTime = formattedTime + ':' + formattedSecond;
                }
            }
        }
        if (formattedMeridian && formattedTime) {
            formattedTime += ' ' + formattedMeridian;
        }
        return formattedTime;
    };
    TimeFormatParserDefault.decorators = [
        { type: Injectable }
    ];
    return TimeFormatParserDefault;
}(TimeFormatParser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimePickerComponent = /** @class */ (function () {
    /** @hidden */
    function TimePickerComponent(cd, timeAdapter) {
        this.cd = cd;
        this.timeAdapter = timeAdapter;
        /**
         * @hidden
         */
        this.timepickerclass = true;
        /**
         * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
         * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
         *
         * ```json
         * { hour: 12, minute: 0, second: 0 }
         * ```
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * \@Input Uses compact time picker.
         */
        this.compact = false;
        /**
         * \@Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
         * and does not display a period control.
         */
        this.meridian = false;
        /**
         * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
         */
        this.spinners = true;
        /**
         * \@Input When set to false, hides the input for seconds.
         */
        this.displaySeconds = true;
        /**
         * \@Input When set to false, hides the input for minutes.
         */
        this.displayMinutes = true;
        /**
         * \@Input When set to false, hides the input for hours.
         */
        this.displayHours = true;
        /**
         * Whether to perform visual validation on the picker input.
         */
        this.validate = true;
        /**
         * Aria label for the time picker input.
         */
        this.timePickerInputLabel = 'Time picker input';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * @hidden Whether the input time is valid. Internal use.
         */
        this.isInvalidTimeInput = false;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.placeholder = this.getPlaceholder();
    };
    /**
     * Returns the current value of the time input.
     */
    /**
     * Returns the current value of the time input.
     * @return {?}
     */
    TimePickerComponent.prototype.getTime = /**
     * Returns the current value of the time input.
     * @return {?}
     */
    function () {
        return this.time;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.getFormattedTime = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var formattedTime = this.timeAdapter.format(this.time, this.meridian);
        return formattedTime !== undefined ? formattedTime : '';
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    TimePickerComponent.prototype.timeInputChanged = /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    function (timeFromInput) {
        /** @type {?} */
        var time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.meridian);
        if (time) {
            this.isInvalidTimeInput = false;
            this.child.setDisplayedHour();
            this.time = Object.assign(this.time, time);
            this.onChange(time);
        }
        else {
            if (this.allowNull && timeFromInput === '') {
                this.isInvalidTimeInput = false;
                this.child.setDisplayedHour();
                this.onChange({ hour: null, minutes: null, seconds: null });
            }
            else {
                this.isInvalidTimeInput = true;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    TimePickerComponent.prototype.inputGroupClicked = /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.onFocusHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.addOnButtonClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.popoverClosed = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.isOpen = false;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.getPlaceholder = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var retVal;
        if (this.displaySeconds) {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss am/pm';
            }
            else {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss';
            }
        }
        else {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ' am/pm';
            }
            else {
                retVal = 'hh' + ':' + 'mm';
            }
        }
        return retVal;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TimePickerComponent.prototype.timeFromTimeComponentChanged = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.cd.detectChanges();
        this.onChange(this.time);
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimePickerComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    TimePickerComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    TimePickerComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (!time) {
            return;
        }
        this.time = time;
    };
    TimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-time-picker',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [triggers]=\"[]\">\n    <fd-popover-control>\n        <!--fd-input-group *ngIf=\"!meridian\" (timeInputChanged)=\"timeInputChanged($event)\" [type]=\"'time'\"\n                        [placement]=\"'after'\" [button]=\"true\" (click)=\"inputGroupClicked($event)\" [glyph]=\"'fob-watch'\"\n                        [placeholder]=\"getPlaceholder()\" [inputText]=\"getFormattedTime()\" [disabled]=\"disabled\"\n                        (addOnButtonClicked)=\"addOnButtonClicked($event)\"></fd-input-group>\n        <fd-input-group *ngIf=\"meridian\" (timeInputChanged)=\"timeInputChanged($event)\" [type]=\"'time'\"\n                        [placement]=\"'after'\" [button]=\"true\" (click)=\"inputGroupClicked($event)\" [glyph]=\"'fob-watch'\"\n                        [placeholder]=\"getPlaceholder()\" [inputText]=\"getFormattedTime()\" [disabled]=\"disabled\"\n                        (addOnButtonClicked)=\"addOnButtonClicked($event)\"></fd-input-group-->\n        <div class=\"fd-input-group fd-input-group--after\"\n             [ngClass]=\"{'fd-input-group--compact' : compact}\">\n            <input [value]=\"getFormattedTime()\"\n                   (keyup)=\"timeInputChanged($event.currentTarget.value)\"\n                   (focus)=\"onFocusHandler()\"\n                   (click)=\"inputGroupClicked($event)\"\n                   [disabled]=\"disabled\"\n                   type=\"text\"\n                   [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidTimeInput && validate }\"\n                   [placeholder]=\"placeholder\"\n                   [attr.aria-label]=\"timePickerInputLabel\">\n            <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after\">\n          <button [disabled]=\"disabled\" type=\"button\"\n                  [ngClass]=\"{ 'fd-button--compact' : compact }\" (click)=\"addOnButtonClicked()\"\n                  class=\"fd-button--icon fd-button--light sap-icon--fob-watch\"></button>\n        </span>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displaySeconds || displayMinutes || displayHours\">\n        <fd-time [disabled]=\"disabled\"\n                 [meridian]=\"meridian\"\n                 [(ngModel)]=\"time\"\n                 (ngModelChange)=\"timeFromTimeComponentChanged()\"\n                 [spinners]=\"spinners\"\n                 [displayMinutes]=\"displayMinutes\"\n                 [displaySeconds]=\"displaySeconds\"\n                 [displayHours]=\"displayHours\"></fd-time>\n    </fd-popover-body>\n</fd-popover>\n",
                    host: {
                        '(blur)': 'onTouched()',
                        class: 'fd-timepicker-custom'
                    },
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return TimePickerComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-timepicker-custom{display:inline-block}.fd-timepicker-custom fd-popover{display:block}.fd-timepicker-custom fd-time{width:auto}"]
                }] }
    ];
    /** @nocollapse */
    TimePickerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: TimeFormatParser }
    ]; };
    TimePickerComponent.propDecorators = {
        timepickerclass: [{ type: HostBinding, args: ['class.fd-time-picker',] }],
        time: [{ type: Input }],
        compact: [{ type: Input }],
        meridian: [{ type: Input }],
        disabled: [{ type: Input }],
        spinners: [{ type: Input }],
        displaySeconds: [{ type: Input }],
        displayMinutes: [{ type: Input }],
        displayHours: [{ type: Input }],
        validate: [{ type: Input }],
        timePickerInputLabel: [{ type: Input }],
        allowNull: [{ type: Input }],
        child: [{ type: ViewChild, args: [TimeComponent,] }]
    };
    return TimePickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimePickerModule = /** @class */ (function () {
    function TimePickerModule() {
    }
    TimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TimePickerComponent],
                    imports: [CommonModule, FormsModule, PopoverModule, InputGroupModule, TimeModule],
                    exports: [TimePickerComponent]
                },] }
    ];
    return TimePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var toggleUniqueId = 0;
/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
        /**
         * Whether the toggle is disabled.
         */
        this.disabled = false;
        /**
         * Id for the toggle component. If omitted, a unique one is generated.
         */
        this.id = 'fd-toggle-' + toggleUniqueId++;
        /**
         * Whether the toggle is checked.
         */
        this.checked = false;
        /**
         * aria-label attribute of the inner input element.
         */
        this.ariaLabel = null;
        /**
         * aria-labelledby attribute of the inner input element.
         */
        this.ariaLabelledby = null;
        /**
         * Event fired when the state of the toggle changes.
         * *$event* can be used to retrieve the new state of the toggle.
         */
        this.checkedChange = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ToggleComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    };
    /** Set focus on the input element. */
    /**
     * Set focus on the input element.
     * @return {?}
     */
    ToggleComponent.prototype.focus = /**
     * Set focus on the input element.
     * @return {?}
     */
    function () {
        this.inputElement.nativeElement.focus();
    };
    Object.defineProperty(ToggleComponent.prototype, "innerInputId", {
        /** Get the id of the inner input element of the toggle. */
        get: /**
         * Get the id of the inner input element of the toggle.
         * @return {?}
         */
        function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleComponent.prototype, "isChecked", {
        /** Get the isChecked property of the toggle. */
        get: /**
         * Get the isChecked property of the toggle.
         * @return {?}
         */
        function () {
            return this.checked;
        },
        /** Set the isChecked property of the toggle. */
        set: /**
         * Set the isChecked property of the toggle.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.checked = value;
            this.onChange(value);
            this.onTouched();
            this.checkedChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the toggle.
     */
    /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    function (value) {
        this.checked = value;
    };
    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the toggle.
     */
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the toggle.
     */
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the toggle.
     */
    /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-toggle',
                    template: "<label class=\"fd-form__label\" [attr.for]=\"innerInputId\">\n    <span class=\"fd-toggle fd-form__control\" [ngClass]=\"(this.size ? ('fd-toggle--' + this.size) : '')\">\n        <input #input\n               type=\"checkbox\"\n               [id]=\"innerInputId\"\n               [disabled]=\"this.disabled\"\n               [attr.aria-checked]=\"checked\"\n               [attr.aria-label]=\"this.ariaLabel\"\n               [attr.aria-labelledby]=\"this.ariaLabelledby\"\n               [(ngModel)]=\"this.isChecked\">\n        <span class=\"fd-toggle__switch\" role=\"presentation\"></span>\n    </span>\n    <ng-content></ng-content>\n</label>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ToggleComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'fd-form__item fd-form__item--check fd-toggle-custom',
                        '[attr.id]': 'id',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-toggle-custom{display:block}"]
                }] }
    ];
    ToggleComponent.propDecorators = {
        inputElement: [{ type: ViewChild, args: ['input',] }],
        size: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }],
        checked: [{ type: Input }],
        ariaLabel: [{ type: Input }],
        ariaLabelledby: [{ type: Input }],
        checkedChange: [{ type: Output }]
    };
    return ToggleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ToggleModule = /** @class */ (function () {
    function ToggleModule() {
    }
    ToggleModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ToggleComponent],
                    imports: [CommonModule, FormsModule],
                    exports: [ToggleComponent]
                },] }
    ];
    return ToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive which is used along with input elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
var LocalizationEditorInputDirective = /** @class */ (function () {
    function LocalizationEditorInputDirective() {
    }
    LocalizationEditorInputDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-input]'
                },] }
    ];
    LocalizationEditorInputDirective.propDecorators = {
        compact: [{ type: HostBinding, args: ['class.fd-input--compact',] }]
    };
    return LocalizationEditorInputDirective;
}());
/**
 * Directive which is used along with textarea elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
var LocalizationEditorTextareaDirective = /** @class */ (function () {
    function LocalizationEditorTextareaDirective() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorTextareaClass = true;
    }
    LocalizationEditorTextareaDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-textarea]',
                },] }
    ];
    LocalizationEditorTextareaDirective.propDecorators = {
        compact: [{ type: HostBinding, args: ['class.fd-input--compact',] }],
        fdLocalizationEditorTextareaClass: [{ type: HostBinding, args: ['class.fd-localization-editor-textarea',] }]
    };
    return LocalizationEditorTextareaDirective;
}());
/**
 * Directive which is used to add complex content, which will be displayed in the add-on space.
 *  ```html
 *  <fd-localization-editor-item>
 *      <ng-template fd-localization-editor-label>
 *          <fd-icon [glyph]="field.glyph"></fd-icon>
 *      </ng-template>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 *
 */
var LocalizationEditorLabel = /** @class */ (function () {
    function LocalizationEditorLabel() {
    }
    LocalizationEditorLabel.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-label]',
                },] }
    ];
    return LocalizationEditorLabel;
}());
/**
 * Directive that is used to wrap whole localization field inside li element.
 *  ```html
 *  <li fd-localization-editor-element>
 *      <fd-localization-editor-item>
 *          <textarea fd-localization-editor-input placeholder="EN">
 *      </fd-localization-editor-item>
 *  </li>
 *  ```
 *
 */
var LocalizationEditorElement = /** @class */ (function () {
    function LocalizationEditorElement() {
    }
    LocalizationEditorElement.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-element]',
                },] }
    ];
    return LocalizationEditorElement;
}());
/**
 * Not for external use. Portal to render the complex title template.
 */
var LocalizationEditorLoadLabel = /** @class */ (function () {
    /** @hidden */
    function LocalizationEditorLoadLabel(viewRef) {
        this.viewRef = viewRef;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    LocalizationEditorLoadLabel.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    };
    LocalizationEditorLoadLabel.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-localization-editor-load-label]'
                },] }
    ];
    /** @nocollapse */
    LocalizationEditorLoadLabel.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    LocalizationEditorLoadLabel.propDecorators = {
        content: [{ type: Input, args: ['fd-localization-editor-load-label',] }]
    };
    return LocalizationEditorLoadLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Component that represents field with add-on.
 *  ```html
 *  <fd-localization-editor-item [label]="'EN'">
 *      <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
var LocalizationEditorItemComponent = /** @class */ (function () {
    function LocalizationEditorItemComponent() {
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    LocalizationEditorItemComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.refreshChildInput();
    };
    /**
     * @return {?}
     */
    LocalizationEditorItemComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.refreshChildInput();
    };
    /**
     * @return {?}
     */
    LocalizationEditorItemComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (this.textarea) {
            this.type = 'textarea';
        }
    };
    /**
     * @private
     * @return {?}
     */
    LocalizationEditorItemComponent.prototype.refreshChildInput = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.input) {
            this.input.compact = this.compact;
        }
        if (this.textarea) {
            this.textarea.compact = this.compact;
        }
    };
    LocalizationEditorItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-localization-editor-item',
                    template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\">\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <ng-container *ngIf=\"labelTemplate\">\n            <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!labelTemplate\">\n            {{label}}\n        </ng-container>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    LocalizationEditorItemComponent.propDecorators = {
        label: [{ type: Input }],
        compact: [{ type: Input }],
        input: [{ type: ContentChild, args: [LocalizationEditorInputDirective,] }],
        textarea: [{ type: ContentChild, args: [LocalizationEditorTextareaDirective,] }],
        labelTemplate: [{ type: ContentChild, args: [LocalizationEditorLabel, { read: TemplateRef },] }]
    };
    return LocalizationEditorItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Component that represents the field which is always visible and is rendered outside the popover.
 *  ```html
 *  <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *  </fd-localization-editor-main>
 *  ```
 */
var LocalizationEditorMainComponent = /** @class */ (function (_super) {
    __extends(LocalizationEditorMainComponent, _super);
    function LocalizationEditorMainComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalizationEditorMainComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-localization-editor-main',
                    template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\"\n>\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <button class=\"fd-button--light fd-localization-editor__button\" aria-haspopup=\"true\"\n                [attr.aria-expanded]=\"expanded\">\n            <ng-container *ngIf=\"labelTemplate\">\n                <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!labelTemplate\">\n                {{label}}\n            </ng-container>\n        </button>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return LocalizationEditorMainComponent;
}(LocalizationEditorItemComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  The component that represents a list of fields with add-ons inside popover
 *  ```html
 * <fd-localization-editor>
 *    <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *    </fd-localization-editor-main>
 *    <fd-localization-editor-item [label]="'DE'">
 *       <input fd-localization-editor-input type="text" placeholder="DE">
 *    </fd-localization-editor-item>
 * </fd-localization-editor>
 *  ```
 */
var LocalizationEditorComponent = /** @class */ (function () {
    function LocalizationEditorComponent() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorClass = true;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Whether the inputs are in compact mode.
         */
        this.compact = false;
    }
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.toggle = /**
     * Toggles the popover open state.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.close = /**
     * Closes the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @return {?}
     */
    LocalizationEditorComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     */
    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     * @param {?} opened
     * @return {?}
     */
    LocalizationEditorComponent.prototype.handleOpenChange = /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     * @param {?} opened
     * @return {?}
     */
    function (opened) {
        if (this.mainElement) {
            this.mainElement.expanded = opened;
        }
    };
    LocalizationEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-localization-editor',
                    template: "<fd-popover\n    [isOpen]=\"isOpen\" [fillControlMode]=\"'equal'\" (isOpenChange)=\"handleOpenChange($event)\"\n    [closeOnEscapeKey]=\"closeOnEscapeKey\" [closeOnOutsideClick]=\"closeOnOutsideClick\"\n    [disabled]=\"disabled\" [triggers]=\"triggers\" [placement]=\"placement\">\n    <fd-popover-control>\n        <ng-content select=\"fd-localization-editor-main\"></ng-content>\n    </fd-popover-control>\n    <fd-popover-body>\n        <fd-menu>\n            <ul fd-menu-list class=\"fd-localization-editor__list\">\n                <ng-content select=\"[fd-localization-editor-element]\"></ng-content>\n                <ng-content></ng-content>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-localization-editor-textarea{min-height:calc(var(--fd-button-line-height) + 4px)}"]
                }] }
    ];
    LocalizationEditorComponent.propDecorators = {
        fdLocalizationEditorClass: [{ type: HostBinding, args: ['class.fd-localization-editor',] }],
        mainElement: [{ type: ContentChild, args: [LocalizationEditorMainComponent,] }],
        triggers: [{ type: Input }],
        placement: [{ type: Input }],
        isOpen: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        disabled: [{ type: Input }],
        compact: [{ type: Input }]
    };
    return LocalizationEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocalizationEditorModule = /** @class */ (function () {
    function LocalizationEditorModule() {
    }
    LocalizationEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LocalizationEditorComponent,
                        LocalizationEditorMainComponent,
                        LocalizationEditorItemComponent,
                        LocalizationEditorInputDirective,
                        LocalizationEditorLabel,
                        LocalizationEditorLoadLabel,
                        LocalizationEditorTextareaDirective,
                        LocalizationEditorElement
                    ],
                    exports: [
                        LocalizationEditorComponent,
                        LocalizationEditorItemComponent,
                        LocalizationEditorMainComponent,
                        LocalizationEditorInputDirective,
                        LocalizationEditorLabel,
                        LocalizationEditorLoadLabel,
                        LocalizationEditorTextareaDirective,
                        LocalizationEditorElement
                    ],
                    imports: [CommonModule, PopoverModule, FormModule, InputGroupModule, MenuModule]
                },] }
    ];
    return LocalizationEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Component represents mega menu element, which contains list with menu items, links, sublists, subitems and sublinks..
 *  ```html
 *  <fd-mega-menu>
 *      <ul fd-mega-menu-list>
 *          <fd-mega-menu-item>
 *              <a fd-mega-menu-link>Item 0</a>
 *              <li fd-mega-menu-subitem>
 *                 <a fd-mega-menu-sublink>Sub Item 1</a>
 *            </li>
 *              <li fd-mega-menu-subitem>
 *                <a fd-mega-menu-sublink>Sub Item 2</a>
 *           </li>
 *             <li fd-mega-menu-subitem>
 *                  <a fd-mega-menu-sublink>Sub Item 3</a>
 *             </li>
 *          </fd-mega-menu-item>
 *      </ul>
 *  </fd-mega-menu>
 *  ```
 *
 */
var MegaMenuComponent = /** @class */ (function () {
    function MegaMenuComponent() {
    }
    MegaMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu',
                    template: "<nav class=\"fd-mega-menu\">\n    <ng-content></ng-content>\n</nav>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [""]
                }] }
    ];
    return MegaMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Directive represents mega menu sub link.
 *  ```html
 * <a fd-mega-menu-sublink href="#">Link</a>
 *  ```
 *
 */
var MegaMenuSublinkDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuSublinkDirective(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
    }
    /**
     * @return {?}
     */
    MegaMenuSublinkDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MegaMenuSublinkDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
    MegaMenuSublinkDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-mega-menu-sublink]',
                    host: {
                        'tabindex': '0'
                    }
                },] }
    ];
    /** @nocollapse */
    MegaMenuSublinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MegaMenuSublinkDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__sublink',] }]
    };
    return MegaMenuSublinkDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Directive represents mega menu subitem, which can contain sublink.
 *  ```html
 * <li fd-mega-menu-subitem>
 *      <a fd-mega-menu-sublink>Sub Item 2</a>
 * </li>
 *  ```
 *
 */
var MegaMenuSubitemDirective = /** @class */ (function () {
    function MegaMenuSubitemDirective() {
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         *
         */
        this.keyDown = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MegaMenuSubitemDirective.prototype.handleKeyboardEvent = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyDown.emit(event);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuSubitemDirective.prototype.focus = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.focus();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuSubitemDirective.prototype.click = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.click();
    };
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
    return MegaMenuSubitemDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Directive represents mega menu link.
 *  ```html
 * <a fd-mega-menu-link href="#">Link</a>
 *  ```
 *
 */
var MegaMenuLinkDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuLinkDirective(itemEl) {
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
    MegaMenuLinkDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MegaMenuLinkDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
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
    MegaMenuLinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MegaMenuLinkDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__link',] }],
        hasChild: [{ type: Input }, { type: HostBinding, args: ['class.has-child',] }, { type: HostBinding, args: ['attr.aria-haspopup',] }],
        isExpanded: [{ type: Input }, { type: HostBinding, args: ['attr.aria-expanded',] }]
    };
    return MegaMenuLinkDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Component represents mega menu item, which contains subitems and link.
 *  ```html
 *  <fd-mega-menu-item>
 *      <a fd-mega-menu-link>Item 0</a>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 1</a>
 *      </li>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 2</a>
 *      </li>
 *      <li fd-mega-menu-subitem>
 *          <a fd-mega-menu-sublink>Sub Item 3</a>
 *      </li>
 *  </fd-mega-menu-item>
 *  ```
 *
 */
var MegaMenuItemComponent = /** @class */ (function () {
    /** @hidden */
    function MegaMenuItemComponent(elRef, menuKeyboardService, changeDetectionRef) {
        this.elRef = elRef;
        this.menuKeyboardService = menuKeyboardService;
        this.changeDetectionRef = changeDetectionRef;
        /**
         * Event thrown, when there is some keyboard event detected on mega menu item
         */
        this.keyDown = new EventEmitter();
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
        /**
         * Variable that specifies if the sublist menu is opened.
         */
        this.open = false;
        /**
         * Defines what should be position for sublist
         */
        this.subListPosition = 'right';
        /**
         * Event that is thrown always, when the open variable is changed
         */
        this.openChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MegaMenuItemComponent.prototype.handleKeyboardEvent = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.code) {
            case ('ArrowLeft'): {
                this.closeSubList();
                this.link.focus();
                break;
            }
            case ('ArrowRight'):
            case ('Space'):
            case ('Enter'): {
                this.openSubList();
                this.changeDetectionRef.detectChanges();
                if (this.subItems.first) {
                    this.subItems.first.focus();
                }
                event.preventDefault();
                break;
            }
            default: {
                this.keyDown.emit(event);
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MegaMenuItemComponent.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** Check if click wasn't inside the component, then close. */
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closeSubList();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.open && this.isSubListPositionRight()) {
            this.changeDetectionRef.detectChanges();
            /** @type {?} */
            var distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            /**
             * When the page is resized and the menu sub list goes beyond the page,
             * the sub list should go over the parent list
             */
            while (distanceFromCorner > window.innerWidth && this.getLeftPropertyFromSubList() > 1) {
                this.subList.nativeElement.style.left = (this.getLeftPropertyFromSubList() - 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }
            /**
             * When the page is resized and the menu sub list was pulled over parent list,
             * the sub list should go to right side of parent list
             */
            while (distanceFromCorner < window.innerWidth && this.getLeftPropertyFromSubList() < 100) {
                this.subList.nativeElement.style.left = (this.getLeftPropertyFromSubList() + 1) + '%';
                this.changeDetectionRef.detectChanges();
                distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.link.hasChild = this.subItems.length > 0;
        this.subItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) { return item.keyDown
            .pipe(takeUntil(_this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        function (keyboardEvent) { return _this.handleSubListKeyDown(keyboardEvent, index); })); }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     */
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    MegaMenuItemComponent.prototype.handleSubListKeyDown = /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.subItems.toArray());
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.stopPropagation();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.click = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.click();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuItemComponent.prototype.focus = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.link.focus();
    };
    /** Method that informs if actual position of sublist is set to right */
    /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    MegaMenuItemComponent.prototype.isSubListPositionRight = /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    function () {
        return this.subListPosition === 'right';
    };
    /** Method that changes state of open variable */
    /**
     * Method that changes state of open variable
     * @return {?}
     */
    MegaMenuItemComponent.prototype.toggleOpen = /**
     * Method that changes state of open variable
     * @return {?}
     */
    function () {
        if (this.open) {
            this.closeSubList();
        }
        else {
            this.openSubList();
        }
    };
    /** Method that closes sublist */
    /**
     * Method that closes sublist
     * @return {?}
     */
    MegaMenuItemComponent.prototype.closeSubList = /**
     * Method that closes sublist
     * @return {?}
     */
    function () {
        this.open = false;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
    };
    /** Method that opens sublist */
    /**
     * Method that opens sublist
     * @return {?}
     */
    MegaMenuItemComponent.prototype.openSubList = /**
     * Method that opens sublist
     * @return {?}
     */
    function () {
        this.open = true;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
        this.onResize();
    };
    /** Method that gives information if the sublist should behave like it is opened. */
    /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    MegaMenuItemComponent.prototype.isShow = /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    function () {
        return this.open && this.subItems.length > 0;
    };
    /** Method that helps with the responsive support. Gives percentage number of left css attribute on list. */
    /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    MegaMenuItemComponent.prototype.getLeftPropertyFromSubList = /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var styles = getComputedStyle(this.subList.nativeElement);
        if (styles.left) {
            if (styles.left.includes('px')) {
                return Number(styles.left.split('px')[0]) / this.parentElement.nativeElement.offsetWidth * 100;
            }
            else if (styles.left.includes('%')) {
                return Number(styles.left.split('%')[0]);
            }
        }
        else {
            return 100;
        }
    };
    MegaMenuItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu-item',
                    template: "<li class=\"fd-mega-menu__item\" (click)=\"toggleOpen()\" #parentElement>\n    <ng-content select=\"[fd-mega-menu-link]\"></ng-content>\n    <ng-content></ng-content>\n    <ul class=\"fd-mega-menu__sublist\"\n        #subList\n        [attr.aria-hidden]=\"!isShow()\"\n        [ngClass]=\"{'fd-mega-menu__sublist--left': !isSubListPositionRight()}\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-content select=\"[fd-mega-menu-subitem]\"></ng-content>\n    </ul>\n</li>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-mega-menu__sublist{right:initial;left:100%;z-index:2;margin-top:4px}.fd-mega-menu__sublist--left{right:100%;left:initial}.fd-mega-menu__item{cursor:pointer}.fd-mega-menu__item .fd-mega-menu__link{position:relative}.fd-mega-menu__item .fd-mega-menu__link:focus{z-index:1}ul.fd-mega-menu__sublist{margin-left:-4px}"]
                }] }
    ];
    /** @nocollapse */
    MegaMenuItemComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MenuKeyboardService },
        { type: ChangeDetectorRef }
    ]; };
    MegaMenuItemComponent.propDecorators = {
        subItems: [{ type: ContentChildren, args: [MegaMenuSubitemDirective,] }],
        link: [{ type: ContentChild, args: [MegaMenuLinkDirective,] }],
        subList: [{ type: ViewChild, args: ['subList',] }],
        parentElement: [{ type: ViewChild, args: ['parentElement',] }],
        keyDown: [{ type: Output }],
        open: [{ type: Input }],
        subListPosition: [{ type: Input }],
        openChange: [{ type: Output }],
        handleKeyboardEvent: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }],
        onResize: [{ type: HostListener, args: ['window:resize',] }]
    };
    return MegaMenuItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Directive represents mega menu list, which contains items.
 *  ```html
 *  <ul fd-mega-menu-list>
 *      <fd-mega-menu-item>
 *          <a fd-mega-menu-link>Item 0</a>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 1</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 2</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 3</a>
 *          </li>
 *      </fd-mega-menu-item>
 *  </ul>
 *  ```
 *
 */
var MegaMenuListDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuListDirective(menuKeyboardService) {
        this.menuKeyboardService = menuKeyboardService;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuListDirective.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.items.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) { return item.keyDown
            .pipe(takeUntil(_this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        function (keyboardEvent) { return _this.handleListKeyDown(keyboardEvent, index); })); }));
    };
    /** Method that provides handles keydown events from menu item list */
    /**
     * Method that provides handles keydown events from menu item list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    MegaMenuListDirective.prototype.handleListKeyDown = /**
     * Method that provides handles keydown events from menu item list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.items.toArray());
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuListDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    MegaMenuListDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-mega-menu-list]'
                },] }
    ];
    /** @nocollapse */
    MegaMenuListDirective.ctorParameters = function () { return [
        { type: MenuKeyboardService }
    ]; };
    MegaMenuListDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__list',] }],
        items: [{ type: ContentChildren, args: [MegaMenuItemComponent,] }]
    };
    return MegaMenuListDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  Component represents mega menu group, which contains list with menu items.
 *  ```html
 *  <fd-mega-menu-group>
 *      <h3 fd-mega-menu-title>Title 1</h3>
 *      <ul fd-mega-menu-list>
 *          <fd-mega-menu-item>
 *              <a fd-mega-menu-link>Item 0</a>
 *              <li fd-mega-menu-subitem>
 *                 <a fd-mega-menu-sublink>Sub Item 1</a>
 *            </li>
 *              <li fd-mega-menu-subitem>
 *                <a fd-mega-menu-sublink>Sub Item 2</a>
 *           </li>
 *             <li fd-mega-menu-subitem>
 *                  <a fd-mega-menu-sublink>Sub Item 3</a>
 *             </li>
 *          </fd-mega-menu-item>
 *      </ul>
 *  </fd-mega-menu-group>
 *  ```
 *
 */
var MegaMenuGroupComponent = /** @class */ (function () {
    function MegaMenuGroupComponent() {
    }
    MegaMenuGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu-group',
                    template: "<div class=\"fd-mega-menu__group\">\n    <ng-content select=\"[fd-mega-menu-title]\"></ng-content>\n    <ng-content select=\"[fd-mega-menu-list]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return MegaMenuGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MegaMenuTitleDirective = /** @class */ (function () {
    function MegaMenuTitleDirective() {
        /**
         * @hidden
         */
        this.fdMegaMenuTitleClass = true;
    }
    MegaMenuTitleDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-mega-menu-title]',
                },] }
    ];
    MegaMenuTitleDirective.propDecorators = {
        fdMegaMenuTitleClass: [{ type: HostBinding, args: ['class.fd-mega-menu__title',] }]
    };
    return MegaMenuTitleDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MegaMenuModule = /** @class */ (function () {
    function MegaMenuModule() {
    }
    MegaMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [MegaMenuComponent, MegaMenuListDirective, MegaMenuItemComponent, MegaMenuSubitemDirective,
                        MegaMenuSublinkDirective, MegaMenuLinkDirective, MegaMenuGroupComponent, MegaMenuTitleDirective],
                    exports: [
                        MegaMenuComponent,
                        MegaMenuLinkDirective,
                        MegaMenuItemComponent,
                        MegaMenuSubitemDirective,
                        MegaMenuListDirective,
                        MegaMenuSublinkDirective,
                        MegaMenuGroupComponent,
                        MegaMenuTitleDirective
                    ],
                    providers: [MenuKeyboardService]
                },] }
    ];
    return MegaMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FundamentalNgxCoreModule = /** @class */ (function () {
    function FundamentalNgxCoreModule() {
    }
    FundamentalNgxCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [
                        ActionBarModule,
                        AlertModule,
                        BadgeLabelModule,
                        BreadcrumbModule,
                        ButtonModule,
                        ButtonGroupModule,
                        CalendarModule,
                        ComboboxModule,
                        DatePickerModule,
                        DatetimePickerModule,
                        FileInputModule,
                        FormModule,
                        IconModule,
                        IdentifierModule,
                        ImageModule,
                        InlineHelpModule,
                        IdentifierModule,
                        InfiniteScrollModule,
                        InputGroupModule,
                        ListModule,
                        LoadingSpinnerModule,
                        LocalizationEditorModule,
                        MenuModule,
                        MegaMenuModule,
                        ModalModule,
                        MultiInputModule,
                        PaginationModule,
                        PanelModule,
                        PopoverModule,
                        ScrollSpyModule,
                        SearchInputModule,
                        SelectModule,
                        ShellbarModule,
                        SideNavigationModule,
                        SplitButtonModule,
                        TableModule,
                        TabsModule,
                        TileModule,
                        TimeModule,
                        TimePickerModule,
                        ToggleModule,
                        TokenModule,
                        TreeModule,
                    ],
                    providers: [AlertService, ModalService],
                },] }
    ];
    return FundamentalNgxCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
DefaultMenuItem = /** @class */ (function () {
    function DefaultMenuItem() {
    }
    return DefaultMenuItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents the positioning of the modal on the screen.
 */
var  /**
 * Represents the positioning of the modal on the screen.
 */
ModalPosition = /** @class */ (function () {
    function ModalPosition() {
    }
    return ModalPosition;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FundamentalNgxCoreModule, ActionBarModule, AlertModule, AlertService, AlertComponent, AlertRef, AlertConfig, BadgeLabelModule, BreadcrumbModule, ButtonModule, ButtonGroupModule, CalendarModule, CALENDAR_I18N_FACTORY, CalendarI18n, CalendarI18nDefault, CalendarI18nLabels, FdDate, CalendarComponent, ComboboxModule, ComboboxComponent, DatePickerModule, DATE_FORMAT_FACTORY, DateFormatParser, DateFormatParserDefault, DatePickerComponent, DatetimePickerModule, DATE_TIME_FORMAT_FACTORY, DateTimeFormatParser, DateTimeFormatParserDefault, FdDatetime, FileInputModule, FormModule, IconModule, IdentifierModule, ImageModule, InfiniteScrollModule, InlineHelpModule, InputGroupModule, ListModule, LoadingSpinnerModule, LocalizationEditorModule, LocalizationEditorItemComponent, LocalizationEditorMainComponent, LocalizationEditorInputDirective, LocalizationEditorTextareaDirective, LocalizationEditorLabel, LocalizationEditorElement, LocalizationEditorLoadLabel, MenuModule, MenuItemDirective, MenuKeyboardService, MenuComponent, DefaultMenuItem, MegaMenuModule, MegaMenuItemComponent, MegaMenuLinkDirective, MegaMenuSubitemDirective, MegaMenuSublinkDirective, ModalModule, ModalService, ModalConfig, ModalPosition, ModalRef, MultiInputModule, PaginationModule, PaginationComponent, PanelModule, PopoverModule, PopoverDirective, ScrollSpyModule, ScrollSpyDirective, SearchInputModule, SearchInputComponent, ShellbarModule, ProductMenuComponent, ShellbarActionsComponent, ShellbarComponent, SideNavigationModule, SideNavigationLinkDirective, SideNavigationSublistDirective, SelectModule, SelectComponent, OptionComponent, SplitButtonModule, OnlyDigitsDirective, TableModule, TabsModule, TabsService, TabListComponent, TileModule, TileGridDirective, TileComponent, TimeModule, TimeI18nLabels, TimeI18n, TimeObject, TimeComponent, TimePickerModule, TimePickerComponent, TIME_FORMAT_FACTORY, TimeFormatParser, TimeFormatParserDefault, ToggleModule, ToggleComponent, TokenModule, TokenComponent, TreeModule, TreeComponent, TreeChildComponent, ActionBarActionsDirective as ɵe, ActionBarBackDirective as ɵf, ActionBarDescriptionDirective as ɵc, ActionBarHeaderDirective as ɵd, ActionBarMobileDirective as ɵg, ActionBarTitleDirective as ɵb, ActionBarDirective as ɵa, alertContainerNgIf as ɵl, alertFadeNgIf as ɵk, AlertContainerComponent as ɵm, BadgeDirective as ɵo, LabelDirective as ɵp, StatusLabelDirective as ɵq, BreadcrumbItemDirective as ɵs, BreadcrumbLinkDirective as ɵt, BreadcrumbDirective as ɵr, ButtonGroupComponent as ɵu, ButtonGroupedDirective as ɵv, ButtonDirective as ɵh, CalendarHeaderComponent as ɵz, CalendarDayViewComponent as ɵw, CalendarMonthViewComponent as ɵba, CalendarYearViewComponent as ɵx, CalendarService as ɵy, DatetimePickerComponent as ɵbo, FileDragndropDirective as ɵbr, FileSelectDirective as ɵbq, FileInputComponent as ɵbp, FormControlDirective as ɵbt, FormGroupComponent as ɵby, FormItemDirective as ɵbu, FormLabelDirective as ɵbv, FormLegendDirective as ɵbw, FormMessageComponent as ɵbx, FormSetDirective as ɵbs, IconComponent as ɵj, IdentifierDirective as ɵbz, ImageComponent as ɵca, InfiniteScrollDirective as ɵcc, InlineHelpComponent as ɵcb, InputGroupNumberComponent as ɵce, InputGroupSearchComponent as ɵcd, InputGroupComponent as ɵcf, ListActionDirective as ɵci, ListCheckboxComponent as ɵcj, ListItemDirective as ɵch, ListDirective as ɵcg, LoadingSpinnerComponent as ɵck, LocalizationEditorComponent as ɵcl, MegaMenuGroupComponent as ɵco, MegaMenuListDirective as ɵcn, MegaMenuTitleDirective as ɵcp, MegaMenuComponent as ɵcm, MenuAddonDirective as ɵbj, MenuGroupComponent as ɵbg, MenuItemAddonDirective as ɵbk, MenuListDirective as ɵbi, MenuTitleDirective as ɵbh, ModalBodyComponent as ɵct, ModalFooterComponent as ɵcu, ModalHeaderComponent as ɵcs, modalFadeNgIf as ɵcr, ModalBackdrop as ɵcv, ModalContainer as ɵcw, ModalCloseButtonDirective as ɵcy, ModalTitleDirective as ɵcx, ModalComponent as ɵcq, MultiInputComponent as ɵcz, PaginationService as ɵda, PanelActionsComponent as ɵdg, PanelBodyComponent as ɵdi, PanelDescriptionComponent as ɵdf, PanelFiltersComponent as ɵdh, PanelFooterComponent as ɵdj, PanelGridComponent as ɵdk, PanelHeadComponent as ɵdd, PanelHeaderComponent as ɵdc, PanelTitleDirective as ɵde, PanelComponent as ɵdb, PopoverBodyComponent as ɵbe, PopoverControlComponent as ɵbd, PopoverContainer as ɵbf, PopoverDropdownComponent as ɵbc, PopoverComponent as ɵbb, ShellbarActionComponent as ɵdm, ShellbarLogoComponent as ɵdn, ShellbarSubtitleComponent as ɵdl, ShellbarTitleComponent as ɵdo, SideNavigationGroupComponent as ɵdq, SideNavigationItemComponent as ɵdt, SideNavigationListDirective as ɵds, SideNavigationSubitemDirective as ɵdu, SideNavigationSublinkDirective as ɵdv, SideNavigationTitleDirective as ɵdr, SideNavigationComponent as ɵdp, SplitButtonActionTitle as ɵdx, SplitButtonLoadActionTitle as ɵdz, SplitButtonMenuDirective as ɵdy, SplitButtonComponent as ɵdw, ColumnSortableDirective as ɵec, TableResponsiveWrapperDirective as ɵeb, TableDirective as ɵea, TabItemDirective as ɵei, TabLinkDirective as ɵeh, TabNavDirective as ɵeg, TabLoadTitleDirective as ɵef, TabTitleDirective as ɵee, TabPanelComponent as ɵed, ProductTileContentDirective as ɵep, ProductTileMediaDirective as ɵeo, ProductTileTitleDirective as ɵeq, ProductTileComponent as ɵen, TileActionsDirective as ɵem, TileContentDirective as ɵej, TileMediaDirective as ɵel, TileTitleDirective as ɵek, AbstractFdNgxClass as ɵi, DynamicComponentService as ɵn, DisplayFnPipe as ɵbm, PipeModule as ɵbl, SearchHighlightPipe as ɵbn };

//# sourceMappingURL=fundamental-ngx-core.js.map