import { Component, signal } from '@angular/core';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';

import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

// Import icons used in the example
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-list-basic-example',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [List, ListItemStandard, Label]
})
export class ListBasicExample {
    readonly listItems = signal([
        {
            text: 'Laptop',
            description: 'High-performance laptop for development',
            icon: 'laptop',
            additionalText: '$1,299'
        },
        {
            text: 'Keyboard',
            description: 'Mechanical keyboard with RGB lighting',
            icon: 'keyboard-and-mouse',
            additionalText: '$199'
        },
        {
            text: 'Monitor',
            description: '27-inch 4K display',
            icon: 'sys-monitor',
            additionalText: '$399'
        },
        {
            text: 'Mouse',
            description: 'Wireless ergonomic mouse',
            icon: 'cursor-arrow',
            additionalText: '$79'
        }
    ]);

    readonly headerText = signal('Product Catalog');
    readonly footerText = signal('4 items total');
}
