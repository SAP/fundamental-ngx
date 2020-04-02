import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    HostListener,
    Input,
    Optional,
    TemplateRef,
    Type,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NotificationRef } from '../notification-utils/notification-ref';
import { NotificationDefault } from '../notification-utils/notification-default';
import { DefaultNotificationComponent } from '../notification-utils/default-notification/default-notification.component';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { NotificationConfig } from '../notification-utils/notification-config';

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
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent extends AbstractFdNgxClass implements AfterViewInit {

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

    childContent: TemplateRef<any> | Type<any> | NotificationDefault = undefined;

    backdropClickCloseable: boolean = true;

    hasBackdrop: boolean = true;

    notificationPanelClass: string = '';

    public componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    // @ts-ignore
    constructor(private elRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cdRef: ChangeDetectorRef,
                @Optional() private notificationConfig: NotificationConfig,
                @Optional() private notificationRef: NotificationRef) {
        // @ts-ignore
        this._setNotificationConfig(notificationConfig);
        super(elRef);
    }

    ngAfterViewInit(): void {
        if (this.childContent) {
            if (this.childContent instanceof Type) {
                this.loadFromComponent(this.childContent);
            } else if (this.childContent instanceof TemplateRef) {
                this.loadFromTemplate(this.childContent);
            } else {
                this.createFromDefaultConfiguration(this.childContent);
            }
        }
        this.cdRef.detectChanges();
    }

    @HostListener('keyup', ['$event'])
    closeNotificationEsc(event: KeyboardEvent): void {
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
    }

    _setProperties(): void {
        this._addClassToElement('fd-notification');
        this._addClassToElement('fd-notification-custom-block');
        if (this.type) {
            this._addClassToElement('fd-notification--' + this.type);
        }

        if (this.size) {
            this._addClassToElement('fd-notification--' + this.size);
        }

    }

    private _setNotificationConfig(notificationConfig: NotificationConfig): void {
        Object.keys(notificationConfig || {})
            .filter(key => key !== 'data' && key !== 'container')
            .forEach(key => this[key] = notificationConfig[key]);
    }
}
