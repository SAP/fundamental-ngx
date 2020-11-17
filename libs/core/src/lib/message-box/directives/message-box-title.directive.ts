import { Directive } from '@angular/core';

/**
 * Directive that applies fundamental message box styling to a header.
 *
 * ```html
 * <h1 fd-message-box-title>Message Box Title</h1>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-message-box-title]',
    host: {
        '[class.fd-title]': 'true',
        '[class.fd-title--h5]': 'true'
    }
})
export class MessageBoxTitle {}
