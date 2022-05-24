import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-multi-combobox-group-example',
    templateUrl: './multi-combobox-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class MultiComboboxGroupExampleComponent {
    dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];

    selectedItems = [this.dataSource[1]];
    selectedItems1 = [];

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }

    onSelect1(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems1 = item.selectedItems;
    }
}
