import { Directive, HostBinding } from '@angular/core';

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
        '[class.fd-dialog__title]': 'true',
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
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-dialog-close-btn]'
})
export class DialogCloseButtonDirective {

    /** @hidden */
    @HostBinding('attr.aria-label')
    ariaLabel: string = 'close';

    /** @hidden */
    @HostBinding('class.sap-icon--decline')
    sapIconDeclineClass: boolean = true;

    /** @hidden */
    @HostBinding('class.sap-icon--l')
    sapIconLClass: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-button--light')
    lightButtonClass: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-modal__close')
    modalCloseClass: boolean = true;
}
