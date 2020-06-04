import { Directive, Input } from '@angular/core';

/**
 * Applies the panel content style to a div element.
 *
 * ```html
 * <div fd-panel-content>Panel Content</div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-content]',
    host: {
        class: 'fd-panel__content',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight'
    }
})
export class PanelContentDirective {
    /** Custom height of the content container. */
    @Input()
    height: string;

    /** Custom min-height of the content container. */
    @Input()
    minHeight: string;

    /** Custom max-height of the content container. */
    @Input()
    maxHeight: string;
}
