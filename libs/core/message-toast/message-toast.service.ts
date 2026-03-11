import { OverlayRef } from '@angular/cdk/overlay';
import { EmbeddedViewRef, Injectable, StaticProvider, TemplateRef, Type, inject } from '@angular/core';
import { BaseDismissibleToastService, BaseToastPosition, ToastBottomCenterPosition } from '@fundamental-ngx/cdk/utils';
import { MessageToastTextComponent } from './components/message-toast-text.component';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_CONFIG, MESSAGE_TOAST_DATA } from './constants/message-toast.token';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastRef } from './ref/message-toast.ref';

@Injectable()
export class MessageToastService<P = any> extends BaseDismissibleToastService<MessageToastConfig<P>> {
    /** @Hidden */
    protected toastTextComponent = MessageToastTextComponent;
    /** @Hidden */
    protected toastContainerComponent = MessageToastComponent;
    /** @Hidden */
    protected toastDataInjectionToken = MESSAGE_TOAST_DATA;
    /** @Hidden */
    protected toastPositionStrategy = ToastBottomCenterPosition;
    /** @Hidden */
    protected override defaultConfig = inject(MESSAGE_TOAST_CONFIG);

    /**
     * Opens toast with a provided message.
     * @param message Message to display in a Message Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    open<T = any>(
        message: string | Type<T> | TemplateRef<any>,
        config?: MessageToastConfig<P>
    ): MessageToastRef<MessageToastTextComponent | T | EmbeddedViewRef<any>> {
        if (message instanceof TemplateRef) {
            return this.openFromTemplate(message, config ?? this.defaultConfig);
        } else if (typeof message === 'string') {
            return this.openFromString(message, config);
        }
        return this.openFromComponent(message, config ?? this.defaultConfig);
    }

    /**
     * Opens a Toast with provided message as a content.
     * @param message string to render inside a Toast.
     * @param config Toast configuration
     */
    openFromString(message: string, config?: MessageToastConfig<P>): MessageToastRef<MessageToastTextComponent> {
        const mergedConfig = { ...this.defaultConfig, ...config };
        mergedConfig.data = message;
        return this.openFromComponent(
            this.toastTextComponent,
            mergedConfig
        ) as MessageToastRef<MessageToastTextComponent>;
    }

    /**
     * Opens a Toast with provided component inside.
     * @param component Component to render inside a Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    openFromComponent<T>(component: Type<T>, config: MessageToastConfig<P>): MessageToastRef<T> {
        return this._attach(component, config) as MessageToastRef<T>;
    }

    /**
     * Opens a Toast with provided Template Reference.
     * @param template Template Reference to render inside a Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    openFromTemplate(template: TemplateRef<any>, config: MessageToastConfig<P>): MessageToastRef<EmbeddedViewRef<any>> {
        return this._attach(template, config) as MessageToastRef<EmbeddedViewRef<any>>;
    }

    /** @hidden */
    protected getContainerComponentProviders(config: MessageToastConfig<P>): StaticProvider[] {
        return [{ provide: MessageToastConfig, useValue: config }];
    }

    /** @hidden */
    protected getContentComponentProviders<T>(
        config: MessageToastConfig<P>,
        messageToastRef: MessageToastRef<T>
    ): StaticProvider[] {
        return [
            { provide: MessageToastRef, useValue: messageToastRef },
            { provide: this.toastDataInjectionToken, useValue: config.data }
        ];
    }

    /** @hidden */
    protected getToastRef<T>(
        containerRef: MessageToastComponent,
        overlayRef: OverlayRef,
        positionStrategy: BaseToastPosition = ToastBottomCenterPosition
    ): MessageToastRef<T | EmbeddedViewRef<any>> {
        return new MessageToastRef<T | EmbeddedViewRef<any>>(containerRef, overlayRef, positionStrategy);
    }
}
