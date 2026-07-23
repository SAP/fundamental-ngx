import { booleanAttribute, Directive, input } from '@angular/core';

let panelTitleUniqueId = 0;

/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h5 fd-panel-title>Panel Title</h5>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-panel-title]',
    host: {
        class: 'fd-panel__title',
        '[class.fd-panel__title--wrap]': 'wrap()',
        '[attr.id]': 'id()'
    }
})
export class PanelTitleDirective {
    /** Id of the host element. */
    readonly id = input('fd-panel-title-' + panelTitleUniqueId++);

    /** Whether the title text wraps instead of truncating with ellipsis. Enabled by default to satisfy WCAG 1.4.10 Reflow. */
    readonly wrap = input(true, { transform: booleanAttribute });
}
