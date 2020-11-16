import { Component, Inject, Optional } from '@angular/core';
import { DialogHeaderBase } from '../../dialog/base/dialog-header-base.class';
import { MESSAGE_BOX_CONFIG, MESSAGE_BOX_CONFIGURABLE_ELEMENT, MessageBoxConfig } from '../utils/message-box-config.class';

@Component({
    selector: 'fd-message-box-header',
    templateUrl: './message-box-header.component.html',
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxHeaderComponent, multi: true }
    ]
})
export class MessageBoxHeaderComponent extends DialogHeaderBase {

    constructor(@Optional() @Inject(MESSAGE_BOX_CONFIG) public _messageBoxConfig: MessageBoxConfig) {
        super();
        this._messageBoxConfig = this._messageBoxConfig || {};
    }
}
