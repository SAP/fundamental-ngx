import { Inject, Injectable, Injector, Optional } from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DialogBaseService } from '@fundamental-ngx/core/dialog';

import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageBoxContainerComponent } from '../message-box-container/message-box-container.component';
import { MessageBoxContentType } from '../message-box-content.type';
import { MESSAGE_BOX_DEFAULT_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';
import { MessageBoxRef } from '../utils/message-box-ref.class';

/** Service used to create a message box. */
@Injectable()
export class MessageBoxService extends DialogBaseService<MessageBoxContainerComponent> {
    /** @hidden */
    constructor(
        @Optional() @Inject(MESSAGE_BOX_DEFAULT_CONFIG) private _defaultConfig: MessageBoxConfig,
        @Optional() private _rtlService: RtlService,
        private readonly _overlay: Overlay
    ) {
        super();
    }

    /**
     * Opens a message box component with provided content.
     * @param content Content of the message box component.
     * @param config Configuration of the message box component.
     */
    public open<T = any>(content: MessageBoxContentType, config?: MessageBoxConfig<T>): MessageBoxRef<T> {
        const messageBoxRef = new MessageBoxRef();

        config = this._applyDefaultConfig(config || {}, this._defaultConfig || new MessageBoxConfig());
        messageBoxRef.data = config.data;

        const injector = Injector.create({
            providers: [
                { provide: MessageBoxConfig, useValue: config },
                { provide: MessageBoxRef, useValue: messageBoxRef },
                { provide: RtlService, useValue: this._rtlService }
            ],
            parent: config.injector
        });

        const overlayRef = this._overlay.create(new OverlayConfig());

        const portal = new ComponentPortal(MessageBoxContainerComponent, null, injector);

        const componentRef = overlayRef.attach(portal);

        componentRef.instance.childContent = content;
        componentRef.instance.messageBoxConfig = config;

        // Register dialog for tracking (replaces manual push)
        this._registerDialog(componentRef);

        messageBoxRef._endClose$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._destroyDialog(componentRef);
            overlayRef.dispose();
        });

        return messageBoxRef;
    }
}
