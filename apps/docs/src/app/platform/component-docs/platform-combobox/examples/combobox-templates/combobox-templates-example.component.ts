import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-combobox-templates-example',
    templateUrl: './combobox-templates-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        '.fd-template-container-div { display: flex; align-items: center; cursor: pointer;}',
        '.fd-template-container-div:hover { background-color: var(--fd-color-background-hover); }',
        '.fd-template-icon { margin-right: 12px; }'
    ]
})
export class ComboboxTemplatesExampleComponent {
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

    selectedItem = null;
    selectedItem1 = null;
    selectedItem2 = null;
    selectedItem3 = null;

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }

    onSelect1(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem1 = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }

    onSelect3(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem3 = item.payload;
    }
}
