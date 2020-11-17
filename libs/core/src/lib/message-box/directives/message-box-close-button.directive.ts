import { Component, Input } from '@angular/core';

/**
 * Directive that applies fundamental dialog styling to a message box close button.
 *
 * ```html
 * <button fd-message-box-close></button>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-message-box-close-icon, [fd-message-box-close-icon]',
    host: {
        'attr.aria-label': 'close',
        '[class.fd-button]': 'true',
        '[class.fd-button--compact]': '!mobile',
        '[class.fd-button--transparent]': 'true',
    },
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`
})
export class MessageBoxCloseIconDirective {

    /** Displays message box close button in mobile mode */
    @Input()
    mobile = false;
}
