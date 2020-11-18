import { Directive } from '@angular/core';

/**
 * Directive that applies fundamental dialog styling to a button.
 *
 * ```html
 * <button fd-dialog-decisive-button></button>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-decisive-button]',
    host: {
        '[class.fd-dialog__decisive-button]': 'true'
    }
})
export class DialogDecisiveButtonDirective {}
