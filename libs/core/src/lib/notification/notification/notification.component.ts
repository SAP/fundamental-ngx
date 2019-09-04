import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef, ContentChild,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import focusTrap from 'focus-trap';
import { NotificationRef } from '../notification-utils/notification-ref';
import { NotificationDefault } from '../notification-utils/notification-default';
import { DefaultNotificationComponent } from '../notification-utils/default-notification/default-notification.component';

export type NotificationType = 'success' | 'warning' | 'information' | 'error';
export type NotificationSize = 's' | 'm';

@Component({
    selector: 'fd-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel',
        'role': 'notification',
        '[attr.id]': 'id',
    }
})
export class NotificationComponent implements AfterViewInit {

    /** Size of notification, defined by user, s or m */
    @Input()
    size: string;

    /** Type of Notification 'success' | 'warning' | 'information' | 'error' */
    @Input()
    type: NotificationType;

    @ViewChild('vc', { read: ViewContainerRef })
    containerRef: ViewContainerRef;

    id: string;

    escKeyCloseable: boolean = true;

    focusTrapped: boolean = true;

    ariaLabelledBy: string = null;

    defaultNotificationConfiguration: NotificationDefault;

    ariaLabel: string = null;

    ariaDescribedBy: string = null;

    childComponentType: TemplateRef<any> | Type<any> | NotificationDefault;

    backdropClickCloseable: boolean = true;

    hasBackdrop: boolean = true;

    modalPanelClass: string = '';

    private componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    constructor(private elRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cdRef: ChangeDetectorRef,
                @Optional() private notificationRef: NotificationRef) {
    }

    ngAfterViewInit(): void {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadFromComponent(this.childComponentType);
            } else if (this.childComponentType instanceof TemplateRef) {
                this.loadFromTemplate(this.childComponentType);
            } else {
                this.createFromDefaultConfiguration(this.childComponentType);
            }
        }
        this.cdRef.detectChanges();
    }

    @HostListener('keyup', ['$event'])
    closeModalEsc(event: KeyboardEvent): void {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this.notificationRef.dismiss('escape');
        }
    }

    private createFromDefaultConfiguration(conf: NotificationDefault): void {
        this.containerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DefaultNotificationComponent);
        this.componentRef = this.containerRef.createComponent(componentFactory);
        this.componentRef.instance.defaultConfigurationNotification = conf;
        this.componentRef.instance.type = this.type;
    }

    private loadFromComponent(content: Type<any>): void {
        this.containerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    }

    private loadFromTemplate(content: TemplateRef<any>): void {
        this.containerRef.clear();
        const context = {
            $implicit: this.notificationRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
        console.log('create');
    }

}
