import {
    AfterContentInit,
    Component, ContentChild,
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
import { TabNavDirective } from './tab-nav/tab-nav.directive';
import { TabLinkDirective } from './tab-link/tab-link.directive';

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
    panelTabs: QueryList<TabPanelComponent>;

    /** @hidden */
    @ContentChild(TabNavDirective)
    tabNav: TabNavDirective;

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
    private _tabNavKeyDownSubscription: Subscription;

    /** @hidden */
    ngAfterContentInit(): void {
        setTimeout(() => {
            if (!this.tabNav) {
                this.selectTab(this.selectedIndex);
            }
        });

        if (this.panelTabs) {
            this._tabsSubscription = this.panelTabs.changes.subscribe(() => {
                if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                    this.resetTabHook();
                }
            });
        }

        if (this.tabNav) {
            this._tabNavKeyDownSubscription = this.tabNav.onKeyDown.subscribe(key => this.tabHeaderKeyHandler(key.index, key.event))
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._tabsSubscription) {
            this._tabsSubscription.unsubscribe();
        }
        if (this._tabNavKeyDownSubscription) {
            this._tabNavKeyDownSubscription.unsubscribe();
        }
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
        if (this.tabNav) {
            this.tabNav.tabLinks[tabIndex].elementRef.nativeElement.click();
        } else if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
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
        switch (event.code) {
            case ('ArrowLeft'): {
                if (index - 1 >= 0) {
                    this.getTabLinkFromIndex(index - 1).focus();
                } else {
                    this.getTabLinkFromIndex(this.tabs.length - 1).focus();
                }
                break;
            }
            case ('ArrowRight'): {
                if (index + 1 < this.tabs.length) {
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

    public get tabs(): TabPanelComponent[] | TabLinkDirective[] {
        if (this.tabNav) {
            return this.tabNav.tabLinks;
        } else if (this.panelTabs.length > 0) {
            return this.panelTabs.toArray();
        } else {
            return [];
        }
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

    private getTabLinkFromIndex(index: number): HTMLElement {
        if (this.tabLinks.toArray().length > 0) {
            return this.tabLinks.toArray()[index].nativeElement as HTMLElement;
        } else if (this.tabNav) {
            return this.tabNav.tabLinks[index].elementRef.nativeElement as HTMLElement;
        }
    }
}
