import { Directive, HostBinding } from '@angular/core';

/**
 * Directive that applies fundamental modal styling to a header.
 *
 * ```html
 * <h1 fd-modal-title>Modal Title</h1>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-modal-title]'
})
export class ModalTitleDirective {

    /** @hidden */
    @HostBinding('class.fd-modal__title')
    modalTitle = true;
}

/**
 * Directive that applies fundamental modal styling to a button.
 *
 * ```html
 * <button fd-modal-close-btn></button>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-modal-close-btn]'
})
export class ModalCloseButtonDirective {

    /** @hidden */
    @HostBinding('class.fd-button--light')
    lightButton = true;

    /** @hidden */
    @HostBinding('class.fd-modal__close')
    modalClose = true;
}
