import {
    AfterContentChecked,
    AfterContentInit, ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter, Input, OnChanges, OnDestroy,
    Output,
    QueryList, SimpleChanges
} from '@angular/core';
import { TabPanelComponent } from './tab/tab.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements AfterContentChecked, AfterContentInit, OnChanges, OnDestroy {

    @ContentChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    @Input()
    selectedIndex: number = 0;

    @Output()
    selectedIndexChange = new EventEmitter<number>();

    private _tabsSubscription: Subscription;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngAfterContentChecked(): void {
        // Stuff to do after check, see angular material tab-group
    }

    ngAfterContentInit(): void {
        this.setupTabs();

        this._tabsSubscription = this.tabs.changes.subscribe(() => {
            // new number of tabs, reset
        });
        this.cdRef.detectChanges();
    }

    ngOnDestroy(): void {
        this._tabsSubscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            setTimeout(() => {
                this.selectTab(changes.selectedIndex.currentValue);
            });
        }
    }

    selectTab(tabIndex: number): void {
        if (this.checkIndexInRange() && this.checkTargetTabEnabled(tabIndex)) {
            this.tabs.forEach((tab, index) => {
                tab.expanded = index === tabIndex;
            });
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
        }
    }

    private setupTabs(): void {
        this.tabs.forEach((tab, index) => {
            tab.index = index;
        });
        this.selectTab(this.selectedIndex);
    }

    private checkIndexInRange(): boolean {
        return this.tabs && this.selectedIndex < this.tabs.length;
    }

    private checkTargetTabEnabled(index: number): boolean {
        return !this.tabs.toArray()[index].disabled;
    }
}
