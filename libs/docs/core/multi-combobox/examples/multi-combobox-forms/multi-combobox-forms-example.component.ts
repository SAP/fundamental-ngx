import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';

@Component({
    selector: 'fd-multi-combobox-forms-example',
    templateUrl: './multi-combobox-forms-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiComboboxFormsExampleComponent {
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

    customForm = new FormGroup({
        field: new FormControl(this.dataSource[3])
    });

    selectedItems = [this.dataSource[3]];

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }
}
