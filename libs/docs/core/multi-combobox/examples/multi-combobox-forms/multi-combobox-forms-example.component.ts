import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSourceDirective } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MultiComboboxComponent, MultiComboboxSelectionChangeEvent } from '@fundamental-ngx/core/multi-combobox';
@Component({
    selector: 'fd-multi-combobox-forms-example',
    templateUrl: './multi-combobox-forms-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormItemComponent,
        FormLabelComponent,
        CvaDirective,
        DataSourceDirective,
        MultiComboboxComponent,
        ButtonComponent,
        JsonPipe
    ]
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
