import { Component, signal } from '@angular/core';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';

@Component({
    selector: 'ui5-multi-combobox-select-all-items-sample',
    templateUrl: './select-all-items.html',
    standalone: true,
    imports: [MultiComboBox, MultiComboBoxItem]
})
export class MultiComboBoxSelectAllItemsExample {
    countries = signal<string[]>([
        'Albania',
        'Argentina',
        'Bulgaria',
        'Croatia',
        'Italy',
        'Philippines',
        'Portugal',
        'Spain',
        'The United Kingdom of Great Britain and Northern Ireland'
    ]);
}
