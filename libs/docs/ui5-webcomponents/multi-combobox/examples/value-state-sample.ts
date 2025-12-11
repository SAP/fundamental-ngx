import { Component, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';
import { SegmentedButton } from '@fundamental-ngx/ui5-webcomponents/segmented-button';
import { SegmentedButtonItem } from '@fundamental-ngx/ui5-webcomponents/segmented-button-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-multi-combobox-value-state-sample',
    templateUrl: './value-state-sample.html',
    standalone: true,
    imports: [MultiComboBox, MultiComboBoxItem, SegmentedButton, SegmentedButtonItem]
})
export class MultiComboBoxValueStateExample {
    fruits = signal<string[]>(['Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Strawberry', 'Pineapple']);

    valueStates = signal(ValueState);

    valueState = signal<ValueState>(ValueState.None);

    valueStateSelected = signal<string[]>([]);

    setValueState(event: UI5WrapperCustomEvent<SegmentedButton, 'ui5SelectionChange'>): void {
        const state = event.detail.selectedItems[0].textContent?.trim() as ValueState;
        this.valueState.set(state);
    }
}
