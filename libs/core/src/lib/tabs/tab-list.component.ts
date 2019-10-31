import {
    AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef,
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
import { Subscription } from 'rxjs';
import { TabsService } from './tabs.service';

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
    providers: [TabsService]
})
export class TabListComponent implements AfterContentInit, OnChanges, OnDestroy {

    /** @hidden */
    @ContentChildren(TabPanelComponent)
    panelTabs: QueryList<TabPanelComponent>;

    /** @hidden */
    @ViewChildren('tabLink')
    tabLinks: QueryList<ElementRef>;

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex: number = 0;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    private _tabsSubscription: Subscription;
    private _tabSelectSubscription: Subscription;

    constructor(
        private tabsService: TabsService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        setTimeout(() => {
            this.selectTab(this.selectedIndex);
        });

        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe(index => {
            if (index !== this.selectedIndex) {
                this.selectTab(index);
            }
        });

        this._tabsSubscription = this.panelTabs.changes.subscribe(() => {
            if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tabsSubscription.unsubscribe();
        this._tabSelectSubscription.unsubscribe();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            setTimeout(() => {
                this.selectTab(changes.selectedIndex.currentValue);
            });
        }
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void {
       if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.panelTabs.forEach((tab, index) => {
                tab.expanded = index === tabIndex;
            });
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
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
        this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map(tab => tab.nativeElement));
    }

    private isIndexInRange(): boolean {
        return this.panelTabs && this.panelTabs.length > 0 && this.selectedIndex < this.panelTabs.length;
    }

    private isTargetTabEnabled(index: number): boolean {
        return !this.panelTabs.toArray()[index].disabled;
    }

    private isTabContentEmpty(): boolean {
        let result = true;
        this.panelTabs.forEach(tab => {
            if (tab.expanded) {
                result = false;
            }
        });
        return result;
    }

    private resetTabHook(): void {
        this.selectedIndex = 0;
        setTimeout(() => {
            this.selectTab(this.selectedIndex);
        });
    }
}
