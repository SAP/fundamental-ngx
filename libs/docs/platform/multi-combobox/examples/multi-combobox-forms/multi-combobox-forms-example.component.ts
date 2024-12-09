import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JsonPipe } from '@angular/common';
import {
    FdpFormGroupModule,
    MultiComboboxSelectionChangeEvent,
    PlatformMultiComboboxModule
} from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-multi-combobox-forms-example',
    templateUrl: './multi-combobox-forms-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FdpFormGroupModule, FormsModule, ReactiveFormsModule, PlatformMultiComboboxModule, JsonPipe]
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

    customForm = new FormGroup({
        field: new FormControl(this.dataSource[3])
    });

    selectedItems = [this.dataSource[3]];

    onSelect(item: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = item.selectedItems;
    }
}
