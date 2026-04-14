import { Directive, input } from '@angular/core';

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
        '[attr.id]': 'id()'
    }
})
export class PanelTitleDirective {
    /** Id of the host element. */
    readonly id = input('fd-panel-title-' + panelTitleUniqueId++);
}
