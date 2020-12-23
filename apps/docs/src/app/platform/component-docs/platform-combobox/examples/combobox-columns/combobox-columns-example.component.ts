import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-combobox-columns-example',
    templateUrl: './combobox-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboboxColumnsExampleComponent {
    dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Biiiiiiiiiiiiiiiiiiiiiiggggggggggggggggggggggggg Banananananananananananananananananananananananananananananananananananananana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];

    selectedItem = null;

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
