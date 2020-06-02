import { Directive } from '@angular/core';

/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h5 fd-panel-title>Panel Title</h5>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-title]',
    host: {
        class: 'fd-panel__title'
    }
})
export class PanelTitleDirective { }
