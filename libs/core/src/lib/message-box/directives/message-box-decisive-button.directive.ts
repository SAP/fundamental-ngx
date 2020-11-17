import { Directive } from '@angular/core';

/**
 * Directive that applies fundamental message box styling to a button.
 *
 * ```html
 * <button fd-message-box-decisive-button></button>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-message-box-decisive-button]',
    host: {
        '[class.fd-message-box__decisive-button]': 'true'
    }
})
export class MessageBoxDecisiveButton {}
