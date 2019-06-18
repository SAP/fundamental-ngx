import {
    AfterContentInit,
    ContentChildren, Directive,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TabItemDirective } from '../tab-item/tab-item.directive';

/**
 * Represents a list of tab-panels.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tab-list]',
    host: {
        role: 'tablist',
        class: 'fd-tabs'
    },
})
export class TabListComponent implements AfterContentInit, OnChanges, OnDestroy {

    /** @hidden */
    @ContentChildren(TabItemDirective) tabItems: QueryList<TabItemDirective>;

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex: number = 0;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    /** @hidden */
    private _tabsSubscription: Subscription;

    /** @hidden */
    private _tabsClickSubscription: Subscription[] = [];

    /** @hidden */
    private _tabsKeyPressSubscription: Subscription[] = [];

    /** @hidden */
    ngAfterContentInit(): void {
        if (!this.isAnyActiveTabItem()) {
            this.selectTab(this.selectedIndex);
        } else {
            this.selectedIndexChange.emit(this.getActiveTabItemIndex());
            this.selectedIndex = this.getActiveTabItemIndex();
        }

        this.refreshSubscriptions();
        this._tabsSubscription = this.tabItems.changes.subscribe(() => {
            if (!this.isListEmpty() && !this.isIndexInRange(this.selectedIndex) || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
            this.refreshSubscriptions();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tabsSubscription.unsubscribe();
        this._tabsClickSubscription.forEach(tab => tab.unsubscribe());
        this._tabsKeyPressSubscription.forEach(tab => tab.unsubscribe());
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
        if (this.isIndexInRange(tabIndex) && this.isTargetTabEnabled(tabIndex)) {
            this.tabItems.forEach((tab, index) => tab.activateChange(index === tabIndex));
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
                    this.getTabLinkFromIndex(this.tabItems.length - 1).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < this.tabItems.length) {
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

    /** Function that returns if there is any active tab*/
    isAnyActiveTabItem(): boolean {
        return !!this.tabItems.find(tab => tab.active);
    }

    /** Function that returns opened tab index*/
    getActiveTabItemIndex(): number | null {
        return this.tabItems.toArray().findIndex(item => item.active);
    }

    /** @hidden
     *  When There are some changes at amount of tabs there is a need to reset subscription
     * */
    private refreshSubscriptions() {
        this._tabsClickSubscription.forEach(tab => tab.unsubscribe());
        this._tabsKeyPressSubscription.forEach(tab => tab.unsubscribe());
        this._tabsClickSubscription = this.tabItems.map((tab, index) => tab.tabLink && tab.tabLink.clicked.subscribe(() =>
            this.tabHeaderClickHandler(index))
        );
        this._tabsKeyPressSubscription = this.tabItems.map((tab, index) => tab.tabLink && tab.tabLink.keyPressed.subscribe((event) =>
            this.tabHeaderKeyHandler(index, event))
        );
    }

    private isIndexInRange(tabIndex): boolean {
        return this.tabItems && tabIndex < this.tabItems.length;
    }

    private isListEmpty() {
        return this.tabItems && this.tabItems.length === 0;
    }

    private isTargetTabEnabled(index: number): boolean {
        return !this.tabItems.toArray()[index].disabled;
    }

    private isTabContentEmpty(): boolean {
        let result = true;
        this.tabItems.forEach(tab => {
            if (tab.active) {
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

    private getTabLinkFromIndex(index: number): TabItemDirective {
        return this.tabItems.toArray()[index];
    }
}
