import { Component, Input } from '@angular/core';

/**
 * Directive that applies fundamental dialog styling to a dialog close button.
 *
 * ```html
 * <button fd-dialog-close-button></button>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-dialog-close-button]',
    host: {
        '[attr.aria-label]': '"close"',
        '[class.fd-button]': 'true',
        '[class.fd-button--compact]': '!mobile',
        '[class.fd-button--transparent]': 'true',
        '[attr.title]': 'title'
    },
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`
})
export class DialogCloseButtonComponent {
    /** Displays dialog close button in mobile mode */
    @Input()
    mobile = false;

    /** add title dynamically to add a tooltip */
    @Input()
    title: string;
}
