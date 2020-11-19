import { Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';


@Component({
    selector: 'fd-message-box-body',
    template: '<ng-content></ng-content>',
    host: {
        '[class.fd-message-box__body]': 'true',
        '[class.fd-message-box__body--no-vertical-padding]': '!messageBoxConfig.verticalPadding'
    },
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxBodyComponent, multi: true }
    ]
})
export class MessageBoxBodyComponent implements MessageBoxConfigurableElement {
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        this.messageBoxConfig = this.messageBoxConfig || {};
    }
}
