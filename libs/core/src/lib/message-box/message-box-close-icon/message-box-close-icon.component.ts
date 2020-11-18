import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { MESSAGE_BOX_CONFIGURABLE_ELEMENT, MessageBoxConfig } from '../utils/message-box-config.class';

@Component({
    selector: 'fd-message-box-close-icon',
    host: { 'attr.aria-label': 'close' },
    template: '<button fd-button fdType="transparent" glyph="decline" [compact]="!_messageBoxConfig.mobile"></button>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxCloseIconComponent, multi: true }
    ]
})
export class MessageBoxCloseIconComponent {

    constructor(@Optional() public _messageBoxConfig: MessageBoxConfig) {
        this._messageBoxConfig = this._messageBoxConfig || {};
    }
}
