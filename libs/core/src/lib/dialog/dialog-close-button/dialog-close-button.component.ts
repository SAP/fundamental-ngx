import { Component, Input } from '@angular/core';

/**
 * Component that applies fundamental dialog styling to a dialog close button.
 *
 * ```html
 * <button fd-dialog-close-button></button>
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-dialog-close-button]',
    host: {
        class: 'fd-button fd-button--transparent',
        '[attr.title]': 'title',
        '[attr.aria-label]': 'ariaLabel',
        '[class.fd-button--compact]': '!mobile'
    },
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`
})
export class DialogCloseButtonComponent {
    @Input()
    mobile = false;

    /** Set title attribute */
    @Input()
    title = 'Close';

    /** set aria-Label attribute */
    @Input()
    ariaLabel = 'Close';
}
