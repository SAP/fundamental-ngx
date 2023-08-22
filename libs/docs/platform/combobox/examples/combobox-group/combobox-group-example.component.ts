import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';
import { JsonPipe } from '@angular/common';
import { PlatformComboboxModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-combobox-group-example',
    templateUrl: './combobox-group-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    standalone: true,
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
