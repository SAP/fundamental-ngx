import { ComponentRef, Inject, Injectable, Optional } from '@angular/core';
import { DialogContainerComponent, DynamicComponentService } from '@fundamental-ngx/core';
import { MESSAGE_BOX_DEFAULT_CONFIG, MessageBoxConfig } from '../utils/message-box-config.class';

@Injectable()
export class MessageBoxService {

    /** @hidden Collection of existing dialog references */
    private _messageBoxes: ComponentRef<DialogContainerComponent>[] = [];

    constructor(
        @Inject(DynamicComponentService) private _dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(MESSAGE_BOX_DEFAULT_CONFIG) private _defaultConfig: MessageBoxConfig
    ) {}
}
