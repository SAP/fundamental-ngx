import { ChangeDetectionStrategy, Component } from '@angular/core';

import { JsonPipe } from '@angular/common';
import {
    ComboboxSelectionChangeEvent,
    FdpFormGroupModule,
    PlatformComboboxModule
} from '@fundamental-ngx/platform/form';
import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-combobox-columns-example',
    templateUrl: './combobox-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }],
    imports: [FdpFormGroupModule, PlatformComboboxModule, JsonPipe]
})
export class ComboboxColumnsExampleComponent {
    dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        {
            name: 'Biiiiiiiiiiiiiiiiiiiiiiggggggggggggggggggggggggg Banananananananananananananananananananananananananananananananananananananana',
            type: 'Fruits'
        },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];

    selectedItem = null;

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}
