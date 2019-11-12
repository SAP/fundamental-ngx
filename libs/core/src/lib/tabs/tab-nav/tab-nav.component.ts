import {
    AfterContentInit, ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    OnDestroy,
    Output,
    QueryList,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
import { Subscription } from 'rxjs';


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

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-tab-nav]',
    host: {
        'class': 'fd-tabs',
        'role': 'tablist'
    },
    template: `<ng-content></ng-content>`,
    providers: [TabsService],
    styleUrls: ['./tab-nav.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabNavComponent implements AfterContentInit, OnDestroy {

    /** @hidden */
    @ContentChildren(TabLinkDirective) links: QueryList<TabLinkDirective>;

    /** @hidden */
    @ContentChildren(TabItemDirective) items: QueryList<TabItemDirective>;

    /** @hidden */
    private _tabSelectSubscription: Subscription;

    /** Event Thrown every time something is clicked */
    @Output() onKeyDown = new EventEmitter<{event: any, index: number}>();

    /** @hidden */
    constructor(
        private renderer: Renderer2,
        private tabsService: TabsService
    ) {}

    /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
    public get tabLinks(): TabLinkDirective[] {
        let tabLinks: TabLinkDirective[] = [];
        if (this.links) { tabLinks = tabLinks.concat(this.links.map(link => link)); }
        if (this.items) { tabLinks = tabLinks.concat(this.items.filter(item => !!item.linkItem).map(item => item.linkItem)); }
        return tabLinks;
    }

    /** @hidden */
    public ngAfterContentInit(): void {
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe(index => {
            this.selectTab(index);
        });

        this.tabLinks.forEach((linkElement, index) => {
            this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (event) => {
                this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map(link => link.elementRef.nativeElement))
            }
        )})
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tabSelectSubscription.unsubscribe();
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    }
}
