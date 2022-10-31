import { ComponentRef, Inject, Injectable, Injector, Optional, TemplateRef, Type } from '@angular/core';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/core/utils';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationContainer } from '../notification-utils/notification-container';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class NotificationService {
    /** @hidden */
    public notifications: {
        notificationComponent: ComponentRef<NotificationComponent>;
        notificationConfig: Readonly<NotificationConfig>;
    }[] = [];

    /** @hidden */
    public containerRef: ComponentRef<NotificationContainer> | null;

    /**
     * @hidden
     * Element that was focused before the notification was opened. Being used to restore focus upon close.
     */
    private _elementFocusedBeforeNotificationWasOpened?: HTMLOrSVGElement;

    /**
     * @hidden
     */
    constructor(
        private _dynamicComponentService: DynamicComponentService,
        @Inject(DOCUMENT) private _document: Document,
        @Optional() private _rtlService: RtlService
    ) {}

    /**
     * Opens a notification component with a content of type TemplateRef or Component Type
     * @param content Content of the notification component.
     * @param notificationConfig Configuration of the notification component.
     */
    public open(
        content: TemplateRef<any> | Type<any>,
        notificationConfig: NotificationConfig = new NotificationConfig()
    ): NotificationRef {
        // Reassigning Object And Service
        const notificationService: NotificationRef = new NotificationRef();
        notificationConfig = Object.assign(new NotificationConfig(), notificationConfig);
        notificationService.data = notificationConfig.data;

        // Create Container if it doesn't exist
        if (!this.containerRef) {
            this.containerRef = this._dynamicComponentService.createDynamicComponent(
                content,
                NotificationContainer,
                notificationConfig
            );
        }

        // Pass Container reference to config
        notificationConfig.container = this.containerRef.location.nativeElement;

        const injector = Injector.create({
            providers: [
                { provide: NotificationConfig, useValue: notificationConfig },
                { provide: NotificationRef, useValue: notificationService },
                { provide: RtlService, useValue: this._rtlService }
            ]
        });

        // Create Notification Component
        const notificationComponentRef = this._dynamicComponentService.createDynamicComponent(
            content,
            NotificationComponent,
            notificationConfig,
            { injector }
        );

        if (notificationConfig.shouldTrapFocus) {
            const element = this._document.activeElement as HTMLElement | undefined;
            this._elementFocusedBeforeNotificationWasOpened =
                typeof element?.focus === 'function' ? element : undefined;
            notificationComponentRef.instance.trapFocus();
        }

        // Add To array
        this.notifications.push({
            notificationComponent: notificationComponentRef,
            notificationConfig
        });

        const defaultBehaviourOnClose = (): void => {
            this._destroyNotificationComponent(notificationComponentRef);
            refSub.unsubscribe();
        };

        const refSub = notificationService.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return notificationService;
    }

    /** Method to remove all of notifications from this service instance */
    public destroyAll(): void {
        this.notifications.forEach((notification) => {
            this._destroyNotificationComponent(notification.notificationComponent);
        });
    }

    /** Method that informs if there is any notification opened in this service instance */
    public isAnyOpened(): boolean {
        return this.notifications && this.notifications.length > 0;
    }

    /** @hidden Method that destroys the Notification component */
    private _destroyNotificationComponent(notification: ComponentRef<NotificationComponent>): void {
        this.notifications = this.notifications.filter((item) => item.notificationComponent !== notification);
        this._dynamicComponentService.destroyComponent(notification);

        // If there is no other notification Components, just remove container.
        if (this.notifications.length === 0 && this.containerRef) {
            this._dynamicComponentService.destroyComponent(this.containerRef);
            this.containerRef = null;
            this._restoreFocus();
        } else {
            // otherwise attempt to move focus to previous notification
            const last = this.notifications[this.notifications.length - 1];
            if (last.notificationConfig.shouldTrapFocus) {
                last.notificationComponent.instance.trapFocus();
            } else {
                this._restoreFocus();
            }
        }
    }

    /** @hidden attempts to focus previously selected element */
    private _restoreFocus(): void {
        if (typeof this._elementFocusedBeforeNotificationWasOpened?.focus === 'function') {
            this._elementFocusedBeforeNotificationWasOpened.focus();
        }
    }
}
