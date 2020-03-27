import { Directive } from '@angular/core';
import { BarElementDirective } from '../../..';

/**
 * Directive that applies fundamental dialog styling to a header.
 *
 * ```html
 * <h1 fd-dialog-title>Dialog Title</h1>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-title]',
    host: {
        '[class.fd-dialog__title]': 'true'
    }
})
export class DialogTitleDirective {
}

/**
 * Directive that applies fundamental dialog styling to a dialog close button.
 *
 * ```html
 * <button fd-dialog-close-button></button>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-close-button]',
    host: {
        'attr.aria-label': 'close',
        '[class.fd-button]': 'true',
        '[class.fd-button--compact]': 'true',
        '[class.fd-button--transparent]': 'true',
        '[class.sap-icon--decline]': 'true'
    }
})
export class DialogCloseButtonDirective {
}

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
export class DialogDecisiveButtonDirective {
}
