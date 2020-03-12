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
import { NotificationConfig } from '../../..';

export type NotificationType = 'success' | 'warning' | 'information' | 'error';
export type NotificationSize = 's' | 'm';

@Component({
    selector: 'fd-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-labelledby]': 'notificationConfig.ariaLabelledBy',
        '[attr.aria-label]': 'notificationConfig.ariaLabel',
        '[attr.id]': 'notificationConfig.id',
        'role': 'notification'
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

    @ViewChild('vc', {read: ViewContainerRef})
    containerRef: ViewContainerRef;

    childContent: TemplateRef<any> | Type<any> | NotificationDefault = undefined;

    public componentRef: ComponentRef<any> | EmbeddedViewRef<any>;

    constructor(private elRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cdRef: ChangeDetectorRef,
                @Optional() private notificationRef: NotificationRef,
                @Optional() public notificationConfig: NotificationConfig) {
        super(elRef);
        this._initialiseWithNotificationConfig();
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
        if (this.notificationConfig.escKeyCloseable && event.key === 'Escape') {
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

        if (this.notificationConfig && this.notificationConfig.notificationPanelClass) {
            this._addClassToElement(this.notificationConfig.notificationPanelClass);
        }
    }

    private _initialiseWithNotificationConfig(): void {
        this.notificationConfig = this.notificationConfig || new NotificationConfig();

        this.size = this.notificationConfig.size;
        this.type = this.notificationConfig.type;
    }
}
