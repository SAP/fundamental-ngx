import { Directive, HostBinding, Input } from '@angular/core';

/**
 * Applies the panel content style to a div element.
 *
 * ```html
 * <div fd-panel-content>Panel Content</div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-content]'
})
export class PanelContentDirective {

    /** @hidden */
    @HostBinding('class.fd-panel__content')
    readonly fdPanelContentClass: boolean = true;
    
    /** Custom height of the content container. */
    @Input()
    @HostBinding('style.height')
    height: string;

    /** Custom min-height of the content container. */
    @Input()
    @HostBinding('style.min-height')
    minHeight: string;

    /** Custom max-height of the content container. */
    @Input()
    @HostBinding('style.max-height')
    maxHeight: string;
}
