import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PlatformMultiComboboxModule } from '@fundamental-ngx/platform/form';

/**
 * Test scenario: Set selectedItems BEFORE datasource loads.
 *
 * This component intentionally delays datasource population to test
 * whether the multi-combobox can handle:
 * 1. Setting selectedItems via FormControl.setValue() before data is ready
 * 2. Once datasource loads, verify tokens and checkboxes reconcile correctly
 */
@Component({
    selector: 'fdp-multi-combobox-delayed-datasource-example',
    templateUrl: './multi-combobox-delayed-datasource-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, PlatformMultiComboboxModule, ButtonComponent, JsonPipe]
})
export class MultiComboboxDelayedDatasourceExampleComponent {
    // Datasource starts empty, populated after delay
    dataSource = signal<{ name: string; type: string }[]>([]);

    // FormControl with initial value (set BEFORE datasource loads)
    formControl = new FormControl<{ name: string; type: string }[]>([]);

    // Trigger to simulate external data load
    loadDataSourceDelayed(): void {
        console.log('Loading datasource after 2 seconds...');
        setTimeout(() => {
            const data = [
                { name: 'Apple', type: 'Fruits' },
                { name: 'Banana', type: 'Fruits' },
                { name: 'Pineapple', type: 'Fruits' },
                { name: 'Strawberry', type: 'Fruits' },
                { name: 'Broccoli', type: 'Vegetables' },
                { name: 'Carrot', type: 'Vegetables' },
                { name: 'Jalapeño', type: 'Vegetables' },
                { name: 'Spinach', type: 'Vegetables' }
            ];
            this.dataSource.set(data);
            console.log('Datasource loaded:', data);
        }, 2000);
    }

    // Set selected items BEFORE datasource loads
    setValueBeforeDataload(): void {
        const selectedItems = [
            { name: 'Banana', type: 'Fruits' },
            { name: 'Carrot', type: 'Vegetables' }
        ];
        console.log('Setting formControl value BEFORE datasource loads:', selectedItems);
        this.formControl.setValue(selectedItems);
    }

    // Clear for re-testing
    reset(): void {
        this.dataSource.set([]);
        this.formControl.setValue([]);
        console.log('Reset: datasource cleared, form value cleared');
    }
}
