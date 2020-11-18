import { Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig
} from '../utils/message-box-config.class';


@Component({
    selector: 'fd-message-box-body',
    template: '<ng-content></ng-content>',
    host: {
        '[class.fd-message-box__body]': 'true',
        '[class.fd-message-box__body--no-vertical-padding]': '!_messageBoxConfig.verticalPadding'
    },
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxBodyComponent, multi: true }
    ]
})
export class MessageBoxBodyComponent {
    constructor(@Optional() public _messageBoxConfig: MessageBoxConfig) {}
}
