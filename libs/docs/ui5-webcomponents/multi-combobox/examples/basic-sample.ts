import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';

interface Country {
    code: string;
    name: string;
}

@Component({
    selector: 'ui5-multi-combobox-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [MultiComboBox, MultiComboBoxItem]
})
export class MultiComboBoxBasicExample {
    selected = signal<string[]>(['United States', 'United Kingdom']);

    countries = signal<Country[]>([
        { code: 'US', name: 'United States' },
        { code: 'UK', name: 'United Kingdom' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'JP', name: 'Japan' },
        { code: 'CN', name: 'China' },
        { code: 'IN', name: 'India' },
        { code: 'AU', name: 'Australia' },
        { code: 'BR', name: 'Brazil' },
        { code: 'CA', name: 'Canada' }
    ]);

    onCountrySelectionChange(event: UI5WrapperCustomEvent<MultiComboBox, 'ui5SelectionChange'>): void {
        const items = event.detail.items;
        this.selected.set(items.map((item) => item.text || ''));
    }
}
