import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

import { ArrayComboBoxDataSource, DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-combobox-datasource-example',
    templateUrl: './combobox-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class ComboboxDatasourceExampleComponent {
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

    selectedItem1 = null;
    selectedItem2 = null;
    selectedItem3 = null;
    selectedItem4 = null;

    onSelect1(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem1 = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }

    onSelect3(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem3 = item.payload;
    }

    onSelect4(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem4 = item.payload;
    }
}
