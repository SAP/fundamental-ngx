import { ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationContainer } from '../notification-utils/notification-container';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';

@Injectable()
export class NotificationService {
    public notifications: {
        notificationComponent: ComponentRef<NotificationComponent>;
    }[] = [];
    
    public containerRef: ComponentRef<NotificationContainer>;

    constructor(private dynamicComponentService: DynamicComponentService) {}

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
            this.containerRef = this.dynamicComponentService.createDynamicComponent(
                content,
                NotificationContainer,
                notificationConfig
            );
        }

        // Pass Container reference to config
        notificationConfig.container = this.containerRef.location.nativeElement;
        let notificationComponentRef: ComponentRef<NotificationComponent>;
        
        // Create Notification Component
        notificationComponentRef = this.dynamicComponentService.createDynamicComponent(
            content,
            NotificationComponent,
            notificationConfig,
            { services: [notificationService, notificationConfig] }
        );

        // Add To array
        this.notifications.push({
            notificationComponent: notificationComponentRef
        });

        const defaultBehaviourOnClose = () => {
            this.destroyNotificationComponent(notificationComponentRef);
            refSub.unsubscribe();
        };

        const refSub = notificationService.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);
        
        return notificationService;
    }

    /** Method to remove all of notifications from this service instance */
    public destroyAll(): void {
        this.notifications.forEach((notification) => {
            this.destroyNotificationComponent(notification.notificationComponent);
        });
    }

    /** Method that informs if there is any notification opened in this service instance */
    public isAnyOpened(): boolean {
        return this.notifications && this.notifications.length > 0;
    }

    /** Method that destroys the Notification component */
    private destroyNotificationComponent(notification: ComponentRef<NotificationComponent>): void {
        // Find Notification component in the array.
        const arrayRef = this.notifications.find((item) => item.notificationComponent === notification);
        const indexOf = this.notifications.indexOf(arrayRef);

        // Destroy Component
        this.dynamicComponentService.destroyComponent(arrayRef.notificationComponent);

        // Remove it from Array
        this.notifications[indexOf] = null;
        this.notifications = this.notifications.filter((item) => item !== null && item !== undefined);

        // If there is no other notification Components, just remove container.
        if (this.notifications.length === 0) {
            this.dynamicComponentService.destroyComponent(this.containerRef);
            this.containerRef = null;
        }
    }
}
