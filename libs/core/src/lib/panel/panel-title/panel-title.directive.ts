import { Directive, HostBinding, Input } from '@angular/core';

let panelTitleUniqueId = 0;

/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h5 fd-panel-title>Panel Title</h5>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-title]'
})
export class PanelTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-panel__title')
    readonly fdPanelTitleClass: boolean = true;

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-title-' + panelTitleUniqueId++;
}
