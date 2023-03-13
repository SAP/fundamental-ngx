import { Directive, HostBinding } from '@angular/core';

/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-layout-panel-title>Layout Panel Title</h1>
 * <h3 fd-layout-panel-title>Layout Panel Title</h3>
 * ```
 */
@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-layout-panel-title]'
})
export class LayoutPanelTitleDirective {
    /** @hidden */
    @HostBinding('class')
    fdLayoutPanelTitleClass = 'fd-title fd-title--h5';
}
