import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { EmbeddedViewRef, Injectable, Injector, StaticProvider, TemplateRef, Type } from '@angular/core';
import { BaseDismissibleToastService, ToastBottomCenterPosition } from '@fundamental-ngx/fn/cdk';
import { MessageToastTextComponent } from './components/message-toast-text.component';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_DATA } from './constants/message-toast.token';
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
    protected defaultConfig = new MessageToastConfig();

    /** @hidden */
    constructor(overlay: Overlay, injector: Injector) {
        super(overlay, injector);
    }

    /**
     * Opens toast with a provided message.
     * @param message Message to display in a Message Toast.
     * @param config Toast configuration.
     * @returns Toast reference.
     */
    open(message: string, config?: MessageToastConfig<P>): MessageToastRef<MessageToastTextComponent> {
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
        overlayRef: OverlayRef
    ): MessageToastRef<T | EmbeddedViewRef<any>> {
        return new MessageToastRef<T | EmbeddedViewRef<any>>(containerRef, overlayRef);
    }
}
