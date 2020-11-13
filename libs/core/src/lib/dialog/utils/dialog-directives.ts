import { Component, Directive, Input } from '@angular/core';

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
        '[class.fd-title]': 'true',
        '[class.fd-title--h5]': 'true'
    }
})
export class DialogTitleDirective {}

/**
 * Directive that applies fundamental dialog styling to a dialog close button.
 *
 * ```html
 * <button fd-dialog-close-button></button>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-dialog-close-button]',
    host: {
        'attr.aria-label': 'close',
        '[class.fd-button]': 'true',
        '[class.fd-button--compact]': '!mobile',
        '[class.fd-button--transparent]': 'true',
    },
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`
})
export class DialogCloseButtonDirective {

    /** Displays dialog close button in mobile mode */
    @Input()
    mobile = false;
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
export class DialogDecisiveButtonDirective {}
