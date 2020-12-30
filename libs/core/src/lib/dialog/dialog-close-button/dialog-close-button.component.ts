import { Component, Input } from '@angular/core';

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
        '[attr.aria-label]': '"close"',
        '[class.fd-button]': 'true',
        '[class.fd-button--compact]': '!mobile',
        '[class.fd-button--transparent]': 'true',
    },
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`
})
export class DialogCloseButtonComponent {

    /** Displays dialog close button in mobile mode */
    @Input()
    mobile = false;
}
