import { ContentChild, Directive } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
/**
 * Tab Item is optional wrapper for Tab link
 *
 * ```html
 * <div fd-tab-item>
 *    <a fd-tab-link>
 *        link
 *    </a>
 * </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-item]',
    host: {
        'class': 'fd-tabs__item'
    }
})
export class TabItemDirective {

    /** @hidden */
    @ContentChild(TabLinkDirective) linkItem: TabLinkDirective;
}
