import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { EmbeddedViewRef, Injectable, Injector, StaticProvider, TemplateRef, Type } from '@angular/core';
import { BaseDismissibleToastService, ToastTopRightPosition } from '@fundamental-ngx/fn/cdk';
import { NotificationTextComponent } from './components/notification-text/notification-text.component';
import { NotificationConfig } from './config/notification-config';
import { NOTIFICATION_DATA } from './constants/notification-data.token';
import { NotificationComponent } from './notification.component';
import { NotificationRef } from './ref/notification-ref';

@Injectable()
export class NotificationService<P = any> extends BaseDismissibleToastService<NotificationConfig<P>> {
    protected toastTextComponent = NotificationTextComponent;
    protected toastContainerComponent = NotificationComponent;
    protected toastDataInjectionToken = NOTIFICATION_DATA;
    protected toastPositionStrategy = ToastTopRightPosition;
    protected defaultConfig = new NotificationConfig<P>();

    /** @hidden */
    constructor(overlay: Overlay, injector: Injector) {
        super(overlay, injector);
    }

    /**
     * Opens a new Notification with provided configuration.
     * @param config Notification configuration.
     * @returns Notification reference.
     */
    open(config: NotificationConfig<P>): NotificationRef<NotificationTextComponent> {
        const mergedConfig = { ...this.defaultConfig, ...config };

        return this.openFromComponent(
            this.toastTextComponent,
            mergedConfig
        ) as NotificationRef<NotificationTextComponent>;
    }

    /**
     * Opens a Notification with provided component inside.
     * @param component Component to render inside a Notification.
     * @param config Notification configuration.
     * @returns Notification reference.
     */
    openFromComponent<T>(component: Type<T>, config: NotificationConfig<P>): NotificationRef<T> {
        return this._attach(component, config) as NotificationRef<T>;
    }

    /**
     * Opens a Notification with provided Template Reference.
     * @param template Template Reference to render inside a Notification.
     * @param config Notification configuration.
     * @returns Notification reference.
     */
    openFromTemplate(template: TemplateRef<any>, config: NotificationConfig<P>): NotificationRef<EmbeddedViewRef<any>> {
        return this._attach(template, config) as NotificationRef<EmbeddedViewRef<any>>;
    }

    /** @hidden */
    protected getContainerComponentProviders(config: NotificationConfig<P>): StaticProvider[] {
        return [{ provide: NotificationConfig, useValue: config }];
    }

    /** @hidden */
    protected getContentComponentProviders<T>(
        config: NotificationConfig<P>,
        notificationRef: NotificationRef<T>
    ): StaticProvider[] {
        return [
            { provide: NotificationRef, useValue: notificationRef },
            { provide: this.toastDataInjectionToken, useValue: config }
        ];
    }

    /** @hidden */
    protected getToastRef<T>(
        containerRef: NotificationComponent,
        overlayRef: OverlayRef
    ): NotificationRef<EmbeddedViewRef<any> | T> {
        return new NotificationRef<T | EmbeddedViewRef<any>>(containerRef, overlayRef);
    }
}
