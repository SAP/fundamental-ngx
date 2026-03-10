/**
 * Minimal Angular reproduction of scrolling issue within a Tabbed interface.
 *
 * This version uses ONLY fundamental-ngx library components:
 * - fdp-dynamic-page (instead of app-page)
 * - fdp-icon-tab-bar (for tabs)
 * - fdp-table (instead of app-data-table)
 *
 * ISSUE DEMONSTRATION:
 * This component demonstrates a scrolling bug that occurs when:
 * 1. User starts on Tab 1 (100 items - long list with scroll)
 * 2. User clicks to Tab 2 (5 items - short list, no scroll needed)
 * 3. User clicks to Tab 3 (100 items - should have scroll)
 *
 * EXPECTED: Tab 3 should show a scrollbar since it has 100 items
 * ACTUAL BUG: Tab 3 doesn't show the scrollbar until user interacts with the content
 *
 * ROOT CAUSE: When switching from a short tab (no scroll) to a long tab,
 * the scroll container doesn't properly recalculate its scrollable area.
 *
 * DATA SOURCE PATTERN:
 * This component uses the same data source pattern as outbounds.component.ts:
 * - CustomTableDataProvider with a bound fetch method
 * - CustomTableDataSource wrapping the provider
 * - fetchTable() method that triggers table.fetch() instead of overwriting dataSource
 */

import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    ElementRef,
    OnDestroy,
    Signal,
    signal,
    TemplateRef,
    ViewChild,
    viewChild,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import {
    FundamentalNgxPlatformModule,
    IconTabBarItem,
    TabConfig,
    TableComponent,
    TableState
} from '@fundamental-ngx/platform';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomTableDataProvider, CustomTableDataSource } from './data-provider';
import { DONE_ITEMS, MockTableItem, SENT_ITEMS, TODO_ITEMS } from './scroll-issue-repro.mock';

export enum ScrollIssueTabId {
    Todo = 'todo',
    Sent = 'sent',
    Done = 'done'
}

@Component({
    selector: 'app-scroll-issue-repro',
    templateUrl: './scroll-issue-repro.component.html',
    styleUrls: ['./scroll-issue-repro.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
})
export class ScrollIssueReproComponent implements OnDestroy {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    public table = viewChild<TableComponent<MockTableItem>>('tableComponent');

    public fullscreen = false;
    public isLoading = signal(false);

    // Tab configuration
    public activeTab: WritableSignal<IconTabBarItem> = signal({
        index: 0,
        uId: '0',
        flatIndex: 0,
        cssClasses: [],
        id: ScrollIssueTabId.Todo,
        icon: 'inbox',
        label: 'Todo',
        color: 'informative'
    });

    public dynamicPageContentTable: Signal<TemplateRef<unknown> | undefined> = viewChild('dynamicPageContentTable');

    public iconTypeConfig: Signal<TabConfig[]> = computed(() => [
        {
            id: ScrollIssueTabId.Todo,
            icon: 'inbox',
            label: 'Todo',
            color: 'informative',
            counter: TODO_ITEMS.length,
            renderer: this.dynamicPageContentTable()
        },
        {
            id: ScrollIssueTabId.Sent,
            icon: 'in-progress',
            label: 'Sent',
            color: 'informative',
            counter: SENT_ITEMS.length,
            renderer: this.dynamicPageContentTable()
        },
        {
            id: ScrollIssueTabId.Done,
            icon: 'accept',
            label: 'Done',
            color: 'informative',
            counter: DONE_ITEMS.length,
            renderer: this.dynamicPageContentTable()
        }
    ]);

    // Table configuration - using outbounds-style data source pattern
    public tableTitle = 'Scroll Issue Reproduction';

    /**
     * Data source wrapping the provider.
     * Initialized in constructor after binding fetch method.
     */
    public dataSource: CustomTableDataSource<MockTableItem>;

    /**
     * BehaviorSubject to trigger data fetching.
     * Similar to outbounds.component.ts data$ pattern.
     */
    protected data$: BehaviorSubject<MockTableItem[]> = new BehaviorSubject<MockTableItem[]>([]);

    /**
     * Custom data provider with bound fetch method.
     * Same pattern as outbounds: this.provider.fetch = this.fetch.bind(this);
     */
    private readonly provider: CustomTableDataProvider<MockTableItem> = new CustomTableDataProvider<MockTableItem>(
        this.data$
    );

    public constructor() {
        // Bind the fetch method to the provider - same as outbounds pattern
        this.provider.fetch = this.fetch.bind(this);
        this.dataSource = new CustomTableDataSource(this.provider);
    }

    public ngOnDestroy(): void {
        this.resetPageActions();
    }

    public openPage(): void {
        this.overlay.nativeElement.style.width = '100%';
        this.fullscreen = true;
    }

    public closePage(event: Event): void {
        event.stopPropagation();
        this.resetPageActions();
    }

    public resetPageActions(): void {
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }

    /**
     * Handle tab change event
     *
     * IMPORTANT: This is where the scroll issue manifests.
     * When switching from Tab 2 (short) to Tab 3 (long),
     * the scroll doesn't appear until the table re-renders.
     *
     * Now using fetchTable() pattern like outbounds instead of overwriting dataSource.
     */
    public tabChanged(value: IconTabBarItem): void {
        const currentTab = this.activeTab();
        if (currentTab && value.id === currentTab.id) {
            return;
        }

        this.activeTab.set(value);

        if (!currentTab) {
            return;
        }
        this.fetchTable(true);

        /**
         * WORKAROUND: Uncomment the following setTimeout to fix the scroll issue.
         * This triggers a re-calculation of the scroll area after the DOM updates.
         *
         * setTimeout(() => {
         *   this.table()?._onSpyIntersect(true);
         * }, 500);
         */
    }

    /**
     * Fetch method bound to the provider.
     * Returns Observable with items based on active tab.
     * Same pattern as outbounds.component.ts fetch method.
     *
     * @param tableState - Current table state (pagination, sorting, etc.)
     * @returns Observable of items for the current tab
     */
    public fetch(tableState: TableState): Observable<MockTableItem[]> {
        return this.data$.pipe(
            switchMap(() => {
                switch (this.activeTab().id) {
                    case ScrollIssueTabId.Todo:
                        return of(TODO_ITEMS);
                    case ScrollIssueTabId.Sent:
                        return of(SENT_ITEMS);
                    case ScrollIssueTabId.Done:
                        return of(DONE_ITEMS);
                    default:
                        return of(TODO_ITEMS);
                }
            }),
            map((items) => {
                // Set total items for pagination (full count before slicing)
                this.provider.totalItems = items.length;

                // Apply pagination - same pattern as outbounds.component.ts
                const pageSize = tableState.page?.pageSize || 50;
                const currentPage = tableState.page?.currentPage || 1;
                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = startIndex + pageSize;

                // Return paginated subset of items
                return items.slice(startIndex, endIndex);
            })
        );
    }

    /**
     * Fetch table data - triggers table's fetch method.
     * Same pattern as outbounds.component.ts fetchTable method.
     *
     * @param resetPage - If true, resets the table to page 1
     */
    private fetchTable(resetPage = false): void {
        if (resetPage) {
            this.table()?.setCurrentPage(1);
        }
        this.table()?.fetch();
    }
}
