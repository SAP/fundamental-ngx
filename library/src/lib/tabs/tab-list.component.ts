import {
    AfterContentInit,
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
    encapsulation: ViewEncapsulation.None
})
export class TabListComponent implements AfterContentInit, OnChanges, OnDestroy {

    /** @hidden */
    @ContentChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

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

    /** @hidden */
    ngAfterContentInit(): void {
        setTimeout(() => {
            this.selectTab(this.selectedIndex);
        });

        this._tabsSubscription = this.tabs.changes.subscribe(() => {
            if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tabsSubscription.unsubscribe();
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
            this.tabs.forEach((tab, index) => {
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
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1).focus();
                } else {
                    this.getTabLinkFromIndex(this.tabLinks.length - 1).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < this.tabLinks.length) {
                    this.getTabLinkFromIndex(index + 1).focus();
                } else {
                    this.getTabLinkFromIndex(0).focus();
                }
                break;
            }
            case ('Space'): {
                event.preventDefault();
                if (index !== this.selectedIndex) {
                    this.selectTab(index);
                }
                break;
            }
            case ('Enter'): {
                if (index !== this.selectedIndex) {
                    this.selectTab(index);
                }
            }
        }
    }

    private isIndexInRange(): boolean {
        return this.tabs && this.tabs.length > 0 && this.selectedIndex < this.tabs.length;
    }

    private isTargetTabEnabled(index: number): boolean {
        return !this.tabs.toArray()[index].disabled;
    }

    private isTabContentEmpty(): boolean {
        let result = true;
        this.tabs.forEach(tab => {
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

    private getTabLinkFromIndex(index: number): HTMLElement {
        return this.tabLinks.toArray()[index].nativeElement as HTMLElement;
    }
}
