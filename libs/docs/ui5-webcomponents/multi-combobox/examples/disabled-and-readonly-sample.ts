import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-multi-combobox-disabled-and-readonly-sample',
    templateUrl: './disabled-and-readonly-sample.html',
    standalone: true,
    imports: [MultiComboBox, MultiComboBoxItem, Button]
})
export class MultiComboBoxDisabledAndReadonlyExample {
    disabledState = signal(false);
    readonlyState = signal(false);

    toggleDisabled(): void {
        this.disabledState.update((v) => !v);
    }

    toggleReadonly(): void {
        this.readonlyState.update((v) => !v);
    }
}
