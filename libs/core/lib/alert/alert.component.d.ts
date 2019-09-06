import { OnInit, ElementRef, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Type, AfterViewInit, ViewContainerRef, TemplateRef, EmbeddedViewRef, EventEmitter, NgZone } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import { AlertRef } from './alert-utils/alert-ref';
/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
export declare class AlertComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit {
    private elRef;
    private cdRef;
    private componentFactoryResolver;
    private ngZone;
    private alertRef;
    /** @hidden */
    containerRef: ViewContainerRef;
    /** Whether the alert is dismissible. */
    dismissible: boolean;
    /** The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    type: string;
    /** Id for the alert component. If omitted, a unique one is generated. */
    id: string;
    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    duration: number;
    /** Whether the alert should stay open if the mouse is hovering over it. */
    mousePersist: boolean;
    /** Id of the element that labels the alert. */
    ariaLabelledBy: string;
    /** Aria label for the alert component element. */
    ariaLabel: string;
    /** Aria label for the dismiss button. */
    dismissLabel: string;
    /** Width of the alert. */
    width: string;
    /** Minimum width of the alert. */
    minWidth: string;
    /** Alternative way of passing in a message to the alert. */
    message: string;
    /** Event fired when the alert is dismissed. */
    onDismiss: EventEmitter<undefined>;
    /** @hidden */
    mouseInAlert: boolean;
    /** @hidden */
    componentRef: ComponentRef<any> | EmbeddedViewRef<any>;
    /** @hidden */
    childComponentType: Type<any> | TemplateRef<any> | string;
    /** @hidden */
    constructor(elRef: ElementRef, cdRef: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone, alertRef: AlertRef);
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngAfterViewInit(): void;
    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param manualDismiss Set to true to skip the dismiss animation.
     * @param reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     */
    dismiss(reason?: any, manualDismiss?: boolean): void;
    /**
     * Opens the alert.
     */
    open(): void;
    /** @hidden */
    handleAlertMouseEvent(event: any): void;
    /** @hidden */
    _setProperties(): void;
    private loadFromTemplate;
    private loadFromComponent;
    private loadFromString;
}
