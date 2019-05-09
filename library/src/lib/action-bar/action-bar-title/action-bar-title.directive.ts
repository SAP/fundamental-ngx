import { Directive, HostBinding } from '@angular/core';

/**
 * The action bar title component.
 *
 * ```html
 * <fd-action-bar>
 *     <fd-action-bar-header>
 *         <h1 fd-action-bar-title>Page Title</h1>
 *     </fd-action-bar-header>
 * <fd-action-bar>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-title]'
})
export class ActionBarTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-action-bar__title')
    fdActionBarTitleClass: boolean = true;
}
