import {
    Component,
    ViewEncapsulation,
    OnInit,
    AfterContentInit,
    Input,
    QueryList,
    ContentChildren
} from '@angular/core';

@Component({
    selector: 'fd-tab',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded',
        '[id]': 'id'
    },
    templateUrl: './tab.component.html'
})
export class TabPanelComponent implements OnInit {
    @Input() title;

    @Input() disabled;

    id: string;
    expanded = false;

    ngOnInit() {}
}

@Component({
    selector: 'fd-tab-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './tab-list.component.html',
    styles: [
        `
            :host,
            fd-tab {
                display: block;
            }
        `
    ]
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

        if (this.selected) {
            this.selected.expanded = false;
            this.selected = tab;
            this.selected.expanded = true;
            this.selected.disabled === 'true' ? (this.selected.expanded = false) : (this.selected.expanded = true);
        }
    }
}
