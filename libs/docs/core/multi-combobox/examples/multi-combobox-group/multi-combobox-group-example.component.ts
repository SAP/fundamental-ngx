import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
import { JsonPipe } from '@angular/common';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { FormItemModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-multi-combobox-group-example',
    templateUrl: './multi-combobox-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormItemModule, FormLabelModule, CvaDirective, DataSourceDirective, MultiComboboxModule, JsonPipe]
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
