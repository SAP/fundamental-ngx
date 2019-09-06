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
export declare class TabItemDirective {
    /** @hidden */
    linkItem: TabLinkDirective;
}
