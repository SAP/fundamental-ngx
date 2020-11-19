import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import {
    MESSAGE_BOX_CONFIGURABLE_ELEMENT,
    MessageBoxConfig,
    MessageBoxConfigurableElement
} from '../utils/message-box-config.class';

/**
 * Message box element representing icon close button in the message box header.
 *
 * ```html
 * <fd-message-box-close-icon></fd-message-box-close-icon>
 * ```
 */
@Component({
    selector: 'fd-message-box-close-icon',
    host: { 'attr.aria-label': 'close' },
    template: '<button fd-button fdType="transparent" glyph="decline" [compact]="!messageBoxConfig.mobile"></button>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MESSAGE_BOX_CONFIGURABLE_ELEMENT, useExisting: MessageBoxCloseIconComponent, multi: true }
    ]
})
export class MessageBoxCloseIconComponent implements MessageBoxConfigurableElement {

    /** @hidden */
    constructor(@Optional() public messageBoxConfig: MessageBoxConfig) {
        this.messageBoxConfig = this.messageBoxConfig || {};
    }
}
