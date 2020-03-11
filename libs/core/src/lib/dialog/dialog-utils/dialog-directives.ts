import { Directive } from '@angular/core';

/**
 * Directive that applies fundamental dialog styling to a header.
 *
 * ```html
 * <h1 fd-dialog-title>Modal Title</h1>
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
 * Directive that applies fundamental dialog styling to a button.
 *
 * ```html
 * <button fd-dialog-close-btn></button>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-close-btn]',
    host: {
        'attr.aria-label': 'close',
        '[class.fd-button]': 'true',
        '[class.sap-icon--l]': 'true',
        '[class.sap-icon--decline]': 'true',
        '[class.fd-button--transparent]': 'true'
    }
})
export class DialogCloseButtonDirective {
}

/**
 * Directive that applies fundamental dialog styling to a button.
 *
 * ```html
 * <button fd-dialog-close-btn></button>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-decisive-btn]',
    host: {
        '[class.fd-dialog__decisive-button]': 'true',
    }
})
export class DialogDecisiveButtonDirective {
}
