import { Component, Input, OnInit } from '@angular/core';
import { TabConfig } from '../../../../../../../../../libs/core/src/lib/icon-tab-bar/types';
import { longTextTypeConfig, textTypeConfig } from '../config-for-examples/text-type.config';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './icon-tab-bar-text-type-example.component.html'
})
export class IconTabBarTextTypeExampleComponent implements OnInit {

    @Input()
    textTypeLayoutMode: 'row' | 'column' = 'row';

    @Input()
    enableTabReordering = false;

    @Input() withOverflowExample = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? longTextTypeConfig : textTypeConfig;
    }
}
