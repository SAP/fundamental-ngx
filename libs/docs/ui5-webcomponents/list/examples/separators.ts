import { Component } from '@angular/core';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

@Component({
    selector: 'ui5-list-separators-example',
    templateUrl: './separators.html',
    standalone: true,
    imports: [List, ListItemStandard]
})
export class ListSeparatorsExample {
    noSeparatorItems = [
        {
            name: 'Item #1',
            icon: 'product'
        },
        {
            name: 'Item #2',
            icon: 'product'
        },
        {
            name: 'Item #3',
            icon: 'product'
        }
    ];

    innerSeparatorItems = [
        {
            name: 'Delivered',
            icon: 'shipping-status'
        },
        {
            name: 'Pending',
            icon: 'shipping-status'
        },
        {
            name: 'Declined',
            icon: 'shipping-status'
        }
    ];
}
