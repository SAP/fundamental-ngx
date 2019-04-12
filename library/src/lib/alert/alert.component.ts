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
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import { AlertRef } from './alert-utils/alert-ref';
import { alertFadeNgIf } from './alert-utils/alert-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The component that represents an alert. It can be only be used inline.
 * If the AlertService is used, this component is auto-generated.
 */
@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    providers: [HashService],
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[style.width]': 'width',
        'role': 'alert',
        '[attr.id]': 'id',
        '(mouseenter)': 'handleAlertMouseEvent($event)',
        '(mouseleave)': 'handleAlertMouseEvent($event)',
        '[@fadeAlertNgIf]': ''
    },
    animations: [
        alertFadeNgIf
    ]
})
export class AlertComponent extends AbstractFdNgxClass implements OnInit, AfterViewInit {

    /** @hidden */
    @ViewChild('container', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    /** @Input Whether the alert is dismissible. */
    @Input()
    dismissible: boolean = true;

    /** @Input The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null. */
    @Input()
    type: string;

    /** @Input Id for the alert component. If omitted, a unique one is generated. */
    @Input()
    id: string;

    /** @Input Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite. */
    @Input()
    duration: number = 10000;

    /** @Input Whether the alert should stay open if the mouse is hovering over it. */
    @Input()
    mousePersist: boolean = false;

    /** @Input Id of the element that labels the alert. */
    @Input()
    ariaLabelledBy: string = null;

    /** @Input Aria label for the alert component element. */
    @Input()
    ariaLabel: string = null;

    /** @Input Width of the alert. */
    @Input()
    width: string;

    /** @Input Alternative way of passing in a message to the alert. */
    @Input()
    message: string;

    /** @Output Event fired when the alert is dismissed. */
    @Output()
    onDismiss: EventEmitter<undefined> = new EventEmitter<undefined>();

    /** @hidden */
    mouseInAlert: boolean = false;

    /** @hidden */
    componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    /** @hidden */
    childComponentType: Type<any> | TemplateRef<any> | string;

    /** @hidden */
    constructor(private hasher: HashService,
                private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private alertRef: AlertRef) {
        super(elRef);
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.alertRef) {
            this.open();
        }
        this._setProperties();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadFromComponent(this.childComponentType);
            } else if (this.childComponentType instanceof TemplateRef) {
                this.loadFromTemplate(this.childComponentType);
            } else {
                this.loadFromString(this.childComponentType);
            }
            this.cdRef.detectChanges();
        }
    }

    /**
     * Dismisses the alert. If the alert was generated via the AlertService, it is removed from the DOM.
     * Otherwise, it sets the display value to none. Fires the onDismiss event.
     * @param manualDismiss Set to true to skip the dismiss animation.
     */
    dismiss(manualDismiss: boolean = false): void {
        if (manualDismiss) {
            this.elRef.nativeElement.style.display = 'none';
        }
        if (this.alertRef) {
            this.alertRef.dismiss();
        } else {
            this.elRef.nativeElement.style.display = 'none';
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
            this.elRef.nativeElement.style.display = 'block';
        }

        if (this.duration >= 0) {
            setTimeout(() => {
                if (this.mousePersist) {
                    const wait = () => {
                        if (this.mouseInAlert === true) {
                            setTimeout(wait, 500);
                        } else {
                            this.dismiss();
                        }
                    };
                    wait();
                } else {
                    this.dismiss();
                }
            }, this.duration);
        }
    }

    /** @hidden */
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
    }

    private loadFromTemplate(template: TemplateRef<any>): void {
        const context = {
            $implicit: this.alertRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(template, context);
    }

    private loadFromComponent(componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    private loadFromString(contentString: string): void {
        this.containerRef.clear();
        this.message = contentString;
    }

}
