import { Directive, HostBinding, Input } from '@angular/core';

/**
 * The action bar description.
 *
 * ```html
 * <div fd-action-bar>
 *     <div fd-action-bar-header>
 *         <div fd-action-bar-description>Page Description</div>
 *     </div>
 * <div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-action-bar-description]',
    host: {
        class: 'fd-action-bar__description'
    }
})
export class ActionBarDescriptionDirective {
    /*
     Whether the action bar also has a back button.
     */
    @Input()
    @HostBinding('class.fd-action-bar__description--back')
    withBackBtn: boolean = false;
}
