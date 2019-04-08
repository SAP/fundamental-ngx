import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter, Input, OnChanges,
    Output,
    QueryList, SimpleChanges
} from '@angular/core';
import { TabPanelComponent } from './tab.component';

@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements AfterContentInit, OnChanges {

    @ContentChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    @Input()
    selectedIndex: number = 0;

    @Output()
    selectedIndexChange = new EventEmitter<number>();

    private isSetup = false;

    ngAfterContentInit(): void {
        setTimeout(() => {
            this.setupTabs();
            this.isSetup = true;
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.isSetup) {
            return;
        }

        if (changes.selectedIndex) {
            setTimeout(() => {
                this.selectTab(changes.selectedIndex.currentValue);
            });
        }
    }

    selectTab(tabIndex: number): void {
        if (this.checkIndexInRange()) {
            this.tabs.forEach((tab, index) => {
                if (index === tabIndex) {
                    tab.expanded = true;
                } else {
                    tab.expanded = false;
                }
            });
            this.selectedIndex = tabIndex;
        }
    }

    private setupTabs(): void {
        this.tabs.forEach((tab, index) => {
            tab.index = index;
            tab.tabClicked.subscribe(result => {
                this.selectTab(result);
            });
        });
        this.selectTab(this.selectedIndex);
    }

    private checkIndexInRange(): boolean {
        return this.tabs && this.selectedIndex < this.tabs.length;
    }
}
