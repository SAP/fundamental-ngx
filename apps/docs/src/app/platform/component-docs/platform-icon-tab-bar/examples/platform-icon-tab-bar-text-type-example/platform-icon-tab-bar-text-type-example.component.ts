import { Component, Input, OnInit } from '@angular/core';
import { longTextTypeConfig, textTypeConfig } from '../config-for-examples/text-type.config';
import { cloneDeep } from '@fundamental-ngx/core/utils';
import { TabConfig } from '../../platform-icon-tab-bar-docs.component';

@Component({
    selector: 'fd-icon-tab-bar-text-type-example',
    templateUrl: './platform-icon-tab-bar-text-type-example.component.html'
})
export class PlatformIconTabBarTextTypeExampleComponent implements OnInit {
    @Input()
    textTypeLayoutMode: 'row' | 'column' = 'row';

    @Input()
    enableTabReordering = false;

    @Input()
    withOverflowExample = false;

    @Input()
    nested = false;

    items: TabConfig[];

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longTextTypeConfig) : cloneDeep(textTypeConfig);
        if (this.nested) {
            this.items[3].subItems = [
                {
                    label: 'Item 0',
                    counter: null,
                    color: 'critical'
                },
                {
                    label: 'Item 1',
                    counter: null,
                    color: null
                },
                {
                    label: 'Item 2',
                    counter: null,
                    color: null
                }
            ];
        }
    }
}
