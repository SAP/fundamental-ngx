import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FdpFormGroupModule, PlatformMultiComboboxModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-multi-combobox-readonly-example',
    templateUrl: './multi-combobox-readonly-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformMultiComboboxModule, JsonPipe]
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

    // Pre-select two tokens so the read-only guard on token deletion can be exercised.
    readonlyFormControl = new FormControl<typeof this.dataSource>([this.dataSource[0], this.dataSource[3]]);
    customForm = new FormGroup({
        readonlyCombo: this.readonlyFormControl
    });
}
