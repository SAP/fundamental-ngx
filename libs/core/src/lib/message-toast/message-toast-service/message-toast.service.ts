import { Injectable, ComponentRef, TemplateRef, Type } from '@angular/core';
import { MessageToastComponent } from '../message-toast.component';
import { MessageToastContainerComponent } from '../message-toast-utils/message-toast-container.component';
import { MessageToastRef } from '../message-toast-utils/message-toast-ref';
import { MessageToastConfig } from '../message-toast-utils/message-toast-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';

/**
 * Service for generating message toasts dynamically.
 */
@Injectable()
export class MessageToastService {
    private _messageToasts: ComponentRef<MessageToastComponent>[] = [];
    private _messageToastContainerRef: ComponentRef<MessageToastContainerComponent>;

    /** @hidden */
    constructor(private _dynamicComponentService: DynamicComponentService) {}

    /**
     * Returns true if there are some message toasts currently open. False otherwise.
     */
    hasOpenMessageToasts(): boolean {
        return this._messageToasts && this._messageToasts.length > 0;
    }

    /**
     * Opens a message toast component with a content of type TemplateRef, Component Type or String.
     * @param content Content of the message toast component.
     * @param  messageToastConfig Configuration of the message toast component.
     */
    open(
        content: TemplateRef<any> | Type<any> | string,
        messageToastConfig: MessageToastConfig = new MessageToastConfig()
    ): MessageToastRef {
        // Get default values from message toast model
        messageToastConfig = Object.assign(new MessageToastConfig(), messageToastConfig);

        // Instantiate message toast ref service
        const service: MessageToastRef = new MessageToastRef();
        service.data = messageToastConfig.data;

        // If empty or undefined message toast array, create container
        if (!this._messageToasts || this._messageToasts.length === 0 || !this._messageToastContainerRef) {
            this._messageToastContainerRef = this._dynamicComponentService.createDynamicComponent<
                MessageToastContainerComponent
            >(content, MessageToastContainerComponent, messageToastConfig);
        }

        // Define Container to put backdrop and component to container
        messageToastConfig.container = this._messageToastContainerRef.location.nativeElement;

        const component = this._dynamicComponentService.createDynamicComponent<MessageToastComponent>(
            content,
            MessageToastComponent,
            messageToastConfig,
            { services: [service, messageToastConfig] }
        );

        component.location.nativeElement.style.marginBottom = '10px';

        // Subscription to close message toast from ref
        const refSub = service.afterTimeout.subscribe(() => {
            this._destroyMessageToastComponent(component);
            refSub.unsubscribe();
        });

        this._messageToasts.push(component);
        return service;
    }

    /**
     * Hides all message toasts opened by the service.
     */
    hideAll(): void {
        this._messageToasts.forEach((ref) => {
            this._destroyMessageToastComponent(ref);
        });
    }

    /** @hidden */
    private _destroyMessageToastComponent(messageToast: ComponentRef<MessageToastComponent>): void {
        this._messageToasts[this._messageToasts.indexOf(messageToast)] = null;
        this._messageToasts = this._messageToasts.filter((item) => item !== null && item !== undefined);
        this._dynamicComponentService.destroyComponent(messageToast);

        if (this._messageToastContainerRef && (!this._messageToasts || this._messageToasts.length === 0)) {
            this._destroyMessageToastContainer();
        }
    }

    /** @hidden */
    private _destroyMessageToastContainer(): void {
        this._dynamicComponentService.destroyComponent(this._messageToastContainerRef);
        this._messageToastContainerRef = undefined;
    }
}
