import { Directive, HostBinding } from '@angular/core';

/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-panel-title>Panel Title</h1>
 * <h3 fd-panel-title>Panel Title</h3>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-panel-title]',
})
export class PanelTitleDirective {

    /** @hidden */
    @HostBinding('class.fd-panel__title')
    fdPanelTitleClass: boolean = true;
}
