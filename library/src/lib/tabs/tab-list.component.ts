import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { TabPanelComponent } from './tabs.component';

@Component({
    selector: 'fd-tab-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements AfterContentInit {
    @ContentChildren(TabPanelComponent) tabs: QueryList<TabPanelComponent>;

    @Output() tabChange = new EventEmitter<any>();

    selected: TabPanelComponent;

    ngAfterContentInit() {
        this.selected = this.tabs.first;
        this.tabs.forEach(tab => {
            tab === this.selected ? (tab.expanded = true) : (tab.expanded = false);
        });
    }

    select(tabId) {
        this.tabs.forEach(tab => {
            if (tab.id === tabId) {
                if (tab.disabled) {
                    return;
                } else {
                    this.selected.expanded = false;
                }

                if (this.selected) {
                    this.selected = tab;
                    this.selected.expanded = true;
                    this.tabChange.emit(tab.id);
                }
            }
        });
    }

    tabClicked($event: MouseEvent, tabId) {
        if ($event) {
            $event.preventDefault();
        }
        this.select(tabId);
    }

    onKeypressHandler($event: KeyboardEvent, tabId) {
        if ($event.code === 'Space' || $event.code === 'Enter') {
            $event.preventDefault();
            this.select(tabId);
        }
    }
}
