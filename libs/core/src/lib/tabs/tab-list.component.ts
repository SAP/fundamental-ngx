import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabPanelComponent } from './tab/tab-panel.component';
import { merge, Subject, Subscription } from 'rxjs';
import { TabsService } from './tabs.service';
import { filter, takeUntil } from 'rxjs/operators';

export type TabModes = 'icon-only' | 'process' | 'filter'

export type TabSizes = 's' | 'm' | 'l' | 'xl' | 'xxl';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss'],
    host: {
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TabsService]
})
export class TabListComponent implements AfterViewInit, OnChanges, OnDestroy {

    /** @hidden */
    @ContentChildren(TabPanelComponent)
    panelTabs: QueryList<TabPanelComponent>;

    /** @hidden */
    @ViewChildren('tabLink')
    tabLinks: QueryList<ElementRef>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex: number = 0;

    /** Whether user wants to use tab component in compact mode */
    @Input()
    compact: boolean = false;

    /** Size of tab, it's mostly about adding spacing on tab container, available sizes 's' | 'm' | 'l' | 'xl' | 'xxl' */
    @Input()
    size: TabSizes = 'm';

    /**
     * Whether user wants to use tab component in certain mode. Modes available:
     * 'icon-only' | 'process' | 'filter'
     */
    @Input()
    mode: TabModes;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    constructor(
        private _tabsService: TabsService,
        private _changeRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.selectTab(this.selectedIndex);
        this._listenOnTabSelect();
        this._listenOnContentQueryListChange();
        this._listenOnPropertiesChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            this.selectTab(changes.selectedIndex.currentValue);
        }
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
        if (this._isIndexInRange(tabIndex)) {
            setTimeout(() => {
                this.panelTabs.forEach((tab, index) => {
                    tab.triggerExpandedPanel(index === tabIndex);
                });
                this.selectedIndex = tabIndex;
                this.selectedIndexChange.emit(tabIndex);
                this._detectChanges();
            })
        }
    }

    /** @hidden */
    tabHeaderClickHandler(tabIndex: number): void {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    }

    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any): void {
        this._tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map(tab => tab.nativeElement));
    }

    /** @hidden */
    private _listenOnTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                filter(index => index !== this.selectedIndex)
            )
            .subscribe(index => this.selectTab(index))
        ;
    }

    /**
     * @hidden
     * Every time any of query is changed, ex. tab is removed or added
     * reference to keydown subscriptions handler is renewed
     */
    private _listenOnContentQueryListChange(): void {
        this.panelTabs.changes
            .pipe(
                takeUntil(this._onDestroy$),
                filter(() => !this._isIndexInRange(this.selectedIndex) || this._isAnyTabExpanded())
            )
            .subscribe(() => this._resetTabHook())
        ;
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this._tabsService.tabPanelPropertyChanged, this.panelTabs.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges())
        ;
    }

    /** @hidden */
    private _isIndexInRange(index: number): boolean {
        return this.panelTabs && this.panelTabs.length > 0 && index < this.panelTabs.length;
    }

    /** @hidden */
    private _isAnyTabExpanded(): boolean {
        return !this.panelTabs.some(tab => tab.expanded);
    }

    /** @hidden */
    private _resetTabHook(): void {
        this.selectTab(0);
    }

    private _detectChanges(): void {
        if (this._changeRef && !this._changeRef['destroyed']) {
            this._changeRef.detectChanges();
        }
    }
}
