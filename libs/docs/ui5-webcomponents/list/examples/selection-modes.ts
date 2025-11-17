import { Component, signal } from '@angular/core';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { List } from '@fundamental-ngx/ui5-webcomponents/list';
import { ListItemStandard } from '@fundamental-ngx/ui5-webcomponents/list-item-standard';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';
import { ListSelectionMode } from '@fundamental-ngx/ui5-webcomponents/types';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-list-selection-modes-example',
    templateUrl: './selection-modes.html',
    standalone: true,
    imports: [List, ListItemStandard, Label, Select, Option, Text]
})
export class ListSelectionModesExample {
    readonly selectedMode = signal<ListSelectionMode>(ListSelectionMode.None);
    readonly selectedItems = signal<string[]>([]);

    readonly selectionModes = signal([
        { value: ListSelectionMode.None, label: 'None (No selection)' },
        { value: ListSelectionMode.Single, label: 'Single Select Mode' },
        { value: ListSelectionMode.SingleStart, label: 'Single Select Begin Mode' },
        { value: ListSelectionMode.SingleEnd, label: 'Single Select End Mode' },
        { value: ListSelectionMode.Multiple, label: 'Multiple Select Mode' },
        { value: ListSelectionMode.Delete, label: 'Delete Mode' }
    ]);

    readonly countries = signal([
        { name: 'Germany', capital: 'Berlin', population: '83M' },
        { name: 'France', capital: 'Paris', population: '67M' },
        { name: 'Italy', capital: 'Rome', population: '60M' },
        { name: 'Spain', capital: 'Madrid', population: '47M' },
        { name: 'Poland', capital: 'Warsaw', population: '38M' }
    ]);

    onSelectionModeChange(event: CustomEvent): void {
        const selectedValue = (event.target as any).selectedOption?.value;
        if (selectedValue) {
            this.selectedMode.set(selectedValue);
            this.selectedItems.set([]);
        }
    }

    onSelectionChange(event: CustomEvent): void {
        const selectedItems = event.detail.selectedItems.map((item: any) => item.textContent.trim());
        this.selectedItems.set(selectedItems);
    }

    onItemDelete(event: CustomEvent): void {
        const deletedItemText = event.detail.item.textContent.trim();
        this.countries.update((countries) => countries.filter((country) => country.name !== deletedItemText));
    }
}
