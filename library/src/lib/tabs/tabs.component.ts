import { Component, OnInit, Input, Inject } from '@angular/core';
import { HashService } from '../utils/hash.service';

@Component({
    selector: 'fd-tab',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded',
        '[id]': 'id'
    },
    templateUrl: './tab.component.html',
    providers: [HashService]
})
export class TabPanelComponent implements OnInit {
    @Input() title: string;

    @Input() disabled: boolean;

    @Input() id: string;

    expanded = false;

    constructor(@Inject(HashService) private hasher: HashService) {}

    ngOnInit() {
        if (!this.id) {
            this.id = this.hasher.hash();
        }
    }
}
