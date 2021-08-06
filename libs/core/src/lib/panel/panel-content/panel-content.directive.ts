import { Directive, HostBinding, Input } from '@angular/core';

let panelContentUniqueId = 0;

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
})
export class PanelContentDirective {
    /** @hidden */
    @HostBinding('class.fd-panel__content')
    readonly fdPanelContentClass: boolean = true;

    /** Custom height of the content container. */
    @Input()
    @HostBinding('style.height')
    height: string = null;

    /** Custom min-height of the content container. */
    @Input()
    @HostBinding('style.min-height')
    minHeight: string = null;

    /** Custom max-height of the content container. */
    @Input()
    @HostBinding('style.max-height')
    maxHeight: string = null;

    /** aria-label attribute of the host element element. */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string = null;

    /** aria-labelledby attribute of the host element element. */
    @Input()
    @HostBinding('attr.aria-labelledby')
    ariaLabelledBy: string = null;

    /** role attribute of the host element. */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /** Id of the host element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-content-' + panelContentUniqueId++;

}
