import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
@Component({
    selector: 'fd-multi-combobox-columns-example',
    templateUrl: './multi-combobox-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxColumnsExampleComponent {
    dataSource = [
        { id: '1', name: 'Apple', type: 'Fruits' },
        { id: '2', name: 'Banana', type: 'Fruits' },
        { id: '3', name: 'Florida Evergreen Blueberry', type: 'Fruits' },
        { id: '4', name: 'Pineapple', type: 'Fruits' },
        { id: '5', name: 'Strawberry', type: 'Fruits' },
        { id: '6', name: 'Broccoli', type: 'Vegetables' },
        { id: '7', name: 'Carrot', type: 'Vegetables' },
        { id: '8', name: 'Jalapeño', type: 'Vegetables' },
        { id: '9', name: 'Spinach', type: 'Vegetables' }
    ];

    selectedItems = [];

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }
}
