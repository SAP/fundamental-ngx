import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    FdpFormGroupModule,
    MultiComboboxSelectionChangeEvent,
    PlatformMultiComboboxModule
} from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-multi-combobox-forms-example',
    templateUrl: './multi-combobox-forms-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformMultiComboboxModule, ButtonComponent, JsonPipe]
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

    // Idiom 1: Reactive Forms with CVA directive binding
    reactiveFormControl = new FormControl<typeof this.dataSource>([this.dataSource[3]]);
    customForm = new FormGroup({
        reactiveFormsCombo: this.reactiveFormControl
    });

    // Idiom 2: Pure signal-based state (no FormControl)
    pureSignalSelection = signal([this.dataSource[3], this.dataSource[4]]);

    onPureSignalChange(item: MultiComboboxSelectionChangeEvent): void {
        this.pureSignalSelection.set(item.selectedItems);
    }

    // Programmatic updates via FormControl
    selectAllFruits(): void {
        const fruits = this.dataSource.filter((item) => item.type === 'Fruits');
        this.reactiveFormControl.setValue(fruits);
    }

    clearReactiveForm(): void {
        this.reactiveFormControl.setValue([]);
    }

    // Programmatic updates via signal
    selectAllVegetables(): void {
        const vegetables = this.dataSource.filter((item) => item.type === 'Vegetables');
        this.pureSignalSelection.set(vegetables);
    }

    clearSignal(): void {
        this.pureSignalSelection.set([]);
    }
}
