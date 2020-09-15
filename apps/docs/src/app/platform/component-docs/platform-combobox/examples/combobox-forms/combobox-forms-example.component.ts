import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-combobox-forms-example',
    templateUrl: './combobox-forms-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboboxFormsExampleComponent {
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

    selectedItem = this.dataSource[3];

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
