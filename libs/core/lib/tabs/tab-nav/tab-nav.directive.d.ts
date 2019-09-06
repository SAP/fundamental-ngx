import { AfterContentInit, EventEmitter, OnDestroy, QueryList, Renderer2 } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
/**
 * Tab Nav for only navigation mode when you want for example use router-outlet
 *
 * ```html
 *<nav fd-tab-nav>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="true">
 *          Link
 *      </a>
 *  </div>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="false">
 *          Link
 *      </a>
 *  </div>
 *  <a fd-tab-link
 *  [active]="false">
 *      Link
 *  </a>
 * </nav>
 * ```
 */
export declare class TabNavDirective implements AfterContentInit, OnDestroy {
    private renderer;
    private tabsService;
    /** @hidden */
    links: QueryList<TabLinkDirective>;
    /** @hidden */
    items: QueryList<TabItemDirective>;
    /** @hidden */
    private _tabSelectSubscription;
    /** Event Thrown every time something is clicked */
    onKeyDown: EventEmitter<{
        event: any;
        index: number;
    }>;
    /** @hidden */
    constructor(renderer: Renderer2, tabsService: TabsService);
    /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
    readonly tabLinks: TabLinkDirective[];
    /** @hidden */
    ngAfterContentInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void;
}
