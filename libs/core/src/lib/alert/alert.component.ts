import {
    Component,
    Input,
    OnInit,
    ElementRef,
    ChangeDetectorRef,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    Type,
    AfterViewInit,
    ViewContainerRef,
    TemplateRef,
    Optional,
    EmbeddedViewRef,
    Output,
    EventEmitter,
    ViewEncapsulation,
    HostListener,
    NgZone,
    ChangeDetectionStrategy
} from '@angular/core';
import { alertFadeNgIf } from './alert-utils/alert-animations';
import { AbstractFdNgxClass, Nullable } from '@fundamental-ngx/cdk/utils';
import { AlertRef } from './alert-utils/alert-ref';
import { AlertConfig } from './alert-utils/alert-config';

let alertUniqueId = 0;

/**
 * @deprecated
 * Alert component is depricated since version 0.16.0
 * Message Strip component should be used instead.
 *
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        role: 'alert',
        '[attr.id]': 'id',
        '[@fadeAlertNgIf]': ''
    },
    animations: [alertFadeNgIf],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('container', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    /** Whether the alert is dismissible. */
    @Input()
    dismissible = true;

    /** The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    @Input()
    type: string;

    /** Id for the alert component. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-alert-' + alertUniqueId++;

    /** Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    @Input()
    duration = 10000;

    /** Whether the alert should stay open if the mouse is hovering over it. */
    @Input()
    mousePersist = false;

    /** Id of the element that labels the alert. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Aria label for the alert component element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Aria label for the dismiss button. */
    @Input()
    dismissLabel = 'Dismiss';

    /** Width of the alert. */
    @Input()
    width: string;

    /** Minimum width of the alert. */
    @Input()
    minWidth: string;

    /** Alternative way of passing in a message to the alert. */
    @Input()
    message: string;

    /** Event fired when the alert is dismissed. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDismiss: EventEmitter<undefined> = new EventEmitter<undefined>();

    /** @hidden */
    mouseInAlert = false;

    /** @hidden */
    componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    childContent: Type<any> | TemplateRef<any> | string | undefined = undefined;

    /** @hidden */
    constructor(
        private elRef: ElementRef,
        private cdRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private ngZone: NgZone,
        @Optional() private alertConfig: AlertConfig,
        @Optional() private alertRef: AlertRef
    ) {
        super(elRef);
        this._setAlertConfig(alertConfig);
        this._setProperties();
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.alertRef) {
            this.open();
        }
        this._setProperties();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.childContent) {
            if (this.childContent instanceof Type) {
                this.loadFromComponent(this.childContent);
            } else if (this.childContent instanceof TemplateRef) {
                this.loadFromTemplate(this.childContent);
            } else {
                this.loadFromString(this.childContent);
            }
            this.cdRef.detectChanges();
        }
    }

    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     *
     * @param manualDismiss Set to true to skip the dismiss animation.
     * @param reason Data to pass back to the calling component. Only usable if alert is opened using the Service.
     *
     */
    dismiss(reason?: any, manualDismiss: boolean = false): void {
        if (manualDismiss) {
            this.elRef.nativeElement.classList.add('fd-has-display-none');
            this.elRef.nativeElement.classList.remove('fd-has-display-block');
        }
        if (this.alertRef) {
            this.alertRef.dismiss(reason);
        } else {
            this.elRef.nativeElement.classList.add('fd-has-display-none');
            this.elRef.nativeElement.classList.remove('fd-has-display-block');
        }
        this.onDismiss.emit();
    }

    /**
     * Opens the alert.
     */
    open(): void {
        if (!this.alertRef) {
            if (this.elRef.nativeElement.style.display === 'block') {
                return;
            }
            this.elRef.nativeElement.classList.remove('fd-has-display-none');
            this.elRef.nativeElement.classList.add('fd-has-display-block');
        }

        if (this.duration >= 0) {
            this.ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.mousePersist) {
                        const wait = (): void => {
                            if (this.mouseInAlert === true) {
                                setTimeout(wait, 500);
                            } else {
                                this.ngZone.run(() => this.dismiss());
                            }
                        };
                        wait();
                    } else {
                        this.ngZone.run(() => this.dismiss());
                    }
                }, this.duration);
            });
        }
    }

    /** @hidden */
    @HostListener('mouseenter', ['$event'])
    @HostListener('mouseleave', ['$event'])
    handleAlertMouseEvent(event): void {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        } else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    }

    /** @hidden */
    _setProperties(): void {
        this._addClassToElement('fd-alert');
        if (this.type) {
            this._addClassToElement('fd-alert--' + this.type);
        }
        if (this.dismissible) {
            this._addClassToElement('fd-alert--dismissible');
        }
    }

    /** @hidden */
    private loadFromTemplate(template: TemplateRef<any>): void {
        const context = {
            $implicit: this.alertRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(template, context);
    }

    /** @hidden */
    private loadFromComponent(componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    /** @hidden */
    private loadFromString(contentString: string): void {
        this.containerRef.clear();
        this.message = contentString;
    }

    /** @hidden */
    private _setAlertConfig(alertConfig: AlertConfig): void {
        Object.keys(alertConfig || {})
            .filter((key) => key !== 'data' && key !== 'container')
            .forEach((key) => (this[key] = alertConfig[key]));
    }
}
