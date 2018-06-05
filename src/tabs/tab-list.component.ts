import { AfterContentInit, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { TabPanelComponent } from './tabs.component';

@Component({
    selector: 'fd-tab-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements AfterContentInit {
    @ContentChildren(TabPanelComponent) tabs: QueryList<TabPanelComponent>;

    selected: TabPanelComponent;

    ngAfterContentInit() {
        this.selected = this.tabs.first;
        this.tabs.forEach(tab => {
            tab === this.selected ? (tab.expanded = true) : (tab.expanded = false);
        });
    }

    select($event: MouseEvent, tab: TabPanelComponent) {
        $event.preventDefault();
        if (tab.disabled) {
            return;
        }

        if (this.selected) {
            this.selected = tab;
            this.selected.expanded = true;
        }
    }
}
