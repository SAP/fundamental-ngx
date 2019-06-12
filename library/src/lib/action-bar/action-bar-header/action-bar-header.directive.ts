import { Component, Directive, ElementRef, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';

/**
 * The action bar header, which contains the action bar's title and description components.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *     </div>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-header]',
    host: {
        class: 'fd-action-bar__header'
    }
})
export class ActionBarHeaderDirective {}
