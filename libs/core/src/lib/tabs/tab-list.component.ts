import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
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
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabPanelComponent } from './tab/tab-panel.component';
import { merge, Subject, timer } from 'rxjs';
import { TabsService } from './tabs.service';
import { filter, takeUntil } from 'rxjs/operators';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';

export type TabModes = 'icon-only' | 'process' | 'filter';

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
    @ViewChildren(TabLinkDirective)
    tabLinks: QueryList<TabLinkDirective>;

    /** @hidden */
    @ViewChildren(TabItemDirective)
    tabItem: QueryList<TabItemDirective>;

    /** @hidden */
    @ViewChild('tabsItemContainer')
    tabsItemContainer: ElementRef;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex = 0;

    /** Whether user wants to use tab component in compact mode */
    @Input()
    compact = false;

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

    constructor(private _tabsService: TabsService, private _changeRef: ChangeDetectorRef) {}


    /** @hidden */
    ngAfterViewInit(): void {

        this.tabItem.forEach(tab => console.log(tab.elementRef().nativeElement.offsetWidth));
        console.log(`In total: ${this.tabsItemContainer.nativeElement.offsetWidth}`);
        console.log(`Capacity: ${this._getContainerContainerCapacity()}`);

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
    selectTab(tabIndex: number, emitEvent?: boolean): void {
        if (this._canBeSelected(tabIndex)) {
            timer(10)
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(() => {
                    this.panelTabs.forEach((tab, index) => {
                        tab.triggerExpandedPanel(index === tabIndex);
                    });
                    this.selectedIndex = tabIndex;
                    if (emitEvent) {
                        this.selectedIndexChange.emit(tabIndex);
                    }
                    this._detectChanges();
                });
        }
    }

    /** @hidden */
    tabHeaderClickHandler(tabIndex: number): void {
        if (tabIndex !== this.selectedIndex) {
            this.selectTab(tabIndex, true);
        }
    }

    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any): void {
        this._tabsService.tabHeaderKeyHandler(
            index,
            event,
            this.tabLinks.map(tab => tab.elementRef.nativeElement)
        );
    }

    /** @hidden */
    private _listenOnTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                filter(index => index !== this.selectedIndex)
            )
            .subscribe((index) => this.selectTab(index, true));
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
            .subscribe(() => this._resetTabHook());
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this._tabsService.tabPanelPropertyChanged, this.panelTabs.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden */
    private _isIndexInRange(index: number): boolean {
        return this.panelTabs && this.panelTabs.length > 0 && index < this.panelTabs.length;
    }

    /** @hidden */
    private _isAnyTabExpanded(): boolean {
        return !this.panelTabs.some((tab) => tab.expanded);
    }

    /** @hidden */
    private _resetTabHook(): void {
        this.selectTab(0, true);
    }

    private _detectChanges(): void {
        if (this._changeRef && !this._changeRef['destroyed']) {
            this._changeRef.detectChanges();
        }
    }

    private _isDisabled(index: number): boolean {
        return this.panelTabs.toArray()[index].disabled;
    }

    private _canBeSelected(index: number): boolean {
        return this._isIndexInRange(index) && !this._isDisabled(index);
    }

    private _collapseItems(): void {
        this.panelTabs.forEach(tab => console.log(tab.elementRef.nativeElement.offsetWidth));
    }

    private _getContainerContainerCapacity(): number {
        const pixelToNumber = (pixels: string) => Number(pixels.replace('px', ''));
        const computedStyle = window.getComputedStyle(this.tabsItemContainer.nativeElement);

        return pixelToNumber(computedStyle.width) - pixelToNumber(computedStyle.paddingLeft) - pixelToNumber(computedStyle.paddingRight);
    }
}
