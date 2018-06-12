import { Component, OnInit, Input } from '@angular/core';

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
    @Input() title: string;

    @Input() disabled: boolean;

    id: string;
    expanded = false;

    ngOnInit() {}
}
