import { ComponentRef, Injectable, TemplateRef, Type } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationContainer } from '../notification-utils/notification-container';
import { NotificationConfig } from '../notification-utils/notification-config';
import { NotificationRef } from '../notification-utils/notification-ref';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { NotificationGroupComponent } from '../notification-group/notification-group.component';
import { NotificationDefault } from '../notification-utils/notification-default';

@Injectable()
export class NotificationService {

    public notifications: {
        notificationComponent: ComponentRef<NotificationComponent>,
        notificationGroup?: ComponentRef<NotificationGroupComponent>
    }[] = [];
    public containerRef: ComponentRef<NotificationContainer>;


    constructor(
        private dynamicComponentService: DynamicComponentService
    ) {}

    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or Configuration Object
     * @param content Content of the alert component, or NotificationDefault object.
     * @param notificationConfig Configuration of the notification component.
     * @param notificationGroup Configuration of the notification component.
     */
    public open(
        content: TemplateRef<any> | Type<any> | NotificationDefault,
        notificationConfig: NotificationConfig = new NotificationConfig(),
        notificationGroup?: ComponentRef<NotificationGroupComponent>
    ): NotificationRef {

        // Reassigning Object And Service
        const notificationService: NotificationRef = new NotificationRef();
        notificationConfig = Object.assign(new NotificationConfig(), notificationConfig);
        notificationService.data = notificationConfig.data;
        if (notificationService.data) {
            notificationService.data.type = notificationConfig.type;
        }

        // Create Container if it doesn't exist
        if (!this.containerRef) {
            this.containerRef = this.dynamicComponentService.createDynamicComponent(content, NotificationContainer, notificationConfig);
        }

        // Pass Container reference to config
        notificationConfig.container = this.containerRef.location.nativeElement;
        let notificationComponentRef: ComponentRef<NotificationComponent>;
        if (notificationGroup) {

            // If there is group Pass group reference as a container
            notificationConfig.container = notificationGroup.location.nativeElement;

            // Create Notification Component
            notificationComponentRef = this.dynamicComponentService.createDynamicComponent(
                content,
                NotificationComponent,
                notificationConfig,
                [notificationService]
            );

            // Add To array
            this.notifications.push({
                notificationComponent: notificationComponentRef,
                notificationGroup: notificationGroup
            });
        } else {

            // Create Notification Component
            notificationComponentRef = this.dynamicComponentService.createDynamicComponent(
                content,
                NotificationComponent,
                notificationConfig,
                [notificationService]
            );

            // Add To array
            this.notifications.push({
                notificationComponent: notificationComponentRef,
            });
        }

        const defaultBehaviourOnClose = () => {
            this.destroyNotificationComponent(notificationComponentRef);
            refSub.unsubscribe();
            refGroupSub.unsubscribe();
        };

        const defaultBehaviourOnGroupClose = () => {
            this.destroyWholeGroup(notificationComponentRef);
            refGroupSub.unsubscribe();
            refSub.unsubscribe();
        };

        const refSub = notificationService.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose)
        ;

        const refGroupSub = notificationService.afterClosedGroup
            .subscribe(defaultBehaviourOnGroupClose, defaultBehaviourOnGroupClose)
        ;

        return notificationService;
    }

    /** Method to remove all of notifications from this service instance */
    public destroyAll(): void {
        this.notifications.forEach(notification => {
            this.destroyNotificationComponent(notification.notificationComponent);
        })
    }

    /** Method that informs if there is any notification opened in this service instance */
    public isAnyOpened(): boolean {
        return this.notifications && this.notifications.length > 0;
    }

    /** Method to create Notification Group */
    public createNotificationGroup (
        notificationConfig: NotificationConfig = new NotificationConfig(),
    ): ComponentRef<NotificationGroupComponent> {

        // Reassign Config Object
        notificationConfig = Object.assign(new NotificationConfig(), notificationConfig);

        if (!this.containerRef) {

            // Create Container Component
            this.containerRef = this.dynamicComponentService.createDynamicComponent(
                null, NotificationContainer, notificationConfig
            );
        }

        // Pass Container reference as a config container
        notificationConfig.container = this.containerRef.location.nativeElement;

        // Create and return notification Group component reference
        return this.dynamicComponentService.createDynamicComponent
            <NotificationGroupComponent>(null, NotificationGroupComponent, notificationConfig)
        ;
    }

    private destroyWholeGroup(notification: ComponentRef<NotificationComponent>): void {

        // Find Notification Group assigned to this Notification Component
        const arrayRef = this.notifications.find(item => item.notificationComponent === notification);
        if (arrayRef.notificationGroup) {

            // Find Any other Components, that are in this group
            const arrayToDelete = this.notifications
                .filter(_notification => _notification.notificationGroup === arrayRef.notificationGroup)
            ;

            // Destroy every single component, that are in the group
            arrayToDelete.forEach(_notification => this.destroyNotificationComponent(_notification.notificationComponent));
        }

    }

    private destroyNotificationComponent(notification: ComponentRef<NotificationComponent>): void {

        // Find Notification component in the array.
        const arrayRef = this.notifications.find(item => item.notificationComponent === notification);
        const indexOf = this.notifications.indexOf(arrayRef);

        // Check the amount of component within the group
        const amountOfComponentsWithThisGroup = this.notifications.filter(item =>
            item.notificationGroup && item.notificationGroup === arrayRef.notificationGroup
        );

        // If it's the only one component that is in the group, remove group component.
        if (amountOfComponentsWithThisGroup.length === 1) {
            this.dynamicComponentService.destroyComponent(arrayRef.notificationGroup);
        }

        // Destroy Component
        this.dynamicComponentService.destroyComponent(arrayRef.notificationComponent);

        // Remove it from Array
        this.notifications[indexOf] = null;
        this.notifications = this.notifications.filter(item => item !== null && item !== undefined);

        // If there is no other notification Components, just remove container.
        if (this.notifications.length === 0) {
            this.dynamicComponentService.destroyComponent(this.containerRef);
            this.containerRef = null;
        }

    }
}
