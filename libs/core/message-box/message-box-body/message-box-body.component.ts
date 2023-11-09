import { Directive, Optional } from '@angular/core';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';

/**
 * Building block of the message box used to create message box body.
 *
 * ```html
 * <fd-message-box-body></fd-message-box-body>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-message-box-body',
    host: {
        '[class.fd-message-box__body]': 'true',
        '[class.fd-message-box__body--no-vertical-padding]': '!messageBoxConfig.verticalPadding'
    },
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MessageBoxBodyComponent {
    /** @hidden */
    get messageBoxConfig(): MessageBoxConfig {
        return this.messageBox?._messageBoxConfig || {};
    }
    /** @hidden */
    constructor(@Optional() private messageBox?: MessageBoxHost) {}
}
