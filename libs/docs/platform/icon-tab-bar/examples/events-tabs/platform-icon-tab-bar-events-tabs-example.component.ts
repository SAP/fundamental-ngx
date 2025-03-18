import { Component, Input, OnInit } from '@angular/core';
import { IconTabBarComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { cloneDeep } from 'lodash-es';
import { longTextTypeConfig, textTypeConfig } from '../config-for-examples/text-type.config';
import { NgFor } from '@angular/common';

@Component({
    selector: 'fdp-platform-icon-tab-bar-events-type-example',
    templateUrl: './platform-icon-tab-bar-events-tabs-example.component.html',
    imports: [IconTabBarComponent, NgFor]
})
export class PlatformIconTabBarEventsTypeExampleComponent implements OnInit {
    @Input()
    textTypeLayoutMode: 'row' | 'column' = 'row';

    @Input()
    enableTabReordering = false;

    @Input()
    withOverflowExample = false;

    @Input()
    nested = false;

    items: TabConfig[];

    list: number[] = [];

    counter = 0;

    ngOnInit(): void {
        this.items = this.withOverflowExample ? cloneDeep(longTextTypeConfig) : cloneDeep(textTypeConfig);
        if (this.nested) {
            this.items[3].subItems = [
                {
                    label: 'Item 0',
                    counter: null,
                    color: 'critical',
                    subItems: [
                        {
                            label: 'Item 0.1',
                            counter: null,
                            color: null
                        },
                        {
                            label: 'Item 0.2',
                            counter: null,
                            color: null
                        }
                    ]
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

    onTabSelected(event: TabConfig): void {
        // alert('Selected tab:' + event);
        // console.log('Selected tab:' + event);
        this.list.push(this.counter++);
    }
}
