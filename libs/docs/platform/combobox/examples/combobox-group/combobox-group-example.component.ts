import { ChangeDetectionStrategy, Component } from '@angular/core';

import { JsonPipe } from '@angular/common';
import {
    ComboboxSelectionChangeEvent,
    FdpFormGroupModule,
    PlatformComboboxModule
} from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-combobox-group-example',
    templateUrl: './combobox-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FdpFormGroupModule, PlatformComboboxModule, JsonPipe]
})
export class ComboboxGroupExampleComponent {
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

    selectedItem = null;
    selectedItem1 = null;

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }

    onSelect1(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem1 = item.payload;
    }
}
