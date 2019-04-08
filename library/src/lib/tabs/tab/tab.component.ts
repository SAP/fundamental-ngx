import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { HashService } from '../../utils/hash.service';

@Component({
    selector: 'fd-tab',
    templateUrl: './tab.component.html',
    host: {
        role: 'tabpanel',
        class: 'fd-tabs__panel',
        '[attr.id]': 'id',
        '[attr.aria-expanded]': 'expanded ? true : null',
        '[class.is-expanded]': 'expanded'
    },
    providers: [HashService]
})
export class TabPanelComponent implements OnInit {
    @Input()
    title: string | TemplateRef<any>;

    @Input()
    disabled: boolean;

    @Input()
    id: string;

    expanded = false;

    index: number;

    constructor(private hasher: HashService) {}

    ngOnInit(): void {
        if (!this.id) {
            this.id = this.hasher.hash();
        }
    }
}
