import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';

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
        '[class.is-compact]': '!mobile()',
        '[class.fd-button--transparent]': 'true',
        '[attr.title]': 'title()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<fd-icon glyph="decline"></fd-icon><ng-content></ng-content>`,
    imports: [IconComponent]
})
export class DialogCloseButtonComponent {
    /** Displays dialog close button in mobile mode */
    mobile = input(false);

    /** add title dynamically to add a tooltip */
    title = input<string>();

    /** add aria label dynamically to add to the button */
    ariaLabel = input<string>();
}
