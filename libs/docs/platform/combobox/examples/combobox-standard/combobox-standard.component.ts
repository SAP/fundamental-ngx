import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DATA_PROVIDERS } from '@fundamental-ngx/platform/shared';
import { ComboboxSelectionChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-combobox-standard',
    templateUrl: './combobox-standard.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class ComboboxStandardComponent {
    dataSource = ['Apple', 'Banana', 'Pineapple', 'Strawberry', 'Broccoli', 'Carrot', 'Jalapeño', 'Spinach'];

    dataSourceAutoResize = [
        'The maximum width is the part of the screen furthest to the right.',
        'Apple',
        'Banana',
        'Pineapple',
        'Strawberry',
        'Broccoli',
        'Carrot',
        'Jalapeño',
        'Spinach'
    ];

    selectedItem1 = null;
    selectedItem2 = null;
    selectedItem3 = this.dataSource[4];
    selectedItem4 = this.dataSource[3];
    selectedItem5 = null;
    selectedItem6 = null;

    onSelect1(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem1 = item.payload;
    }

    onSelect2(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }

    onSelect3(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem3 = item.payload;
    }

    onSelect4(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem4 = item.payload;
    }

    onSelect5(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem5 = item.payload;
    }

    onSelect6(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem6 = item.payload;
    }
}
