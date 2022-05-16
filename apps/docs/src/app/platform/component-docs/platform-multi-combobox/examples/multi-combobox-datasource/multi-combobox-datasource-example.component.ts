import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

import { DATA_PROVIDERS, ArrayComboBoxDataSource } from '@fundamental-ngx/platform/shared';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-multi-combobox-datasource-example',
    templateUrl: './multi-combobox-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class MultiComboboxDatasourceExampleComponent {
    dataSourceStrings = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];

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

    dataSourceOf = of(this.dataSource);
    ds = new ArrayComboBoxDataSource(this.dataSource);

    selectedItems1 = [this.dataSourceStrings[1]];
    selectedItems2 = [this.dataSource[1]];
    selectedItems3 = [];
    selectedItems4 = [];
    selectedItems5 = [
        this.dataSourceStrings[1],
        this.dataSourceStrings[2],
        this.dataSourceStrings[3],
        this.dataSourceStrings[4]
    ];

    onSelect1(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems1 = item.selectedItems;
    }

    onSelect2(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems2 = item.selectedItems;
    }

    onSelect3(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems3 = item.selectedItems;
    }

    onSelect4(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems4 = item.selectedItems;
    }

    onSelect5(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems5 = item.selectedItems;
    }
}
