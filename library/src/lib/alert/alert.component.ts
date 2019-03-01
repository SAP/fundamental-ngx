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
    OnDestroy,
    AfterViewInit,
    ViewContainerRef,
    TemplateRef,
    Optional,
    HostBinding
} from '@angular/core';
import { HashService } from '../utils/hash.service';
import { AlertRef } from './alert-ref';
import { alertFadeNgIf } from './alert-animations';

@Component({
    selector: 'fd-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    providers: [HashService],
    host: {
        '[class]': '"fd-alert" + (type ? " fd-alert--" + type : "")',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        '[style.width]': '(width ? width : "33vw")',
        'role': 'alert',
        '[attr.id]': 'id',
        '(mouseenter)': 'handleAlertMouseEvent($event)',
        '(mouseleave)': 'handleAlertMouseEvent($event)'
    },
    animations: [
        alertFadeNgIf
    ]
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {

    @HostBinding('@fadeAlertNgIf')

    @ViewChild('container', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    @Input()
    dismissible: boolean;

    @Input()
    type: string;

    @Input()
    id: string;

    @Input()
    persist: boolean = false;

    @Input()
    visibleTime: number = 10000;

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

    @Input()
    show: boolean = true;

    mouseInAlert: boolean = false;

    componentRef: ComponentRef<any>;
    childComponentType: Type<any> | TemplateRef<any> | string;

    constructor(private hasher: HashService,
                private elRef: ElementRef,
                private cd: ChangeDetectorRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                @Optional() private alertRef: AlertRef) {}

    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hasher.hash();
        }

        if (this.alertRef || this.show) {
            this.open();
        }
    }

    ngAfterViewInit(): void {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadChildComponent(this.childComponentType);
            } else if (this.childComponentType instanceof TemplateRef) {

            } else {
                this.loadInnerString(this.childComponentType);
            }
            this.cd.detectChanges();
        }
    }

    ngOnDestroy(): void {
        // if (this.componentRef) {
        //     this.componentRef.destroy();
        // }
    }

    private loadChildComponent(componentType: Type<any>): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.containerRef.clear();
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    private loadInnerString(contentString: string): void {
        this.containerRef.clear();
        this.message = contentString;
    }

    dismiss(manualDismiss: boolean = false): void {
        if (manualDismiss) {
            this.elRef.nativeElement.style.display = 'none';
        }
        if (this.alertRef) {
            this.alertRef.dismiss();
        } else {
            this.show = false;
            this.elRef.nativeElement.style.display = 'none';
        }
    }

    open(): void {
        if (!this.alertRef) {
            this.show = true;
            this.cd.detectChanges();
            this.elRef.nativeElement.style.display = 'block';
        }
        if (!this.persist) {
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
            }, this.visibleTime);
        }
    }

    handleAlertMouseEvent(event): void {
        if (event.type === 'mouseenter') {
            this.mouseInAlert = true;
        } else if (event.type === 'mouseleave') {
            this.mouseInAlert = false;
        }
    }

}
