import Popper from 'popper.js';
import { animate, style, transition, trigger } from '@angular/animations';
import focusTrap from 'focus-trap';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule, FormStyle, getLocaleDayNames, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Subject, fromEvent, defer, merge } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';
import { Input, Directive, ElementRef, NgModule, Component, ViewEncapsulation, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Type, ViewContainerRef, TemplateRef, Optional, Output, EventEmitter, HostListener, NgZone, HostBinding, Injectable, ApplicationRef, Injector, Inject, forwardRef, ContentChild, Pipe, ContentChildren, isDevMode, Renderer2, LOCALE_ID, ViewChildren, defineInjectable, inject } from '@angular/core';

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
class AbstractFdNgxClass {
    /**
     * @hidden
     * @protected
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }
    /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    _addClassToElement(className) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).classList.add(...className.split(' '));
    }
    /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    _addStyleToElement(attribute, value) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).style[attribute] = value;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const classList = ((/** @type {?} */ (this._elementRef.nativeElement))).classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }
        if (this.class) {
            this._addClassToElement(this.class);
        }
        this._setProperties();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this._setProperties();
    }
}
AbstractFdNgxClass.propDecorators = {
    class: [{ type: Input }]
};

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
class ButtonDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
    }
    // TODO: deprecated, leaving for backwards compatibility
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
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
                option => {
                    if (typeof option === 'string') {
                        this._addClassToElement('fd-button--' + option);
                    }
                }));
            }
        }
    }
}
ButtonDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-button]'
            },] }
];
/** @nocollapse */
ButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
ButtonDirective.propDecorators = {
    compact: [{ type: Input }],
    glyph: [{ type: Input }],
    fdType: [{ type: Input }],
    semantic: [{ type: Input }],
    options: [{ type: Input }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonModule {
}
ButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ButtonDirective],
                declarations: [ButtonDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @hidden
 * The base class for the icon component
 * @type {?}
 */
const BASE_ICON_CLASS = 'sap-icon';
/**
 * @hidden
 * Prefix for icon prop classes
 * @type {?}
 */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';
/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 * ```
 */
class IconComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * The size of the icon
         * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
         * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
         */
        this.size = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }
        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    }
}
IconComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-icon',
                template: ``,
                host: {
                    role: 'presentation'
                },
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
IconComponent.ctorParameters = () => [
    { type: ElementRef }
];
IconComponent.propDecorators = {
    glyph: [{ type: Input }],
    size: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconModule {
}
IconModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [IconComponent],
                declarations: [IconComponent]
            },] }
];

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
class ActionBarDirective {
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
class ActionBarTitleDirective {
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
class ActionBarDescriptionDirective {
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
class ActionBarHeaderDirective {
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
class ActionBarActionsDirective {
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
class ActionBarBackDirective {
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
class ActionBarMobileDirective {
}
ActionBarMobileDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-action-bar-mobile]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ActionBarModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const alertFadeNgIf = trigger('fadeAlertNgIf', [
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
const alertContainerNgIf = trigger('alertContainerNgIf', [
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
class AlertRef {
    constructor() {
        this._afterDismissed = new Subject();
        /**
         * Observable that is triggered when the alert is dismissed.
         */
        this.afterDismissed = this._afterDismissed.asObservable();
    }
    /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    dismiss(reason) {
        this._afterDismissed.next(reason);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let alertUniqueId = 0;
/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
class AlertComponent extends AbstractFdNgxClass {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertContainerComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdAlertContainerClass = true;
    }
}
AlertContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-alert-container',
                template: ``,
                host: {
                    '[@alertContainerNgIf]': ''
                },
                animations: [
                    alertContainerNgIf
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-alert-container {
            position: fixed;
            display: flex;
            flex-direction: column;
            z-index: 5000;
            align-items: center;
            top: 0;
            right: 50%;
            left: 50%;
        }
    `]
            }] }
];
AlertContainerComponent.propDecorators = {
    fdAlertContainerClass: [{ type: HostBinding, args: ['class.fd-alert-container',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertConfig {
    constructor() {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DynamicComponentInjector {
    /**
     * @param {?} _parentInjector
     * @param {?} _additionalTokens
     */
    constructor(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    get(token, notFoundValue, flags) {
        /** @type {?} */
        const value = this._additionalTokens.get(token);
        if (value) {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
class DynamicComponentService {
    /**
     * @hidden
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    createDynamicComponent(contentType, componentType, config, services) {
        // Dynamically inject services to component
        /** @type {?} */
        const configMap = new WeakMap();
        if (services) {
            services.forEach((/**
             * @param {?} service
             * @return {?}
             */
            service => configMap.set(service.constructor, service)));
        }
        // Prepare component
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        /** @type {?} */
        const componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);
        // Assign component attributes
        /** @type {?} */
        const configObj = Object.assign({}, config);
        Object.keys(configObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        }));
        componentRef.instance.childComponentType = contentType;
        // Render component
        /** @type {?} */
        const componentEl = (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        }
        else {
            document.body.appendChild(componentEl);
        }
        return componentRef;
    }
    /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    destroyComponent(componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
DynamicComponentService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DynamicComponentService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate an alert as an overlay.
 */
class AlertService {
    /**
     * @hidden
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.alerts = [];
    }
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    hasOpenAlerts() {
        return this.alerts && this.alerts.length > 0;
    }
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    open(content, alertConfig = new AlertConfig()) {
        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);
        // Instantiate alert ref service
        /** @type {?} */
        const service = new AlertRef();
        service.data = alertConfig.data;
        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent(content, AlertContainerComponent, alertConfig);
        }
        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;
        /** @type {?} */
        const component = this.dynamicComponentService.createDynamicComponent(content, AlertComponent, alertConfig, [service]);
        component.location.nativeElement.style.marginTop = '10px';
        // Subscription to close alert from ref
        /** @type {?} */
        const refSub = service.afterDismissed.subscribe((/**
         * @return {?}
         */
        () => {
            this.destroyAlertComponent(component);
            refSub.unsubscribe();
        }));
        // Log new component
        this.alerts.push(component);
        return service;
    }
    /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    dismissAll() {
        this.alerts.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        ref => {
            this.destroyAlertComponent(ref);
        }));
    }
    /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    destroyAlertComponent(alert) {
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item !== null && item !== undefined));
        this.dynamicComponentService.destroyComponent(alert);
        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyAlertContainer() {
        this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    }
}
AlertService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AlertService.ctorParameters = () => [
    { type: DynamicComponentService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Badge directive, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
class BadgeDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * @hidden
         */
        this.fdBadgeClass = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    }
}
BadgeDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-badge]'
            },] }
];
/** @nocollapse */
BadgeDirective.ctorParameters = () => [
    { type: ElementRef }
];
BadgeDirective.propDecorators = {
    status: [{ type: Input }],
    modifier: [{ type: Input }],
    fdBadgeClass: [{ type: HostBinding, args: ['class.fd-badge',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Label directive, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
class LabelDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        this.status = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    }
}
LabelDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-label]'
            },] }
];
/** @nocollapse */
LabelDirective.ctorParameters = () => [
    { type: ElementRef }
];
LabelDirective.propDecorators = {
    status: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Status Label directive with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
class StatusLabelDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        this.status = '';
        /**
         * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
         */
        this.statusIcon = '';
        /**
         * The icon used with the status indicator. See the icon page for the list of icons.
         */
        this.icon = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
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
    }
}
StatusLabelDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-status-label]'
            },] }
];
/** @nocollapse */
StatusLabelDirective.ctorParameters = () => [
    { type: ElementRef }
];
StatusLabelDirective.propDecorators = {
    status: [{ type: Input }],
    statusIcon: [{ type: Input }],
    icon: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BadgeLabelModule {
}
BadgeLabelModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [BadgeDirective, LabelDirective, StatusLabelDirective],
                declarations: [BadgeDirective, LabelDirective, StatusLabelDirective]
            },] }
];

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
class BreadcrumbDirective {
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
class BreadcrumbItemDirective {
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
class BreadcrumbLinkDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BreadcrumbModule {
}
BreadcrumbModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective],
                declarations: [BreadcrumbDirective, BreadcrumbItemDirective, BreadcrumbLinkDirective]
            },] }
];

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
class ButtonGroupComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdButtonGroupClass = true;
    }
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
class ButtonGroupedDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the button should be in compact form.
         */
        this.compact = false;
        /**
         * @hidden
         */
        this.fdButtonGroupedClass = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }
}
ButtonGroupedDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-button-grouped]'
            },] }
];
/** @nocollapse */
ButtonGroupedDirective.ctorParameters = () => [
    { type: ElementRef }
];
ButtonGroupedDirective.propDecorators = {
    size: [{ type: Input }],
    glyph: [{ type: Input }],
    state: [{ type: Input }],
    compact: [{ type: Input }, { type: HostBinding, args: ['class.fd-button--compact',] }],
    fdButtonGroupedClass: [{ type: HostBinding, args: ['class.fd-button--grouped',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ButtonGroupModule {
}
ButtonGroupModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ButtonGroupComponent, ButtonGroupedDirective],
                declarations: [ButtonGroupComponent, ButtonGroupedDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for labels inside the calendar component.
 */
class CalendarI18nLabels {
    constructor() {
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
}
CalendarI18nLabels.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ CalendarI18nLabels.ngInjectableDef = defineInjectable({ factory: function CalendarI18nLabels_Factory() { return new CalendarI18nLabels(); }, token: CalendarI18nLabels, providedIn: "root" });

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
class CalendarI18n {
}
CalendarI18n.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: CALENDAR_I18N_FACTORY,
                deps: [LOCALE_ID]
            },] }
];
/** @nocollapse */ CalendarI18n.ngInjectableDef = defineInjectable({ factory: function CalendarI18n_Factory() { return CALENDAR_I18N_FACTORY(inject(LOCALE_ID)); }, token: CalendarI18n, providedIn: "root" });
/**
 * Default implementation of the CalendarI18n service. It will get dates from the application locale if it is present.
 */
class CalendarI18nDefault extends CalendarI18n {
    /**
     * Constructor takes in a locale_id and gets the appropriate data from Angular.
     * @param {?} locale
     */
    constructor(locale) {
        super();
        this.locale = locale;
        this.weekdaysFallback = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        this.monthsFullFallback = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        this.monthsShortFallback = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        if (locale) {
            /** @type {?} */
            const sundayStartWeekdays = getLocaleDayNames(locale, FormStyle.Standalone, TranslationWidth.Short);
            this.weekdaysShort = sundayStartWeekdays.map((/**
             * @param {?} day
             * @param {?} index
             * @return {?}
             */
            (day, index) => sundayStartWeekdays[index % 7]));
            this.monthsShort = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Abbreviated);
            this.monthsFull = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
        }
        this.checkForFallback();
    }
    /**
     * Aria label for a specific date. Default implementation produces the label: {Date} {Month} {Year}.
     *
     * @param {?} date Native date object to use for the label.
     * @return {?}
     */
    getDayAriaLabel(date) {
        return date.getDate() + ' ' + this.monthsFull[date.getMonth()] + ' ' + date.getFullYear();
    }
    /**
     * Get all full month names.
     * @return {?}
     */
    getAllFullMonthNames() {
        return this.monthsFull;
    }
    /**
     * Get all short month names, such as Nov for November.
     * @return {?}
     */
    getAllShortMonthNames() {
        return this.monthsShort;
    }
    /**
     * Get all short week day names, such as Mo for Monday.
     * @return {?}
     */
    getAllShortWeekdays() {
        return this.weekdaysShort;
    }
    /**
     * Checks if a fallback is needed. Older versions of Angular may need this.
     * @private
     * @return {?}
     */
    checkForFallback() {
        if (!this.weekdaysShort || this.weekdaysShort.length === 0) {
            this.weekdaysShort = this.weekdaysFallback;
        }
        if (!this.monthsShort || this.monthsShort.length === 0) {
            this.monthsShort = this.monthsShortFallback;
        }
        if (!this.monthsFull || this.monthsFull.length === 0) {
            this.monthsFull = this.monthsFullFallback;
        }
    }
}
CalendarI18nDefault.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CalendarI18nDefault.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Internal use only.
 * Header of the calendar component.
 */
class CalendarHeaderComponent {
    /**
     * @param {?} calendarI18nLabels
     * @param {?} calendarI18n
     */
    constructor(calendarI18nLabels, calendarI18n) {
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
    /**
     * Get the aria label for the previous button. Depends on the active view.
     * @return {?}
     */
    get previousLabel() {
        return this.activeView !== 'year' ? this.calendarI18nLabels.previousMonthLabel
            : this.calendarI18nLabels.previousYearLabel;
    }
    /**
     * Get the aria label for the next button. Depends on the active view.
     * @return {?}
     */
    get nextLabel() {
        return this.activeView !== 'year' ? this.calendarI18nLabels.nextMonthLabel
            : this.calendarI18nLabels.nextMonthLabel;
    }
    /**
     * Get aria label for the month shown.
     * @return {?}
     */
    get monthLabel() {
        return this.calendarI18n.getAllFullMonthNames()[this.currentlyDisplayed.month - 1];
    }
    /**
     * @return {?}
     */
    isOnMonthView() {
        return this.activeView === 'month';
    }
    /**
     * @return {?}
     */
    isOnYearView() {
        return this.activeView === 'year';
    }
    /**
     * @param {?} type
     * @return {?}
     */
    processViewChange(type) {
        if (type === this.activeView) {
            this.activeView = 'day';
        }
        else {
            this.activeView = type;
        }
        this.activeViewChange.emit(this.activeView);
    }
}
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
CalendarHeaderComponent.ctorParameters = () => [
    { type: CalendarI18nLabels },
    { type: CalendarI18n }
];
CalendarHeaderComponent.propDecorators = {
    activeView: [{ type: Input }],
    currentlyDisplayed: [{ type: Input }],
    id: [{ type: Input }],
    activeViewChange: [{ type: Output }],
    previousClicked: [{ type: Output }],
    nextClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarService {
    constructor() {
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
     * @param {?} month which is number 1-12
     * @param {?} year which is number
     * @return {?}
     */
    static getDaysInMonth(month, year) {
        /** @type {?} */
        const isLeapYear = (/**
         * @param {?} _year
         * @return {?}
         */
        (_year) => {
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
    }
    /**
     * Method that check equality of 2 dates.
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    static datesEqual(date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        else {
            return date1.toDateString() === date2.toDateString();
        }
    }
    /**
     * Method that handles keydown events, dedicated for Month and Year views, which have a list with 12 elements.
     * Triggers the events, when the focus approaches start and end of list. Or when there is basic change of focus.
     * Triggers also event, when the element is selected by enter key, or space bar.
     * @param {?} event KeyboardEvent
     * @param {?} index which is number (0 - 11)
     * @return {?}
     */
    onKeydownHandler(event, index) {
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FdDate {
    /**
     * Static function to get the current date in FdDate form.
     * @return {?}
     */
    static getToday() {
        /** @type {?} */
        const tempDate = new Date();
        return new FdDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
    }
    /**
     *  Static function allowing convert js date object to FdDate model
     * @param {?} date
     * @return {?}
     */
    static getModelFromDate(date) {
        if (date) {
            return new FdDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    }
    /**
     * Constructor to build a FdDate object from a year, month and day.
     * @param {?} year The year of the date.
     * @param {?} month The month of the date (1-12).
     * @param {?} day The day of the date (1-31, generally).
     */
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    toDateString() {
        if (this.year && this.month && this.day && this.isDateValid()) {
            return this.toDate().toDateString();
        }
        else {
            return '';
        }
    }
    /**
     * Get amount of milliseconds from 01.01.1970
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * @return {?}
     */
    getTimeStamp() {
        if (this.year && this.month && this.day) {
            return this.toDate().getTime();
        }
        else {
            return -1;
        }
    }
    /**
     * Get number of weekday ex. Sunday = 1, Monday = 2, Tuesday = 3 etc.
     * -1 is thrown when some some of properties (day,month,year) are not defined
     * Native javascript date getDay() function returns Sunday as 0, Monday as 1, etc, to it's needed to increment value
     *
     * @return {?}
     */
    getDay() {
        if (this.year && this.month && this.day) {
            return this.toDate().getDay() + 1;
        }
        else {
            return -1;
        }
    }
    /**
     * Get next day
     * @return {?}
     */
    nextDay() {
        /** @type {?} */
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        const day = this.day >= maxDays ? 1 : this.day + 1;
        /** @type {?} */
        const month = day !== 1 ? this.month : (this.month > 11 ? 1 : this.month + 1);
        /** @type {?} */
        const year = month !== 1 ? this.year : this.year + 1;
        return new FdDate(year, month, day);
    }
    /**
     * Get previous day
     * @return {?}
     */
    previousDay() {
        /** @type {?} */
        const maxDays = CalendarService.getDaysInMonth(this.month, this.year);
        /** @type {?} */
        const day = this.day === 1 ? maxDays : this.day - 1;
        /** @type {?} */
        const month = day !== maxDays ? this.month : (this.month === 1 ? 12 : this.month - 1);
        /** @type {?} */
        const year = month !== 12 ? this.year : this.year - 1;
        return new FdDate(year, month, day);
    }
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    toDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
    /**
     * Method that checks validity of current FdDate object.
     * @return {?}
     */
    isDateValid() {
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
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the day view of the calendar.
 */
class CalendarDayViewComponent {
    /**
     * @hidden
     * @param {?} calendarI18n
     * @param {?} eRef
     */
    constructor(calendarI18n, eRef) {
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
     * @param {?} day CalendarDay object to be selected.
     * @param {?=} event
     * @return {?}
     */
    selectDate(day, event) {
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
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.buildDayViewGrid();
    }
    /**
     * @hidden
     *  Amount of selected days
     *  0, when none,
     *  1, when only startDate, or endDate same as startDate,
     *  2, when both
     * @return {?}
     */
    get selectCounter() {
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
    }
    /**
     * @hidden
     * Method that handles day cells keydown events,
     * @param {?} event KeyboardEvent
     * @param {?} cell CalendarDay
     * @param {?} grid with specified column and row as a x and y
     * @return {?}
     */
    onKeydownDayHandler(event, cell, grid) {
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
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnChanges() {
        this.buildDayViewGrid();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.newFocusedDayId) {
            this.focusElement(this.newFocusedDayId);
            this.newFocusedDayId = null;
        }
    }
    /**
     * @hidden
     *  Method that allow to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    focusElement(elementSelector) {
        /** @type {?} */
        const elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    /**
     * Active day means that with tabindex = 0, it's selected day or today or first day
     * @return {?}
     */
    focusActiveDay() {
        this.newFocusedDayId = this.getActiveCell(this.calendarDayList.filter((/**
         * @param {?} cell
         * @return {?}
         */
        cell => cell.monthStatus === 'current'))).id;
    }
    /**
     * Function that gives array of all displayed CalendarDays
     * @return {?}
     */
    get calendarDayList() {
        return this.dayViewGrid.reduce((/**
         * @param {?} totalCalendarRows
         * @param {?} calendarRow
         * @return {?}
         */
        (totalCalendarRows, calendarRow) => {
            if (!calendarRow) {
                calendarRow = [];
            }
            return totalCalendarRows.concat(calendarRow);
        }));
    }
    /**
     * Method that selects previous month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    selectPreviousMonth() {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = Object.assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month - 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        this.buildDayViewGrid();
        this.previousMonthSelect.emit();
    }
    /**
     * Method that selects next month
     * Triggered only when the month is changed during changing focus
     * Also triggers event to parent calendar component and rebuilds day view grid
     * @private
     * @return {?}
     */
    selectNextMonth() {
        if (this.currentlyDisplayed.month > 1) {
            this.currentlyDisplayed = Object.assign({}, this.currentlyDisplayed, { month: this.currentlyDisplayed.month + 1 });
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        this.buildDayViewGrid();
        this.nextMonthSelect.emit();
    }
    /**
     * Method that creates array of CalendarDay models which will be shown on day grid,
     * depending on current month and year.
     * @private
     * @return {?}
     */
    populateCalendar() {
        /** @type {?} */
        let calendar = [];
        calendar = this.getPreviousMonthDays(calendar);
        calendar = calendar.concat(this.getCurrentMonthDays());
        calendar = this.getNextMonthDays(calendar);
        calendar.forEach((/**
         * @param {?} call
         * @param {?} index
         * @return {?}
         */
        (call, index) => call.id = this.id + '-fd-day-' + (Math.floor(index / 7) + 1) + '' + (index % 7)));
        return calendar;
    }
    /**
     * Method that builds 2 dimensions day view grid, also sets up currently displayed month, or year,
     * when there is not any.
     * @private
     * @return {?}
     */
    buildDayViewGrid() {
        if (!this.currentlyDisplayed) {
            if (this.selectedDate) {
                this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
            }
            else {
                this.currentlyDisplayed = { month: FdDate.getToday().month, year: FdDate.getToday().year };
            }
        }
        /** @type {?} */
        const calendarDays = this.populateCalendar();
        /** @type {?} */
        const dayViewGrid = [];
        while (calendarDays.length > 0) {
            dayViewGrid.push(calendarDays.splice(0, 7));
        }
        this.dayViewGrid = dayViewGrid;
        return;
    }
    /**
     * Method which provides array of CalendarDay, which contains every single day of currently shown month/year.
     * @private
     * @return {?}
     */
    getCurrentMonthDays() {
        /** @type {?} */
        const month = this.currentlyDisplayed.month;
        /** @type {?} */
        const year = this.currentlyDisplayed.year;
        /** @type {?} */
        const calendarDays = [];
        /** @type {?} */
        const amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        for (let dayNumber = 1; dayNumber <= amountOfDaysInCurrentMonth; dayNumber++) {
            /** @type {?} */
            const fdDate = new FdDate(year, month, dayNumber);
            calendarDays.push(Object.assign({}, this.getDay(fdDate), { monthStatus: 'current', today: CalendarService.datesEqual(FdDate.getToday(), fdDate) }));
        }
        this.getActiveCell(calendarDays).isTabIndexed = true;
        return calendarDays;
    }
    /**
     * Method that returns active cell, which means:
     * if there is any selected day, return selected day
     * if there is no selected day, but there is today day, return today day
     * if there is no today, or selected, return first one
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    getActiveCell(calendarDays) {
        if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        cell => cell.selected))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            cell => cell.selected));
        }
        else if (calendarDays.find((/**
         * @param {?} cell
         * @return {?}
         */
        cell => cell.today))) {
            return calendarDays.find((/**
             * @param {?} cell
             * @return {?}
             */
            cell => cell.today));
        }
        else {
            return calendarDays[0];
        }
    }
    /**
     * Method which provides array of CalendarDay, which contains last 0-6 days of previous month/year. Theses days
     * fills the gap between starting startingDayOfWeek and first day of current month
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    getPreviousMonthDays(calendarDays) {
        /** @type {?} */
        const month = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.month - 1 : 12;
        /** @type {?} */
        const year = this.currentlyDisplayed.month > 1 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year - 1;
        /** @type {?} */
        const amountOfDaysInCurrentMonth = CalendarService.getDaysInMonth(month, year);
        /** @type {?} */
        const prevMonthLastDate = new FdDate(year, month, amountOfDaysInCurrentMonth);
        /** @type {?} */
        const prevMonthLastDay = amountOfDaysInCurrentMonth;
        /** @type {?} */
        let prevMonthLastWeekDay = prevMonthLastDate.getDay() - this.startingDayOfWeek;
        /** Checking if there are some days cut by startingDayOfWeek option
         *  If yes, there is whole week added, to avoid hiding
         */
        if (prevMonthLastWeekDay < 0) {
            prevMonthLastWeekDay = prevMonthLastWeekDay + 7;
        }
        if (prevMonthLastWeekDay < 6) {
            while (prevMonthLastWeekDay >= 0) {
                /** @type {?} */
                const prevMonthDay = prevMonthLastDay - prevMonthLastWeekDay;
                /** @type {?} */
                const fdDate = new FdDate(year, month, prevMonthDay);
                calendarDays.push(Object.assign({}, this.getDay(fdDate), { monthStatus: 'previous' }));
                prevMonthLastWeekDay--;
            }
        }
        return calendarDays;
    }
    /**
     * Method which provides array of CalendarDay, which contains first days of next month/year. Theses days
     * fills the gap between last day of current day and end of 6-weeks calendar grid.
     * @private
     * @param {?} calendarDays
     * @return {?}
     */
    getNextMonthDays(calendarDays) {
        /** @type {?} */
        const month = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.month + 1 : 1;
        /** @type {?} */
        const year = this.currentlyDisplayed.month < 12 ? this.currentlyDisplayed.year : this.currentlyDisplayed.year + 1;
        // The calendar grid can have 6 (42 days) weeks
        /** @type {?} */
        const nextMonthDisplayedDays = 42 - calendarDays.length;
        for (let nextD = 1; nextD <= nextMonthDisplayedDays; nextD++) {
            /** @type {?} */
            const fdDate = new FdDate(year, month, nextD);
            calendarDays.push(Object.assign({}, this.getDay(fdDate), { monthStatus: 'next' }));
        }
        return calendarDays;
    }
    /**
     * Method that generates whole day model basing on fdDate, disabling functions, block functions, and actually
     * chosen range / single date.
     * @private
     * @param {?} fdDate
     * @return {?}
     */
    getDay(fdDate) {
        /** @type {?} */
        const day = {
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
    }
    /**
     * Method that returns first letter of every weekday, basing on CalendarI18nDefault. Can be changed by user by
     * providing other class which implements CalendarI18n
     * @return {?}
     */
    get shortWeekDays() {
        return this.calendarI18n.getAllShortWeekdays()
            .slice(this.startingDayOfWeek - 1)
            .concat(this.calendarI18n.getAllShortWeekdays().slice(0, this.startingDayOfWeek - 1))
            .map((/**
         * @param {?} weekday
         * @return {?}
         */
        weekday => weekday[0].toLocaleUpperCase()));
    }
}
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
CalendarDayViewComponent.ctorParameters = () => [
    { type: CalendarI18n },
    { type: ElementRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the month view of the calendar.
 */
class CalendarMonthViewComponent {
    /**
     * @param {?} eRef
     * @param {?} cdRef
     * @param {?} calendarI18n
     * @param {?} calendarService
     */
    constructor(eRef, cdRef, calendarI18n, calendarService) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.focusElement('#' + this.id + '-fd-month-' + index)));
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.selectMonth(index)));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * Get a number (1-12) representing the current month
     * @return {?}
     */
    get currentMonth() {
        return FdDate.getToday().month;
    }
    /**
     * Getter for the private class member _monthOffset
     * @return {?}
     */
    get monthOffset() {
        return this._monthOffset;
    }
    /**
     * Method for handling the mouse click event when a month is selected
     * @param {?} selectedMonth
     * @param {?=} event
     * @return {?}
     */
    selectMonth(selectedMonth, event) {
        if (event) {
            event.stopPropagation();
        }
        this.monthSelected = selectedMonth + this.monthOffset;
        this.monthClicked.emit(this.monthSelected);
    }
    /**
     * Method for handling the keyboard events (a11y)
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onKeydownMonthHandler(event, index) {
        this.calendarService.onKeydownHandler(event, index);
    }
    /**
     * Method that allows to focus elements inside this component
     * @param {?} elementSelector
     * @return {?}
     */
    focusElement(elementSelector) {
        /** @type {?} */
        const elementToFocus = this.eRef.nativeElement.querySelector(elementSelector);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    /**
     * Method that returns list of short month names from currently provided calendarI18n service
     * @return {?}
     */
    get shortMonthNames() {
        return this.calendarI18n.getAllShortMonthNames();
    }
}
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
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: CalendarI18n },
    { type: CalendarService }
];
CalendarMonthViewComponent.propDecorators = {
    id: [{ type: Input }],
    monthSelected: [{ type: Input }],
    focusEscapeFunction: [{ type: Input }],
    monthClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Component representing the YearView of the Calendar Component.
 */
class CalendarYearViewComponent {
    /**
     * @hidden
     * @param {?} eRef
     * @param {?} calendarService
     */
    constructor(eRef, calendarService) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.newFocusedYearId) {
            this.focusElement(this.newFocusedYearId);
            this.newFocusedYearId = null;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.firstYearInList = this.yearSelected;
        this.constructYearList();
        this.calendarService.onFocusIdChange
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.newFocusedYearId = this.id + '-fd-year-' + index;
            this.focusElement(this.newFocusedYearId);
        }));
        this.calendarService.focusEscapeFunction = this.focusEscapeFunction;
        this.calendarService.onKeySelect
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.selectYear(this.calendarYearList[index])));
        this.calendarService.onListStartApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.loadPreviousYearList()));
        this.calendarService.onListEndApproach
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.loadNextYearList()));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * Method that returns active cell, which means:
     * if there is any selected year, return selected year
     * if there is no selected year, but there is current year, return current year
     * if there is no current year, or selected, return first one
     * @private
     * @return {?}
     */
    getActiveYear() {
        /** @type {?} */
        const selectedYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        year => year === this.yearSelected));
        if (selectedYear) {
            return selectedYear;
        }
        /** @type {?} */
        const currentYear = this.calendarYearList.find((/**
         * @param {?} year
         * @return {?}
         */
        year => year === this.currentYear));
        if (currentYear) {
            return currentYear;
        }
        return this.calendarYearList[0];
    }
    /**
     * Method for handling the keyboard navigation.
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onKeydownYearHandler(event, index) {
        this.calendarService.onKeydownHandler(event, index);
    }
    /**
     * Method used to load the previous 12 years to be displayed.
     * @return {?}
     */
    loadNextYearList() {
        this.firstYearInList += 12;
        this.constructYearList();
    }
    /**
     * Method used to load the next 12 years to be displayed.
     * @return {?}
     */
    loadPreviousYearList() {
        this.firstYearInList -= 12;
        this.constructYearList();
    }
    /**
     * Method allowing focusing on elements within this component.
     * @param {?} elementSelector
     * @return {?}
     */
    focusElement(elementSelector) {
        /** @type {?} */
        const elementToFocus = this.eRef.nativeElement.querySelector('#' + elementSelector);
        if (elementToFocus) {
            this.eRef.nativeElement.querySelector('#' + elementSelector).focus();
        }
    }
    /**
     * Method that sends the year to the parent component when it is clicked.
     * @param {?} selectedYear
     * @param {?=} event
     * @return {?}
     */
    selectYear(selectedYear, event) {
        if (event) {
            event.stopPropagation();
        }
        this.yearSelected = selectedYear;
        this.yearClicked.emit(this.yearSelected);
    }
    /**
     * @hidden
     * @private
     * @return {?}
     */
    constructYearList() {
        /** @type {?} */
        const displayedYearsAmount = 12;
        this.calendarYearList = [];
        for (let x = 0; x < displayedYearsAmount; ++x) {
            this.calendarYearList.push(this.firstYearInList + x);
        }
        this.activeYear = this.getActiveYear();
    }
}
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
CalendarYearViewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: CalendarService }
];
CalendarYearViewComponent.propDecorators = {
    id: [{ type: Input }],
    focusEscapeFunction: [{ type: Input }],
    yearSelected: [{ type: Input }],
    yearClicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let calendarUniqueId = 0;
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
class CalendarComponent {
    /**
     * @hidden
     * @param {?} calendarI18n
     * @param {?} changeDetectorRef
     */
    constructor(calendarI18n, changeDetectorRef) {
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
        () => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
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
        () => {
            if (document.getElementById(this.id + '-left-arrow')) {
                document.getElementById(this.id + '-left-arrow').focus();
            }
        });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.prepareDisplayedView();
    }
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms.
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        /** @type {?} */
        let valid = true;
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
    }
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        // Not needed
    }
    /**
     * Method that handle active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    handleActiveViewChange(activeView) {
        this.activeView = activeView;
        this.activeViewChange.emit(activeView);
    }
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    selectedDateChanged(date) {
        this.selectedDate = date;
        this.onChange(date);
        this.onTouched();
        this.selectedDateChange.emit(date);
        this.closeCalendar.emit();
    }
    /**
     * @hidden
     * Method that is triggered by events from day view component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    selectedRangeDateChanged(dates) {
        if (dates) {
            this.selectedRangeDate = { start: dates.start, end: dates.end ? dates.end : dates.start };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.onTouched();
            this.closeCalendar.emit();
        }
    }
    /**
     * Function that handles next arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    handleNextArrowClick() {
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
    }
    /**
     * Function that handles previous arrow icon click, depending on current view it changes month, year or list of years
     * @return {?}
     */
    handlePreviousArrowClick() {
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
    }
    /**
     * Function that allows to switch actual view to next month
     * @return {?}
     */
    displayNextMonth() {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    }
    /**
     * Function that allows to switch actual view to previous month
     * @return {?}
     */
    displayPreviousMonth() {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        }
        else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    }
    /**
     * Function that allows to switch actual view to next year
     * @return {?}
     */
    displayNextYear() {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year + 1 };
    }
    /**
     * Function that allows to switch actual view to previous year
     * @return {?}
     */
    displayPreviousYear() {
        this.currentlyDisplayed = { month: this.currentlyDisplayed.month, year: this.currentlyDisplayed.year - 1 };
    }
    /**
     * Function that allows to switch actually displayed list of year to next year list
     * @return {?}
     */
    displayNextYearList() {
        this.yearViewComponent.loadNextYearList();
    }
    /**
     * Function that allows to switch actually displayed list of year to previous year list
     * @return {?}
     */
    displayPreviousYearList() {
        this.yearViewComponent.loadPreviousYearList();
    }
    /**
     * Function that allows to change currently displayed month/year configuration,
     * which are connected to days displayed
     * @param {?} fdDate
     * @return {?}
     */
    setCurrentlyDisplayed(fdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }
    /**
     * @hidden
     * Function that handles changes from month view child component, changes actual view and changes currently displayed month
     * @param {?} month
     * @return {?}
     */
    handleMonthViewChange(month) {
        this.currentlyDisplayed = { month: month, year: this.currentlyDisplayed.year };
        this.activeView = 'day';
        this.activeViewChange.emit(this.activeView);
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }
    /**
     * @param {?} yearSelected
     * @return {?}
     */
    selectedYear(yearSelected) {
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
        this.changeDetectorRef.detectChanges();
        this.dayViewComponent.focusActiveDay();
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
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
    }
    /**
     * @hidden
     * Method that sets up the currently displayed variables, like shown month and year.
     * Day grid is based on currently displayed month and year
     * @private
     * @return {?}
     */
    prepareDisplayedView() {
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
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    }
}
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
                        () => CalendarComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => CalendarComponent)),
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
CalendarComponent.ctorParameters = () => [
    { type: CalendarI18n },
    { type: ChangeDetectorRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Not intended for external use.
 */
class PopoverContainer {
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
class PopoverDirective {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} cdRef
     * @param {?} resolver
     * @param {?} injector
     * @param {?} appRef
     * @param {?} renderer
     */
    constructor(elRef, cdRef, resolver, injector, appRef, renderer) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.isOpen) {
            this.open();
        }
        this.setupFillBehaviour();
        this.initPlacement();
        this.addTriggerListeners();
        this.isSetup = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.popper) {
            this.popper.destroy();
        }
        if (this.containerRef) {
            this.destroyContainer();
        }
        this.destroyTriggerListeners();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.isSetup) {
            return;
        }
        if (changes.triggers) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.destroyTriggerListeners();
                this.addTriggerListeners();
            }));
        }
        if (changes.isOpen) {
            if (changes.isOpen.currentValue) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.isOpen = false;
                    this.open(false);
                }));
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.isOpen = true;
                    this.close(false);
                }));
            }
        }
        if (changes.placement) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.initPlacement();
            }));
        }
        if (changes.fillControl) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setupFillBehaviour();
            }));
        }
    }
    /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    toggle(fireEvent = true) {
        if (this.isOpen) {
            this.close(fireEvent);
        }
        else {
            this.open(fireEvent);
        }
    }
    /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    open(fireEvent = true) {
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }
    /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    close(fireEvent = true) {
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    updatePopper() {
        if (this.popper) {
            this.popper.scheduleUpdate();
        }
    }
    /**
     * @private
     * @return {?}
     */
    createContainer() {
        if (this.containerRef) {
            return;
        }
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);
        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.noArrow = this.noArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;
        this.appRef.attachView(this.containerRef.hostView);
        /** @type {?} */
        const setupRef = this.containerRef.instance.isSetup.subscribe((/**
         * @return {?}
         */
        () => {
            this.createPopper();
            setupRef.unsubscribe();
        }));
        /** @type {?} */
        const containerEl = (/** @type {?} */ (((/** @type {?} */ (this.containerRef.hostView))).rootNodes[0]));
        if (this.appendTo === 'body') {
            document.body.appendChild(containerEl);
        }
        else {
            this.appendTo.appendChild(containerEl);
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyTriggerListeners() {
        if (this.eventRef && this.eventRef.length > 0) {
            this.eventRef.forEach((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                event();
            }));
            this.eventRef = [];
        }
    }
    /**
     * @private
     * @return {?}
     */
    addTriggerListeners() {
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach((/**
             * @param {?} trigger
             * @return {?}
             */
            trigger$$1 => {
                this.eventRef.push(this.renderer.listen(this.elRef.nativeElement, trigger$$1, (/**
                 * @return {?}
                 */
                () => {
                    this.toggle();
                })));
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyContainer() {
        if (this.containerRef) {
            this.appRef.detachView(this.containerRef.hostView);
            this.containerRef.destroy();
            this.containerRef = null;
        }
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    createPopper() {
        this.popper = new Popper((/** @type {?} */ (this.elRef.nativeElement)), (/** @type {?} */ (this.containerRef.location.nativeElement)), this.options);
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    fillReference(data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.offsets.popper.width = data.styles.width = data.offsets.reference.width;
        return data;
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    atLeastReference(data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.styles.minWidth = data.offsets.reference.width + 'px';
        return data;
    }
    /**
     * @private
     * @return {?}
     */
    initPlacement() {
        if (this.placement) {
            if (this.options) {
                this.options.placement = this.placement;
            }
            else {
                this.options = { placement: this.placement };
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    setupFillBehaviour() {
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
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
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
    }
}
PopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdPopover]'
            },] }
];
/** @nocollapse */
PopoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: Renderer2 }
];
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
class PopoverDropdownComponent {
    constructor() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let popoverUniqueId = 0;
/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
class PopoverComponent {
    constructor() {
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
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Closes the popover.
     * @return {?}
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    open() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    updatePopover() {
        this.directiveRef.updatePopper();
    }
    /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    openChanged(isOpen) {
        this.isOpenChange.emit(isOpen);
        this.updateDropdownIsOpen(isOpen);
    }
    /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    updateDropdownIsOpen(isOpen) {
        if (this.dropdownComponent) {
            this.dropdownComponent.isOpen = isOpen;
        }
    }
}
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
class PopoverControlComponent {
}
PopoverControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-popover-control',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class PopoverBodyComponent {
}
PopoverBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-popover-body',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PopoverModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a menu.
 */
class MenuComponent {
    constructor() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The component that represents a menu group.
 */
class MenuGroupComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdHasDisplayBlockClass = true;
        /**
         * @hidden
         */
        this.fdMenuGroupClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents the menu title.
 */
class MenuTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.elementClass = 'fd-menu__title';
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a listing structure of the menu.
 */
class MenuListDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdMenuListClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a menu item.
 */
class MenuItemDirective {
    /**
     * @hidden
     * @param {?} itemEl
     */
    constructor(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
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
MenuItemDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-menu-item]',
            },] }
];
/** @nocollapse */
MenuItemDirective.ctorParameters = () => [
    { type: ElementRef }
];
MenuItemDirective.propDecorators = {
    fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive for menu addon(for icons).
 */
class MenuAddonDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdMenuAddonClass = true;
    }
}
MenuAddonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fd-menu-addon], [fdMenuAddon]'
            },] }
];
MenuAddonDirective.propDecorators = {
    fdMenuAddonClass: [{ type: HostBinding, args: ['class.fd-menu--addon-before',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive for menu item addon(for icons).
 */
class MenuItemAddonDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdMenuItemAddonClass = true;
    }
}
MenuItemAddonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fd-menu-item-addon], [fdMenuItemAddon]'
            },] }
];
MenuItemAddonDirective.propDecorators = {
    fdMenuItemAddonClass: [{ type: HostBinding, args: ['class.fd-menu__addon-before',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DisplayFnPipe {
    /**
     * @param {?} value
     * @param {?} displayFn
     * @return {?}
     */
    transform(value, displayFn) {
        return displayFn(value);
    }
}
DisplayFnPipe.decorators = [
    { type: Pipe, args: [{
                name: 'displayFnPipe'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchHighlightPipe {
    /**
     * @param {?} value
     * @param {?} args
     * @param {?=} active
     * @return {?}
     */
    transform(value, args, active = true) {
        if (args && value && active) {
            /** @type {?} */
            const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
            if (startIndex !== -1) {
                /** @type {?} */
                const matchingString = value.substr(startIndex, args.length);
                return value.replace(matchingString, '<strong>' + matchingString + '</strong>');
            }
        }
        return value;
    }
}
SearchHighlightPipe.decorators = [
    { type: Pipe, args: [{
                name: 'highlight'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PipeModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuKeyboardService {
    constructor() {
        /**
         * Event emitted when an item link is clicked.
         */
        this.itemClicked = new Subject();
        /**
         * Whether user wants to remove keyboard handling
         */
        this.disableKeydownHandling = false;
    }
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
    keyDownHandler(event, index, menuItems) {
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
    }
}
MenuKeyboardService.propDecorators = {
    itemClicked: [{ type: Output }]
};

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
class ComboboxComponent {
    /**
     * @param {?} elRef
     * @param {?} menuKeyboardService
     */
    constructor(elRef, menuKeyboardService) {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        this.setupFocusTrap();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewInit() {
        this.menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.onMenuClickHandler(index)));
        this.menuKeyboardService.focusEscapeBeforeList = (/**
         * @return {?}
         */
        () => this.searchInputElement.nativeElement.focus());
        this.menuKeyboardService.focusEscapeAfterList = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.focus();
            }
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onInputKeyupHandler(event) {
        if (this.inputText &&
            this.inputText.length &&
            event.code !== 'Escape' &&
            event.code !== 'Space' &&
            event.code !== 'Enter') {
            this.isOpen = true;
            this.isOpenChangeHandle(this.isOpen);
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onMenuKeydownHandler(event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    }
    /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    onMenuClickHandler(index) {
        /** @type {?} */
        const selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this.handleClickActions(selectedItem);
            this.itemClicked.emit({ item: selectedItem, index: index });
        }
    }
    /**
     * Get the input text of the input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the input text of the input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        if (this.communicateByObject) {
            this.onChange(this.getOptionObjectByDisplayedValue(value));
        }
        else {
            this.onChange(value);
        }
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.communicateByObject) {
            this.inputTextValue = this.displayFn(value);
        }
        else {
            this.inputTextValue = value;
        }
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @return {?}
     */
    handleSearchTermChange() {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }
    /**
     * @hidden
     * @return {?}
     */
    onPrimaryButtonClick() {
        if (this.searchFunction) {
            this.searchFunction();
        }
    }
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    isOpenChangeHandle(isOpen) {
        this.isOpen = isOpen;
        this.onTouched();
        if (isOpen) {
            this.focusTrap.activate();
        }
        else {
            this.focusTrap.deactivate();
        }
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    defaultDisplay(str) {
        return str;
    }
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    defaultFilter(contentArray, searchTerm) {
        /** @type {?} */
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    }
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    handleClickActions(term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
            this.isOpenChangeHandle(this.isOpen);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }
    /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    getOptionObjectByDisplayedValue(displayValue) {
        return this.dropdownValues.find((/**
         * @param {?} value
         * @return {?}
         */
        value => this.displayFn(value) === displayValue));
    }
    /**
     * @private
     * @return {?}
     */
    setupFocusTrap() {
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
    }
}
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
                        () => ComboboxComponent)),
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
ComboboxComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MenuKeyboardService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ComboboxModule {
}
ComboboxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ComboboxComponent],
                imports: [CommonModule, PopoverModule, FormsModule, MenuModule, PipeModule, ButtonModule],
                exports: [ComboboxComponent]
            },] }
];

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
class DateFormatParser {
    constructor() {
        /**
         * Delimiter for the range. This should not show up in the string representation of the dates.
         */
        this.rangeDelimiter = ' - ';
    }
}
DateFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ DateFormatParser.ngInjectableDef = defineInjectable({ factory: DATE_FORMAT_FACTORY, token: DateFormatParser, providedIn: "root" });
/**
 * Default implementation of the DateFormatParser service.
 */
class DateFormatParserDefault extends DateFormatParser {
    /**
     * Takes in a string value and return a FdDate model object.
     * @param {?} value String to concert to a FdDate model object.
     * @return {?}
     */
    parse(value) {
        if (value) {
            /** @type {?} */
            const str = value.toString().split('/').map(Number);
            return new FdDate(str[2], str[0], str[1]);
        }
        else {
            return new FdDate(null, null, null);
        }
    }
    /**
     * Takes in a FdDate model object and return a string representation.
     * @param {?} date FdDate to format to string value.
     * @return {?}
     */
    format(date) {
        return date.month + '/' + date.day + '/' + date.year;
    }
}
DateFormatParserDefault.decorators = [
    { type: Injectable }
];

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
class DatePickerComponent {
    /**
     * @hidden
     * @param {?} dateAdapter
     */
    constructor(dateAdapter) {
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
        (selected) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
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
     * @param {?} activeView
     * @return {?}
     */
    handleCalendarActiveViewChange(activeView) {
        this.activeViewChange.emit(activeView);
    }
    /**
     * @hidden
     * @return {?}
     */
    closeFromCalendar() {
        if (this.type === 'single') {
            this.closeCalendar();
        }
    }
    /**
     * Opens the calendar
     * @return {?}
     */
    openCalendar() {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }
    /**
     * Toggles the calendar open or closed
     * @return {?}
     */
    toggleCalendar() {
        this.onTouched();
        this.isOpen = !this.isOpen;
    }
    /**
     * Closes the calendar if it is open
     * @return {?}
     */
    closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     * @param {?} date
     * @return {?}
     */
    handleSingleDateChange(date) {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
        }
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     * @param {?} dates
     * @return {?}
     */
    handleRangeDateChange(dates) {
        if (dates &&
            (!CalendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !CalendarService.datesEqual(this.selectedRangeDate.end, dates.end))) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end);
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
        }
    }
    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     * @param {?} strDate
     * @return {?}
     */
    handleInputChange(strDate) {
        this.dateStringUpdate(strDate);
    }
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
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
    }
    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * @param {?} date
     * @return {?}
     */
    dateStringUpdate(date) {
        /** Case when there is single mode */
        if (this.type === 'single') {
            /** @type {?} */
            const fdDate = this.dateAdapter.parse(date);
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
            const currentDates = date.split(this.dateAdapter.rangeDelimiter);
            /** @type {?} */
            const firstDate = this.dateAdapter.parse(currentDates[0]);
            /** @type {?} */
            const secondDate = this.dateAdapter.parse(currentDates[1]);
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
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
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
    }
}
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
                        () => DatePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-date-picker-custom{display:inline-block}.fd-date-picker-custom fd-popover{display:block}"]
            }] }
];
/** @nocollapse */
DatePickerComponent.ctorParameters = () => [
    { type: DateFormatParser }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatePickerModule {
}
DatePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DatePickerComponent],
                imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule],
                exports: [DatePickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeObject {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for labels inside the time component.
 */
class TimeI18nLabels {
    constructor() {
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
}
TimeI18nLabels.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ TimeI18nLabels.ngInjectableDef = defineInjectable({ factory: function TimeI18nLabels_Factory() { return new TimeI18nLabels(); }, token: TimeI18nLabels, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
class TimeI18n {
    constructor() {
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
}
TimeI18n.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ TimeI18n.ngInjectableDef = defineInjectable({ factory: function TimeI18n_Factory() { return new TimeI18n(); }, token: TimeI18n, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeComponent {
    /**
     * @param {?} timeI18nLabels
     * @param {?} timeI18n
     */
    constructor(timeI18nLabels, timeI18n) {
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
        (time) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    writeValue(time) {
        if (!time) {
            return;
        }
        this.time = time;
        this.setDisplayedHour();
    }
    /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
        }
    }
    /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    setDisplayedHour() {
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
    }
    /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    displayedHourChanged() {
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
    }
    /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    inputBlur(inputType) {
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
    }
    /**
     * Increases the hour value by one.
     * @return {?}
     */
    increaseHour() {
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
    }
    /**
     * Decreases the hour value by one.
     * @return {?}
     */
    decreaseHour() {
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
    }
    /**
     * Increases the minute value by one.
     * @return {?}
     */
    increaseMinute() {
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
    }
    /**
     * Decreases the minute value by one.
     * @return {?}
     */
    decreaseMinute() {
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
    }
    /**
     * Increases the second value by one.
     * @return {?}
     */
    increaseSecond() {
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
    }
    /**
     * Decreases the second value by one.
     * @return {?}
     */
    decreaseSecond() {
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
    }
    /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    togglePeriod() {
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
    }
    /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    minuteModelChange() {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }
    /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    secondModelChange() {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }
    /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    periodModelChange() {
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
    }
    /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    lastButtonKeydown(event) {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    }
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    isPm(period) {
        /** @type {?} */
        const pmMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianPm : this.timeI18n.meridianPm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === pmMeridian;
    }
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    isAm(period) {
        /** @type {?} */
        const amMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianAm : this.timeI18n.meridianAm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === amMeridian;
    }
}
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
                        () => TimeComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"]
            }] }
];
/** @nocollapse */
TimeComponent.ctorParameters = () => [
    { type: TimeI18nLabels },
    { type: TimeI18n }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FdDatetime {
    /**
     * Static function to get the current date in FdDateTime form.
     * @return {?}
     */
    static getToday() {
        /** @type {?} */
        const date = new Date();
        /** @type {?} */
        const time = { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
        return new FdDatetime(FdDate.getToday(), time);
    }
    /**
     * Constructor to build a FdDateTime object from a FdDate and TimeObject.
     * @param {?} date the FdDate object.
     * @param {?} time the TimeObject object.
     */
    constructor(date, time) {
        this.date = date;
        this.time = time;
    }
    /**
     * Get Luxon date object converted to string from FdDate.
     * @return {?}
     */
    toLocaleDateString() {
        if (this.toDate() && this.isTimeValid() && this.isDateValid()) {
            return this.toDate().toLocaleString();
        }
        else {
            return null;
        }
    }
    /**
     * Method that checks validity of time on FdDateTime object.
     * @return {?}
     */
    isTimeValid() {
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
    }
    /**
     * Method that checks validity of date on FdDateTime object.
     * @return {?}
     */
    isDateValid() {
        return this.date && this.date.isDateValid();
    }
    /**
     * @return {?}
     */
    get year() {
        if (this.date) {
            return this.date.year;
        }
    }
    /**
     * @return {?}
     */
    get month() {
        if (this.date) {
            return this.date.month;
        }
    }
    /**
     * @return {?}
     */
    get day() {
        if (this.date) {
            return this.date.day;
        }
    }
    /**
     * @return {?}
     */
    get hour() {
        if (this.time) {
            return this.time.hour;
        }
    }
    /**
     * @return {?}
     */
    get minute() {
        if (this.time) {
            return this.time.minute;
        }
    }
    /**
     * @return {?}
     */
    get second() {
        if (this.time) {
            return this.time.second;
        }
    }
    /**
     * Get native date object from FdDate.
     * @return {?}
     */
    toDate() {
        return new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }
}

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
class DateTimeFormatParser {
}
DateTimeFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_TIME_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ DateTimeFormatParser.ngInjectableDef = defineInjectable({ factory: DATE_TIME_FORMAT_FACTORY, token: DateTimeFormatParser, providedIn: "root" });
/**
 * Default implementation of the DateFormatParser service.
 */
class DateTimeFormatParserDefault extends DateTimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a FdDatetime object.
     * @param {?} value String to convert to a FdDatetime model object.
     * @return {?}
     */
    parse(value) {
        if (!value) {
            return FdDatetime.getToday();
        }
        else {
            /** @type {?} */
            let time;
            /** @type {?} */
            let date;
            /** @type {?} */
            const dateStr = value.split(',')[0];
            if (dateStr) {
                /** @type {?} */
                const dateSplitStr = dateStr.split('.').map(Number);
                date = new FdDate(dateSplitStr[2], dateSplitStr[1], dateSplitStr[0]);
            }
            /** @type {?} */
            const timeStr = value.split(',')[1];
            if (timeStr) {
                /** @type {?} */
                const timeSplitStr = timeStr.split(':').map(Number);
                time = { hour: timeSplitStr[0], minute: timeSplitStr[1], second: timeSplitStr[2] };
            }
            if (date) {
                return new FdDatetime(date, time);
            }
        }
    }
    /**
     * Takes in a FdDatetime object and returns the string representation.
     * @param {?} date FdDatetime model object to convert to a string.
     * @return {?}
     */
    format(date) {
        return date.day + '.' +
            date.month + '.' +
            date.year + ', ' +
            date.hour + ':' +
            date.minute + ':' +
            date.second;
    }
}
DateTimeFormatParserDefault.decorators = [
    { type: Injectable }
];

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
class DatetimePickerComponent {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} changeDetRef
     * @param {?} dateTimeAdapter
     */
    constructor(elRef, changeDetRef, dateTimeAdapter) {
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
        (selected) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
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
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    }
    /**
     * Toggles the popover.
     * @return {?}
     */
    togglePopover() {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        }
        else {
            this.openPopover();
        }
    }
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    handleCalendarActiveViewChange(activeView) {
        this.activeViewChange.emit(activeView);
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    openPopover() {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }
    /**
     * Closes the popover and refresh model
     * @return {?}
     */
    closePopover() {
        if (this.isOpen) {
            this.handleInputChange(this.inputFieldDate);
            this.onClose.emit();
            this.isOpen = false;
        }
    }
    /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    isInvalidDateInputHandler(e) {
        this.isInvalidDateInput = e;
    }
    /**
     * @hidden
     * @return {?}
     */
    onEscapeKeydownHandler() {
        this.closePopover();
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onGlobalClick(event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.date && this.inputFieldDate !== null) {
            this.selectedDate = this.date.date;
            this.time = this.date.time;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
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
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    handleDateChange(date) {
        this.selectedDate = date;
        if (!this.date.isTimeValid()) {
            this.time = this.timeComponent.time;
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    }
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    handleTimeChange(time) {
        this.time = time;
        if (!this.selectedDate || !this.selectedDate.isDateValid()) {
            this.selectedDate = FdDate.getToday();
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    }
    /**
     * @hidden
     * @return {?}
     */
    focusArrowLeft() {
        if (this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    }
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    handleInputChange(date) {
        /** @type {?} */
        const fdTimeDate = this.dateTimeAdapter.parse(date);
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
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
        return this.date &&
            this.date instanceof FdDatetime &&
            this.date.isDateValid() && this.date.isTimeValid();
    }
    /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    setInput(fdDateTime) {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
        this.changeDetRef.detectChanges();
    }
}
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
                        () => DatetimePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatetimePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-datetime-host{display:inline-block;width:230px}.fd-datetime-host .fd-datetime{display:block}.fd-datetime-host .fd-datetime__container{display:flex;align-items:center;margin:0 16px}.fd-datetime-host .fd-datetime__separator{background-color:#d3d3d3;width:1px;margin:42px 28px;-ms-grid-row-align:stretch;align-self:stretch}.fd-datetime-host .fd-datetime fd-popover{display:block}.fd-datetime-host .fd-datetime fd-time{width:auto}"]
            }] }
];
/** @nocollapse */
DatetimePickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DateTimeFormatParser }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OnlyDigitsDirective {
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
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
    }
}
OnlyDigitsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdOnlyDigits], [fd-only-digits]'
            },] }
];
OnlyDigitsDirective.propDecorators = {
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeModule {
}
TimeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimeComponent, OnlyDigitsDirective],
                imports: [CommonModule, FormsModule],
                exports: [TimeComponent, OnlyDigitsDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DatetimePickerModule {
}
DatetimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DatetimePickerComponent],
                imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule, TimeModule],
                exports: [DatetimePickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool to facilitate the input of files from the user.
 * It supports drag and drop, multiple input, max file size and more.
 * The drag events make it very easy to create and style elements like a dropzone.
 */
class FileInputComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} files
     * @return {?}
     */
    writeValue(files) {
        // not needed - should be handled by user.
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    selectHandler(event) {
        if (this.maxFileSize) {
            /** @type {?} */
            const valid_files = [];
            /** @type {?} */
            const invalid_files = [];
            event.forEach((/**
             * @param {?} file
             * @return {?}
             */
            file => {
                if (file.size < this.maxFileSize) {
                    valid_files.push(file);
                }
                else {
                    invalid_files.push(file);
                }
            }));
            if (valid_files.length > 0) {
                this.onChange(valid_files);
                this.onSelect.emit(valid_files);
            }
            if (invalid_files.length > 0) {
                this.onInvalidFiles.emit(invalid_files);
            }
        }
        else {
            this.onChange(event);
            this.onSelect.emit(event);
        }
    }
    /**
     * Opens the file selector.
     * @return {?}
     */
    open() {
        this.inputRef.nativeElement.click();
    }
    /**
     * Clears the files from the input.
     * @return {?}
     */
    clear() {
        this.inputRef.nativeElement.value = '';
        this.onChange([]);
    }
}
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
                        () => FileInputComponent)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive tool to facilitate interacting with a native file input element.
 */
class FileSelectDirective {
    constructor() {
        /**
         * Whether the input should accept multiple file selections.
         */
        this.multiple = true;
        /**
         * Event emitted when files are selected.
         */
        this.onFileSelect = new EventEmitter();
    }
    /**
     * @hidden
     * @return {?}
     */
    get multipleBinding() {
        return this.multiple ? '' : undefined;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
        if (event.target instanceof HTMLInputElement) {
            /** @type {?} */
            const elRef = ((/** @type {?} */ (event.target)));
            /** @type {?} */
            const files = elRef.files;
            /** @type {?} */
            const fileArray = Array.from(files);
            if (files.length) {
                this.onFileSelect.emit(fileArray);
            }
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive that handles the drag and drop feature of the file input.
 */
class FileDragndropDirective {
    constructor() {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDragover(event) {
        if (this.dragndrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onDragenter() {
        ++this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 1) {
            this.onDragEnter.emit();
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDragleave(event) {
        --this.elementStateCounter;
        if (this.dragndrop && this.elementStateCounter === 0) {
            event.preventDefault();
            event.stopPropagation();
            this.onDragLeave.emit();
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        this.elementStateCounter = 0;
        if (!this.dragndrop || this.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        /** @type {?} */
        const rawFiles = event.dataTransfer.files;
        /** @type {?} */
        const files = Array.from(rawFiles);
        if (!this.multiple && files.length > 1) {
            this.onInvalidFiles.emit(files);
            return;
        }
        /** @type {?} */
        const valid_files = [];
        /** @type {?} */
        const invalid_files = [];
        if (files.length > 0) {
            if (!this.accept) {
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    valid_files.push(file);
                }));
            }
            else {
                /** @type {?} */
                const allowed_extensions = this.accept.toLocaleLowerCase().replace(/[\s.]/g, '').split(',');
                files.forEach((/**
                 * @param {?} file
                 * @return {?}
                 */
                (file) => {
                    /** @type {?} */
                    const ext = file.name.split('.')[file.name.split('.').length - 1];
                    if (allowed_extensions.lastIndexOf(ext) !== -1) {
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
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileInputModule {
}
FileInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                exports: [FileInputComponent, FileSelectDirective, FileDragndropDirective],
                declarations: [FileInputComponent, FileSelectDirective, FileDragndropDirective]
            },] }
];

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
class FormSetDirective {
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
class FormControlDirective extends AbstractFdNgxClass {
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
        this._addClassToElement('fd-form__control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }
}
FormControlDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-form-control]'
            },] }
];
/** @nocollapse */
FormControlDirective.ctorParameters = () => [
    { type: ElementRef }
];
FormControlDirective.propDecorators = {
    state: [{ type: Input }]
};

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
class FormItemDirective {
    constructor() {
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
class FormLabelDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdFormLabelClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Applies css to a legend html element.
 *
 * <legend fd-form-legend>Legend</legend>
 */
class FormLegendDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdFormLegendClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Form message. Intended to be displayed under a form control for validation purposes.
 */
class FormMessageComponent {
    constructor() {
        /**
         * Type of the message. Can be `text`, `help`, `error` and `warning`.
         */
        this.type = '';
    }
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
class FormGroupComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdFormGroupClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormModule {
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
class IdentifierDirective extends AbstractFdNgxClass {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IdentifierModule {
}
IdentifierModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [IdentifierDirective],
                declarations: [IdentifierDirective]
            },] }
];

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
class ImageComponent {
    constructor() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageModule {
}
ImageModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [ImageComponent],
                declarations: [ImageComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
class InfiniteScrollDirective {
    /**
     * @hidden
     * @param {?} element
     */
    constructor(element) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');
        this.subscription = this.scrollEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > this.scrollPercent / 100) {
                this.onScrollAction.emit(null);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
InfiniteScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdInfiniteScroll]'
            },] }
];
/** @nocollapse */
InfiniteScrollDirective.ctorParameters = () => [
    { type: ElementRef }
];
InfiniteScrollDirective.propDecorators = {
    scrollPercent: [{ type: Input }],
    onScrollAction: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InfiniteScrollModule {
}
InfiniteScrollModule.decorators = [
    { type: NgModule, args: [{
                declarations: [InfiniteScrollDirective],
                exports: [InfiniteScrollDirective]
            },] }
];

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
class InlineHelpComponent {
    constructor() {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InlineHelpModule {
}
InlineHelpModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PopoverModule],
                exports: [InlineHelpComponent],
                declarations: [InlineHelpComponent]
            },] }
];

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
class InputGroupComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Get the value of the text input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the value of the text input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputTextValue = value;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }
}
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
                        () => InputGroupComponent)),
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
class InputGroupNumberComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Get the value of the text input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the value of the text input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputTextValue = value;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @return {?}
     */
    stepUpClicked() {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
    /**
     * @hidden
     * @return {?}
     */
    stepDownClicked() {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
}
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
                        () => InputGroupNumberComponent)),
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
class InputGroupSearchComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Get the value of the text input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the value of the text input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputTextValue = value;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
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
                        () => InputGroupSearchComponent)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class InputGroupModule {
}
InputGroupModule.decorators = [
    { type: NgModule, args: [{
                declarations: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent],
                imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                exports: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
class ListDirective {
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
class ListItemDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let listCheckboxUniqueId = 0;
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
class ListCheckboxComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * Set the value of the *isChecked* property.
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Set the value of the *isChecked* property.
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.onToggle.emit({ id: this.id, value: value });
        if (this.checked) {
            this.onActivated.emit(this.id);
        }
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
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
                        () => ListCheckboxComponent)),
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
class ListActionDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ListModule {
}
ListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent],
                imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                exports: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent]
            },] }
];

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
class LoadingSpinnerComponent {
    constructor() {
        /**
         * Whether to display the loading indicator animation.
         */
        this.loading = false;
        /**
         * Aria label for the 'loading' spinner.
         */
        this.loadingLabel = 'Loading';
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LoadingSpinnerModule {
}
LoadingSpinnerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LoadingSpinnerComponent],
                exports: [LoadingSpinnerComponent],
                imports: [CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const modalFadeNgIf = trigger('modal-fade', [
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
class ModalRef {
    constructor() {
        this._afterClosed = new Subject();
        /**
         * Observable that is triggered when the modal is closed.
         * On close a *result* is passed back. On dismiss, an *error* is returned instead.
         */
        this.afterClosed = this._afterClosed.asObservable();
    }
    /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param {?=} result Value passed back to the observable as a result.
     * @return {?}
     */
    close(result) {
        this._afterClosed.next(result);
    }
    /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param {?=} reason Value passed back to the observable as an error.
     * @return {?}
     */
    dismiss(reason) {
        this._afterClosed.error(reason);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalComponent extends AbstractFdNgxClass {
    /**
     * @param {?} elRef
     * @param {?} componentFactoryResolver
     * @param {?} cdRef
     * @param {?} modalRef
     */
    constructor(elRef, componentFactoryResolver, cdRef, modalRef) {
        super(elRef);
        this.elRef = elRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cdRef = cdRef;
        this.modalRef = modalRef;
        this.escKeyCloseable = true;
        this.focusTrapped = true;
        this.ariaLabelledBy = null;
        this.ariaLabel = null;
        this.ariaDescribedBy = null;
        this.backdropClickCloseable = true;
        this.hasBackdrop = true;
        this.modalPanelClass = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._setProperties();
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    closeModalEsc(event) {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this.modalRef.dismiss('escape');
        }
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    loadFromComponent(content) {
        this.containerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
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
            $implicit: this.modalRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    }
    /**
     * @return {?}
     */
    _setProperties() {
        if (this.modalPanelClass) {
            this._addClassToElement(this.modalPanelClass);
        }
    }
}
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
ModalComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: ModalRef, decorators: [{ type: Optional }] }
];
ModalComponent.propDecorators = {
    containerRef: [{ type: ViewChild, args: ['vc', { read: ViewContainerRef },] }],
    closeModalEsc: [{ type: HostListener, args: ['keyup', ['$event'],] }]
};

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
class ModalHeaderComponent {
    constructor() {
        /**
         * @hidden
         */
        this.modalHeader = true;
    }
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
class ModalBodyComponent {
    constructor() {
        /**
         * @hidden
         */
        this.modalBody = true;
    }
}
ModalBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-body',
                template: "<ng-content></ng-content>\n",
                styles: [`
        :host {
            display: block;
            overflow: auto;
            flex-grow: 1;
        }
    `]
            }] }
];
ModalBodyComponent.propDecorators = {
    modalBody: [{ type: HostBinding, args: ['class.fd-modal__body',] }]
};

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
class ModalFooterComponent {
    constructor() {
        /**
         * @hidden
         */
        this.modalFooter = true;
    }
}
ModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-footer',
                template: "<div class=\"fd-modal__actions\">\n    <ng-content></ng-content>\n</div>\n",
                styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `]
            }] }
];
ModalFooterComponent.propDecorators = {
    modalFooter: [{ type: HostBinding, args: ['class.fd-modal__footer',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalBackdrop extends AbstractFdNgxClass {
    /**
     * @param {?} elRef
     * @param {?} modalRef
     */
    constructor(elRef, modalRef) {
        super(elRef);
        this.elRef = elRef;
        this.modalRef = modalRef;
        this.backdropClass = '';
        this.backdropClickCloseable = true;
        this.overlayMain = true;
        this.overlayModal = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._setProperties();
    }
    /**
     * @return {?}
     */
    _setProperties() {
        if (this.backdropClass) {
            this._addClassToElement(this.backdropClass);
        }
    }
    /**
     * @return {?}
     */
    closeModal() {
        if (this.backdropClickCloseable) {
            this.modalRef.dismiss('backdrop');
        }
    }
}
ModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-overlay',
                template: ``,
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
ModalBackdrop.ctorParameters = () => [
    { type: ElementRef },
    { type: ModalRef }
];
ModalBackdrop.propDecorators = {
    overlayMain: [{ type: HostBinding, args: ['class.fd-overlay',] }],
    overlayModal: [{ type: HostBinding, args: ['class.fd-overlay--modal',] }],
    closeModal: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalContainer {
}
ModalContainer.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-container',
                template: ``,
                host: {
                    '[@modal-fade]': '',
                    '[class.fd-modal-container]': 'true'
                },
                animations: [
                    modalFadeNgIf
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-modal-container {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
    `]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalConfig {
    constructor() {
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
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service used to dynamically generate a modal.
 */
class ModalService {
    /**
     * @hidden
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.modals = [];
    }
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    hasOpenModals() {
        return this.modals && this.modals.length > 0;
    }
    /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    dismissAll() {
        this.modals.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this.destroyModalComponent(item.modalRef);
        }));
    }
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    open(contentType, modalConfig = new ModalConfig()) {
        // Get default values from model
        modalConfig = Object.assign(new ModalConfig(), modalConfig);
        // Instantiate modal ref service
        /** @type {?} */
        const service = new ModalRef();
        service.data = modalConfig.data;
        // Create Container
        /** @type {?} */
        const container = this.dynamicComponentService.createDynamicComponent(contentType, ModalContainer, modalConfig);
        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;
        // Create Backdrop
        /** @type {?} */
        let backdrop;
        if (modalConfig.hasBackdrop) {
            backdrop = this.dynamicComponentService.createDynamicComponent(contentType, ModalBackdrop, modalConfig, [service]);
        }
        // Create Component
        /** @type {?} */
        const component = this.dynamicComponentService.createDynamicComponent(contentType, ModalComponent, modalConfig, [service]);
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
        const defaultBehaviourOnClose = (/**
         * @return {?}
         */
        () => {
            this.destroyModalComponent(component);
            refSub.unsubscribe();
        });
        /** @type {?} */
        const refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);
        return service;
    }
    /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    destroyModalComponent(modal) {
        /** @type {?} */
        const arrayRef = this.modals.find((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.modalRef === modal));
        /** @type {?} */
        const indexOf = this.modals.indexOf(arrayRef);
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
        item => item !== null && item !== undefined));
    }
    /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    setModalSize(componentRef, configObj) {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    }
    /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    setModalPosition(componentRef, position) {
        if (position) {
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    }
}
ModalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ModalService.ctorParameters = () => [
    { type: DynamicComponentService, decorators: [{ type: Inject, args: [DynamicComponentService,] }] }
];

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
class ModalTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.modalTitle = true;
    }
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
/**
 * Directive that applies fundamental modal styling to a button.
 *
 * ```html
 * <button fd-modal-close-btn></button>
 * ```
 */
class ModalCloseButtonDirective {
    constructor() {
        /**
         * @hidden
         */
        this.lightButton = true;
        /**
         * @hidden
         */
        this.modalClose = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ModalModule {
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
class MultiInputComponent {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        if (selected) {
            this.selected = selected;
        }
    }
    /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    handleSelect(checked, value) {
        /** @type {?} */
        const previousLength = this.selected.length;
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
    }
    /**
     * @hidden
     * @return {?}
     */
    handleSearchTermChange() {
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this.popoverRef.updatePopover();
    }
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    defaultFilter(contentArray, searchTerm) {
        /** @type {?} */
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    defaultDisplay(str) {
        return str;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        event.stopPropagation();
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}
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
                        () => MultiInputComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-multi-input-custom{display:block}.fd-multi-input-custom .fd-multi-input-popover-size{overflow:auto;display:block}.fd-multi-input-custom .fd-multi-input-popover-custom{display:block}.fd-multi-input-custom .fd-multi-input-menu-overflow{overflow:auto}.fd-multi-input-custom .fd-multi-input-token-spacing{margin:0 4px 4px 0}.fd-multi-input-custom .fd-multi-input-token-spacing:last-child{margin-right:0}"]
            }] }
];
/** @nocollapse */
MultiInputComponent.ctorParameters = () => [
    { type: ElementRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
class TokenComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TokenModule {
}
TokenModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TokenComponent],
                imports: [CommonModule],
                exports: [TokenComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MultiInputModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DISPLAY_NUM_PAGES = 3;
/**
 * Service that is used to retrieve all the pages,
 * the number of pages,
 * and to validate the pagination object.
 */
class PaginationService {
    /**
     * @hidden
     */
    constructor() {
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
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    getPages(pagination) {
        /** @type {?} */
        const pages = [];
        this.validate(pagination);
        /** @type {?} */
        const totalPages = this.getTotalPages(pagination);
        if (totalPages <= DISPLAY_NUM_PAGES) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            if (pagination.currentPage <= DISPLAY_NUM_PAGES) {
                for (let i = 1; i <= DISPLAY_NUM_PAGES; i++) {
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
                for (let i = totalPages - (DISPLAY_NUM_PAGES - 1); i <= totalPages; i++) {
                    pages.push(i);
                }
            }
            else {
                pages.push(1);
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                /** @type {?} */
                const buffer = Math.floor(DISPLAY_NUM_PAGES / 2);
                for (let i = pagination.currentPage - buffer; i <= pagination.currentPage + buffer; i++) {
                    pages.push(i);
                }
                if (totalPages !== DISPLAY_NUM_PAGES + 1) {
                    pages.push(this.MORE);
                }
                pages.push(totalPages);
            }
        }
        return pages;
    }
    /**
     * Retrieves the total number of pages.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    getTotalPages(pagination) {
        if (pagination.itemsPerPage <= 0) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    }
    /**
     * Provides validation for the pagination object.
     * @param {?} pagination An object of type *Pagination*.
     * @return {?}
     */
    validate(pagination) {
        if (!pagination.totalItems && isDevMode()) {
            console.warn(`No pages provided in the Pagination object. This warning only appears in development mode.`);
        }
        if (!pagination.itemsPerPage) {
            pagination.itemsPerPage = this.DEFAULT_ITEMS_PER_PAGE;
        }
        else if (pagination.itemsPerPage < 0 && isDevMode()) {
            console.warn(`itemsPerPage must be greater than zero. This warning only appears in development mode.`);
        }
        if (!pagination.currentPage) {
            pagination.currentPage = 1;
        }
    }
}
PaginationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PaginationService.ctorParameters = () => [];

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
class PaginationComponent {
    /**
     * @hidden
     * @param {?} paginationService
     */
    constructor(paginationService) {
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
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes && changes.currentPage) {
            this.currentPage = changes.currentPage.currentValue;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        /** @type {?} */
        const totalPages = this.paginationService.getTotalPages(this.getPaginationObject());
        if (!this.currentPage || this.currentPage < 1) {
            this.currentPage = 1;
        }
        else if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
    }
    /**
     * Checks if the current page is the last page.
     * @return {?}
     */
    isLastPage() {
        return this.currentPage === this.paginationService.getTotalPages(this.getPaginationObject());
    }
    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param {?} page The number of the page.
     * @param {?} $event The keyboard event.
     * @return {?}
     */
    onKeypressHandler(page, $event) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.goToPage(page);
        }
    }
    /**
     * Navigates to a specific page.
     * @param {?} page The number of the page to navigate to.
     * @param {?=} $event The mouse event (optional).
     * @return {?}
     */
    goToPage(page, $event) {
        if ($event) {
            $event.preventDefault();
        }
        if (page > this.paginationService.getTotalPages(this.getPaginationObject()) || page < 1) {
            return;
        }
        this.pages = this.paginationService.getPages(this.getPaginationObject());
        this.pageChangeStart.emit(page);
    }
    /**
     * Retrieves an object that represents
     * the total number of items, the current page, and the number of items per page.
     * @return {?}
     */
    getPaginationObject() {
        /** @type {?} */
        const retVal = {
            totalItems: this.totalItems,
            currentPage: this.currentPage,
            itemsPerPage: this.itemsPerPage
        };
        return retVal;
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-pagination',
                template: "<span class=\"fd-pagination__total\" *ngIf=\"displayTotalItems && totalItems\">{{ totalItems }} {{displayText}}</span>\n<nav class=\"fd-pagination__nav\" *ngIf=\"totalItems && totalItems >= itemsPerPage\">\n    <a class=\"fd-pagination__link fd-pagination__link--previous\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-label]=\"previousLabel\"\n       [attr.aria-disabled]=\"currentPage === 1 ? true : null\"\n       (keypress)=\"onKeypressHandler(currentPage - 1, $event)\"\n       (click)=\"goToPage(currentPage - 1)\">\n    </a>\n    <ng-container *ngFor=\"let page of pages\">\n        <a class=\"fd-pagination__link\"\n           tabindex=\"0\"\n           role=\"button\"\n           (keypress)=\"onKeypressHandler(page, $event)\"\n           (click)=\"goToPage(page, $event)\"\n           *ngIf=\"page !== -1; else more\"\n           [attr.aria-selected]=\"currentPage === page\">{{page}}</a>\n        <ng-template #more>\n            <span class=\"fd-pagination__link fd-pagination__link--more\"\n                  aria-hidden=\"true\"\n                  aria-label=\"...\"\n                  role=\"presentation\"></span>\n        </ng-template>\n    </ng-container>\n    <a class=\"fd-pagination__link fd-pagination__link--next\"\n       [attr.aria-label]=\"nextLabel\"\n       tabindex=\"0\"\n       role=\"button\"\n       [attr.aria-disabled]=\"isLastPage()\"\n       (keypress)=\"onKeypressHandler(currentPage + 1, $event)\"\n       (click)=\"goToPage(currentPage + 1)\">\n    </a>\n</nav>\n",
                providers: [PaginationService],
                host: {
                    class: 'fd-pagination'
                },
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-pagination a {
            cursor: pointer;
        }
    `]
            }] }
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [
    { type: PaginationService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PaginationModule {
}
PaginationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PaginationComponent],
                imports: [CommonModule, ButtonModule, IconModule],
                providers: [PaginationService],
                exports: [PaginationComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
class PanelComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * @hidden
         */
        this.fdPanelClass = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    }
}
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
PanelComponent.ctorParameters = () => [
    { type: ElementRef }
];
PanelComponent.propDecorators = {
    columnSpan: [{ type: Input }],
    backgroundImage: [{ type: Input }],
    fdPanelClass: [{ type: HostBinding, args: ['class.fd-panel',] }]
};

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
class PanelHeaderComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelHeaderClass = true;
    }
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
class PanelHeadComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelHeadClass = true;
    }
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
class PanelTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelTitleClass = true;
    }
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
class PanelDescriptionComponent {
}
PanelDescriptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-panel-description',
                template: "<p class=\"fd-panel__description\">\n    <ng-content></ng-content>\n</p>",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class PanelActionsComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelActionsClass = true;
    }
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
class PanelFiltersComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelFiltersClass = true;
    }
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
class PanelBodyComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelBodyClass = true;
        /**
         * Whether the edges of the panel should have bleeding padding.
         */
        this.bleed = false;
    }
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
class PanelFooterComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelFooterClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
class PanelGridComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the grid should have a gap.
         */
        this.nogap = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-panel-grid');
        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    }
}
PanelGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-panel-grid',
                template: "<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PanelGridComponent.ctorParameters = () => [
    { type: ElementRef }
];
PanelGridComponent.propDecorators = {
    col: [{ type: Input }],
    nogap: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PanelModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
class ScrollSpyDirective {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        /** @type {?} */
        let spiedTag;
        /** @type {?} */
        const children = this.elRef.nativeElement.children;
        /** @type {?} */
        const targetScrollTop = event.target.scrollTop;
        /** @type {?} */
        const targetOffsetTop = event.target.offsetTop;
        for (let i = 0; i < children.length; i++) {
            /** @type {?} */
            const element = children[i];
            if (this.trackedTags.some((/**
             * @param {?} tag
             * @return {?}
             */
            tag => tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase()))) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop + event.target.offsetHeight * this.targetPercent) {
                    spiedTag = element;
                }
            }
        }
        if ((spiedTag || this.fireEmpty) && spiedTag !== this.currentActive) {
            this.currentActive = spiedTag;
            this.spyChange.emit(this.currentActive);
        }
    }
}
ScrollSpyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdScrollSpy]'
            },] }
];
/** @nocollapse */
ScrollSpyDirective.ctorParameters = () => [
    { type: ElementRef }
];
ScrollSpyDirective.propDecorators = {
    trackedTags: [{ type: Input }],
    fireEmpty: [{ type: Input }],
    targetPercent: [{ type: Input }],
    spyChange: [{ type: Output }],
    onScroll: [{ type: HostListener, args: ['scroll', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScrollSpyModule {
}
ScrollSpyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ScrollSpyDirective],
                exports: [ScrollSpyDirective]
            },] }
];

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
class SearchInputComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onInputKeyupHandler() {
        if (this.inputText && this.inputText.length) {
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    onMenuKeydownHandler(event, term) {
        if (event.code === 'Enter' && term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            /** @type {?} */
            let foundItem = false;
            /** @type {?} */
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem) {
                    if (menuItemsArray[index + 1]) {
                        menuItemsArray[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem = true;
                }
            }));
        }
        else if (event.code === 'ArrowUp') {
            event.preventDefault();
            /** @type {?} */
            let foundItem = false;
            /** @type {?} */
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (!foundItem) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        this.searchInputElement.nativeElement.focus();
                        foundItem = true;
                    }
                    else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray[index - 1]) {
                            menuItemsArray[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem = true;
                    }
                }
            }));
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    onMenuClickHandler(event, term) {
        if (term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    shellbarSearchInputClicked(event) {
        event.stopPropagation();
    }
    /**
     * Get the input text of the input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the input text of the input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputTextValue = value;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    handleClickActions(term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        if (isDevMode()) {
            console.warn('Search Input is deprecated. Please use Combobox instead. Visit the fundamental-ngx wiki for more information.');
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    handleSearchTermChange() {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    defaultDisplay(str) {
        return str;
    }
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    defaultFilter(contentArray, searchTerm) {
        /** @type {?} */
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    }
}
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
                        () => SearchInputComponent)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SearchInputModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
class ShellbarComponent {
}
ShellbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-shellbar',
                template: "<div class=\"fd-shellbar\">\n    <div class=\"fd-shellbar__group fd-shellbar__group--start\">\n        <ng-content select=\"fd-shellbar-logo\"></ng-content>\n        <div class=\"fd-shellbar__product\">\n            <ng-content select=\"fd-shellbar-title\"></ng-content>\n            <ng-content select=\"fd-product-menu\"></ng-content>\n        </div>\n        <ng-content select=\"fd-shellbar-subtitle\"></ng-content>\n    </div>\n    <div class=\"fd-shellbar__group fd-shellbar__group--end\">\n        <ng-content select=\"fd-shellbar-actions\"></ng-content>\n    </div>\n</div>\n"
            }] }
];

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
class ProductMenuComponent {
    constructor() {
        /**
         * @hidden
         */
        this.productMenuCollapsed = false;
        /**
         * When set to true, popover list will be closed after selecting the option
         */
        this.closePopoverOnSelect = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    onResize() {
        /** @type {?} */
        const mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.onResize();
    }
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    itemClicked(item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponent.close();
        }
        item.callback(event);
    }
}
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
class ShellbarSubtitleComponent {
}
ShellbarSubtitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-shellbar-subtitle',
                template: "<div class=\"fd-shellbar__subtitle\">\n    <ng-content></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class ShellbarActionComponent {
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
class ShellbarActionsComponent {
    constructor() {
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
    /**
     * @hidden
     * @return {?}
     */
    onResize() {
        this.actionsCollapsed = window.innerWidth < 1024;
    }
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    itemClicked(item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponents.forEach((/**
             * @param {?} popover
             * @return {?}
             */
            popover => popover.close()));
        }
        item.callback(event);
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.onResize();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentChecked() {
        this.totalNotifications = 0;
        this.shellbarActions.forEach((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                this.totalNotifications = this.totalNotifications + action.notificationCount;
            }
        }));
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    toggleCollapsedProducts(event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    }
}
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
class ShellbarLogoComponent {
}
ShellbarLogoComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-shellbar-logo',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class ShellbarTitleComponent {
}
ShellbarTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-shellbar-title',
                template: "<span class=\"fd-shellbar__title\">\n    <ng-content></ng-content>\n</span>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ShellbarModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
class SideNavigationComponent {
    constructor() {
        /**
         * Whether the side navigation is collapsed.
         */
        this.collapsed = false;
    }
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
class SideNavigationGroupComponent {
}
SideNavigationGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-side-nav-group',
                template: "<div class=\"fd-side-nav__group\">\n  <ng-content></ng-content>\n  <ng-content select=\"[fd-side-nav-list]\"></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class SideNavigationTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdSideNavTitleClass = true;
    }
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
class SideNavigationListDirective {
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
class SideNavigationLinkDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the link has a sublist.
         */
        this.hasSublist = false;
        /**
         * Whether the sub list is opened or closed
         */
        this.onSubListOpenChange = new EventEmitter();
        this.sublistIsOpen = false;
        this.role = this.hasSublist ? 'button' : '';
        this.hasPopup = this.hasSublist;
        this.tabindex = this.hasSublist ? '0' : '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-side-nav__link');
        if (this.hasSublist) {
            this._addClassToElement('has-child');
            this._addStyleToElement('cursor', 'pointer');
            this.elementRef.nativeElement.setAttribute('aria-expanded', this.sublistIsOpen);
        }
        if (this.sublistIsOpen && this.hasSublist) {
            this._addClassToElement('is-selected');
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.changeSubListIsOpen();
        }
    }
    /**
     * @return {?}
     */
    changeSubListIsOpen() {
        if (this.hasSublist) {
            this.sublistIsOpen = !this.sublistIsOpen;
            this.onSubListOpenChange.emit(this.sublistIsOpen);
            this.ngOnChanges();
        }
    }
}
SideNavigationLinkDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-side-nav-link]',
            },] }
];
/** @nocollapse */
SideNavigationLinkDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
];
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
class SideNavigationSublistDirective {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.sublistIsOpen = false;
    }
    /**
     * @param {?} sublistIsOpen
     * @return {?}
     */
    subListIsOpenChange(sublistIsOpen) {
        this.sublistIsOpen = sublistIsOpen;
        this.elementRef.nativeElement.setAttribute('aria-hidden', !this.sublistIsOpen);
    }
}
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
SideNavigationSublistDirective.ctorParameters = () => [
    { type: ElementRef }
];

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
class SideNavigationItemComponent {
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.linkElement && this.subListElement) {
            /** After view content check if there is flag with opened true */
            this.subListElement.subListIsOpenChange(this.linkElement.sublistIsOpen);
            this.subListOpenChanged$ = this.linkElement.onSubListOpenChange.subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            isOpen => {
                this.subListElement.subListIsOpenChange(isOpen);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subListOpenChanged$) {
            this.subListOpenChanged$.unsubscribe();
        }
    }
}
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
class SideNavigationSubitemDirective {
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
class SideNavigationSublinkDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SideNavigationModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to represent an option of the select component.
 */
class OptionComponent {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.selected && !this.disabled) {
            this.focus();
        }
    }
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @return {?}
     */
    get viewValueText() {
        return this.viewValue ? this.viewValue :
            (((/** @type {?} */ (this.elRef.nativeElement))).textContent || '').trim();
    }
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    setSelected(value, fireEvent = true) {
        this.selected = value;
        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    }
    /**
     * Focuses the element.
     * @return {?}
     */
    focus() {
        ((/** @type {?} */ (this.elRef.nativeElement))).focus();
    }
    /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    getHtmlElement() {
        return (/** @type {?} */ (this.elRef.nativeElement));
    }
    /**
     * @hidden
     * @return {?}
     */
    selectionHandler() {
        if (!this.selected && !this.disabled) {
            this.selected = true;
            this.selectedChange.emit(this);
        }
    }
}
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
OptionComponent.ctorParameters = () => [
    { type: ElementRef }
];
OptionComponent.propDecorators = {
    fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }],
    selected: [{ type: HostBinding, args: ['class.is-selected',] }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    viewValue: [{ type: Input }],
    selectedChange: [{ type: Output }],
    selectionHandler: [{ type: HostListener, args: ['keydown.enter',] }, { type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Select component intended to mimic the behaviour of the native select element.
 */
class SelectComponent {
    constructor() {
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
        () => {
            /** @type {?} */
            const options = this.options;
            if (options) {
                return options.changes.pipe(startWith(options), switchMap((/**
                 * @return {?}
                 */
                () => merge(...options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                option => option.selectedChange))))));
            }
        }))));
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    isOpenChangeHandle(isOpen) {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.value) {
                    this.selectValue(this.value, false);
                }
            }));
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        // If the observable state changes, reset the options and initialize selection.
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.resetOptions();
            this.initSelection();
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Toggles the open state of the select.
     * @return {?}
     */
    toggle() {
        if (this.isOpen && !this.disabled) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Opens the select popover body.
     * @return {?}
     */
    open() {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Closes the select popover body.
     * @return {?}
     */
    close() {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this.selectValue(value, false);
        }
        else {
            // Defer the selection of the value to support forms
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                if (this.options) {
                    this.selectValue(value, false);
                }
            }));
        }
    }
    /**
     * Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder.
     * @return {?}
     */
    get triggerValue() {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
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
    }
    /**
     * @hidden
     * @return {?}
     */
    resizeScrollHandler() {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    }
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    selectOption(option, fireEvents = true) {
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
    }
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    selectValue(value, fireEvents = true) {
        /** @type {?} */
        const matchOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
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
    }
    /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    updateValue(fireEvents = true) {
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }
    /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    resetOptions() {
        // Create observable that fires when the options change or the component is destroyed.
        /** @type {?} */
        const destroyCurrentObs = merge(this.options.changes, this.destroy$);
        // Subscribe to observable defined in component properties which fires when an option is clicked.
        // Destroy if the observable defined above triggers.
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => {
            this.selectOption(instance);
        }));
    }
    /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    initSelection() {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    }
    /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    isOptionActive(option) {
        return option && this.selected && option === this.selected;
    }
    /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    incrementFocused() {
        // Get active focused element
        /** @type {?} */
        const activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        const correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            return option.getHtmlElement() === activeElement;
        }));
        if (correspondingOption) {
            /** @type {?} */
            const arrayOptions = this.options.toArray();
            /** @type {?} */
            const index = arrayOptions.indexOf(correspondingOption);
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
    }
    /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    decrementFocused() {
        // Get active focused element
        /** @type {?} */
        const activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        const correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            return option.getHtmlElement() === activeElement;
        }));
        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            /** @type {?} */
            const arrayOptions = this.options.toArray();
            /** @type {?} */
            const index = arrayOptions.indexOf(correspondingOption);
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
    }
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    unselectOptions() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            this.selected = undefined;
            this.value = undefined;
            this.valueChange.emit(undefined);
            this.onChange(undefined);
        }));
    }
}
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
                        () => SelectComponent)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectModule {
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
class SplitButtonActionTitle {
}
SplitButtonActionTitle.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-action-title]'
            },] }
];
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
class SplitButtonMenuDirective {
}
SplitButtonMenuDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-menu]',
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
class SplitButtonLoadActionTitle {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
SplitButtonLoadActionTitle.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-load-action-title]'
            },] }
];
/** @nocollapse */
SplitButtonLoadActionTitle.ctorParameters = () => [
    { type: ViewContainerRef }
];
SplitButtonLoadActionTitle.propDecorators = {
    content: [{ type: Input, args: ['fd-split-button-load-action-title',] }]
};

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
class SplitButtonComponent {
    constructor() {
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
     *
     * @param {?} $event
     * @return {?}
     */
    buttonClick($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
    }
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Closes the popover.
     * @return {?}
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    open() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SplitButtonModule {
}
SplitButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, PopoverModule],
                declarations: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle],
                exports: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle]
            },] }
];

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
class TableDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdTableClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
class ColumnSortableDirective {
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
class TableResponsiveWrapperDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TableModule {
}
TableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective],
                exports: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective]
            },] }
];

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
class TabTitleDirective {
}
TabTitleDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-title]'
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
class TabLoadTitleDirective {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
TabLoadTitleDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-load-title]'
            },] }
];
/** @nocollapse */
TabLoadTitleDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TabLoadTitleDirective.propDecorators = {
    content: [{ type: Input, args: ['fd-tab-load-title',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let tabPanelUniqueId = 0;
/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
class TabPanelComponent {
    constructor() {
        /**
         * Id of the tab. If none is provided, one will be generated.
         */
        this.id = 'fd-tab-panel' + tabPanelUniqueId++;
        /**
         * @hidden
         */
        this.expanded = false;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service that is responsible for providing keyboard actions support
 *
 */
class TabsService {
    constructor() {
        /**
         * Event is thrown always when tab is selected by keyboard actions
         */
        this.tabSelected = new Subject();
    }
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @param {?} elements
     * @return {?}
     */
    tabHeaderKeyHandler(index, event, elements) {
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
    }
    /**
     * @hidden
     * @private
     * @param {?} index
     * @param {?} elements
     * @return {?}
     */
    getTabLinkFromIndex(index, elements) {
        return elements[index];
    }
}
TabsService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents a list of tab-panels.
 */
class TabListComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.selectTab(this.selectedIndex);
        }));
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            if (index !== this.selectedIndex) {
                this.selectTab(index);
            }
        }));
        this._tabsSubscription = this.panelTabs.changes.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this._tabsSubscription.unsubscribe();
        this._tabSelectSubscription.unsubscribe();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.selectedIndex) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.selectTab(changes.selectedIndex.currentValue);
            }));
        }
    }
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    selectTab(tabIndex) {
        if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.panelTabs.forEach((/**
             * @param {?} tab
             * @param {?} index
             * @return {?}
             */
            (tab, index) => {
                tab.expanded = index === tabIndex;
            }));
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
        }
    }
    /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    tabHeaderClickHandler(tabIndex) {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    }
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    tabHeaderKeyHandler(index, event) {
        this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.nativeElement)));
    }
    /**
     * @private
     * @return {?}
     */
    isIndexInRange() {
        return this.panelTabs && this.panelTabs.length > 0 && this.selectedIndex < this.panelTabs.length;
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isTargetTabEnabled(index) {
        return !this.panelTabs.toArray()[index].disabled;
    }
    /**
     * @private
     * @return {?}
     */
    isTabContentEmpty() {
        /** @type {?} */
        let result = true;
        this.panelTabs.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            if (tab.expanded) {
                result = false;
            }
        }));
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    resetTabHook() {
        this.selectedIndex = 0;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.selectTab(this.selectedIndex);
        }));
    }
}
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
TabListComponent.ctorParameters = () => [
    { type: TabsService }
];
TabListComponent.propDecorators = {
    panelTabs: [{ type: ContentChildren, args: [TabPanelComponent,] }],
    tabLinks: [{ type: ViewChildren, args: ['tabLink',] }],
    selectedIndex: [{ type: Input }],
    selectedIndexChange: [{ type: Output }]
};

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
class TabLinkDirective extends AbstractFdNgxClass {
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
class TabItemDirective {
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
class TabNavDirective {
    /**
     * @hidden
     * @param {?} renderer
     * @param {?} tabsService
     */
    constructor(renderer, tabsService) {
        this.renderer = renderer;
        this.tabsService = tabsService;
        /**
         * Event Thrown every time something is clicked
         */
        this.onKeyDown = new EventEmitter();
    }
    /**
     * Function that gives possibility to get all the link directives, with and without nav__item wrapper
     * @return {?}
     */
    get tabLinks() {
        /** @type {?} */
        let tabLinks = [];
        if (this.links) {
            tabLinks = tabLinks.concat(this.links.map((/**
             * @param {?} link
             * @return {?}
             */
            link => link)));
        }
        if (this.items) {
            tabLinks = tabLinks.concat(this.items.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item.linkItem)).map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.linkItem)));
        }
        return tabLinks;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.selectTab(index);
        }));
        this.tabLinks.forEach((/**
         * @param {?} linkElement
         * @param {?} index
         * @return {?}
         */
        (linkElement, index) => {
            this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                link => link.elementRef.nativeElement)));
            }));
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this._tabSelectSubscription.unsubscribe();
    }
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    selectTab(tabIndex) {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    }
}
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
TabNavDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: TabsService }
];
TabNavDirective.propDecorators = {
    links: [{ type: ContentChildren, args: [TabLinkDirective,] }],
    items: [{ type: ContentChildren, args: [TabItemDirective,] }],
    onKeyDown: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TabsModule {
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
class TileComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the tile is disabled.
         */
        this.disabled = false;
        /**
         * Whether the tile is rendered as a button.
         */
        this.isButton = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
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
    }
}
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
TileComponent.ctorParameters = () => [
    { type: ElementRef }
];
TileComponent.propDecorators = {
    disabled: [{ type: Input }],
    isButton: [{ type: Input }],
    rowSpan: [{ type: Input }],
    columnSpan: [{ type: Input }],
    colorAccent: [{ type: Input }]
};

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
class TileContentDirective {
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
class TileTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdTileTitleClass = true;
    }
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
class TileMediaDirective {
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
class TileActionsDirective {
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
class ProductTileComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the product tile is disabled.
         */
        this.disabled = false;
        /**
         * Whether the product tile is rendered as a button.
         */
        this.isButton = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }
}
ProductTileComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-product-tile',
                host: {
                    '[attr.role]': '(this.isButton === true ? "button" : "")',
                    '[class.fd-product-tile-custom]': 'true'
                },
                template: "<ng-content select=\"[fd-product-tile-media]\"></ng-content>\n<ng-content select=\"[fd-product-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-product-tile-custom {
            display: block;
        }
    `]
            }] }
];
/** @nocollapse */
ProductTileComponent.ctorParameters = () => [
    { type: ElementRef }
];
ProductTileComponent.propDecorators = {
    disabled: [{ type: Input }],
    isButton: [{ type: Input }]
};

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
class ProductTileMediaDirective extends AbstractFdNgxClass {
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
        this._addClassToElement('fd-product-tile__media');
        if (this.photo) {
            this._addStyleToElement('background-image', 'url(' + this.photo + ')');
        }
    }
}
ProductTileMediaDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-product-tile-media]',
            },] }
];
/** @nocollapse */
ProductTileMediaDirective.ctorParameters = () => [
    { type: ElementRef }
];
ProductTileMediaDirective.propDecorators = {
    photo: [{ type: Input }]
};

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
class ProductTileContentDirective {
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
class ProductTileTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdProductTileTitleClass = true;
    }
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
class TileGridDirective extends AbstractFdNgxClass {
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
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    }
}
TileGridDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tile-grid]'
            },] }
];
/** @nocollapse */
TileGridDirective.ctorParameters = () => [
    { type: ElementRef }
];
TileGridDirective.propDecorators = {
    col: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TileModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeChildComponent {
    constructor() {
        this.editClicked = new EventEmitter();
        this.deleteClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideChildren = false;
    }
    /**
     * @param {?=} hideAll
     * @return {?}
     */
    toggleDisplayChildren(hideAll) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        }
        else {
            this.hideChildren = !this.hideChildren;
        }
    }
    /**
     * @param {?=} variable
     * @return {?}
     */
    typeOf(variable) {
        /** @type {?} */
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        }
        else if (typeof variable === 'object') {
            retVal = 'object';
        }
        return retVal;
    }
    /**
     * @param {?=} row
     * @return {?}
     */
    editTreeItem(row) {
        if (row) {
            this.editClicked.emit(row);
        }
    }
    /**
     * @param {?=} row
     * @return {?}
     */
    deleteTreeItem(row) {
        if (row) {
            this.deleteClicked.emit(row);
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeComponent {
    constructor() {
        this.editRowClicked = new EventEmitter();
        this.deleteRowClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideAll = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => {
                this.getChildDepth(row, 0);
                this.handleEmptyTrailingCells(row); // handle empty cells for parents
            }));
        }
    }
    /**
     * @return {?}
     */
    toggleDisplayAll() {
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach((/**
         * @param {?} child
         * @return {?}
         */
        child => {
            child.toggleDisplayChildren(this.hideAll);
        }));
    }
    /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    getChildDepth(row, depth) {
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => {
                this.getChildDepth(child, depth + 1);
                this.handleEmptyTrailingCells(child); // handle empty cells for children
            }));
        }
    }
    /**
     * @param {?} row
     * @return {?}
     */
    handleEmptyTrailingCells(row) {
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
    }
    /**
     * @param {?} row
     * @return {?}
     */
    editClicked(row) {
        this.editRowClicked.emit(row);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    deleteClicked(row) {
        this.deleteRowClicked.emit(row);
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TreeModule {
}
TreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TreeComponent, TreeChildComponent],
                imports: [CommonModule, ButtonModule, IconModule, PopoverModule, MenuModule],
                exports: [TreeComponent, TreeChildComponent]
            },] }
];

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
class TimeFormatParser {
}
TimeFormatParser.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: TIME_FORMAT_FACTORY
            },] }
];
/** @nocollapse */ TimeFormatParser.ngInjectableDef = defineInjectable({ factory: TIME_FORMAT_FACTORY, token: TimeFormatParser, providedIn: "root" });
/**
 * Default implementation of the DateFormatParser service.
 */
class TimeFormatParserDefault extends TimeFormatParser {
    /**
     * Takes in a string representation of a date and returns a Time object.
     * @param {?} value String to convert to a time object.
     * @param {?=} displaySeconds boolean to define if string should display seconds.
     * @param {?=} meridian boolean to define if string should be treated as a meridian.
     * @return {?}
     */
    parse(value, displaySeconds = true, meridian) {
        /** @type {?} */
        const time = new TimeObject();
        /** @type {?} */
        let regexp;
        if (!meridian) {
            if (displaySeconds) {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])$/;
            }
            else {
                regexp = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
            }
            if (regexp.test(value)) {
                /** @type {?} */
                const splitString = value.split(':');
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
                const period = value.split(' ')[1];
                /** @type {?} */
                const splitString = value.split(':');
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
    }
    /**
     * Takes in a time object and returns the string representation.
     * @param {?} time TimeObject to convert to a string.
     * @param {?=} meridian boolean to define if TimeObject should be treated as a meridian.
     * @return {?}
     */
    format(time, meridian) {
        /** @type {?} */
        let formattedHour;
        /** @type {?} */
        let formattedMinute;
        /** @type {?} */
        let formattedSecond;
        /** @type {?} */
        let formattedTime;
        /** @type {?} */
        let formattedMeridian;
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
    }
}
TimeFormatParserDefault.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePickerComponent {
    /**
     * @hidden
     * @param {?} cd
     * @param {?} timeAdapter
     */
    constructor(cd, timeAdapter) {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.placeholder = this.getPlaceholder();
    }
    /**
     * Returns the current value of the time input.
     * @return {?}
     */
    getTime() {
        return this.time;
    }
    /**
     * @hidden
     * @return {?}
     */
    getFormattedTime() {
        /** @type {?} */
        const formattedTime = this.timeAdapter.format(this.time, this.meridian);
        return formattedTime !== undefined ? formattedTime : '';
    }
    /**
     * @hidden
     * @param {?} timeFromInput
     * @return {?}
     */
    timeInputChanged(timeFromInput) {
        /** @type {?} */
        const time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.meridian);
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
    }
    /**
     * @hidden
     * @param {?} $event
     * @return {?}
     */
    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    addOnButtonClicked() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    popoverClosed() {
        this.isOpen = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    getPlaceholder() {
        /** @type {?} */
        let retVal;
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
    }
    /**
     * @hidden
     * @return {?}
     */
    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    writeValue(time) {
        if (!time) {
            return;
        }
        this.time = time;
    }
}
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
                        () => TimePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-timepicker-custom{display:inline-block}.fd-timepicker-custom fd-popover{display:block}.fd-timepicker-custom fd-time{width:auto}"]
            }] }
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TimeFormatParser }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePickerModule {
}
TimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimePickerComponent],
                imports: [CommonModule, FormsModule, PopoverModule, InputGroupModule, TimeModule],
                exports: [TimePickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let toggleUniqueId = 0;
/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
class ToggleComponent {
    constructor() {
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
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }
    /**
     * Set focus on the input element.
     * @return {?}
     */
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Get the id of the inner input element of the toggle.
     * @return {?}
     */
    get innerInputId() {
        return `${this.id}-input`;
    }
    /**
     * Get the isChecked property of the toggle.
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Set the isChecked property of the toggle.
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
    }
    /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    writeValue(value) {
        this.checked = value;
    }
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
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
                        () => ToggleComponent)),
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ToggleModule {
}
ToggleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ToggleComponent],
                imports: [CommonModule, FormsModule],
                exports: [ToggleComponent]
            },] }
];

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
class LocalizationEditorInputDirective {
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
/**
 * Directive which is used along with textarea elements, inside the localization editor item or main.
 *  ```html
 *  <fd-localization-editor-item>
 *      <textarea fd-localization-editor-input placeholder="EN">
 *  </fd-localization-editor-item>
 *  ```
 */
class LocalizationEditorTextareaDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdLocalizationEditorTextareaClass = true;
    }
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
class LocalizationEditorLabel {
}
LocalizationEditorLabel.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-label]',
            },] }
];
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
class LocalizationEditorElement {
}
LocalizationEditorElement.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-element]',
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
class LocalizationEditorLoadLabel {
    /**
     * @hidden
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
LocalizationEditorLoadLabel.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-localization-editor-load-label]'
            },] }
];
/** @nocollapse */
LocalizationEditorLoadLabel.ctorParameters = () => [
    { type: ViewContainerRef }
];
LocalizationEditorLoadLabel.propDecorators = {
    content: [{ type: Input, args: ['fd-localization-editor-load-label',] }]
};

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
class LocalizationEditorItemComponent {
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this.refreshChildInput();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.refreshChildInput();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.textarea) {
            this.type = 'textarea';
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshChildInput() {
        if (this.input) {
            this.input.compact = this.compact;
        }
        if (this.textarea) {
            this.textarea.compact = this.compact;
        }
    }
}
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
class LocalizationEditorMainComponent extends LocalizationEditorItemComponent {
}
LocalizationEditorMainComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-localization-editor-main',
                template: "<div class=\"fd-input-group fd-input-group--after\"\n     [ngClass]=\"{'fd-input-group--compact' : compact}\"\n>\n    <ng-content select=\"[fd-localization-editor-input]\"></ng-content>\n    <ng-content select=\"[fd-localization-editor-textarea]\"></ng-content>\n    <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\"\n          [ngClass]=\"(type ? 'fd-input-group__addon--' + type : '')\">\n        <button class=\"fd-button--light fd-localization-editor__button\" aria-haspopup=\"true\"\n                [attr.aria-expanded]=\"expanded\">\n            <ng-container *ngIf=\"labelTemplate\">\n                <ng-container [fd-localization-editor-load-label]=\"labelTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!labelTemplate\">\n                {{label}}\n            </ng-container>\n        </button>\n    </span>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

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
class LocalizationEditorComponent {
    constructor() {
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
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Closes the popover.
     * @return {?}
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    open() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     * @param {?} opened
     * @return {?}
     */
    handleOpenChange(opened) {
        if (this.mainElement) {
            this.mainElement.expanded = opened;
        }
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocalizationEditorModule {
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
class MegaMenuComponent {
}
MegaMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-mega-menu',
                template: "<nav class=\"fd-mega-menu\">\n    <ng-content></ng-content>\n</nav>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            }] }
];

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
class MegaMenuSublinkDirective {
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
MegaMenuSublinkDirective.ctorParameters = () => [
    { type: ElementRef }
];
MegaMenuSublinkDirective.propDecorators = {
    fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__sublink',] }]
};

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
class MegaMenuSubitemDirective {
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
class MegaMenuLinkDirective {
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
class MegaMenuItemComponent {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} menuKeyboardService
     * @param {?} changeDetectionRef
     */
    constructor(elRef, menuKeyboardService, changeDetectionRef) {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    handleKeyboardEvent(event) {
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
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        /** Check if click wasn't inside the component, then close. */
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closeSubList();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onResize() {
        if (this.open && this.isSubListPositionRight()) {
            this.changeDetectionRef.detectChanges();
            /** @type {?} */
            let distanceFromCorner = this.subList.nativeElement.getBoundingClientRect().right;
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
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        this.link.hasChild = this.subItems.length > 0;
        this.subItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => item.keyDown
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        (keyboardEvent) => this.handleSubListKeyDown(keyboardEvent, index)))));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * Keyboard events handler from sublist, the event doesn't propagate upper, when it was ArrowDown or ArrowUp.
     * It prevents from changing focus to item on primary menu list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleSubListKeyDown(event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.subItems.toArray());
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.stopPropagation();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    click() {
        this.link.click();
    }
    /**
     * @hidden
     * @return {?}
     */
    focus() {
        this.link.focus();
    }
    /**
     * Method that informs if actual position of sublist is set to right
     * @return {?}
     */
    isSubListPositionRight() {
        return this.subListPosition === 'right';
    }
    /**
     * Method that changes state of open variable
     * @return {?}
     */
    toggleOpen() {
        if (this.open) {
            this.closeSubList();
        }
        else {
            this.openSubList();
        }
    }
    /**
     * Method that closes sublist
     * @return {?}
     */
    closeSubList() {
        this.open = false;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
    }
    /**
     * Method that opens sublist
     * @return {?}
     */
    openSubList() {
        this.open = true;
        this.link.isExpanded = this.isShow();
        this.openChange.emit(this.open);
        this.onResize();
    }
    /**
     * Method that gives information if the sublist should behave like it is opened.
     * @return {?}
     */
    isShow() {
        return this.open && this.subItems.length > 0;
    }
    /**
     * Method that helps with the responsive support. Gives percentage number of left css attribute on list.
     * @private
     * @return {?}
     */
    getLeftPropertyFromSubList() {
        /** @type {?} */
        const styles = getComputedStyle(this.subList.nativeElement);
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
    }
}
MegaMenuItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-mega-menu-item',
                template: "<li class=\"fd-mega-menu__item\" (click)=\"toggleOpen()\" #parentElement>\n    <ng-content select=\"[fd-mega-menu-link]\"></ng-content>\n    <ng-content></ng-content>\n    <ul class=\"fd-mega-menu__sublist\"\n        #subList\n        [attr.aria-hidden]=\"!isShow()\"\n        [ngClass]=\"{'fd-mega-menu__sublist--left': !isSubListPositionRight()}\"\n        (click)=\"$event.stopPropagation()\">\n        <ng-content select=\"[fd-mega-menu-subitem]\"></ng-content>\n    </ul>\n</li>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-mega-menu__sublist{right:initial;left:100%;z-index:2;margin-top:4px}.fd-mega-menu__sublist--left{right:100%;left:initial}.fd-mega-menu__item{cursor:pointer}.fd-mega-menu__item .fd-mega-menu__link{position:relative}.fd-mega-menu__item .fd-mega-menu__link:focus{z-index:1}ul.fd-mega-menu__sublist{margin-left:-4px}"]
            }] }
];
/** @nocollapse */
MegaMenuItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MenuKeyboardService },
    { type: ChangeDetectorRef }
];
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
class MegaMenuListDirective {
    /**
     * @hidden
     * @param {?} menuKeyboardService
     */
    constructor(menuKeyboardService) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        this.items.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => item.keyDown
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        (keyboardEvent) => this.handleListKeyDown(keyboardEvent, index)))));
    }
    /**
     * Method that provides handles keydown events from menu item list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleListKeyDown(event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.items.toArray());
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
MegaMenuListDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-mega-menu-list]'
            },] }
];
/** @nocollapse */
MegaMenuListDirective.ctorParameters = () => [
    { type: MenuKeyboardService }
];
MegaMenuListDirective.propDecorators = {
    fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__list',] }],
    items: [{ type: ContentChildren, args: [MegaMenuItemComponent,] }]
};

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
class MegaMenuGroupComponent {
}
MegaMenuGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-mega-menu-group',
                template: "<div class=\"fd-mega-menu__group\">\n    <ng-content select=\"[fd-mega-menu-title]\"></ng-content>\n    <ng-content select=\"[fd-mega-menu-list]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MegaMenuTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.fdMegaMenuTitleClass = true;
    }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MegaMenuModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FundamentalNgxCoreModule {
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
class DefaultMenuItem {
}

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
class ModalPosition {
}

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