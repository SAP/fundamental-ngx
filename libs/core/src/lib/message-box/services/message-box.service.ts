import { Inject, Injectable, Injector, Optional, TemplateRef, Type } from '@angular/core';

import { DynamicComponentService, RtlService } from '@fundamental-ngx/core/utils';
import { DialogBaseService } from '@fundamental-ngx/core/dialog';

import { MESSAGE_BOX_DEFAULT_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';
import { MessageBoxContainerComponent } from '../message-box-container/message-box-container.component';
import { MessageBoxContent } from '../utils/message-box-content.class';

export type MessageBoxContentType = Type<any> | TemplateRef<any> | MessageBoxContent;

/** Service used to create a message box. */
@Injectable()
export class MessageBoxService extends DialogBaseService<MessageBoxContainerComponent> {
    /** @hidden */
    constructor(
        dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(MESSAGE_BOX_DEFAULT_CONFIG) private _defaultConfig: MessageBoxConfig,
        @Optional() private _rtlService: RtlService
    ) {
        super(dynamicComponentService);
    }

    /**
     * Opens a message box component with provided content.
     * @param content Content of the message box component.
     * @param config Configuration of the message box component.
     */
    public open<T = any>(content: MessageBoxContentType, config?: MessageBoxConfig<T>): MessageBoxRef<T> {
        const messageBoxRef = new MessageBoxRef();

        config = this._applyDefaultConfig(config = {}, this._defaultConfig || new MessageBoxConfig());
        messageBoxRef.data = config.data;

        const injector = Injector.create({
            providers: [
                { provide: MessageBoxConfig, useValue: config },
                { provide: MessageBoxRef, useValue: messageBoxRef },
                { provide: RtlService, useValue: this._rtlService }
            ],
            parent: config.injector
        });

        const component = this._dynamicComponentService.createDynamicComponent<MessageBoxContainerComponent>(
            content,
            MessageBoxContainerComponent,
            config,
            { injector }
        );

        this._dialogs.push(component);

        const defaultBehaviourOnClose = (): void => {
            this._destroyDialog(component);
            refSub.unsubscribe();
        };

        const refSub = messageBoxRef.afterClosed.subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return messageBoxRef;
    }
}
