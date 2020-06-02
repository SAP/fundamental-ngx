import { Directive } from '@angular/core';

/**
 * Applies the panel header style to a div element.
 *
 * ```html
 * <div fd-panel-header>Panel Header</div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-header]',
    host: {
        class: 'fd-panel__header'
    }
})
export class PanelHeaderDirective { }
