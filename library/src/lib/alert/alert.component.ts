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
import { AlertRef } from './alert-ref';
import { alertFadeNgIf } from './alert-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

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

    @ViewChild('container', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    @Input()
    dismissible: boolean = true;

    @Input()
    type: string;

    @Input()
    id: string;

    @Input()
    persist: boolean = false;

    @Input()
    duration: number = 10000;

    @Input()
    mousePersist: boolean = false;

    @Input()
    ariaLabelledBy: string = null;

    @Input()
    ariaLabel: string = null;

    @Input()
    width: string;

    @Input()
    message: string;

    @Output()
    onDismiss: EventEmitter<undefined> = new EventEmitter<undefined>();

    mouseInAlert: boolean = false;
    componentRef: ComponentRef<any> | EmbeddedViewRef<any>;
    childComponentType: Type<any> | TemplateRef<any> | string;

    constructor(private hasher: HashService,
                private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private alertRef: AlertRef) {
        super(elRef);
    }

    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.alertRef) {
            this.open();
        }
        this._setProperties();
    }

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

    handleAlertMouseEvent(event): void {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        } else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    }

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
