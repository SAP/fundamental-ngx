import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { MultiComboboxComponent } from '@fundamental-ngx/core/multi-combobox';

@Component({
    selector: 'fd-multi-combobox-readonly-example',
    templateUrl: './multi-combobox-readonly-example.component.html',
    styleUrls: ['./multi-combobox-readonly-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ReactiveFormsModule, FormItemComponent, FormLabelComponent, MultiComboboxComponent, JsonPipe]
})
export class MultiComboboxReadonlyExampleComponent {
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

    // Reactive Forms: pre-selected tokens so a tester can try keyboard deletion / close icons
    reactiveFormControl = new FormControl<typeof this.dataSource>([this.dataSource[0], this.dataSource[3]]);
    customForm = new FormGroup({
        readonlyCombo: this.reactiveFormControl
    });

    // ngModel: pre-selected tokens
    ngModelSelection = [this.dataSource[1], this.dataSource[5]];
}
