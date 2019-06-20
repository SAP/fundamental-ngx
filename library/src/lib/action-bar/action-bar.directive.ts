import { Directive } from '@angular/core';

/**
 * The parent action bar directive.
 *
 * Children usage:
 * ```html
 * <div fd-action-bar-actions>
 * <div fd-action-bar-back>
 * <div fd-action-bar-description>
 * <div fd-action-bar-header>
 * <div fd-action-bar-mobile>
 * <h1 fd-action-bar-title>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar]',
    host: {
        class: 'fd-action-bar'
    }
})
export class ActionBarDirective {}
